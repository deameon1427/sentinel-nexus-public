# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sentinel Nexus public website - a business site for an AI implementation, security, and governance consulting firm. Built with Astro 5.x as a static site.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

### Content Collections

The site uses Astro's content collections for blog posts and case studies, defined in `src/content/config.ts`:

- **blog** (`src/content/blog/`): Blog posts with required `pillar` field (implementation | security | governance)
- **case-studies** (`src/content/case-studies/`): Gated case studies with metrics schema

### Routing

- Static pages: `src/pages/*.astro` (index, about, intel)
- Dynamic routes: `src/pages/blog/[...slug].astro` and `src/pages/case-studies/[...slug].astro` use `getStaticPaths()` with content collections

### Key Components

- `src/layouts/Layout.astro`: Base layout with global styles, navbar, and footer. Contains CSS custom properties for theming.
- `src/components/ContactForm.astro`: Form submitting to n8n webhook at `https://n8n.sentinel-nexus.com/webhook/contact-form`

### Styling

All styles use CSS custom properties defined in Layout.astro. Key variables:

- `--color-primary`: #cf1515 (red)
- `--color-accent-1/2/3`: Blue (#3b82f6), Green (#10b981), Purple (#8b5cf6) - used for the three service pillars

### Content Schema Notes

Blog posts require:

- `pillar`: Links to one of three service pillars (affects color coding and related posts)
- `description`: Max 160 chars for SEO

Case studies use:

- `metrics` object with primary/secondary/tertiary value-label pairs
- `gated`: Boolean controlling preview behavior



## Project Context (Load These First)

1. **PRD.md** - `.claude/PRD.md` - Full product requirements, architecture, features
2. **Planning** - `.aoo/.planning/planning.md` - Business context, credentials, server info
3. **Next Steps** - `.aoo/.execution/next-steps.MD` - Current status, completed work, roadmap

## Current Work
None active.

## Dev Server Run Info
WSL requires binding to 0.0.0.0 to be accessible from Windows host:
```bash
npm run dev -- --host 0.0.0.0
```

## n8n & Contact Forms
- No localhost n8n - only runs on public n8n.sentinel-nexus.com
- Contact forms submit JSON to n8n webhook endpoints
- Sidebar contact form (`SidebarContactForm.astro`) appears on blog posts - no need for inline CTA links
- **n8n workflows require manual testing** - You push workflow changes via API. Do not attempt to trigger workflow executions via API. User will test manually in n8n UI.

## Assets
- Stock/test images available in `.aoo/.test/` (e.g., `.aoo/.test/abstract/` for blog featured images)
- Blog images go in `public/images/blog/`

## Removed Features
- No `/schedule` page - Rallly scheduling was removed
- Blog post CTAs should reference the sidebar contact form, not link to /schedule
