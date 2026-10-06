import { readFile, writeFile } from "node:fs/promises";
const raw = process.env.SITE_URL;
if (raw) {
  const url = new URL(raw);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("SITE_URL must be an HTTP(S) URL");
  const site = `${url.origin}${url.pathname.replace(/\/$/, "")}/`;
  const path = "dist/index.html";
  let html = await readFile(path, "utf8");
  html = html
    .replace(/(<meta property="og:image" content=")[^"]*"/, `$1${new URL("og-image.jpg", site).href}"`)
    .replace(
      "</head>",
      `<link rel="canonical" href="${site}"/><meta property="og:url" content="${site}"/></head>`,
    );
  await writeFile(path, html);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}</loc></url></urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`,
  );
}
