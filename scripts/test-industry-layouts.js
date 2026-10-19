const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const registry = require('../content-registry.json');
const hubs = Object.keys(registry).filter(slug => registry[slug] === 'industry');
const before = new Map();
for (const slug of hubs) {
  const html = fs.readFileSync(path.join(root, `${slug}.html`), 'utf8');
  before.set(slug, html);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${slug}: one H1`);
  assert.equal((html.match(/data-industry-layout="handyman"/g) || []).length, 1, `${slug}: shared hero`);
  assert.equal((html.match(/id="hub-strategies"/g) || []).length, 1, `${slug}: strategy anchor`);
  assert.match(html, /class="[^"]*industry-hub/, `${slug}: scoped styles`);
  assert.match(html, /strategy-boxes|care-pillar-grid/, `${slug}: strategy cards`);
  assert.match(html, new RegExp(`rel="canonical" href="https://alxdoesdigital.com/${slug}"`), `${slug}: canonical`);
  for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
execFileSync(process.execPath, [path.join(__dirname, 'standardize-industry-layouts.js')]);
for (const slug of hubs) assert.equal(fs.readFileSync(path.join(root, `${slug}.html`), 'utf8'), before.get(slug), `${slug}: stable on repeated builds`);
console.log(`Verified shared layout, strategy cards, canonicals, schema JSON and idempotence on ${hubs.length} industry hubs.`);
