const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const pages = [
  {
    slug: 'plumbing-leads',
    title: 'Plumbing Leads | Proven Ways to Get More Plumbing Calls',
    h1: 'How to Generate More Plumbing Leads',
    label: 'Lead Generation for Plumbers',
    description: 'Generate more plumbing leads with Google Ads, local SEO, conversion-focused service pages, call tracking, reviews, and faster lead follow-up.',
    date: '2025-12-02',
    readTime: '14 min read',
    lede: 'Build a dependable pipeline for emergency repairs, scheduled service, maintenance, and installation work. This guide explains how plumbers can capture local demand and turn more calls into booked jobs.',
    summary: ['Capture emergency and scheduled-service demand', 'Build local visibility with useful service pages', 'Track calls, booked jobs, revenue, and lead quality'],
    sections: `
      <h2>Start with the plumbing jobs you actually want</h2>
      <p>Plumbing lead generation becomes expensive when every service is treated the same. A burst pipe, water-heater replacement, drain cleaning, sewer inspection, repipe, and commercial maintenance contract have different urgency, margins, service areas, and sales processes.</p>
      <p>List the jobs the company can serve profitably, the locations technicians can reach, the hours calls are answered, and the capacity available each week. That operating plan should shape keywords, pages, budgets, and lead qualification.</p>

      <h2>Use Google Ads for urgent plumbing leads</h2>
      <p>Paid search can reach homeowners and property managers when they are actively looking for help. Build tightly focused ad groups around real services such as emergency plumbing, drain cleaning, leak repair, water heaters, or sewer repair. Send each ad to the matching service page instead of a generic homepage.</p>
      <ul>
        <li>Target people physically located inside the service area.</li>
        <li>Use exact and phrase match while search-term quality is being established.</li>
        <li>Add negatives for jobs, training, DIY, supplies, definitions, and unsupported services.</li>
        <li>Run ads only when calls and forms can receive a timely response.</li>
        <li>Track qualified calls and booked jobs rather than counting every click as progress.</li>
      </ul>
      <p>Separate emergency work from planned installations when budgets and economics differ. Emergency campaigns may prioritize immediate calls, while replacement campaigns can support a longer comparison and estimate process.</p>

      <h2>Build local SEO visibility for plumbers</h2>
      <p>Organic plumbing leads come from a clear site, a well-maintained Google Business Profile, consistent business information, useful service pages, and evidence that the company serves the market shown on the page.</p>
      <p>Create a substantial page for each core service. Explain symptoms, likely causes, the diagnostic process, service options, the locations served, and the next step. Add original job photos, team information, licenses where relevant, and answers to real customer questions.</p>
      <div class="intent-callout"><strong>Avoid thin city pages.</strong> Only create location pages for areas the company genuinely serves, and include useful local information, applicable services, real project evidence, reviews, and a distinct reason for the page to exist.</div>
      <p>Keep the Google Business Profile accurate, choose appropriate categories, add current service information and photos, and respond to reviews. Do not use fake locations, virtual offices, or fabricated review language.</p>

      <h2>Create service pages that convert calls into jobs</h2>
      <p>A strong plumbing page quickly confirms the service, area, availability, and company behind the offer. Mobile visitors should be able to call without searching for a phone number.</p>
      <ul>
        <li>Use a service-specific H1 and a clear description of the problem solved.</li>
        <li>Show the service area and realistic response expectations.</li>
        <li>Explain pricing approach without inventing a quote before diagnosis.</li>
        <li>Display reviews, credentials, warranties, and real project evidence.</li>
        <li>Offer both a prominent call action and a short estimate form.</li>
      </ul>
      <p>Forms should ask only for information needed to respond: service type, location, urgency, contact details, and a short description. Long forms reduce completion rates during urgent situations.</p>

      <h2>Use Facebook and Instagram for planned services</h2>
      <p>Social advertising is usually better for demand generation, retargeting, maintenance offers, water-quality services, remodeling support, and larger planned replacements than immediate emergency searches. Use geographic targeting and creative that shows the team, process, finished work, or an educational explanation.</p>
      <p>The dedicated guide to <a href="/facebook-ads-for-plumbers">Facebook Ads for plumbers</a> covers campaign structure and creative in more detail. Keep the offer accurate and avoid discounts that attract requests the operation cannot serve profitably.</p>

      <h2>Build referral and partner lead sources</h2>
      <p>Property managers, restoration firms, real-estate professionals, home inspectors, remodelers, and complementary trades can become valuable sources of plumbing work. Create a simple partner process with a clear service area, response method, and communication standard.</p>
      <p>Past customers are another strong source. Ask for an honest review after a successful job, make it easy to save the company’s contact information, and use consent-based reminders for maintenance services when appropriate.</p>

      <h2>Answer every lead faster and more consistently</h2>
      <p>Marketing cannot repair a missed-call problem. Route calls to a person who can help, use missed-call text responses with appropriate consent, and define what happens when the team is at capacity. Forms should trigger an immediate confirmation and a clear follow-up task.</p>
      <p>Track the original source, service requested, qualified status, appointment, booked job, revenue, and reason a lead was lost. Those notes show whether a channel produces profitable work or simply produces activity.</p>

      <h2>Measure plumbing lead quality</h2>
      <div class="intent-table-wrap"><table class="intent-table"><thead><tr><th>Metric</th><th>What it reveals</th></tr></thead><tbody>
        <tr><td>Qualified call rate</td><td>Whether targeting reaches people the company can serve</td></tr>
        <tr><td>Booking rate</td><td>How well calls and forms become appointments</td></tr>
        <tr><td>Cost per booked job</td><td>The real acquisition cost after lead handling</td></tr>
        <tr><td>Revenue by source</td><td>Which channels produce valuable work</td></tr>
        <tr><td>Lost-lead reasons</td><td>Where targeting, coverage, pricing, or capacity breaks down</td></tr>
      </tbody></table></div>
      <p>Review performance by service and location. A drain-cleaning lead and a repipe opportunity should not be judged by the same lead value. Improve tracking before scaling spend.</p>

      <h2>Strengthen crawl paths to the plumbing page</h2>
      <p>Keep the main plumbing guide linked from the industry directory, lead-generation hub, blog, and relevant channel articles. Use descriptive anchors that explain the destination instead of relying only on navigation labels. The canonical URL, sitemap entry, internal links, and redirects should all use the same clean URL.</p>
      <p>Within the plumbing guide, link to deeper channel resources only when they add detail. This creates a clear hierarchy: the main page explains the complete lead system, while supporting pages cover paid social, paid search, conversion, and case studies without competing for the same core intent.</p>

      <h2>A practical plumbing lead-generation plan</h2>
      <ol>
        <li>Choose the priority services, service area, hours, and weekly capacity.</li>
        <li>Fix call handling, form delivery, and booked-job tracking.</li>
        <li>Build or improve the main service and location pages.</li>
        <li>Launch focused paid search for the highest-intent services.</li>
        <li>Strengthen the Google Business Profile, reviews, and local authority.</li>
        <li>Add social, referral, and partner campaigns where they fit the job type.</li>
        <li>Scale only after qualified calls turn into profitable work.</li>
      </ol>`,
    faqs: [
      ['How can plumbers get more leads?', 'Combine high-intent paid search, strong local SEO, complete service pages, reviews, referral partners, and reliable lead follow-up. Track booked jobs and revenue so budget follows profitable services.'],
      ['Are Google Ads effective for plumbing companies?', 'They can be effective for urgent and service-specific searches when location targeting, keywords, negatives, landing pages, call handling, and conversion tracking are tightly controlled.'],
      ['How long does plumbing SEO take?', 'Timing varies by market, website condition, competition, and existing authority. Local visibility often improves gradually over several months as technical, content, profile, review, and authority work accumulates.'],
      ['What should a plumbing lead form ask?', 'Ask for the service needed, location, urgency, contact information, and a short description. Collect only what the team needs to respond and avoid unnecessary friction.'],
      ['What is the best plumbing lead metric?', 'Cost per booked job and revenue by source are more useful than raw lead volume. Qualified call rate, booking rate, and lost-lead reasons explain how those outcomes are produced.']
    ],
    ctaTitle: 'Want more qualified plumbing calls?',
    ctaText: 'Get a practical review of your service pages, paid search, local visibility, call handling, and booked-job tracking.'
  },
  {
    slug: 'advanced-solar-lead-generation',
    title: 'Solar Lead Generation | Get More Qualified Solar Leads',
    h1: 'Solar Lead Generation That Produces Qualified Appointments',
    label: 'Lead Generation for Solar Companies',
    description: 'Build a solar lead-generation system with Google Ads, Facebook Ads, SEO, focused landing pages, qualification, consent, CRM tracking, and faster follow-up.',
    date: '2026-04-22',
    readTime: '15 min read',
    lede: 'Generate more useful residential solar opportunities by matching each channel to buyer intent, setting accurate expectations, qualifying early, and measuring appointments and installations—not form volume alone.',
    summary: ['Separate search demand from social discovery', 'Improve consent, qualification, and speed to lead', 'Measure appointments, proposals, and installed revenue'],
    sections: `
      <h2>Why solar lead generation fails</h2>
      <p>Solar campaigns often fail because the business buys volume without defining a qualified opportunity. Broad targeting, aggressive savings claims, weak consent, slow follow-up, and disconnected sales reporting can make inexpensive leads look successful even when few people attend an appointment.</p>
      <p>Start with the installer’s real market: service territory, eligible property types, financing or cash options, installation capacity, utility conditions, and sales-team capacity. Marketing should represent those facts accurately.</p>

      <h2>Define a qualified solar lead</h2>
      <p>A useful definition may include location, homeownership or decision-making authority, property type, roof or site suitability, electricity usage, timeline, and willingness to discuss an assessment. Qualification must be fair, necessary, and consistent with applicable privacy and advertising rules.</p>
      <p>Do not ask every question in the first form. Collect enough information to route and prioritize the inquiry, then complete a transparent qualification process during follow-up.</p>

      <h2>Capture high-intent demand with Google Ads</h2>
      <p>Search campaigns reach people actively comparing installers, costs, batteries, financing, or local solar options. Separate installer searches from broad research and send each ad group to a relevant page.</p>
      <ul>
        <li>Use location targeting based on the actual installation territory.</li>
        <li>Build themes for solar installation, local installers, battery storage, and other real offers.</li>
        <li>Add negatives for jobs, courses, DIY, wholesale equipment, unsupported locations, and unrelated products.</li>
        <li>Use accurate language about incentives, savings, eligibility, and financing.</li>
        <li>Track qualified appointments, proposals, and installations.</li>
      </ul>
      <p>A general service-business search framework can help organize bidding and measurement, but solar campaigns need their own qualification, claim review, and sales feedback.</p>

      <h2>Create demand with Facebook and Instagram</h2>
      <p>Social campaigns introduce the offer before a homeowner searches. Strong creative explains a real problem or decision: rising energy costs, backup power, battery storage, roof timing, or how an assessment works. Local team footage, project walkthroughs, customer stories, and clear educational explanations can build credibility.</p>
      <p>The dedicated guide to <a href="/facebook-ads-for-solar-companies">Facebook Ads for solar companies</a> covers paid-social strategy in more depth. Avoid fake urgency, guaranteed savings, misleading incentive language, or creative that hides important conditions.</p>

      <h2>Build organic solar visibility</h2>
      <p>Solar SEO should connect core service pages, location information, project evidence, equipment or battery options, financing explanations, and useful answers to local buyer questions. Publish pages only for markets and services the company genuinely supports.</p>
      <p>Original project details, installation photos, named experts, updated incentive explanations, and transparent methodology provide more value than generic articles. Cite authoritative sources when discussing policies, technical performance, or financial considerations, and update time-sensitive information.</p>

      <h2>Create a landing page that sets accurate expectations</h2>
      <p>The page should explain the offer, service territory, installation process, assessment, key eligibility factors, company credentials, and what happens after submission. Make the relationship between the advertised company, installer, and any lead or financing partners clear.</p>
      <ul>
        <li>Use a direct headline that matches the ad.</li>
        <li>Show real projects, team information, credentials, and reviews.</li>
        <li>Explain that savings and eligibility vary where applicable.</li>
        <li>Use clear consent language close to the form action.</li>
        <li>Provide an accessible privacy policy and contact information.</li>
      </ul>

      <h2>Use consent and lead data responsibly</h2>
      <p>Solar marketers should know who collects the information, who receives it, how contact consent is obtained, and how records are stored. Requirements vary by location and channel, so current legal and platform guidance should be reviewed by qualified professionals.</p>
      <div class="intent-callout"><strong>Clarity protects performance.</strong> Do not bury material terms, resell inquiries without appropriate disclosure and permission, or use consent language that does not match the actual follow-up process.</div>

      <h2>Improve speed to lead without sacrificing trust</h2>
      <p>Send an immediate confirmation, route the inquiry to the correct team, and attempt contact promptly during reasonable hours. Use multiple follow-up methods only when consent supports them. A useful first conversation confirms needs and fit rather than forcing a proposal.</p>
      <p>Automations can handle routing, reminders, and status updates, but prospects should be able to reach a person and understand who is contacting them. Record contact attempts, appointment status, qualification outcome, and loss reasons.</p>

      <h2>Measure the entire solar funnel</h2>
      <div class="intent-table-wrap"><table class="intent-table"><thead><tr><th>Stage</th><th>Useful measurement</th></tr></thead><tbody>
        <tr><td>Inquiry</td><td>Valid contact and consent rate</td></tr>
        <tr><td>Qualification</td><td>Serviceable and suitable opportunity rate</td></tr>
        <tr><td>Appointment</td><td>Scheduled and attended appointment rate</td></tr>
        <tr><td>Proposal</td><td>Proposal rate and sales-cycle length</td></tr>
        <tr><td>Customer</td><td>Contract, installation, revenue, and acquisition cost</td></tr>
      </tbody></table></div>
      <p>Feed offline outcomes back into reporting when consent, systems, and platform requirements allow. This shows which keywords, ads, audiences, and locations produce installations rather than unqualified forms.</p>

      <h2>Plan for seasonality and market changes</h2>
      <p>Demand can shift with electricity prices, weather, incentive deadlines, financing conditions, utility programs, and local news. Build a reporting view that separates temporary spikes from durable performance. Update ads and pages when an offer, incentive, product, or service territory changes.</p>
      <p>Keep a stable campaign foundation while testing one meaningful variable at a time: audience, message, form length, landing-page proof, or follow-up process. This makes results easier to interpret and prevents the account from chasing every short-term trend.</p>

      <h2>A practical solar lead-generation plan</h2>
      <ol>
        <li>Define service territory, offers, capacity, and a qualified opportunity.</li>
        <li>Fix consent, routing, CRM stages, and appointment tracking.</li>
        <li>Build focused service and landing pages with accurate claims.</li>
        <li>Capture active demand with search and build demand with social.</li>
        <li>Develop organic visibility with local expertise and real projects.</li>
        <li>Review performance from inquiry through installation.</li>
        <li>Scale the sources that produce attended appointments and profitable customers.</li>
      </ol>`,
    faqs: [
      ['How do solar companies generate leads?', 'A balanced system can combine Google Ads, Facebook and Instagram, SEO, referral partnerships, project evidence, and structured follow-up. The right mix depends on territory, offer, capacity, and sales economics.'],
      ['What makes a qualified solar lead?', 'The definition should reflect the company’s real service area and offer. Common factors include decision-making authority, property type, location, project interest, suitability, timeline, and willingness to complete an assessment.'],
      ['Are purchased solar leads worthwhile?', 'They can vary widely in freshness, exclusivity, consent, transparency, and fit. Evaluate the source through contact, appointment, proposal, and installation outcomes—not the list price alone.'],
      ['How quickly should solar leads be contacted?', 'Prompt, respectful follow-up usually improves contact rates. Contact timing and methods should match the consent provided, reasonable hours, local rules, and the expectations stated on the form.'],
      ['What should solar marketers track?', 'Track valid inquiries, qualification, contact, scheduled and attended appointments, proposals, contracts, installations, revenue, and acquisition cost by source.']
    ],
    ctaTitle: 'Want more qualified solar appointments?',
    ctaText: 'Get a practical review of your channels, claims, landing pages, consent, qualification, follow-up, and full-funnel tracking.'
  }
];

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function faqSchema(faqs) {
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }, null, 2);
}

