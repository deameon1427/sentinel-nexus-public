---
title: "AI Governance and Compliance Frameworks"
description: "Navigate the EU AI Act, NIST AI RMF, ISO 42001, and other frameworks shaping responsible AI deployment globally."
moduleNumber: 3
duration: "30 min"
pillar: ["governance", "security"]
isFinal: false
draft: false
quiz:
  - question: "Under the EU AI Act, which risk tier requires conformity assessment before market placement?"
    options:
      - id: "a"
        label: "Minimal risk systems only"
      - id: "b"
        label: "High-risk AI systems"
      - id: "c"
        label: "All AI systems regardless of risk level"
      - id: "d"
        label: "Only general-purpose AI models with systemic risk"
    correct: "b"
  - question: "The NIST AI RMF is best described as:"
    options:
      - id: "a"
        label: "A mandatory US federal law governing AI deployment"
      - id: "b"
        label: "A voluntary risk management framework organized around GOVERN, MAP, MEASURE, and MANAGE functions"
      - id: "c"
        label: "A technical standard specifying model architecture requirements"
      - id: "d"
        label: "An EU regulation equivalent to the AI Act"
    correct: "b"
  - question: "ISO/IEC 42001 establishes requirements for:"
    options:
      - id: "a"
        label: "AI model accuracy benchmarks"
      - id: "b"
        label: "An AI management system (AIMS) within an organization"
      - id: "c"
        label: "Data center energy efficiency for AI workloads"
      - id: "d"
        label: "Open-source AI licensing requirements"
    correct: "b"
  - question: "Which EU AI Act obligation applies to providers of general-purpose AI models with 'systemic risk'?"
    options:
      - id: "a"
        label: "They are exempt from all EU AI Act requirements"
      - id: "b"
        label: "They must conduct adversarial testing (red-teaming), report serious incidents, and provide model security information"
      - id: "c"
        label: "They must obtain government approval before each model release"
      - id: "d"
        label: "They must open-source their model weights"
    correct: "b"
  - question: "A 'risk appetite statement' in AI governance serves to:"
    options:
      - id: "a"
        label: "Define the technical parameters of an AI model"
      - id: "b"
        label: "Document how much AI-related risk the organization is willing to accept, guiding deployment decisions"
      - id: "c"
        label: "Calculate the caloric intake of AI development teams"
      - id: "d"
        label: "Set the minimum performance thresholds for production AI systems"
    correct: "b"
---

## Overview

AI governance is no longer optional. Regulators across the EU, US, UK, and Asia-Pacific are creating binding and voluntary frameworks that determine how organizations must design, deploy, and oversee AI systems. This module covers the major frameworks you need to understand and how they interact.

---

## The EU AI Act: The World's First Binding AI Law

The EU AI Act entered into force in August 2024 and applies to any organization deploying AI that affects EU residents -- regardless of where the deploying organization is based. This extraterritorial reach makes it the most globally significant AI regulation to date.

### Risk-Based Classification

The Act classifies AI systems into four tiers:

**Unacceptable risk (banned):**
- Real-time biometric surveillance in public spaces (with narrow exceptions)
- Social scoring by governments
- Subliminal manipulation techniques
- Exploitation of vulnerable groups

**High risk (most regulated):**
High-risk systems require conformity assessment, CE marking (for EU market), and ongoing monitoring. Categories include:
- AI in critical infrastructure
- Educational and employment screening
- Credit scoring and financial services AI
- Healthcare diagnostics and treatment AI
- Law enforcement and border control AI
- Justice and democratic process AI

**Limited risk (transparency obligations):**
Chatbots must disclose they are AI. Deepfakes must be labeled. Users must know when they're interacting with an AI system.

**Minimal risk:**
Most AI systems fall here. Spam filters, video games, AI-powered features with no significant impact on individuals. No specific obligations beyond general principles.

### General-Purpose AI Models (GPAI)

The Act creates a separate track for foundation models (GPT-4, Claude, Gemini, etc.). All GPAI model providers must:
- Maintain technical documentation
- Publish a copyright compliance summary
- Train with data governed by an acceptable use policy

GPAI models with "systemic risk" (defined by training compute threshold, currently 10^25 FLOPs) face additional obligations:
- Adversarial testing (red-teaming) prior to release and periodically thereafter
- Serious incident reporting to the EU AI Office
- Cybersecurity measures
- Model evaluation transparency with EU authorities

### Enforcement and Penalties

- Fines up to 35 million EUR or 7% of global annual turnover (whichever is higher) for violations involving prohibited practices
- 15 million EUR or 3% for other violations
- The EU AI Office has authority over GPAI providers across member states

---

