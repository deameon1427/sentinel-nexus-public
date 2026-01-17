---
title: "Building a Self-Operating Marketing Engine"
description: "How Sentinel Nexus built its own website as a demonstration of AI-powered automation, self-hosted infrastructure, and operational excellence."
client: "Sentinel Nexus"
industry: "Technology"
pillar: ["implementation", "security", "governance"]
challenge: "Build a marketing website that demonstrates our automation expertise—with AI content pipelines, real-time lead capture, and privacy-first infrastructure—while practicing what we preach."
outcome: "A fully automated marketing platform with 5 active workflows, 100% self-hosted infrastructure, and sub-24-hour content cycles from RSS aggregation to deployment."
metrics:
  primary:
    value: "5"
    label: "Active Workflows"
  secondary:
    value: "100%"
    label: "Self-Hosted"
  tertiary:
    value: "<24hr"
    label: "Content Cycle"
image: "/images/case-studies/sentinel-nexus-automation.jpg"
imageAlt: "Sentinel Nexus automation architecture"
gated: false
previewLength: 600
---

## The Challenge

Most consulting firm websites are static brochures. They describe capabilities but don't demonstrate them. For Sentinel Nexus, that wasn't good enough.

We needed a marketing platform that would:

- **Demonstrate our expertise** by operating on the same automation principles we implement for clients
- **Respect privacy** with zero third-party tracking dependencies or SaaS data sharing
- **Run autonomously** with minimal manual intervention for content updates and lead management
- **Scale efficiently** without requiring dedicated operations staff

The constraint: a single-person team with limited time. Every hour spent on manual website tasks was an hour not spent serving clients.

Traditional approaches wouldn't work. WordPress with plugins creates maintenance burden and security exposure. SaaS website builders share data with third parties. Static sites solve some problems but typically lack automation capabilities.

We needed a different architecture.

## Our Approach

We applied the same methodology we use with clients: start with requirements, design for automation, build incrementally, and validate at each phase.

**Technology Selection:**

- **Astro** for the static site framework—fast builds, content collections, zero client-side JavaScript by default
- **n8n** for workflow orchestration—self-hosted, visual workflow builder, extensive integrations
- **Vultr VPS** for infrastructure—single server running all components, full control
- **Git** for content management—version control, PR-based workflows, no CMS overhead

**Architecture Principles:**

- Webhook-driven: events trigger actions automatically
- Stateless where possible: static site, JSON data files
- Observable: Slack notifications for all significant events
- Recoverable: Git-based content, documented configurations

## The Solution

### Phase 1: Website Foundation

We deployed an Astro 5.x static site with:

- **Content Collections** for blog posts and case studies with type-safe schemas
- **Three-pillar design system** with distinct colors for Implementation (blue), Security (green), and Governance (purple)
- **Dark theme** optimized for technical audiences
- **Responsive layouts** that work across all device sizes

Build times under 2 seconds. Lighthouse scores above 90. Zero runtime dependencies.

### Phase 2: Automation Layer

Five n8n workflows power the site's autonomous operation:

**1. Contact Form Handler**
When a visitor submits the contact form:
- Webhook receives the submission instantly
- Data validates and stores in local JSON (no external database)
- Slack notification reaches the team within seconds
- Lead record created for follow-up tracking

**2. RSS Feed Aggregator**
Every 6 hours:
- Fetches from 11 security and AI news sources
- Deduplicates and categorizes articles
- Merges with existing content (30-day retention)
- Triggers site rebuild to update the Intel page

**3. GitHub Auto-Deploy**
On every push to main:
- Webhook triggers the build process
- Site rebuilds and deploys automatically
- Slack notification confirms success or reports errors
- Zero manual deployment steps required

**4. Health Monitoring**
Every 6 hours:
- Pings the production site
- Validates response and performance
- Alerts on any degradation

**5. Contact Notifications**
Legacy workflow for email-based notifications as backup to Slack.

### Phase 3: Content Infrastructure

