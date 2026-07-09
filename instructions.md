# OTOKA — Site Conversion Instructions (Shop → Landing Page + Gallery)

## Purpose
The OTOKA site currently exists as a shop-style site (built with HTML, CSS, and JS, with React Bits components/backgrounds as islands). This document instructs the AI to **restructure the site's content and page set** — turning it from an e-commerce shop into a landing page + gallery site, ahead of the store launching.

---

## ⚠️ CRITICAL CONSTRAINT — READ FIRST

**Do NOT change any design elements.** This includes:
- Color palette, typography, spacing, and visual style
- The existing CSS in `/css` (base, layout, components, page styles) — reuse it, don't rewrite it
- Any React Bits components/backgrounds already implemented — keep them exactly as they are, just reposition/reuse them if needed for new sections
- Header, footer, button styles, card styles, animations, hover states — all stay as-is
- General layout patterns (grid systems, section spacing, container widths)

**What changes is content and page structure — not the design system.** Think of this as re-skinning the *information architecture* while keeping every visual building block identical. If a new section is needed, build it using existing CSS classes/components wherever possible rather than inventing new styles.

---

## 1. What's Being Removed

Remove all shop/e-commerce functionality and pages:
- `shop.html` (product grid, filters, sort)
- `product.html` (product detail template)
- `cart.html` / cart drawer logic (`cart.js`)
- `wishlist.js`
- `checkout.html`
- `sizing-guide.html`
- `shipping-returns.html` (unless repurposed — see below)
- `shop-filters.js`, `product-detail.js`
- `products.json` and `/images/products` references in nav/UI (product images can stay in the repo but aren't linked from shop pages anymore)
- Remove "Shop", "Cart", and wishlist icons/links from the header nav and anywhere else they appear (e.g. homepage CTAs like "Shop the Drop")

---

## 2. New Site Structure

```
/index.html                   → Landing page (see section 3)
/gallery.html                 → Gallery (replaces lookbook.html — same content type, renamed/expanded)
/about.html                   → About Us (expanded from existing brand story content)
/running-club.html            → Running Club — Coming Soon
/contact.html                 → Contact (keep as-is, minor content review)
/faq.html                     → Keep if still relevant; otherwise fold key Q&A into About or remove
```

Remove shop-related nav items. Updated header nav should read something like:
**Home | Gallery | About | Running Club | Contact**

Footer stays structurally the same (same CSS/layout) but update links to match the new page set, and ensure newsletter signup + social links are present (see sections 4–5).

---

## 3. Landing Page (`index.html`)

Rebuild the homepage as a single-scroll landing page using existing section styles/components. Suggested section order:

1. **Hero** — reuse existing hero section/React Bits background. Update copy to introduce OTOKA as a brand (not a shop) — tagline + short intro line. CTA button can point to About or Gallery instead of Shop.
2. **About Us teaser** — pull key language from the existing About/brand story content (founding story, Otwiine + Lui, Kampala running culture, mission). Keep it brief here; full version lives on `about.html`. Include a "Learn More" link to `/about.html`.
3. **Gallery preview** — a small grid/strip (3–6 images) pulled from the gallery, using the same masonry/grid styling already built. Link through to `/gallery.html` ("View Full Gallery").
4. **Running Club — Coming Soon** — dedicated section with a short teaser (what it is, why it's coming, rough timing if known) and a CTA linking to `/running-club.html`. Reuse existing card/section styling — this can look similar to the old "Featured Drops" section structurally, just repurposed.
5. **Newsletter signup** — see section 4. Place here and/or in the footer.
6. **Social links / Instagram feed** — reuse the existing Instagram feed embed/grid component if already built; otherwise a simple social icon row is fine (see section 5).

---

## 4. Newsletter Subscription

- Reuse the existing newsletter component/markup if one was already built for the old homepage or footer — do not restyle it.
- If none exists yet, build it using existing input/button styles from `/css/components.css` (should look like other form elements already in use, e.g. contact form).
- Form fields: email input + submit button. Optional: name field.
- On submit: wire to whatever service is easiest to integrate without a backend (e.g. Mailchimp/ConvertKit embed form, or a simple `fetch()` POST to a form endpoint like Formspree/Web3Forms — Otwiine has used Web3Forms before for his portfolio contact form, so that's a safe default if no other preference is given).
- Include this on the landing page and in the footer so it's accessible from every page.

---

## 5. Social Links

- Add a social links row/section (reuse existing icon styling if social icons already exist in the footer)
- Links: Instagram (instagram.com/otwiine), X (x.com/Mr_OJO16) — update/add OTOKA-specific brand social accounts here once they exist, using the same two as placeholders/structure if brand-specific ones aren't set up yet
- Place in footer (persistent across all pages) and optionally as a standalone section on the landing page

---

## 6. About Us Page (`about.html`)

Expand using **existing site copy/info only** — do not invent brand facts. Pull from:
- Existing About/brand story content already on the site
- Founding story: OTOKA co-founded by Otwiine Olweny and Lui
- Kampala/Uganda running and athletics culture angle
- Mission/values as already established in the current site content

Structure (using existing section/typography styles):
- Brand story (full version)
- Mission/values
- Founders section (if photos/bios exist or are provided)
- Optional: link back to Gallery or Running Club at the bottom as a natural next step

---

## 7. Gallery Page (`gallery.html`)

- This is effectively the existing `lookbook.html` — rename the file/route and update nav references, but **do not change the masonry/grid layout or image styling.**
- If products were tagged in images (from the old shop functionality), remove the product-tagging/click-through interaction since there's no product page to link to anymore — images become purely visual/gallery content.
- Keep captions/alt text if already present.

---

## 8. Running Club — Coming Soon (`running-club.html`)

New page, but should **look like it belongs** — build it using existing section/card/CTA styles so it feels native to the site, not bolted on.

Content:
- Headline: e.g. "OTOKA Running Club — Coming Soon"
- Short description of what the club will be (community runs, events, etc. — keep generic/aspirational since details aren't finalized)
- "Coming Soon" badge/label (reuse existing badge styling from the old stock-status badges if applicable — e.g. same visual treatment as "Sold Out"/"Low Stock" tags, repurposed)
- Newsletter signup embedded here too, framed as "Be the first to know when the club launches"
- Social links for updates

---

## 9. Cleanup Checklist for the AI

- [ ] Remove shop/cart/wishlist/checkout pages and their JS files
- [ ] Remove shop/cart links from header and footer nav
- [ ] Update all internal links site-wide (no broken links to removed pages)
- [ ] Confirm `/css` files are untouched except where new sections reuse existing classes
- [ ] Confirm React Bits islands still mount correctly on their new pages/sections
- [ ] Test newsletter form submission (or clearly comment `// TODO: connect real form endpoint` if credentials aren't available)
- [ ] Test responsive layout on all new/changed pages (mobile nav, mobile gallery grid, etc.) — should behave the same as it did pre-conversion since layout CSS is unchanged
- [ ] Double-check no leftover references to "Shop", "Cart", "Add to Cart", "Checkout" anywhere in copy or code comments

---

## 10. Notes for the AI Assistant
- This is a content/IA (information architecture) change, not a redesign. If you find yourself writing new CSS rules or changing existing values (colors, fonts, spacing units), stop — that's out of scope unless explicitly instructed.
- Reuse, rename, and reposition existing components/sections wherever the content fits, rather than building new ones from scratch.
- Where brand facts aren't available in existing site content (e.g. exact Running Club launch date), keep language intentionally vague ("coming soon", "stay tuned") rather than inventing specifics.
