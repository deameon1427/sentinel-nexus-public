---
title: "Building an AI Security Program"
description: "Design and operate an AI security program: risk frameworks, red teaming, incident response, and vendor assessment."
moduleNumber: 4
duration: "30 min"
pillar: ["security", "governance"]
isFinal: false
draft: false
quiz:
  - question: "What is the primary purpose of AI red teaming?"
    options:
      - id: "a"
        label: "To demonstrate that an AI system is perfectly secure before deployment"
      - id: "b"
        label: "To proactively identify safety and security failures through adversarial testing before attackers do"
      - id: "c"
        label: "To train the AI model on red team attack data"
      - id: "d"
        label: "To replace traditional penetration testing entirely"
    correct: "b"
  - question: "Which element of an AI security program addresses 'what do we do when something goes wrong?'"
    options:
      - id: "a"
        label: "AI inventory management"
      - id: "b"
        label: "Vendor risk assessment"
      - id: "c"
        label: "AI incident response plan"
      - id: "d"
        label: "Model performance monitoring"
    correct: "c"
  - question: "A vendor AI security questionnaire should cover all EXCEPT:"
    options:
      - id: "a"
        label: "Model training data provenance and filtering"
      - id: "b"
        label: "The vendor's office interior design choices"
      - id: "c"
        label: "Security testing practices (penetration testing, red teaming)"
      - id: "d"
        label: "Data retention and deletion policies"
    correct: "b"
  - question: "Model drift in a production AI system refers to:"
    options:
      - id: "a"
        label: "The physical movement of server hardware"
      - id: "b"
        label: "Degradation in model performance over time as real-world data distributions shift from training distributions"
      - id: "c"
        label: "Intentional model updates pushed by the vendor"
      - id: "d"
        label: "The model forgetting its system prompt"
    correct: "b"
  - question: "The principle of 'least privilege' applied to AI agents means:"
    options:
      - id: "a"
        label: "Giving agents access to all tools so they can be maximally helpful"
      - id: "b"
        label: "Restricting agent tool grants and data access to only what is necessary for the specific task"
      - id: "c"
        label: "Running agents with minimal computational resources"
      - id: "d"
        label: "Limiting the number of tokens in each agent response"
    correct: "b"
---

## Overview

A mature AI security program is not a checklist -- it is an operational capability that spans people, processes, and technology. This module walks through the core components: how to build them, how to staff them, and how to make them sustainable.

---

## Starting Point: The AI Security Mission

Before building anything, define the mission. AI security has two mandates that often pull in different directions:

**Enable**: AI security should help the organization deploy AI faster and more confidently by providing clear standards, pre-approved architectures, and rapid review processes.

**Protect**: AI security must prevent AI systems from becoming attack vectors -- whether through model compromise, data exposure, or adversarial manipulation.

Organizations that frame AI security purely as a gatekeeper fail at enabling. Organizations that prioritize speed over protection fail at protecting. The program design must hold both.

---

## Component 1: AI Inventory and Classification

You cannot secure what you don't know exists.

**What to capture in your AI inventory:**
- System name and description
- Business owner and technical contact
- AI type (classification, generative, decision support, agentic)
- Data inputs (what data feeds the system, including PII/sensitive data flags)
- Data outputs (what the system produces, and who/what receives it)
- Decision authority (advisory vs. autonomous)
- External dependencies (model providers, APIs, plugins)
- Risk classification (using EU AI Act tiers or your own framework)
- Last security review date

**Governance trigger**: Inventory triggers further action. High-risk classification triggers impact assessment. Customer-facing systems trigger additional review. Agentic systems trigger privilege scope review.

---

## Component 2: AI Security Policy

Policy answers: *What are we allowed to do, what are we required to do, and what is prohibited?*

**Policy elements:**
- **Acceptable use**: What AI use cases are permitted? For what purposes? With what data classifications?
- **Prohibited use cases**: What is explicitly banned (generating CSAM, manipulating employees, making binding legal decisions without human review)?
- **Development standards**: Secure SDLC requirements for internally developed AI, security review gates, and pre-deployment testing requirements
- **Vendor requirements**: Baseline security requirements for AI vendors (covered in detail below)
- **Data governance**: What data can be sent to external AI APIs? How is training data sourced and approved?
- **Incident reporting**: What constitutes an AI security incident, and who must be notified?

Policy without enforcement is theater. Pair your AI security policy with a review process that has teeth.

---

## Component 3: AI Red Teaming

AI red teaming is the practice of adversarially probing AI systems to identify failures before attackers do. It extends traditional penetration testing with AI-specific attack techniques.

### What AI Red Teaming Covers

**Safety failures**: Can the system be prompted to produce harmful content? Can safety guidelines be bypassed?

**Security failures**: Can the system be used to exfiltrate data? Can it be manipulated to take unauthorized actions? Are system prompts leakable?

**Reliability failures**: How does the system perform on edge cases? On adversarial inputs? On distribution-shifted data?

**Fairness and bias**: Does the system perform consistently across demographic groups? Does it encode harmful stereotypes?

### Building a Red Team Capability

**Internal red team**: Security engineers or a dedicated AI safety team who test systems before production deployment. Requires AI-specific training -- traditional pentesters need upskilling on prompt injection, model-specific attacks, and LLM behavior.

**External red team**: Third-party adversarial testing for high-stakes systems. Critical for regulatory compliance (EU AI Act requires it for GPAI systemic risk models) and for independent validation.

