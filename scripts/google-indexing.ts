import { GoogleAuth } from "google-auth-library";
import path from "path";
import fs from "fs";

const SITE_ORIGIN = "https://themukesh.com";
const INDEXNOW_KEY = "54728f910a824147b0a82741d4c2b9a1";

interface GscServiceAccount {
  type?: string;
  project_id?: string;
  private_key_id?: string;
  private_key?: string;
  client_email?: string;
  client_id?: string;
}

interface IndexingStatusResult {
  url: string;
  submitted: boolean;
  indexingState?: string;
  coverageState?: string;
  lastCrawlTime?: string;
  error?: string;
}

// 1. Gather all site URLs dynamically by parsing data files
export function getAllSiteUrls(): string[] {
  const staticPaths = [
    "/",
    "/blog",
    "/games",
    "/tools",
    "/about",
    "/privacy-policy",
    "/contact",
    "/terms-and-conditions",
    "/disclaimer",
  ];

  const extractSlugs = (filePath: string): string[] => {
    try {
      if (!fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, "utf-8");
      const slugs: string[] = [];
      const matches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
      for (const match of matches) {
        if (match[1]) slugs.push(match[1]);
      }
      return slugs;
    } catch (e) {
      console.warn(`[Warning] Could not read ${filePath}:`, e);
      return [];
    }
  };

  const extractToolUrls = (filePath: string): string[] => {
    try {
      if (!fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, "utf-8");
      const urls: string[] = [];
      const matches = content.matchAll(/url:\s*["'](\/tools\/[^"']+)["']/g);
      for (const match of matches) {
        if (match[1]) urls.push(match[1]);
      }
      return urls;
    } catch (e) {
      console.warn(`[Warning] Could not read ${filePath}:`, e);
      return [];
    }
  };

  const rootDir = process.cwd();
  const gameSlugs = extractSlugs(path.join(rootDir, "data", "games.ts"));
  const blogSlugs = extractSlugs(path.join(rootDir, "data", "blogs.ts"));
  const toolUrls = extractToolUrls(path.join(rootDir, "data", "tools.ts"));

  const gamePaths = gameSlugs.map((s) => `/games/${s}`);
  const blogPaths = blogSlugs.map((s) => `/blog/${s}`);

  const allPaths = Array.from(
    new Set([...staticPaths, ...toolUrls, ...gamePaths, ...blogPaths])
  );

  return allPaths.map((p) => `${SITE_ORIGIN}${p}`);
}

// 2. Generate Google OAuth2 Access Token using official google-auth-library
async function getGoogleAccessToken(
  serviceAccount: GscServiceAccount
): Promise<string> {
  const clientEmail = serviceAccount.client_email;
  const privateKey = serviceAccount.private_key;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Invalid GSC Service Account Key: missing client_email or private_key."
    );
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse.token) {
    throw new Error("Failed to acquire Google access token.");
  }
  return tokenResponse.token;
}

// 3. Submit URL to Google Indexing API
async function submitToGoogleIndexing(
  url: string,
  accessToken: string
): Promise<boolean> {
  try {
    const res = await fetch(
      "https://indexing.googleapis.com/v1/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          type: "URL_UPDATED",
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Google Indexing API Error] ${url}: ${res.status} ${errText}`);
      return false;
    }

    return true;
  } catch (err) {
    console.warn(`[Google Indexing API Exception] ${url}:`, err);
    return false;
  }
}

// 4. Query Google Search Console URL Inspection API
async function inspectUrlIndexState(
  url: string,
  accessToken: string
): Promise<{ coverageState?: string; indexingState?: string; lastCrawlTime?: string }> {
  try {
    const res = await fetch(
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: `${SITE_ORIGIN}/`,
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn(`[GSC Inspection Error] ${url}: ${res.status} ${errText.substring(0, 150)}`);
      return { coverageState: `Inspection API (${res.status})` };
    }

    const data = (await res.json()) as {
      inspectionResult?: {
        indexStatusResult?: {
          coverageState?: string;
          indexingState?: string;
          lastCrawlTime?: string;
        };
      };
    };

    const result = data?.inspectionResult?.indexStatusResult;
    return {
      coverageState: result?.coverageState || "UNKNOWN",
      indexingState: result?.indexingState || "UNKNOWN",
      lastCrawlTime: result?.lastCrawlTime || "N/A",
    };
  } catch {
    return { coverageState: "Inspection Failed" };
  }
}

// 5. Submit to IndexNow Protocol (Bing / Yandex / Seznam)
async function submitToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "themukesh.com",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ IndexNow: Submitted ${urls.length} URLs successfully.`);
      return true;
    } else {
      console.warn(`[IndexNow Warning] Returned HTTP status ${res.status}`);
      return false;
    }
  } catch (err) {
    console.warn("[IndexNow Exception]:", err);
    return false;
  }
}

