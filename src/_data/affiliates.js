/**
 * Eleventy plugin: Auto-link affiliate partners in article content.
 * 
 * Maintains a single source of truth for all partner links.
 * When content mentions a partner tool by name, it auto-wraps the
 * FIRST mention in each article with the affiliate redirect link.
 * 
 * Usage: Add/remove partners in the PARTNERS object below.
 * The build handles everything else.
 */

const PARTNERS = {
  // Format: "Display Name": { url, tier, commission }
  // Tier 1 — Direct programs, recurring
  "GoHighLevel": {
    url: "https://www.ostlii.com/go/gohighlevel",
    tier: 1,
    commission: "40% lifetime recurring"
  },
  "GHL": {
    url: "https://www.ostlii.com/go/gohighlevel",
    tier: 1,
    commission: "40% lifetime recurring",
    alias: true  // don't double-count, same as GoHighLevel
  },
  "HubSpot": {
    url: "https://www.ostlii.com/go/hubspot",
    tier: 1,
    commission: "20-30% tiered"
  },

  // Tier 2 — PartnerStack routed, still recurring
  "Jobber": {
    url: "https://www.ostlii.com/go/jobber",
    tier: 2,
    commission: "per signup + lifetime recurring"
  },
  "Monday.com": {
    url: "https://www.ostlii.com/go/monday",
    tier: 2,
    commission: "30% recurring"
  },
  "Zapier": {
    url: "https://www.ostlii.com/go/zapier",
    tier: 2,
    commission: "25% 12-month recurring"
  },
  "Make": {
    url: "https://www.ostlii.com/go/make",
    tier: 2,
    commission: "20% lifetime"
  },
  "ClickFunnels": {
    url: "https://www.ostlii.com/go/clickfunnels",
    tier: 2,
    commission: "40% lifetime"
  },

  // Tier 3 — One-time referral bounties
  "Buildertrend": {
    url: "https://www.ostlii.com/go/buildertrend",
    tier: 3,
    commission: "up to $250 per referral"
  },
  "ServiceTitan": {
    url: "https://www.ostlii.com/go/servicetitan",
    tier: 3,
    commission: "TBD"
  },
  "Procore": {
    url: "https://www.ostlii.com/go/procore",
    tier: 3,
    commission: "TBD"
  }
};

/**
 * 11ty Transform: Auto-link first mention of each partner in article body.
 * Only runs on article pages (has /insights/ in URL).
 * Only links first occurrence to avoid spam.
 * Skips text already inside <a> tags, headings, or code blocks.
 */
function affiliateAutoLinker(content, outputPath) {
  if (!outputPath || !outputPath.includes('/insights/')) return content;
  
  // Don't process listing pages
  if (outputPath.endsWith('/insights/index.html')) return content;

  let modified = content;

  for (const [name, partner] of Object.entries(PARTNERS)) {
    if (partner.alias) continue; // skip aliases for counting

    // Match the tool name NOT inside an existing <a> tag, <h1-6>, <code>, or <pre>
    // Only replace FIRST occurrence in the article body
    const regex = new RegExp(
      `(?<!<a[^>]*>)(?<!<h[1-6][^>]*>)(?<!<code>)(?<!<pre>)\\b(${escapeRegex(name)})\\b(?![^<]*<\\/a>)(?![^<]*<\\/h[1-6]>)`,
      'i'
    );

    if (regex.test(modified)) {
      modified = modified.replace(
        regex,
        `<a href="${partner.url}" target="_blank" rel="noopener sponsored" title="${name} — affiliate link">$1</a>`
      );
    }
  }

  return modified;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export for use in .eleventy.js
module.exports = { affiliateAutoLinker, PARTNERS };
