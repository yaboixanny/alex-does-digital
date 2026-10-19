const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-registry.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
const postsBySlug = new Map(posts.map(post => [post.slug, post]));

function esc(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page({ slug, title, description, eyebrow, intro, content, script = '', bodyClass = '', styles = '', showDefaultHero = true }) {
  return `<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | Alex Does Digital</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="https://alxdoesdigital.com/${slug}">
    <meta property="og:title" content="${esc(title)} | Alex Does Digital">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="https://alxdoesdigital.com/${slug}"><meta property="og:type" content="website">
    ${styles ? `<style>${styles}</style>` : ''}
</head><body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>
    <nav class="navbar"><div class="container"><div class="nav-wrapper"><a class="logo-text" href="/">Alex Does Digital</a></div></div></nav>
    <main>
${showDefaultHero ? `        <header class="topic-hub-hero"><div class="container"><p class="section-label">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p>${esc(intro)}</p></div></header>` : ''}
        ${content}
    </main>
    <footer class="footer"><div class="container"><p>&copy; 2026 Alex Does Digital.</p></div></footer>
${script ? `    ${script}\n` : ''}</body></html>\n`;
}

function card(slug, title, description, label, role) {
  return `<a class="topic-hub-card" data-content-role="${role}" href="/${slug}"><span>${esc(label)}</span><h2>${esc(title)}</h2><p>${esc(description)}</p><strong>Explore ${esc(label.toLowerCase())} →</strong></a>`;
}

const servicesDirectory = require('./services-directory');
fs.writeFileSync(path.join(ROOT, 'services.html'), page({
  slug: 'services', title: 'SEO, Google Ads, Facebook Ads & Lead Generation Services',
  description: 'SEO, Google Ads management, Facebook Ads, and lead generation for service businesses. Work directly with Alex on campaigns, content, tracking, and growth.',
  content: servicesDirectory.content, styles: servicesDirectory.styles, showDefaultHero: false
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

const industryGroups = [
  {
    id: 'home-services', kicker: 'High-intent local demand', title: 'Home & urgent services',
    intro: 'Win the call when the problem is immediate, the service area matters, and response speed shapes who gets the job.',
    items: [
      ['roofing-leads', 'ROOF', 'Roofing Companies', 'Build qualified repair, replacement and commercial roofing demand with local SEO, paid ads, referrals and inspection tracking.'],
      ['towing-leads', 'TOW', 'Towing Companies', 'Build a towing lead system around urgent searches, dispatch coverage, qualified calls, local visibility, and roadside demand.'],
      ['google-ads-for-roadside-assistance', 'RSA', 'Roadside Assistance', 'Capture roadside calls with service-based campaigns, tight local targeting, call assets, focused pages, and useful call tracking.'],
      ['hvac-leads', 'HVAC', 'HVAC Companies', 'Generate repair, replacement, installation, and maintenance demand with paid search, paid social, SEO, and stronger follow-up.'],
      ['plumbing-leads', 'PLB', 'Plumbing Companies', 'Connect emergency and planned plumbing demand to focused campaigns, useful service pages, call tracking, and local proof.'],
      ['electrician-leads', 'ELEC', 'Electricians', 'Market emergency repairs, panels, EV chargers, rewiring, generators, and commercial work without mixing every job into one funnel.'],
      ['garage-door-leads', 'GDR', 'Garage Door Companies', 'Separate urgent repair calls from planned installations, then support both with ads, local SEO, tracking, and fast response.'],
      ['handyman-leads', 'HND', 'Handyman Services', 'Build a practical lead pipeline with referrals, partnerships, Google Ads, local SEO, cost planning, and consistent follow-up.'],
      ['appliance-repair-leads', 'APR', 'Appliance Repair', 'Generate repair leads for refrigerators, washers, dryers, ovens, and other core services with focused local acquisition.']
    ]
  },
  {
    id: 'property-services', kicker: 'Planned projects & recurring work', title: 'Property & improvement services',
    intro: 'Create demand before the quote, show the quality of the work, and build a system that supports both one-time projects and recurring revenue.',
    items: [
      ['pool-service-leads', 'POOL', 'Pool Service', 'Book more maintenance, repair, renovation, and seasonal pool work with a connected Google Ads, Facebook Ads, and SEO plan.'],
      ['carpet-cleaning-leads', 'CRPT', 'Carpet Cleaning', 'Fill the schedule with residential and commercial cleaning demand while building repeat and referral opportunities.'],
      ['epoxy-flooring-leads', 'EPXY', 'Epoxy Flooring', 'Turn project proof, local search, paid media, and stronger qualification into more residential and commercial flooring opportunities.'],
      ['advanced-solar-lead-generation', 'SOLR', 'Solar Companies', 'Build a compliant solar pipeline with channel-specific offers, qualification, landing pages, CRM tracking, and faster follow-up.'],
      ['car-detailing-leads', 'AUTO', 'Car Detailing', 'Use local search, visual proof, paid media, and retention to book more details and build recurring customer value.']
    ]
  },
  {
    id: 'professional-services', kicker: 'Trust-led consideration', title: 'Professional & lifestyle services',
    intro: 'Earn confidence earlier in a longer decision process with clearer positioning, stronger proof, and content built around how clients compare options.',
    items: [
      ['financial-advisor-leads', 'FIN', 'Financial Advisors', 'Build a compliant acquisition system across search, paid social, SEO, useful education, and a clear consultation path.'],
      ['wedding-photography-leads', 'PHOTO', 'Wedding Photographers', 'Reach couples through paid search, SEO, venue content, portfolio-led proof, local relevance, and better booking measurement.']
    ]
  },
  {
    id: 'health-senior-care', kicker: 'Credibility & family decisions', title: 'Health, nutrition & senior care',
    intro: 'Make expertise easy to understand, answer sensitive questions clearly, and help patients or families take the next step with confidence.',
    items: [
      ['seo-for-nutritionists', 'NUTR', 'Dietitians & Nutritionists', 'Improve visibility for nutrition services with local SEO, useful educational content, technical clarity, and AI-search-friendly answers.'],
      ['care-home-marketing', 'CARE', 'Care Homes & Assisted Living', 'Support occupancy with a marketing hub built around family research, tours, trust, local visibility, and clear care options.'],
      ['nursing-home-marketing', 'SNF', 'Nursing Homes & Skilled Nursing', 'Connect skilled nursing and long-term care services with families and referral sources through a clearer digital journey.']
    ]
  }
];
const industryCard = ([slug, code, title, description], groupTitle) => `<a class="industry-directory-card" data-content-role="${esc(registry[slug])}" href="/${slug}"><span class="industry-card-code" aria-hidden="true">${esc(code)}</span><span class="industry-card-type">${esc(groupTitle)}</span><h3>${esc(title)}</h3><p>${esc(description)}</p><strong>Open the ${esc(title)} playbook <span aria-hidden="true">→</span></strong></a>`;
const industrySections = industryGroups.map((group, index) => `<section class="industry-directory-group" id="${group.id}"><div class="industry-group-heading"><div><span class="industry-group-number">0${index + 1}</span><p class="industry-kicker">${esc(group.kicker)}</p><h2>${esc(group.title)}</h2></div><p>${esc(group.intro)}</p></div><div class="industry-directory-grid">${group.items.map(item => industryCard(item, group.title)).join('')}</div></section>`).join('');
const industriesContent = `<header class="industry-directory-hero"><div class="container industry-hero-grid"><div class="industry-hero-copy"><p class="industry-kicker">Industry growth systems</p><h1>Marketing built around how your market actually buys.</h1><p class="industry-hero-lede">Choose your industry to explore a practical acquisition plan shaped by its search behavior, sales cycle, service area, lead value, and customer questions.</p><div class="industry-hero-actions"><a class="btn btn-primary" href="#industry-directory">Find your industry</a><a class="industry-text-link" href="/services">Explore services <span aria-hidden="true">→</span></a></div><div class="industry-hero-signals" aria-label="Directory summary"><span><strong>${industryGroups.reduce((total, group) => total + group.items.length, 0)}</strong> industry paths</span><span><strong>4</strong> market groups</span><span><strong>Direct</strong> with Alex</span></div></div><aside class="industry-hero-panel" aria-label="What each industry playbook covers"><span class="industry-panel-status">Market-specific planning</span><h2>One market. One connected system.</h2><p>The right mix changes by niche, but the decision framework stays commercial.</p><ol><li><span>01</span><div><strong>Capture demand</strong><small>Google Ads and local search</small></div></li><li><span>02</span><div><strong>Create demand</strong><small>Paid social and useful content</small></div></li><li><span>03</span><div><strong>Convert demand</strong><small>Pages, tracking, and follow-up</small></div></li></ol></aside></div></header><div class="container industry-directory" id="industry-directory">${industrySections}</div><section class="industry-directory-cta"><div class="container"><div class="industry-cta-panel"><p class="industry-kicker">Your market is different</p><h2>Do not see the exact fit?</h2><p>Tell Alex what you sell, where you operate, and which leads matter most. You will get a practical view of the strongest next move—not a recycled channel pitch.</p><div class="industry-hero-actions"><a class="btn btn-primary" href="https://cal.com/alexanderstefanseo/agency" target="_blank" rel="noopener">Talk to Alex</a><a class="industry-text-link" href="/case-studies">Review case studies <span aria-hidden="true">→</span></a></div></div></div></section>`;
const industriesStyles = `
.industry-hub-page{background:#fff}.industry-directory-hero{position:relative;overflow:hidden;padding:clamp(4.5rem,8vw,7rem) 0;background:linear-gradient(135deg,#f8fafc 0%,#ecfdf5 100%);border-bottom:1px solid var(--pe-line)}.industry-directory-hero:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.025) 1px,transparent 1px);background-size:30px 30px;mask-image:linear-gradient(to right,#000,transparent 75%);pointer-events:none}.industry-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(340px,.72fr);gap:clamp(2.5rem,6vw,5rem);align-items:center}.industry-hero-copy{max-width:760px}.industry-kicker{margin:0 0 .9rem;color:var(--pe-green-dark);font:700 .68rem/1.2 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase}.industry-hero-copy h1{max-width:760px;margin:0;color:var(--pe-ink);font-size:clamp(3rem,6.3vw,6rem);line-height:.98;letter-spacing:-.065em;text-wrap:balance}.industry-hero-lede{max-width:690px;margin:1.5rem 0 0;color:var(--pe-copy);font-size:clamp(1rem,1.6vw,1.18rem);line-height:1.75}.industry-hero-actions{display:flex;align-items:center;flex-wrap:wrap;gap:1rem 1.3rem;margin-top:2rem}.industry-text-link{color:var(--pe-ink);font-weight:800;text-decoration:none}.industry-text-link span{color:var(--pe-green-dark)}.industry-text-link:hover{text-decoration:underline}.industry-hero-signals{display:flex;flex-wrap:wrap;gap:.75rem 1.5rem;margin-top:2.2rem;color:var(--pe-muted);font:600 .7rem/1.3 'JetBrains Mono',monospace}.industry-hero-signals span{display:flex;align-items:baseline;gap:.4rem}.industry-hero-signals strong{color:var(--pe-green-dark);font:800 1rem/1 'Plus Jakarta Sans',sans-serif}.industry-hero-panel{position:relative;padding:clamp(1.6rem,4vw,2.4rem);color:#fff;background:radial-gradient(circle at 100% 0,rgba(16,185,129,.22),transparent 42%),var(--pe-navy);border:1px solid #1e293b;border-radius:18px;box-shadow:0 30px 60px -35px rgba(15,23,42,.9)}.industry-panel-status{display:inline-flex;padding:.38rem .58rem;color:#a7f3d0;background:rgba(30,41,59,.82);border:1px solid #334155;border-radius:999px;font:600 .58rem/1 'JetBrains Mono',monospace;letter-spacing:.07em;text-transform:uppercase}.industry-hero-panel h2{max-width:440px;margin:1.2rem 0 .75rem;color:#fff;font-size:clamp(1.8rem,3vw,2.65rem);line-height:1.08;letter-spacing:-.045em}.industry-hero-panel>p{margin:0;color:#cbd5e1;line-height:1.7}.industry-hero-panel ol{display:grid;gap:.65rem;margin:1.6rem 0 0;padding:0;list-style:none}.industry-hero-panel li{display:flex;align-items:center;gap:.9rem;padding:.9rem 1rem;background:rgba(30,41,59,.72);border:1px solid #334155;border-radius:10px}.industry-hero-panel li>span{display:grid;width:2rem;height:2rem;flex:0 0 2rem;place-items:center;color:#a7f3d0;background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.25);border-radius:7px;font:700 .65rem/1 'JetBrains Mono',monospace}.industry-hero-panel li strong,.industry-hero-panel li small{display:block}.industry-hero-panel li strong{color:#fff;font-size:.84rem}.industry-hero-panel li small{margin-top:.16rem;color:#94a3b8;font-size:.7rem}.industry-directory{padding-block:clamp(4.5rem,8vw,7.5rem)}.industry-directory-group{scroll-margin-top:160px}.industry-directory-group+.industry-directory-group{padding-top:clamp(4.5rem,7vw,7rem);margin-top:clamp(4.5rem,7vw,7rem);border-top:1px solid var(--pe-line)}.industry-group-heading{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.65fr);gap:2rem;align-items:end;margin-bottom:2rem}.industry-group-heading>div{position:relative;padding-left:3.2rem}.industry-group-number{position:absolute;top:.25rem;left:0;color:#94a3b8;font:600 .72rem/1 'JetBrains Mono',monospace}.industry-group-heading h2{max-width:720px;margin:0;color:var(--pe-ink);font-size:clamp(2rem,4vw,3.6rem);line-height:1.04;letter-spacing:-.05em}.industry-group-heading>p{max-width:550px;margin:0;color:var(--pe-copy);line-height:1.75}.industry-directory-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.industry-directory-card{position:relative;display:flex;min-height:320px;flex-direction:column;padding:1.55rem;overflow:hidden;color:inherit;background:#fff;border:1px solid var(--pe-line);border-radius:14px;box-shadow:var(--pe-shadow);text-decoration:none;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}.industry-directory-card:before{content:'';position:absolute;inset:0 0 auto;height:3px;background:linear-gradient(90deg,var(--pe-green),#34d399);transform:scaleX(0);transform-origin:left;transition:transform .25s ease}.industry-directory-card:hover{transform:translateY(-4px);border-color:#a7f3d0;box-shadow:var(--pe-shadow-lg)}.industry-directory-card:hover:before{transform:scaleX(1)}.industry-card-code{display:grid;width:2.75rem;height:2.75rem;place-items:center;margin-bottom:1.5rem;color:var(--pe-green-dark);background:var(--pe-green-soft);border:1px solid #d1fae5;border-radius:9px;font:800 .64rem/1 'JetBrains Mono',monospace;letter-spacing:.02em}.industry-card-type{color:var(--pe-muted);font:600 .58rem/1.3 'JetBrains Mono',monospace;letter-spacing:.07em;text-transform:uppercase}.industry-directory-card h3{margin:.55rem 0 .75rem;color:var(--pe-ink);font-size:1.28rem;line-height:1.2;letter-spacing:-.03em}.industry-directory-card p{margin:0 0 1.4rem;color:var(--pe-copy);font-size:.82rem;line-height:1.7}.industry-directory-card strong{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:auto;padding-top:1rem;color:var(--pe-ink);border-top:1px solid var(--pe-line);font-size:.75rem}.industry-directory-card strong span{color:var(--pe-green-dark);font-size:1rem}.industry-directory-cta{padding:0 0 clamp(4.5rem,8vw,7rem)}.industry-cta-panel{padding:clamp(2.2rem,6vw,4.5rem);color:#fff;background:radial-gradient(circle at 85% -30%,rgba(16,185,129,.3),transparent 45%),var(--pe-navy);border:1px solid #1e293b;border-radius:18px;box-shadow:0 30px 60px -38px rgba(15,23,42,.95)}.industry-cta-panel h2{max-width:760px;margin:0;color:#fff;font-size:clamp(2.2rem,5vw,4.5rem);line-height:1;letter-spacing:-.055em}.industry-cta-panel>p:not(.industry-kicker){max-width:720px;margin:1.15rem 0 0;color:#cbd5e1;line-height:1.75}.industry-cta-panel .industry-text-link{color:#fff}.industry-cta-panel .industry-text-link span{color:#a7f3d0}@media(max-width:980px){.industry-hero-grid{grid-template-columns:1fr}.industry-hero-copy{max-width:820px}.industry-hero-panel{max-width:720px}.industry-directory-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.industry-directory-hero{padding:4rem 0}.industry-hero-copy h1{font-size:clamp(2.7rem,13vw,4rem)}.industry-hero-actions .btn{width:auto}.industry-group-heading{grid-template-columns:1fr;align-items:start}.industry-group-heading>div{padding-left:2.7rem}.industry-directory-grid{grid-template-columns:1fr}.industry-directory-card{min-height:0}.industry-hero-signals{align-items:flex-start;flex-direction:column}.industry-cta-panel .industry-hero-actions{align-items:flex-start;flex-direction:column}}
`;
const industriesMobileStyles = `@media(max-width:760px){.industry-hero-grid,.industry-hero-copy,.industry-hero-panel,.industry-group-heading,.industry-directory-grid{min-width:0}.industry-hero-copy h1{font-size:clamp(2.35rem,10.5vw,3.3rem);overflow-wrap:break-word}.industry-hero-panel h2{font-size:clamp(1.65rem,8vw,2.15rem);overflow-wrap:break-word}.industry-group-heading h2{font-size:clamp(1.8rem,8.5vw,2.5rem);overflow-wrap:break-word}}`;
fs.writeFileSync(path.join(ROOT, 'industries.html'), page({
  slug: 'industries', title: 'Industries', eyebrow: 'Industry expertise', bodyClass: 'industry-hub-page', styles: `${industriesStyles}${industriesMobileStyles}`, showDefaultHero: false,
  description: 'Digital marketing strategies and service pages for local service businesses, professional firms, health practices, and specialist operators.',
  intro: 'Find the page built around your market, customer journey, economics, and search behavior.',
  content: industriesContent
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

console.log(`Generated services.html, guides.html (${guidePosts.length} guides), industries.html (${industryGroups.reduce((total, group) => total + group.items.length, 0)} industries), and sitemap.xml (${sitemapRoutes.length} canonical URLs)`);
