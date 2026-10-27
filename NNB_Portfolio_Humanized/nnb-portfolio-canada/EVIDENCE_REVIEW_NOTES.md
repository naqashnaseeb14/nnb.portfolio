# NNB portfolio : supplied evidence integration

Updated: 27 October 2026

This is a client-facing portfolio draft with source-grounded proofs. **Review rights and publication approval before uploading to a public domain.** The original reports and client ZIP archives are intentionally not included in this package.

## Changes incorporated

- Original NNB logo replaced with the user-supplied higher-quality artwork.
- Actual professional portrait added to the Home and About pages.
- Original logo animation preserved in `public/assets/nnb-mark-animation.mp4` but not set to autoplay; it is available to add deliberately later.
- Recreated, anonymous content-calendar illustration added to the Home page, drawing only on the structure of the supplied real-estate planning workbook. The original client, campaign copy, dates and data are omitted.
- Anonymized hotel proof panel documents **13 Nov–13 Dec 2025** combined Meta content views: Instagram 22,182 (9,368 organic and 12,814 ads); Facebook 150,509 (6,986 organic and 143,523 ads). This includes a separate paid campaign and is *not* an organic-only result attributable to Naqash.
- Industrial case study adds source-based organic reporting windows: Instagram 5,374 (Nov–Dec) and 2,539 (Dec–Jan); Facebook 5,406 (Dec–Jan). The 65 calls / PKR 276 claim comes from the supplied case narrative and still requires original ad-platform confirmation.
- Dental case adds a source-based panel showing 16,854 organic Instagram views, around 2.6K reach, and 222 interactions (6 Nov–3 Dec 2025), plus two creative samples with client-identity details obscured. The panels do not claim bookings or medical outcomes.
- Two separate, clearly labeled **non-client organic-platform examples** added: an in-house sports interest page (515,552 and 57,872 post views in uploaded screenshot evidence) and an anonymous fragrance TikTok account (10.3K views; 94% For You traffic).
- The education admissions project is still set to `status: draft` and is not published. Project and participant approval required.

## Before public launch

1. Get written permission to showcase any supplied client imagery or reports, including anonymized excerpts. Redaction does not substitute for publication rights.
2. Confirm every public case study accurately separates Naqash's personal work from the wider team and from paid advertising managed by someone else.
3. Check date windows and metric definitions against platform exports and review whether metrics represent changes, totals, views, or viewers.
4. Secure evidence or remove the 65 calls / PKR 276 figure if unable to verify its ad-platform source and reporting period.
5. Verify client or employee proprietary materials (e.g., source content calendars) were used under permitted conditions; only a recreated, anonymous example is currently shipped.
6. Verify the contact form endpoint before deployment (`content/profile.json` currently has a blank endpoint).
7. For production builds run dependency installation, then `npm run build:static`. The ZIP contains the prebuilt `dist/` folder for static hosting.

## Technical checks performed

- 17 routes generated; 19 HTML pages including admin and 404.
- No broken local links or image paths found by static audit.
- Desktop and mobile preview render validated; education draft absent from published routes.
- Original user reports/ZIPs/images are not copied into this package beyond the selected, processed public-website derivatives.
