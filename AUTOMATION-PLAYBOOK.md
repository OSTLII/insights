# OSTLII AGENCY — Content-to-Revenue Automation Playbook

**Goal:** EP oversees, AI agents execute. Minimum human touchpoints per article cycle.

---

## THE PIPELINE (8 Steps)

```
[1] Topic Scout  →  [2] Draft  →  [3] EP Review  →  [4] OG Image
       ↓                                                    ↓
  (automated)        (automated)    (15 min)          (semi-auto)
       ↓                                                    ↓
[5] Publish     →  [6] Social Repurpose  →  [7] Schedule & Post  →  [8] Track
       ↓                    ↓                       ↓                    ↓
  (automated)         (automated)             (semi-auto)          (automated)
```

**Total EP time per article cycle: ~20-30 minutes**
Everything else runs on automation or agent oversight.

---

## STEP-BY-STEP AUTOMATION

### STEP 1: Topic Sourcing — AUTOMATED
**What:** Daily scan of AI news, construction tech, SaaS updates, competitor content.
**Output:** 3-5 article angles delivered to you every morning.

**How to set up:**

**Option A — Make.com workflow (recommended, most reliable):**
1. Create a Make.com scenario (free tier covers this)
2. Trigger: Schedule → Every day at 7 AM
3. Module 1: RSS feed aggregator pulling from:
   - TechCrunch AI section
   - The Verge AI
   - Construction Dive
   - SaaS industry newsletters
   - Google Alerts for "AI construction", "AI small business", "AI tools 2026"
4. Module 2: Send aggregated headlines + links to Claude API
5. System prompt: "You are a content strategist for Ostlii Agency, an AI brokerage for SMBs. Given today's news, suggest 3 article angles that: (a) feature specific tools we can affiliate link, (b) target construction/trades/professional services, (c) have a clear honest broker take. Format: Title | Hook | Tools to feature | Affiliate potential."
6. Module 3: Send output to Notion page / Slack channel / email

**Option B — Cowork standing task:**
Give Cowork a daily recurring instruction: "Every morning, search for the latest AI news relevant to construction companies and SMBs. Generate 3 article angle recommendations with titles, hooks, and which affiliate tools to feature. Save to [location]."

**Option C — Manual with Claude:**
Open Claude, paste: "What happened in AI + construction tech today? Give me 3 article angles for Ostlii Agency." Takes 2 minutes.

**EP's role:** Scan the brief, pick an angle or skip. 30 seconds.

---

### STEP 2: Article Drafting — AUTOMATED (with EP voice injection)
**What:** Full first draft generated from the chosen angle.
**Output:** 800-1500 word article in markdown, ready for review.

**How to set up:**

**System prompt for drafting (use in Claude API, Cowork, or direct):**

```
You are writing for Ostlii Agency's Insights blog. Voice rules:
- Write like an insurance professional who understands AI, not a tech blogger
- Zero buzzwords. No "revolutionize", "transform", "game-changer", "cutting-edge"
- Every tool mentioned gets at least one honest criticism
- Include specific pricing or cost context when available  
- Write for a construction company owner who's smart but not technical
- End with the Agency CTA, not a generic "follow us"
- Honest broker tone: we disclose our incentives, we recommend what works
- 800-1500 words, conversational but authoritative
- Include front matter block for 11ty (title, description, date, category, tags, readTime, ogImage)
```

**Automation via Make.com:**
After EP picks a topic (clicks a button in Notion or responds to Slack message), Make.com fires the Claude API call with the system prompt + topic, saves the markdown to the GitHub repo as a draft (branch or draft folder).

**Automation via Cowork:**
"Write the article on [topic]. Follow the Ostlii Insights voice guide. Save as markdown."

**EP's role:** Read the draft, add personal opinions/anecdotes/insider takes, approve or request edits. 15-20 minutes.

---

### STEP 3: EP Review — MANUAL (this is where your value lives)
**What:** You add the stuff AI can't fake.
**Time:** 15-20 minutes

