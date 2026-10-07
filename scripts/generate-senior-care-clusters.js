const fs = require('fs');
const path = require('path');
const { renderIndustryHubBody } = require('./lib/industry-hub-template');

const ROOT = path.resolve(__dirname, '..');
const BOOKING = 'https://cal.com/alexanderstefanseo/agency';
const UPDATED = 'October 2026';

const clusters = [
  {
    slug: 'care-home-marketing',
    google: 'google-ads-for-care-homes',
    facebook: 'facebook-ads-for-care-homes',
    seo: 'seo-for-care-homes',
    name: 'Care Home',
    plural: 'care homes',
    pluralLabel: 'Care Homes',
    audience: 'care home operators, assisted living communities, senior living providers, and retirement communities',
    region: 'Care home is the primary term in the UK. Assisted living, senior living, and retirement community are more common in North America. Use the language families use in the market you actually serve.',
    hubTitle: 'Care Home Marketing: Build Trust, Enquiries and Occupancy',
    googleTitle: 'Google Ads for Care Homes: Generate Qualified Enquiries',
    hubDescription: 'A complete care home marketing strategy covering Google Ads, Facebook Ads, local SEO, family trust, referral relationships, enquiry tracking, tours, and occupancy.',
    lede: 'Build a measurable marketing system that helps families understand the community, arrange a conversation or tour, and make a confident care decision.',
    services: ['Residential care', 'Assisted living', 'Dementia care', 'Respite care', 'Senior living', 'Retirement living'],
    urgent: 'Families may need an answer quickly after a health change, hospital stay, caregiver burnout, or a sudden change in living circumstances.',
    planned: 'Other families research for weeks or months, comparing location, care approach, staff, activities, accommodation, costs, and availability.',
    proof: 'real rooms and shared spaces, staff introductions, activity schedules, inspection or regulator information, family guidance, transparent contact details, and an accurate explanation of care options',
    qualification: 'location, type of care, timing, current living situation, funding route where appropriate, preferred contact method, and whether the family wants a call, brochure, visit, or assessment',
    googleKeywords: ['care home near me', 'residential care home [location]', 'dementia care home [location]', 'respite care home', 'assisted living [location]', 'senior living community [location]'],
    googleNegatives: ['jobs', 'careers', 'salary', 'training', 'course', 'definition', 'free', 'DIY'],
    facebookAngles: ['A calm walkthrough of the community', 'Meet the people who provide day-to-day care', 'What families can expect during an initial visit', 'Activities, dining, rooms, and shared spaces', 'A practical guide to choosing the right care setting'],
    conversion: 'qualified enquiries, conversations, assessments, tours, applications, move-ins, occupancy contribution, and the reasons families do not progress',
    referrals: 'local clinicians, social workers, discharge teams, community groups, charities, professional advisers, and relevant local partners',
    terminology: 'care homes, assisted living, senior living and retirement communities'
  },
  {
    slug: 'nursing-home-marketing',
    google: 'google-ads-for-nursing-homes',
    facebook: 'facebook-ads-for-nursing-homes',
    seo: 'seo-for-nursing-homes',
    name: 'Nursing Home',
    plural: 'nursing homes',
    pluralLabel: 'Nursing Homes',
    audience: 'nursing homes, skilled nursing facilities, SNFs, rehabilitation centers, and long-term care providers',
    region: 'This cluster uses US terminology. Nursing homes and skilled nursing facilities provide a different level of care from non-clinical assisted living and retirement communities.',
    hubTitle: 'Nursing Home Marketing: Generate Qualified Admissions',
    googleTitle: 'Google Ads for Nursing Homes: A Responsible Admissions Strategy',
    hubDescription: 'A complete nursing home marketing strategy for skilled nursing facilities and SNFs, including Google Ads, Facebook Ads, SEO, referral relationships, admissions tracking, and trust.',
    lede: 'Help families and professional referral sources understand clinical services, admissions, availability, and the next step without reducing a complex care decision to a generic lead form.',
    services: ['Skilled nursing', 'Short-term rehabilitation', 'Long-term nursing care', 'Post-acute care', 'Memory support', 'Specialty programs'],
    urgent: 'Many searches happen around hospital discharge, a rapid change in care needs, rehabilitation planning, or the need for longer-term skilled support.',
    planned: 'Families and referral professionals still need time to evaluate services, staffing, credentials, insurance or payment questions, location, availability, and admissions requirements.',
    proof: 'facility credentials, service definitions, staff expertise, therapy information, real environment photography, admissions guidance, visiting details, and accurate third-party information families can verify',
    qualification: 'required level of care, referral source, location, timing, payer or insurance context where appropriate, current setting, clinical documents needed for review, and the preferred admissions contact route',
    googleKeywords: ['nursing home near me', 'skilled nursing facility [location]', 'SNF near me', 'short-term rehabilitation facility', 'post-acute care [location]', 'long-term nursing care [location]'],
    googleNegatives: ['jobs', 'careers', 'CNA training', 'salary', 'school', 'definition', 'free', 'equipment'],
    facebookAngles: ['A clear explanation of skilled nursing services', 'Meet rehabilitation and admissions team members', 'What happens during an admissions review', 'Facility environment, therapy spaces, and daily support', 'Guidance for families preparing for a care transition'],
    conversion: 'qualified admissions calls, referral submissions, document reviews, tours, accepted admissions, completed admissions, payer mix where appropriate, and lost-admission reasons',
    referrals: 'hospital discharge planners, physicians, case managers, health systems, rehabilitation partners, senior-care professionals, and relevant community organizations',
    terminology: 'nursing homes, skilled nursing facilities and SNFs'
  }
];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function faqSchema(items) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
  })}</script>`;
}

function shell({ title, description, slug, faq = [], body }) {
  return `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | Alex Does Digital</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="https://alxdoesdigital.com/${slug}">
  <meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="https://alxdoesdigital.com/${slug}">
  <meta property="og:image" content="https://alxdoesdigital.com/images/alexpolo-copy.webp">
  <meta property="article:published_time" content="2026-10-06">
  ${faqSchema(faq)}
