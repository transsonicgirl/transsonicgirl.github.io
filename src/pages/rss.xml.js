import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const postImportResult = import.meta.glob('./blogposts/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  return rss({
    title: 'Allison\'s Blog',
    description: 'Local lesbian aerospace guidance engineer\'s thoughtstream',
    site: context.site,
    stylesheet: '/public/pretty-feed-v3.xsl',
    items: posts.map((post)=> ({
        link:post.url,
        content: sanitizeHtml(post.compiledContent()),
        ...post.frontmatter,
    })),
  });
}

