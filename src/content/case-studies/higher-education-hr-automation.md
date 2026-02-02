---
title: "Major University Automates HR Operations with LLM-Powered Orchestration"
description: "How a research university transformed HR services with Ellucian Banner integration, automated reporting, and AI-powered employee self-service."
client: "Major Research University"
industry: "Higher Education"
pillar: ["implementation", "governance"]
challenge: "HR staff spent excessive time on manual report generation and explaining complex benefits policies. Siloed systems and lack of integration between Banner and other platforms created data delays and employee frustration."
outcome: "Deployed end-to-end automation connecting Banner via Ethos APIs to Power Automate, with LLM-powered explanations for benefits and leave policies. Self-repairing workflows ensure 24/7 reliability."
metrics:
  primary:
    value: "64%"
    label: "Faster Cycle Time"
  secondary:
    value: "24/7"
    label: "Self-Service Access"
  tertiary:
    value: "Self-Healing"
    label: "Orchestration"
image: "/images/case-studies/higher-ed-automation.webp"
imageAlt: "University HR automation workflow visualization"
gated: false
---

## The Challenge

This large research university with 8,000+ employees faced a common but costly problem: their HR team was drowning in repetitive inquiries and manual processes.

The daily reality included:

- Constant questions about leave policies (FMLA, sick leave, vacation accrual calculations)
- Benefits enrollment confusion and plan comparison requests
- Payroll inquiries requiring manual lookup across systems
- HRIS report generation consuming significant staff time

The technical landscape made things worse. Ellucian Banner served as the system of record, but data sat siloed between Banner, benefits providers, and timekeeping systems. Getting a complete picture of an employee's status required logging into multiple platforms and manually reconciling information.

Employees experienced this as slow response times and frustrating complexity. Faculty and staff waited days for answers to straightforward questions. HR staff found themselves repeatedly explaining the same policies while struggling to keep up with urgent requests.

Previous automation attempts had failed. Brittle integrations broke during peak periods like open enrollment. Scripts required constant maintenance. The HR team had learned to distrust automation.

## Our Approach

We started with a two-week discovery phase that revealed several critical insights:

**Data Landscape**: Banner contained the authoritative employee data, but accessing it required navigating complex database structures. The Ethos API layer provided a cleaner abstraction, though the university hadn't fully leveraged it.

**Integration Opportunity**: The university had invested in Microsoft 365. Power Automate could provide enterprise-grade orchestration with native ecosystem compatibility, avoiding the need for custom middleware.

**Common Questions**: Analysis of HR ticket data showed that 70% of inquiries related to leave policies and benefits explanations. These questions were complex but followed predictable patterns.

**Reliability Requirement**: Open enrollment and fiscal year-end processing created predictable spikes. Any solution had to handle these periods without degradation or failure.

Based on these findings, we designed a three-phase approach focusing on reliability first, automation second, and intelligent assistance third.

## The Solution

### Phase 1: Ethos API Integration Layer

We established secure, authenticated data flows between Power Automate and Banner via Ellucian Ethos APIs:

- Employee records and demographics
- Leave balances and accrual rates
- Benefits enrollment data
- Position and compensation information

This phase required careful credential management and API governance. We worked with university IT security to ensure all data flows met institutional policies and FERPA requirements.

The Ethos abstraction proved valuable. Rather than writing queries against Banner's complex data model, we could work with clean, well-documented API endpoints. When Banner underwent a version update mid-project, the Ethos layer shielded our integrations from breaking changes.

### Phase 2: Self-Healing Automated Workflows

The HR team's distrust of automation stemmed from past experiences with brittle systems. We addressed this directly by building resilience into every workflow.

**HRIS Reporting**: Automated generation and distribution of standard reports. Instead of HR staff manually running queries and emailing spreadsheets, reports generate on schedule and route automatically.

**Retry Logic**: Transient API failures don't cause workflow failures. Automatic retry with exponential backoff handles temporary network issues and API rate limits.

**Circuit Breakers**: When persistent failures occur, the system stops attempting operations that will fail, alerts administrators, and queues work for later processing.

