---
title: "Claude Desktop Won't Install on Windows? Here's What's Actually Broken"
description: "Anthropic's MSIX packaging change broke Claude Desktop installation for many Windows users. Here's the cause, the workarounds, and what to expect."
pubDate: 2026-02-25
author: "Sentinel Nexus Team"
pillar: "implementation"
industry: "General"
tags: ["Claude Desktop", "Windows", "AI Tools", "Troubleshooting", "Enterprise AI"]
image: "/images/blog/claude-desktop-windows-msix-broken.webp"
imageAlt: "Code with color distortion artifacts representing a broken software installation"
draft: false
---

If you've tried to install or update Claude Desktop on Windows recently and hit a wall, you're not imagining things. A real, documented regression broke the installer for a significant number of users around February 13, 2026. Here's exactly what happened, what error you're likely seeing, and what you can do about it right now.

## What Broke and When

Around February 10, 2026, Anthropic shipped "Cowork" — a new VM-based collaboration feature for Claude Desktop on Windows. Along with that release, they transitioned the Windows installer from the older Squirrel-based `.exe` format to **MSIX**, Microsoft's modern app packaging standard.

The new installer, version 1.0.0.0 (signed February 13, 2026), introduced a requirement that wasn't present before: **Trusted App Installs must be enabled**. The previous version, 1.1.3189, installed without this requirement. This is a textbook regression — a working feature broken by a packaging change, documented across multiple open GitHub issues ([#26457](https://github.com/anthropics/claude-code/issues/26457), [#25385](https://github.com/anthropics/claude-code/issues/25385), [#25162](https://github.com/anthropics/claude-code/issues/25162)).

There is no official Anthropic fix or timeline as of this writing.

## The Error Messages You're Seeing

Depending on your Windows configuration and which version you're coming from, you may encounter one of several different error messages:

**If you're doing a fresh install:**
```
Claude Setup
Trusted app installs must be enabled to install Claude.
To enable this, open Settings → System → For developers, then turn on Developer mode.
If this setting is managed by your organization, contact your IT administrator.
```

**If you're upgrading from the old Squirrel-based version:**
The installer silently fails with error code `0x80073CFA`, leaving you without a working app and no clear explanation.

**If you enable Developer Mode and retry:**
```
Installation failed: signature verification failed: signature check failed:
exec: "powershell.exe": executable file not found in %PATH%
```
This happens even when PowerShell is installed and working normally. The installer's PowerShell detection logic is broken — it fails to find PowerShell at its standard system path.

**On some Windows 10 IoT Enterprise LTSC systems:**
The installer incorrectly reports "Windows S Mode must be disabled to install Claude," when S Mode is not actually enabled. The installer is misreading the `EditionID` string.

## Why This Happened: MSIX and Trusted App Installs

To understand why Developer Mode is suddenly required, you need to understand how MSIX installation works on Windows.

MSIX packages distributed through the **Microsoft Store** install without restrictions. MSIX packages distributed **outside the Store** — which is how Claude Desktop is distributed, directly from claude.com — require one of two things: either the package is signed by a certificate that Windows already trusts, or the user has enabled "Trusted App Installs" (a setting that's part of Developer Mode).

Anthropic's previous Squirrel-based installer was a standard `.exe` and didn't have this restriction. Moving to MSIX without publishing through the Store or solving the certificate trust problem is what created the wall users are now hitting.

This is not a Microsoft policy targeting Claude specifically. It's a standard Windows security behavior that any MSIX sideloading scenario runs into. Anthropic's packaging change triggered it.

## Why Enterprise Users Are Hit Hardest

For individual users on personal machines, enabling Developer Mode is inconvenient but possible. For enterprise and managed environments, it's a policy problem.

Developer Mode is typically disabled via Group Policy, Intune, or other MDM solutions in corporate environments — and for good reason. Enabling it opens up sideloading capabilities that conflict with application control policies and security baselines like CIS Benchmarks and DISA STIGs. An IT administrator cannot reasonably enable Developer Mode fleet-wide just to install one application.

This means organizations that were actively evaluating or deploying Claude Desktop as a productivity tool now have a broken upgrade path and a deployment blocker, with no official workaround that meets enterprise security requirements.

## Workarounds That Actually Work

### Option 1: Use the Claude.ai Web Interface

The most immediate fix: use [claude.ai](https://claude.ai) in a browser. Full access, no installation required. This won't give you MCP tool integrations or local file access, but for most conversational use cases it works fine.

### Option 2: Install Claude Code CLI

If you need Claude integrated into a development workflow, Claude Code CLI (v2.1.39+) installs cleanly via npm and bypasses the desktop installer entirely:

```bash
npm install -g @anthropic-ai/claude-code
```

This is the recommended path for developers who use Claude for code generation, agentic tasks, and tool-augmented workflows.

### Option 3: Certificate Trust Injection (Advanced, Personal Machines Only)

For non-managed personal machines where you want the desktop app specifically, a PowerShell workaround exists to manually trust the Anthropic signing certificate before installation:

```powershell
# Run as Administrator
$certPath = "C:\Path\To\ClaudeSetup.exe"
$cert = (Get-AuthenticodeSignature -FilePath $certPath).SignerCertificate
$store = New-Object System.Security.Cryptography.X509Certificates.X509Store("TrustedPeople", "LocalMachine")
$store.Open("ReadWrite")
$store.Add($cert)
$store.Close()
```

This is not appropriate in enterprise environments and modifies your machine's certificate trust store. Use it only if you understand the implications.

### Option 4: Monitor Anthropic's GitHub

Watch the open issues ([#26457](https://github.com/anthropics/claude-code/issues/26457)) for updates. When Anthropic ships a corrected installer or provides an enterprise deployment path, that's where it will appear first.

## The Broader Lesson for AI Tooling Strategy

This situation is a useful reminder for any organization that's standardizing on AI desktop tools: **vendor packaging decisions can break your workflows with no warning**.

Mature AI tool adoption strategies treat desktop clients as one layer of access, not the only layer. If your team's Claude workflow depends exclusively on the desktop app, you've created a single point of failure. Organizations that had already integrated Claude via API or were using Claude Code CLI for developer workflows were unaffected by this regression.

As AI tooling matures, the organizations that fare best will be the ones treating AI assistants like any other enterprise software: with documented access paths, tested fallback options, and change management processes that don't assume vendor packaging is always reliable.

If you're working through Claude Desktop deployment or broader AI tool strategy for your organization, use the contact form to start a conversation about what a resilient AI tooling architecture looks like for your environment.