// 6. Ping Google Sitemap Endpoint
async function pingGoogleSitemap(): Promise<void> {
  try {
    const sitemapUrl = `${SITE_ORIGIN}/sitemap.xml`;
    const res = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`✓ Google Sitemap Ping: HTTP ${res.status}`);
  } catch {
    console.warn("[Sitemap Ping Warning]: Could not ping Google sitemap endpoint.");
  }
}

// Main Execution Function
export async function runAutoIndexing(options: { dryRun?: boolean } = {}) {
  const isDryRun = options.dryRun || process.argv.includes("--dry-run");

  console.log("==========================================================");
  console.log("🔍 Google Search Console Auto-Indexing & Status Inspector");
  console.log("==========================================================");

  const urls = getAllSiteUrls();
  console.log(`📌 Found ${urls.length} target site URLs to check & index:`);
  urls.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));

  if (isDryRun) {
    console.log("\n⚠️ DRY-RUN MODE ACTIVE: Skipping external API requests.");
    console.log("✓ URL list validated successfully.");
    return { urls, dryRun: true };
  }

  // Ping Google Sitemap & IndexNow regardless of GSC credentials
  await pingGoogleSitemap();
  await submitToIndexNow(urls);

  const rawKey = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!rawKey) {
    console.warn(
      "\n⚠️ GSC_SERVICE_ACCOUNT_KEY secret is not set in environment."
    );
    console.warn(
      "   To enable Google Search Console API submissions & URL Inspection,"
    );
    console.warn(
      "   please set GSC_SERVICE_ACCOUNT_KEY secret in GitHub Repository Secrets."
    );
    return { urls, dryRun: false, gscEnabled: false };
  }

  let serviceAccount: GscServiceAccount;
  try {
    serviceAccount = JSON.parse(rawKey);
  } catch {
    console.error("❌ Failed to parse GSC_SERVICE_ACCOUNT_KEY JSON string.");
    return { urls, dryRun: false, error: "Invalid GSC_SERVICE_ACCOUNT_KEY JSON" };
  }

  console.log(`\n🔑 Authenticating with Google as: ${serviceAccount.client_email}...`);
  const accessToken = await getGoogleAccessToken(serviceAccount);
  console.log("✓ OAuth Token Acquired Successfully.");

  console.log("\n🚀 Submitting URLs to Google Indexing API & Inspecting Search Status...\n");

  const results: IndexingStatusResult[] = [];

  for (const url of urls) {
    const submitted = await submitToGoogleIndexing(url, accessToken);
    const inspect = await inspectUrlIndexState(url, accessToken);

    results.push({
      url,
      submitted,
      coverageState: inspect.coverageState,
      indexingState: inspect.indexingState,
      lastCrawlTime: inspect.lastCrawlTime,
    });

    // Small delay to respect rate limits
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log("==========================================================================");
  console.log("📊 GOOGLE INDEXING & SEARCH INSPECTION REPORT");
  console.log("==========================================================================");
  results.forEach((r, idx) => {
    const submitBadge = r.submitted ? "✅ SUBMITTED" : "⚠️ FAILED";
    console.log(
      `${(idx + 1).toString().padStart(2, "0")}. [${submitBadge}] ${r.url}`
    );
    console.log(
      `    Status: ${r.coverageState || "N/A"} | Last Crawled: ${
        r.lastCrawlTime || "N/A"
      }`
    );
  });
  console.log("==========================================================================");

  return { urls, results, gscEnabled: true };
}

// Execute when run directly as script
runAutoIndexing().catch((err) => {
  console.error("❌ Indexing script encountered an unhandled error:", err);
  process.exit(1);
});
