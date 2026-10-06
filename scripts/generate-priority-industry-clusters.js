const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BOOKING = 'https://cal.com/alexanderstefanseo/agency';

const industries = [
  {
    slug: 'hvac-leads', key: 'hvac-companies', name: 'HVAC', noun: 'HVAC company',
    title: 'HVAC Leads: How to Get More HVAC Service Calls',
    description: 'Generate HVAC leads for repairs, replacements, installations, and maintenance plans with paid search, paid social, local SEO, and better follow-up.',
    services: ['Emergency AC repair', 'Heating and furnace repair', 'System replacement', 'Heat pumps', 'Indoor air quality', 'Maintenance plans'],
    urgent: 'no cooling, no heat, leaking systems, strange noises, and equipment failures',
    planned: 'system replacements, heat pumps, indoor-air-quality upgrades, and maintenance plans',
    qualify: 'system type, equipment age, symptoms, property type, location, ownership, financing needs, and preferred timing',
    proof: 'licensed technicians, equipment brands, financing, warranties, maintenance details, and installation examples',
    season: 'Shift repair coverage with hot and cold weather, promote tune-ups before peak demand, and use shoulder seasons for replacement education.'
  },
  {
    slug: 'electrician-leads', key: 'electricians', name: 'Electrician', noun: 'electrical contractor',
    title: 'Electrician Leads: How to Get More Electrical Jobs',
    description: 'Generate electrician leads for emergency repairs, panels, EV chargers, rewiring, generators, and commercial work using ads, SEO, and stronger follow-up.',
    services: ['Emergency electrical repair', 'Panel upgrades', 'EV charger installation', 'Rewiring', 'Generators', 'Commercial electrical work'],
    urgent: 'power loss, sparking outlets, tripping breakers, burning smells, and unsafe wiring',
    planned: 'panel upgrades, EV chargers, rewiring, lighting, generators, and commercial projects',
    qualify: 'service needed, safety symptoms, property type, ownership, location, panel details, permits, timeline, and budget',
    proof: 'licensing, insurance, permit knowledge, safety process, warranties, service coverage, and completed projects',
    season: 'Coordinate generator, EV-charger, renovation, outdoor-lighting, and safety campaigns with local demand while protecting emergency coverage.'
  },
  {
    slug: 'garage-door-leads', key: 'garage-door-companies', name: 'Garage Door', noun: 'garage door company',
    title: 'Garage Door Leads: Get More Repair and Installation Jobs',
    description: 'Generate garage door leads for springs, openers, emergency repairs, replacements, and commercial doors with ads, SEO, and lead tracking.',
    services: ['Broken spring repair', 'Cable and track repair', 'Opener repair', 'Door replacement', 'Commercial doors', 'Preventive maintenance'],
    urgent: 'broken springs, snapped cables, stuck doors, off-track doors, and failed openers',
    planned: 'new doors, insulated replacements, smart openers, curb-appeal upgrades, and commercial installations',
    qualify: 'repair or replacement need, door type, symptoms, trapped vehicles, property type, location, timing, and photos',
    proof: 'technician experience, stocked parts, response expectations, warranties, supported brands, and installation photos',
    season: 'Adjust creative and budgets for weather-related failures, home-improvement periods, moving seasons, and commercial planning cycles.'
  }
].map(d => ({
  ...d,
  google: `google-ads-for-${d.key}`,
  facebook: `facebook-ads-for-${d.key}`,
  seo: `seo-for-${d.key}`
}));

