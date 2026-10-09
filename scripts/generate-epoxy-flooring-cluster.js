const fs = require('fs');
const path = require('path');
const { renderIndustryHubBody } = require('./lib/industry-hub-template');

const ROOT = path.resolve(__dirname, '..');
const BOOKING = 'https://cal.com/alexanderstefanseo/agency';
const UPDATED = 'October 2026';

const cluster = {
  slug: 'epoxy-flooring-leads',
  google: 'google-ads-for-epoxy-flooring',
  facebook: 'facebook-ads-for-flooring-companies',
  seo: 'seo-for-epoxy-flooring',
  name: 'Epoxy Flooring',
  plural: 'epoxy flooring companies',
  pluralLabel: 'Epoxy Flooring Companies',
  title: 'Epoxy Flooring Leads: A Complete Marketing System',
  description: 'Generate qualified epoxy flooring leads with Google Ads, Facebook Ads, local SEO, better project pages, lead qualification, follow-up, and booked-job tracking.',
  audience: 'Residential, commercial, industrial, garage-floor, concrete-coating, polyaspartic, and decorative flooring contractors',
  urgent: 'Some buyers need a damaged or unsafe floor repaired quickly.',
  planned: 'Others compare coating systems, colors, preparation methods, warranties, timelines, and contractors for weeks before requesting an estimate.',
  services: ['Garage floor coatings', 'Commercial epoxy floors', 'Industrial coatings', 'Polyaspartic systems', 'Metallic epoxy', 'Concrete preparation'],
  proof: 'Show real floors, surface preparation, coating systems, crew experience, project timelines, service areas, warranty terms, and what happens after an estimate request',
  hubCopy: {
    specialistLabel: 'Epoxy flooring lead generation and marketing',
    heroTitle: 'Epoxy Flooring Leads: A Complete Marketing System',
    heroLede: 'Connect high-intent searches, visual proof, local visibility, fast follow-up, and booked-job measurement in one acquisition system for floor-coating contractors.',
    proofLabels: ['Project-specific campaigns', 'Qualified estimate requests', 'Booked-job measurement'],
    journeyLabel: 'The flooring buyer journey',
    journeyTitle: 'Turn coating research into qualified estimates.',
    journeySteps: [['Discover', 'Search, maps, social proof and referrals'], ['Evaluate', 'Systems, preparation, photos and warranties'], ['Progress', 'Qualification, site visit, estimate and booking']],
    primaryGoal: 'Profitable flooring projects—not unqualified form volume.',
    measure: [['Demand', 'Relevant searches and local reach'], ['Leads', 'Calls, forms and estimate requests'], ['Estimates', 'Qualified and completed site visits'], ['Revenue', 'Booked jobs, margin and source']],
    problemEyebrow: 'Where flooring lead generation breaks',
    problemTitle: 'Generic contractor marketing hides the details buyers need.',
    problemLede: 'Epoxy and concrete coatings are visual, technical, local, and project-specific. Marketing works better when the ad, project page, estimate process, and sales follow-up explain the same system and set the same expectations.',
    failureTitle: 'Optimizing for cheap inquiries',
    failureItems: ['Broad targeting mixes homeowners, DIY research, jobs, suppliers, and unrelated flooring.', 'Stock photography gives buyers no proof of preparation quality or finished work.', 'Forms omit square footage, location, floor condition, use, and timing.', 'Reporting stops at calls and forms instead of estimates and booked projects.'],
    successTitle: 'Optimizing for profitable projects',
    successItems: ['Campaigns separate garage, commercial, industrial, and decorative intent.', 'Pages show real preparation, systems, finishes, timelines, and service areas.', 'Qualification gives the estimator useful project context before the first call.', 'Marketing is reviewed against completed estimates, wins, revenue, and margin.'],
    systemLede: 'Google Ads captures active demand, Facebook and Instagram show visual transformations, and SEO builds durable local discovery. Each channel should feed the same qualification, estimate, and sales process.',
    pillars: {
      google: ['Capture active project demand', 'Google Ads for Epoxy Flooring', 'Reach buyers searching for garage floor coatings, commercial epoxy, concrete coatings, and installers in your service area.', ['Service-led keywords and negatives', 'Dedicated coating and project pages', 'Estimate and booked-job tracking']],
      facebook: ['Create demand with visual proof', 'Facebook Ads for Flooring Companies', 'Use real before-and-after work, process videos, clear offers, and local targeting to create qualified flooring conversations.', ['Original project creative', 'Useful offers and retargeting', 'Fast estimate follow-up']],
      seo: ['Build durable local visibility', 'SEO for Epoxy Flooring', 'Earn visibility with Google Business Profile, service pages, project galleries, location relevance, reviews, and technically sound content.', ['Local and service-page SEO', 'Project proof and review signals', 'Search and AI visibility foundations']]
    },
    clarityEyebrow: 'Start with project and margin clarity',
    clarityTitle: 'Define the flooring work you actually want to win.',
    clarityIntro: 'Epoxy flooring companies should not market every coating, property type, and project size as though they have the same economics. Residential garage floors, commercial kitchens, warehouses, showrooms, and decorative systems have different buyers and sales journeys.',
    clarityFollowup: 'Document service areas, minimum project size, target property types, coating systems, capacity, seasonality, estimate ownership, close rates, average job value, and gross-margin goals before increasing traffic.',
    marketNote: '<p class="eyebrow">Use accurate coating language</p><h3>Epoxy flooring, polyaspartic or concrete coating?</h3><p>Buyers often use <strong>epoxy flooring</strong> as a broad category, while contractors may recommend epoxy, polyurea, polyaspartic, urethane, or another system based on the slab and use.</p><p>Target the terms people search, then explain the actual system accurately. Do not present every coating as interchangeable.</p>',
    scoreEyebrow: 'The flooring acquisition scorecard',
    scoreTitle: 'Measure the job—not a cheap cost per lead.',
    scoreLede: 'Use consistent definitions across advertising, analytics, the CRM, estimating, and sales. The useful benchmark is profitable booked work within the company’s service mix and capacity.',
    scoreRows: [['Demand', 'Query, service, location, page and campaign', 'Are we attracting the right flooring project?'], ['Lead', 'Property, floor use, condition, square footage, timing and source', 'Is this worth a sales conversation?'], ['Estimate', 'Qualified, scheduled, completed, quoted value and lost reason', 'Does marketing create real opportunities?'], ['Booked job', 'Revenue, margin, coating system, source and sales cycle', 'Which activity produces profitable work?']],
    trustTitle: 'Show the work buyers cannot judge from a generic claim.',
    trustIntro: 'Use original photos and videos to show the existing slab, preparation equipment, crack repair, edge work, coating stages, texture, finished floor, and real environment. Explain what is and is not included.',
    trustFollowup: 'Add project location, floor use, system, square footage where appropriate, timeline, maintenance guidance, warranty terms, and a named reviewer. Useful detail helps search engines, AI systems, and buyers understand why the result is credible.',
    trustItems: [['Real projects', 'Original before, process, and finished-floor media.'], ['Clear systems', 'Where each coating is appropriate and why.'], ['Visible process', 'Preparation, repair, application, cure time, and handoff.'], ['Practical estimate', 'What buyers should send and what happens next.']],
    roadmap: [['Days 1–30 · Foundations', 'Define services, markets, economics, qualification, tracking, priority pages, and follow-up ownership.'], ['Days 31–60 · Demand', 'Improve the highest-intent channel and connect every inquiry to an estimate workflow.'], ['Days 61–90 · Expansion', 'Add the next justified channel and allocate effort using completed estimates, wins, revenue, and margin.']],
    responsibilityEyebrow: 'Credible contractor marketing',
    responsibilityTitle: 'Make claims buyers can verify.',
    responsibilityParagraphs: ['Use original, permissioned project media and describe coating systems, slip resistance, durability, cure times, warranties, and maintenance accurately. Avoid universal lifespan claims or promises that ignore slab condition, preparation, environment, and use.', 'Ask only for project information needed for the next step, explain how it will be used, protect form and CRM access, and keep consent and communication practices aligned with applicable laws and platform rules.'],
    ctaEyebrow: 'Direct epoxy flooring growth review',
    ctaTitle: 'Build a lead system your estimators can turn into profitable projects.',
    ctaCopy: 'Review positioning, local demand, paid media, SEO, project proof, qualification, follow-up, and booked-job measurement with Alex.'
  }
};

