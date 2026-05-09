import { google } from "googleapis";
import { Readable } from "stream";

/**
 * Uploads a PDF buffer to Google Drive.
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — Service account email
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — Private key (with \n escaped)
 *   GOOGLE_DRIVE_FOLDER_ID        — ID of the shared Drive folder for HR results
 */
export async function uploadPDFToDrive(
  pdfBuffer: Buffer,
  fileName: string
): Promise<{ fileId: string; webViewLink: string } | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!email || !rawKey || !folderId) {
    console.warn("[Google Drive] Missing env vars — skipping PDF upload");
    return null;
  }

  const privateKey = rawKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/pdf",
        parents: [folderId],
      },
      media: {
        mimeType: "application/pdf",
        body: Readable.from(pdfBuffer),
      },
      fields: "id, webViewLink",
    });

    return {
      fileId: response.data.id || "",
      webViewLink: response.data.webViewLink || "",
    };
  } catch (err) {
    console.error("[Google Drive] Upload failed:", err);
    return null;
  }
}
