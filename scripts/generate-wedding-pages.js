const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const pages = [
  {
    slug: 'google-ads-wedding-photography-leads',
    category: 'Google Ads',
    label: 'Paid Search for Photographers',
    title: 'Google Ads for Wedding Photographers | Book More Couples',
    h1: 'Google Ads for Wedding Photographers',
    description: 'Learn how Google Ads for wedding photographers can generate qualified inquiries with focused keywords, local targeting, landing pages, and accurate booking tracking.',
    date: '2026-10-02',
    readTime: '12 min read',
    lede: 'Reach engaged couples while they are actively comparing photographers. This guide explains how to build focused search campaigns that produce qualified inquiries instead of expensive, low-intent clicks.',
    summary: ['Capture couples during active vendor research', 'Separate high-intent searches from inspiration traffic', 'Track consultations and bookings—not just form fills'],
    sections: `
      <h2>Why Google Ads works for wedding photographers</h2>
      <p>Wedding photography is a considered purchase, but couples still use Google when they are ready to compare portfolios, packages, and availability. Search ads place your offer above organic results during that commercial research. The channel works best when your style, location, price positioning, and next step are immediately clear.</p>
      <p>The goal is not to buy the largest possible traffic volume. It is to capture a smaller group of couples whose venue, date, location, and budget match the weddings you want to photograph.</p>

      <h2>Build campaigns around booking intent</h2>
      <p>Start with tightly themed Search campaigns. Keep broad research terms separate from searches that signal a couple is choosing a photographer now.</p>
      <div class="intent-table-wrap"><table class="intent-table">
        <thead><tr><th>Keyword theme</th><th>Intent</th><th>Best destination</th></tr></thead>
        <tbody>
          <tr><td>wedding photographer near me</td><td>High local intent</td><td>Local wedding portfolio and packages</td></tr>
          <tr><td>London wedding photographer</td><td>Location-specific comparison</td><td>London service page</td></tr>
          <tr><td>documentary wedding photographer</td><td>Style-specific comparison</td><td>Documentary portfolio page</td></tr>
          <tr><td>wedding photography prices</td><td>Budget and package research</td><td>Transparent pricing or package page</td></tr>
        </tbody>
      </table></div>
      <p>Use exact and phrase match first. Review search terms every week and add negatives for jobs, courses, cameras, templates, free images, guest photos, and unrelated locations. This protects the budget from searches that can never become a booking.</p>

      <h2>Match targeting to the weddings you can serve</h2>
      <p>Target people physically present in your service area rather than everyone who shows interest in it. Create separate campaigns when destination weddings, multiple cities, or premium venues require different budgets and messaging. Ad schedules should reflect when you can answer inquiries quickly, but conversion data should decide whether evenings and weekends deserve coverage.</p>
      <p>Do not split a modest budget across dozens of campaigns. One strong local Search campaign with clear ad groups usually learns faster than a complicated account with too little data in each segment.</p>

      <h2>Write ads that qualify couples before the click</h2>
      <p>Strong ads mention the location, photography style, availability, and a useful differentiator. Examples include full-day coverage, a second photographer, film add-ons, fast preview galleries, or experience at specific venues. If packages start at a premium price, stating that range can prevent poor-fit inquiries.</p>
      <ul>
        <li>Use sitelinks for portfolio, packages, reviews, and availability.</li>
        <li>Use callouts for turnaround time, years of experience, and coverage options.</li>
        <li>Keep the promise in the ad consistent with the landing page.</li>
        <li>Avoid vague claims such as “best photographer” unless evidence supports them.</li>
      </ul>

      <h2>Create a landing page built for inquiries</h2>
      <p>Send paid traffic to a dedicated page, not a gallery-heavy homepage with no clear next step. Lead with your strongest work, service area, style, and starting price. Then show complete wedding stories, testimonials, package guidance, and a short availability form.</p>
      <p>Ask for the wedding date, venue or city, estimated budget, and contact details. Those fields provide enough context for a useful first reply without making the form feel like an application.</p>

      <h2>Budget, bidding, and measurement</h2>
      <p>Estimate the number of meaningful clicks your budget can buy before launch. A daily budget that produces only a handful of clicks per week will take a long time to reveal patterns. Begin with controlled bidding while search terms and conversion tracking are being checked, then test automated bidding after the account records enough qualified actions.</p>
      <div class="intent-callout"><strong>Track the business outcome.</strong> Record availability forms, scheduled consultations, qualified inquiries, and confirmed bookings. Import offline booking outcomes when possible so Google learns which leads turn into revenue.</div>
      <p>Cost per inquiry is useful, but cost per booked wedding and revenue from booked packages are the real decision metrics. Call tracking, form tracking, and CRM notes should use consistent source data.</p>

      <a class="intent-case-link" href="/wedding-photography-96-leads"><span>Google Ads case study</span><h3>96 leads in 30 days at a 15% conversion rate</h3><p>See the campaign structure, budgets, and results from a wedding photographer’s paid-search campaign.</p></a>

      <h2>Connect paid search with long-term organic growth</h2>
      <p>Google Ads shows which locations, styles, venues, and package searches produce real inquiries. Use that evidence to prioritize the service pages and content in the <a href="/wedding-photography-leads">SEO guide for wedding photographers</a>. Paid search can capture current demand while SEO builds durable visibility.</p>`,
    faqs: [
      ['Do Google Ads work for wedding photographers?', 'Yes, when campaigns target commercial searches and the landing page clearly shows style, location, pricing, and availability. Broad targeting and weak conversion tracking commonly waste budget.'],
      ['How much should a wedding photographer spend on Google Ads?', 'The right starting budget depends on local click costs and booking value. It should buy enough qualified clicks each week to evaluate search terms, inquiries, and bookings without spreading spend across too many campaigns.'],
      ['Should ads send traffic to the homepage?', 'Usually no. A focused landing page gives couples the portfolio, package information, reviews, and availability form that match the ad they clicked.'],
      ['Which conversions should be tracked?', 'Track availability forms, calls, scheduled consultations, qualified inquiries, and confirmed bookings. Booking value is more useful than counting every form submission equally.']
    ],
    ctaTitle: 'Want a focused wedding photography campaign?',
    ctaText: 'Get a practical review of your keywords, targeting, landing page, and booking measurement.'
  },
  {
    slug: 'wedding-photography-leads',
    category: 'SEO',
    label: 'Organic Search for Photographers',
    title: 'SEO for Wedding Photographers | Book More Weddings',
    h1: 'SEO for Wedding Photographers',
    description: 'Learn SEO for wedding photographers with location pages, venue content, portfolio image optimization, local SEO, technical improvements, and booking measurement.',
    date: '2025-12-02',
    readTime: '14 min read',
    lede: 'Build organic visibility for the locations, venues, styles, and services your ideal couples search for. This guide turns a photography portfolio into a clear, crawlable path from search to inquiry.',
    summary: ['Create pages for real services and locations', 'Turn galleries into useful, searchable wedding stories', 'Strengthen local trust and image performance'],
    sections: `
      <h2>How couples search for wedding photographers</h2>
      <p>Couples rarely use one keyword from discovery to booking. They may begin with venue ideas, narrow the search by photography style, compare photographers in a city, and finally look for prices or availability. Good SEO supports each stage without creating dozens of thin pages.</p>
      <p>Your core commercial page should explain where you work, how you photograph a wedding, what packages include, and how couples can check their date. Supporting pages can then address specific services, legitimate locations, and venues you know well.</p>

      <h2>Create a clear keyword and page map</h2>
      <div class="intent-table-wrap"><table class="intent-table">
        <thead><tr><th>Search theme</th><th>Recommended page</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>wedding photographer + city</td><td>Primary location service page</td><td>Commercial inquiries</td></tr>
          <tr><td>documentary wedding photographer</td><td>Style or service page</td><td>Differentiate the offer</td></tr>
          <tr><td>wedding photographer + venue</td><td>Detailed venue wedding story</td><td>Show relevant experience</td></tr>
          <tr><td>wedding photography prices</td><td>Packages and pricing guide</td><td>Qualify budgets</td></tr>
        </tbody>
      </table></div>
      <p>One page should own each main intent. Avoid publishing several pages that all target the same phrase with slightly different wording. That makes it harder for search engines—and couples—to understand which page matters most.</p>

      <h2>Optimize service and location pages</h2>
      <p>A useful location page needs more than a city name swapped into a template. Explain travel coverage, local venues, lighting or seasonal considerations, complete wedding examples, testimonials from that area, package details, and the booking process. Only create pages for places you genuinely serve.</p>
      <ul>
        <li>Use one descriptive H1 and a concise title tag.</li>
        <li>Show full galleries or substantial wedding stories, not only a highlight reel.</li>
        <li>Include internal links to relevant venues, styles, pricing, and contact pages.</li>
        <li>Add clear availability and inquiry calls to action.</li>
      </ul>

      <h2>Turn portfolio galleries into searchable wedding stories</h2>
      <p>Images demonstrate quality, but search engines also need text and structure. Introduce the couple’s day, venue, season, visual approach, and notable moments. Use descriptive filenames and concise alternative text that explains what an image shows without stuffing keywords.</p>
      <p>Compress images, use modern formats, declare width and height, and lazy-load images below the fold. Keep a strong hero image fast because it is often the page’s largest contentful element.</p>

      <h2>Build local visibility and trust</h2>
      <p>Keep your Google Business Profile accurate, including the correct business model and service area. Add current photos, services, booking links, and thoughtful responses to reviews. Ask couples for honest reviews after delivery and encourage useful detail about the service, venue, and experience without scripting the wording.</p>
      <p>Consistent contact details, reputable wedding directories, venue partner links, and features from real publications help confirm the business behind the portfolio. A clear About page should name the photographer, show experience, and explain the working process.</p>

      <h2>Publish content that supports a booking decision</h2>
      <p>Prioritize information couples need before they inquire: package comparisons, timeline guidance, engagement sessions, venue lighting, rainy-day planning, album options, and what to expect after the wedding. Useful venue guides can rank, but they should include first-hand photographs and specific experience.</p>
      <p>Link each informational guide to the most relevant service page. This moves readers toward a commercial next step and helps search engines understand the relationship between your expertise and services.</p>

      <h2>Technical SEO and AI search visibility</h2>
      <p>Make sure important pages are linked in normal HTML, included in the sitemap, canonicalized correctly, and available without relying on JavaScript. Fix broken links, redirect retired URLs, and prevent tag archives or test pages from becoming indexable duplicates.</p>
      <p>For AI-assisted search, use direct answers, named authors, first-hand examples, clear headings, and verifiable business information. Structured data can describe articles, services, breadcrumbs, and the photographer, but it must match what visitors can see.</p>
      <div class="intent-callout"><strong>Measure inquiries and bookings.</strong> Track organic availability forms, calls, consultation bookings, and signed contracts. Rankings matter only when the right couples reach the site and take the next step.</div>

      <h2>Use paid-search data to guide SEO priorities</h2>
      <p>Search-term and conversion data can reveal which cities, venues, styles, and package phrases create qualified inquiries. The <a href="/google-ads-wedding-photography-leads">Google Ads guide for wedding photographers</a> explains how to gather that demand data while the organic program grows.</p>
      <a class="intent-case-link" href="/wedding-photography-96-leads"><span>Related case study</span><h3>How one photographer generated 96 leads in 30 days</h3><p>Review the paid-search results and lessons that can inform commercial SEO priorities.</p></a>`,
    faqs: [
      ['How long does SEO take for wedding photographers?', 'Meaningful improvement often takes several months. Timing depends on the website, market, existing authority, technical condition, and the quality of competing photographer sites.'],
      ['What should a wedding photographer rank for?', 'Start with one primary service and location, then support it with genuine style, venue, pricing, and planning content. The best keywords match services and locations you actually offer.'],
      ['Do gallery pages need text?', 'Yes. A concise introduction and useful wedding details give search engines and couples context. The text should add information rather than repeat keywords around the images.'],
      ['Does image SEO help wedding photographers?', 'Descriptive filenames, accurate alt text, compression, modern formats, dimensions, and fast delivery improve accessibility and performance. They also help search engines understand portfolio content.'],
      ['Can SEO help a photographer appear in AI search?', 'Clear answers, first-hand venue experience, named authors, strong business details, and well-linked service pages make content easier for search and AI systems to understand and verify.']
    ],
    ctaTitle: 'Want a clearer organic growth plan?',
    ctaText: 'Get a practical review of your service pages, portfolio structure, local visibility, and booking path.'
  },
  {
    slug: 'google-ads-for-dietitians-and-nutritionists',
    category: 'Google Ads',
    label: 'Paid Search for Nutrition Practices',
    title: 'Google Ads for Dietitians & Nutritionists | Get More Clients',
    h1: 'Google Ads for Dietitians and Nutritionists',
    description: 'Learn Google Ads for dietitians and nutritionists with focused keywords, specialty landing pages, local and telehealth targeting, careful claims, and client tracking.',
    date: '2026-10-02',
    readTime: '13 min read',
    lede: 'Reach people actively searching for qualified nutrition support. This guide explains how dietitians, dieticians, and nutritionists can build focused campaigns around real services, locations, and client needs.',
    summary: ['Separate specialties and search intent', 'Use careful health claims and clear credentials', 'Track qualified consultations and new clients'],
    sections: `
      <h2>How Google Ads works for dietitians and nutritionists</h2>
      <p>Paid search can place a practice in front of people who are already looking for nutrition support. That intent is valuable, but it varies widely. Someone searching for a local registered dietitian may be close to booking, while someone searching for a free meal plan may only want general information.</p>
      <p>A strong campaign narrows the account around services the practice genuinely provides. It explains credentials, who the service is for, whether care is local or online, and what a prospective client should expect next.</p>

      <h2>Use both dietitian and dietician search language</h2>
      <p>People use both <strong>dietitian</strong> and <strong>dietician</strong> when searching, even though professional title rules and common usage vary by country. Keyword research should account for both spellings alongside “nutritionist,” but ad and landing-page language must accurately represent the practitioner’s real qualifications.</p>
      <div class="intent-table-wrap"><table class="intent-table">
        <thead><tr><th>Keyword theme</th><th>Intent</th><th>Recommended page</th></tr></thead>
        <tbody>
          <tr><td>dietitian near me / dietician near me</td><td>Local commercial</td><td>Local practice landing page</td></tr>
          <tr><td>online nutritionist</td><td>Telehealth comparison</td><td>Online consultation page</td></tr>
          <tr><td>sports nutrition dietitian</td><td>Specialty-specific</td><td>Sports nutrition service page</td></tr>
          <tr><td>PCOS nutritionist</td><td>Condition-related support</td><td>Eligible specialty page with careful claims</td></tr>
          <tr><td>nutrition counseling cost</td><td>Pricing research</td><td>Pricing, insurance, or consultation page</td></tr>
        </tbody>
      </table></div>
      <p>Use exact and phrase match to establish control. Review search terms frequently and exclude searches for jobs, salaries, degrees, certifications, recipes, free plans, definitions, and services the practice does not offer.</p>

      <h2>Separate campaigns by service and client need</h2>
      <p>Do not place sports nutrition, digestive health, weight-management support, eating-disorder care, pediatric nutrition, and general wellness into one ad group. Each specialty has different language, qualifications, risks, and booking expectations.</p>
      <ul>
        <li>Create a focused ad group or campaign for each real service.</li>
        <li>Send each ad to the matching specialty page.</li>
        <li>Keep local office and telehealth targeting separate when their economics differ.</li>
        <li>Exclude conditions or services outside the practitioner’s scope.</li>
      </ul>
      <p>This structure improves relevance and makes it easier to see which specialties produce qualified consultations rather than low-fit inquiries.</p>

      <h2>Target local and online clients accurately</h2>
      <p>For an in-person practice, target people physically located within a realistic travel area. Mention the city, neighborhood, or clinic location in the ad and landing page. For online nutrition services, target only regions where the practitioner is legally and professionally able to work.</p>
      <p>Avoid creating one nationwide campaign simply because consultations happen online. Licensure, title protection, insurance, time zones, and specialty demand may differ. Separate regions when their rules, pricing, or messaging require it.</p>

      <h2>Write clear ads without risky promises</h2>
      <p>Ads should explain the service, credentials, audience, and next step without guaranteeing health outcomes. Avoid sensational before-and-after claims, shame-based language, unsupported medical promises, or wording that assumes a person has a sensitive condition.</p>
      <div class="intent-callout"><strong>Accuracy matters.</strong> Use professional titles only when they apply, describe the service rather than promising a cure, and make sure ads and landing pages follow current advertising, platform, privacy, and professional rules in the markets served.</div>
      <p>Useful differentiators may include registered credentials, specialty training, insurance acceptance, language options, virtual appointments, evening availability, or experience with a specific client group.</p>

      <h2>Build specialty landing pages that earn trust</h2>
      <p>A paid-search landing page should immediately confirm the service and audience named in the ad. Introduce the practitioner, credentials, approach, appointment format, location or service area, and a clear consultation process.</p>
      <ul>
        <li>Explain who the service is designed to support.</li>
        <li>Describe what happens before, during, and after the first appointment.</li>
        <li>Show accurate credentials, professional memberships, and review context.</li>
        <li>Address pricing, insurance, or reimbursement when possible.</li>
        <li>Use a short, privacy-conscious consultation form.</li>
      </ul>
      <p>Do not ask for unnecessary health details in an advertising lead form. Collect only what the practice needs to arrange a safe first conversation, then move sensitive information into an appropriate intake system.</p>

      <h2>Measure consultations, qualified leads, and new clients</h2>
      <p>Basic form tracking cannot show whether a campaign is profitable. Record calls, consultation requests, scheduled appointments, attended appointments, qualified prospective clients, and new-client revenue. When consent and systems allow, import qualified and completed outcomes so bidding can learn from meaningful conversions.</p>
      <p>Review performance by specialty, keyword theme, location, device, and appointment type. A campaign with a higher cost per lead may still be better if those leads attend consultations and become suitable long-term clients.</p>

      <h2>Budget and bidding</h2>
      <p>Set a starting budget based on local click costs, consultation capacity, and the value of a new client. Keep the initial structure simple enough to gather useful data. Controlled bidding and frequent search-term reviews are valuable early; automated bidding becomes more useful after accurate conversion signals accumulate.</p>
      <p>Protect the budget from broad informational traffic before increasing spend. Expansion should follow evidence from qualified consultations and new clients, not impression volume alone.</p>

      <h2>Pair paid search with nutrition SEO</h2>
      <p>Google Ads can reveal which specialties, questions, locations, and client terms create real inquiries. Use those findings to prioritize durable service pages and educational content. The <a href="/seo-for-nutritionists">SEO guide for nutritionists, dietitians, and dieticians</a> explains how to build that long-term organic visibility, including sports nutrition and AI search.</p>`,
    faqs: [
      ['Do Google Ads work for dietitians and nutritionists?', 'They can work when campaigns focus on services the practitioner genuinely offers, use accurate credentials and careful claims, and track qualified consultations and new clients rather than every form equally.'],
      ['Should campaigns target dietitian, dietician, and nutritionist keywords?', 'Keyword research should consider all three terms because people use them differently. Ads must still use professional titles accurately and comply with the rules in each location served.'],
      ['Can online nutrition practices advertise nationally?', 'Only where the practitioner can legally and professionally provide the advertised service. Regional rules, licenses, insurance, time zones, and platform policies should be checked before expanding targeting.'],
      ['What should a nutrition landing page include?', 'Include the specialty, intended audience, practitioner credentials, care format, process, pricing or insurance guidance, trust signals, and a privacy-conscious consultation form.'],
      ['Which conversions should a practice track?', 'Track calls, consultation requests, scheduled and attended appointments, qualified prospective clients, and new clients. Those outcomes are more useful than treating every form submission as equal.']
    ],
    ctaTitle: 'Want a focused nutrition-practice campaign?',
    ctaText: 'Get a practical review of your keywords, specialty pages, targeting, claims, and consultation tracking.'
  }
];

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function faqSchema(faqs) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  }, null, 2);
}

