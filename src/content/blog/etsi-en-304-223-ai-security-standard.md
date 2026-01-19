---
title: "ETSI EN 304 223: Europe's New Baseline for AI Cybersecurity"
description: "The first European Standard for AI security is here. What it requires and how to prepare your AI systems for compliance."
pubDate: 2026-01-19
author: "Sentinel Nexus Team"
pillar: "governance"
industry: "General"
tags: ["AI Security", "ETSI", "EU AI Act", "Compliance", "Standards"]
image: "/images/blog/etsi-en-304-223-ai-security.webp"
imageAlt: "Development team working on AI security implementation"
draft: false
---

Traditional cybersecurity frameworks weren't designed for AI. They miss threats like model poisoning, prompt injection, and adversarial inputs that can compromise AI systems in ways conventional security controls can't detect. Europe's answer is ETSI EN 304 223, the first European Standard specifically addressing AI system cybersecurity.

Here's what organizations need to know.

## What is ETSI EN 304 223?

Published in December 2025, ETSI EN 304 223 establishes baseline cybersecurity requirements for AI systems throughout their lifecycle. Unlike guidance frameworks, this is a harmonized European Standard that supports compliance with the EU AI Act's cybersecurity requirements.

The standard recognizes that AI systems face unique threats. Data can be poisoned during training. Models can be manipulated through carefully crafted inputs. Inference APIs can leak sensitive training data. Traditional security assessments don't adequately address these risks.

## Who It Applies To

The standard defines three key stakeholder roles. Most organizations will wear multiple hats:

**AI Developers** build and train AI models. Your responsibilities include secure development practices, threat modeling during design, and comprehensive testing before release.

**AI System Operators** deploy and run AI systems in production. You're responsible for secure configuration, monitoring, incident response, and maintaining security throughout operation.

**AI Data Custodians** manage data used to train, test, and operate AI systems. Your focus is data integrity, access controls, and ensuring data quality doesn't introduce security vulnerabilities.

Understanding your role determines which requirements apply to you.

## The Lifecycle Approach

ETSI EN 304 223 structures security requirements around five lifecycle phases. This isn't arbitrary. AI systems face different threats at each stage, and controls must evolve accordingly.

### Design Phase
Security starts before the first line of code. Requirements include:
- AI-specific threat modeling identifying model attacks, data poisoning vectors, and inference risks
- Security requirements specification that addresses AI-unique threats
- Selection of architectures that support security controls

### Development Phase
Building security in, not bolting it on:
- Secure coding practices adapted for ML pipelines
- Data validation and integrity checks for training datasets
- Model testing that includes adversarial robustness evaluation
- Supply chain security for pre-trained models and datasets

### Deployment Phase
Transitioning securely to production:
- Secure configuration management
- Access controls for models and inference APIs
- Integration testing in the target environment
- Documentation of security controls and limitations

### Operational Phase
Maintaining security during active use:
- Continuous monitoring for drift, anomalies, and attacks
- Incident response procedures specific to AI failures
- Regular security assessments and penetration testing
- Management of updates and model retraining

### End of Life Phase
Secure decommissioning:
- Proper disposal of models that may contain sensitive information
- Data retention compliance
- Documentation of decommissioning decisions

## Key Requirements

Across all phases, several requirements stand out:

### Threat Modeling for AI
Standard threat modeling isn't sufficient. You need to specifically assess:
- Training data poisoning opportunities
- Model extraction and theft risks
- Adversarial input vulnerabilities
- Inference API abuse potential
- Supply chain risks from third-party models

### Documentation
Comprehensive documentation isn't just good practice. It's required. Document your:
- Security requirements and how they're addressed
- Threat model and risk assessment
- Security testing results
- Known limitations and residual risks
- Incident response procedures

### Testing Beyond Functional
Security testing must go beyond "does it work" to include:
- Adversarial robustness testing
- Privacy leakage assessment
- Boundary condition testing
- Integration security testing

### Monitoring and Response
Production AI systems require:
- Behavioral monitoring for anomalies
- Performance monitoring for drift
- Logging sufficient for incident investigation
- Defined response procedures for AI-specific incidents

## Connection to EU AI Act

ETSI EN 304 223 doesn't exist in isolation. It's designed to support EU AI Act compliance, specifically the cybersecurity requirements for high-risk AI systems under Article 15.

If you're deploying high-risk AI systems in the EU, this standard provides a concrete framework for meeting cybersecurity obligations. Implementing EN 304 223 creates a presumption of conformity with the Act's cybersecurity requirements.

For organizations already working toward EU AI Act compliance, adopting this standard aligns your security program with regulatory expectations.

## Assessing Your Readiness

Most organizations aren't starting from zero. You likely have security practices that partially address these requirements. The question is identifying gaps.

Start with an honest assessment:

1. **Map your AI systems** to stakeholder roles. Are you a developer, operator, data custodian, or all three?

2. **Review existing controls** against lifecycle phase requirements. Where do AI-specific gaps exist?

3. **Evaluate your threat model**. Does it address AI-specific attack vectors, or just traditional application security?

4. **Assess your documentation**. Could you demonstrate compliance if asked?

5. **Test your monitoring**. Would you detect an adversarial attack or data poisoning attempt?

The answers will guide your roadmap to compliance.

## What's Next

ETSI EN 304 223 represents a maturation in AI security expectations. The "figure it out as you go" era is ending. Organizations deploying AI systems, especially in European markets, need structured approaches to AI-specific security.

The standard is available now. The EU AI Act's high-risk system requirements take full effect in August 2026. The window to prepare is shrinking.

If you're uncertain about your compliance position or need help building an AI security program that addresses these requirements, use the contact form to start a conversation. We help organizations assess their current state, identify gaps, and build practical roadmaps to compliance.
