const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO for Service Businesses | Alex Does Digital</title>
    <meta name="description" content="SEO strategy, technical improvements, local search, and content built to help service businesses earn qualified leads—not just rankings.">
    <link rel="canonical" href="https://alxdoesdigital.com/seo-for-service-businesses">
    <meta property="og:title" content="SEO for Service Businesses | Alex Does Digital">
    <meta property="og:description" content="A revenue-focused SEO program for service businesses that need more qualified calls, forms, and booked work.">
    <meta property="og:url" content="https://alxdoesdigital.com/seo-for-service-businesses">
    <meta property="og:type" content="website">
</head>
<body>
    <nav class="navbar"><div class="container"><div class="nav-wrapper"><a class="logo-text" href="/">Alex Does Digital</a></div></div></nav>
    <main>
        <section class="intent-hero"><div class="container intent-hero-grid">
            <div>
                <p class="section-label">Organic Growth</p>
                <h1>SEO for Service Businesses That Need Qualified Leads</h1>
                <p class="intent-lede">Build durable visibility for the searches that turn into calls, forms, estimates, and booked jobs. Every recommendation connects technical SEO, useful content, local relevance, and conversion.</p>
                <div class="intent-actions"><a class="btn btn-primary" href="https://cal.com/alexanderstefanseo/agency">Book a Growth Audit</a><a class="btn btn-secondary" href="/case-studies">See Client Results</a></div>
            </div>
            <aside class="intent-proof"><span>SEO operating system</span><strong>Search intent → useful page → qualified inquiry</strong><p>No vanity traffic plan. The work is prioritized by business value, difficulty, and the likelihood that a page can win.</p></aside>
        </div></section>

        <section class="intent-section"><div class="container">
            <p class="section-label">What the service covers</p>
            <h2>A complete SEO program, not a list of disconnected tasks</h2>
            <div class="intent-card-grid">
                <article class="intent-card"><h3>Technical foundation</h3><p>Fix crawl, indexation, canonical, internal-link, structured-data, page-speed, and site-quality issues that hold important pages back.</p></article>
                <article class="intent-card"><h3>Commercial content</h3><p>Create and improve service, industry, and location pages around clear search intent. Each page has one job and a place in the site architecture.</p></article>
                <article class="intent-card"><h3>Local visibility</h3><p>Strengthen location relevance, service-area coverage, Google Business Profile alignment, reviews, and the signals that support local discovery.</p></article>
                <article class="intent-card"><h3>Authority and trust</h3><p>Turn real expertise, proof, case studies, and useful guidance into content that people—and search and AI systems—can understand and cite.</p></article>
            </div>
        </div></section>

        <section class="intent-section intent-section-alt"><div class="container intent-split">
            <div><p class="section-label">How it works</p><h2>A focused path from audit to growth</h2><p>I start with the commercial pages closest to revenue, then remove technical barriers and build supporting content around them. Measurement covers rankings and traffic, but the decisions are driven by qualified leads and sales outcomes.</p></div>
            <ol class="intent-steps"><li><strong>Map demand.</strong> Group keywords by intent, service, industry, and location.</li><li><strong>Fix the structure.</strong> Give each page a clear purpose, parent hub, and internal links.</li><li><strong>Improve the experience.</strong> Make pages easier to scan, trust, and act on.</li><li><strong>Publish and iterate.</strong> Use Search Console, analytics, and lead quality to choose the next move.</li></ol>
        </div></section>

        <section class="intent-section"><div class="container">
            <p class="section-label">Built for modern discovery</p>
            <h2>SEO that also supports AI search</h2>
            <p class="intent-narrow">Clear entity signals, direct answers, original examples, concise summaries, structured data, and strong information architecture make your expertise easier to retrieve. That helps traditional search and improves the odds that AI systems can accurately understand and reference your business.</p>
        </div></section>

        <section class="intent-section"><div class="container">
            <p class="section-label">Frequently asked questions</p><h2>SEO service FAQs</h2>
            <div class="faq-list">
                <details><summary>How long does SEO take for a service business?</summary><p>Technical and on-page improvements can show movement within weeks, but meaningful competitive growth usually takes several months. Timing depends on your market, site history, competition, and how quickly useful changes are published.</p></details>
                <details><summary>Do you handle local SEO?</summary><p>Yes. The strategy can include service-area pages, local intent, Google Business Profile alignment, review signals, local links, and content that proves relevance to the places you serve.</p></details>
                <details><summary>Will you write the content?</summary><p>Content can be written, edited, or produced with your subject-matter input. The goal is accurate, useful material with clear ownership—not generic copy made only to fill a keyword quota.</p></details>
                <details><summary>How do you measure success?</summary><p>Qualified calls, forms, booked work, and assisted revenue matter most. Search visibility, indexed pages, clicks, and conversions help diagnose progress along the way.</p></details>
            </div>
        </div></section>

        <section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="section-label">Next step</p><h2>Find the SEO work most likely to create revenue.</h2><p>Book a practical audit of your site, search demand, and highest-value opportunities.</p><a class="btn btn-primary" href="https://cal.com/alexanderstefanseo/agency">Book a Growth Audit</a></div></div></section>
    </main>
    <footer class="footer"><div class="container"><p>&copy; 2026 Alex Does Digital.</p></div></footer>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'seo-for-service-businesses.html'), html);
console.log('Generated seo-for-service-businesses.html');
