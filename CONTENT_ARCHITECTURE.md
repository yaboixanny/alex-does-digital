# Content architecture rules

Every public page must have exactly one role in `content-registry.json`:

- `service`: something a visitor can hire Alex to do. Listed from `/services`.
- `industry`: a broad market landing page. Listed from `/industries`.
- `guide`: educational content. Eligible for `/guides` and the channel guide hubs.
- `case-study`: proof built around a specific client result. Listed from `/case-studies`.
- `hub`: a collection page that organizes other pages.
- `static`: company or utility information such as About.
- `legal`: policy and terms pages.
- `home`: reserved for the homepage.

## Adding a page

1. Decide the page's primary job before writing it. If the page could fit two roles, choose the role that matches its search intent and conversion goal; link to the secondary topic instead of duplicating the page.
2. Add the HTML file and classify its clean URL in `content-registry.json`. Run `npm run classify-content` to be prompted for any unclassified page.
3. Run `npm run build`. The build standardizes the menu, footer, booking URL, breadcrumbs, schema, guide collections, and sitemap.
4. Do not add `.html` to public links. Clean URLs are canonical.
5. Do not add services, industry landing pages, or case studies to Guides. The architecture validator will fail the build if content roles are mixed.

## Industry hub template

New industry hubs should use `scripts/lib/industry-hub-template.js` as the primary layout. Supply industry-specific services, audience, demand patterns, proof, measurement language, FAQs, and same-industry Google Ads, Facebook Ads, and SEO destinations through configuration rather than copying finished HTML.

The template includes the standard hero and decision-journey board, measurement strip, problem/solution comparison, three-channel acquisition cards, commercial and operational clarity section, outcome scorecard, trust architecture, 90-day roadmap, privacy and accessibility guidance, FAQ, and final CTA.

Supporting links must fail closed: include only genuine same-industry destinations or an explicitly curated adjacent page. Never fill a hub with unrelated same-channel links, never link a page to itself, and avoid repeating the same destination in multiple generic modules.

The build intentionally fails when a public page has not been classified. This forces a placement decision before deployment instead of silently putting a new page in the wrong feed.
