import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appendResultToSheet } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      candidateName,
      candidatePhone,
      candidateRole,
      timeLimitMin,
      listeningAnswers,
      competencyAnswers,
      linkId,
    } = body;

    if (!candidateName || !candidatePhone || !candidateRole) {
      return NextResponse.json(
        { error: "Missing required candidate fields" },
        { status: 400 }
      );
    }

    // Calculate Part 1: count false answers
    const falseCount = Object.values(listeningAnswers || {}).filter(
      (v) => v === false
    ).length;

    let listeningRating = "poor";
    if (falseCount <= 5) listeningRating = "empathetic";
    else if (falseCount <= 10) listeningRating = "good";
    else if (falseCount <= 15) listeningRating = "practice";

    // Calculate Part 2: style scores
    // Import the style mapping from questions data
    const styleMap: Record<number, string> = {};
    const { competencyQuestions } = await import("@/data/questions");
    competencyQuestions.forEach((q) => {
      styleMap[q.id] = q.style;
    });

    let actionScore = 0;
    let processScore = 0;
    let peopleScore = 0;
    let ideaScore = 0;
    let totalSelected = 0;

    Object.entries(competencyAnswers || {}).forEach(([idStr, val]) => {
      if (val === true) {
        totalSelected++;
        const style = styleMap[parseInt(idStr, 10)];
        if (style === "Action") actionScore++;
        else if (style === "Process") processScore++;
        else if (style === "People") peopleScore++;
        else if (style === "Idea") ideaScore++;
      }
    });

    const scores = { Action: actionScore, Process: processScore, People: peopleScore, Idea: ideaScore };
    const dominantStyle = (Object.keys(scores) as (keyof typeof scores)[]).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b
    );

    // Save to Prisma/Postgres
    const result = await prisma.testResult.create({
      data: {
        candidateName,
        candidatePhone,
        candidateRole,
        timeLimitMin: timeLimitMin || 60,
        listeningAnswers: listeningAnswers || {},
        falseCount,
        listeningRating,
        competencyAnswers: competencyAnswers || {},
        actionScore,
        processScore,
        peopleScore,
        ideaScore,
        dominantStyle,
        totalSelected,
        linkId: linkId || null,
      },
    });

    // Sync to Google Sheets (non-blocking — don't fail if Sheets fails)
    const synced = await appendResultToSheet({
      candidateName,
      candidatePhone,
      candidateRole,
      timeLimitMin: timeLimitMin || 60,
      falseCount,
      listeningRating,
      actionScore,
      processScore,
      peopleScore,
      ideaScore,
      dominantStyle,
      totalSelected,
      createdAt: result.createdAt.toISOString(),
    });

    if (synced) {
      await prisma.testResult.update({
        where: { id: result.id },
        data: { syncedToSheet: true },
      });
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      sheetsSync: synced,
    });
  } catch (error) {
    console.error("[submit-result] Error:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
