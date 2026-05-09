"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Result {
  id: string;
  createdAt: string;
  candidateName: string;
  candidatePhone: string;
  candidateRole: string;
  falseCount: number;
  listeningRating: string;
  actionScore: number;
  processScore: number;
  peopleScore: number;
  ideaScore: number;
  dominantStyle: string;
  totalSelected: number;
}

const ratingColors: Record<string, string> = {
  empathetic: "text-green-700 bg-green-50 border-green-200",
  good: "text-blue-700 bg-blue-50 border-blue-200",
  practice: "text-amber-700 bg-amber-50 border-amber-200",
  poor: "text-red-700 bg-red-50 border-red-200",
};

const ratingLabels: Record<string, string> = {
  empathetic: "Empathetic Listener",
  good: "Good Listener",
  practice: "Needs Practice",
  poor: "Poor Listener",
};

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (isRefresh = false) => {
    if (isRefresh) setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/results");
      const data = await res.json();
      if (data.results) setResults(data.results);
      else setError("Failed to load results");
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchResults(false), 0);
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                Test Results
              </h1>
              <p className="text-xs text-muted-foreground">
                {results.length} candidate{results.length !== 1 ? "s" : ""} assessed
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchResults(true)} disabled={loading} className="text-xs">
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
        {error && (
          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="p-3 text-xs text-amber-800">
              ⚠ {error}. Results will appear once the database is connected.
            </CardContent>
          </Card>
        )}

        {loading && results.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground">
            Loading results...
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="text-center py-16 text-sm text-muted-foreground">
            No test results yet. Results will appear here after candidates submit their tests.
          </div>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-2.5 px-3 font-bold">Candidate</th>
                  <th className="text-left py-2.5 px-2 font-bold hidden sm:table-cell">Role</th>
                  <th className="text-center py-2.5 px-2 font-bold">Listening</th>
                  <th className="text-center py-2.5 px-2 font-bold">A</th>
                  <th className="text-center py-2.5 px-2 font-bold">PR</th>
                  <th className="text-center py-2.5 px-2 font-bold">PE</th>
                  <th className="text-center py-2.5 px-2 font-bold">I</th>
                  <th className="text-center py-2.5 px-2 font-bold">Dominant</th>
                  <th className="text-left py-2.5 px-2 font-bold hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-medium">{r.candidateName}</div>
                      <div className="text-muted-foreground">{r.candidatePhone}</div>
                      <div className="text-muted-foreground sm:hidden">{r.candidateRole}</div>
                    </td>
                    <td className="py-2.5 px-2 hidden sm:table-cell">
                      <Badge variant="secondary" className="text-[10px]">{r.candidateRole}</Badge>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <Badge variant="outline" className={`text-[10px] ${ratingColors[r.listeningRating] || ""}`}>
                        {ratingLabels[r.listeningRating] || r.listeningRating} ({r.falseCount})
                      </Badge>
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold">{r.actionScore}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold">{r.processScore}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold">{r.peopleScore}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold">{r.ideaScore}</td>
                    <td className="py-2.5 px-2 text-center">
                      <Badge className="text-[10px]">{r.dominantStyle}</Badge>
                    </td>
                    <td className="py-2.5 px-2 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                      {formatDate(r.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards (alternative view for small screens) */}
        {results.length > 0 && (
          <div className="sm:hidden space-y-2 mt-4">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Card View</p>
            {results.map((r) => (
              <Card key={`card-${r.id}`}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm">{r.candidateName}</span>
                      <div className="text-[10px] text-muted-foreground">{r.candidatePhone} · {r.candidateRole}</div>
                    </div>
                    <Badge className="text-[10px]">{r.dominantStyle}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div><span className="text-[9px] text-muted-foreground block">Action</span><span className="font-bold text-sm">{r.actionScore}</span></div>
                    <div><span className="text-[9px] text-muted-foreground block">Process</span><span className="font-bold text-sm">{r.processScore}</span></div>
                    <div><span className="text-[9px] text-muted-foreground block">People</span><span className="font-bold text-sm">{r.peopleScore}</span></div>
                    <div><span className="text-[9px] text-muted-foreground block">Idea</span><span className="font-bold text-sm">{r.ideaScore}</span></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <Badge variant="outline" className={`text-[9px] ${ratingColors[r.listeningRating] || ""}`}>
                      {ratingLabels[r.listeningRating] || r.listeningRating} ({r.falseCount} false)
                    </Badge>
                    <span className="text-muted-foreground">{formatDate(r.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
