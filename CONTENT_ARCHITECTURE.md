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

Handyman Leads is the visual reference for every industry hub: centered hero and description, primary and strategy buttons, overview, three strategy cards, readable content sections, FAQs, and a final CTA. Do not introduce a new split hero or oversized headline for an individual industry.

New hubs may use `scripts/lib/industry-hub-template.js` for industry-specific content, but the final layout is owned by `scripts/standardize-industry-layouts.js` and `industry-hubs.css`. The standardizer runs within `enhance-site`, after generators, and applies to every `industry` entry in `content-registry.json`. It moves supporting hero information into the overview, preserves copy and media, and formats editorial channel sections as cards. Keep useful industry-specific sections rather than padding every page with identical copy. Run the full build and check desktop/mobile previews before publishing.

Supporting links must fail closed: include only genuine same-industry destinations or an explicitly curated adjacent page. Never fill a hub with unrelated same-channel links, never link a page to itself, and avoid repeating the same destination in multiple generic modules.

The build intentionally fails when a public page has not been classified. This forces a placement decision before deployment instead of silently putting a new page in the wrong feed.
