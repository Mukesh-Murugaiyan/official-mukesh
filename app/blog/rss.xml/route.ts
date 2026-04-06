import { blogs } from "@/data/blogs";

const baseUrl = "https://themukesh.com";

export async function GET() {
  const rssItems = blogs.map((blog) => `
    <item>
      <title>${blog.title}</title>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <guid>${baseUrl}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <description>${blog.description}</description>
    </item>`).join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Mukesh Murugaiyan | Blog</title>
        <link>${baseUrl}/blog</link>
        <description>Sharing what we build, what breaks, and what we learn along the way.</description>
        <language>en-us</language>
        ${rssItems}
      </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
