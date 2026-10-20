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

## Senior-care content boundaries

Senior-care clusters are separated by service and operator workflow, not geography alone. Care-home content focuses on residential personal care, family visits and suitability assessments. Nursing-home content focuses on verified nursing provision and admissions/referral pathways, with long-term and short-stay services kept distinct. Explain that care home can include nursing, SNF is a specific US term, assisted living has a distinct service model, and retirement housing does not automatically include care. Use `scripts/lib/senior-care-guide-content.js` for separate ad-guide briefs; do not generate paired articles by substituting industry names. Preserve contextual links between each hub and its guides.

## Calls to action

Use the shared styles in `cta.css` for CTA panels. Keep the panel focused: a specific outcome-led heading, one short sentence, one primary booking button, and at most one relevant secondary resource link. Put detailed advice, tracking checklists and channel comparisons in the body before the CTA, not inside a large promotional text block. Use `.action-card` for a compact inline CTA and existing `.intent-cta-panel` or `.post-cta` components for final page CTAs. Verify button contrast, keyboard focus and mobile stacking. Do not invent performance guarantees or add unrelated links.

The build intentionally fails when a public page has not been classified. This forces a placement decision before deployment instead of silently putting a new page in the wrong feed.