**Blog Collection:**
- Posts organized by pillar (implementation, security, governance)
- Automatic filtering and related post suggestions
- Sidebar CTAs for lead capture

**Intel Page:**
- Real-time aggregation of industry news
- Four categories: Security News, AI & Cloud, Vulnerabilities, GRC Updates
- Automated refresh without manual curation

**Case Studies:**
- Optional email gating for premium content
- Metrics banner highlighting key outcomes
- Consistent structure for easy scanning

## Architecture Highlights

```
┌─────────────────────────────────────────────────────┐
│                   VULTR VPS                         │
│                 64.176.222.190                      │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐    ┌─────────────────────────────┐    │
│  │  NGINX   │    │      DOCKER STACK           │    │
│  │  (443)   │──▶│  ┌─────┐  ┌────────────┐    │    │
│  │  SSL     │    │  │ n8n │  │ PostgreSQL │    │    │
│  └────┬─────┘    │  └──┬──┘  └────────────┘    │    │
│       │          └─────┼───────────────────────┘    │
│       ▼                │                            │
│  ┌──────────┐          │                            │
│  │  Static  │◀────────┘ (rebuild triggers)         │
│  │   Site   │                                       │
│  └──────────┘                                       │
└─────────────────────────────────────────────────────┘
         ▲                        │
         │                        ▼
    ┌────┴────┐              ┌─────────┐
    │ GitHub  │◀───────────▶│  Slack  │
    │  Repo   │   webhooks   │  Alerts │
    └─────────┘              └─────────┘
```

**Key Design Decisions:**

- **Local JSON storage** instead of external database—reduces dependencies, simplifies backup
- **Webhook-driven workflows** instead of polling—immediate response, efficient resource use
- **Static site generation** instead of server-side rendering—eliminates runtime security surface
- **Self-hosted n8n** instead of Zapier/Make—full data control, no usage limits

## Results

Six weeks from concept to production:

**Automation Metrics:**
- 5 production workflows running continuously
- 11 RSS sources aggregated every 6 hours
- Real-time lead notifications (seconds, not hours)
- Zero manual deployment steps since launch

**Performance:**
- Build time: <2 seconds
- Page load: <1 second on broadband
- Lighthouse Performance: 95+

**Privacy:**
- 100% self-hosted infrastructure
- Zero third-party analytics or tracking
- No data shared with SaaS platforms
- Full GDPR compliance by design

**Operational:**
- Single VPS runs everything (~$24/month)
- No dedicated ops staff required
- Git-based content enables async collaboration
- Complete audit trail of all changes

## Lessons Learned

**Self-hosting requires upfront investment but pays dividends.** The initial setup took longer than clicking "deploy" on a SaaS platform. But we now have complete control, zero recurring SaaS fees beyond hosting, and no vendor lock-in.

**n8n is the right tool for this scale.** Visual workflow design accelerates development. Self-hosting eliminates execution limits. The learning curve is modest for anyone comfortable with APIs.

**Static sites aren't limiting—they're liberating.** By generating HTML at build time, we eliminated an entire category of security concerns and operational complexity. The "limitation" of no server-side code became an advantage.

**Automation compounds.** Each workflow we built enabled the next. The RSS aggregator depends on the auto-deploy. The contact handler builds on the notification patterns. Starting small and expanding incrementally proved more effective than designing everything upfront.

**Eat your own cooking.** Running our marketing on the same architecture we recommend to clients creates accountability. Every limitation we encounter informs our client work. Every improvement benefits both.

## Looking Forward

The foundation supports continued expansion:

- **AI content generation** workflow for draft blog posts
- **Social media distribution** on content publish
- **Enhanced analytics** with privacy-preserving metrics
- **Additional RSS sources** for broader intel coverage

The architecture scales without fundamental changes. New workflows plug into existing patterns. New content types use established collections.

This is what we mean by "operational partner." Not just advice—working systems that demonstrate the approach.

---

*This case study describes Sentinel Nexus's own infrastructure. The workflows, architecture, and metrics are drawn from our production environment.*
