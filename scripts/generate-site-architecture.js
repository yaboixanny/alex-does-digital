const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-registry.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
const postsBySlug = new Map(posts.map(post => [post.slug, post]));

function esc(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page({ slug, title, description, eyebrow, intro, content, script = '' }) {
  return `<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | Alex Does Digital</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="https://alxdoesdigital.com/${slug}">
    <meta property="og:title" content="${esc(title)} | Alex Does Digital">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="https://alxdoesdigital.com/${slug}"><meta property="og:type" content="website">
</head><body>
    <nav class="navbar"><div class="container"><div class="nav-wrapper"><a class="logo-text" href="/">Alex Does Digital</a></div></div></nav>
    <main>
        <header class="topic-hub-hero"><div class="container"><p class="section-label">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p>${esc(intro)}</p></div></header>
        ${content}
    </main>
    <footer class="footer"><div class="container"><p>&copy; 2026 Alex Does Digital.</p></div></footer>
${script ? `    ${script}\n` : ''}</body></html>\n`;
}

const services = [
  ['google-ads-for-service-businesses', 'Google Ads Management', 'Capture high-intent demand with tighter campaigns, better tracking, stronger landing pages, and decisions tied to lead quality.'],
  ['facebook-ads-lead-generation', 'Facebook Ads Lead Generation', 'Create demand and turn attention into qualified inquiries with paid social campaigns built around a clear offer.'],
  ['seo-for-service-businesses', 'SEO for Service Businesses', 'Build durable search visibility with technical SEO, commercial content, local relevance, and a clean site structure.'],
  ['conversion-rate-optimization', 'Conversion Rate Optimization', 'Turn more existing traffic into calls, forms, and booked work by removing friction from the customer journey.'],
  ['youtube-leads', 'YouTube Lead Generation', 'Use useful video content and focused calls to action to build trust before a prospect reaches your sales process.']
];
const specialistServices = [
  ['appliance-repair-web-design', 'Appliance Repair Web Design'],
  ['google-ads-for-dietitians-and-nutritionists', 'Google Ads for Dietitians & Nutritionists'],
  ['google-ads-wedding-photography-leads', 'Google Ads for Wedding Photographers'],
  ['wedding-photography-leads', 'SEO for Wedding Photographers']
];

function card(slug, title, description, label, role) {
  return `<a class="topic-hub-card" data-content-role="${role}" href="/${slug}"><span>${esc(label)}</span><h2>${esc(title)}</h2><p>${esc(description)}</p><strong>Explore ${esc(label.toLowerCase())} →</strong></a>`;
}

const servicesContent = `<section class="topic-hub-section"><div class="container">
    <div class="hub-section-heading"><p class="section-label">Core capabilities</p><h2>One connected growth system</h2><p>Choose the channel you need now, or combine services around one measurement plan and one commercial goal.</p></div>
    <div class="topic-hub-grid">${services.map(([slug, title, description]) => card(slug, title, description, 'Service', 'service')).join('')}</div>
    <div class="hub-section-heading hub-section-heading-spaced"><p class="section-label">Specialized programs</p><h2>Industry-specific services</h2></div>
    <div class="topic-hub-grid topic-hub-grid-compact">${specialistServices.map(([slug, title]) => card(slug, title, postsBySlug.get(slug)?.excerpt || 'A focused acquisition program designed around the way customers search and choose in this market.', 'Specialist service', 'service')).join('')}</div>
</div></section>`;

fs.writeFileSync(path.join(ROOT, 'services.html'), page({
  slug: 'services', title: 'Digital Marketing Services', eyebrow: 'Services',
  description: 'Google Ads, Facebook Ads, SEO, conversion optimization, and YouTube lead generation for service businesses.',
  intro: 'Paid search, paid social, SEO, conversion, and video strategy—connected to qualified leads and measurable growth.',
  content: servicesContent
}));

const guidePosts = posts.filter(post => registry[post.slug] === 'guide').sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title));
const guideCategory = post => post.category === 'Facebook Ads' || post.slug.startsWith('facebook-ads')
  ? 'Facebook Ads'
  : post.category === 'Google Ads' || post.slug.startsWith('google-ads') || post.slug.startsWith('google-local-services-ads')
    ? 'Google Ads'
    : post.category === 'SEO' || post.slug.startsWith('seo-')
      ? 'SEO'
      : 'Growth';