function esc(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function faqSchema(items) {
  return `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))})}</script>`;
}
function shell({title, description, slug, category = '', faq, body}) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} | Alex Does Digital</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="https://alxdoesdigital.com/${slug}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="https://alxdoesdigital.com/${slug}"><meta property="article:published_time" content="2026-10-06">${faqSchema(faq)}</head>
<body><main>${body}</main></body></html>\n`;
}
function faqs(d) {
  return [
    [`How can a ${d.noun} get more leads?`, `Prioritize profitable services, use high-intent search for urgent work, build local visibility, show real proof, answer quickly, and track completed jobs.`],
    ['Should urgent and planned services share one campaign?', `Usually not. Urgent needs such as ${d.urgent} have different keywords, pages, actions, and follow-up from planned work.`],
    ['What should a lead form collect?', `Ask for ${d.qualify}. Keep emergency call paths short and collect more detail for planned projects.`],
    [`How long does ${d.name.toLowerCase()} SEO take?`, 'Meaningful local SEO growth usually takes months and depends on the site, competition, reviews, technical condition, content, and authority.']
  ];
}
function cards(d) {
  return `<div class="topic-hub-grid"><a class="topic-hub-card" href="/${d.google}"><span>Google Ads</span><h3>Google Ads for ${d.name} Companies</h3><p>Campaigns, keywords, geography, pages, budgets, and lead tracking.</p><strong>Read guide →</strong></a><a class="topic-hub-card" href="/${d.facebook}"><span>Facebook Ads</span><h3>Facebook Ads for ${d.name} Companies</h3><p>Offers, creative, targeting, retargeting, and follow-up.</p><strong>Read guide →</strong></a><a class="topic-hub-card" href="/${d.seo}"><span>SEO</span><h3>SEO for ${d.name} Companies</h3><p>Business Profile, service pages, reviews, authority, and AI visibility.</p><strong>Read guide →</strong></a></div>`;
}
function industryPage(d) {
  const rows = d.services.map((s,i)=>`<tr><td>${s}</td><td>${i<2?'Urgent':'Planned or recurring'}</td><td>${i<2?'Call, location, and availability':'Options, proof, timing, and estimate'}</td></tr>`).join('');
  const faq = faqs(d);
  const body = `<section class="intent-hero"><div class="container intent-hero-grid"><div><p class="eyebrow">${d.name} lead-generation guide</p><h1>${d.title}</h1><p class="intent-lede">Build a steadier pipeline by separating urgent service calls from planned projects and recurring customer opportunities.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#lead-plan">See the lead plan</a></div><div class="intent-proof intent-proof-list"><span>Qualified calls</span><span>Local visibility</span><span>Booked jobs</span></div></div><aside class="intent-callout"><p class="eyebrow">The main idea</p><h2>Market the job types differently.</h2><p>Urgent calls and planned projects have different customer journeys. Separate them before choosing keywords, offers, pages, and budgets.</p></aside></div></section>