function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function faqSchema(items) { return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) })}</script>`; }
function shell({ title, description, slug, faq, body }) { return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)} | Alex Does Digital</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="https://alxdoesdigital.com/${slug}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="https://alxdoesdigital.com/${slug}"><meta property="og:image" content="https://alxdoesdigital.com/images/alexpolo-copy.webp"><meta property="article:published_time" content="2026-10-09">${faqSchema(faq)}</head><body><main>${body}</main></body></html>\n`; }
function details(items) { return items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join(''); }

const hubFaq = [
  ['How do epoxy flooring companies generate leads?', 'Define the projects and service area you want, show credible project proof, capture high-intent searches, build local visibility, qualify inquiries quickly, and track estimates and booked jobs instead of forms alone.'],
  ['Which channel works best for epoxy flooring leads?', 'Google Ads can capture immediate search demand, Facebook and Instagram can create demand with visual transformations, and SEO can build durable local visibility. The best starting channel depends on demand, market, website, proof, budget, and follow-up capacity.'],
  ['What information should an epoxy flooring lead form collect?', 'Ask for location, property type, floor use, approximate size, current condition, desired timing, and a way to share photos. Keep the form short enough to complete and collect more detail during follow-up.'],
  ['What should epoxy flooring marketing measure?', 'Measure relevant demand, qualified leads, scheduled and completed estimates, quoted value, close rate, booked revenue, gross margin, sales-cycle length, and lost reasons by source.']
];

