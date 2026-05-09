import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const results = await prisma.testResult.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        candidateName: true,
        candidatePhone: true,
        candidateRole: true,
        falseCount: true,
        listeningRating: true,
        actionScore: true,
        processScore: true,
        peopleScore: true,
        ideaScore: true,
        dominantStyle: true,
        totalSelected: true,
      },
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error("[results] Error:", error);
    return NextResponse.json({ results: [], error: "Failed to fetch" }, { status: 500 });
  }
}