## NIST AI Risk Management Framework (AI RMF)

The NIST AI RMF (released January 2023) is a voluntary US framework for managing AI risk. "Voluntary" doesn't mean irrelevant -- it's rapidly becoming the baseline expectation for government procurement and enterprise due diligence.

### The Four Core Functions

**GOVERN**: Establish organizational structures, policies, and culture for AI risk management. Who owns AI risk? What's the escalation path? What training do teams need?

**MAP**: Contextualize AI risk by identifying stakeholders, intended use cases, potential harms, and risk tolerances. This is your threat modeling phase applied to AI.

**MEASURE**: Analyze and assess AI risk using quantitative and qualitative methods. Metrics, testing, red teaming, bias evaluation, and performance monitoring all live here.

**MANAGE**: Prioritize and address identified risks. Implement controls, track mitigations, and maintain ongoing risk posture.

### AI RMF Profiles

The NIST framework includes sector-specific Profiles that apply the core functions to particular industries. The Generative AI Profile (ARIA) released in 2024 specifically addresses GenAI risks including prompt injection, CBRN information risks, and data privacy.

### Integration with NIST Cybersecurity Framework

Organizations already operating under the NIST CSF can map AI RMF functions to their existing cybersecurity program. AI security is an extension of cybersecurity, not a separate discipline.

---

## ISO/IEC 42001: The AI Management System Standard

ISO 42001, published in December 2023, provides requirements for an **AI Management System (AIMS)** -- a structured organizational approach to responsible AI, analogous to ISO 27001 for information security.

### What ISO 42001 Covers

- **Organizational context**: Understanding the organization's role in the AI value chain (developer, deployer, or both)
- **Leadership**: Top management commitment, AI policy, and oversight structures
- **Planning**: Risk and opportunity assessment, AI system impact assessment
- **Support**: Resources, competence, awareness, and documentation
- **Operation**: AI system development and procurement processes
- **Performance evaluation**: Monitoring, audit, and management review
- **Improvement**: Nonconformity handling and continual improvement

### Certification Value

ISO 42001 certification signals to customers, regulators, and partners that AI is managed systematically. For organizations operating in regulated industries or selling to enterprise buyers, certification provides a competitive advantage and due diligence shortcut.

### Relationship to ISO 27001

ISO 42001 is designed to integrate with ISO 27001. Many organizations build their AIMS on top of an existing ISMS. If you have ISO 27001, the incremental lift for 42001 is manageable.

---

## UK, Canada, and Asia-Pacific Approaches

**UK**: Pro-innovation, principles-based approach. No dedicated AI Act equivalent; existing regulators (FCA, ICO, CMA) apply sector-specific guidance. The AI Safety Institute leads on advanced AI evaluation.

**Canada**: The Artificial Intelligence and Data Act (AIDA) proposed binding requirements for high-impact AI systems. As of 2024, still moving through legislative process.

**Singapore**: The Model AI Governance Framework provides voluntary guidelines widely adopted by financial institutions in the region.

**Japan**: Principle-based AI governance with soft regulation; strong industry self-governance culture.

**China**: Multiple sector-specific regulations covering recommendation algorithms, deepfakes, and generative AI. Strict content requirements tied to Chinese law.

---

## Building a Compliance-Ready AI Program

Regardless of which frameworks apply to you, the operational foundations are similar:

### 1. AI Inventory
Catalog every AI system in production and development. For each: vendor or internal, use case, data inputs, outputs, decision authority, and population affected.

### 2. Risk Classification
Apply the EU AI Act risk tiers (or equivalent) to your inventory. Even if you're not EU-regulated, this classification discipline is sound risk management.

### 3. AI Governance Policy
Document your AI risk appetite, prohibited use cases, acceptable use requirements, and oversight structures. This becomes the reference document for disputes and audits.

### 4. Impact Assessments
High-risk deployments require documented AI impact assessments before go-live. Map the potential harms, affected populations, and mitigations.

### 5. Ongoing Monitoring
AI systems drift. Performance degrades. Use cases expand. Governance requires continuous monitoring, not just pre-deployment review.

### 6. Incident Response
Define what constitutes an AI incident. Establish reporting thresholds (internal escalation, regulator notification). Practice tabletop exercises.

---

## Key Takeaways

- The EU AI Act is binding law with extraterritorial reach affecting any organization serving EU residents.
- High-risk AI classification triggers significant documentation, assessment, and monitoring requirements.
- NIST AI RMF and ISO 42001 provide complementary voluntary frameworks that are increasingly expected as baselines.
- Governance is operationalized through inventory, classification, policy, impact assessment, monitoring, and incident response.
- Start with inventory: you can't govern what you haven't cataloged.
