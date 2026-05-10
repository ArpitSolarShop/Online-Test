import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSignedPDFUrl } from "@/lib/supabase-storage";

export const dynamic = "force-dynamic";

/**
 * GET /api/results/pdf?id=<resultId>
 * Returns a signed URL for the candidate's result PDF, valid for 1 hour.
 */
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing result ID" }, { status: 400 });
    }

    const result = await prisma.testResult.findUnique({
      where: { id },
      select: { pdfPath: true, candidateName: true },
    });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    if (!result.pdfPath) {
      return NextResponse.json({ error: "No PDF available for this result" }, { status: 404 });
    }

    // Generate a signed URL valid for 1 hour
    const signedUrl = await getSignedPDFUrl(result.pdfPath, 3600);

    if (!signedUrl) {
      return NextResponse.json({ error: "Failed to generate PDF URL" }, { status: 500 });
    }

    return NextResponse.json({
      url: signedUrl,
      candidateName: result.candidateName,
    });
  } catch (error) {
    console.error("[results/pdf] Error:", error);
    return NextResponse.json({ error: "Failed to get PDF" }, { status: 500 });
  }
}
