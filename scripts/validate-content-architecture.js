const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BOOKING_URL = 'https://cal.com/alexanderstefanseo/agency';
const VALID_ROLES = new Set(['home', 'static', 'legal', 'hub', 'service', 'industry', 'guide', 'case-study']);
const SOURCE_ONLY = new Set(['blog', 'blog-post-template', 'case-study-template', 'facebook-ads-post-template', 'industry-template']);
const RESERVED = new Set(['404']);
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-registry.json'), 'utf8'));
const errors = [];

const htmlFiles = fs.readdirSync(ROOT).filter(file => file.endsWith('.html'));
const slugs = htmlFiles.map(file => file === 'index.html' ? 'index' : file.replace(/\.html$/, ''));
const publicSlugs = slugs.filter(slug => !SOURCE_ONLY.has(slug) && !RESERVED.has(slug));
const unknown = publicSlugs.filter(slug => !registry[slug]);
if (unknown.length) errors.push(`Unclassified pages: ${unknown.join(', ')}. Run npm run classify-content and choose a role for each page.`);

for (const [slug, role] of Object.entries(registry)) {
  if (!VALID_ROLES.has(role)) errors.push(`Invalid role "${role}" for ${slug}.`);
  const filename = slug === 'index' ? 'index.html' : `${slug}.html`;
  if (!fs.existsSync(path.join(ROOT, filename))) errors.push(`Registry entry ${slug} points to missing file ${filename}.`);
}

const requiredNav = [
  ['/services', 'Services'], ['/industries', 'Industries'], ['/case-studies', 'Case Studies'],
  ['/guides', 'Guides'], ['/about', 'About']
];
for (const slug of publicSlugs) {
  const filename = slug === 'index' ? 'index.html' : `${slug}.html`;
  const html = fs.readFileSync(path.join(ROOT, filename), 'utf8');
  const nav = html.match(/<nav\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/nav>/i)?.[0] || '';
  if (!nav) errors.push(`${filename} is missing the standard primary navigation.`);
  for (const [href, label] of requiredNav) {
    if (!nav.includes(`href="${href}"`) || !nav.includes(`>${label}</a>`)) errors.push(`${filename} is missing the ${label} menu destination.`);
  }
  if (!nav.includes(`href="${BOOKING_URL}"`)) errors.push(`${filename} is missing the standard booking link in its menu.`);
  if (/href=["']\/blog(?:\.html)?["']/i.test(html)) errors.push(`${filename} still links to the retired Blog URL.`);
  const bookingLinks = [...html.matchAll(/href=["'](https:\/\/cal\.com\/[^"']+)["']/gi)].map(match => match[1]);
  for (const link of bookingLinks) if (link !== BOOKING_URL) errors.push(`${filename} has a nonstandard booking destination: ${link}`);
}

for (const [hub, expectedRole] of [['guides', 'guide'], ['services', 'service']]) {
  const html = fs.readFileSync(path.join(ROOT, `${hub}.html`), 'utf8');
  const linked = [...html.matchAll(/data-content-role=["']([^"']+)["'][^>]*href=["']\/([^"']+)["']/gi)];
  for (const match of linked) {
    const [, declaredRole, slug] = match;
    if (declaredRole !== expectedRole || registry[slug] !== expectedRole) {
      errors.push(`${hub}.html incorrectly includes /${slug} as ${declaredRole}; registry role is ${registry[slug] || 'unclassified'}.`);
    }
  }
}

const youtubeInbound = publicSlugs.filter(slug => slug !== 'youtube-leads').filter(slug => {
  const file = slug === 'index' ? 'index.html' : `${slug}.html`;
  return fs.readFileSync(path.join(ROOT, file), 'utf8').includes('href="/youtube-leads"');
});
if (!youtubeInbound.includes('services')) errors.push('The YouTube service is not linked from the Services hub.');

if (errors.length) {
  console.error(`Architecture validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Architecture validated: ${publicSlugs.length} public pages, ${Object.keys(registry).length} classified routes, consistent navigation and booking links.`);
