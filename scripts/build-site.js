const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'dist');
const EXCLUDED_TEMPLATES = new Set([
  'blog.html',
  'blog-post-template.html',
  'case-study-template.html',
  'facebook-ads-post-template.html',
  'industry-template.html'
]);
const PUBLIC_FILES = [
  '_redirects',
  'robots.txt',
  'script.js',
  'site.css',
  'sitemap.xml',
];

function copy(source, destination) {
  fs.cpSync(source, destination, { recursive: true });
}

fs.rmSync(OUTPUT, { recursive: true, force: true });
fs.mkdirSync(OUTPUT, { recursive: true });

const htmlFiles = fs.readdirSync(ROOT).filter(file => (
  file.endsWith('.html') && !EXCLUDED_TEMPLATES.has(file)
));

for (const file of htmlFiles) {
  copy(path.join(ROOT, file), path.join(OUTPUT, file));
}

for (const file of PUBLIC_FILES) {
  copy(path.join(ROOT, file), path.join(OUTPUT, file));
}

const publicImages = [
  'alex-does-digital-logo.svg',
  'alexpolo-copy.webp',
  'pool-image-ad.webp',
  'pool-video-ad.webp'
];
const imagesOutput = path.join(OUTPUT, 'images');
fs.mkdirSync(imagesOutput, { recursive: true });
for (const image of publicImages) {
  copy(path.join(ROOT, 'images', image), path.join(imagesOutput, image));
}

for (const template of EXCLUDED_TEMPLATES) {
  if (fs.existsSync(path.join(OUTPUT, template))) {
    throw new Error(`Excluded template was copied to deployment output: ${template}`);
  }
}

if (fs.existsSync(path.join(OUTPUT, 'posts.json'))) {
  throw new Error('posts.json should not be required or published');
}

console.log(`Built ${htmlFiles.length} public HTML pages in dist/`);
console.log(`Excluded ${EXCLUDED_TEMPLATES.size} authoring templates and posts.json`);
