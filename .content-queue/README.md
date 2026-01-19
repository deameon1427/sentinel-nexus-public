# Content Generation Queue

This folder implements a git-based queue system for automated content generation using Ollama LLM on the Vultr VPS.

## How It Works

1. **Create a topic file** in `.content-queue/pending/` using one of the templates
2. **Push to GitHub** - webhook triggers n8n workflow
3. **n8n processes the queue** - reads topic files, calls Ollama API
4. **PR created automatically** - generated content submitted as a pull request
5. **Review and merge** - human review ensures quality before publishing

## Quick Start

### Create a Blog Post Topic

```bash
cp .content-queue/templates/blog-topic.md .content-queue/pending/my-topic-slug.md
# Edit the file with your topic details
git add .content-queue/pending/my-topic-slug.md
git commit -m "Queue: new blog topic - my-topic-slug"
git push
```

### Create a Case Study Topic

```bash
cp .content-queue/templates/case-study-topic.md .content-queue/pending/client-case-study.md
# Edit the file with case study details
git add .content-queue/pending/client-case-study.md
git commit -m "Queue: new case study - client-case-study"
git push
```

## Topic File Format

Topic files use YAML frontmatter followed by markdown content:

```yaml
---
type: blog | case-study
title: "Suggested Title Here"
pillar: implementation | security | governance
industry: General | Healthcare | Financial | Manufacturing | Retail | Technology
tags: ["tag1", "tag2"]
image: /images/blog/suggested-image.webp
---

## Context
Why this topic matters...

## Key Points to Cover
- Point 1
- Point 2

## Target Audience
Who should read this...
```

## Folder Structure

```
.content-queue/
├── README.md          # This file
├── templates/         # Topic file templates (tracked)
│   ├── blog-topic.md
│   └── case-study-topic.md
├── prompts/           # System prompts for Ollama (tracked)
│   ├── blog-system-prompt.md
│   └── case-study-system-prompt.md
├── pending/           # Drop new topic files here (tracked)
├── processing/        # Files being processed (gitignored)
└── done/              # Completed topics (gitignored)
```

## Tips for Better Output

1. **Be specific in Context** - More background = better content
2. **List concrete Key Points** - Vague bullets produce vague content
3. **Include References** - Links to research help ground the output
4. **Choose the right pillar** - Affects tone and related content suggestions

## Model Selection

The n8n workflow uses Ollama with these model options:

| Model | Quality | Speed | Best For |
|-------|---------|-------|----------|
| llama3.2:3b | Good | Fast | Quick drafts, testing |
| llama3.2:8b | Better | Moderate | Production content |
| deepseek-r1:8b | Best | Slow | Complex topics, analysis |

Default: `llama3.2:3b` (can be changed in n8n workflow settings)

## Troubleshooting

**Topic not processing?**
- Check if file is valid markdown with proper frontmatter
- Verify n8n workflow is active
- Check n8n execution logs for errors

**Poor quality output?**
- Add more context and key points
- Try a larger model (8b instead of 3b)
- Review and adjust system prompts in `prompts/`

**PR not created?**
- Check GitHub token permissions in n8n
- Verify branch protection rules allow bot commits
