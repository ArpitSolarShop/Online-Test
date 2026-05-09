import { google } from "googleapis";

/**
 * Appends a row of test results to a Google Sheet.
 *
 * Required env vars:
 *   GOOGLE_SHEETS_SPREADSHEET_ID  — The Sheet ID from the URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — Service account email
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — Private key (with \n escaped)
 */
export async function appendResultToSheet(data: {
  candidateName: string;
  candidatePhone: string;
  candidateRole: string;
  timeLimitMin: number;
  falseCount: number;
  listeningRating: string;
  actionScore: number;
  processScore: number;
  peopleScore: number;
  ideaScore: number;
  dominantStyle: string;
  totalSelected: number;
  createdAt: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!spreadsheetId || !email || !rawKey) {
    console.warn("[Google Sheets] Missing env vars — skipping sync");
    return false;
  }

  const privateKey = rawKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    data.createdAt,
    data.candidateName,
    data.candidatePhone,
    data.candidateRole,
    data.timeLimitMin,
    data.falseCount,
    data.listeningRating,
    data.actionScore,
    data.processScore,
    data.peopleScore,
    data.ideaScore,
    data.dominantStyle,
    data.totalSelected,
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:M",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
    return true;
  } catch (err) {
    console.error("[Google Sheets] Sync failed:", err);
    return false;
  }
}
