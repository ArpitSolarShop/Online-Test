import PDFDocument from "pdfkit";
import { styleDescriptions } from "@/data/questions";

interface ResultData {
  candidateName: string;
  candidatePhone: string;
  candidateRole: string;
  createdAt: string;
  falseCount: number;
  listeningRating: string;
  actionScore: number;
  processScore: number;
  peopleScore: number;
  ideaScore: number;
  dominantStyle: string;
  totalSelected: number;
}

const ratingLabels: Record<string, string> = {
  empathetic: "You are an empathetic listener (1-5)",
  good: "You are good but can improve on listening (6-10)",
  practice: "You can become a better listener through regular practice (11-15)",
  poor: "You need to listen up (16-20)",
};

/**
 * Generates a PDF buffer of the candidate's test results.
 */
export async function generateResultPDF(data: ResultData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - 100; // margins

    // ── HEADER ──
    doc.fontSize(18).font("Helvetica-Bold")
      .text("Listening Attitude & Competency Analysis", { align: "center" });
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica")
      .fillColor("#666666")
      .text("Hiring Assessment Report", { align: "center" });
    doc.moveDown(0.5);

    // Divider
    doc.moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).strokeColor("#e0e0e0").stroke();
    doc.moveDown(0.8);

    // ── CANDIDATE INFO ──
    doc.fillColor("#000000");
    doc.fontSize(12).font("Helvetica-Bold").text("Candidate Information");
    doc.moveDown(0.4);
    doc.fontSize(10).font("Helvetica");

    const infoRows = [
      ["Name", data.candidateName],
      ["Phone", data.candidatePhone],
      ["Role", data.candidateRole],
      ["Date", new Date(data.createdAt).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })],
    ];

    infoRows.forEach(([label, value]) => {
      doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
      doc.font("Helvetica").text(value);
    });

    doc.moveDown(1);

    // ── PART 1: LISTENING ATTITUDE ──
    doc.fontSize(12).font("Helvetica-Bold")
      .text("Part 1: Listening Attitude Score");
    doc.moveDown(0.4);
    doc.fontSize(10).font("Helvetica");
    doc.text(`False Answers: ${data.falseCount} out of 20`);
    doc.font("Helvetica-Bold")
      .text(`Rating: ${ratingLabels[data.listeningRating] || data.listeningRating}`);
    doc.moveDown(1);

    // ── PART 2: SCORING SHEET ──
    doc.fontSize(12).font("Helvetica-Bold")
      .text("Part 2: Communication Style Scores");
    doc.moveDown(0.4);
    doc.fontSize(10).font("Helvetica");
    doc.text(`Total Statements Selected: ${data.totalSelected}/40`);
    doc.moveDown(0.5);

    // Score table
    const styles = [
      { name: "ACTION (A)", key: "Action", score: data.actionScore },
      { name: "PROCESS (PR)", key: "Process", score: data.processScore },
      { name: "PEOPLE (PE)", key: "People", score: data.peopleScore },
      { name: "IDEA (I)", key: "Idea", score: data.ideaScore },
    ];

    const tableTop = doc.y;

    // Header row
    doc.font("Helvetica-Bold");
    doc.text("Style", 50, tableTop);
    doc.text("Score", 200, tableTop);
    doc.text("Max", 280, tableTop);
    doc.text("Dominant", 360, tableTop);
    doc.moveDown(0.3);
    doc.moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).strokeColor("#cccccc").stroke();
    doc.moveDown(0.3);

    doc.font("Helvetica");
    styles.forEach((s) => {
      const y = doc.y;
      const isDominant = s.key === data.dominantStyle;
      doc.text(s.name, 50, y);
      doc.text(`${s.score}`, 200, y);
      doc.text("20", 280, y);
      doc.text(isDominant ? "★ YES" : "", 360, y);
      doc.moveDown(0.2);
    });

    doc.moveDown(0.8);

    // ── DOMINANT STYLE DETAILS ──
    doc.fontSize(12).font("Helvetica-Bold")
      .text(`Dominant Style: ${styleDescriptions[data.dominantStyle]?.title || data.dominantStyle}`);
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica");

    const desc = styleDescriptions[data.dominantStyle];
    if (desc) {
      doc.text(`Focus: ${desc.focus} — ${desc.description}`);
      doc.moveDown(0.5);

      // Content
      doc.font("Helvetica-Bold").text("Content (People talk about):");
      doc.font("Helvetica");
      desc.content.forEach((c) => doc.text(`  • ${c}`));
      doc.moveDown(0.3);

      // Process
      doc.font("Helvetica-Bold").text("Process (People are):");
      doc.font("Helvetica");
      desc.process.forEach((p) => doc.text(`  • ${p}`));
    }

    doc.moveDown(1);

    // ── MAIN CHARACTERISTICS TABLE ──
    doc.fontSize(12).font("Helvetica-Bold")
      .text("Main Characteristics of All Communication Styles");
    doc.moveDown(0.4);

    (["Action", "Process", "People", "Idea"] as const).forEach((style) => {
      const sd = styleDescriptions[style];
      if (!sd) return;
      const isDom = style === data.dominantStyle;
      doc.fontSize(10).font("Helvetica-Bold")
        .text(`${sd.title} — ${sd.focus}${isDom ? " ★ DOMINANT" : ""}`, { underline: isDom });
      doc.font("Helvetica").fontSize(9);
      doc.text(`  Content: ${sd.content.join(", ")}`);
      doc.text(`  Process: ${sd.process.join(", ")}`);
      doc.moveDown(0.3);
    });

    // ── FOOTER ──
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).strokeColor("#e0e0e0").stroke();
    doc.moveDown(0.3);
    doc.fontSize(8).fillColor("#999999").font("Helvetica")
      .text("This report was auto-generated by the Hiring Assessment Portal — Listening Attitude & Competency Analysis", { align: "center" });
    doc.text(`Generated on: ${new Date().toISOString()}`, { align: "center" });

    doc.end();
  });
}
