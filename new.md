# Adding New Pages/Posts: Interlinking Checklist

## Overview
Every new page or blog post should be strategically linked to existing content to:
- Improve user journeys (readers discover related content)
- Distribute SEO authority across your site
- Create topical clusters for better search rankings
- Increase time-on-site and conversions

---

## Content Hierarchy (Know Where Your Page Fits)

```
HOME (index.html)
│
├─ SERVICE PILLARS (authority pages)
│  ├─ google-ads-for-service-businesses
│  ├─ facebook-ads-lead-generation
│  └─ conversion-rate-optimization
│
├─ INDUSTRY PAGES (vertical-specific)
│  ├─ handyman-leads
│  ├─ appliance-repair-leads
│  ├─ google-ads-for-towing-companies
│  └─ [more industries...]
│
├─ BLOG POSTS (educational)
│  ├─ google-ads-pilot
│  ├─ facebook-ads-for-plumbers
│  └─ facebook-ads-for-yoga-studios
│
└─ CASE STUDIES (proof)
   ├─ google-ads-towing-case-study
   └─ wedding-photography-96-leads
```

---

## Interlinking Strategy by Page Type

### 1. NEW SERVICE PILLAR PAGE
*Example: If adding "Email Marketing for Service Businesses"*

**Links TO add (outbound):**
- [ ] Link to 2-3 relevant industry pages showing the strategy in action
  - Anchor: `"See how [industry] uses [service]"`
- [ ] Link to 1-2 case studies demonstrating results
  - Anchor: `"View [metric] results"`
- [ ] Link to related service pillars (if applicable)
  - Anchor: `"Combine with [service] for maximum impact"`

**Links FROM existing pages (inbound):**
- [ ] Add from relevant industry pages back to this pillar
  - Anchor: `"Complete [service] strategy"`
- [ ] Add from case studies that demonstrate this service
  - Anchor: `"Our [service] methodology"`
