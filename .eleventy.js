module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Ignore the OG template (it's a design tool, not a page)
  eleventyConfig.ignores.add("src/assets/og-template.html");
  
  // Date formatting filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return isNaN(d.getTime()) ? "" : d.toISOString();
  });

  // Excerpt filter — first 160 chars of content stripped of HTML
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim();
    return stripped.substring(0, 160) + (stripped.length > 160 ? '...' : '');
  });

  // Collection: all posts sorted by date descending
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // Auto-link affiliate partners in article content
  const { affiliateAutoLinker } = require('./src/_data/affiliates.js');
  eleventyConfig.addTransform("affiliateLinks", affiliateAutoLinker);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
