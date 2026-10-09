const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://alxdoesdigital.com';
const TODAY = '2026-10-02';
const BOOKING_URL = 'https://cal.com/alexanderstefanseo/agency';
const REGISTRY = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-registry.json'), 'utf8'));
const TEMPLATES = new Set([
  'blog.html',
  'blog-post-template.html',
  'case-study-template.html',
  'facebook-ads-post-template.html',
  'industry-template.html'
]);
const HUBS = {
  'Facebook Ads': { slug: 'facebook-ads-by-industry', title: 'Facebook Ads by Industry' },
  'Google Ads': { slug: 'google-ads-by-industry', title: 'Google Ads by Industry' },
  SEO: { slug: 'seo-by-industry', title: 'SEO by Industry' },
  Blog: { slug: 'lead-generation-guides', title: 'Lead-Generation Guides' }
};
const HUB_SLUGS = new Set(Object.values(HUBS).map(hub => hub.slug));
const CASE_STUDIES = new Set([
  'ceramic-coating-facebook-ads-case-study',
  'google-ads-towing-case-study',
  'pool-service-winter-leads-case-study',
  'wedding-photography-96-leads'
]);
const COMMERCIAL_SERVICE_TYPES = {
  'google-ads-wedding-photography-leads': 'Google Ads management for wedding photographers',
  'google-ads-for-dietitians-and-nutritionists': 'Google Ads management for dietitians and nutritionists',
  'wedding-photography-leads': 'SEO services for wedding photographers',
  'plumbing-leads': 'Plumbing lead generation services',
  'advanced-solar-lead-generation': 'Solar lead generation services',
  'google-ads-for-financial-advisors': 'Google Ads management for financial advisors'
};
const COMMERCIAL_SERVICE_PAGES = new Set(Object.keys(COMMERCIAL_SERVICE_TYPES));
const UPDATED_CONTENT = new Set([
  'seo-for-care-homes',
  'seo-for-nursing-homes',
  'google-ads-for-care-homes',
  'facebook-ads-for-care-homes',
  'google-ads-for-nursing-homes',
  'facebook-ads-for-nursing-homes',
  'financial-advisor-leads',
  'google-ads-for-financial-advisors',
  'facebook-ads-for-financial-advisors',
  'seo-for-financial-advisors',
  'financial-advisor-google-ads-keywords',
  'epoxy-flooring-leads',
  'google-ads-for-epoxy-flooring',
  'facebook-ads-for-flooring-companies',
  'seo-for-epoxy-flooring'
]);
const INDUSTRIES = [
  'appliance-repair', 'handyman', 'towing', 'pool-service', 'wedding-photography',
  'solar', 'plumbing', 'car-detailing', 'carpet-cleaning', 'electrician',
  'epoxy-flooring', 'garage-door', 'hvac', 'landscaping', 'lawn-care',
  'nutritionist', 'nursing-home', 'care-home', 'roadside-assistance',
  'financial-advisor', 'general-contractor', 'graphic-designer', 'hair-salon',
  'lawyer', 'mechanic', 'plastic-surgeon', 'recruiting', 'short-term-rental',
  'spa', 'web-designer', 'yoga-studio'
];

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripTags(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const first = html.match(new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${escaped}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i'));
  if (first) return first[1].trim();
  const reversed = html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${escaped}["'][^>]*>`, 'i'));
  return reversed ? reversed[1].trim() : '';
}

function getTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return decodeHtml(stripTags(match ? match[1] : '')).replace(/\s*\|\s*Alex Does Digital.*$/i, '').trim();
}

function getGitDate(filename) {
  try {
    const output = execFileSync('git', [
      'log', '--diff-filter=A', '--follow', '--format=%cs', '--', filename
    ], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return output.trim().split('\n').filter(Boolean).pop() || TODAY;
  } catch {
    return TODAY;
  }
}

function hubFor(post) {
  if (CASE_STUDIES.has(post.slug)) return { slug: 'case-studies', title: 'Case Studies' };
  if (post.slug.startsWith('facebook-ads-for-')) return HUBS['Facebook Ads'];
  if (post.slug.startsWith('google-ads-for-') || post.slug === 'google-ads-pilot') return HUBS['Google Ads'];
  if (post.slug.startsWith('seo-for-')) return HUBS.SEO;
  return HUBS[post.category] || HUBS.Blog;
}

function industryFor(slug) {
  if (slug.includes('epoxy-flooring') || slug.includes('flooring-companies')) return 'flooring';
  if (slug.includes('ceramic-coating') || slug.includes('car-detailing')) return 'car-detailing';
  return INDUSTRIES.find(industry => slug.includes(industry)) || '';
}

function shortTitle(title) {
  return title.split('|')[0].split(':')[0].trim();
}

function relatedPosts(post, posts) {
  const staticRelated = {
    'facebook-ads-lead-generation': { slug: 'facebook-ads-lead-generation', title: 'Facebook Ads Lead Generation' },
    'google-ads-for-service-businesses': { slug: 'google-ads-for-service-businesses', title: 'Google Ads for Service Businesses' },
    'conversion-rate-optimization': { slug: 'conversion-rate-optimization', title: 'Conversion Rate Optimization' }
  };
  // An empty curated list intentionally suppresses the generic footer callout
  // when the page already links to its same-industry resources in context.
  const manualRelated = {
    'epoxy-flooring-leads': [],
    'google-ads-for-epoxy-flooring': [],
    'facebook-ads-for-flooring-companies': [],
    'seo-for-epoxy-flooring': [],
    'appliance-repair-leads': [],
    'google-ads-for-towing-companies': [],
    'care-home-marketing': [],
    'google-ads-for-care-homes': [],
    'facebook-ads-for-care-homes': [],
    'seo-for-care-homes': [],
    'nursing-home-marketing': [],
    'google-ads-for-nursing-homes': [],
    'facebook-ads-for-nursing-homes': [],
    'seo-for-nursing-homes': [],
    'google-ads-for-dietitians-and-nutritionists': ['seo-for-nutritionists', 'google-ads-pilot'],
    'seo-for-nutritionists': ['google-ads-for-dietitians-and-nutritionists', 'google-ads-pilot'],
    'financial-advisor-leads': [],
    'google-ads-for-financial-advisors': [],
    'financial-advisor-google-ads-keywords': [],
    'facebook-ads-for-financial-advisors': [],
    'seo-for-financial-advisors': [],
    'plumbing-leads': ['facebook-ads-for-plumbers', 'google-ads-for-service-businesses'],
    'advanced-solar-lead-generation': ['facebook-ads-for-solar-companies', 'google-ads-for-service-businesses'],
    'google-local-services-ads-towing-cost-per-lead': ['google-ads-towing-case-study', 'google-ads-for-towing-companies', 'towing-leads']
  };
  if (manualRelated[post.slug]) {
    return manualRelated[post.slug]
      .map(slug => posts.find(candidate => candidate.slug === slug) || staticRelated[slug])
      .filter(Boolean);
  }
  const industry = industryFor(post.slug);
  const sameIndustry = industry
    ? posts.filter(candidate => candidate.slug !== post.slug && industryFor(candidate.slug) === industry)
    : [];
  return sameIndustry.slice(0, 3);
}

function breadcrumbsFor(slug, title, post, role) {
  const crumbs = [{ title: 'Home', slug: '' }];
  if (!slug) return crumbs;

  if (role === 'service') {
    crumbs.push({ title: 'Services', slug: 'services' });
  } else if (role === 'industry') {
    crumbs.push({ title: 'Industries', slug: 'industries' });
  } else if (role === 'case-study') {
    crumbs.push({ title: 'Case Studies', slug: 'case-studies' });
  } else if (role === 'guide' && post) {
    crumbs.push(hubFor(post));
  } else if (role === 'hub') {
    if (HUB_SLUGS.has(slug)) crumbs.push({ title: 'Guides', slug: 'guides' });
  }
  crumbs.push({ title, slug });
  return crumbs;
}

function schemaImage(html) {
  const image = getMeta(html, 'og:image');
  if (image && !image.endsWith('/og-image.jpg')) return image;
  const youtube = html.match(/(?:youtube\.com\/embed\/|img\.youtube\.com\/vi\/)([\w-]+)/i);
  if (youtube) return `https://img.youtube.com/vi/${youtube[1]}/maxresdefault.jpg`;
  const local = html.match(/<img\b[^>]*src=["']([^"']+)["']/i);
  if (local) {
    if (/^https?:/.test(local[1])) return local[1];
    return `${SITE}/${local[1].replace(/^\//, '').replace(/ /g, '%20')}`;
  }
  return `${SITE}/images/alexpolo-copy.webp`;
}

function makeSchema({ slug, title, description, html, post, crumbs, role }) {
  const url = slug ? `${SITE}/${slug}` : `${SITE}/`;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.title,
      item: crumb.slug ? `${SITE}/${crumb.slug}` : `${SITE}/`
    }))
  };
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Alex Does Digital',
    url: `${SITE}/`,
    email: 'alex@alexdoesdigital.com',
    telephone: '+17163903081',
    logo: { '@type': 'ImageObject', url: `${SITE}/images/alex-does-digital-logo.svg`, width: 512, height: 512 },
    founder: { '@id': `${SITE}/about#person` },
    sameAs: []
  };
  let main;

  if (!slug) {
    main = organization;
  } else if (slug === 'about') {
    main = {
      '@type': 'Person', '@id': `${url}#person`, name: 'Alex', url,
      image: `${SITE}/images/alexpolo-copy.webp`, jobTitle: 'Performance Marketing Consultant',
      worksFor: { '@id': `${SITE}/#organization` },
      knowsAbout: ['Google Ads', 'Facebook Ads', 'Search Engine Optimization', 'Lead Generation']
    };
  } else if (role === 'service' || role === 'industry' || COMMERCIAL_SERVICE_PAGES.has(slug)) {
    main = {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: title,
      description,
      url,
      serviceType: COMMERCIAL_SERVICE_TYPES[slug] || title,
      provider: { '@id': `${SITE}/#organization` }
    };
  } else if ((role === 'guide' || role === 'case-study') && post) {
    main = {
      '@type': role === 'case-study' ? 'Article' : 'BlogPosting',
      '@id': `${url}#article`, headline: title, description,
      image: [schemaImage(html)],
      datePublished: post.date || getGitDate(`${slug}.html`),
      dateModified: UPDATED_CONTENT.has(slug) ? '2026-10-06' : (post.date && post.date > TODAY ? post.date : TODAY),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Person', '@id': `${SITE}/about#person`, name: 'Alex', url: `${SITE}/about` },
      publisher: { '@id': `${SITE}/#organization` },
      articleSection: hubFor(post).title
    };
  } else if (role === 'hub' || slug === 'case-studies' || slug === 'industries' || HUB_SLUGS.has(slug)) {
    main = { '@type': 'CollectionPage', '@id': `${url}#webpage`, name: title, description, url };
  } else if (slug === 'privacy-policy' || slug === 'terms-of-service' || slug === '404') {
    main = { '@type': 'WebPage', '@id': `${url}#webpage`, name: title, description, url };
  } else {
    main = {
      '@type': 'Service', '@id': `${url}#service`, name: title, description, url,
      provider: { '@id': `${SITE}/#organization` },
      areaServed: { '@type': 'Country', name: 'United States' }
    };
  }

  const graph = slug ? [main, organization, breadcrumb] : [main, breadcrumb];
  return `<script type="application/ld+json" data-seo-schema>\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}\n</script>`;
}