- [ ] Add from homepage (if it's a major offering)
  - Anchor: `"[Service] services"`

**Example placement:**
```html
<!-- In service pillar body (around 70% down) -->
<h2>See It In Action</h2>
<p>This methodology has helped handymen, plumbers, and appliance repair 
businesses increase leads by 300%. 
<a href="handyman-leads">See how handymen use this strategy</a> or 
<a href="google-ads-towing-case-study">read our $18.53 cost-per-call case study</a>.</p>
```

---

### 2. NEW INDUSTRY PAGE
*Example: If adding "HVAC Leads" or "Electrician Leads"*

**Links TO add (outbound):**
- [ ] Link to relevant service pillars (which platform applies)
  - Anchor: `"Google Ads strategy for [industry]"` or `"Facebook Ads for [industry]"`
- [ ] Link to 1-2 related industry pages (similar service types)
  - Anchor: `"Like [similar industry], [industry] also benefits from..."`
- [ ] Link to case studies (if one exists for this industry)
  - Anchor: `"See real results for [industry]"`
- [ ] Link to CRO if page discusses conversion optimization
  - Anchor: `"Optimize your landing page"`

**Links FROM existing pages (inbound):**
- [ ] Add from relevant service pillar page
  - Anchor: `"[Industry] lead generation"` or `"See how [industry] gets results"`
- [ ] Add from related industry pages (reciprocal linking)
  - Anchor: `"[New industry] also uses this approach"`
- [ ] Add from industries.html (main industries hub)
  - Anchor: `"[Industry] marketing"`

**Example placement:**
```html
<!-- In industry page body (around 60% down) -->
<h2>Related Service Businesses</h2>
<p>Like <a href="handyman-leads">handymen and appliance repair</a>, 
electricians benefit from the same lead generation strategies. 
<a href="google-ads-for-service-businesses">See our proven approach</a>.</p>
```

---

### 3. NEW BLOG POST
*Example: If adding "Why Your Google Ads Budget Is Wasted" or "Facebook Ads Mistakes"*

**Links TO add (outbound):**
- [ ] Link to relevant service pillar (the full strategy)
  - Anchor: `"Our complete [service] strategy"` or `"Master [service]"`
  - Placement: In conclusion section as natural next step
- [ ] Link to related blog posts (if applicable)
  - Anchor: `"Read our [related topic] post"`
  - Placement: End of post as "Related articles"
- [ ] Link to case studies demonstrating the point
  - Anchor: `"See this in a real $X case study"` or `"View real results"`
  - Placement: In body when making claims (proof)
- [ ] Link to industry page if post is industry-specific
  - Anchor: `"[Industry] lead generation strategy"`

**Links FROM existing pages (inbound):**
- [ ] Add from relevant service pillar
  - Anchor: `"Read our [topic] deep-dive"`
- [ ] Add from blog.html (latest posts already show, but link from related)
  - Handled by posts.json automatic display
- [ ] Add from homepage (if newsworthy/timely)
  - Anchor: `"New: [title]"`

**Example placement:**
```html
<!-- At end of blog post -->
<div class="post-cta">
  <h3>Ready to Master This?</h3>
  <p>This mistake costs thousands. <a href="google-ads-for-service-businesses">
  Learn our proven methodology</a> to avoid it.</p>
  <a href="https://cal.com/..." class="btn">Schedule a strategy call</a>
</div>

<!-- Related articles section -->
<div class="related-posts">
  <h3>Related Reading</h3>
  <ul>
    <li><a href="facebook-ads-for-plumbers">Facebook Ads for Plumbers</a></li>
    <li><a href="google-ads-pilot">The Google Ads Pilot Approach</a></li>
  </ul>
</div>
```

---

### 4. NEW CASE STUDY
*Example: If adding a new client result (towing, photography, plumbing, etc.)*

**Links TO add (outbound):**
- [ ] Link to relevant service pillar (your methodology)
  - Anchor: `"Our [service] methodology"` or `"See our proven approach"`
  - Placement: Strategy section
- [ ] Link to conversion-rate-optimization (if conversion rate was key)
  - Anchor: `"Landing page optimization"` or `"Conversion techniques"`
  - Placement: Results section if mentioning high conversion %
- [ ] Link to related case studies (similar metrics/industry)
  - Anchor: `"See another case study with similar results"`
  - Placement: Conclusion as "Want similar results?"

**Links FROM existing pages (inbound):**
- [ ] Add from relevant service pillar page
  - Anchor: `"See [metric] results"` or `"[Client type] case study"`
  - Placement: Results/proof section on pillar
- [ ] Add from case-studies.html (hub page)
  - Handled by automatic listing if page follows naming convention
- [ ] Add from relevant industry page (if applicable)
  - Anchor: `"Real [industry] results"` or `"View our case study"`

**Example placement:**
```html
<!-- In case study "Our Strategy" section -->
<p>We applied <a href="google-ads-for-service-businesses">our proven 
service business methodology</a> and optimized for 
<a href="conversion-rate-optimization">maximum conversion rate</a>.</p>

<!-- In conclusion -->
<p>Ready for similar results? <a href="https://cal.com/">Book a strategy call</a> 
or <a href="wedding-photography-96-leads">see another case study</a>.</p>
```

---

## Quick Checklist for New Pages

### Before Publishing:

- [ ] **Identify page type:** Service Pillar / Industry / Blog / Case Study / Other
- [ ] **Find 2-3 pages to link TO** (natural contextual links)
- [ ] **Find 2-3 pages to link FROM** (get inbound links)
- [ ] **Create anchor text** that describes the destination (avoid "click here")
- [ ] **Test all internal links** work (no 404s)
- [ ] **Check for relevance** - don't force links that don't make sense
- [ ] **Verify responsive** - links work on mobile/desktop
- [ ] **Add page to posts.json** (if blog post) with metadata

### After Publishing:

- [ ] **Go back and add inbound links** from pages you linked to
  - Usually: edit 3-5 existing pages to link back to the new page
- [ ] **Update sitemap.xml** with new page URL and lastmod date
- [ ] **Update robots.txt** if page should be excluded
- [ ] **Add to XML sitemap** and/or internal link index
- [ ] **Monitor 30 days** for traffic to new page

---

## Interlinking Principles

### DO:
✅ Link when there's genuine relevance (reader will find it useful)
✅ Use descriptive anchor text (explains what they're linking to)
✅ Distribute links naturally throughout the page (don't cram at bottom)
✅ Link UP the hierarchy (blog → pillar, industry → service page)
✅ Link ACROSS the same level (industry ↔ industry, blog ↔ blog)
✅ Reciprocate important links (if A links to B, B should link back to A)
✅ Use relative URLs: `href="handyman-leads"` not full domain

### DON'T:
❌ Force links that don't make sense (reader will bounce)
❌ Use generic anchor text like "Click here" or "Learn more"
❌ Link to competitor pages from your site
❌ Link to pages with poor user experience
❌ Add so many links the page becomes "link spam"
❌ Link to broken/404 pages
❌ Use absolute URLs for internal links

---

## Anchor Text Formula

Good anchor text tells the reader what they'll find:

```
[Action Verb] + [Topic] + [Benefit/Outcome]
```

### Examples:

**Good:**
- "See how handymen generate leads with Google Ads"
- "Our complete Facebook Ads strategy"
- "View $18.53 cost-per-call results"
- "Master conversion-rate optimization techniques"
- "Discover towing company marketing strategies"

**Bad:**
- "Click here"
- "Learn more"
- "Read this"
- "See our blog"
- "More information"

---

## Link Relationship Map Reference

Keep this handy when adding new content:

```
Service Pillar Pages →
  ├─ Link OUT TO: Industry pages (show it in action)
  ├─ Link OUT TO: Case studies (show results)
  ├─ Receive FROM: Industry pages
  ├─ Receive FROM: Blog posts
  └─ Receive FROM: Case studies

Industry Pages →
  ├─ Link OUT TO: Service pillars (methodology)
  ├─ Link OUT TO: Related industries (similar services)
  ├─ Link OUT TO: Case studies (if exists for industry)
  └─ Receive FROM: Service pillars

Blog Posts →
  ├─ Link OUT TO: Service pillars (full strategy)
  ├─ Link OUT TO: Related blog posts
  ├─ Link OUT TO: Case studies (proof)
  └─ Receive FROM: Service pillars

Case Studies →
  ├─ Link OUT TO: Service pillars (methodology)
  ├─ Link OUT TO: Related case studies
  └─ Receive FROM: Service pillars & Industry pages
```

---

## Examples in Action

### Example 1: Adding New Blog Post "Google Ads for Electricians"
**Links TO add:**
- Body paragraph: Link to `google-ads-for-service-businesses` (methodology)
- Body paragraph: Link to `google-ads-pilot` (testing approach)
- Conclusion: Link to booking page

**Links FROM existing:**
- Edit `google-ads-for-service-businesses` → add link to this new post
- Edit `electrician-leads` (if exists) → add link to this post
- Keep in blog.html feed automatically

---

### Example 2: Adding New Case Study "HVAC Company Generates 200 Leads"
**Links TO add:**
- Intro: Link to `google-ads-for-service-businesses` (our approach)
- Results: Link to `conversion-rate-optimization` (how we got 20% conversion)
- Conclusion: Link to booking

**Links FROM existing:**
- Edit `google-ads-for-service-businesses` → add "See HVAC results"
- Edit `hvac-leads` (if exists) → add "View case study"
- Auto-listed on case-studies.html

---

## Long-Term Strategy

After adding 5-10 new pages, review:
- Are all service pillars linked to most relevant industry pages?
- Are all blog posts linked to appropriate service pillars?
- Are all case studies linked to relevant methodologies?
- Are related-level pages (industry ↔ industry) linked?

This creates a **content ecosystem** where:
- Users naturally flow from awareness (blog) → consideration (industry page) → decision (case study) → action (book call)
- SEO authority compounds (every page links to every relevant page)
- Bounce rate decreases (readers always find relevant next step)
- Time-on-site increases (more pages to explore)

---

## Questions?

This guide covers ~95% of new content scenarios. If adding an unusual page type, ask:
1. Where does this fit in the hierarchy?
2. What 2-3 existing pages would a reader want to see?
3. What 2-3 existing pages would link to this?
4. What anchor text naturally describes this?
