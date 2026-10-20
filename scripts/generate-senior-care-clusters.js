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
    audience: 'operators marketing residential accommodation with personal care, including respite and dementia support where actually provided',
    region: 'The focus here is residential personal care and the family enquiry-to-visit journey. Care home is an umbrella term in UK usage and can include nursing. Assisted living and retirement housing are distinct settings, not alternative names for the same service.',
    hubTitle: 'Care Home Marketing: Build Trust, Enquiries and Occupancy',
    googleTitle: 'Google Ads for Care Homes: Generate Qualified Enquiries',
    hubDescription: 'A complete care home marketing strategy covering Google Ads, Facebook Ads, local SEO, family trust, referral relationships, enquiry tracking, tours, and occupancy.',
    lede: 'Build a measurable marketing system that helps families understand the community, arrange a conversation or tour, and make a confident care decision.',
    services: ['Residential personal care', 'Permanent residential stays', 'Respite stays where offered', 'Dementia support where offered'],
    urgent: 'Families may need an answer quickly after a health change, hospital stay, caregiver burnout, or a sudden change in living circumstances.',
    planned: 'Other families research for weeks or months, comparing location, care approach, staff, activities, accommodation, costs, and availability.',
    proof: 'real rooms and shared spaces, staff introductions, activity schedules, inspection or regulator information, family guidance, transparent contact details, and an accurate explanation of care options',
    qualification: 'location, type of care, timing, current living situation, funding route where appropriate, preferred contact method, and whether the family wants a call, brochure, visit, or assessment',
    googleKeywords: ['care home near me', 'residential care home [location]', 'dementia care home [location]', 'respite care home', 'assisted living [location]', 'senior living community [location]'],
    googleNegatives: ['jobs', 'careers', 'salary', 'training', 'course', 'definition', 'free', 'DIY'],
    facebookAngles: ['A calm walkthrough of the community', 'Meet the people who provide day-to-day care', 'What families can expect during an initial visit', 'Activities, dining, rooms, and shared spaces', 'A practical guide to choosing the right care setting'],
    conversion: 'qualified enquiries, conversations, assessments, tours, applications, move-ins, occupancy contribution, and the reasons families do not progress',
    referrals: 'local clinicians, social workers, discharge teams, community groups, charities, professional advisers, and relevant local partners',
    terminology: 'residential care homes and their actual personal-care services',
    hubCopy: {
      specialistLabel: 'Residential care home marketing',
      heroTitle: 'Care Home Marketing That Builds Family Trust and Suitable Enquiries',
      heroLede: 'Help families understand residential personal care, arrange a visit and take the next assessment step. Connect local search, honest home-specific creative and reliable enquiry follow-up.',
      clarityTitle: 'Market the care provided—not a collection of senior-living labels.',
      clarityFollowup: 'Separate permanent residential stays from respite when availability and assessment differ. Dementia support describes a provision that must be explained; it does not by itself establish whether a home offers nursing. Mixed-service operators should give nursing provision its own pages and response route.',
      marketNote: '<p class="eyebrow">Service type comes before geography</p><h3>Care home is not one fixed care level.</h3><p>In UK usage, care homes include residential and nursing homes. This hub focuses on residential personal care. Assisted living has its own housing and support model; retirement housing does not automatically include personal or nursing care. Senior living is a broad category, not a clinical service.</p><p>For nursing provision, see the <a href="/nursing-home-marketing">nursing home marketing hub</a>. Use the <a href="https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/care-homes/">NHS care-home definitions</a> as a UK reference, then verify local terms.</p>',
      primaryGoal: 'Reachable families seeking support the home can provide—not every senior-housing enquiry.',
      problemTitle: 'A family visit journey needs clear care boundaries.',
      problemLede: 'Families need to understand daily support, the home environment and the assessment process. A residential-care campaign should not attract nursing or independent-housing enquiries through vague promises.',
      successTitle: 'Optimizing for suitable residential enquiries',
      scoreTitle: 'Track the steps from family enquiry to a suitable move-in.',
      scoreLede: 'Separate permanent and respite pathways. Record conversations, completed visits, suitability assessments and move-ins, with reasons such as unsupported care, unavailable rooms or timing. Raw enquiry volume hides those differences.',
      trustFollowup: 'Useful residential-care content explains first visits, settling in, meals, daily choices, staff roles, fee discussions and what an assessment involves. Keep independent housing and nursing-service claims separate, and have staff verify the care described.',
      ctaTitle: 'Build a clearer path from family enquiry to a care-home visit.',
      ctaCopy: 'Review your residential offer, local visibility, creative and enquiry follow-up with Alex.'
    }
  },
  {
    slug: 'nursing-home-marketing',
    google: 'google-ads-for-nursing-homes',
    facebook: 'facebook-ads-for-nursing-homes',
    seo: 'seo-for-nursing-homes',
    name: 'Nursing Home',
    plural: 'nursing homes',
    pluralLabel: 'Nursing Homes',
    audience: 'facilities providing nursing care, with separate long-term and short-stay services where available, including US skilled nursing facilities where that designation applies',
    region: 'Nursing home is used in several countries. SNF is a specific US term, not a universal label for nursing homes, rehabilitation or Canadian long-term care. Match the marketing to verified services and the local admissions process.',
    hubTitle: 'Nursing Home Marketing: Generate Qualified Admissions',
    googleTitle: 'Google Ads for Nursing Homes: A Responsible Admissions Strategy',
    hubDescription: 'A complete nursing home marketing strategy for skilled nursing facilities and SNFs, including Google Ads, Facebook Ads, SEO, referral relationships, admissions tracking, and trust.',
    lede: 'Help families and professional referral sources understand clinical services, admissions, availability, and the next step without reducing a complex care decision to a generic lead form.',
    services: ['Long-term nursing care', 'US skilled nursing where applicable', 'Short-stay rehabilitation where offered', 'Verified specialty nursing services'],
    urgent: 'Many searches happen around hospital discharge, a rapid change in care needs, rehabilitation planning, or the need for longer-term skilled support.',
    planned: 'Families and referral professionals still need time to evaluate services, staffing, credentials, insurance or payment questions, location, availability, and admissions requirements.',
    proof: 'facility credentials, service definitions, staff expertise, therapy information, real environment photography, admissions guidance, visiting details, and accurate third-party information families can verify',
    qualification: 'required level of care, referral source, location, timing, payer or insurance context where appropriate, current setting, clinical documents needed for review, and the preferred admissions contact route',
    googleKeywords: ['nursing home near me', 'skilled nursing facility [location]', 'SNF near me', 'short-term rehabilitation facility', 'post-acute care [location]', 'long-term nursing care [location]'],
    googleNegatives: ['jobs', 'careers', 'CNA training', 'salary', 'school', 'definition', 'free', 'equipment'],
    facebookAngles: ['A clear explanation of skilled nursing services', 'Meet rehabilitation and admissions team members', 'What happens during an admissions review', 'Facility environment, therapy spaces, and daily support', 'Guidance for families preparing for a care transition'],
    conversion: 'qualified admissions calls, referral submissions, document reviews, tours, accepted admissions, completed admissions, payer mix where appropriate, and lost-admission reasons',
    referrals: 'hospital discharge planners, physicians, case managers, health systems, rehabilitation partners, senior-care professionals, and relevant community organizations',
    terminology: 'nursing provision and, where applicable, US skilled nursing facilities',
    hubCopy: {
      specialistLabel: 'Nursing-service and admissions marketing',
      heroTitle: 'Nursing Home Marketing Built Around Services, Referrals and Admissions',
      heroLede: 'Help families and referral professionals understand verified nursing services. Keep long-term nursing and short-stay skilled pathways distinct, from first contact through review and admission.',
      clarityTitle: 'Separate nursing-service pathways before choosing campaigns.',
      clarityFollowup: 'Do not describe every rehabilitation program as skilled nursing or every long-term care home as a US SNF. Identify actual nursing and therapy provision, review responsibilities, capacity and payment-verification steps. Separate professional referrals from initial family contacts.',
      marketNote: '<p class="eyebrow">Care level, then local terminology</p><h3>Nursing home and SNF are not universal synonyms.</h3><p>Nursing home is used in several countries. A US skilled nursing facility has a specific service and certification context; Medicare coverage is conditional, not a promise attached to the name. Canadian long-term care and UK nursing services follow their own systems.</p><p>For residential personal-care enquiries and visits, use the <a href="/care-home-marketing">care home marketing hub</a>. For US coverage language, consult <a href="https://www.medicare.gov/coverage/skilled-nursing-facility-care">Medicare’s SNF guidance</a>.</p>',
      problemTitle: 'Clinical service fit matters more than a cheap enquiry.',
      problemLede: 'A nursing-service campaign must explain what the facility provides and who reviews a referral. Retirement lifestyle messaging cannot replace capability information, and an enquiry does not establish clinical acceptance.',
      primaryGoal: 'Appropriate admissions contacts and referrals—not implied eligibility or guaranteed placement.',
      scoreTitle: 'Measure referral review and admissions by service pathway.',
      scoreLede: 'Separate family contacts, professional referrals, short-stay care and long-term nursing. Keep clinical and financial details inside approved operational systems; external marketing reports should contain only permitted, necessary data.',
      trustFollowup: 'Explain verified nursing and therapy capabilities, clinical review, the secure referral route, visiting and family communication. Have qualified staff review service claims. Do not promise recovery, automatic coverage or acceptance.',
      ctaTitle: 'Connect nursing-service demand to the right admissions pathway.',
      ctaCopy: 'Review your service definitions, search campaigns, family education and referral handoff with Alex.'
    }
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
  <meta property="article:published_time" content="2026-10-06"><meta property="article:modified_time" content="2026-10-20">
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
    [d.slug === 'care-home-marketing' ? 'Does care home mean residential care only?' : 'Is every nursing home a skilled nursing facility?', d.slug === 'care-home-marketing' ? 'No. In UK usage, care home can include residential and nursing homes. This marketing hub focuses on residential personal care and family visits. Nursing provision needs its own accurate service information and admissions route.' : 'No. Nursing home is used in several countries, while SNF is a specific US designation. Describe the services and certifications the facility actually has; do not transfer US funding language to other markets.'],
    [d.slug === 'care-home-marketing' ? 'Are assisted living and retirement housing the same offer?' : 'Should short-stay and long-term nursing share one campaign?', d.slug === 'care-home-marketing' ? 'No. Their housing, support and admission models can differ. Retirement housing does not automatically include personal or nursing care. Explain each real offer separately rather than using these labels as synonyms.' : 'Not by default. They can involve different services, referral steps, timelines and payment questions. Separate the messages and reporting when those pathways differ at the facility.'],
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

function channelGuide(d, channel) {
  const content = require('./lib/senior-care-guide-content');
  const kind = d.slug === 'care-home-marketing' ? 'care' : 'nursing';
  const c = content[kind + '-' + channel];
  const label = channel === 'google' ? 'Google Ads' : 'Facebook Ads';
  const sibling = channel === 'google' ? 'facebook' : 'google';
  const siblingLabel = sibling === 'google' ? 'Google Ads' : 'Facebook Ads';
  const scopeLink = kind === 'care'
    ? '<p>For campaigns promoting nursing provision rather than residential personal care, use the <a href="/nursing-home-marketing">nursing home and skilled nursing marketing hub</a>. A mixed-service operator may need both approaches, on clearly separated service pages.</p>'
    : '<p>For residential personal-care enquiries and family visits, use the <a href="/care-home-marketing">residential care home marketing hub</a>. Assisted living and retirement housing need their own accurate service descriptions, not a nursing label.</p>';
  const policyLink = channel === 'google'
    ? '<a href="https://support.google.com/adspolicy/answer/143465">Google’s restricted-targeting policy</a>'
    : '<a href="https://transparency.meta.com/policies/ad-standards/">Meta Advertising Standards</a>';
  const body = `<section class="intent-hero senior-care-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">${label}</span><h1>${label} for ${d.pluralLabel}</h1><p class="intent-lede">${c.lede}</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#strategy">Read the strategy</a></div></div><aside class="intent-callout"><p class="eyebrow">Campaign focus</p><h2>${c.rule}</h2><p>${c.ruleCopy}</p></aside></div></section>
<article class="container intent-article" id="strategy"><div class="intent-article-intro"><p>${c.intro}</p>${scopeLink}<p class="intent-byline">Written and reviewed by <a href="/about">Alex</a> · Updated ${UPDATED}</p></div>
${c.sections.map(([heading, html]) => `<section class="intent-guide-section"><h2>${heading}</h2>${html}</section>`).join('\n')}
<p>Connect this campaign to your <a href="/${d.slug}">${d.name.toLowerCase()} marketing plan</a>. For the other channels in that plan, see <a href="/${d[sibling]}">${siblingLabel} for ${d.plural}</a> and <a href="/${d.seo}">SEO for ${d.plural}</a>.</p>
<section class="intent-guide-section"><h2>Check Service Definitions and Current Platform Rules</h2><p>The <a href="https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/care-homes/">NHS explanation of residential and nursing homes</a> shows why care home is not a synonym for one care level. Check ${policyLink} for the actual advertised service and market. These marketing examples do not determine care eligibility or legal compliance.</p></section>
<section class="intent-faq"><h2>${label} for ${d.pluralLabel} FAQ</h2>${c.faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section></article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Direct support from Alex</p><h2>${c.cta}</h2><p>${c.ctaCopy}</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/${d.slug}">View the marketing hub</a></div></div></div></section>`;
  return shell({ title: c.title, description: c.description, slug: d[channel], faq: c.faq, body });
}

for (const cluster of clusters) {
  fs.writeFileSync(path.join(ROOT, `${cluster.slug}.html`), hubPage(cluster));
  fs.writeFileSync(path.join(ROOT, `${cluster.google}.html`), channelGuide(cluster, 'google'));
  fs.writeFileSync(path.join(ROOT, `${cluster.facebook}.html`), channelGuide(cluster, 'facebook'));
}

console.log('Generated 2 senior-care marketing hubs and 4 paid-media guides');