<article class="container intent-article" id="lead-plan"><p>Lead generation for ${d.name.toLowerCase()} companies should reflect the services, locations, schedules, and job values the team can support profitably. More inquiries are not useful when they are outside the service area, poorly matched, or never answered.</p><p>Written and reviewed by <a href="/about">Alex</a>. Updated October 2026.</p>
<h2>Start With the ${d.name} Jobs You Want</h2><p>Urgent demand includes ${d.urgent}. Planned demand includes ${d.planned}. Define the best services and customer types before choosing a channel.</p><div class="intent-table-wrap"><table class="intent-table"><thead><tr><th>Service</th><th>Intent</th><th>Page priority</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2>Capture Immediate Demand With Google Ads</h2><p>Separate campaigns by service, target only profitable coverage, review search terms, and send clicks to relevant pages. Track calls through qualification and completed revenue.</p><p><a href="/${d.google}">Read the complete Google Ads guide</a>.</p>
<h2>Create Planned Demand With Facebook and Instagram</h2><p>Use original project proof, technician explanations, education, seasonal offers, and retargeting. Judge results by qualified appointments and jobs instead of form volume.</p><p><a href="/${d.facebook}">Read the Facebook Ads guide</a>.</p>
<h2>Build Durable Local Visibility With SEO</h2><p>Improve the business profile, create useful service pages, earn honest reviews, publish decision-supporting content, and build genuine local mentions. Avoid repeated city pages with only the place name changed.</p><p><a href="/${d.seo}">Read the local SEO guide</a>.</p>
<h2>Qualify Leads Before They Reach the Schedule</h2><p>Collect ${d.qualify}. Explain service fees, availability, and next steps so dispatchers and estimators spend time on realistic opportunities.</p>
<h2>Build Landing Pages Around Trust</h2><p>Show ${d.proof}. Explain what affects price, what happens after contact, what the customer should prepare, and when the team responds.</p>
<h2>Plan Around Seasonality and Capacity</h2><p>${d.season} Review staffing and appointment capacity before increasing demand.</p>
<h2>Understand Lead Economics Before Scaling</h2><p>Work backward from completed-job value rather than copying an industry cost-per-lead benchmark. Include technician labor, travel, parts or materials, estimate time, close rate, cancellations, and repeat value. A more expensive lead can be the better acquisition when it produces the right service, location, and customer relationship.</p><p>Set different acquisition targets for urgent service, planned projects, and recurring work. Blending them into one average can hide a profitable campaign or make low-value inquiries look more attractive than they are.</p>
<h2>Build Referral and Partner Channels</h2><p>Paid media and SEO should not be the only sources. Develop useful relationships with property managers, real estate professionals, builders, complementary trades, suppliers, commercial operators, and community organizations that genuinely overlap with the service. Give partners a clear explanation of coverage, ideal referrals, response process, and contact route.</p>
<h2>Avoid Common Lead-Generation Mistakes</h2><p>Common problems include advertising every service at once, targeting areas the team cannot serve, sending traffic to the homepage, failing to answer calls, counting spam as leads, and changing campaigns before enough qualified-job data exists. Unsupported claims and copied location pages can also weaken customer trust.</p>
<h2>Make the Business Clear to AI Search Systems</h2><p>Use direct answers, accurate company and service information, visible authorship, descriptive headings, original examples, and structured data that matches the page. AI visibility is not a separate trick; it depends on the same clarity, usefulness, credibility, and crawlable relationships that support traditional search.</p>
<h2>Measure Bookings and Revenue</h2><p>Track calls, forms, estimates, completed work, revenue, and lost reasons. Cost per qualified lead, close rate, acquisition cost, job value, and repeat value matter more than raw platform leads.</p>
<h2>A Practical 90-Day Plan</h2><p><strong>Days 1–30:</strong> define services, coverage, tracking, pages, and call handling. <strong>Days 31–60:</strong> improve one primary channel and review lead quality. <strong>Days 61–90:</strong> fix conversion, add the next justified channel, and shift budget toward completed-job economics.</p>
<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>${d.name} Lead Generation FAQ</h2>${faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>
<div class="article-pathways"><p><strong>Explore the complete ${d.name.toLowerCase()} cluster:</strong></p>${cards(d)}</div></article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Build a qualified pipeline</p><h2>Want a clearer ${d.name.toLowerCase()} lead plan?</h2><p>Review channels, coverage, pages, tracking, and follow-up around the jobs you want.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/industries">Browse industries</a></div></div></div></section>`;
  return shell({title:d.title, description:d.description, slug:d.slug, faq, body});
}
function guideInfo(d, channel) {
  if (channel === 'Google Ads') return {
    slug:d.google, title:`Google Ads for ${d.name} Companies`,
    description:`Run Google Ads for ${d.name.toLowerCase()} companies with service campaigns, local keywords, location controls, landing pages, budgets, and qualified-lead tracking.`,
    lede:`Capture active searches for ${d.urgent} while controlling geography, budget, and lead quality.`,
    sections:[
      ['Separate campaigns by service intent',`Urgent needs such as ${d.urgent} need a call-focused path. Planned work such as ${d.planned} needs more explanation, proof, and estimate qualification.`],
      ['Choose keywords and negatives carefully','Use terms that match real services. Review search terms for jobs, training, DIY, parts, products, and unrelated work before adding negatives.'],
      ['Target profitable service areas','Match location settings to technician coverage and travel economics. Do not advertise availability the operation cannot support.'],
      ['Use the closest landing page',`Name the service, explain the process, show ${d.proof}, answer price and timing questions, and make calling or requesting an estimate easy.`],
      ['Budget for a meaningful test','Use local click costs, conversion rate, close rate, and job value to estimate a useful test. Do not spread a small budget across every service.'],
      ['Track completed work',`Record ${d.qualify}. Connect calls and forms to bookings, completed jobs, revenue, and lost reasons.`],
      ['Optimize in stages','First fix tracking, irrelevant searches, geography, and conversion paths. Then compare services, schedules, devices, and bidding with qualified-lead data.']
    ]
  };
  if (channel === 'Facebook Ads') return {
    slug:d.facebook, title:`Facebook Ads for ${d.name} Companies`,
    description:`Use Facebook Ads for ${d.name.toLowerCase()} companies with local offers, original creative, targeting, retargeting, qualification, and booked-job tracking.`,
    lede:`Create planned demand with original proof, useful education, clear offers, and disciplined follow-up.`,
    sections:[
      ['Use paid social for the right jobs',`Facebook and Instagram are better suited to ${d.planned} than immediate emergencies. Use paid social for education, proof, offers, and retargeting.`],
      ['Build a clear offer','Use an inspection, estimate, maintenance, seasonal, or project offer that fits the economics. State service areas and limitations.'],
      ['Create ads from real work',`Use technician explanations, project walkthroughs, customer proof, and ${d.proof}. Original evidence is stronger than generic stock creative.`],
      ['Keep local targeting simple','Start with profitable coverage. Specific local creative can be more useful than many narrow interest groups. Retarget with consent where appropriate.'],
      ['Choose forms or pages by complexity',`Instant forms reduce friction; landing pages allow more proof. Ask for ${d.qualify} and compare qualified bookings, not submission cost alone.`],
      ['Respond consistently','Confirm receipt, set expectations, follow with a helpful human response, and record contact, qualification, booking, completion, and lost reasons.'],
      ['Measure creative by job quality','Track which services, problems, formats, offers, and proof create completed work. Refresh fatigued creative using downstream results.']
    ]
  };
  return {
    slug:d.seo, title:`SEO for ${d.name} Companies`,
    description:`Improve local SEO for ${d.name.toLowerCase()} companies with Google Business Profile, service pages, reviews, technical SEO, authority, and AI search visibility.`,
    lede:'Build durable visibility with clear services, accurate business signals, original proof, useful answers, and a technically sound website.',
    sections:[
      ['Strengthen Google Business Profile','Use accurate details, categories, service areas, hours, services, and current photos. Ask real customers for honest reviews and follow service-area rules.'],
      ['Create useful service pages',`Build substantial pages for ${d.services.join(', ')}. Explain needs, process, options, pricing factors, timing, proof, and next steps.`],
      ['Use location pages carefully','Publish location pages only for real coverage where you can provide unique scheduling, proof, and local information.'],
      ['Publish decision-supporting content','Answer questions customers ask before hiring and link each resource to the relevant service. Show technician review and original evidence.'],
      ['Fix technical fundamentals','Use canonical URLs, descriptive titles, one H1, logical headings, crawlable links, compressed media, image dimensions, and tested mobile forms.'],
      ['Build local authority','Earn legitimate mentions from industry groups, suppliers, partners, community organizations, and local media. Keep business details consistent.'],
      ['Prepare for AI search','Write direct answers, identify authors or reviewers, define services, and provide original evidence. Do not create filler pages for keyword variants.'],
      ['Measure organic leads','Track qualified calls, forms, bookings, completed work, and revenue by landing page. Traffic and rankings are diagnostic, not the final result.']
    ]
  };
}
function guidePage(d, channel) {
  const g=guideInfo(d,channel); const faq=[
    [`Do ${channel} strategies work for ${d.name.toLowerCase()} companies?`,'They can when the service, market, proof, conversion path, follow-up, and measurement are aligned.'],
    ['How should results be evaluated?','Use qualified leads, bookings, completed jobs, revenue, acquisition cost, and lost reasons rather than raw clicks or forms.'],
    ['Should urgent and planned services be separated?','Usually. Their customer intent, message, page, action, value, and follow-up are different.'],
    ['What should happen first?','Define priority services, coverage, qualification, tracking, and the conversion path before increasing traffic.']
  ];
  const channelExtra = channel === 'SEO'
    ? `<section class="intent-guide-section"><p class="eyebrow">Conversion and quality</p><h2>Connect Content to a Conversion Path</h2><p>Organic visibility should lead somewhere useful. Link informational resources to the closest service page, make calls and forms easy on mobile, explain what happens after contact, and measure qualified inquiries by landing page. Traffic without a clear commercial next step is not the goal.</p><h3>Avoid thin and repetitive SEO pages</h3><p>Do not create a separate page for every slight keyword or city variation. Combine overlapping intent, keep one canonical page for each real subject, and publish location content only when the business can add coverage details, proof, scheduling information, and genuinely local value.</p></section>`
    : `<section class="intent-guide-section"><p class="eyebrow">Lead quality</p><h2>Qualify Leads Before Optimizing for Volume</h2><p>Define a qualified lead using service, location, customer fit, timing, and commercial value. Review call recordings or lead outcomes where legally appropriate, label spam and unsupported requests, and send booked or completed outcomes back into reporting. Cheap submissions can mislead optimization when they do not become work.</p><h3>Improve the follow-up and conversion path</h3><p>Make the next step obvious, confirm inquiries immediately, and respond with a knowledgeable human as quickly as the operation can sustain. Track contact attempts, estimates, bookings, completed work, revenue, and lost reasons. Advertising cannot compensate for unanswered calls or unclear scheduling.</p></section>`;
  const body=`<section class="intent-hero"><div class="container intent-hero-grid"><div><span class="post-category-tag">${channel}</span><h1>${g.title}</h1><p class="intent-lede">${g.lede}</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#strategy">Read the strategy</a></div><div class="intent-proof intent-proof-list"><span>Service intent</span><span>Local coverage</span><span>Qualified leads</span></div></div><aside class="intent-callout"><p class="eyebrow">Built for the operation</p><h2>Connect marketing to completed work.</h2><p>Programs should reflect services, locations, schedules, qualification, and job values the team can support.</p></aside></div></section>
<article class="container intent-article" id="strategy"><div class="intent-article-intro"><p>${g.lede} This guide avoids universal cost or ranking promises because competition, reputation, conversion, and fulfillment affect performance.</p><p class="intent-byline">Written and reviewed by <a href="/about">Alex</a> · Updated October 2026</p></div><div class="intent-guide-steps">${g.sections.map(([h,p],index)=>`<section class="intent-guide-step"><span>${String(index + 1).padStart(2,'0')}</span><div><h2>${h}</h2><p>${p}</p></div></section>`).join('')}</div>
${channelExtra}<aside class="intent-guide-warning"><p class="eyebrow">Avoid wasted effort</p><h2>Common Mistakes to Avoid</h2><p>Do not target every service and location at once, publish unsupported claims, ignore mobile usability, or judge success from surface-level platform totals. Build a focused program, document changes, allow enough useful data, and connect decisions to qualified and completed work.</p></aside>
<section class="intent-guide-section"><p class="eyebrow">Implementation timeline</p><h2>A Practical First 90 Days</h2><div class="intent-timeline"><div><strong>Month 1</strong><p>Define services, coverage, qualification, tracking, and page needs.</p></div><div><strong>Month 2</strong><p>Launch or improve the core program and review lead quality weekly.</p></div><div><strong>Month 3</strong><p>Refine using bookings, completed work, revenue, and lost reasons.</p></div></div></section>
<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>${g.title} FAQ</h2>${faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>
</article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Build the next step</p><h2>Want a clearer ${channel} plan?</h2><p>Review the offer, coverage, conversion path, tracking, and lead quality.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/${d.slug}">View the industry guide</a></div></div></div></section>`;
  return shell({title:g.title,description:g.description,slug:g.slug,category:channel,faq,body});
}

