---
title: "When the AI Vendor Becomes the Attack Surface: Lessons from the Claude Code Leak"
description: "The March 2026 Claude Code npm leak exposed 512,000 lines of source code. Here's what it means for enterprise AI supply chain security."
pubDate: 2026-04-01
author: "Sentinel Nexus Team"
pillar: "security"
industry: "General"
tags: ["AI Security", "Supply Chain Security", "Developer Tools", "npm Security", "Claude Code"]
image: "/images/blog/claude-code-npm-leak-ai-supply-chain-security.webp"
imageAlt: "Binary data streams overlaid with color artifacts, representing exposed source code"
draft: false
---

On March 31, 2026, Anthropic accidentally shipped its own source code to the public.

Version 2.1.88 of the `@anthropic-ai/claude-code` npm package contained a 59.8 MB JavaScript source map file that pointed directly to a zip archive on Anthropic's Cloudflare R2 storage bucket. Within hours, security researcher Chaofan Shou flagged it publicly. The archive held approximately 512,000 lines of TypeScript source code across nearly 2,000 files - the entire internal implementation of Claude Code, Anthropic's agentic coding tool.

The cause was mundane: a misconfigured `.npmignore` or `files` field in `package.json`. A single packaging oversight exposed the architecture, internal tooling patterns, and engineering decisions of one of the most widely used AI developer tools in the market. Anthropic confirmed the incident as "a release packaging issue caused by human error, not a security breach."

That distinction matters - but it does not make the incident less significant for enterprise security teams.

## What the Leak Actually Exposed

The leaked codebase revealed internal architectural details that competitors and researchers have since analyzed publicly. Notable findings include Claude Code's self-healing memory architecture, designed to work around the fixed context window constraints of the underlying model, and the internal patterns used to orchestrate multi-step agentic workflows.

The code is now archived in public GitHub repositories with tens of thousands of stars. No customer credentials or data were exposed. But the competitive and security implications extend well beyond the code itself.

Within days of the leak, attackers began registering typosquat packages on npm targeting developers attempting to compile the leaked source. These dependency confusion attacks are a documented supply chain tactic: an attacker publishes a malicious package under a name that matches an internal package reference visible in the leaked code, hoping developers who try to build from source will pull in the malicious version instead.

The SLSA (Supply-chain Levels for Software Artifacts) framework defines this as an integrity violation at the build level. Enterprises that depend on Claude Code in their developer workflows should treat the follow-on typosquatting campaign as an active threat, not a historical footnote.

## A Compounding Crisis: The Axios Supply Chain Attack

The Claude Code source exposure did not happen in isolation. On the same day - March 31, 2026, between 00:21 and 03:29 UTC - malicious versions of the axios npm package (versions 1.14.1 and 0.30.4) were published to the registry. Attackers had compromised the package maintainer's credentials and embedded a Remote Access Trojan in both versions.

Because Claude Code depends on axios, any developer or automated system that ran `npm install` or `npm update` during that three-hour window may have pulled in the malicious package alongside Claude Code. Google's Threat Intelligence Group publicly attributed the axios compromise to UNC1069, a North Korea-aligned financially motivated threat actor, based on infrastructure overlaps and the use of an updated backdoor variant called WAVESHAPER.V2.

The window was short, but the exposure was real. Axios has over 100 million weekly downloads. The malicious versions were designed to harvest credentials and establish persistent access on developer machines.

If your environment includes developers who updated Claude Code during that window, treat those machines as potentially compromised. Rotate all secrets stored or accessed on them and perform clean OS reinstallations before returning them to use in production workflows.

## AI Developer Tooling Is a New Attack Category

Enterprise security programs have historically focused on protecting production AI systems: model inputs, training pipelines, API access controls, and inference infrastructure. The Claude Code incident highlights a different and underdiscussed category: AI developer tooling.

Developer tools occupy a privileged position in your environment. They run on engineer workstations with broad filesystem access, interact with version control, generate and execute code, and frequently hold credentials for cloud environments and CI/CD pipelines. An agentic coding tool that can browse, read, write, and execute code is a particularly high-value target.

MITRE ATLAS, the adversarial ML threat catalog, includes developer tool compromise under the AML.T0010 (ML Supply Chain Compromise) tactic. OWASP's ML Security Top 10 treats supply chain risk as a first-class concern. Neither framework was designed with agentic IDE tooling in mind, which means most organizations have not formally threat-modeled this surface.

## What Enterprises Should Do Now

Several immediate and near-term actions apply to organizations running Claude Code or any npm-distributed AI tooling.

**Verify your current claude-code version.** Run `npm list @anthropic-ai/claude-code` to confirm you are not running version 2.1.88. The affected package was removed from npm, but organizations with local caches or air-gapped mirrors may still have it available internally.

**Review installation logs for the March 31 window.** If any engineer installed or updated claude-code between 00:21 and 03:29 UTC on March 31, 2026, that machine should be reviewed for indicators of the axios RAT. Check endpoint detection and response (EDR) logs for unexpected outbound connections established during or after that window.

**Consider the native installer over npm.** Anthropic now recommends the native installer, which distributes a standalone binary rather than an npm package with a mutable dependency chain. This reduces - though does not eliminate - exposure to npm supply chain attacks.

**Pin dependencies and enforce lockfiles.** `package-lock.json` or `yarn.lock` files prevent silent upgrades to malicious versions during an active supply chain attack. If your CI/CD pipelines run `npm install` without `--frozen-lockfile`, you have exposure that extends beyond AI tooling.

**Audit your AI tooling inventory.** Apply the same rigor to AI developer tools that you apply to production software. Know what packages your developers are running, what credentials those tools can access, and whether your endpoint protection has visibility into the workstations running them.

## What This Means for AI Vendors

The Claude Code incident illustrates a maturity gap that affects most AI vendors, not just Anthropic. Software supply chain security - particularly around npm packaging, dependency management, and release integrity - is a domain that many AI companies have not systematically addressed.

SLSA level 2 compliance requires tamper-evident provenance and a hosted build service with generated provenance. Level 3 adds hardened build platforms and non-falsifiable provenance. Most AI tooling vendors currently publish packages without any SLSA provenance attestation, which means enterprises cannot verify the integrity of what they are installing.

As AI tools become infrastructure - embedded in CI/CD pipelines, running with elevated permissions, and executing production code - the security bar for the vendors building them needs to rise accordingly. The NIST AI RMF GOVERN and MEASURE functions both apply here: organizations should assess whether the AI vendors in their stack have documented software supply chain controls and published incident response procedures.

For the enterprise buying side, the right questions to add to AI vendor security reviews include: Does your tooling ship with SLSA provenance attestation? What is your incident response procedure for a packaging error or dependency compromise? How quickly do you notify customers of a supply chain event?

## The Incident Will Repeat

The Claude Code leak was an honest mistake. The axios compromise that coincided with it was deliberate and sophisticated. Together, they represent the scenario NIST SP 800-218 (the Secure Software Development Framework) describes as a systemic risk: an insider error and an active external threat actor whose timelines overlap to amplify the impact of each.

AI tooling is now critical infrastructure for software development teams. The security controls applied to production AI systems need to extend fully to the tools developers use to build and manage them. If your current security program has a gap here, last week's events are a well-timed prompt to close it.

Want to assess your AI supply chain security posture? Use the contact form to start a conversation about where your current exposure lies.
