const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// List of files to exclude from blog posts
const EXCLUDED_FILES = new Set([
  'index.html',
  'blog.html',
  'guides.html',
  'services.html',
  'about.html',
  'case-studies.html',
  'industries.html',
  'conversion-rate-optimization.html',
  'facebook-ads-lead-generation.html',
  'google-ads-for-service-businesses.html',
  'seo-for-service-businesses.html',
  'youtube-leads.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'facebook-ads-by-industry.html',
  'google-ads-by-industry.html',
  'seo-by-industry.html',
  'lead-generation-guides.html',
  'care-home-marketing.html',
  'nursing-home-marketing.html',
  'financial-advisor-leads.html',
  'epoxy-flooring-leads.html',
  '404.html',
  'blog-post-template.html',
  'case-study-template.html',
  'facebook-ads-post-template.html',
  'industry-template.html'
]);

function getSlugFromFilename(filename) {
  return filename.replace('.html', '');
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getFirstCommittedDate(filename) {
  try {
    const output = execFileSync(
      'git',
      ['log', '--diff-filter=A', '--follow', '--format=%cs', '--', filename],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    return output.trim().split('\n').filter(Boolean).pop() || '';
  } catch {
    return '';
  }
}

function extractMetadataFromHtml(htmlPath, filename) {
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Extract title from <title> tag using regex
    const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
    const titleTag = titleMatch ? titleMatch[1] : '';
    const title = decodeHtml(titleTag).replace(' | Alex Does Digital', '').trim();

    // Extract meta description
    const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
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

    // Use the file's first committed date for older articles that predate schema markup.
    if (!date) date = getFirstCommittedDate(filename);

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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

function renderBlogCards(posts) {
  const blogPath = './blog.html';
  const startMarker = '<!-- BLOG_POSTS_START -->';
  const endMarker = '<!-- BLOG_POSTS_END -->';
  const blogHtml = fs.readFileSync(blogPath, 'utf8');

  if (!blogHtml.includes(startMarker) || !blogHtml.includes(endMarker)) {
    throw new Error('Blog post markers are missing from blog.html');
  }

  const icons = {
    'Google Ads': '📈',
    'Facebook Ads': '🎯',
    'SEO': '🔍',
    'Lead Gen': '⚡',
    'Blog': '📝'
  };

  const sorted = [...posts].sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  const cards = sorted.map(post => {
    const date = formatDate(post.date);
    const dateHtml = date ? `\n                        <span class="post-date">${escapeHtml(date)}</span>` : '';
    return `            <a href="/${escapeHtml(post.slug)}" class="post-card" data-category="${escapeHtml(post.category)}">
                <div class="post-card-img" aria-hidden="true">${icons[post.category] || '📝'}</div>
                <div class="post-card-body">
                    <div class="post-meta">
                        <span class="post-category">${escapeHtml(post.category)}</span>${dateHtml}
                        <span class="post-read-time">${escapeHtml(post.readTime)}</span>
                    </div>
                    <h3>${escapeHtml(post.title)}</h3>
                    <p>${escapeHtml(post.excerpt)}</p>
                    <span class="read-more">Read Post →</span>
                </div>
            </a>`;
  }).join('\n');

  const replacement = `${startMarker}\n            <div id="postsContainer" class="posts-grid">\n${cards}\n            </div>\n            ${endMarker}`;
  const updated = blogHtml.replace(
    new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`),
    replacement
  );

  if (updated !== blogHtml) {
    fs.writeFileSync(blogPath, updated);
    console.log(`✓ Rendered ${sorted.length} static article cards in blog.html`);
  }
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
  const loadedPosts = loadPostsJson();
  const existingPosts = [...new Map(
    loadedPosts
      .filter(post => !EXCLUDED_FILES.has(`${post.slug}.html`))
      .map(post => [post.slug, post])
  ).values()];
  const postsPruned = loadedPosts.length - existingPosts.length;
  let newPostsAdded = 0;
  let postsUpdated = 0;
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
    } else {
      // Keep a verified publication date when older pages do not carry one in their markup.
      if (!metadata.date && existingPosts[existingIndex].date) {
        metadata.date = existingPosts[existingIndex].date;
      }

      if (JSON.stringify(existingPosts[existingIndex]) === JSON.stringify(metadata)) {
        continue;
      }

      existingPosts[existingIndex] = metadata;
      postsUpdated++;
      console.log(`✓ Updated blog metadata: ${slug}`);
    }
  }

  if (newPostsAdded > 0 || postsUpdated > 0 || postsPruned > 0) {
    // Sort posts by date (newest first)
    existingPosts.sort((a, b) => {
      if (!a.date && !b.date) return a.title.localeCompare(b.title);
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
    savePostsJson(existingPosts);
    console.log(`✓ Saved ${newPostsAdded} new, ${postsUpdated} updated, and ${postsPruned} removed posts to posts.json`);
  }

  // Update sitemap
  if (updatedUrls.length > 0) {
    let sitemap = loadSitemap();
    const today = new Date().toISOString().split('T')[0];

    for (const slug of updatedUrls) {
      const blogUrlEntry = `  <url>
    <loc>https://alxdoesdigital.com/${slug}</loc>
    <lastmod>${today}</lastmod>
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

  console.log(`\n✓ Blog metadata update complete. ${newPostsAdded} new posts added, ${postsUpdated} updated, ${postsPruned} removed.`);
}

updateBlogMetadata();