const guideData = {
  google: {
    slug: cluster.google,
    category: 'Google Ads',
    title: 'Google Ads for Epoxy Flooring Companies',
    description: 'Run Google Ads for epoxy flooring with service-specific keywords, negative keywords, local targeting, project landing pages, qualification, and booked-job tracking.',
    lede: 'Capture active demand for garage floor coatings, commercial epoxy, concrete coatings, and local installers with a campaign built around qualified estimates and profitable jobs.',
    rule: 'Match each search to the closest coating service and project page.',
    sections: [
      ['Define the Projects and Service Area You Want', '<p>Start with the company’s profitable services, minimum job size, travel limits, capacity, and strongest proof. Separate residential garage floors from commercial and industrial projects when their buyers, keywords, estimate process, and economics differ.</p><p>Do not scale traffic before the team agrees on what qualifies, who responds, how quickly contact happens, and how outcomes are recorded.</p>'],
      ['Best Google Ads Keywords for Epoxy Flooring', '<p>Build tightly themed groups around real services rather than one broad flooring campaign. Useful starting themes include:</p><ul><li>epoxy flooring company and epoxy flooring contractor</li><li>garage floor epoxy and garage floor coating</li><li>commercial epoxy flooring and industrial floor coatings</li><li>concrete coating contractor and concrete floor coating</li><li>polyaspartic garage floor coating</li><li>epoxy flooring near me and local service variants</li></ul><p>Use phrase and exact match as controlled starting points, review actual search terms, and expand only when new queries produce suitable estimates.</p>'],
      ['Use a Real Negative Keyword Strategy', '<p>Common negatives may include DIY, kit, supplies, resin, paint, Home Depot, Lowe’s, jobs, salary, training, course, wholesale, manufacturer, repair kit, art, table, countertop, and unrelated flooring types. Review context before excluding terms because a word such as “cost” can still signal a serious buyer.</p>'],
      ['Build Campaigns by Service and Intent', '<p>Separate brand, garage floor, residential decorative, commercial, industrial, and location-led searches. Give the highest-value services their own budgets, ads, pages, and qualification rules. Use location settings based on where the customer is, not merely where someone has shown interest.</p>'],
      ['Write Ads That Set the Right Expectation', '<p>Name the coating service, property type, service area, and next step. Strong copy can mention professional surface preparation, real project photos, on-site estimates, available finishes, or an accurately described warranty. Avoid unsupported “lifetime” claims, universal durability promises, and countdown pressure that the company cannot honor.</p>'],
      ['Create Landing Pages for Flooring Projects', '<p>Send each ad group to a page that explains the relevant system, ideal applications, preparation process, options, timeline, cure or return-to-service expectations, project photos, service area, FAQs, and estimate process. A generic homepage forces the buyer to reconstruct the answer and usually weakens qualification.</p>'],
      ['Track Estimates and Booked Jobs', '<p>Track calls, forms, photo uploads, booked estimates, completed estimates, quoted value, wins, revenue, margin, and lost reasons. Import offline outcomes where the advertising setup and privacy process support it. Search terms that generate forms but no completed estimates should not control the budget.</p>'],
      ['A Practical 90-Day Google Ads Plan', '<div class="intent-timeline"><div><strong>Month 1</strong><p>Define services, economics, keywords, negatives, geography, pages, qualification, and tracking.</p></div><div><strong>Month 2</strong><p>Launch focused campaigns and review search terms, calls, response time, and estimate quality every week.</p></div><div><strong>Month 3</strong><p>Shift spend using completed estimates, quoted value, wins, revenue, margin, and lost reasons.</p></div></div>']
    ]
  },
  facebook: {
    slug: cluster.facebook,
    category: 'Facebook Ads',
    title: 'Facebook Ads for Flooring Companies',
    description: 'Use Facebook Ads for flooring companies with original project creative, local offers, responsible targeting, qualification, retargeting, and booked-job tracking.',
    lede: 'Turn visual floor transformations into qualified local inquiries with original creative, a clear project offer, useful qualification, fast follow-up, and estimate tracking.',
    rule: 'Use real flooring projects to earn attention and set accurate expectations.',
    sections: [
      ['Why Facebook Ads Work for Visual Flooring Services', '<p>Most buyers do not think about coatings every day. A strong before-and-after, preparation video, finish comparison, or local project walkthrough can create demand before someone searches. The creative must show work the company actually completed and explain the project context.</p>'],
      ['Build Offers Around the Buyer’s Next Decision', '<p>Useful offers include an on-site estimate, a photo-based project review, a garage-floor planning guide, a finish consultation, or a clear seasonal installation window. A discount is not automatically persuasive if the buyer still cannot judge preparation, system quality, or contractor credibility.</p>'],
      ['Create Flooring Ads from Real Projects', '<p>Capture the original slab, grinding or preparation, repairs, broadcast or decorative stage, edge details, finished floor, and final walkthrough. Add the property type, system, general location, timeline, and maintenance context. One project can become a short video, carousel, still ad, story, FAQ, and retargeting sequence.</p>'],
      ['Target the Market Without Overcomplicating It', '<p>Begin with the actual service area, sensible age and homeowner signals where platform rules allow, and broad enough audiences for delivery. Separate residential and commercial offers because the decision-makers and sales cycles differ. Retarget engaged visitors and video viewers only when consent, privacy, and platform settings support it.</p>'],
      ['Qualify Leads Before the Estimate', '<p>Ask for location, property type, floor use, approximate square footage, current condition, desired timing, and photos where practical. Use conditional questions carefully: the goal is to improve the first conversation, not create a form so long that serious buyers abandon it.</p>'],
      ['Follow Up While the Project Is Fresh', '<p>Confirm receipt immediately, explain who will contact the buyer, and make the first human attempt quickly during business hours. Use a short sequence across the channels the prospect agreed to, then record contact, qualification, appointment, estimate, and lost reason.</p>'],
      ['Measure Booked Flooring Work', '<p>Evaluate creative and audiences using qualified leads, scheduled and completed estimates, quoted value, close rate, booked revenue, and margin. Cheap forms from outside the service area or below the project minimum are not a win.</p>'],
      ['A Practical 90-Day Facebook Ads Plan', '<div class="intent-timeline"><div><strong>Month 1</strong><p>Organize project media, choose the service and offer, build qualification, tracking, and follow-up.</p></div><div><strong>Month 2</strong><p>Test distinct hooks, formats, and proof while reviewing estimate quality every week.</p></div><div><strong>Month 3</strong><p>Refresh creative and allocate spend using completed estimates, wins, revenue, and margin.</p></div></div>']
    ]
  },
  seo: {
    slug: cluster.seo,
    category: 'SEO',
    title: 'SEO for Epoxy Flooring Companies',
    description: 'Improve SEO for epoxy flooring companies with Google Business Profile, service pages, project galleries, local content, reviews, technical SEO, and AI search visibility.',
    lede: 'Build durable local visibility for epoxy flooring, garage floor coatings, commercial projects, and concrete-coating searches with useful pages and verifiable project proof.',
    rule: 'Make each service, market, and project understandable to buyers and search systems.',
    sections: [
      ['Build an Epoxy Flooring Keyword Map', '<p>Organize keywords by service, property type, location, and decision stage. Core themes may include epoxy flooring, garage floor coating, concrete coating, commercial epoxy, industrial floor coating, metallic epoxy, polyaspartic coating, cost, durability, maintenance, and local installer terms.</p><p>Assign one primary page to each intent cluster so multiple pages do not compete for the same search.</p>'],
      ['Create Service Pages with Technical Clarity', '<p>Give major services a dedicated page when the buyer, application, process, and project proof differ. Explain ideal uses, slab preparation, repair, system layers, finish options, cure time, maintenance, limitations, warranty terms, service areas, and the estimate process. Write for an informed buyer rather than repeating the keyword.</p>'],
      ['Improve Local SEO for Epoxy Flooring Companies', '<p>Complete the Google Business Profile with accurate categories, services, hours, service areas, appointment details, and original media. Keep business information consistent across trusted directories. Ask customers for honest reviews after completed work and respond without inserting canned keyword lists.</p>'],
      ['Turn Every Strong Project into Searchable Proof', '<p>Create useful project pages for distinct services and markets. Include the original condition, property type, problem, preparation, coating system, finish, timeline, general location, photos, and outcome. Avoid publishing thin pages that differ only by a city name.</p>'],
      ['Build Location Relevance Without Doorway Pages', '<p>A service-area page should contain evidence that the company works in that market: relevant projects, travel or scheduling details, local conditions where useful, testimonials, and the services actually offered there. Consolidate overlapping pages instead of creating dozens of near-duplicates.</p>'],
      ['Strengthen Technical SEO and Image Search', '<p>Use descriptive titles, one clear H1, logical headings, clean canonicals, crawlable links, fast pages, structured data, and a complete sitemap. Compress project images, use modern formats, add dimensions and descriptive alt text, and lazy-load media below the fold. Keep the most important finished-floor image fast and prominent.</p>'],
      ['Design Content for Search and AI Answers', '<p>Answer specific questions about preparation, moisture, coating differences, slip resistance, cure time, lifespan variables, cleaning, warranties, and project costs in clear sections. Add named authors or reviewers, update dates, first-hand project evidence, and concise answers that AI systems can quote without losing important context.</p>'],
      ['Measure SEO by Qualified Projects', '<p>Track non-brand visibility, Google Business Profile actions, service-page visits, relevant calls and forms, completed estimates, booked jobs, revenue, and lost reasons. Rankings matter only when the right local buyers reach a useful page and take the next step.</p>'],
      ['A Practical 90-Day SEO Plan', '<div class="intent-timeline"><div><strong>Month 1</strong><p>Audit technical issues, services, locations, project proof, local signals, internal links, and measurement.</p></div><div><strong>Month 2</strong><p>Improve the primary service pages, Google Business Profile, review process, and strongest project pages.</p></div><div><strong>Month 3</strong><p>Publish the highest-value location and decision content, then build legitimate local and trade authority.</p></div></div>']
    ]
  }
};