</head><body><main>${body}</main></body></html>\n`;
}

function channelCards(d, heading = `Explore the complete ${d.name.toLowerCase()} marketing cluster`, currentSlug = '') {
  const cards = [
    [d.google, 'Google Ads', `Google Ads for ${d.pluralLabel}`, 'Campaign structure, keywords, location controls, landing pages, policy considerations, and admissions tracking.', 'Read the Google Ads guide'],
    [d.facebook, 'Facebook Ads', `Facebook Ads for ${d.pluralLabel}`, 'Trust-building creative, local awareness, retargeting, enquiry paths, privacy, and downstream measurement.', 'Read the Facebook Ads guide'],
    [d.seo, 'SEO', `SEO for ${d.pluralLabel}`, 'Local visibility, service content, reviews, technical foundations, authority, and search experiences built around families.', 'Read the SEO guide']
  ].filter(([slug]) => slug !== currentSlug);
  return `<section class="cluster-navigation"><p class="eyebrow">One industry, three acquisition channels</p><h2>${heading}</h2><div class="topic-hub-grid">${cards.map(([slug, label, title, copy, action]) => `<a class="topic-hub-card" href="/${slug}"><span>${label}</span><h3>${title}</h3><p>${copy}</p><strong>${action} →</strong></a>`).join('')}</div></section>`;
}

function hubFaq(d) {
  return [
    [`What should a ${d.name.toLowerCase()} marketing strategy include?`, `A useful plan connects search visibility, paid media, referral relationships, trustworthy content, enquiry handling, and admissions measurement around the services and locations the organization can support.`],
    [`How should ${d.plural} measure marketing?`, `Measure ${d.conversion}. Website sessions and platform leads are diagnostic metrics, not the final business outcome.`],
    ['Should Google Ads, Facebook Ads and SEO use the same message?', 'They should share accurate facts and brand standards, but each channel serves a different stage of the decision. Search captures active demand, paid social builds familiarity, and SEO creates durable discovery and trust.'],
    ['How should care marketing address privacy?', 'Collect only information needed for the next step, explain how it will be used, protect access, obtain appropriate consent, and review the advertising, privacy, healthcare, and housing rules that apply in the market.']
  ];
}

function hubPage(d) {
  const faq = hubFaq(d);
  const body = renderIndustryHubBody(d, { booking: BOOKING, faq });
  return shell({ title: d.hubTitle, description: d.hubDescription, slug: d.slug, faq, body });
}

function guideFaq(d, channel) {
  const lead = channel === 'Google Ads' ? 'paid-search campaign' : 'Facebook and Instagram campaign';
  return [
    [`Can ${channel} work for ${d.plural}?`, `Yes, when the ${lead} reflects real services, geography, availability, policy requirements, a trustworthy conversion path, and an admissions team that records outcomes.`],
    ['What should count as a conversion?', `Start with meaningful steps such as ${d.conversion}. Use one set of definitions across advertising, analytics, and admissions.`],
    ['How quickly should enquiries receive a response?', 'Respond as quickly and consistently as the organization can sustain. Confirm receipt immediately, explain the next step, and route urgent or professional referrals appropriately.'],
    ['What claims should ads avoid?', 'Avoid unsupported superlatives, guaranteed outcomes, inaccurate availability, and wording that implies knowledge of a person’s health or other sensitive attributes. Review current platform and local rules before launch.']
  ];
}

function googleGuide(d) {
  const faq = guideFaq(d, 'Google Ads');
  const keywordRows = d.googleKeywords.map((keyword, index) => `<tr><td>${keyword}</td><td>${index < 2 ? 'High-intent local comparison' : index < 4 ? 'Service-specific research' : 'Location and care-level research'}</td><td>${index < 2 ? 'Call or enquiry page' : 'Relevant service or location page'}</td></tr>`).join('');
  const body = `<section class="intent-hero senior-care-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">Google Ads</span><h1>Google Ads for ${d.pluralLabel}</h1><p class="intent-lede">Capture active local demand with focused keywords, accurate service pages, responsible messaging, admissions tracking, and budgets tied to qualified outcomes.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#strategy">Read the strategy</a></div><div class="intent-proof intent-proof-list"><span>Search intent</span><span>Local coverage</span><span>Admissions outcomes</span></div></div><aside class="intent-callout"><p class="eyebrow">The central rule</p><h2>Do not treat every enquiry as an admission.</h2><p>Campaigns should connect searches to suitable services and measure the complete path from click to qualified admissions outcome.</p></aside></div></section>
