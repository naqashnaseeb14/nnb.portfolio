#!/usr/bin/env sh
set -eu
node --check server.mjs
node --check src/content.mjs
node --check src/content-loader.mjs
node --check src/site.mjs
node --input-type=module -e "import('./src/content.mjs').then(({projects, services, articles, routeEntries}) => { if (!projects.length || !services.length || !articles.length || !routeEntries.length) process.exit(1); console.log('CMS content loaded:', projects.length, 'projects,', services.length, 'services,', articles.length, 'articles.'); })"
test -s admin/index.html
test -s admin/config.yml
test -s content/profile.json
test -s content/highlights.json
printf '%s\n' 'NNB portfolio source and CMS checks passed.'
