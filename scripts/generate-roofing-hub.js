const fs = require('fs');
const path = require('path');
const { renderIndustryHubBody } = require('./lib/industry-hub-template');

const faq = [
  ['How do I get more roofing leads?', 'Start with a clear service area, separate repair and replacement offers, and a website that shows real work. Use local search, Google Ads, customer referrals and project-led Facebook ads. Track which inquiries become inspections, quotes and signed jobs.'],
  ['What is a qualified roofing lead?', 'A qualified lead is a reachable person with a roofing need you serve, at a property inside your coverage area, with a realistic next step. Confirm the address, roof issue, property type, decision-maker and timing before booking an inspection.'],
  ['How much should roofing leads cost?', 'There is no single useful price for every market. Repair, replacement and commercial leads have different values. Compare total marketing spend with qualified leads and signed jobs, then check gross profit. A cheap inquiry that never becomes a job can cost more than a higher-priced qualified lead.'],
  ['Should I buy shared or exclusive roofing leads?', 'Shared leads may also go to competing contractors. Ask about source, consent, sharing limits, invalid-lead rules and refunds before buying. Leads from your own website give you more control over the offer and follow-up, but you still pay for traffic, content and operations.'],
  ['How long does roofing lead generation take?', 'Paid campaigns can begin bringing traffic after launch, but qualified leads and profitable results are not guaranteed. Allow time to test searches, pages and follow-up. SEO usually needs sustained work over several months; competition, seasonality and the starting website affect the timeline.'],
  ['Are Facebook ads useful for roof replacements?', 'They can help introduce planned replacement work through real project photos, videos and clear offers. Use a local service area and ask enough questions to qualify the request. Judge campaigns by completed inspections and signed jobs, not form submissions alone.'],
  ['Can Alex help with roofing marketing?', 'Yes. Talk to Alex about Google Ads, Facebook Ads, SEO, landing pages and lead tracking. The first step is to review your market, job mix, budget and ability to handle new inquiries.']
];
const d = {
  slug: 'roofing-leads', name: 'Roofing', pluralLabel: 'Roofing Companies',
  google: 'google-ads-for-service-businesses', facebook: 'facebook-ads-lead-generation', seo: 'seo-for-service-businesses',
  audience: 'roofing contractors', urgent: '', planned: '', proof: 'real roofing projects',
  services: ['Roof repairs', 'Roof replacements', 'Leak inspections', 'Metal roofing', 'Flat roofs', 'Commercial roofing'],
  hubCopy: {
    specialistLabel: 'Roofing lead generation & marketing',
    heroTitle: 'Roofing Leads: Get More Repair and Replacement Jobs',
    heroLede: 'Build a steady path from local searches to qualified inspections, clear quotes and signed roofing jobs. Bring Google Ads, Facebook Ads, SEO and follow-up into one practical plan.',
    proofLabels: ['Qualified local demand', 'Inspection tracking', 'Direct support from Alex'],
    journeyLabel: 'From roof problem to booked project', journeyTitle: 'Win the right inquiry. Earn the next step.',
    journeySteps: [['Find', 'Search, maps, referrals and project ads'], ['Trust', 'Local proof, clear services and helpful answers'], ['Book', 'Qualified inspection, written quote and signed job']],
    primaryGoal: 'Roofing projects you can serve profitably—not a pile of unqualified forms.',
    measure: [['Demand', 'Relevant searches in your coverage area'], ['Leads', 'Reachable people with a real roof need'], ['Inspections', 'Booked and completed site visits'], ['Jobs', 'Signed work, revenue and gross profit']],
    problemEyebrow: 'How to get roofing leads', problemTitle: 'Match the marketing to the job you want.',
    problemLede: 'A homeowner with a leak needs a different answer from someone planning a new roof. A property manager may need a scope, schedule and several approvals. Give each buyer a clear route from their problem to your team.',
    failureTitle: 'Buying clicks without a clear plan',
    failureItems: ['One ad and one page mix repairs, replacements and commercial work.', 'Broad coverage sends crews too far for small jobs.', 'Stock photos and vague claims make it hard to trust the company.', 'Calls and forms are counted even when no inspection happens.'],
    successTitle: 'Building a qualified roofing pipeline',
    successItems: ['Separate offers and pages by roof service and buyer need.', 'Set coverage and minimum job requirements before spending.', 'Show real jobs, clear processes and honest customer reviews.', 'Track each inquiry through inspection, quote and signed work.'],
    systemLede: 'Start with the channel your business can support well. The cards below explain the roofing use case and link to our core channel services for help putting it into practice.',
    pillars: {
      google: ['Capture active searches', 'Google Ads for Roofing Leads', 'Reach people looking for roof repair or replacement now. Match the search, ad and landing page so the next step feels clear.', ['Separate repair and replacement campaigns', 'Review service areas and unwanted searches', 'Measure qualified calls and completed inspections']],
      facebook: ['Show the finished work', 'Facebook Ads for Roofing Leads', 'Use real local projects to build trust with people planning a roof. Explain the work and offer a useful next step.', ['Before-and-after photos with project context', 'Clear replacement and inspection offers', 'Short forms with location and project questions']],
      seo: ['Build local visibility', 'Local SEO for Roofing Companies', 'Help homeowners find and check your business through useful service pages, accurate business details and original project proof.', ['Maintain an accurate Google Business Profile', 'Create useful repair and replacement pages', 'Earn honest reviews and local references']]
    },
    clarityEyebrow: 'Choose your roofing market', clarityTitle: 'Separate repairs, replacements and commercial roofing.',
    clarityIntro: 'For roof repair leads, explain the problems you handle, where you work and how someone can reach the team. Do not promise an emergency response unless you can deliver it. For replacement leads, explain materials, removal, cleanup, quote steps and warranty terms.',
    clarityFollowup: 'Commercial roofing needs its own message when the services and buying process differ. Show building types, systems you install, site access needs and how you plan around business hours. Only advertise work your crew is equipped to complete.',
    marketNote: '<p class="eyebrow">Local proof beats city-name swapping</p><h3>Build useful service-area pages.</h3><p>Show completed projects, service limits and practical details for the places you actually serve. Avoid dozens of near-identical city pages.</p><p>Keep your name, phone number, hours and service details consistent. Ask customers for honest reviews after the work is complete, without scripting their feedback.</p>',
    scoreEyebrow: 'Roofing lead costs & expectations', scoreTitle: 'Work backward from profitable jobs.',
    scoreLede: 'Cost per lead alone does not show whether marketing works. Include ad spend, management, content and lead fees in your total cost. Then divide that cost by qualified leads and by signed jobs. Compare job acquisition cost with gross profit—not just sales revenue.',
    scoreRows: [['Inquiry', 'Source, service, location and contact details', 'Did we attract work we can serve?'], ['Qualified lead', 'Property, roof issue, decision-maker and timing', 'Is an inspection a sensible next step?'], ['Inspection and quote', 'Attendance, scope, quoted value and follow-up', 'Where are good opportunities being lost?'], ['Signed job', 'Contract value, job costs, source and lost reasons', 'Does this channel leave enough profit?']],
    trustTitle: 'Show homeowners what hiring you looks like.',
    trustIntro: 'Publish original project photos with the roof type, general location, problem and work completed. Explain how you protect the property, handle waste and check the finished work. Use customer permission and avoid exposing private addresses.',
    trustFollowup: 'Support referrals with a simple process: ask satisfied customers to recommend you, stay in touch with local property managers and build relationships with relevant trades. Use written scopes and clear follow-up so a good introduction becomes a good customer experience.',
    trustItems: [['Real roofing work', 'Show the condition, process and finished result.'], ['Clear credentials', 'List only current, verifiable licenses and insurance details.'], ['Helpful answers', 'Explain materials, scope, scheduling and warranty limits.'], ['Simple contact', 'Make calls and short estimate forms easy on a phone.']],
    roadmap: [['Days 1–30 · Set the foundation', 'Choose priority jobs and coverage. Check tracking, service pages, project photos and business details. Decide who answers calls, qualifies leads and books inspections. Establish a baseline for quotes and signed jobs.'], ['Days 31–60 · Test and improve', 'Launch or improve one main channel. Review inquiries each week for location, service fit and source. Fix confusing pages and missed calls. Record inspection attendance and follow up on open quotes.'], ['Days 61–90 · Scale what earns work', 'Compare spend with completed inspections, signed jobs and profit. Improve weak steps before raising budgets. Add another channel when the crew and sales process can handle it. Keep building local content and referral relationships.']],
    responsibilityEyebrow: 'Qualification & follow-up', responsibilityTitle: 'Make it easy to book—and clear what happens next.',
    responsibilityParagraphs: ['Keep the first form short: name, contact details, property location, roofing need and timing. Offer a way to share photos, but do not ask anyone to climb onto a roof. Confirm receipt, explain your response hours and assign each inquiry to a person.', 'During the first conversation, confirm the service fit and inspection steps. Send a clear appointment confirmation and follow up on the quote using the channels the customer agreed to. Record why a lead was lost so marketing and sales can improve together.', 'For storm-related work, describe damage assessment and repairs honestly. Do not promise insurance approval, a free roof or a result you cannot control. Keep offers, financing descriptions and warranty statements accurate.'],
    ctaEyebrow: 'Roofing marketing support', ctaTitle: 'Turn more local interest into roofing jobs.',
    ctaCopy: 'Talk to Alex about your service area, job mix and current leads. Get a clear starting point for ads, local SEO, landing pages and follow-up.'
  }
};
const title = 'Roofing Leads: Lead Generation for Roofing Companies';
const description = 'Get more qualified roofing leads with Google Ads, Facebook Ads, local SEO and referrals. Build a practical plan for inspections, quotes and signed roofing jobs.';
const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
let body = renderIndustryHubBody(d, { booking: 'https://cal.com/alexanderstefanseo/agency', faq });
body = body.replace('Read the Google Ads guide', 'Explore Google Ads management').replace('Read the Facebook Ads guide', 'Explore Facebook Ads services').replace('Read the SEO guide', 'Explore SEO services');
fs.writeFileSync(path.join(__dirname, '..', 'roofing-leads.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Alex Does Digital</title><meta name="description" content="${description}"><link rel="canonical" href="https://alxdoesdigital.com/roofing-leads"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="https://alxdoesdigital.com/roofing-leads"><meta property="og:image" content="https://alxdoesdigital.com/images/alexpolo-copy.webp"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><main>${body}</main></body></html>\n`);
