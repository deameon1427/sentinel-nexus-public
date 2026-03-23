---
description: "Audit production server security posture - auth logs, open ports, CrowdSec, file integrity, user accounts"
---

# Server Security Posture Check

Perform a security audit of the production VPS (64.176.222.190) and report findings with severity ratings.

## SSH Access

Use Python paramiko (sshpass not available). Root password in `.aoo/.planning/planning.md`.

```python
import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('64.176.222.190', username='root', password='...', timeout=20, look_for_keys=False, allow_agent=False)
def run(cmd, timeout=30):
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    return stdout.read().decode() + stderr.read().decode()
```

## Checks to Run

### 1. Authentication & Login Activity
```bash
# Successful root logins in last 30 days
journalctl -u ssh --since '30 days ago' --no-pager | grep 'Accepted' | tail -20

# Failed login attempts (brute force signal)
journalctl -u ssh --since '24 hours ago' --no-pager | grep 'Failed\|Invalid' | wc -l

# All current logged-in users
who
last | head -15
```

### 2. User Accounts
```bash
# Non-system accounts (should only be: root, linuxuser, www)
cat /etc/passwd | grep -v nologin | grep -v false | grep -v halt | grep -v sync

# Accounts with empty passwords
awk -F: '($2 == "" ) { print $1 }' /etc/shadow 2>/dev/null

# sudo/wheel group members
getent group sudo
```

### 3. Open Ports & Listening Services
```bash
ss -tlnp
# Flag any unexpected listeners - expected: 22 (sshd), 80/443 (caddy),
# 127.0.0.1 only: 3000, 3001, 5432, 5678, 6379, 9000, 9001
```

### 4. CrowdSec Status
```bash
cscli decisions list 2>&1
cscli alerts list --since 24h 2>&1 | head -30
systemctl is-active crowdsec crowdsec-firewall-bouncer
```

### 5. SSH Configuration
```bash
grep -E 'PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|Port|AllowUsers|PermitEmptyPasswords' /etc/ssh/sshd_config | grep -v '^#'
```
Flag: `PermitRootLogin yes` + `PasswordAuthentication yes` together is a risk. Note if present.

### 6. Suspicious Files & Processes
```bash
# Files modified in /etc, /bin, /usr/bin, /usr/sbin in last 7 days
find /etc /bin /usr/bin /usr/sbin -newer /proc/1/exe -type f 2>/dev/null | head -20

# World-writable files outside /tmp
find / -xdev -type f -perm -0002 -not -path '/tmp/*' -not -path '/proc/*' -not -path '/sys/*' 2>/dev/null | head -10

# Processes running from unusual locations
ps aux | grep -v '\[' | awk '$11 !~ /^(\/usr|\/bin|\/sbin|\/lib|\/opt|\/home|caddy$)/ && $11 !~ /docker|containerd|runc/ {print}' | grep -v 'ps aux\|grep\|awk' | head -10

# SUID binaries added recently
find / -xdev -perm -4000 -newer /proc/1/exe -type f 2>/dev/null
```

### 7. Cron Jobs (All Users)
```bash
crontab -l 2>/dev/null
crontab -u www -l 2>/dev/null
crontab -u linuxuser -l 2>/dev/null
ls -la /etc/cron.d/ /etc/cron.daily/ /etc/cron.hourly/
```

### 8. Authorized Keys
```bash
cat /root/.ssh/authorized_keys 2>/dev/null
cat /home/linuxuser/.ssh/authorized_keys 2>/dev/null
cat /home/www/.ssh/authorized_keys 2>/dev/null
```
Flag any keys not recognized (expected: the sentinel-nexus-linuxuser key).

### 9. Firewall State
```bash
iptables -L INPUT -n --line-numbers
iptables -L OUTPUT -n --line-numbers | head -10
```
Flag if INPUT policy is ACCEPT with no rules (means CrowdSec bouncer rules were cleared).

### 10. Docker Security
```bash
# Containers running as root
docker ps -q | xargs -I{} docker inspect {} --format '{{.Name}}: User={{.Config.User}}' 2>/dev/null

# Containers with host network or privileged mode
docker ps -q | xargs -I{} docker inspect {} --format '{{.Name}}: Privileged={{.HostConfig.Privileged}} Network={{.HostConfig.NetworkMode}}' 2>/dev/null

# Exposed ports (should all be 127.0.0.1 bound, not 0.0.0.0)
docker ps --format '{{.Names}}: {{.Ports}}'
```

## Report Format

Rate each finding as:
- **OK** — no action needed
- **INFO** — worth knowing, no immediate action
- **WARN** — should be addressed soon
- **CRITICAL** — address immediately

**Authentication** — login history summary, brute force volume

**User Accounts** — list of shell-access accounts; flag any unexpected ones

**Open Ports** — table of port / process / accessibility (public vs loopback); flag anything unexpected on 0.0.0.0

**SSH Config** — current settings; flag risky combinations

**CrowdSec** — active decisions count, alerts in last 24h, bouncer state; flag if iptables INPUT has no rules

**Suspicious Activity** — files, processes, crons, SUID changes

**Authorized Keys** — list keys found; flag unrecognized ones

**Docker** — privileged containers, port bindings, root-user containers

**Summary** — overall posture rating (Healthy / Needs Attention / At Risk) with a numbered action list sorted by priority.

## Context

Known-good state for this server:
- Shell users: `root`, `linuxuser`, `www` only
- Expected public listeners: port 22 (ssh), 80 (caddy → 443 redirect), 443 (caddy)
- All Docker ports bound to `127.0.0.1` only
- CrowdSec bouncer should have active iptables rules (not empty INPUT chain)
- Root login via password is enabled by design (used for emergency access)
- Authorized key: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJrx2fGhZ/EAEB0NRJj8OX5UkLrg0eP/eZNMfCKrnBf/ linuxuser@lobster.sentinel-nexus.com`
