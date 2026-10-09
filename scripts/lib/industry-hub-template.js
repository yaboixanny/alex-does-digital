/**
 * Primary industry-hub template.
 *
 * New hubs supply industry-specific copy and three same-industry spokes through
 * configuration. The renderer owns the layout so future hubs cannot drift into
 * an abbreviated or poorly formatted one-off page.
 */
function renderIndustryHubBody(d, { booking, faq }) {
  const isNursing = d.slug === 'nursing-home-marketing';
  const defaults = {
    specialistLabel: isNursing ? 'Specialist nursing home and SNF marketing' : 'Specialist care home marketing',
    heroTitle: isNursing ? 'Nursing Home Marketing That Builds Trust and Qualified Admissions' : 'Care Home Marketing That Builds Trust, Enquiries and Occupancy',
    heroLede: isNursing
      ? 'Connect local search demand, professional referrals and family trust in one measurable admissions system for skilled nursing, rehabilitation, post-acute and long-term care.'
      : 'Connect search demand, family trust and admissions follow-up in one measurable growth system for residential care, dementia care, respite care and senior living.',
    proofLabels: ['Direct senior strategy', 'Privacy-aware campaigns', 'Admissions measurement'],
    journeyLabel: isNursing ? 'The admissions decision journey' : 'The family decision journey',
    journeyTitle: 'Turn local demand into a clear next step.',
    journeySteps: [
      ['Discover', 'Search, maps, referrals and local awareness'],
      ['Evaluate', isNursing ? 'Clinical fit, payer context and availability' : 'Services, proof, costs and availability'],
      ['Progress', isNursing ? 'Referral, review, acceptance and admission' : 'Call, visit, assessment and admission']
    ],
    primaryGoal: isNursing ? 'Suitable family and professional referrals—not raw form volume.' : 'Qualified family conversations—not raw form volume.',
    measure: [
      ['Demand', 'Relevant searches and local reach'],
      ['Enquiries', 'Calls, forms and referral submissions'],
      ['Progression', isNursing ? 'Reviews, acceptance and placement' : 'Conversations, assessments and tours'],
      ['Admissions', `Move-ins and ${isNursing ? 'admissions contribution' : 'occupancy contribution'}`]
    ],
    problemEyebrow: `Where ${d.name.toLowerCase()} marketing breaks`,
    problemTitle: 'Generic lead generation misses how people choose care.',
    problemLede: `${isNursing ? 'Nursing home marketing must support both families and professional referral sources through a clinical, financial and practical decision.' : 'Care home marketing has to answer an emotional, practical and local decision.'} The campaign, website and admissions team must tell the same accurate story.`,
    failureTitle: 'Optimizing for activity',
    failureItems: ['Broad campaigns mix admissions demand with recruitment searches.', 'Stock-heavy pages make every organization look interchangeable.', 'Forms collect leads without explaining what happens next.', 'Reporting stops at clicks, calls or platform conversions.'],
    successTitle: 'Optimizing for suitable admissions',
    successItems: ['Campaigns reflect real services, locations and availability.', 'Pages show the environment, people, care approach and next step.', 'Family and professional-referral journeys are handled appropriately.', 'Marketing is reviewed against progression and completed admissions.'],
    systemLede: 'Each channel has a distinct job. Together, they help people discover the organization, build confidence and take the next appropriate step.',
    pillars: {
      google: ['Capture active demand', `Google Ads for ${d.pluralLabel}`, 'Separate campaigns by service and location, exclude recruitment intent, and connect high-intent searches to the most relevant page.', ['Service and catchment campaign structure', 'Search-term and negative-keyword control', 'Qualified admissions outcome tracking']],
      facebook: ['Build local familiarity', `Facebook Ads for ${d.pluralLabel}`, 'Use real, permissioned creative to introduce the environment, people and care approach before asking someone to enquire.', ['Helpful video and decision guidance', 'Responsible targeting and consent', 'Clear routes to a call, guide or visit']],
      seo: ['Create durable discovery', `SEO for ${d.pluralLabel}`, 'Build useful service, location and comparison pages supported by accurate local signals, reviews, authorship and technical foundations.', ['Google Business Profile and local SEO', 'Service and location content', 'Search and AI-friendly trust signals']]
    },
    clarityEyebrow: 'Start with commercial and operational clarity',
    clarityTitle: 'Define the services, admissions and catchments you actually want to grow.',
    clarityIntro: `${d.audience.charAt(0).toUpperCase() + d.audience.slice(1)} should not market every service as though it serves the same need. ${d.urgent} ${d.planned}`,
    clarityFollowup: 'Document availability, geography, admission requirements, capacity, payer or funding context where appropriate, response ownership and operational priorities before increasing spend.',
    marketNote: isNursing
      ? `<p class="eyebrow">Use precise US terminology</p><h3>Nursing home, skilled nursing facility or SNF?</h3><p><strong>Nursing home</strong>, <strong>skilled nursing facility</strong> and <strong>SNF</strong> overlap in search, but service and payer context can differ. Explain short-term rehabilitation, post-acute care and long-term nursing accurately.</p><p>Keep assisted living, retirement living and non-clinical residential care on the dedicated <a href="/care-home-marketing">care home marketing hub</a>.</p>`
      : `<p class="eyebrow">Match the market's language</p><h3>Care home, assisted living or senior living?</h3><p><strong>Care home</strong> is widely used in the UK. <strong>Assisted living</strong>, <strong>senior living</strong> and <strong>retirement community</strong> are more common in North America.</p><p>Use the terms families actually search in each location. Keep nursing and skilled nursing intent on the dedicated <a href="/nursing-home-marketing">nursing home marketing hub</a>.</p>`,
    scoreEyebrow: 'The admissions scorecard',
    scoreTitle: 'Measure the whole journey—not a cheap cost per lead.',
    scoreLede: "Use consistent definitions across advertising, analytics and admissions. The useful benchmark is improvement against the organization's own capacity, service mix and operating model.",
    scoreRows: [
      ['Demand', 'Search term, page, location and service', 'Are we attracting the right local need?'],
      ['Enquiry', 'Source, quality, timing and requested next step', 'Is the website creating useful conversations?'],
      ['Progression', isNursing ? 'Referral review, documents, acceptance and lost reason' : 'Assessment, tour, application and lost reason', 'Where do suitable opportunities stop progressing?'],
      ['Admission', `Completed admission, service, source and ${isNursing ? 'admissions contribution' : 'occupancy contribution'}`, 'Which marketing creates operational value?']
    ],
    trustTitle: 'Give families and referral sources evidence they can verify.',
    trustIntro: `${d.proof.charAt(0).toUpperCase() + d.proof.slice(1)}. Explain who reviews important information and what happens after an enquiry or referral.`,
    trustFollowup: 'Useful content can cover service comparisons, preparing for a conversation or visit, documents, funding or payment questions, family communication, location considerations and what admission involves. Qualified people should review sensitive or clinical information.',
    trustItems: [['Real environment', 'Current, permissioned photography and video.'], ['Clear service definitions', 'Who each service helps and what it includes.'], ['Visible expertise', 'Staff credentials, responsibilities and authorship.'], ['Practical next step', 'What happens after a call, form or referral.']],
    roadmap: [['Days 1–30 · Foundations', 'Define services, locations, capacity, audiences, tracking, privacy, priority pages and response ownership.'], ['Days 31–60 · Demand', 'Improve the highest-intent channel and repair the path from enquiry or referral to admissions.'], ['Days 61–90 · Expansion', 'Add the next justified channel and shift effort using qualified progression and admission outcomes.']],
    responsibilityEyebrow: 'Responsible growth',
    responsibilityTitle: 'Protect privacy and make every step accessible.',
    responsibilityParagraphs: ["Ask only for information needed for the next step, explain how it will be used, protect form and CRM access, and review applicable privacy, healthcare, consumer, housing and advertising rules. Avoid copy that implies knowledge of a person's medical condition or other sensitive attributes.", 'Use readable type, sufficient contrast, descriptive headings, keyboard-friendly controls, captions or transcripts, visible phone numbers and mobile-friendly forms. Accessibility improves the experience for older adults, families, professionals and people using assistive technology.'],
    ctaEyebrow: `Direct ${d.name.toLowerCase()} growth review`,
    ctaTitle: 'Build a marketing system your admissions team can actually use.',
    ctaCopy: 'Review search demand, local visibility, paid media, the enquiry path and admissions measurement with Alex.'
  };
  const custom = d.hubCopy || {};
  const c = { ...defaults, ...custom, pillars: { ...defaults.pillars, ...(custom.pillars || {}) } };
  const services = d.services.map(service => `<span>${service}</span>`).join('');
  const faqMarkup = faq.map(([q, answer]) => `<details><summary>${q}</summary><p>${answer}</p></details>`).join('');
  const list = items => items.map(item => `<li>${item}</li>`).join('');
  const journey = c.journeySteps.map(([title, text], index) => `${index ? '<b aria-hidden="true"></b>' : ''}<div><span>0${index + 1}</span><strong>${title}</strong><small>${text}</small></div>`).join('');
  const measures = c.measure.map(([title, text], index) => `<div><span>0${index + 1}</span><strong>${title}</strong><small>${text}</small></div>`).join('');
  const pillar = (key, slug, action, number) => { const [label, title, text, points] = c.pillars[key]; return `<a class="care-pillar-card" href="/${slug}"><span class="care-pillar-number">0${number}</span><p class="eyebrow">${label}</p><h3>${title}</h3><p>${text}</p><ul>${list(points)}</ul><strong>${action} →</strong></a>`; };
  const rows = c.scoreRows.map(([stage, record, question]) => `<tr><td><strong>${stage}</strong></td><td>${record}</td><td>${question}</td></tr>`).join('');
  const trustItems = c.trustItems.map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('');
  const roadmap = c.roadmap.map(([title, text]) => `<div><strong>${title}</strong><p>${text}</p></div>`).join('');

  return `<section class="intent-hero care-hub-hero"><div class="container care-hub-hero-grid"><div class="care-hub-hero-copy"><p class="eyebrow">${c.specialistLabel}</p><h1>${c.heroTitle}</h1><p class="intent-lede">${c.heroLede}</p><div class="intent-actions"><a class="btn btn-primary" href="${booking}">Talk to Alex</a><a class="btn btn-secondary" href="#industry-growth-system">Explore the strategy</a></div><div class="intent-proof intent-proof-list">${c.proofLabels.map(label => `<span>${label}</span>`).join('')}</div></div><aside class="care-demand-board" aria-label="${d.name} marketing journey"><div class="care-demand-board-head"><div><p class="eyebrow">${c.journeyLabel}</p><h2>${c.journeyTitle}</h2></div><span class="care-status"><i></i> Measurable</span></div><div class="care-demand-route">${journey}</div><div class="care-board-note"><strong>Primary goal</strong><span>${c.primaryGoal}</span></div></aside></div></section>
<section class="care-measure-strip" aria-label="${d.name} marketing measurement framework"><div class="container care-measure-grid">${measures}</div></section>
<article id="industry-growth-system">
<section class="intent-section"><div class="container"><div class="care-section-heading"><p class="eyebrow">${c.problemEyebrow}</p><h2>${c.problemTitle}</h2><p>${c.problemLede}</p></div><div class="care-compare-grid"><section class="care-compare-card care-compare-card-muted"><span class="care-card-label">The common failure</span><h3>${c.failureTitle}</h3><ul>${list(c.failureItems)}</ul></section><section class="care-compare-card care-compare-card-positive"><span class="care-card-label">The better operating model</span><h3>${c.successTitle}</h3><ul>${list(c.successItems)}</ul></section></div></div></section>
<section class="intent-section intent-section-alt"><div class="container"><div class="care-section-heading"><p class="eyebrow">The acquisition system</p><h2>Three channels, one ${d.name.toLowerCase()} marketing strategy.</h2><p>${c.systemLede}</p></div><div class="care-pillar-grid">${pillar('google', d.google, 'Read the Google Ads guide', 1)}${pillar('facebook', d.facebook, 'Read the Facebook Ads guide', 2)}${pillar('seo', d.seo, 'Read the SEO guide', 3)}</div></div></section>
<section class="intent-section"><div class="container care-strategy-split"><div><p class="eyebrow">${c.clarityEyebrow}</p><h2>${c.clarityTitle}</h2><p>${c.clarityIntro}</p><p>${c.clarityFollowup}</p><div class="care-service-tags">${services}</div></div><aside class="care-market-note">${c.marketNote}</aside></div></section>
<section class="intent-section intent-section-alt"><div class="container"><div class="care-section-heading"><p class="eyebrow">${c.scoreEyebrow}</p><h2>${c.scoreTitle}</h2><p>${c.scoreLede}</p></div><div class="intent-table-wrap care-scorecard"><table class="intent-table"><thead><tr><th>Stage</th><th>What to record</th><th>Question it answers</th></tr></thead><tbody>${rows}</tbody></table></div></div></section>
<section class="intent-section"><div class="container care-strategy-split"><div><p class="eyebrow">Trust architecture</p><h2>${c.trustTitle}</h2><p>${c.trustIntro}</p><p>${c.trustFollowup}</p></div><ol class="care-trust-list">${trustItems}</ol></div></section>
<section class="intent-section intent-section-alt"><div class="container"><div class="care-section-heading"><p class="eyebrow">90-day implementation</p><h2>Build the system in the right order.</h2></div><div class="intent-timeline care-roadmap">${roadmap}</div></div></section>
<section class="intent-section"><div class="container care-content-narrow"><p class="eyebrow">${c.responsibilityEyebrow}</p><h2>${c.responsibilityTitle}</h2>${c.responsibilityParagraphs.map(text => `<p>${text}</p>`).join('')}</div></section>
<section class="intent-section"><div class="container care-content-narrow"><section class="intent-faq"><p class="eyebrow">Frequently asked questions</p><h2>${d.name} Marketing FAQ</h2>${faqMarkup}</section></div></section>
</article>
<section class="intent-cta care-hub-cta"><div class="container"><div class="intent-cta-panel"><p class="eyebrow">${c.ctaEyebrow}</p><h2>${c.ctaTitle}</h2><p>${c.ctaCopy}</p><div class="intent-actions"><a class="btn btn-primary" href="${booking}">Talk to Alex</a><a class="btn btn-secondary" href="/industries">Browse industries</a></div><div class="care-cta-proof"><span>No sales reps</span><span>Direct senior strategy</span><span>Clear next steps</span></div></div></div></section>`;
}

module.exports = { renderIndustryHubBody };