**Self-Repairing Orchestration**: Failed operations automatically retry during the next maintenance window. The system detects when conditions improve and processes the backlog without manual intervention.

**Monitoring and Alerting**: Operations staff receive proactive notifications about issues requiring attention, with clear diagnostic information.

### Phase 3: LLM-Powered Policy Explanation

The most innovative component addressed the complexity of HR policy interpretation. Employees struggled to understand:

- How their leave accruals were calculated and when they would be eligible for FMLA
- The differences between benefits plan options during open enrollment
- Retirement contribution options and matching rules
- How policy exceptions applied to their specific situations

We integrated an LLM to provide personalized policy explanations. The system pulls the employee's actual data from Banner and explains policies in the context of their specific situation.

**Personalized Calculations**: "Based on your hire date of March 2019 and your current position classification, you accrue 8 hours of vacation per pay period. Your current balance is 120 hours."

**Plan Comparisons**: "Looking at your family size and typical healthcare usage, here's how the PPO and HDHP options compare for your situation..."

**Clear Language**: The LLM translates bureaucratic policy documents into plain language while maintaining accuracy.

**Guardrails**: The system explains policies but doesn't make policy decisions. Edge cases and exceptions route to HR staff with full context. The LLM acknowledges uncertainty rather than hallucinating answers.

**Escalation Path**: When questions fall outside the system's scope, employees receive clear instructions for reaching HR directly, along with expected response times.

## Implementation

The rollout followed a careful progression:

**Weeks 1-4**: Ethos API integration and Power Automate infrastructure. Established secure connections, configured authentication, and validated data flows.

**Weeks 5-8**: Core HRIS reporting workflows with self-healing logic. Started with low-risk reports and expanded as confidence grew.

**Weeks 9-12**: LLM integration pilot with HR department. Staff tested the system extensively, identifying edge cases and refining prompts.

**Weeks 13-16**: Full rollout across university. Phased by department to manage change and support burden.

Throughout implementation, we maintained clear communication with employees about what the system could and couldn't do. Setting appropriate expectations prevented frustration and built trust.

## Results

Six months post-implementation:

**64% Faster Cycle Time**: Process time reduced across HR workflows. What previously took days now completes in hours or minutes.

**24/7 Availability**: Employees access information anytime without waiting for HR office hours. International faculty particularly appreciate overnight availability.

**Self-Healing Orchestration**: Workflows recover automatically from failures. During the first open enrollment period post-implementation, the system handled 3x normal volume with zero manual intervention.

**Data Accuracy**: Single source of truth via Banner/Ethos integration eliminated reconciliation errors and conflicting information.

**HR Staff Impact**: The team shifted from answering routine questions to strategic initiatives including benefits plan optimization and workforce planning.

**Employee Satisfaction**: Survey results showed significant improvement in HR service perception, with particular praise for response speed and policy clarity.

## Lessons Learned

Several factors contributed to success:

**Ethos API Value**: The clean abstraction over Banner complexity justified the investment. Direct database integration would have been faster initially but fragile long-term.

**Self-Healing Design**: Building resilience from the start prevented the operations burden that had doomed previous automation efforts. The HR team's trust in the system grew as they watched it handle failures gracefully.

**LLM Guardrails**: Essential to scope responses to policy explanation, not policy decisions. We invested significant time in prompt engineering and testing edge cases. The system's ability to say "I don't know, here's how to reach HR" proved as important as its ability to answer questions.

**Change Management**: Faculty and staff adoption required sustained communication and training. We partnered with the university's change management team to develop materials and support plans.

**Governance Documentation**: All data flows documented for FERPA compliance. This documentation proved valuable during an unrelated compliance audit, demonstrating the university's control over employee data.

## Looking Forward

The university is now exploring expansion of AI capabilities:

- Extending LLM assistance to onboarding, helping new employees navigate first-week logistics
- Predictive analytics for workforce planning and retention risk identification
- Additional campus system integrations (facilities, parking, ID services)

The foundation we built supports these extensions while maintaining the governance and reliability that earned stakeholder trust.

---

*This case study represents a composite of similar engagements with details modified to protect client confidentiality.*
