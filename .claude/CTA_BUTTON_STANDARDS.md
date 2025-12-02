# CTA Button Standards

## Booking Link Standard

**CRITICAL RULE**: All "Book a Call", "Schedule a Call", and similar CTA buttons MUST use the Cal.com booking link.

### Standard Booking URL
```
https://cal.com/alexanderstefanseo/agency
```

## Required Implementation

Whenever you add ANY call-to-action button that invites users to book a call, consultation, or strategy session, you MUST use the Cal.com URL above.

### Common CTA Button Text Variations
All of these button texts should link to the Cal.com URL:
- "Book a Free Strategy Call"
- "Schedule Your Free Call"
- "Get Your Free Strategy Call"
- "Book a Call"
- "Schedule a Strategy Call"
- "Book a Consultation"
- "Get These Results" (on case study pages)

### HTML Button Format

Always use `<a>` tags (NOT `<button>` tags) for booking CTAs:

```html
<!-- ✅ CORRECT -->
<a href="https://cal.com/alexanderstefanseo/agency" class="btn btn-primary btn-large">
    Book a Free Strategy Call
</a>

<!-- ❌ WRONG - Don't use button tags -->
<button class="btn btn-primary btn-large">
    Book a Free Strategy Call
</button>

<!-- ❌ WRONG - Don't use internal anchor links -->
<a href="#contact" class="btn btn-primary">
    Book a Call
</a>

<!-- ❌ WRONG - Don't use index.html#contact -->
<a href="index.html#contact" class="btn btn-primary">
    Schedule a Call
</a>
```

## Where CTA Buttons Appear

CTA buttons with the Cal.com link should appear in these locations:

### 1. Homepage (index.html)
- Hero section CTA
- About section CTA
- Any other primary CTAs

### 2. Industry Landing Pages
- Hero section "Book a Free Strategy Call"
- Bottom CTA section "Schedule Your Free Call"

### 3. Case Study Pages
- Hero section "Get These Results"
- Bottom CTA section

### 4. Other Pages
- Case studies listing page
- Industries page
- Any page with a booking CTA

## Current Implementation Status

As of 2024-12-02, all CTA buttons across the site have been updated to use:
```
https://cal.com/alexanderstefanseo/agency
```

## Files Updated
- ✅ index.html (2 CTAs)
- ✅ case-studies.html (3 CTAs)
- ✅ industries.html (1 CTA)
- ✅ google-ads-towing-case-study.html (2 CTAs)
- ✅ wedding-photography-96-leads.html (2 CTAs)
- ✅ wedding-photography-leads.html (3 CTAs)
- ✅ All 10 industry landing pages (3 CTAs each):
  - towing-leads.html
  - car-detailing-leads.html
  - garage-door-leads.html
  - hvac-leads.html
  - plumbing-leads.html
  - electrician-leads.html
  - handyman-leads.html
  - carpet-cleaning-leads.html
  - pool-service-leads.html
  - epoxy-flooring-leads.html

## When Adding New Pages or CTAs

**Checklist for new CTA buttons:**
- [ ] Use `<a>` tag (not `<button>`)
- [ ] Set href to `https://cal.com/alexanderstefanseo/agency`
- [ ] Use appropriate CSS classes (btn btn-primary or btn btn-primary btn-large)
- [ ] Use clear, action-oriented button text
- [ ] Test that link opens Cal.com booking page

## Why This Matters

- **Consistent user experience** - All booking CTAs lead to the same place
- **No broken links** - Direct external link, no dependency on internal contact forms
- **Better tracking** - Single booking URL makes analytics cleaner
- **Professional** - Cal.com provides a polished booking experience

## Never Use These Links for Booking CTAs

❌ `href="#contact"`
❌ `href="index.html#contact"`
❌ `href="/contact"`
❌ Any mailto: links
❌ Any other booking systems

## Exception: Secondary Navigation

The only exception is the navigation menu "Contact" link, which can remain as `#contact` if there's a contact section on the page. However, any prominent CTA button should use Cal.com.
