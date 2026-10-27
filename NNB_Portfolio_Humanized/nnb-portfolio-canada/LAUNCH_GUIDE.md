# NNB Portfolio launch guide

This guide is written for the person who owns the portfolio, not for a developer.

## What has already been prepared

The website now has:

- A Git-backed content system for projects, services, articles, profile details, and proof highlights.
- A CMS dashboard at `/admin/`.
- A proof-media field that uploads and compresses images to WebP.
- A `featured` and `priority` control for choosing the homepage lead project.
- A draft Tarsim Institute case study that is hidden from the public site until it is ready.
- A static build command for Cloudflare Pages: `pnpm install --frozen-lockfile && pnpm run build:static` with output directory `dist`.
- A static deployment fallback for the contact form. It opens an email draft until an approved hosted form endpoint is added.

Do not manually drag the project files one by one. After you create the empty GitHub repository, the prepared project should be pushed into it as one complete source tree.

## Step 1: Buy the domain

Namecheap and Hostinger are both reasonable places to register a domain. Buy the **domain only**. You do not need to buy their hosting, website builder, SSL package, or email package for this setup.

During checkout:

1. Choose the domain you want to use.
2. Enable domain privacy / WHOIS privacy if it is included.
3. Keep access to the registrar account.
4. Do not send your password, recovery codes, or payment information to anyone in chat.

Keep the registrar account because you will later paste Cloudflare’s nameservers there. The domain stays registered at Namecheap or Hostinger; Cloudflare only manages DNS and delivery.

## Step 2: Create the GitHub repository