What you're adding:
- Your actual opinion on the tool ("I recommended this to a GC in the Springs last month and here's what happened")
- Honest criticisms from real experience
- Industry context only a practitioner would know
- The human signal that keeps it from being AI slop

This step is non-automatable and it's exactly what makes the content valuable.

---

### STEP 4: OG Image Generation — SEMI-AUTOMATED
**What:** Branded 1200x627 social share image for each article.
**Output:** PNG file matching Ostlii branding.

**How to automate:**

**Option A — Cloudinary or Bannerbear API (best):**
Set up a template in Bannerbear (or similar) with your Ostlii branding baked in. API call takes the article title as input, outputs a branded OG image. Integrate into the Make.com workflow or build step.

Cost: Bannerbear starts at $49/mo. Cloudinary's free tier might cover it with their text overlay transformation API.

**Option B — HTML screenshot automation:**
The og-template.html in the project root already has the design. A Puppeteer script can:
1. Load the template
2. Inject the article title
3. Screenshot at 1200x627
4. Save to src/assets/img/

This runs as part of the build or as a pre-commit hook. Free, local, no API needed.

**Option C — Canva template (manual but fast):**
One template, swap the title, export. 2 minutes per article.

**EP's role:** Approve the image or skip (auto-generated is usually fine).

---

### STEP 5: Publish — FULLY AUTOMATED
**What:** Article goes live on the site.
**How:** `git push` triggers Netlify auto-build.

The affiliate auto-linker plugin handles inserting partner links. The _redirects file handles the /go/toolname tracking URLs. OG tags are generated from front matter. No manual steps.

**Automation:** If using Make.com, the workflow commits to GitHub after EP approves the draft. Netlify builds automatically. Article is live in 60 seconds.

**EP's role:** None. Or one click to approve the push.

---

### STEP 6: Social Repurposing — AUTOMATED
**What:** Convert each article into platform-native social content.
**Output:** LinkedIn post, Instagram carousel, X thread, Facebook post.

**How to set up:**

**Claude API call with repurposing prompt:**

```
Given this article [paste markdown], create:

1. LINKEDIN POST (2-3 sentences of hot take + link)
   - Lead with the most contrarian or surprising point
   - End with the article URL
   - Include 3-5 hashtags

2. INSTAGRAM CAROUSEL (5 slides)
   - Slide 1: Hook headline
   - Slides 2-4: Key points (one per slide, <20 words each)
   - Slide 5: CTA + ostlii.com
   - Write the caption (conversational, 3-4 sentences + hashtags)

3. X POST (single tweet)
   - Spiciest single takeaway, under 280 chars
   - Link in reply format

4. FACEBOOK POST
   - Slightly longer than LinkedIn
   - More conversational, question at the end to drive comments
```

**Make.com workflow:**
After publish step, trigger Claude API → generate all 4 formats → save to Notion database or Google Sheet with "Ready to Post" status.

**EP's role:** Scan the social content, tweak if needed. 5 minutes.

---

### STEP 7: Schedule & Post — SEMI-AUTOMATED
**What:** Content goes out across all platforms at optimal times.

**Tools:**

**Buffer or Hootsuite (simplest):**
- Connect LinkedIn, Instagram, X, Facebook
- Paste the generated content from Step 6
- Schedule posting times
- Buffer free plan covers 3 channels

**Later.com (best for Instagram):**
- Visual calendar
- Auto-publishes carousels
- Free plan available

**Make.com direct posting (most automated):**
- LinkedIn API: Auto-post with link preview
- X API: Auto-post thread
- Facebook Pages API: Auto-post
- Instagram: Requires Business account + Facebook connection for API posting

Full automation means Make.com posts directly to each platform after EP approval. One approval click, all four platforms fire.

**EP's role:** One approval click. Or set it to auto-post if you trust the pipeline.

---

### STEP 8: Tracking & Optimization — FULLY AUTOMATED
**What:** Monitor affiliate clicks, article traffic, social engagement.

