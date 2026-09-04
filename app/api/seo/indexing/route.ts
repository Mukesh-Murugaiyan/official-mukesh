import { NextResponse } from "next/server";
import { runAutoIndexing, getAllSiteUrls } from "@/scripts/google-indexing";

export async function GET() {
  try {
    const urls = getAllSiteUrls();
    return NextResponse.json({
      status: "ok",
      totalUrls: urls.length,
      urls,
      hasGscKey: !!process.env.GSC_SERVICE_ACCOUNT_KEY,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list site URLs for indexing." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { dryRun?: boolean };
    const result = await runAutoIndexing({ dryRun: body.dryRun });
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