1. Go to [GitHub](https://github.com/) and create an account if you do not already have one.
2. Create a new repository named `nnb-portfolio`.
3. Leave it empty. Do not add a README, `.gitignore`, or license during creation.
4. A private repository is fine. A public repository is also fine if you are comfortable with the source code being visible.
5. Do not create files manually in GitHub. Tell me the repository URL and your GitHub username, and I can connect the prepared project to it.

The repository is the source of truth. The website, CMS, and deployment will all read from this repository.

## Step 3: Create the free deployment layer

Create an account at [Cloudflare](https://dash.cloudflare.com/). You will use Cloudflare Pages to build and deliver the site from GitHub.

When the GitHub repository is ready:

1. Open **Workers & Pages** in Cloudflare.
2. Choose **Create application** and then **Pages**.
3. Choose **Connect to Git**.
4. Connect GitHub and select `nnb-portfolio`.
5. Use these build settings:

```text
Build command: pnpm install --frozen-lockfile && pnpm run build:static
Output directory: dist
Root directory: /
Production branch: main
```

6. Add this environment variable in the Cloudflare Pages project:

```text
PUBLIC_ORIGIN=https://YOUR-DOMAIN.com
```

Replace `YOUR-DOMAIN.com` with the actual domain, without a trailing slash.

7. Add the custom domain in **Custom domains**.

For the simplest apex domain setup, Cloudflare will give you two nameservers. Copy those nameservers exactly into the domain’s nameserver settings at Namecheap or Hostinger. Do not delete existing email records if you already use email on the domain. Cloudflare’s official guides are [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/) and [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Step 4: Connect the CMS login

The CMS is Decap CMS. It stores content in your GitHub repository, so there is no separate database to manage.

The easiest login route for a non-technical owner is Decap Turbo:

1. Create a Decap Turbo account at [Decap Turbo](https://decapcms.org/).
2. Create a site inside Turbo.
3. Connect the site to the GitHub repository.
4. Add this CMS URL to the site’s allowed admin URLs:

```text
https://YOUR-DOMAIN.com/admin/
```

5. Copy the Turbo site UUID.
6. Send me the UUID and repository URL. I will replace the temporary GitHub backend line with the final `turbo-github` configuration.

The final backend configuration will look like this:

```yaml
backend:
  name: turbo-github
  turbo_site_id: YOUR_TURBO_SITE_UUID
  branch: main
```

Decap’s official explanation is in the [GitHub backend guide](https://decapcms.org/docs/github-backend/) and [Turbo site connection guide](https://decapcms.org/docs/turbo-connecting-a-site/). Your content stays in your GitHub repository; Turbo handles the editor authentication and GitHub API connection.

## Step 5: Open the dashboard

After Cloudflare and the CMS are connected, visit:

```text
https://YOUR-DOMAIN.com/admin/
```

Log in with the CMS method we finish in Step 4. Do not use `/admin/` as a normal public navigation page. It is your private publishing workspace.

## Step 6: Add images to a project

Open **Projects**, then open a project such as the Tarsim draft.

Scroll to **Proof images** and add each image as a separate item. For every image:

1. Click **Image**.
2. Upload or choose the image.
3. Choose one type: `cover`, `proof`, or `process`.
4. Write a short caption explaining what the image proves.
5. Write alt text describing the visual for accessibility.
6. Add the reporting period.
7. Add the source, such as an approved platform report or client-approved record.
8. Save the project.

Use this image sequence:

- One clean cover visual.
- Two to four proof images.
- One process image only if it helps explain how the work was delivered.

The website places the images inside the case-study story with captions. It will not create a random gallery at the bottom of the page.

Before upload, crop screenshots consistently and remove private names, phone numbers, account IDs, customer data, and confidential campaign information. Use approved evidence only.

## Step 7: Complete the Tarsim case study

The Tarsim draft is already created but hidden. Fill it in with:

1. The starting admissions situation.
2. The audience and admissions journey.
3. Your role in strategy, performance oversight, team management, DVC coordination, and performance marketing.
4. The DVC production and launch process.
5. The media and performance approach.
6. Approved funnel numbers such as enquiries, qualified leads, applications, and admissions.
7. The reporting period and source for every number.
8. What is still in progress.

Keep the current status as `in-progress` while the engagement is live. Write **Target: 200 admissions** until 200 admissions has actually been reached and verified. Never show the target as an achieved result.

## Step 8: Add a future project

To add a new project:

1. Open **Projects**.
2. Click **New Project**.
3. Write the project title as a change or decision, not only the client name.
4. Add the client or an NDA-safe disclosure label.
5. Add your role, challenge, insight, strategy, execution, result, reflection, and credits.
6. Add selected proof images with captions and sources.
7. Set `status` to `draft` while writing.
8. Set `featured` to `false` until the case study is approved.
9. Save the draft and review it.
10. When ready, set `status` to `active` or `completed` and save.
11. Set `featured` to `true` and `priority` to `1` when it should lead the homepage.

The homepage automatically selects featured projects by priority. You do not need to redesign the homepage for every new client.

## Step 9: Add an article

Open **Insights** and click **New Article**. Add the title, description, category, reading time, intro, and sections. Keep `Published` off while drafting. Turn it on only after review.

Insights are intentionally not in the main navigation yet. When there are several strong articles, we can add the link to the main navigation.

## Step 10: Contact form before launch

The static build currently uses a safe email fallback. If a visitor submits the form before a hosted form endpoint is configured, the browser opens an email draft.

Before public launch, choose an approved hosted form or email endpoint. Do not paste a secret token into the CMS or public code. Once the endpoint is ready, add it in:

```text
Admin → Site settings → Profile and contact → Hosted enquiry form endpoint
```

Save the profile, publish it, and test the form from a private browser window.

## What you need to send me after buying the domain

Send only these non-sensitive details:

1. The domain name.
2. Your GitHub username.
3. The new GitHub repository URL.
4. The Cloudflare Pages project URL after the first connection, if Cloudflare gives you one.
5. The Decap Turbo site UUID after you create it.

Do not send passwords, credit-card details, recovery codes, or private API tokens. After those account-specific steps, I can finish the repository connection, domain metadata, CMS authentication, Tarsim publication, and final launch checks.
