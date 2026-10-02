const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));

const hubs = [
  {
    slug: 'facebook-ads-by-industry',
    title: 'Facebook Ads by Industry',
    description: 'Industry-specific Facebook and Instagram advertising guides for service businesses, professional firms, health practices, and local operators.',
    eyebrow: 'Paid Social Guides',
    matches: post => post.category === 'Facebook Ads' || post.slug.startsWith('facebook-ads-for-')
  },
  {
    slug: 'google-ads-by-industry',
    title: 'Google Ads by Industry',
    description: 'Practical Google Ads playbooks for service businesses, with keyword, campaign, landing-page, call-tracking, and budget guidance.',
    eyebrow: 'Paid Search Guides',
    matches: post => post.category === 'Google Ads' || post.slug.startsWith('google-ads-for-')
  },
  {
    slug: 'seo-by-industry',
    title: 'SEO by Industry',
    description: 'SEO guides built around the search behavior, local visibility needs, content opportunities, and trust signals of specific industries.',
    eyebrow: 'Organic Growth Guides',
    matches: post => post.category === 'SEO' || post.slug.startsWith('seo-for-')
  },
  {
    slug: 'lead-generation-guides',
    title: 'Lead-Generation Guides',
    description: 'Channel-by-channel lead-generation strategies for local and service businesses that need more qualified calls, forms, and booked jobs.',
    eyebrow: 'Growth Guides',
    matches: post => post.category === 'Blog' && /(?:^|-)(?:leads|lead-generation)(?:-|$)/.test(post.slug) && !post.slug.includes('case-study')
  }
];

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHub(hub) {
  const items = posts.filter(hub.matches);
  const cards = items.map(post => `
                <a class="topic-hub-card" href="/${escapeHtml(post.slug)}">
                    <span>${escapeHtml(post.category === 'Blog' ? hub.eyebrow : post.category)}</span>
                    <h2>${escapeHtml(post.title)}</h2>
                    <p>${escapeHtml(post.excerpt)}</p>
                </a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(hub.title)} | Alex Does Digital</title>
    <meta name="description" content="${escapeHtml(hub.description)}">
    <link rel="canonical" href="https://alxdoesdigital.com/${hub.slug}">
    <meta property="og:title" content="${escapeHtml(hub.title)} | Alex Does Digital">
    <meta property="og:description" content="${escapeHtml(hub.description)}">
    <meta property="og:url" content="https://alxdoesdigital.com/${hub.slug}">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="editorial.css?v=2">
</head>
<body>
    <nav class="navbar">
        <div class="container"><div class="nav-wrapper">
            <div class="logo"><a href="/" class="logo-text">Alex Does Digital</a></div>
            <ul class="nav-links">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/case-studies" class="nav-link">Results</a></li>
                <li><a href="/blog" class="nav-link">Insights</a></li>
                <li><a href="https://cal.com/alexanderstefanseo/agency" class="nav-link nav-cta">Book a Growth Audit</a></li>
            </ul>
        </div></div>
    </nav>
    <main>
        <header class="topic-hub-hero"><div class="container">
            <p class="section-label">${escapeHtml(hub.eyebrow)}</p>
            <h1>${escapeHtml(hub.title)}</h1>
            <p>${escapeHtml(hub.description)}</p>
        </div></header>
        <section class="topic-hub-section"><div class="container">
            <div class="topic-hub-grid">${cards}
            </div>
        </div></section>
    </main>
    <footer class="footer"><div class="container"><div class="footer-bottom">
        <p>&copy; 2026 Alex Does Digital. All rights reserved.</p>
        <div class="footer-meta"><div class="footer-legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a></div></div>
    </div></div></footer>
    <script src="script.js"></script>
</body>
</html>
`;
}

for (const hub of hubs) {
  fs.writeFileSync(path.join(ROOT, `${hub.slug}.html`), renderHub(hub));
  console.log(`Generated ${hub.slug}.html`);
}
