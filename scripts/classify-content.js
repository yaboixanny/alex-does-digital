const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'content-registry.json');
const VALID = ['service', 'industry', 'guide', 'case-study', 'hub', 'static', 'legal'];
const IGNORE = new Set(['404', 'blog', 'blog-post-template', 'case-study-template', 'facebook-ads-post-template', 'industry-template', 'index']);
const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
const slugs = fs.readdirSync(ROOT).filter(file => file.endsWith('.html')).map(file => file.replace(/\.html$/, '')).filter(slug => !IGNORE.has(slug));
const unknown = slugs.filter(slug => !registry[slug]);

if (!unknown.length) {
  console.log('All public pages are classified in content-registry.json.');
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = question => new Promise(resolve => rl.question(question, resolve));

(async () => {
  console.log(`Classify ${unknown.length} new page(s). Valid roles: ${VALID.join(', ')}`);
  for (const slug of unknown) {
    let role = '';
    while (!VALID.includes(role)) {
      role = (await ask(`Role for /${slug}: `)).trim().toLowerCase();
      if (!VALID.includes(role)) console.log(`Choose one of: ${VALID.join(', ')}`);
    }
    registry[slug] = role;
  }
  const sorted = Object.fromEntries(Object.entries(registry).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(REGISTRY_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
  rl.close();
  console.log(`Updated content-registry.json with ${unknown.length} page(s). Run npm run build to place them in the correct architecture.`);
})().catch(error => { rl.close(); console.error(error); process.exit(1); });
