import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/links - Fetch all links
export async function GET() {
  try {
    const links = await prisma.testLink.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ links });
  } catch (error) {
    console.error("[api/links] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
  }
}

// POST /api/links - Create a new link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateName, candidatePhone, candidateRole, timeLimitMin } = body;

    if (!candidateName || !candidatePhone || !candidateRole || !timeLimitMin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const expiresAt = new Date(Date.now() + timeLimitMin * 60 * 1000);

    const link = await prisma.testLink.create({
      data: {
        candidateName,
        candidatePhone,
        candidateRole,
        timeLimitMin: parseInt(timeLimitMin, 10),
        expiresAt,
      },
    });

    return NextResponse.json({ link });
  } catch (error) {
    console.error("[api/links] POST error:", error);
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}

// DELETE /api/links?id=<id> - Delete a link
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.testLink.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/links] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
  }
}
