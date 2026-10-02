const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const html = `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube Lead Generation for Service Businesses | Alex Does Digital</title>
  <meta name="description" content="YouTube strategy for service businesses that want useful videos, stronger trust, and a measurable path from viewer to qualified lead.">
  <link rel="canonical" href="https://alxdoesdigital.com/youtube-leads">
  <meta property="og:title" content="YouTube Lead Generation for Service Businesses | Alex Does Digital">
  <meta property="og:description" content="Build a practical YouTube system that earns attention, answers buying questions, and turns the right viewers into qualified leads.">
  <meta property="og:url" content="https://alxdoesdigital.com/youtube-leads"><meta property="og:type" content="website">
</head><body>
  <nav class="navbar"><div class="container"><div class="nav-wrapper"><a class="logo-text" href="/">Alex Does Digital</a></div></div></nav>
  <main>
    <section class="intent-hero"><div class="container intent-hero-grid"><div><p class="section-label">Video-led growth</p><h1>YouTube Lead Generation for Service Businesses</h1><p class="intent-lede">Turn the questions prospects already ask into useful videos that build trust, support search visibility, and create a clear path to an inquiry.</p><div class="intent-actions"><a class="btn btn-primary" href="https://cal.com/alexanderstefanseo/agency">Book a Growth Audit</a><a class="btn btn-secondary" href="/services">Explore Services</a></div></div><aside class="intent-proof"><span>A practical video system</span><strong>Helpful topic → qualified viewer → clear next step</strong><p>Strategy covers the content plan, packaging, distribution, calls to action, landing experience, and measurement.</p></aside></div></section>
    <section class="intent-section"><div class="container"><p class="section-label">What gets built</p><h2>A channel that compounds instead of disappearing after one campaign</h2><div class="intent-card-grid"><article class="intent-card"><h3>Demand-led topic strategy</h3><p>Choose topics from real customer questions, commercial search intent, sales objections, and the services you most want to sell.</p></article><article class="intent-card"><h3>Stronger packaging</h3><p>Shape titles, thumbnails, openings, structure, and descriptions so the right person understands the value quickly.</p></article><article class="intent-card"><h3>Conversion paths</h3><p>Connect each video to the right service page, guide, lead magnet, or booking action instead of relying on a generic channel link.</p></article><article class="intent-card"><h3>Useful measurement</h3><p>Track qualified traffic, assisted conversions, inquiries, and booked opportunities alongside audience retention and search discovery.</p></article></div></div></section>
    <section class="intent-section intent-section-alt"><div class="container intent-split"><div><p class="section-label">Where YouTube fits</p><h2>Use video to make every other channel stronger</h2><p>YouTube can create discovery on its own, but its biggest advantage is often trust. A strong library gives prospects a reason to choose you after they find you through Google Ads, SEO, social media, or a referral.</p></div><ol class="intent-steps"><li><strong>Answer buying questions.</strong> Start with the questions closest to a decision.</li><li><strong>Demonstrate expertise.</strong> Show the process, tradeoffs, and proof behind the recommendation.</li><li><strong>Connect the journey.</strong> Send viewers to the page that matches their intent.</li><li><strong>Improve from evidence.</strong> Use retention and lead data to refine the next videos.</li></ol></div></section>
    <section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="section-label">Build the plan</p><h2>Make YouTube part of a measurable lead system.</h2><p>Book a growth audit to identify the topics, offers, and conversion path worth testing first.</p><a class="btn btn-primary" href="https://cal.com/alexanderstefanseo/agency">Book a Growth Audit</a></div></div></section>
  </main>
  <footer class="footer"><div class="container"><p>&copy; 2026 Alex Does Digital.</p></div></footer>
</body></html>\n`;

fs.writeFileSync(path.join(ROOT, 'youtube-leads.html'), html);
console.log('Generated youtube-leads.html');
