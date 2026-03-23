---
description: "Check production server health - services, domains, memory, disk, load"
---

# Server Health Check

Run a full health check on the production VPS (64.176.222.190) and report status.

## SSH Access

Use Python paramiko (sshpass not available):

```python
import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('64.176.222.190', username='root', password='...', timeout=20, look_for_keys=False, allow_agent=False)
def run(cmd, timeout=20):
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    return stdout.read().decode() + stderr.read().decode()
```

Root password is in `.aoo/.planning/planning.md`. If not found, ask the user.

## Checks to Run

Run all of the following in a single SSH session:

### 1. System
```bash
uptime
free -h
df -h / /var
```

### 2. Services
```bash
systemctl is-active caddy crowdsec crowdsec-firewall-bouncer
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.RunningFor}}'
```

### 3. All Domains
Check each domain and record HTTP status + TTFB using curl on the server itself:
- sentinel-nexus.com
- engage.sentinel-nexus.com (404 at root is expected)
- academy.sentinel-nexus.com
- crm.sentinel-nexus.com
- auth.sentinel-nexus.com
- n8n.sentinel-nexus.com
- umami.sentinel-nexus.com

```bash
curl -s -o /dev/null -w '%{http_code} %{time_starttransfer}s' --max-time 5 https://DOMAIN
```

### 4. CrowdSec Active Decisions
```bash
cscli decisions list 2>&1 | head -20
```

### 5. Recent Errors
```bash
journalctl -u caddy --since '1 hour ago' --no-pager | grep -i error | tail -10
```

## Report Format

Present results as a clean status table:

**System**
| Metric | Value | Status |
|--------|-------|--------|
| Uptime | ... | |
| RAM used/total | ... | OK / WARN if >85% |
| Swap used | ... | OK / WARN if >50% |
| Disk / | ... | OK / WARN if >80% |
| Load (1m/5m/15m) | ... | |

**Services** — show each as OK / DOWN

**Domains** — show HTTP code and TTFB for each; flag anything not 200/301/302/304

**CrowdSec** — count of active bans; flag if own IP (184.15.34.158) is banned

**Flags** — list anything that needs attention with a brief recommendation

If everything is healthy, say so clearly. If anything is degraded, state what and suggest a fix.
