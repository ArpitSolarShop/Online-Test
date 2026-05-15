"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Link2,
  Trash2,
  Clock,
  User,
  Phone,
  Briefcase,
  QrCode,
  X,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneratedLink {
  id: string;
  name: string;
  phone: string;
  role: string;
  timeLimit: number;
  createdAt: number;
  expiresAt: number;
  url: string;
}

// ─── QR Modal ────────────────────────────────────────────────────────────────
function QRModal({
  link,
  onClose,
}: {
  link: GeneratedLink;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, link.url, {
        width: 280,
        margin: 2,
        color: { dark: "#0f172a", light: "#ffffff" },
        errorCorrectionLevel: "H",
      });
    }
  }, [link.url]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = `test-qr-${link.name.replace(/\s+/g, "-")}.png`;
    a.click();
  }, [link.name]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center gap-5 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-accent"
          aria-label="Close QR modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center space-y-0.5">
          <h2 className="text-base font-bold tracking-tight flex items-center gap-1.5 justify-center">
            <QrCode className="w-4 h-4" /> Scan to Take Test
          </h2>
          <p className="text-xs text-muted-foreground">
            Show this QR code to the candidate
          </p>
        </div>

        {/* QR Canvas */}
        <div className="rounded-xl overflow-hidden border shadow-sm bg-white p-2">
          <canvas ref={canvasRef} />
        </div>

        {/* Candidate info */}
        <div className="w-full rounded-lg bg-muted/50 border px-4 py-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-semibold">{link.name}</span>
            <Badge variant="secondary" className="text-[10px] ml-auto">
              {link.role}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            <span>{link.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{link.timeLimit} min time limit</span>
          </div>
        </div>

        {/* URL preview */}
        <p className="text-[10px] text-muted-foreground text-center break-all leading-relaxed px-2 line-clamp-2">
          {link.url}
        </p>

        {/* Actions */}
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={handleDownload}
          >
            <Download className="w-3.5 h-3.5 mr-1" /> Download QR
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function HRDashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [timeLimit, setTimeLimit] = useState("60");
  const [links, setLinks] = useState<GeneratedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingWaId, setSendingWaId] = useState<string | null>(null);
  const [qrLink, setQrLink] = useState<GeneratedLink | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setTimeout(() => setNow(Date.now()), 0);
    const interval = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("hr_test_links");
    if (saved) {
      setTimeout(() => {
        try {
          setLinks(JSON.parse(saved));
        } catch {
          /* ignore */
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hr_test_links", JSON.stringify(links));
  }, [links]);

  const generateLink = () => {
    if (!name.trim() || !phone.trim() || !role.trim()) return;

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const createdAt = Date.now();
    const timeLimitNum = parseInt(timeLimit, 10);
    const expiresAt = createdAt + timeLimitNum * 60 * 1000;

    const params = new URLSearchParams({
      id,
      name: name.trim(),
      phone: phone.trim(),
      role: role.trim(),
      t: timeLimit,
      exp: expiresAt.toString(),
    });

    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${base}/test?${params.toString()}`;

    const newLink: GeneratedLink = {
      id,
      name: name.trim(),
      phone: phone.trim(),
      role: role.trim(),
      timeLimit: timeLimitNum,
      createdAt,
      expiresAt,
      url,
    };

    setLinks((prev) => [newLink, ...prev]);
    setName("");
    setPhone("");
    setRole("");

    // Auto-open the QR modal for the newly generated link
    setQrLink(newLink);
  };

  const copyLink = (link: GeneratedLink) => {
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendWhatsApp = async (link: GeneratedLink) => {
    setSendingWaId(link.id);
    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: link.phone, name: link.name, url: link.url }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("WhatsApp message sent!", {
          description: `Test link delivered to ${link.phone}`,
        });
      } else {
        toast.error("WhatsApp send failed", {
          description: data.error ?? "Unknown error from DoubleTick API",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not reach WhatsApp service. Check your connection.",
      });
    } finally {
      setSendingWaId(null);
    }
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const isExpired = (link: GeneratedLink) => now > 0 && now > link.expiresAt;

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* QR Modal */}
      {qrLink && (
        <QRModal link={qrLink} onClose={() => setQrLink(null)} />
      )}

      {/* Header */}
      <header className="border-b px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              Hiring Assessment Portal
            </h1>
            <p className="text-xs text-muted-foreground">
              Listening Attitude &amp; Communication Competency Test
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/results"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Results
            </Link>
            <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
              HR Admin
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Link Generator Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Generate Test Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Candidate Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs flex items-center gap-1">
                  <User className="w-3 h-3" /> Candidate Name *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Role / Position *
                </Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Sales Executive"
                />
              </div>

              {/* Time Limit */}
              <div className="space-y-1.5">
                <Label className="text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Time Limit (Minutes)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    min="1"
                    className="w-full font-medium"
                    placeholder="Custom minutes..."
                  />
                  <Select
                    value={
                      ["30", "45", "60", "90", "120"].includes(timeLimit)
                        ? timeLimit
                        : ""
                    }
                    onValueChange={(val) => val && setTimeLimit(val)}
                  >
                    <SelectTrigger className="w-28 shrink-0">
                      <SelectValue placeholder="Preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Min</SelectItem>
                      <SelectItem value="45">45 Min</SelectItem>
                      <SelectItem value="60">60 Min</SelectItem>
                      <SelectItem value="90">90 Min</SelectItem>
                      <SelectItem value="120">120 Min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={generateLink}
              disabled={!name.trim() || !phone.trim() || !role.trim()}
              className="w-full sm:w-auto"
            >
              Generate Link &amp; QR
            </Button>
          </CardContent>
        </Card>

        {/* Generated Links List */}
        {links.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Generated Links ({links.length})
            </h3>

            <div className="space-y-2">
              {links.map((link) => {
                const expired = isExpired(link);
                return (
                  <Card key={link.id} className={expired ? "opacity-50" : ""}>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold">{link.name}</span>
                            <Badge variant="secondary" className="text-[10px]">
                              {link.role}
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">
                              {link.phone}
                            </span>
                            {expired && (
                              <Badge variant="destructive" className="text-[10px]">
                                EXPIRED
                              </Badge>
                            )}
                          </div>
                          <div className="text-[10px] text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-0.5">
                            <span>Created: {formatDate(link.createdAt)}</span>
                            <span>Expires: {formatDate(link.expiresAt)}</span>
                            <span>{link.timeLimit} min</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                          {/* QR Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setQrLink(link)}
                            disabled={expired}
                            className="text-xs"
                            title="Show QR Code"
                          >
                            <QrCode className="w-3.5 h-3.5 mr-1" /> QR Code
                          </Button>

                          {/* Copy Link */}
                          <Button
                            size="sm"
                            variant={copiedId === link.id ? "default" : "outline"}
                            onClick={() => copyLink(link)}
                            disabled={expired}
                            className="text-xs"
                          >
                            {copiedId === link.id ? (
                              <><Check className="w-3.5 h-3.5 mr-1" /> Copied</>
                            ) : (
                              <><Copy className="w-3.5 h-3.5 mr-1" /> Copy</>
                            )}
                          </Button>

                          {/* WhatsApp */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendWhatsApp(link)}
                            disabled={expired || sendingWaId === link.id}
                            className="text-xs bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                          >
                            {sendingWaId === link.id ? "Sending..." : "WhatsApp"}
                          </Button>

                          {/* Delete */}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteLink(link.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {links.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No links generated yet. Fill in candidate details above to create a test link.
          </div>
        )}
      </main>

      <Separator />
      <footer className="py-4 px-4 text-center text-xs text-muted-foreground">
        Hiring Assessment Tool — Listening Attitude &amp; Communication Competency Analysis
      </footer>
    </div>
  );
}
