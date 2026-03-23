---
description: "Check production server for pending OS patches, Docker image updates, and service versions"
---

# Server Updates & Patching Check

Check the production VPS (64.176.222.190) for pending updates and report what needs attention.

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

### 1. OS Package Updates
```bash
apt-get update -qq 2>/dev/null
apt list --upgradable 2>/dev/null
```

### 2. Security-Specific Updates
```bash
apt list --upgradable 2>/dev/null | grep -i security
unattended-upgrades --dry-run 2>/dev/null | head -20
```

### 3. Kernel Version
```bash
uname -r
apt-cache policy linux-image-amd64 2>/dev/null | head -5
```
Flag if a newer kernel is available (requires reboot to apply).

### 4. Docker Image Freshness
For each running container, check if a newer image exists:
```bash
docker ps --format '{{.Image}}' | sort -u
```
Then for key images, check current digest vs latest available:
```bash
docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.CreatedSince}}'
```
Flag any image older than 60 days.

### 5. Key Service Versions
```bash
caddy version
/usr/bin/crowdsec version 2>&1 | head -3
docker --version
```

### 6. Last Applied Updates
```bash
tail -30 /var/log/dpkg.log | grep ' install\| upgrade'
```

### 7. Reboot Required
```bash
ls /var/run/reboot-required 2>/dev/null && cat /var/run/reboot-required.pkgs || echo "No reboot required"
```

## Report Format

**OS Packages**
- Total upgradable: N
- Security updates: N (list them if any)
- Recommended action: apply now / can wait / none needed

**Kernel**
- Current: X.X.X
- Available: X.X.X (or "up to date")
- Reboot required: yes/no

**Docker Images** — table of image / age / status (OK / stale)

**Key Services** — current versions of Caddy, CrowdSec, Docker

**Last Updated** — when packages were last applied

**Action Items** — numbered list of what to actually do, in priority order. Include the exact commands to run if patching is recommended:
```bash
apt-get upgrade -y
# or for security only:
apt-get install --only-upgrade <package-name>
```

If a reboot is needed, say so explicitly and note that Docker containers will restart automatically (restart: always/unless-stopped policies are set).
