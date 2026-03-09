---
title: "Final Assessment"
description: "Demonstrate mastery of AI security fundamentals across all four modules. Score 80% or higher to earn your certificate."
moduleNumber: 5
duration: "30 min"
pillar: ["security", "governance", "implementation"]
isFinal: true
draft: false
quiz:
  - question: "An enterprise is deploying a RAG-based AI assistant that can access internal HR documents and send Slack messages. Which control is MOST critical for reducing the blast radius of a prompt injection attack?"
    options:
      - id: "a"
        label: "Using a larger foundation model for better instruction following"
      - id: "b"
        label: "Applying least privilege to the agent's tool grants and requiring human approval for Slack messages"
      - id: "c"
        label: "Encrypting all HR documents at rest"
      - id: "d"
        label: "Rate limiting user API requests to 10 per minute"
    correct: "b"
  - question: "A company based in the US sells a CV screening AI to EU employers. Under the EU AI Act, which statement is correct?"
    options:
      - id: "a"
        label: "The company is exempt because it is not based in the EU"
      - id: "b"
        label: "CV screening AI is high-risk under the Act, requiring conformity assessment, and the US company must comply due to extraterritorial reach"
      - id: "c"
        label: "Only the EU employer (deployer) has obligations; the US provider has none"
      - id: "d"
        label: "The Act does not cover employment AI systems"
    correct: "b"
  - question: "A security team discovers that their production LLM is producing outputs that encode malicious instructions when specific trigger phrases are present in inputs. What attack does this most likely indicate?"
    options:
      - id: "a"
        label: "Model inversion attack"
      - id: "b"
        label: "Direct prompt injection by a user"
      - id: "c"
        label: "Training data poisoning with a backdoor implant"
      - id: "d"
        label: "Denial of service via large context windows"
    correct: "c"
  - question: "Which combination of controls provides the strongest defense against indirect prompt injection in an agentic system?"
    options:
      - id: "a"
        label: "Longer system prompts and faster inference hardware"
      - id: "b"
        label: "Input sanitization alone"
      - id: "c"
        label: "Least privilege tool access + output validation + human-in-the-loop for high-impact actions"
      - id: "d"
        label: "Switching to a smaller, less capable model"
    correct: "c"
  - question: "An organization's AI incident response plan should include all of the following EXCEPT:"
    options:
      - id: "a"
        label: "Procedures for isolating a compromised AI system"
      - id: "b"
        label: "Regulator notification thresholds and procedures"
      - id: "c"
        label: "A guarantee that AI systems will never experience incidents"
      - id: "d"
        label: "Post-incident review to identify control gaps"
    correct: "c"
  - question: "The NIST AI RMF GOVERN function primarily addresses:"
    options:
      - id: "a"
        label: "Technical evaluation of model performance metrics"
      - id: "b"
        label: "Organizational structures, policies, culture, and accountability for AI risk management"
      - id: "c"
        label: "Quantitative measurement of AI bias"
      - id: "d"
        label: "Vendor procurement processes"
    correct: "b"
  - question: "Which statement about AI attack surface mapping is correct?"
    options:
      - id: "a"
        label: "Only the model weights represent an attack surface; infrastructure is irrelevant"
      - id: "b"
        label: "Attack surface mapping is only required for externally deployed AI systems"
      - id: "c"
        label: "The attack surface includes model, inference infrastructure, supply chain, and agentic capabilities"
      - id: "d"
        label: "Attack surface mapping is a one-time pre-deployment activity"
    correct: "c"
  - question: "A financial services firm using an AI system for loan decisions wants to comply with ISO 42001. What is the FIRST step?"
    options:
      - id: "a"
        label: "Immediately apply for ISO 42001 certification"
      - id: "b"
        label: "Conduct a gap assessment against ISO 42001 requirements to understand current state"
      - id: "c"
        label: "Replace all human loan officers with the AI system"
      - id: "d"
        label: "Hire a new CISO"
    correct: "b"
  - question: "Model drift in a production AI system is best addressed by:"
    options:
      - id: "a"
        label: "Ignoring it until users complain"
      - id: "b"
        label: "Replacing the model with a larger one every year"
      - id: "c"
        label: "Continuous performance monitoring with defined alert thresholds and a retraining or recalibration plan"
      - id: "d"
        label: "Locking model weights so they cannot change"
    correct: "c"
  - question: "When assessing an AI vendor's security posture, which area is most likely to be MISSED by a standard security questionnaire that doesn't account for AI-specific risks?"
    options:
      - id: "a"
        label: "Network encryption practices"
      - id: "b"
        label: "Physical data center security"
      - id: "c"
        label: "Training data provenance, red teaming practices, and model-specific safety evaluations"
      - id: "d"
        label: "Employee background check policies"
    correct: "c"
---

## Final Assessment Instructions

This assessment covers all four modules of the AI Security Fundamentals certification:

- **Module 1**: The AI Attack Surface
- **Module 2**: Prompt Injection and Adversarial Techniques
- **Module 3**: AI Governance and Compliance Frameworks
- **Module 4**: Building an AI Security Program

You must score **80% or higher** (8 of 10 questions correct) to pass and earn your certificate.

Take your time. Review your module content if needed before starting. There is no time limit.

When you pass, your certificate will be emailed to the address you enrolled with. A shareable verification link will be provided immediately.

Good luck.
