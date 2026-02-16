#!/usr/bin/env node

/**
 * Quick scaffolder: npm run new -- "Your Article Title"
 * Creates a new markdown file with all the front matter pre-filled.
 */

const fs = require('fs');
const path = require('path');

const title = process.argv.slice(2).join(' ') || 'Untitled Post';
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().split('T')[0];

const template = `---
title: "${title}"
description: ""
date: ${today}
category: ""
tags: []
readTime: 
ogImage: "${slug}-og.png"
---

Write your article here.
`;

const filename = `${slug}.md`;
const filepath = path.join(__dirname, '..', 'src', 'posts', filename);

if (fs.existsSync(filepath)) {
  console.error(`File already exists: ${filename}`);
  process.exit(1);
}

fs.writeFileSync(filepath, template);
console.log(`Created: src/posts/${filename}`);
console.log(`\nNext steps:`);
console.log(`1. Fill in description, category, tags, readTime`);
console.log(`2. Write the article`);
console.log(`3. Create OG image: src/assets/img/${slug}-og.png (1200x627)`);
console.log(`4. git add . && git commit -m "New post: ${title}" && git push`);