const guideCards = guidePosts.map(post => card(post.slug, post.title, post.excerpt, guideCategory(post), 'guide').replace('class="topic-hub-card"', `class="topic-hub-card" data-guide-category="${guideCategory(post)}"`)).join('');
const guidesContent = `<section class="topic-directory"><div class="container"><nav aria-label="Guide collections"><a href="/facebook-ads-by-industry">Facebook Ads by Industry</a><a href="/google-ads-by-industry">Google Ads by Industry</a><a href="/seo-by-industry">SEO by Industry</a><a href="/lead-generation-guides">Lead Generation</a></nav></div></section><section class="topic-hub-section"><div class="container">
    <div class="guide-filters" aria-label="Filter guides"><button class="guide-filter active" type="button" data-filter="All">All</button><button class="guide-filter" type="button" data-filter="Facebook Ads">Facebook Ads</button><button class="guide-filter" type="button" data-filter="Google Ads">Google Ads</button><button class="guide-filter" type="button" data-filter="SEO">SEO</button></div>
    <div class="topic-hub-grid" id="guideGrid">${guideCards}</div>
</div></section>`;
const guideScript = `<script>document.querySelectorAll('.guide-filter').forEach(function(button){button.addEventListener('click',function(){document.querySelectorAll('.guide-filter').forEach(function(item){item.classList.remove('active')});button.classList.add('active');document.querySelectorAll('[data-guide-category]').forEach(function(card){card.hidden=button.dataset.filter!=='All'&&card.dataset.guideCategory!==button.dataset.filter})})});</script>`;
fs.writeFileSync(path.join(ROOT, 'guides.html'), page({
  slug: 'guides', title: 'Digital Marketing Guides', eyebrow: 'Resources',
  description: 'Practical Google Ads, Facebook Ads, SEO, and lead-generation guides organized by channel and industry.',
  intro: 'Practical playbooks for making better acquisition decisions. Guides teach; service pages explain what you can hire me to do.',
  content: guidesContent, script: guideScript
}));

const industries = [
  ['towing-leads', 'Towing Companies'], ['pool-service-leads', 'Pool Service'], ['hvac-leads', 'HVAC'], ['plumbing-leads', 'Plumbing'],
  ['car-detailing-leads', 'Car Detailing'], ['electrician-leads', 'Electricians'], ['garage-door-leads', 'Garage Door'], ['handyman-leads', 'Handyman Services'],
  ['carpet-cleaning-leads', 'Carpet Cleaning'], ['epoxy-flooring-leads', 'Epoxy Flooring'], ['appliance-repair-leads', 'Appliance Repair'],
  ['advanced-solar-lead-generation', 'Solar Companies'], ['wedding-photography-leads', 'Wedding Photographers'], ['seo-for-nutritionists', 'Dietitians & Nutritionists'],
  ['care-home-marketing', 'Care Homes & Assisted Living'], ['nursing-home-marketing', 'Nursing Homes & Skilled Nursing'],
  ['facebook-ads-for-financial-advisors', 'Financial Advisors'], ['google-ads-for-roadside-assistance', 'Roadside Assistance']
];
const industryCards = industries.map(([slug, title]) => card(slug, title, postsBySlug.get(slug)?.excerpt || `Acquisition strategy and practical growth guidance for ${title.toLowerCase()}.`, 'Industry', registry[slug])).join('');
fs.writeFileSync(path.join(ROOT, 'industries.html'), page({
  slug: 'industries', title: 'Industries', eyebrow: 'Industry expertise',
  description: 'Digital marketing strategies and service pages for local service businesses, professional firms, health practices, and specialist operators.',
  intro: 'Find the page built around your market, customer journey, economics, and search behavior.',
  content: `<section class="topic-hub-section"><div class="container"><div class="hub-section-heading"><h2>Industry playbooks and specialized services</h2><p>Each page has a defined role in the site. Some are industry landing pages; others are the most useful channel-specific entry point for that niche.</p></div><div class="topic-hub-grid">${industryCards}</div></div></section>`
}));

const sitemapPath = path.join(ROOT, 'sitemap.xml');
const oldSitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const dates = new Map([...oldSitemap.matchAll(/<loc>https:\/\/alxdoesdigital\.com\/(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/gs)].map(match => [match[1], match[2]]));
const refreshedRoutes = new Set([
  'care-home-marketing', 'google-ads-for-care-homes', 'facebook-ads-for-care-homes', 'seo-for-care-homes',
  'nursing-home-marketing', 'google-ads-for-nursing-homes', 'facebook-ads-for-nursing-homes', 'seo-for-nursing-homes'
]);
const sitemapRoutes = Object.keys(registry).filter(slug => !['blog'].includes(slug));
const sitemapEntries = sitemapRoutes.map(slug => {
  const route = slug === 'index' ? '' : slug;
  const loc = route ? `https://alxdoesdigital.com/${route}` : 'https://alxdoesdigital.com/';
  const oldKey = route;
  const lastmod = refreshedRoutes.has(slug) ? '2026-10-06' : (dates.get(oldKey) || '2026-10-06');
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}).join('\n\n');
fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);

console.log(`Generated services.html, guides.html (${guidePosts.length} guides), industries.html (${industries.length} industries), and sitemap.xml (${sitemapRoutes.length} canonical URLs)`);
