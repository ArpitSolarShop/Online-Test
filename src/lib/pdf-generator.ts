import PDFDocument from "pdfkit";
import {
  listeningQuestions,
  competencyQuestions,
  styleDescriptions,
} from "@/data/questions";

interface FullResultData {
  candidateName: string;
  candidatePhone: string;
  candidateRole: string;
  createdAt: string;
  listeningAnswers: Record<string, boolean>;
  competencyAnswers: Record<string, boolean>;
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
  empathetic: "You are an empathetic listener (1-5 false)",
  good: "You are good but can improve on listening (6-10 false)",
  practice:
    "You can become a better listener through regular practice (11-15 false)",
  poor: "You need to listen up (16-20 false)",
};

// Scoring sheet mapping — which question IDs belong to which style
const scoringSheet: Record<string, number[]> = {
  Action: [1,8,9,13,17,24,26,31,33,40,41,48,50,53,57,63,65,70,74,79],
  Process: [2,7,10,14,18,23,25,30,34,37,42,47,51,55,58,62,66,69,75,78],
  People: [3,6,11,15,19,22,27,29,35,38,43,46,49,56,59,64,67,71,76,80],
  Idea: [4,5,12,16,20,21,28,32,36,39,44,45,52,54,60,61,68,72,73,77],
};

/**
 * Generates a comprehensive PDF matching the original assessment document format.
 * Includes: circled answers on scoring sheet, selected style boxes, full characteristics table.
 */
