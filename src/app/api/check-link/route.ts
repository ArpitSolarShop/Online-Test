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
    const existing = await prisma.testResult.findFirst({
      where: { linkId },
      select: { id: true },
    });

    return NextResponse.json({
      used: !!existing,
    });
  } catch (error) {
    console.error("[check-link] Error:", error);
    return NextResponse.json({ error: "Failed to check link" }, { status: 500 });
  }
}