function guideFaq(channel) {
  return [
    [`Can ${channel} generate epoxy flooring leads?`, `Yes, when the campaign targets relevant local project intent, uses real proof, qualifies inquiries, follows up quickly, and measures completed estimates and booked jobs instead of initial leads alone.`],
    ['What counts as a qualified epoxy flooring lead?', 'A useful definition can include service area, property type, floor use, approximate size, slab condition, desired system, timeline, project minimum, and willingness to complete the estimate process.'],
    ['Should epoxy and polyaspartic be marketed on the same page?', 'They can share a category page, but substantial services deserve clear sections or dedicated pages when buyer intent, application, process, and proof differ. Explain the recommended system accurately rather than treating every coating as identical.'],
    ['What should be measured after a lead arrives?', 'Track contact, qualification, scheduled and completed estimates, quoted value, close rate, booked revenue, margin, sales-cycle length, and lost reasons by source.']
  ];
}

function clusterCards(current) {
  const cards = [
    [cluster.google, 'Google Ads', 'Google Ads for Epoxy Flooring', 'Keywords, negatives, local targeting, landing pages, qualification, and booked-job tracking.'],
    [cluster.facebook, 'Facebook Ads', 'Facebook Ads for Flooring Companies', 'Original project creative, offers, local targeting, lead qualification, retargeting, and follow-up.'],
    [cluster.seo, 'SEO', 'SEO for Epoxy Flooring', 'Local SEO, service pages, project proof, reviews, technical foundations, and AI visibility.']
  ].filter(([slug]) => slug !== current);
  return `<section class="cluster-navigation"><p class="eyebrow">Epoxy flooring marketing cluster</p><h2>Continue with the most relevant next step</h2><div class="topic-hub-grid">${cards.map(([slug, label, title, copy]) => `<a class="topic-hub-card" href="/${slug}"><span>${label}</span><h3>${title}</h3><p>${copy}</p><strong>Explore this page →</strong></a>`).join('')}</div></section>`;
}