**Automated red teaming**: Tools like Garak, PyRIT, and LLM-as-red-teamer setups that systematically probe systems at scale. Complements human red teaming but doesn't replace it.

### Red Team Documentation

Every red team engagement should produce:
- Scope and methodology documentation
- Findings with severity ratings (using AI-adapted CVSS or your own scale)
- Reproduction steps for each finding
- Recommended remediations
- Retest results confirming fixes

---

## Component 4: Vendor Risk Assessment

Most organizations are deployers, not developers, of AI. That means your security posture depends heavily on your AI vendors' security posture.

### AI Vendor Security Questionnaire Areas

**Data handling:**
- Where is customer data sent? Is it used for training?
- What data retention and deletion policies apply?
- Is data encrypted in transit and at rest?

**Model provenance:**
- What training data was used? Was it filtered for harmful content?
- What safety evaluations were conducted pre-deployment?
- Is the model auditable? What documentation exists?

**Security testing:**
- Does the vendor conduct penetration testing? Red teaming? How frequently?
- Has the vendor undergone third-party AI safety evaluation?
- How does the vendor handle security disclosures and patches?

**Incident response:**
- What is the vendor's SLA for notifying customers of security incidents?
- Has the vendor experienced AI-specific incidents? How were they handled?

**Compliance:**
- What frameworks does the vendor align to (SOC 2, ISO 27001, ISO 42001)?
- Is the vendor compliant with applicable AI regulations (EU AI Act, etc.)?
- Can the vendor provide compliance documentation?

### Third-Party Model Risk

If your organization uses open-source models (from Hugging Face, Ollama, or similar hubs), apply a minimum baseline review:
- Verify model card authenticity and review findings
- Scan for known vulnerable checkpoints (check CVE databases and model security research)
- Sandbox deployment before production access
- Pin to specific model versions; review updates before upgrading

---

## Component 5: Monitoring and Detection

AI security monitoring has two layers: **performance monitoring** and **security monitoring**.

### Performance Monitoring

Models degrade. Data distributions shift. What worked at launch may fail six months later.

**Metrics to track:**
- Output quality scores (human raters or LLM-as-judge)
- Task completion rates
- Error and refusal rates (sudden spikes can indicate prompt injection or model changes)
- Latency and throughput (performance degradation may indicate attacks)

### Security Monitoring

AI-specific security monitoring asks: *Is someone attacking this system?*

**What to log:**
- All prompts and responses (with appropriate PII handling)
- Tool calls made by agentic systems
- Retrieval queries and retrieved content (for RAG systems)
- Authentication events and rate limiting triggers

**Anomaly detection:**
- Unusual prompt patterns (encoding tricks, role-play jailbreak signatures)
- Unusually long prompts (often associated with injection attacks)
- Anomalous tool call patterns (unexpected API calls, data exfiltration signatures)
- Responses triggering output filters at higher-than-baseline rates

**Alert thresholds**: Tune alerts based on your baseline. AI security alerting in the first days of a new deployment will be noisy; give systems time to establish baseline behavior before relying on anomaly detection.

---

## Component 6: AI Incident Response

AI incidents require specialized response playbooks distinct from traditional security incidents.

**Types of AI incidents:**
- Prompt injection resulting in unauthorized data access or action
- Jailbreak leading to harmful content generation
- Model supply chain compromise
- Training data breach
- Adversarial manipulation of AI-based decisions (fraud, content moderation bypass)

**AI IR playbook elements:**
1. **Detection**: How is the incident identified? What's the alert source?
2. **Triage**: What's the impact? Is the system still running? Is data exposed?
3. **Containment**: Can the affected AI system be isolated or its tool grants revoked?
4. **Investigation**: What prompts, retrievals, or inputs triggered the incident? Is the model compromised, or is this a prompt-level attack?
5. **Remediation**: Patch, retrain, update filters, or shut down as appropriate
6. **Notification**: Customer notification, regulator notification (where required), vendor notification
7. **Post-incident review**: What failed? What detection missed the attack? What controls would have prevented it?

**Tabletop exercises**: Run AI-specific tabletop exercises annually. Scenario examples: "Our RAG-enabled customer support bot exfiltrated 10,000 customer records via indirect injection" -- walk through detection, response, and communication.

---

## Staffing Your AI Security Program

A mature AI security program requires a blend of skills rarely found in one person:

| Skill area | What it enables |
|---|---|
| Security engineering | Traditional appsec, pentesting, infrastructure security |
| Machine learning / AI | Understanding model behavior, training pipelines, evaluation |
| Data governance | Privacy, data lineage, compliance |
| Policy and legal | Regulatory interpretation, risk appetite setting |
| Red teaming | Adversarial testing, creative attack research |

Most organizations build this capability incrementally: start with existing security engineers who upskill on AI-specific attacks, then add AI/ML expertise as the program matures.

**External partners**: AI security is a nascent field. Specialist external partners (like Sentinel Nexus) can accelerate your program build by bringing patterns from across multiple engagements.

---

## Key Takeaways

- AI security requires both enabling and protecting -- balance speed and safety.
- Inventory and classification are the operational foundation; you can't secure what you don't know exists.
- AI red teaming is a required capability, not optional -- start internal, supplement with external.
- Vendor assessment must include AI-specific questions beyond standard security questionnaires.
- AI incident response requires specialized playbooks; traditional IR misses AI-specific failure modes.
