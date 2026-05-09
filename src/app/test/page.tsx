"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  listeningQuestions,
  competencyQuestions,
  styleDescriptions,
} from "../../data/questions";
import { Clock, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


type StyleType = "Action" | "Process" | "People" | "Idea";

function TestContent() {
  const searchParams = useSearchParams();
  const candidateName = searchParams.get("name") || "";
  const candidatePhone = searchParams.get("phone") || "";
  const candidateRole = searchParams.get("role") || "";
  const timeLimitMin = parseInt(searchParams.get("t") || "60", 10);
  const expiresAt = parseInt(searchParams.get("exp") || "0", 10);

  const [step, setStep] = useState<"start" | "part1" | "part2" | "results">("start");
  const [part1, setPart1] = useState<Record<number, boolean>>({});
  const [part2, setPart2] = useState<Record<number, boolean>>({});
  const [part2Page, setPart2Page] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMin * 60);
  const [timerActive, setTimerActive] = useState(false);

  const linkExpired = expiresAt > 0 && Date.now() > expiresAt;

  useEffect(() => {
    if (!timerActive || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  useEffect(() => {
    if (timerActive && secondsLeft === 0 && step !== "results") {
      setStep("results");
      setTimerActive(false);
    }
  }, [secondsLeft, timerActive, step]);

  const startTest = () => { setStep("part1"); setTimerActive(true); };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const submitTest = useCallback(() => {
    setStep("results");
    setTimerActive(false);
  }, []);

  const falseCount = Object.values(part1).filter((v) => v === false).length;

  const getListeningRating = () => {
    if (falseCount <= 5) return { label: "You are an empathetic listener (1-5)", color: "text-green-700", bg: "bg-green-50 border-green-200" };
    if (falseCount <= 10) return { label: "You are good but can improve on listening (6-10)", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" };
    if (falseCount <= 15) return { label: "You can become a better listener through regular practice (11-15)", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
    return { label: "You need to listen up (16-20)", color: "text-red-700", bg: "bg-red-50 border-red-200" };
  };


  const styleScores: Record<StyleType, number> = { Action: 0, Process: 0, People: 0, Idea: 0 };
  competencyQuestions.forEach((q) => { if (part2[q.id]) styleScores[q.style] += 1; });

  const dominantStyle = (Object.keys(styleScores) as StyleType[]).reduce((a, b) =>
    styleScores[a] >= styleScores[b] ? a : b
  );

  const part1Answered = Object.keys(part1).length;
  const part2Selected = Object.values(part2).filter(Boolean).length;
  const isTimeLow = secondsLeft < 120 && secondsLeft > 0;

  // ── EXPIRED ──
  if (linkExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            <h1 className="text-xl font-bold">Link Expired</h1>
            <p className="text-sm text-muted-foreground">
              This assessment link has expired. Please contact your HR representative for a new link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── NO PARAMS ──
  if (!candidateName) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h1 className="text-xl font-bold">Invalid Link</h1>
            <p className="text-sm text-muted-foreground">
              This test link is invalid. Please use the link provided by your HR team.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── START SCREEN ──
  if (step === "start") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-lg">Listening & Communication Assessment</CardTitle>
            <p className="text-xs text-muted-foreground">Hiring Evaluation Test</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm space-y-0">
              <div className="flex justify-between py-2.5 border-b">
                <span className="text-muted-foreground">Candidate</span>
                <span className="font-medium">{candidateName}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{candidatePhone}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{candidateRole}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">Time Limit</span>
                <span className="font-medium">{timeLimitMin} minutes</span>
              </div>
            </div>

            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800 space-y-1">
              <p className="font-semibold">Before you start:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Part 1: 20 True/False questions on listening habits</li>
                <li>Part 2: 80 statements — select the ones that describe you (~40)</li>
                <li>Timer starts when you click &quot;Start Test&quot;</li>
                <li>Test auto-submits when time runs out</li>
              </ul>
            </div>

            <Button onClick={startTest} className="w-full">
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── RESULTS ──
  if (step === "results") {
    const rating = getListeningRating();
    const barColors: Record<StyleType, string> = {
      Action: "bg-amber-500", Process: "bg-blue-500", People: "bg-emerald-500", Idea: "bg-purple-500",
    };

    return (
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h1 className="text-base sm:text-lg font-bold">Assessment Complete</h1>
          </div>

          {/* Candidate Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div><span className="text-muted-foreground text-xs block">Candidate</span><span className="font-medium">{candidateName}</span></div>
                <div><span className="text-muted-foreground text-xs block">Phone</span><span className="font-medium">{candidatePhone}</span></div>
                <div><span className="text-muted-foreground text-xs block">Role</span><span className="font-medium">{candidateRole}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Part 1: Listening Attitude */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Part 1: Listening Attitude</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">{falseCount}</span>
                <span className="text-xs text-muted-foreground">False answers out of 20</span>
              </div>
              <Badge variant="outline" className={`${rating.bg} ${rating.color} border`}>
                {rating.label}
              </Badge>
            </CardContent>
          </Card>

          {/* Part 2: Communication Styles — Scoring Sheet */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Part 2: Scoring Sheet</CardTitle>
              <p className="text-xs text-muted-foreground">{part2Selected} statements selected (target: ~40)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(styleScores) as StyleType[]).map((style) => {
                const score = styleScores[style];
                const pct = (score / 20) * 100;
                const isDominant = style === dominantStyle;
                const desc = styleDescriptions[style];
                return (
                  <div key={style} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={`font-medium ${isDominant ? "font-bold" : ""}`}>
                        {desc.title} — {desc.focus} — {desc.description}
                        {isDominant && <span className="ml-1.5 text-[10px] text-primary">★ Dominant</span>}
                      </span>
                      <span className="font-bold">{score}/20</span>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${barColors[style]}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Main Characteristics Table (from PDF) */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Main Characteristics of Communication Styles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-2 font-bold">Style</th>
                      <th className="text-left py-2 px-2 font-bold">Content (People talk about)</th>
                      <th className="text-left py-2 pl-2 font-bold">Process (People are)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Object.keys(styleScores) as StyleType[]).map((style) => {
                      const desc = styleDescriptions[style];
                      const isDominant = style === dominantStyle;
                      return (
                        <tr key={style} className={`border-b last:border-b-0 ${isDominant ? "bg-muted/50 font-semibold" : ""}`}>
                          <td className="py-2 pr-2 align-top whitespace-nowrap">
                            <span className="font-bold">{desc.title}</span>
                            <br />
                            <span className="text-muted-foreground">{desc.focus}</span>
                            {isDominant && <Badge className="ml-1 text-[8px] px-1">★</Badge>}
                          </td>
                          <td className="py-2 px-2 align-top">
                            {desc.content.map((c, i) => <span key={i} className="block">{c}</span>)}
                          </td>
                          <td className="py-2 pl-2 align-top">
                            {desc.process.map((p, i) => <span key={i} className="block">{p}</span>)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }


  // ── ACTIVE TEST ──
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Timer Bar */}
      <div className={`sticky top-0 z-50 px-3 sm:px-4 py-2.5 border-b flex items-center justify-between text-xs ${
        isTimeLow ? "bg-red-50 border-red-200" : "bg-background border-border"
      }`}>
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="text-foreground font-medium truncate">{candidateName}</span>
          <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
            {step === "part1" ? "Part 1" : "Part 2"}
          </Badge>
        </div>
        <div className={`flex items-center gap-1.5 font-mono font-bold flex-shrink-0 ${isTimeLow ? "text-red-600 animate-pulse" : "text-foreground"}`}>
          <Clock className="w-3.5 h-3.5" />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6 space-y-3">
        {/* PART 1 */}
        {step === "part1" && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-bold">Part 1: Listening Attitude (20 Questions)</h2>
              <Badge variant="outline" className="text-[10px]">{part1Answered}/20 answered</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Select True (सही) or False (गलत) for each statement.</p>

            <div className="space-y-2">
              {listeningQuestions.map((q) => (
                <Card key={q.id} className="overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <p className="text-xs font-medium leading-relaxed">
                          <span className="text-muted-foreground mr-1.5">{q.id}.</span>{q.textEn}
                        </p>
                        <p className="text-[11px] text-muted-foreground italic">{q.textHi}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Button
                          size="sm"
                          variant={part1[q.id] === true ? "default" : "outline"}
                          onClick={() => setPart1((p) => ({ ...p, [q.id]: true }))}
                          className={`text-xs h-8 ${part1[q.id] === true ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                        >
                          True / सही
                        </Button>
                        <Button
                          size="sm"
                          variant={part1[q.id] === false ? "default" : "outline"}
                          onClick={() => setPart1((p) => ({ ...p, [q.id]: false }))}
                          className={`text-xs h-8 ${part1[q.id] === false ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
                        >
                          False / गलत
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end pt-3 pb-4">
              <Button onClick={() => { setStep("part2"); setPart2Page(0); }}>
                Next: Part 2 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        )}

        {/* PART 2 */}
        {step === "part2" && (() => {
          const pageSize = 20;
          const totalPages = Math.ceil(competencyQuestions.length / pageSize);
          const pageQuestions = competencyQuestions.slice(part2Page * pageSize, (part2Page + 1) * pageSize);

          return (
            <>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-sm font-bold">Part 2: Competency Analysis</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{part2Selected} selected</Badge>
                  <Badge variant="secondary" className="text-[10px]">Page {part2Page + 1}/{totalPages}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Select statements that describe you. Aim for ~40 total.</p>

              <div className="space-y-1.5">
                {pageQuestions.map((q) => {
                  const checked = !!part2[q.id];
                  return (
                    <Card
                      key={q.id}
                      className={`cursor-pointer transition-colors ${checked ? "border-primary bg-muted/50" : "hover:bg-muted/30"}`}
                      onClick={() => setPart2((p) => ({ ...p, [q.id]: !p[q.id] }))}
                    >
                      <CardContent className="p-3 flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          checked ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                        }`}>
                          {checked && (
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-xs font-medium leading-relaxed">
                            <span className="text-muted-foreground mr-1.5">{q.id}.</span>{q.textEn}
                          </p>
                          <p className="text-[11px] text-muted-foreground italic">{q.textHi}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (part2Page > 0) setPart2Page((p) => p - 1);
                    else setStep("part1");
                  }}
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>

                {part2Page < totalPages - 1 ? (
                  <Button size="sm" onClick={() => setPart2Page((p) => p + 1)}>
                    Next Page <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700 text-white">
                    Submit Test
                  </Button>
                )}
              </div>
            </>
          );
        })()}
      </main>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading assessment...</p>
      </div>
    }>
      <TestContent />
    </Suspense>
  );
}
