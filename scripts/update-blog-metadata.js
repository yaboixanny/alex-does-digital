const fs = require('fs');
const path = require('path');

// List of files to exclude from blog posts
const EXCLUDED_FILES = new Set([
  'index.html',
  'blog.html',
  'about.html',
  'case-studies.html',
  'industries.html',
  'conversion-rate-optimization.html',
  'facebook-ads-lead-generation.html',
  'google-ads-for-service-businesses.html',
  'youtube-leads.html',
  '404.html',
  'blog-post-template.html',
  'case-study-template.html',
  'facebook-ads-post-template.html',
  'industry-template.html'
]);

function getSlugFromFilename(filename) {
  return filename.replace('.html', '');
}

function extractMetadataFromHtml(htmlPath, filename) {
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Extract title from <title> tag using regex
    const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
    const titleTag = titleMatch ? titleMatch[1] : '';
    const title = titleTag.replace(' | Alex Does Digital', '').trim();

    // Extract meta description
    const descMatch = htmlContent.match(/<meta name="description" content="([^"]+)"/i);
    const description = descMatch ? descMatch[1] : '';

    // Extract date from article schema (JSON-LD)
    let date = '';
    const schemaMatch = htmlContent.match(/"datePublished":\s*"([^"]+)"/);
    if (schemaMatch) {
      date = schemaMatch[1].split('T')[0];
    }

    // Fallback: try to extract from meta tag
    if (!date) {
      const metaDateMatch = htmlContent.match(/<meta property="article:published_time" content="([^"]+)"/);
      if (metaDateMatch) {
        date = metaDateMatch[1].split('T')[0];
      }
    }

    // Extract category from post-category-tag class
    const categoryMatch = htmlContent.match(/<span class="post-category-tag">([^<]+)<\/span>/);
    const categoryTag = categoryMatch ? categoryMatch[1].trim() : 'Blog';

    // Extract read time from post-hero-read-time or post-read-time
    const readTimeMatch = htmlContent.match(/<span class="(?:post-hero-)?read-time">([^<]+)<\/span>/);
    const readTimeText = readTimeMatch ? readTimeMatch[1].trim() : '5 min read';

    const slug = getSlugFromFilename(filename);

    return {
      slug,
      title,
      excerpt: description,
      date,
      category: categoryTag,
      readTime: readTimeText,
      featured: false
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${htmlPath}:`, error.message);
    return null;
  }
}

function getBlogHtmlFiles() {
  const files = fs.readdirSync('.').filter(file => {
    return file.endsWith('.html') && !EXCLUDED_FILES.has(file);
  });
  return files;
}

function loadPostsJson() {
  const postsPath = './posts.json';
  if (fs.existsSync(postsPath)) {
    return JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  }
  return [];
}

function savePostsJson(posts) {
  fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2) + '\n');
}

function loadSitemap() {
  const sitemapPath = './sitemap.xml';
  if (fs.existsSync(sitemapPath)) {
    return fs.readFileSync(sitemapPath, 'utf8');
  }
  return '';
}

function saveSitemap(content) {
  fs.writeFileSync('./sitemap.xml', content);
}

function isBlogPost(metadata) {
  // Determine if this is a blog post by checking various factors
  return (
    metadata &&
    (metadata.category === 'Facebook Ads' ||
     metadata.category === 'Google Ads' ||
     metadata.category === 'SEO' ||
     metadata.category === 'Blog')
  );
}

function updateBlogMetadata() {
  const blogFiles = getBlogHtmlFiles();
  const existingPosts = loadPostsJson();
  const existingSlugs = new Set(existingPosts.map(p => p.slug));

  let newPostsAdded = 0;
  let updatedUrls = [];

  for (const file of blogFiles) {
    const metadata = extractMetadataFromHtml(file, file);

    if (!metadata || !isBlogPost(metadata)) {
      continue;
    }

    const slug = metadata.slug;

    // Check if post already exists
    const existingIndex = existingPosts.findIndex(p => p.slug === slug);

    if (existingIndex === -1) {
      // New post - add to posts.json
      existingPosts.push(metadata);
      newPostsAdded++;
      console.log(`✓ Added new post to posts.json: ${slug}`);

      // Add to sitemap
      updatedUrls.push(slug);
    }
  }

  if (newPostsAdded > 0) {
    // Sort posts by date (newest first)
    existingPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    savePostsJson(existingPosts);
    console.log(`✓ Saved ${newPostsAdded} new posts to posts.json`);
  }

  // Update sitemap
  if (updatedUrls.length > 0) {
    let sitemap = loadSitemap();
    const today = new Date().toISOString().split('T')[0];

    for (const slug of updatedUrls) {
      const blogUrlEntry = `  <url>
    <loc>https://alxdoesdigital.com/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

      // Check if URL already exists in sitemap
      if (!sitemap.includes(`https://alxdoesdigital.com/${slug}`)) {
        // Add before closing </urlset> tag
        sitemap = sitemap.replace('</urlset>', blogUrlEntry + '\n</urlset>');
        console.log(`✓ Added ${slug} to sitemap.xml`);
      }
    }

    saveSitemap(sitemap);
  }

  console.log(`\n✓ Blog metadata update complete. ${newPostsAdded} new posts added.`);
}

updateBlogMetadata();
