# Ostlii Insights — Content Pipeline

Markdown-to-branded-article pipeline for ostlii.com. Write a markdown file, push, and get a fully branded article page with LinkedIn-ready OG tags.

---

## Architecture

```
You write markdown → 11ty builds HTML → Netlify auto-deploys → LinkedIn pulls clean preview card
```

- **Static site generator:** Eleventy (11ty)
- **Hosting:** Netlify (free tier, auto-deploys from GitHub)
- **Content format:** Markdown files with YAML front matter
- **Output:** Static HTML at `/insights/your-article-slug/`
- **Integration:** Main site (ostlii.com on Wix) links to `/insights/` section

---

## Setup (One-Time)

### 1. Create GitHub repo
```bash
# Create new repo: OSTLII/insights (public or private, doesn't matter on Netlify)
# Push this entire folder to it
git init
git add .
git commit -m "Initial insights pipeline"
git remote add origin https://github.com/OSTLII/insights.git
git push -u origin main
```

### 2. Connect to Netlify
1. Go to app.netlify.com → Add new site → Import from Git
2. Select the OSTLII/insights repo
3. Build settings should auto-detect from netlify.toml:
   - Build command: `npm install && npm run build`
   - Publish directory: `_site`
4. Deploy

### 3. Set up custom domain (optional but recommended)
Two options:

**Option A — Subdirectory (recommended):**
On Wix, embed the Netlify site at `/insights/` using a redirect or iframe embed. This keeps everything under ostlii.com.

**Option B — Subdomain:**
Set up `insights.ostlii.com` pointing to Netlify. Add the custom domain in Netlify settings.

### 4. Link from main site
Add "Insights" to the nav on ostlii.com pointing to wherever the blog lives.

---

## Daily Workflow: Publishing an Article

### Step 1: Create the post
```bash
npm run new -- "Your Article Title Here"
# Creates: src/posts/your-article-title-here.md
```

### Step 2: Edit the markdown file
Open the generated file and fill in:

```yaml
---
title: "Your Article Title Here"
description: "One sentence for social previews and SEO. Keep under 160 chars."
date: 2026-02-15
category: "Industry"          # Options: Industry, Strategy, Tools, Implementation
tags: ["ai-tools", "smb"]    # For future filtering
readTime: 5                   # Estimated minutes
ogImage: "your-slug-og.png"  # Social share image filename
layout: article.njk
---

Write your article in standard markdown.

## Subheadings work

So do **bold**, *italic*, [links](https://example.com), and:

> Blockquotes for pull quotes or key points.

- Bullet points
- When needed
```

### Step 3: Create the OG image
1. Open `og-template.html` (in the project root) in a browser
2. Edit the title and subtitle in the HTML
3. Screenshot at 1200x627 pixels (Chrome DevTools responsive mode works)
4. Save to `src/assets/img/your-slug-og.png`

Or use a Canva template matching the same design.

### Step 4: Deploy
```bash
git add .
git commit -m "New post: Your Article Title"
git push
```
Netlify auto-builds and deploys. Live in ~60 seconds.

### Step 5: Share on LinkedIn
1. Copy the article URL
2. Paste into a new LinkedIn post
3. Wait for the preview card to render (should show OG image, title, description)
4. Add 2-3 sentences of your take above the link
5. Post

---

## Front Matter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Article headline |
| `description` | Yes | SEO/social description, under 160 chars |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `category` | No | Industry, Strategy, Tools, or Implementation |
| `tags` | No | Array of tags for future filtering |
| `readTime` | No | Estimated read time in minutes |
| `ogImage` | No | Filename in src/assets/img/ (defaults to og-default.png) |
| `layout` | Yes | Always `article.njk` |

---

## Content Categories

- **Industry** — Market shifts, AI news reactions, honest broker perspective on industry trends
- **Strategy** — How to evaluate AI tools, decision frameworks, ROI analysis methods
- **Tools** — Reviews, comparisons, breakdowns of specific platforms (vendor-neutral)
- **Implementation** — Lessons from deployments, common pitfalls, change management

---

## File Structure

```
ostlii-blog/
├── .eleventy.js              # Build config
├── netlify.toml              # Deploy config
├── package.json              # Dependencies
├── og-template.html          # OG image design template (open in browser)
├── scripts/
│   └── new-post.js           # Post scaffolder
└── src/
    ├── _data/
    │   └── site.json          # Global site data (branding, URLs, etc.)
    ├── _includes/
    │   ├── base.njk           # HTML shell with OG tags and all CSS
    │   └── article.njk        # Article layout (header, body, CTA)
    ├── assets/
    │   └── img/               # OG images go here
    ├── insights.njk           # Listing page (/insights/)
    └── posts/                 # ← YOUR ARTICLES GO HERE
        ├── posts.json         # Default layout + permalink config
        └── *.md
```

---

## Branding Reference

- **Sage:** #7a8b6f
- **Gold:** #d4af37
- **Cream:** #f5f2e8
- **Dark:** #1a1a1a
- **Fonts:** DM Serif Display (headings), DM Sans (body)
- **Tone:** Direct, professional, zero-hype. Insurance industry rigor meets tech clarity.
- **Voice:** Practitioner, not pundit. Show evidence, disclose incentives, skip buzzwords.

---

## LinkedIn Posting Tips

- **Lead with your take**, not "check out our new article." Say something specific and opinionated in 2-3 sentences, then drop the link.
- **Post cadence:** 1-2x per week. Consistency beats volume.
- **Content mix:** 
  - 40% industry reaction (what just happened + your take)
  - 30% practical advice (one thing an SMB can do this week)
  - 30% thought leadership (honest broker perspective)
- **Hashtags:** 3-5 max. #AItools #SmallBusiness #AIimplementation #HonestBroker
- **Engage replies** within the first hour — LinkedIn's algorithm rewards early engagement.

---

## Troubleshooting

**LinkedIn preview not showing?**
- Clear the LinkedIn cache: linkedin.com/post-inspector/ → paste URL → click Inspect
- Verify OG tags are in the page source (View Source → search for "og:")
- Make sure the og:image URL is absolute (starts with https://)

**Build failing on Netlify?**
- Check build logs at app.netlify.com → your site → Deploys
- Most common: missing front matter field or bad YAML formatting
- Run `npm run serve` locally to test before pushing

**OG image not rendering?**
- Must be at least 1200x627 pixels
- Must be a valid PNG or JPG
- File must exist at the path specified in `ogImage` front matter
