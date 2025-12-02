# Case Study Addition Workflow

## Rule: Always Update Homepage When Adding Case Studies

**CRITICAL RULE**: Whenever a new case study is added anywhere on the site, you MUST update the "Real Results for Real Businesses" section on the homepage (index.html).

## Required Steps for Every Case Study Addition

When adding a new case study, follow these steps **in order**:

### 1. Create the Case Study Page
- Create the full case study HTML page (e.g., `industry-service-case-study.html`)
- Include all case study details, metrics, video embed, and content

### 2. Add to Case Studies Page
- Add the case study card to `case-studies.html` in the main listing
- Use the large case study card format with thumbnail image
- Include key metrics and description

### 3. **MANDATORY: Update Homepage**
- **File**: `index.html`
- **Section**: "Real Results for Real Businesses" (around line 120-217)
- **Action**: Replace one of the placeholder case studies with the new real case study
- **Format**: Use the `case-study-card` component with:
  - YouTube video embed iframe
  - Case study title
  - Brief description with key metrics
  - Link to full case study page
  - Arrow icon for "Read Full Case Study"

### 4. Add to Relevant Industry Page (if applicable)
- If the case study relates to a specific industry aggregate page (e.g., `wedding-photography-leads.html`)
- Add it to the Case Studies section on that industry page
- Use either the featured widget format or resource card format

### 5. Update Sitemap
- Add the new case study URL to `sitemap.xml`
- Set appropriate priority (0.8 for case studies)
- Update lastmod date

## Homepage Case Study Card Template

```html
<!-- Case Study -->
<a href="CASE-STUDY-PAGE.html" class="case-study-card-link">
    <div class="case-study-card">
        <div class="video-wrapper">
            <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Case Study Title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="case-study-content">
            <h3 class="case-study-title">Case Study Title</h3>
            <p class="case-study-description">
                Brief description highlighting key metrics and results achieved.
            </p>
            <span class="case-study-link">
                Read Full Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
    </div>
</a>
```

## Current Homepage Case Studies

As of 2024-12-02, the homepage displays 3 case studies:

1. **Towing Company** - $18.53 cost per call (google-ads-towing-case-study.html)
2. **Wedding Photography** - 96 leads in 30 days (wedding-photography-96-leads.html)
3. **Placeholder** - Local Service SEO (placeholder, needs replacement)

## Priority Order for Homepage

When adding new case studies to homepage, prioritize:
1. **Most recent** case studies first
2. **Best performing** metrics (highest ROAS, conversion rate, or lead volume)
3. **Diverse industries** - showcase variety of service businesses

## Why This Rule Exists

The homepage "Real Results for Real Businesses" section is:
- The first impression for new visitors
- A key trust-building element
- A conversion driver for booking strategy calls
- High-visibility real estate that should always showcase the latest, best results

**Failing to update the homepage means the best social proof is hidden from the majority of site visitors.**

## Checklist for Case Study Addition

- [ ] Create case study page
- [ ] Add to case-studies.html
- [ ] **Update index.html homepage section**
- [ ] Add to relevant industry page (if applicable)
- [ ] Update sitemap.xml
- [ ] Commit with descriptive message
- [ ] Push to repository