export async function generateResultPDF(data: FullResultData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageW = doc.page.width;
    const margin = 40;
    const contentW = pageW - margin * 2;

    // ═══════════════════════════════════════════════
    // PAGE 1 — TITLE + CANDIDATE INFO + LISTENING
    // ═══════════════════════════════════════════════

    // Title
    doc.fontSize(16).font("Helvetica-Bold")
      .text("Listening Attitude & Competency Analysis", margin, 40, { align: "center" });
    doc.moveDown(0.2);
    doc.fontSize(9).font("Helvetica").fillColor("#666666")
      .text("Hiring Assessment Report", { align: "center" });

    // Divider
    doc.moveDown(0.5);
    drawLine(doc, margin, doc.y, contentW);
    doc.moveDown(0.5);

    // Candidate Info Box
    doc.fillColor("#000000");
    doc.fontSize(11).font("Helvetica-Bold").text("Candidate Information", margin);
    doc.moveDown(0.3);
    doc.fontSize(9).font("Helvetica");
    const info = [
      ["Name", data.candidateName],
      ["Phone", data.candidatePhone],
      ["Role", data.candidateRole],
      ["Date", new Date(data.createdAt).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })],
    ];
    info.forEach(([label, value]) => {
      doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
      doc.font("Helvetica").text(value);
    });

    doc.moveDown(0.8);
    drawLine(doc, margin, doc.y, contentW);
    doc.moveDown(0.5);

    // ── PART 1: LISTENING ATTITUDE ──
    doc.fontSize(11).font("Helvetica-Bold")
      .text("Part 1: Listening Attitude Assessment", margin);
    doc.moveDown(0.2);
    doc.fontSize(8).font("Helvetica").fillColor("#666666")
      .text("Instructions: Each statement is marked True (✓) or False (✗) based on candidate's self-assessment.", margin);
    doc.moveDown(0.4);
    doc.fillColor("#000000");

    // Listening questions with True/False answers
    listeningQuestions.forEach((q) => {
      const answer = data.listeningAnswers[String(q.id)];
      const isFalse = answer === false;

      // Check if we need a new page
      if (doc.y > 720) {
        doc.addPage();
      }

      const y = doc.y;
      // Question number
      doc.fontSize(8).font("Helvetica-Bold").text(`${q.id}.`, margin, y, { width: 18 });

      // Question text
      doc.font("Helvetica").text(q.textEn, margin + 20, y, { width: contentW - 90 });

      // Answer indicator
      const answerX = pageW - margin - 55;
      if (isFalse) {
        // Highlight FALSE answers with a red circle
        doc.save();
        doc.circle(answerX + 18, y + 4, 10).fillColor("#FEE2E2").fill();
        doc.fontSize(8).font("Helvetica-Bold").fillColor("#DC2626")
          .text("FALSE", answerX, y, { width: 40, align: "center" });
        doc.restore();
        doc.fillColor("#000000");
      } else {
        doc.fontSize(8).font("Helvetica").fillColor("#16A34A")
          .text("TRUE", answerX, y, { width: 40, align: "center" });
        doc.fillColor("#000000");
      }

      doc.moveDown(0.3);
    });

    // Listening Score Summary
    doc.moveDown(0.5);
    drawLine(doc, margin, doc.y, contentW);
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica-Bold")
      .text(`False Answers: ${data.falseCount} out of 20`, margin);
    doc.fontSize(9).font("Helvetica-Bold");

    // Highlight the rating
    const ratingText = ratingLabels[data.listeningRating] || data.listeningRating;
    const ratingColor =
      data.listeningRating === "empathetic" ? "#16A34A" :
      data.listeningRating === "good" ? "#2563EB" :
      data.listeningRating === "practice" ? "#D97706" : "#DC2626";
    doc.fillColor(ratingColor).text(`Rating: ${ratingText}`);
    doc.fillColor("#000000");

    // ═══════════════════════════════════════════════
    // PAGE 2+ — COMPETENCY ASSESSMENT QUESTIONS
    // ═══════════════════════════════════════════════
    doc.addPage();

    doc.fontSize(14).font("Helvetica-Bold")
      .text("Part 2: Competency Assessment", margin, 40, { align: "center" });
    doc.moveDown(0.2);
    doc.fontSize(8).font("Helvetica").fillColor("#666666")
      .text("Instructions: Each statement is marked True (✓) or False (✗) based on candidate's self-assessment.", { align: "center" });
    doc.moveDown(0.8);
    doc.fillColor("#000000");

    // Competency questions with True/False answers
    competencyQuestions.forEach((q) => {
      const answer = data.competencyAnswers[String(q.id)];
      const isSelected = answer === true; // In the UI, selecting it means True

      if (doc.y > 750) {
        doc.addPage();
      }

      const y = doc.y;
      doc.fontSize(8).font("Helvetica-Bold").text(`${q.id}.`, margin, y, { width: 18 });
      doc.font("Helvetica").text(q.textEn, margin + 20, y, { width: contentW - 90 });

      const answerX = pageW - margin - 55;
      if (isSelected) {
        doc.save();
        doc.circle(answerX + 18, y + 4, 10).fillColor("#DBEAFE").fill();
        doc.fontSize(8).font("Helvetica-Bold").fillColor("#2563EB")
          .text("TRUE", answerX, y, { width: 40, align: "center" });
        doc.restore();
        doc.fillColor("#000000");
      } else {
        doc.fontSize(8).font("Helvetica").fillColor("#9CA3AF")
          .text("FALSE", answerX, y, { width: 40, align: "center" });
        doc.fillColor("#000000");
      }

      doc.moveDown(0.4);
    });

    // ═══════════════════════════════════════════════
    // SCORING SHEET (Now Part 3)
    // ═══════════════════════════════════════════════
    doc.addPage();

    doc.fontSize(14).font("Helvetica-Bold")
      .text("Part 3: Competency Scoring Sheet", margin, 40, { align: "center" });
    doc.moveDown(0.2);
    doc.fontSize(8).font("Helvetica").fillColor("#666666")
      .text("Instructions: Circle the items you have selected and add up the totals for each style.", { align: "center" });
    doc.moveDown(0.1);
    doc.text("The maximum is 20 per style and your total for the four styles should be 40.", { align: "center" });
    doc.moveDown(0.5);
    doc.fillColor("#000000");

    // Build set of selected question IDs for quick lookup
    const selectedIds = new Set<number>();
    Object.entries(data.competencyAnswers).forEach(([idStr, val]) => {
      if (val === true) selectedIds.add(parseInt(idStr, 10));
    });

    // Scoring sheet table
    const styleNames = ["Action", "Process", "People", "Idea"] as const;
    const styleMeta = [
      { label: "Style 1", code: "ACTION (A)", focus: "What" },
      { label: "Style 2", code: "PROCESS (PR)", focus: "How" },
      { label: "Style 3", code: "PEOPLE (PE)", focus: "Who" },
      { label: "Style 4", code: "IDEA (I)", focus: "Why" },
    ];

    const scores = [data.actionScore, data.processScore, data.peopleScore, data.ideaScore];

    // Table header
    const tableY = doc.y;
    const col1W = 65; // Style label
    const colNumW = 22; // Each number cell
    const colScoreW = 40; // Score column

    // Header row
    doc.fontSize(8).font("Helvetica-Bold");
    doc.text("Style", margin, tableY, { width: col1W });
    doc.text("Circle your answer here", margin + col1W, tableY, { width: colNumW * 20 });
    doc.text("Score", margin + col1W + colNumW * 20, tableY, { width: colScoreW, align: "center" });
    doc.moveDown(0.3);
    drawLine(doc, margin, doc.y, contentW);
    doc.moveDown(0.4);

    // Each style row
    styleNames.forEach((style, idx) => {
      const rowY = doc.y;
      const qIds = scoringSheet[style];
      const score = scores[idx];
      const isDominant = style === data.dominantStyle;

      // Highlight dominant style row background
      if (isDominant) {
        doc.save();
        doc.rect(margin - 2, rowY - 2, contentW + 4, 28)
          .fillColor("#EFF6FF").fill();
        doc.restore();
        doc.fillColor("#000000");
      }

      // Style label
      doc.fontSize(8).font("Helvetica-Bold")
        .text(`${styleMeta[idx].label}`, margin, rowY, { width: col1W - 2 });
      doc.fontSize(7).font("Helvetica")
        .text(`${styleMeta[idx].code}`, margin, rowY + 10, { width: col1W - 2 });

      // Question numbers — circle selected ones
      qIds.forEach((qId, numIdx) => {
        const numX = margin + col1W + numIdx * colNumW;
        const isSelected = selectedIds.has(qId);

        if (isSelected) {
          // Draw a filled circle around selected numbers
          doc.save();
          doc.circle(numX + colNumW / 2 - 1, rowY + 6, 9)
            .lineWidth(1.5)
            .strokeColor("#2563EB")
            .fillColor("#DBEAFE")
            .fillAndStroke();
          doc.restore();
          doc.fillColor("#000000");
        }

        doc.fontSize(7).font(isSelected ? "Helvetica-Bold" : "Helvetica")
          .text(String(qId), numX, rowY + 2, { width: colNumW, align: "center" });
      });

      // Total score
      doc.fontSize(11).font("Helvetica-Bold");
      if (isDominant) {
        doc.fillColor("#2563EB");
      }
      doc.text(String(score), margin + col1W + colNumW * 20, rowY + 2, {
        width: colScoreW, align: "center",
      });
      doc.fillColor("#000000");

      doc.y = rowY + 30;
      drawLine(doc, margin, doc.y, contentW, "#e5e7eb");
      doc.moveDown(0.3);
    });

    // Dominant Style callout
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica-Bold")
      .text(`Total Selected: ${data.totalSelected}/40`, margin);
    doc.moveDown(0.3);

    const domDesc = styleDescriptions[data.dominantStyle];
    if (domDesc) {
      doc.save();
      const boxY = doc.y;
      doc.rect(margin, boxY, contentW, 40)
        .fillColor("#EFF6FF").fill();
      doc.rect(margin, boxY, 4, 40)
        .fillColor("#2563EB").fill();
      doc.restore();
      doc.fillColor("#000000");

      doc.fontSize(11).font("Helvetica-Bold")
        .text(`Dominant Style: ${domDesc.title}`, margin + 12, boxY + 6);
      doc.fontSize(9).font("Helvetica")
        .text(`Focus: ${domDesc.focus} — ${domDesc.description}`, margin + 12, boxY + 22);
    }

    // ═══════════════════════════════════════════════
    // PAGE 3 — COMMUNICATION STYLES CHARACTERISTICS
    // ═══════════════════════════════════════════════
    doc.addPage();

    doc.fontSize(13).font("Helvetica-Bold")
      .text("The Four Communication Styles", margin, 40, { align: "center" });
    doc.moveDown(0.8);

    // Four style summary boxes
    const boxW = (contentW - 15) / 4;
    const boxStartY = doc.y;

    styleNames.forEach((style, idx) => {
      const sd = styleDescriptions[style];
      if (!sd) return;
      const isDom = style === data.dominantStyle;
      const boxX = margin + idx * (boxW + 5);

      // Box background
      doc.save();
      if (isDom) {
        doc.rect(boxX, boxStartY, boxW, 65)
          .fillColor("#2563EB").fill();
      } else {
        doc.rect(boxX, boxStartY, boxW, 65)
          .lineWidth(1).strokeColor("#d1d5db").stroke();
      }
      doc.restore();

      // Style code
      doc.fontSize(10).font("Helvetica-Bold")
        .fillColor(isDom ? "#FFFFFF" : "#000000")
        .text(sd.title, boxX + 4, boxStartY + 5, { width: boxW - 8, align: "center" });

      // Focus
      doc.fontSize(9).font("Helvetica")
        .fillColor(isDom ? "#DBEAFE" : "#666666")
        .text(sd.focus, boxX + 4, boxStartY + 22, { width: boxW - 8, align: "center" });

      // Description
      doc.fontSize(7).font("Helvetica")
        .fillColor(isDom ? "#BFDBFE" : "#999999")
        .text(sd.description, boxX + 4, boxStartY + 35, { width: boxW - 8, align: "center" });

      doc.fillColor("#000000");
    });

    doc.y = boxStartY + 80;

    // ── MAIN CHARACTERISTICS TABLE ──
    doc.fontSize(11).font("Helvetica-Bold")
      .text("Main Characteristics of Communication Styles", margin);
    doc.moveDown(0.4);

    // Table header
    const charColW = [contentW * 0.15, contentW * 0.30, contentW * 0.30, contentW * 0.25];
    const charHeaders = ["STYLE", "CONTENT\nPeople talk about", "PROCESS\nPeople are", "Score"];

    let charY = doc.y;
    doc.save();
    doc.rect(margin, charY, contentW, 22).fillColor("#f3f4f6").fill();
    doc.restore();
    doc.fillColor("#000000");

    doc.fontSize(7).font("Helvetica-Bold");
    let charX = margin;
    charHeaders.forEach((h, i) => {
      doc.text(h, charX + 3, charY + 3, { width: charColW[i] - 6 });
      charX += charColW[i];
    });

    charY += 25;
    drawLine(doc, margin, charY, contentW);
    charY += 4;

    // Each style row
    styleNames.forEach((style, idx) => {
      const sd = styleDescriptions[style];
      if (!sd) return;
      const isDom = style === data.dominantStyle;
      const rowHeight = Math.max(sd.content.length, sd.process.length) * 10 + 16;

      // Check for page break
      if (charY + rowHeight > 770) {
        doc.addPage();
        charY = 40;
      }

      // Highlight dominant row
      if (isDom) {
        doc.save();
        doc.rect(margin, charY - 2, contentW, rowHeight + 4)
          .fillColor("#EFF6FF").fill();
        doc.restore();
        doc.fillColor("#000000");
      }

      charX = margin;

      // Style name
      doc.fontSize(8).font("Helvetica-Bold")
        .text(`${sd.title}`, charX + 3, charY, { width: charColW[0] - 6 });
      doc.fontSize(7).font("Helvetica").fillColor("#666666")
        .text(sd.focus, charX + 3, charY + 12, { width: charColW[0] - 6 });
      if (isDom) {
        doc.fontSize(6).font("Helvetica-Bold").fillColor("#2563EB")
          .text("★ DOMINANT", charX + 3, charY + 22, { width: charColW[0] - 6 });
      }
      doc.fillColor("#000000");
      charX += charColW[0];

      // Content
      doc.fontSize(7).font("Helvetica");
      sd.content.forEach((c, ci) => {
        doc.text(`• ${c}`, charX + 3, charY + ci * 10, { width: charColW[1] - 6 });
      });
      charX += charColW[1];

      // Process
      sd.process.forEach((p, pi) => {
        doc.text(`• ${p}`, charX + 3, charY + pi * 10, { width: charColW[2] - 6 });
      });
      charX += charColW[2];

      // Score
      doc.fontSize(14).font("Helvetica-Bold");
      if (isDom) doc.fillColor("#2563EB");
      doc.text(String(scores[idx]), charX + 3, charY + 10, { width: charColW[3] - 6, align: "center" });
      doc.fontSize(7).font("Helvetica").fillColor("#666666")
        .text("/ 20", charX + 3, charY + 26, { width: charColW[3] - 6, align: "center" });
      doc.fillColor("#000000");

      charY += rowHeight + 6;
      drawLine(doc, margin, charY, contentW, "#e5e7eb");
      charY += 4;
    });

    // ── FOOTER ──
    doc.moveDown(1);
    drawLine(doc, margin, doc.y > charY ? doc.y : charY + 10, contentW);
    const footerY = Math.max(doc.y, charY + 14);
    doc.fontSize(7).fillColor("#999999").font("Helvetica")
      .text(
        "This report was auto-generated by the Hiring Assessment Portal — Listening Attitude & Competency Analysis",
        margin, footerY, { align: "center", width: contentW }
      );
    doc.text(`Generated on: ${new Date().toISOString()}`, {
      align: "center",
      width: contentW,
    });

    doc.end();
  });
}

/** Helper: draw a horizontal line */
function drawLine(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  color = "#d1d5db"
) {
  doc.moveTo(x, y).lineTo(x + width, y).strokeColor(color).lineWidth(0.5).stroke();
}