**Affiliate tracking:**
- Netlify Analytics tracks clicks on /go/ redirect URLs (free with Netlify)
- Each partner's dashboard shows conversions and commissions
- GoHighLevel, PartnerStack each have their own dashboards

**Site analytics:**
- Netlify Analytics (built-in, privacy-friendly) or
- Plausible Analytics (lightweight, $9/mo, no cookies, GDPR compliant)
- Google Search Console (free, tracks which articles rank for what)

**Social tracking:**
- Buffer/Hootsuite built-in analytics
- Track which articles drive the most clicks back to the site

**Weekly rollup automation:**
Make.com workflow that pulls: article views (Netlify), affiliate clicks (redirect counts), social engagement (Buffer API), and partner commission data → formats into a weekly summary → emails to you or drops in Notion.

**EP's role:** Read weekly summary. 5 minutes. Decide what to write more of.

---

## FULL AUTOMATION STACK

| Tool | Purpose | Cost |
|------|---------|------|
| Make.com | Workflow orchestration (topic sourcing → draft → social → post) | Free for 1,000 ops/mo, $9/mo for more |
| Claude API | Article drafting, social repurposing, topic analysis | Pay per use (~$0.50-2 per article cycle) |
| Netlify | Hosting, builds, redirect tracking | Free tier |
| Buffer | Social scheduling across platforms | Free for 3 channels |
| Bannerbear | Auto-generate OG images from template | $49/mo (or use Puppeteer script for free) |
| Plausible | Site analytics | $9/mo |
| Google Search Console | SEO tracking | Free |
| Notion | Content calendar, draft review, topic queue | Free tier |

**Total cost to run fully automated: ~$9-60/month** depending on whether you use paid OG image generation.

---

## EP'S WEEKLY TIME COMMITMENT

| Task | Time | Frequency |
|------|------|-----------|
| Scan topic brief, pick angle | 2 min | Daily (or 1x/week) |
| Review + personalize article draft | 15-20 min | 1x/week |
| Scan social repurposed content | 5 min | 1x/week |
| Approve publish + social scheduling | 2 min | 1x/week |
| Read weekly analytics summary | 5 min | 1x/week |
| **TOTAL** | **~30 min/week** | |

Everything else is automated or agent-managed.

---

## COWORK-SPECIFIC INSTRUCTIONS

If EP says "publish an article about [topic]," Cowork should:

1. Draft article using Ostlii voice guidelines (see system prompt above)
2. Generate front matter with appropriate category, tags, readTime
3. Save markdown to src/posts/ in the insights repo
4. Generate OG image (via template screenshot or Bannerbear)
5. Generate social content for LinkedIn, Instagram, X, Facebook
6. Commit and push to trigger Netlify build
7. Queue social content in Buffer (or present for EP approval)

If EP says "what should I write about this week," Cowork should:
1. Search AI + construction + SMB tech news from the past 7 days
2. Cross-reference with affiliate partner list (which tools can we feature?)
3. Present 3-5 angles ranked by: SEO potential, affiliate revenue opportunity, honest broker differentiation

---

## SCALING NOTES

**Month 1-2:** EP writes/reviews everything. 1 article/week. Build the habit, train the voice.

**Month 3-4:** Automation handles 80% of execution. EP's review becomes lighter as the system learns the voice. 2 articles/week.

**Month 5+:** EP shifts to strategy only — picking angles, reviewing analytics, building relationships with partners. Agents handle production. Scale to 3-4 articles/week across verticals (construction, professional services, trades).

**Revenue projection at scale:**
- 50 articles live, each getting ~200 visits/month = 10,000 monthly visits
- 2% affiliate click-through = 200 affiliate clicks/month
- 5% conversion on clicks = 10 new signups/month
- Average $50/month recurring commission = $500/month growing monthly
- Plus consulting leads from the same traffic
- Compounds: articles stay ranked and earning for years