function renderFaq(faqs) {
  return faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('\n');
}

function renderPage(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta property="article:published_time" content="${page.date}">
  <link rel="canonical" href="https://alxdoesdigital.com/${page.slug}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="https://alxdoesdigital.com/${page.slug}">
  <meta property="og:type" content="article">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="editorial.css?v=2">
  <script type="application/ld+json">${faqSchema(page.faqs)}</script>
</head>
<body>
  <nav class="navbar"><div class="container"><div class="nav-wrapper">
    <div class="logo"><a href="/" class="logo-text">Alex Does Digital</a></div>
    <ul class="nav-links">
      <li><a href="/" class="nav-link">Home</a></li>
      <li><a href="/case-studies" class="nav-link">Results</a></li>
      <li><a href="/blog" class="nav-link">Insights</a></li>
      <li><a href="https://cal.com/alexanderstefanseo/agency" class="nav-link nav-cta">Book a Growth Audit</a></li>
    </ul>
  </div></div></nav>
  <main>
    <header class="intent-hero"><div class="container intent-hero-grid">
      <div>
        <span class="post-category-tag">${page.category}</span>
        <p class="intent-eyebrow">${page.label}</p>
        <h1>${page.h1}</h1>
        <p class="intent-lede">${page.lede}</p>
        <div class="intent-meta"><span>Updated October 2026</span><span class="post-hero-read-time">${page.readTime}</span></div>
      </div>
      <aside class="intent-summary"><strong>What this guide covers</strong><ul>${page.summary.map(item => `<li>${item}</li>`).join('')}</ul></aside>
    </div></header>
    <article class="intent-article">
      ${page.sections.trim()}
      <section class="intent-faq" aria-labelledby="faq-title"><h2 id="faq-title">Frequently asked questions</h2>${renderFaq(page.faqs)}</section>
      <section class="intent-cta"><h2>${page.ctaTitle}</h2><p>${page.ctaText}</p><a class="pe-button pe-button-primary" href="https://cal.com/alexanderstefanseo/agency">Book a free strategy call</a></section>
    </article>
  </main>
  <footer class="footer"><div class="container"><div class="footer-bottom"><p>&copy; 2026 Alex Does Digital. All rights reserved.</p><div class="footer-meta"><div class="footer-legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a></div></div></div></div></footer>
  <script src="script.js"></script>
</body>
</html>`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(ROOT, `${page.slug}.html`), renderPage(page));
  console.log(`Generated ${page.slug}.html`);
}
