const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = slug => fs.readFileSync(path.join(root, slug + '.html'), 'utf8');
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
for (const suffix of ['care-homes', 'nursing-homes']) {
  const hub = suffix === 'care-homes' ? 'care-home-marketing' : 'nursing-home-marketing';
  const slugs = [hub, 'seo-for-' + suffix, 'google-ads-for-' + suffix, 'facebook-ads-for-' + suffix];
  for (const slug of slugs) {
    const html = read(slug);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, slug);
    for (const target of slugs.filter(s => s !== slug)) assert.ok(html.includes('href="/' + target + '"'), `${slug} must link to ${target}`);
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  }
}
for (const channel of ['google', 'facebook']) {
  const getParagraphs = suffix => {
    const article = read(`${channel}-ads-for-${suffix}`).match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
    return [...article.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m => text(m[1])).filter(p => p.split(' ').length >= 15);
  };
  const care = getParagraphs('care-homes'), nursing = getParagraphs('nursing-homes');
  const shared = care.filter(p => nursing.includes(p));
  assert.ok(shared.length / care.length < .2, `${channel}: paired guides must not be name-swapped articles`);
  console.log(`${channel}: ${shared.length}/${care.length} substantial care-home paragraphs repeated in nursing guide (including source notes).`);
}
console.log('Senior-care content, schema JSON and reciprocal cluster links passed.');