function removeManagedSchemas(html) {
  return html.replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (whole, json) => {
    try {
      const data = JSON.parse(json);
      const values = data['@graph'] || [data];
      if (values.some(item => item && item['@type'] === 'FAQPage')) return whole;
    } catch {
      // Replace malformed schema with the validated generated graph.
    }
    return '';
  });
}

function optimizeImages(html, slug) {
  let imageIndex = 0;
  html = html.replace(/images\/pool-video-ad\.png/g, 'images/pool-video-ad.webp');
  html = html.replace(/images\/pool-image-ad\.png/g, 'images/pool-image-ad.webp');
  html = html.replace(/images\/alexpolo copy\.jpg/g, 'images/alexpolo-copy.webp');
  html = html.replace(/https:\/\/alxdoesdigital\.com\/og-image\.jpg/g, `${SITE}/images/alexpolo-copy.webp`);

  html = html.replace(/<img\b[^>]*>/gi, tag => {
    imageIndex++;
    const srcMatch = tag.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) return tag;
    const src = srcMatch[1];
    let width;
    let height;
    if (/img\.youtube\.com/.test(src)) [width, height] = [1280, 720];
    else if (/images\.unsplash\.com/.test(src)) [width, height] = [600, 600];
    else if (/alexpolo-copy\.webp/.test(src)) [width, height] = [1013, 1024];
    else if (/pool-(?:video|image)-ad\.webp/.test(src)) [width, height] = [1024, 1024];

    let optimized = tag.replace(/\s(?:loading|fetchpriority|decoding)=["'][^"']*["']/gi, '');
    if (width && !/\swidth=["']/i.test(optimized)) optimized = optimized.replace(/>$/, ` width="${width}">`);
    if (height && !/\sheight=["']/i.test(optimized)) optimized = optimized.replace(/>$/, ` height="${height}">`);
    const isLikelyLcp = imageIndex === 1 && (slug === '' || slug === 'about');
    const attrs = isLikelyLcp
      ? ' decoding="async" fetchpriority="high"'
      : ' loading="lazy" decoding="async"';
    return optimized.replace(/>$/, `${attrs}>`);
  });

  return html.replace(/<iframe\b[^>]*>/gi, tag => (
    /\sloading=["']/i.test(tag) ? tag : tag.replace(/>$/, ' loading="lazy">')
  ));
}

function assetBlock() {
  return `    <link rel="preconnect" href="https://fonts.googleapis.com">\n` +
    `    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n` +
    `    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n` +
    `    <link rel="stylesheet" href="/site.css?v=3">`;
}

function normalizeAssets(html) {
  html = html.replace(/^\s*<link[^>]+(?:fonts\.(?:googleapis|gstatic)\.com|styles\.css|editorial\.css|site\.css)[^>]*>\s*$/gim, '');
  html = html.replace(/'Space Grotesk'/g, "'Plus Jakarta Sans'");
  return html.replace(/\s*<\/head>/i, `\n${assetBlock()}\n</head>`);
}

function standardNavigation(slug) {
  const links = [
    ['services', 'Services'],
    ['industries', 'Industries'],
    ['case-studies', 'Case Studies'],
    ['guides', 'Guides'],
    ['about', 'About']
  ];
  const items = links.map(([target, label]) => {
    const active = slug === target || (target === 'services' && REGISTRY[slug] === 'service') ||
      (target === 'industries' && REGISTRY[slug] === 'industry') ||
      (target === 'case-studies' && REGISTRY[slug] === 'case-study') ||
      (target === 'guides' && REGISTRY[slug] === 'guide');
    return `<li><a class="nav-link${active ? ' active' : ''}" href="/${target}"${active ? ' aria-current="page"' : ''}>${label}</a></li>`;
  }).join('');
  return `<nav class="navbar" aria-label="Primary navigation"><div class="container"><div class="nav-wrapper"><a class="logo-text" href="/" aria-label="Alex Does Digital home">Alex Does Digital</a><ul class="nav-links">${items}<li><a class="nav-link nav-cta" href="${BOOKING_URL}" target="_blank" rel="noopener">Talk to Alex</a></li></ul></div></div></nav>`;
}

function standardFooter() {
  return `<footer class="footer"><div class="container"><div class="footer-content">
    <div><a class="footer-brand" href="/">Alex Does Digital</a><p class="footer-mission">Senior-led paid search, paid social, SEO, and conversion strategy for service businesses.</p><div class="footer-contact"><a href="mailto:alex@alexdoesdigital.com">alex@alexdoesdigital.com</a></div></div>
    <div><h3 class="footer-heading">Services</h3><div class="footer-links"><a href="/google-ads-for-service-businesses">Google Ads</a><a href="/facebook-ads-lead-generation">Facebook Ads</a><a href="/seo-for-service-businesses">SEO</a><a href="/conversion-rate-optimization">Conversion Rate Optimization</a><a href="/youtube-leads">YouTube</a></div></div>
    <div><h3 class="footer-heading">Explore</h3><div class="footer-links"><a href="/services">Services</a><a href="/industries">Industries</a><a href="/case-studies">Case Studies</a><a href="/guides">Guides</a><a href="/about">About</a></div></div>
    <div><h3 class="footer-heading">Start here</h3><div class="footer-links"><a href="${BOOKING_URL}" target="_blank" rel="noopener">Talk to Alex</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a></div></div>
  </div><div class="footer-bottom"><p>&copy; 2026 Alex Does Digital. All rights reserved.</p><p>Strategy and execution without agency layers.</p></div></div></footer>`;
}

function normalizeSiteChrome(html, slug) {
  html = html
    .replace(/https:\/\/cal\.com\/(?:alexanderstefanseo\/(?:agency|15min)|alexdoesdigital\/30min)/g, BOOKING_URL)
    .replace(/href=["']\/blog(?:\.html)?["']/gi, 'href="/guides"')
    .replace(/Back to Blog/gi, 'Back to Guides')
    .replace(/See all insights/gi, 'See all guides');

  const nav = standardNavigation(slug);
  if (/<header\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/header>/i.test(html)) {
    html = html.replace(/<header\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/header>/i, nav);
  } else if (/<nav\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/nav>/i.test(html)) {
    html = html.replace(/<nav\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/nav>/i, nav);
  } else {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${nav}`);
  }

  const footer = standardFooter();
  if (/<footer\b[^>]*class=["'][^"']*footer[^"']*["'][^>]*>[\s\S]*?<\/footer>/i.test(html)) {
    html = html.replace(/<footer\b[^>]*class=["'][^"']*footer[^"']*["'][^>]*>[\s\S]*?<\/footer>/i, footer);
  } else {
    html = html.replace(/<\/body>/i, `${footer}\n</body>`);
  }
  return html;
}

function breadcrumbMarkup(crumbs) {
  const items = crumbs.map((crumb, index) => {
    const label = escapeHtml(crumb.title);
    const content = index === crumbs.length - 1
      ? `<span aria-current="page">${label}</span>`
      : `<a href="/${escapeHtml(crumb.slug)}">${label}</a>`;
    return `<li>${content}</li>`;
  }).join('');
  return `<!-- SEO_BREADCRUMBS_START -->\n<nav class="site-breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${items}</ol></div></nav>\n<!-- SEO_BREADCRUMBS_END -->`;
}

function addBreadcrumbs(html, crumbs) {
  html = html.replace(/\s*<!-- SEO_BREADCRUMBS_START -->[\s\S]*?<!-- SEO_BREADCRUMBS_END -->\s*/g, '\n');
  // A one-item breadcrumb on the homepage adds no navigation value; its
  // BreadcrumbList remains available in structured data.
  if (crumbs.length === 1) return html;
  const markup = breadcrumbMarkup(crumbs);
  if (/<header\b[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>/i.test(html)) {
    return html.replace(/<\/header>/i, `</header>\n${markup}`);
  }
  if (/<\/nav>/i.test(html)) return html.replace(/<\/nav>/i, `</nav>\n${markup}`);
  return html.replace(/<body[^>]*>/i, match => `${match}\n${markup}`);
}

function addContextLinks(html, post, posts) {
  html = html.replace(/\s*<!-- SEO_CONTEXT_START -->[\s\S]*?<!-- SEO_CONTEXT_END -->\s*/g, '\n');
  const related = relatedPosts(post, posts);
  if (!related.length) return html;
  const links = related.map(item => `<a href="/${item.slug}">${escapeHtml(shortTitle(item.title))}</a>`);
  const sentence = links.length === 1
    ? links[0]
    : links.length === 3
    ? `${links[0]}, ${links[1]}, and ${links[2]}`
    : `${links[0]} and ${links[1]}`;
  const block = `<!-- SEO_CONTEXT_START -->\n<p class="article-pathways"><strong>Related resources:</strong> ${sentence}.</p>\n<!-- SEO_CONTEXT_END -->`;

  if (/<\/article>/i.test(html)) return html.replace(/<\/article>/i, `${block}\n</article>`);
  const ctaMatches = [...html.matchAll(/<section\b[^>]*class=["'][^"']*(?:cta|next-steps)[^"']*["'][^>]*>/gi)];
  if (ctaMatches.length) {
    const target = ctaMatches[ctaMatches.length - 1];
    return `${html.slice(0, target.index)}${block}\n${html.slice(target.index)}`;
  }
  if (/<footer\b/i.test(html)) return html.replace(/<footer\b/i, `${block}\n<footer`);
  return html.replace(/<\/body>/i, `${block}\n</body>`);
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
const postsBySlug = new Map(posts.map(post => [post.slug, post]));
const htmlFiles = fs.readdirSync(ROOT).filter(file => file.endsWith('.html') && !TEMPLATES.has(file));

for (const file of htmlFiles) {
  const slug = file === 'index.html' ? '' : file.replace(/\.html$/, '');
  let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const title = getTitle(html) || 'Alex Does Digital';
  const description = getMeta(html, 'description') || title;
  const post = postsBySlug.get(slug);
  const role = REGISTRY[slug || 'index'];
  const crumbs = breadcrumbsFor(slug, title, post, role);

  html = normalizeSiteChrome(html, slug);
  html = removeManagedSchemas(html);
  html = html.replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*data-seo-schema[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\s*<\/head>/i, `\n    ${makeSchema({ slug, title, description, html, post, crumbs, role })}\n</head>`);
  html = normalizeAssets(html);
  html = addBreadcrumbs(html, crumbs);
  if (post) html = addContextLinks(html, post, posts);
  html = optimizeImages(html, slug);
  fs.writeFileSync(path.join(ROOT, file), html);
}

const combinedCss = [
  fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'editorial.css'), 'utf8')
].join('\n');
fs.writeFileSync(path.join(ROOT, 'site.css'), `${minifyCss(combinedCss)}\n`);

console.log(`Enhanced ${htmlFiles.length} public pages with standardized navigation, footers, breadcrumbs, schema, assets, and contextual links`);
console.log(`Generated consolidated site.css (${Math.round(fs.statSync(path.join(ROOT, 'site.css')).size / 1024)} KB)`);