<article class="container intent-article" id="strategy"><div class="intent-article-intro"><p>${d.region} This guide focuses on the search-to-enquiry path for ${d.terminology}.</p><p class="intent-byline">Written and reviewed by <a href="/about">Alex</a> · Updated ${UPDATED}</p></div>
<h2>Start With Services, Locations and Availability</h2><p>Document the services the organization wants to grow, the locations families can realistically consider, current capacity, admissions requirements, response hours, and commercial priorities. A broad campaign cannot fix unclear availability or a slow handoff.</p>
<h2>Structure Campaigns Around Search Intent</h2><p>Separate brand searches, general local searches, service-specific searches, and location campaigns. Keep distinct care levels in separate ad groups or campaigns so the ad and landing page answer the same need. Use call-focused paths only when trained staff can respond.</p>
<div class="intent-table-wrap"><table class="intent-table"><thead><tr><th>Example keyword</th><th>Likely intent</th><th>Best destination</th></tr></thead><tbody>${keywordRows}</tbody></table></div>
<h2>Build a Deliberate Negative Keyword List</h2><p>Review search terms before excluding queries. Common starting points may include ${d.googleNegatives.join(', ')}, but a word should be excluded only when it is genuinely irrelevant. Protect useful informational searches when the website has a helpful path from research to enquiry.</p>
<h2>Control Geography Carefully</h2><p>Target the actual catchment area, use presence-based location settings where appropriate, and review where enquiries originate. Families may search from outside the area on behalf of someone local, so interpret geography with the full decision journey rather than a rigid radius alone.</p>
<h2>Write Accurate, Respectful Ads</h2><p>Use clear service and location language, a realistic next step, and verifiable proof. Avoid fear-based copy, unsupported rankings, guaranteed outcomes, or wording that implies Google knows a person's medical condition. Review current Google Ads personalized advertising, healthcare, housing, privacy, and local regulatory requirements.</p>
<h2>Send Each Ad to the Closest Useful Page</h2><p>The landing page should explain the service, who it may suit, the location, environment, staff or credentials, admissions process, costs or payment context where appropriate, availability language, and next step. Show ${d.proof}.</p>
<h2>Track Calls and Forms Beyond the Platform</h2><p>Capture ${d.qualification}. Connect the enquiry source to ${d.conversion}. Use call recording or transcription only when lawful, disclosed, secured, and appropriate for the organization.</p>
<h2>Set a Budget From the Admissions Model</h2><p>Estimate search demand, expected click cost, landing-page conversion, qualification, progression, admission rate, capacity, and the value of an appropriate admission. There is no universal cost-per-lead benchmark that replaces the organization's own economics and service obligations.</p>
<h2>Optimize in the Right Order</h2><ol><li>Confirm conversion tracking and admissions outcomes.</li><li>Remove irrelevant searches and unsupported locations.</li><li>Improve the ad-to-page match.</li><li>Compare services, locations, schedules, and devices.</li><li>Adjust bids and budgets using qualified outcome data.</li></ol>
<h2>A Practical 90-Day Google Ads Plan</h2><div class="intent-timeline"><div><strong>Month 1</strong><p>Define services, keyword groups, negatives, locations, pages, policy review, and tracking.</p></div><div><strong>Month 2</strong><p>Launch narrowly, review search terms and calls, and repair the conversion path.</p></div><div><strong>Month 3</strong><p>Shift budget using qualified enquiries, tours or reviews, and admissions outcomes.</p></div></div>
${channelCards(d, `Continue the ${d.name.toLowerCase()} marketing plan`, d.google)}
<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>Google Ads for ${d.pluralLabel} FAQ</h2>${faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section></article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Build a measurable search program</p><h2>Need a clearer Google Ads plan for your ${d.name.toLowerCase()}?</h2><p>Review keywords, geography, pages, tracking, policy requirements, and admissions outcomes together.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/${d.slug}">View the marketing hub</a></div></div></div></section>`;
  return shell({ title: d.googleTitle, description: `Plan Google Ads for ${d.plural} with focused keywords, local targeting, trustworthy landing pages, policy-aware messaging, and qualified admissions tracking.`, slug: d.google, faq, body });
}