function renderPage(page) {
  const faq = page.faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta property="article:published_time" content="${page.date}">
  <link rel="canonical" href="https://alxdoesdigital.com/${page.slug}">
  <meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="https://alxdoesdigital.com/${page.slug}"><meta property="og:type" content="article">
  <link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="editorial.css?v=2">
  <script type="application/ld+json">${faqSchema(page.faqs)}</script>
</head><body>
  <nav class="navbar"><div class="container"><div class="nav-wrapper"><div class="logo"><a href="/" class="logo-text">Alex Does Digital</a></div><ul class="nav-links"><li><a href="/" class="nav-link">Home</a></li><li><a href="/case-studies" class="nav-link">Results</a></li><li><a href="/blog" class="nav-link">Insights</a></li><li><a href="https://cal.com/alexanderstefanseo/agency" class="nav-link nav-cta">Book a Growth Audit</a></li></ul></div></div></nav>
  <main><header class="intent-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">Industry</span><p class="intent-eyebrow">${page.label}</p><h1>${page.h1}</h1><p class="intent-lede">${page.lede}</p><div class="intent-meta"><span>Updated October 2026</span><span class="post-hero-read-time">${page.readTime}</span></div></div><aside class="intent-summary"><strong>What this guide covers</strong><ul>${page.summary.map(x => `<li>${x}</li>`).join('')}</ul></aside></div></header>
  <article class="intent-article">${page.sections.trim()}<section class="intent-faq" aria-labelledby="faq-title"><h2 id="faq-title">Frequently asked questions</h2>${faq}</section><section class="intent-cta"><h2>${page.ctaTitle}</h2><p>${page.ctaText}</p><a class="pe-button pe-button-primary" href="https://cal.com/alexanderstefanseo/agency">Book a free strategy call</a></section></article></main>
  <footer class="footer"><div class="container"><div class="footer-bottom"><p>&copy; 2026 Alex Does Digital. All rights reserved.</p><div class="footer-meta"><div class="footer-legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a></div></div></div></div></footer><script src="script.js"></script>
</body></html>`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(ROOT, `${page.slug}.html`), renderPage(page));
  console.log(`Generated ${page.slug}.html`);
}
