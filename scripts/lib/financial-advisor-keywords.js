const keywordFaq = [
  ['What are the best Google Ads keywords for financial advisors?', 'Choose keywords that match the firm’s real services, credentials, markets, and landing pages. Useful themes include fee-only or fiduciary advisors, retirement planning, wealth management, niche audiences, and local searches.'],
  ['Should financial advisors use broad, phrase, or exact match?', 'Phrase and exact themes can provide a focused starting point, although both can match by meaning. Broad match needs Smart Bidding, reliable conversion signals, adequate budget, and close search-term review. Evaluate results using suitable consultations and opportunities.'],
  ['Which negative keywords should financial advisors review?', 'Review employment, training, student research, software, templates, stock tips, and unrelated services. Check the whole query before excluding calculator, free advice, certification, or similar terms that may also appear in useful searches.']
];

const keywordRows = [
  ['fee-only financial advisor near me', 'Advisor type + local intent', 'Advisor or local service page'],
  ['independent financial advisor [city]', 'Advisor type + local intent', 'Local advisor page'],
  ['registered investment adviser', 'Firm or registration research', 'Relevant firm and service page'],
  ['fiduciary financial advisor', 'Approach comparison', 'Fiduciary approach page'],
  ['retirement planning advisor [city]', 'Planning need + location', 'Retirement planning page'],
  ['wealth management firm', 'Ongoing relationship', 'Wealth management page'],
  ['business succession financial advisor', 'Specific planning need', 'Business-owner planning page'],
  ['financial planner for inheritance', 'Specific planning need', 'Relevant inheritance-planning page'],
  ['financial advisor for physicians', 'Niche audience', 'Physician planning page'],
  ['financial advisor for business owners', 'Niche audience', 'Business-owner planning page'],
  ['retirement advisor for federal employees', 'Niche audience', 'Relevant federal-employee planning page']
];

function renderKeywordSection() {
  const rows = keywordRows.map(([keyword, intent, page]) => `<tr role="row"><th scope="row" role="rowheader">${keyword}</th><td role="cell" data-label="Intent">${intent}</td><td role="cell" data-label="Best destination">${page}</td></tr>`).join('');
  const negatives = ['salary', 'jobs', 'career', 'hiring', 'internship', 'course', 'certification', 'exam', 'school', 'degree', 'free advice', 'stock tips', 'calculator', 'software', 'template', 'definition', 'Reddit'];
  return `<section class="fa-ppc-block" id="advisor-keywords">
    <p class="eyebrow">Keyword strategy and search intent</p>
    <h2>Google Ads Keywords for Financial Advisors</h2>
    <p>I start with the planning services the firm actually offers and the clients it is equipped to serve.</p>
    <p>Then I group searches by advisor type, planning need, niche audience, and location. Each group needs an ad and landing page that fit.</p>
    <ul>
      <li><strong>Advisor type:</strong> fee-only, independent, fiduciary, or registered investment adviser—only where the description is accurate.</li>
      <li><strong>Planning need:</strong> retirement, wealth management, business succession, or inheritance planning.</li>
      <li><strong>Niche audience:</strong> physicians, business owners, or federal employees, when the firm has a real service for that group.</li>
      <li><strong>Location:</strong> near-me, city, or regional searches within markets the firm can serve.</li>
    </ul>
    <h3>Match the keyword to the right page</h3>
    <p>This map is a starting point. Choose terms that reflect the firm’s services, registrations, experience, and real coverage.</p>
    <div class="intent-table-wrap fa-ppc-keyword-wrap"><table class="intent-table fa-ppc-keyword-table" role="table"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Keyword theme</th><th scope="col" role="columnheader">Intent</th><th scope="col" role="columnheader">Best destination</th></tr></thead><tbody role="rowgroup">${rows}</tbody></table></div>
    <p>Use advisor and adviser spelling variants naturally. Separate groups when the service or landing-page need differs, rather than for every slight wording change.</p>
    <h3>Choose match types deliberately</h3>
    <p>Phrase and exact match can help keep the initial test focused. They still match by meaning, so review the searches that actually trigger ads.</p>
    <p>Broad match needs Smart Bidding and reliable conversion goals. Compare it using suitable meetings and opportunities, not click volume alone.</p>
    <p>Google’s <a href="https://support.google.com/google-ads/answer/7478529" target="_blank" rel="noopener">keyword match guidance</a> explains those differences.</p>
    <h3>Build a finance-specific negative keyword list</h3>
    <p>These are themes to review against real queries. Some may be irrelevant for one campaign and useful for another.</p>
    <div class="fa-ppc-negative-list"><strong>Negative-keyword review candidates</strong>${negatives.map(term => `<span>${term}</span>`).join('')}</div>
    <p>Check the whole search before excluding it. A blanket negative for “free” could block someone seeking an initial consultation the firm offers.</p>
    <p>Likewise, calculator, credential, or comparison searches may belong to useful research. Review their intent and outcomes before applying broad exclusions.</p>
    <p>Google’s <a href="https://support.google.com/google-ads/answer/2453972" target="_blank" rel="noopener">negative-keyword guidance</a> explains how negative match types work.</p>
    <h3>Use search terms to improve the whole campaign</h3>
    <p>I review the actual query alongside the service needed, location, landing page, and lead outcome.</p>
    <ul>
      <li>Use relevant queries to improve ad copy and answer missing landing-page questions.</li>
      <li>Separate services or audiences when they need a different offer, page, or follow-up.</li>
      <li>Exclude unsupported requests, employment traffic, and unsuitable markets using the appropriate scope.</li>
      <li>Connect suitable inquiries to booked and attended consultations, opportunities, and lost reasons in the CRM.</li>
    </ul>
    <p>The keyword is the beginning of the journey. The page, approved message, qualification, and follow-up determine whether it creates a useful conversation.</p>
  </section>`;
}

module.exports = { keywordFaq, renderKeywordSection };