function facebookGuide(d) {
  const faq = guideFaq(d, 'Facebook Ads');
  const angles = d.facebookAngles.map((angle, index) => `<section class="intent-guide-step"><span>${String(index + 1).padStart(2, '0')}</span><div><h2>${angle}</h2><p>Use real, permissioned photography or video and plain-language context. Explain what the viewer is seeing, why it matters, and the most appropriate next step without making unsupported promises.</p></div></section>`).join('');
  const body = `<section class="intent-hero senior-care-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">Facebook Ads</span><h1>Facebook Ads for ${d.pluralLabel}</h1><p class="intent-lede">Build local familiarity and trust with responsible creative, helpful guidance, clear enquiry routes, and measurement connected to tours and admissions.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#strategy">Read the strategy</a></div><div class="intent-proof intent-proof-list"><span>Original creative</span><span>Responsible targeting</span><span>Qualified outcomes</span></div></div><aside class="intent-callout"><p class="eyebrow">Use paid social for the right job</p><h2>Build familiarity before asking for an enquiry.</h2><p>Families need context, evidence, and a low-pressure next step. The campaign should help them understand the organization rather than force a complex decision into one ad.</p></aside></div></section>
<article class="container intent-article" id="strategy"><div class="intent-article-intro"><p>${d.region} Facebook and Instagram can support awareness and consideration, but the campaign must respect sensitive decisions and applicable platform rules.</p><p class="intent-byline">Written and reviewed by <a href="/about">Alex</a> · Updated ${UPDATED}</p></div>
<h2>Choose an Objective That Matches the Decision Stage</h2><p>Use video or engagement to introduce the organization, traffic for useful guidance, and lead or conversion campaigns when the page and response process are ready. Retarget only when consent and applicable privacy rules support it. Do not treat cheap clicks as a commercial result.</p>
<h2>Use Original Creative That Families Can Verify</h2><p>Show ${d.proof}. Obtain appropriate permission for every identifiable person, protect resident dignity, and avoid staging scenes that misrepresent the environment or level of care.</p><div class="intent-guide-steps">${angles}</div>
<h2>Keep the Offer Useful and Low Pressure</h2><p>Appropriate next steps may include viewing a guide, requesting a brochure, attending an open event, speaking with admissions, checking availability, or arranging a visit. The offer should fit the audience's stage and make clear what happens after submission.</p>
<h2>Handle Sensitive Attributes and Housing Rules Carefully</h2><p>Do not write copy that asserts or implies a viewer's health condition, disability, family situation, or other sensitive personal attribute. Depending on the service and jurisdiction, housing, healthcare, privacy, and anti-discrimination rules may affect targeting and campaign setup. Review current Meta policies and obtain appropriate professional advice before launch.</p>
<h2>Use Broad Local Targeting Before Inventing Complex Audiences</h2><p>Start with the real catchment area and strong creative. Platform restrictions may limit audience controls for sensitive or housing-related campaigns. Retargeting, customer lists, and lookalike-style tools require careful consent, data governance, and policy review.</p>
<h2>Choose Between Instant Forms and Landing Pages</h2><p>Instant forms reduce friction, while landing pages provide more room for proof and explanation. Ask for ${d.qualification}. Avoid collecting unnecessary health information in an advertising form. Route sensitive or clinical details into a secure, appropriate process.</p>
<h2>Build a Reliable Follow-Up Workflow</h2><p>Confirm receipt, state who will respond, provide a realistic timeframe, and route enquiries to the right team. Track contact attempts and outcomes. A campaign will look inefficient when suitable enquiries are not answered or recorded consistently.</p>
<h2>Measure Tours and Admissions, Not Form Cost Alone</h2><p>Connect campaigns to ${d.conversion}. Compare creative and offers using qualified progression, not raw submissions. Record lost reasons so the team can distinguish marketing problems from capacity, service-fit, payment, timing, or follow-up constraints.</p>
<h2>A Practical 90-Day Facebook Ads Plan</h2><div class="intent-timeline"><div><strong>Month 1</strong><p>Complete policy and consent review, gather original creative, choose the offer, and define outcomes.</p></div><div><strong>Month 2</strong><p>Launch a focused local test and review creative quality, enquiries, and response weekly.</p></div><div><strong>Month 3</strong><p>Refresh creative and allocate spend using tours, reviews, admissions, and lost reasons.</p></div></div>
${channelCards(d, `Continue the ${d.name.toLowerCase()} marketing plan`, d.facebook)}
<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>Facebook Ads for ${d.pluralLabel} FAQ</h2>${faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section></article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Build responsible local awareness</p><h2>Need a clearer Facebook Ads plan for your ${d.name.toLowerCase()}?</h2><p>Review creative, targeting, consent, enquiry handling, and admissions measurement before increasing spend.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/${d.slug}">View the marketing hub</a></div></div></div></section>`;
  return shell({ title: `Facebook Ads for ${d.pluralLabel}: Build Trust and Enquiries`, description: `Use Facebook Ads for ${d.plural} with responsible creative, local awareness, privacy-conscious enquiry paths, policy review, and admissions measurement.`, slug: d.facebook, faq, body });
}

for (const cluster of clusters) {
  fs.writeFileSync(path.join(ROOT, `${cluster.slug}.html`), hubPage(cluster));
  fs.writeFileSync(path.join(ROOT, `${cluster.google}.html`), googleGuide(cluster));
  fs.writeFileSync(path.join(ROOT, `${cluster.facebook}.html`), facebookGuide(cluster));
}

console.log('Generated 2 senior-care marketing hubs and 4 paid-media guides');
