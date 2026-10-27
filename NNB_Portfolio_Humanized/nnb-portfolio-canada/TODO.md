# NNB Portfolio : delivery outcomes

## Reusable editorial portfolio routes
- [x] Provide responsive routes for Home `/`, Work `/work/`, reusable Project pages `/work/project-name/`, Services `/services/`, reusable Service pages `/services/service-name/`, About `/about/`, Insights `/insights/`, reusable Article pages `/insights/article-name/`, Contact `/contact/`, Privacy/cookie information where applicable, and a useful 404 page.
- [x] Keep primary navigation on Work, Services, About, and Contact; keep Insights out of the main navigation until content is ready.
- [x] Use structured project, service, and article content so new items can be added without redesigning existing pages.

## Homepage and proof-led storytelling
- [x] Include a positioning statement, selected work, contribution/capabilities, a pre-launch/launch/post-launch campaign example, evidence guidance, an About preview, latest Insights, and a clear qualified-enquiry invitation.
- [x] Present named work where approved and NDA-labeled work where required, with no invented verified commercial claims.
- [x] Use repeatable project sections for client/sector/dates/summary, role, challenge, insight, strategy, execution, verified results, reflection, credits, and next step.

## Enquiry and privacy foundation
- [x] Provide a short enquiry form with required name, email, help needed, and brief fields plus optional company website, budget range, and timing.
- [x] Include server-side required-field and email validation, a spam honeypot, a professional email alternative, a privacy note, secret-safe configuration, and no enquiry data committed to the repository.
- [x] Include a starter privacy notice that calls out the need to confirm vendors, retention, consent, and applicable legal requirements before launch.

## Discovery and accessibility
- [x] Serve route-specific HTML titles and descriptions, canonical-ready metadata, Open Graph/Twitter metadata, route manifest, sitemap, robots, descriptive visual labels, and internal links.
- [x] Target WCAG 2.2 AA-minded interaction with semantic structure, labelled controls, keyboard-friendly navigation, visible focus, readable contrast, responsive type, and reduced-motion support.

## NNB design system
- [x] Use the supplied NNB logo and midnight navy, violet, white, and periwinkle palette with restrained editorial typography, tighter reading widths, asymmetrical compositions, premium pill CTAs, subtle motion, and responsive breakpoints.

## CMS and static publishing workflow
- [x] Provide a Decap CMS dashboard at `/admin/` with editable Projects, Services, Insights, Profile, and Additional proof highlights collections.
- [x] Move projects, services, articles, profile details, and proof highlights into structured repository content files so future publishing does not require template edits.
- [x] Add project `draft`, `active`, `completed`, and `confidential` states, `featured` and `priority` controls, and automatic public filtering so a draft project stays hidden until ready.
- [x] Add proof-media fields for image, type, caption, alt text, reporting period, and source; render selected evidence inside project pages without creating an awkward screenshot dump.
- [x] Add a static build that writes the full route set, 404 page, sitemap, robots, CMS dashboard assets, and Cloudflare Pages security headers into `dist/`.
- [x] Add a prefilled hidden Tarsim Institute draft with the 200-admission figure labelled as an in-progress target rather than an achieved result.

## Launch configuration still open
- [ ] Add an approved hosted form endpoint in Site settings and test static form delivery. The local/server endpoint validates, rate-limits, and acknowledges submissions without persisting message content; the static build currently falls back to opening an email draft.
- [ ] Create the owner GitHub repository, connect Cloudflare Pages, create Decap Turbo authentication, and replace the CMS placeholders with the final repository, Turbo site UUID, admin URL, and domain.
- [ ] Set `PUBLIC_ORIGIN` to the final owned domain at deployment so canonical URLs, Open Graph URLs, and absolute sitemap locations are production-ready.
- [ ] Replace the provisional email, LinkedIn URL, abstract visuals, and starter evidence language with approved personal details, assets, permissions, sources, and verified results where stronger source material becomes available.
- [ ] Review the final privacy notice, retention period, third-party vendors, consent controls, domain, redirects, security headers, and target-market obligations before public launch.
