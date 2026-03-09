---
title: "The AI Attack Surface"
description: "Map the full attack surface of modern AI systems: models, infrastructure, supply chain, and agentic pipelines."
moduleNumber: 1
duration: "25 min"
pillar: ["security"]
isFinal: false
draft: false
quiz:
  - question: "Which of the following is NOT a layer of the AI attack surface?"
    options:
      - id: "a"
        label: "Model weights and training data"
      - id: "b"
        label: "Inference infrastructure and APIs"
      - id: "c"
        label: "The end-user's monitor brightness setting"
      - id: "d"
        label: "Third-party model supply chain"
    correct: "c"
  - question: "What distinguishes an agentic AI system's attack surface from a traditional API?"
    options:
      - id: "a"
        label: "Agentic systems can only run on cloud infrastructure"
      - id: "b"
        label: "Agentic systems have tool-use and memory capabilities that expand the blast radius of a compromise"
      - id: "c"
        label: "Traditional APIs have no attack surface"
      - id: "d"
        label: "Agentic systems never connect to external data sources"
    correct: "b"
  - question: "Model supply chain risk is best mitigated by:"
    options:
      - id: "a"
        label: "Using only open-source models regardless of source"
      - id: "b"
        label: "Verifying model provenance, reviewing model cards, and scanning weights before deployment"
      - id: "c"
        label: "Disabling all model updates after initial deployment"
      - id: "d"
        label: "Running models offline with no internet access"
    correct: "b"
  - question: "What is 'model inversion' in the context of AI security?"
    options:
      - id: "a"
        label: "Reversing the order of model layers during inference"
      - id: "b"
        label: "An attack that reconstructs training data from model outputs or gradients"
      - id: "c"
        label: "Converting a model from one framework to another"
      - id: "d"
        label: "Running inference in reverse to generate inputs"
    correct: "b"
  - question: "Which statement about AI infrastructure exposure is most accurate?"
    options:
      - id: "a"
        label: "GPU instances have no unique security considerations beyond standard VMs"
      - id: "b"
        label: "Model serving endpoints, vector databases, and embedding APIs each represent distinct attack vectors"
      - id: "c"
        label: "Containerized AI workloads are inherently secure"
      - id: "d"
        label: "Only the model weights matter; runtime infrastructure is irrelevant"
    correct: "b"
---

## Overview

Every AI system you deploy has an attack surface. Unlike traditional software where the attack surface is relatively well-understood, AI systems introduce new categories of risk at every layer: the model itself, the data it was trained on, the infrastructure it runs on, and the agentic pipelines it participates in.

This module maps the full AI attack surface so you can reason about risk systematically rather than reactively.

---

## Layer 1: The Model

The model is not just software -- it is a learned artifact with embedded behaviors, biases, and potentially exploitable properties.

**Weights and parameters** store the model's "knowledge." If an adversary gains read access to model weights, they can:
- Analyze the model offline for vulnerabilities
- Clone or distill a proprietary model
- Probe for embedded sensitive information from training data

**Training data** shapes model behavior. Poisoned training data is one of the highest-impact supply chain attacks available. An adversary who can insert malicious examples into a training set can introduce backdoors that activate on specific inputs -- undetectable through normal testing.

**Fine-tuning** surfaces are increasingly common. Many organizations fine-tune foundation models on proprietary data. This creates a new risk: the fine-tuning process itself can be attacked if the training pipeline lacks integrity controls.

---

## Layer 2: The Inference Infrastructure

When your model is deployed, it lives inside an inference stack. That stack has its own attack surface.

**Model serving endpoints** (REST APIs, gRPC services) are internet-facing software. They inherit all traditional web API risks: authentication failures, injection attacks, rate limiting gaps, and unauthorized access.

**Vector databases** power RAG (Retrieval-Augmented Generation) systems. These stores hold embeddings derived from sensitive documents. A compromised vector database leaks document content indirectly -- attackers can query for semantically similar embeddings and reconstruct source material.

**Embedding APIs** convert text, images, or other data to vector representations. Embedding leakage can reveal sensitive input patterns even when the raw content isn't exposed.

**Model caches and logging pipelines** often capture raw prompts and outputs for observability. These logs are high-value targets: they contain user queries, system prompts, and potentially PII.

---

## Layer 3: The AI Supply Chain

Modern AI systems are assembled from components you don't fully control.

**Foundation model providers** (OpenAI, Anthropic, Google, Meta) each have their own security posture, terms of service, and data handling practices. Your threat model must account for provider-side incidents.

**Open-source model hubs** (Hugging Face, Ollama registry) host thousands of community-contributed models. Model cards are self-reported; malicious weights can be published alongside legitimate ones. Treat open-source model downloads like open-source code: verify provenance, check signatures, and scan before deploying.

**Third-party tools and plugins** connected to LLM pipelines (web search, code execution, email) each expand the attack surface. A compromised plugin can exfiltrate data or issue unauthorized actions on behalf of the model.

**Training data sources** -- especially web-scraped or third-party datasets -- are supply chain inputs. Data poisoning attacks targeting publicly scraped training corpora are well-documented.

---

## Layer 4: Agentic Pipelines

Agentic AI systems are qualitatively different from single-inference APIs. An agent that can browse the web, execute code, read files, and send emails has a dramatically larger blast radius if compromised.

**Tool-use capabilities** give agents real-world effect. An agent with filesystem access can exfiltrate data; one with email access can send phishing messages; one with code execution can run arbitrary commands. Assess each tool grant as you would a RBAC permission.

**Memory and context persistence** allow agents to carry information across sessions. A compromised long-term memory store can influence future agent behavior in hard-to-detect ways.

**Multi-agent orchestration** introduces trust boundary questions: when one agent calls another, what authorization does the callee have? Agent-to-agent communication is an emerging attack vector with limited defense tooling today.

**Environmental inputs** for agentic systems (web content, documents, API responses) are untrusted data sources. This is the attack surface exploited by prompt injection -- covered in Module 2.

---

## Mapping Your Attack Surface

A practical AI attack surface map for any system should answer:

1. **Model provenance**: Where did the model come from? Who trained it on what data?
2. **Inference exposure**: What interfaces expose the model? Are they authenticated? Rate-limited?
3. **Data flows**: What data enters and exits the AI system? Where is it logged or cached?
4. **Tool grants**: What real-world capabilities does the system have? What's the blast radius of compromise?
5. **Supply chain dependencies**: What third-party models, datasets, plugins, and providers does the system depend on?
6. **Human-in-the-loop gaps**: Where does the system take action without human review?

This map is the foundation for threat modeling -- you can't defend what you haven't enumerated.

---

## Key Takeaways

- AI attack surfaces extend well beyond the model itself: infrastructure, supply chain, and agentic capabilities each introduce distinct risks.
- Training data integrity is a supply chain security problem; treat it accordingly.
- Agentic systems require permission modeling similar to service accounts or privileged identities.
- Start every AI security engagement by mapping the attack surface before assessing individual vulnerabilities.
