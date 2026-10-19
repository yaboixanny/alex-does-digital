/* Shared Handyman-style presentation for every registered industry hub.
 * Runs after content generators: keeps their copy, links, embeds and schema.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const registry = require('../content-registry.json');

// Find a complete element, including nested elements of the same tag.
function elementAt(html, start) {
  const opening = html.slice(start).match(/^<([a-z][\w-]*)\b[^>]*>/i);
  if (!opening) throw new Error('Expected an opening element');
  const tag = opening[1];
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += /^<\//.test(m[0]) ? -1 : 1;
    if (!depth) return { start, end: re.lastIndex, html: html.slice(start, re.lastIndex) };
  }
  throw new Error(`Unclosed ${tag}`);
}
function findElement(html, pattern) {
  const match = pattern.exec(html);
  return match ? elementAt(html, match.index) : null;
}
function stripElement(html, pattern) {
  const el = findElement(html, pattern);
  return el ? html.slice(0, el.start) + html.slice(el.end) : html;
}
function standardize(html) {
  if (!/<body\b[^>]*class=/.test(html)) html = html.replace(/<body\b/, '<body class="industry-hub"');
  else html = html.replace(/(<body\b[^>]*class=")([^"]*)"/, (_, prefix, classes) => `${prefix}${[...new Set([...classes.split(/\s+/), 'industry-hub'])].join(' ')}"`);
  if (html.includes('data-industry-layout="handyman"')) return html;
  const hero = findElement(html, /<(?:section|header)\b[^>]*class="[^"]*\b(?:intent-hero|wedding-hero|towing-hero)[^\"]*"[^>]*>/i);
  if (!hero) throw new Error('Industry hub has no supported hero');
  const heading = hero.html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const lede = hero.html.match(/<p\b[^>]*class="[^"]*(?:intent-lede|wedding-hero-description|towing-hero-description)[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  if (!heading || !lede) throw new Error('Industry hub hero needs a title and description');
  const badge = hero.html.match(/<(?:p|div|span)\b[^>]*class="[^"]*(?:hero-badge|eyebrow)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div|span)>/i);
  // Preserve any secondary hero information below the centered introduction.
  let remainder = hero.html.replace(/^<[^>]+>/, '').replace(/<\/(?:section|header)>$/, '');
  remainder = remainder.replace(heading[0], '').replace(lede[0], '');
  if (badge) remainder = remainder.replace(badge[0], '');
  remainder = stripElement(remainder, /<div\b[^>]*class="[^"]*(?:intent-actions|hero-cta-buttons)[^"]*"[^>]*>/i);
  remainder = remainder.replace(/class="(?:container(?: care-hub-hero-grid| intent-hero-grid| garage-door-hero-inner)?|care-hub-hero-copy|wedding-hero-content)"/g, 'class="hub-intro-inner"');
  const extra = remainder.replace(/<[^>]*>/g, '').trim() ? `<section class="hub-intro"><div class="container">${remainder}</div></section>` : '';
  const newHero = `<section class="wedding-hero hub-hero" data-industry-layout="handyman"><div class="container"><div class="wedding-hero-content"><div class="hero-badge">${badge ? badge[1] : 'Lead Generation Strategies'}</div><h1 class="wedding-hero-title">${heading[1]}</h1><p class="wedding-hero-description">${lede[1]}</p><div class="hero-cta-buttons"><a href="https://cal.com/alexanderstefanseo/agency" class="btn btn-primary btn-large">Talk to Alex</a><a href="#hub-strategies" class="btn btn-secondary btn-large">Explore Strategies</a></div></div></div></section>${extra}`;
  html = html.slice(0, hero.start) + newHero + html.slice(hero.end);
  // Keep existing anchors; provide one stable strategy destination on all hubs.
  const strategies = /<(?:section|div)\b[^>]*class="[^"]*(?:strategies-section|care-pillar-grid|garage-door-channels|intent-card-grid)[^"]*"[^>]*>/i.exec(html);
  if (strategies) html = html.slice(0, strategies.index) + '<div id="hub-strategies"></div>' + html.slice(strategies.index);
  else html = html.replace(/<article\b/, '<div id="hub-strategies"></div><article');
  // Flat editorial hubs become readable sections instead of an endless article.
  const article = findElement(html, /<article\b[^>]*class="[^"]*intent-article[^"]*"[^>]*>/i);
  if (article) {
    let inner = article.html.replace(/^<article[^>]*>/, '').replace(/<\/article>$/, '');
    // Only split top-level headings, not headings inside existing sections/cards.
    let result = '', cursor = 0, group = '', sectionOpen = false;
    const tokens = /<(section|div|h2|p|ul|ol|table|iframe|figure)\b[^>]*>/gi;
    let match;
    while ((match = tokens.exec(inner))) {
      const el = elementAt(inner, match.index);
      group += inner.slice(cursor, match.index);
      if (match[1].toLowerCase() === 'h2') {
        if (sectionOpen) result += `<section class="hub-content-section">${group}</section>`;
        else result += group;
        group = el.html; sectionOpen = true;
      } else if (match[1].toLowerCase() === 'section') {
        result += sectionOpen ? `<section class="hub-content-section">${group}</section>` : group;
        result += el.html; group = ''; sectionOpen = false;
      } else group += el.html;
      cursor = el.end; tokens.lastIndex = el.end;
    }
    group += inner.slice(cursor);
    result += sectionOpen ? `<section class="hub-content-section">${group}</section>` : group;
    html = html.slice(0, article.start) + article.html.match(/^<article[^>]*>/)[0] + result + '</article>' + html.slice(article.end);
  }
  if (!/class="(?:strategy-boxes|care-pillar-grid)/.test(html)) {
    const candidates = [];
    const sections = /<section class="hub-content-section">/g;
    let match;
    while ((match = sections.exec(html))) {
      const el = elementAt(html, match.index);
      const title = el.html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
      if (title && /Google Ads|Facebook|\bSEO\b|organic.*visibility/i.test(title[1])) candidates.push(el);
      sections.lastIndex = el.end;
    }
    if (candidates.length === 3) {
      const cards = candidates.map(el => el.html.replace('<section class="hub-content-section">', '<section class="strategy-box">').replace(/<h2\b/g, '<h3').replace(/<\/h2>/g, '</h3>')).join('');
      const grid = `<section class="hub-strategy-section"><h2 class="section-heading">Three Ways to Build Your Lead Pipeline</h2><div class="strategy-boxes">${cards}</div></section>`;
      for (let i = candidates.length - 1; i >= 0; i--) {
        const el = candidates[i];
        html = html.slice(0, el.start) + (i === 0 ? grid : '') + html.slice(el.end);
      }
      html = html.replace('<div id="hub-strategies"></div>', '').replace('<section class="hub-strategy-section">', '<section class="hub-strategy-section" id="hub-strategies">');
    }
  }
  return html;
}

for (const [slug, role] of Object.entries(registry)) {
  if (role !== 'industry') continue;
  const file = path.join(ROOT, `${slug}.html`);
  try { fs.writeFileSync(file, standardize(fs.readFileSync(file, 'utf8'))); }
  catch (error) { throw new Error(`${slug}: ${error.message}`); }
}
console.log('Applied the shared Handyman layout to all industry hubs.');
