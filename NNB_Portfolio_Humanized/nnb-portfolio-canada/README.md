# NNB Portfolio

A personal portfolio for Naqash Naseeb Bhatti, positioned as a Digital Campaign & Content Strategist for Canadian hospitality, education, and real estate businesses.

## Publishing workflow

Projects, services, articles, profile details, proof highlights, and uploaded media are managed through structured files under `content/`. The Decap CMS dashboard is served at `/admin/` and is configured in `admin/config.yml`.

The public site automatically:

- keeps `status: draft` projects and `published: false` articles out of public routes;
- orders homepage case studies using `featured` and `priority`;
- renders selected proof media with captions, alt text, periods, and sources;
- compresses CMS image uploads to WebP through the Decap media-processing settings.

Read [LAUNCH_GUIDE.md](LAUNCH_GUIDE.md) for the non-technical domain, GitHub, Cloudflare Pages, CMS, image, Tarsim, and publishing steps.

## Run locally

```bash
pnpm install
npm start
```

The server listens on port `3000` by default. The Preview server serves the editorial website and `/admin/` dashboard.

## Checks and static deployment build

```bash
npm run check
npm run build:static
```

`build:static` writes the complete static website to `dist/`, including route pages, `404.html`, sitemap, robots, CMS assets, and the email fallback form. Cloudflare Pages should use:

```text
Build command: pnpm install --frozen-lockfile && pnpm run build:static
Output directory: dist
```

Set `PUBLIC_ORIGIN` to the final HTTPS domain at deployment time so canonical links, social URLs, and the sitemap use the owned domain.

## Important content rules

Keep targets separate from achieved results. For live work such as Tarsim Institute, use `resultStatus: in-progress` and label the 200-admission figure as a target until approved reporting confirms the outcome. Remove private client data, personal contact information, account IDs, and confidential screenshots before uploading proof.

## Canadian client edition

See [CANADA_CLIENT_LAUNCH_CHECKLIST.md](CANADA_CLIENT_LAUNCH_CHECKLIST.md) for changes, evidence requirements, and the education-project publication safeguard. The included `dist/` folder is a prebuilt static preview; the source content remains editable.

## Copy edit, October 2026

Public website text was rewritten in a more natural first-person voice. The public copy does not mention Naqash's employer, and long em dashes have been removed. The case studies retain clear boundaries between Naqash's work and work by other specialists. After editing a page, run `npm run build:static` before publishing `dist/`.