function towingPage() {
  const faq=[
    ['What is the best way to get towing leads?','High-intent local search can generate towing calls quickly when coverage, call pages, tracking, and dispatch are aligned.'],
    ['Should roadside assistance have a separate campaign?','Yes. Jump starts, lockouts, tire changes, and fuel delivery have different terms, values, and qualification needs from towing.'],
    ['How should towing companies track leads?','Track source, service, pickup, destination, call quality, accepted job, completed job, revenue, and lost reason.'],
    ['Can SEO generate towing calls?','Yes, through a strong business profile, towing and roadside pages, reviews, technical SEO, and legitimate local authority.']
  ];
  const body=`<section class="intent-hero"><div class="container intent-hero-grid"><div><p class="eyebrow">Towing lead-generation guide</p><h1>Towing Leads: How to Get More Qualified Calls</h1><p class="intent-lede">Generate qualified towing and roadside calls by matching marketing coverage to dispatch capacity, service type, location, and completed-job value.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="#plan">See the towing plan</a></div><div class="intent-proof intent-proof-list"><span>Qualified calls</span><span>Dispatch coverage</span><span>Completed tows</span></div></div><aside class="intent-callout"><p class="eyebrow">The critical constraint</p><h2>Marketing coverage must match dispatch coverage.</h2><p>A cheap call is not valuable when the truck cannot reach it or the requested job is unsupported.</p></aside></div></section>
<article class="container intent-article" id="plan"><p>Towing lead generation is built around speed, location, service type, phone handling, and completed jobs. Separate emergency towing, roadside assistance, transport, private-property work, and commercial accounts before allocating budget.</p><p>Written and reviewed by <a href="/about">Alex</a>. Updated October 2026.</p>
<h2>Choose the Towing Calls You Want</h2><p>Map truck types, schedules, storage capabilities, service radius, destination limits, and minimum economics. Define what dispatch accepts before campaigns go live.</p>
<div class="intent-table-wrap"><table class="intent-table"><thead><tr><th>Lead type</th><th>Need</th><th>Priority</th></tr></thead><tbody><tr><td>Emergency towing</td><td>Immediate pickup</td><td>Call, location, availability</td></tr><tr><td>Roadside</td><td>Jump, lockout, tire, fuel</td><td>Separate service qualification</td></tr><tr><td>Transport</td><td>Scheduled move</td><td>Route, vehicle, date, estimate</td></tr><tr><td>Commercial</td><td>Recurring partner</td><td>Coverage, capacity, account process</td></tr></tbody></table></div>
<h2>Capture Emergency Demand With Google Ads</h2><p>Separate services, target reachable locations, review search terms, make calling easy, and track qualified and completed jobs.</p><p><a href="/google-ads-for-towing-companies">Read the towing Google Ads guide</a>.</p>
<h2>Compare Google Local Services Ads Cost Per Lead</h2><p>Local Services Ads use a different lead-pricing model from standard Search campaigns. Compare charged leads, qualified calls, booked jobs, completed jobs, and revenue before deciding which channel is more efficient.</p><p><a href="/google-local-services-ads-towing-cost-per-lead">Review the 2026 towing LSA cost-per-lead benchmarks</a>.</p>
<h2>Separate Roadside Assistance</h2><p>Jump starts, tire changes, lockouts, and fuel delivery need dedicated ads, pages, negative keywords, and dispatch rules.</p><p><a href="/google-ads-for-roadside-assistance">Read the roadside assistance guide</a>.</p>
<h2>Build Local SEO for Emergency Searches</h2><p>Keep hours, services, categories, coverage, and business details accurate. Publish substantial towing and roadside pages, earn honest reviews, and avoid repeated city pages.</p><p><a href="/seo-for-towing-companies">Read the towing SEO guide</a>.</p>
<h2>Use Facebook for Partnerships and Retargeting</h2><p>Paid social can support fleets, dealerships, repair shops, property managers, local awareness, and retargeting, even though it is less suited to immediate emergencies.</p><p><a href="/facebook-ads-for-towing-companies">Read the towing Facebook Ads guide</a>.</p>
<h2>Design for Dispatch</h2><p>Show services, operating hours, coverage, truck capabilities, payment context, phone access, and the information dispatch needs. Do not promise response times the operation cannot deliver.</p>
<h2>Qualify and Track Calls</h2><p>Record pickup, destination, vehicle, condition, requested service, accessibility, accepted job, completed job, revenue, and lost reason.</p>
<h2>Build Commercial Sources</h2><p>Develop real relationships with repair shops, dealerships, body shops, fleets, property managers, parking operators, and other relevant partners.</p>
<h2>Control Service Radius and Lead Economics</h2><p>Evaluate each call using drive time, truck type, operator availability, pickup conditions, destination, storage or impound requirements, payment risk, and completed-job revenue. A low-cost call outside practical coverage is waste, while a more expensive call that fits an available truck can be profitable.</p><p>Use separate targets for towing, roadside assistance, transport, and commercial accounts. One blended cost-per-call number hides meaningful differences in job value and fulfillment.</p>
<h2>Plan for Time, Weather, and Capacity</h2><p>Demand changes by hour, day, weather, commute patterns, holidays, and local events. Adjust coverage only when trucks and dispatchers are available. After-hours ads should not run into an unanswered phone, and severe-weather campaigns should reflect real capacity rather than theoretical demand.</p>
<h2>Avoid Common Towing Marketing Mistakes</h2><p>Do not target an oversized radius, mix roadside and towing terms without control, treat every call as a lead, publish response-time guarantees the team cannot keep, or optimize from call duration alone. Review accepted and completed jobs, lost-call reasons, wrong locations, spam, and unsupported services.</p>
<h2>Support Search and AI Visibility With Clear Facts</h2><p>State services, coverage, operating hours, vehicle capabilities, business identity, and contact details consistently. Use direct answers, visible authorship, original operating knowledge, and accurate structured data. Clear factual content helps customers and search systems understand when the company is a relevant option.</p>
<h2>Use Real Proof</h2><p>Connect the existing towing campaign case study to the service and channel pages without presenting headline numbers without context.</p><p><a href="/google-ads-towing-case-study">Review the towing case study</a>.</p>
<h2>A Practical 90-Day Plan</h2><p><strong>Days 1–30:</strong> define coverage and tracking. <strong>Days 31–60:</strong> separate towing and roadside campaigns and improve local signals. <strong>Days 61–90:</strong> compare completed-job economics and build partner outreach.</p>
<section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>Towing Lead Generation FAQ</h2>${faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section></article>
<section class="intent-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">Generate calls you can serve</p><h2>Want a disciplined towing lead system?</h2><p>Review coverage, campaigns, call tracking, dispatch, pages, and completed-job economics.</p><div class="intent-actions"><a class="btn btn-primary" href="${BOOKING}">Talk to Alex</a><a class="btn btn-secondary" href="/google-ads-towing-case-study">View case study</a></div></div></div></section>`;
  return shell({title:'Towing Leads: How to Get More Qualified Calls',description:'Generate towing leads with local Google Ads, roadside campaigns, SEO, dispatch-focused pages, call tracking, partnerships, and faster follow-up.',slug:'towing-leads',faq,body});
}

for (const d of industries) {
  fs.writeFileSync(path.join(ROOT, `${d.slug}.html`), industryPage(d));
  for (const channel of ['Google Ads','Facebook Ads','SEO']) {
    const g=guideInfo(d,channel);
    fs.writeFileSync(path.join(ROOT, `${g.slug}.html`), guidePage(d,channel));
  }
}
fs.writeFileSync(path.join(ROOT, 'towing-leads.html'), towingPage());
console.log('Generated 4 priority industry hubs and 9 channel guides');
