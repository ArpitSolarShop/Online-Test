import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const linkId = searchParams.get("id");

  if (!linkId) {
    return NextResponse.json({ error: "Missing link ID" }, { status: 400 });
  }

  try {
    // 1. Check if it was already submitted
    const existingResult = await prisma.testResult.findFirst({
      where: { linkId },
      select: { id: true },
    });

    if (existingResult) {
      return NextResponse.json({ used: true, submitted: true });
    }

    // 2. Check if the link exists in the database (new approach)
    const link = await prisma.testLink.findUnique({
      where: { id: linkId },
    });

    if (link) {
      return NextResponse.json({
        used: false,
        link: {
          name: link.candidateName,
          phone: link.candidatePhone,
          role: link.candidateRole,
          timeLimit: link.timeLimitMin,
          expiresAt: link.expiresAt.getTime(),
        },
      });
    }

    // 3. If not found in either, it might be an old link with data in URL,
    // or just a completely invalid ID.
    return NextResponse.json({ used: false });
  } catch (error) {
    console.error("[check-link] Error:", error);
    return NextResponse.json({ error: "Failed to check link" }, { status: 500 });
  }
}