function guidePage(data) {
  const faq = guideFaq(data.category);
  const anchor = `${data.category.toLowerCase().replace(/[^a-z]+/g, '-')}-strategy`;
  const body = `<section class="intent-hero senior-care-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">${data.category}</span><h1>${data.title}</h1><p class="intent-lede">${data.lede}</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#${anchor}">Read the strategy</a></div><div class="intent-proof intent-proof-list"><span>Same-industry strategy</span><span>Qualified estimates</span><span>Booked-job measurement</span></div></div><aside class="intent-callout"><p class="eyebrow">The central rule</p><h2>${data.rule}</h2><p>Strong flooring marketing connects accurate project intent to real proof, a useful estimate process, disciplined follow-up, and an outcome the company can verify.</p></aside></div></section><article class="container intent-article" id="${anchor}"><div class="intent-article-intro"><p>${data.lede}</p><p class="intent-byline">Written and reviewed by <a href="/about">Alex</a> · Updated ${UPDATED}</p></div>${data.sections.map(([heading, html]) => `<h2>${heading}</h2>${html}`).join('')}${clusterCards(data.slug)}<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>${data.title} FAQ</h2>${details(faq)}</section></article><section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Build a measurable flooring acquisition system</p><h2>Want a stronger ${data.category} plan for your flooring company?</h2><p>Review services, demand, project proof, qualification, follow-up, estimates, and booked-job measurement together.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/${cluster.slug}">View the industry hub</a></div></div></div></section>`;
  return shell({ title: data.title, description: data.description, slug: data.slug, faq, body });
}

fs.writeFileSync(path.join(ROOT, `${cluster.slug}.html`), shell({ title: cluster.title, description: cluster.description, slug: cluster.slug, faq: hubFaq, body: renderIndustryHubBody(cluster, { booking: BOOKING, faq: hubFaq }) }));
Object.values(guideData).forEach(data => fs.writeFileSync(path.join(ROOT, `${data.slug}.html`), guidePage(data)));
console.log('Generated epoxy flooring hub and 3 channel guides');
