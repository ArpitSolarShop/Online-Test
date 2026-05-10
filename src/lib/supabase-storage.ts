import { supabaseAdmin } from "./supabase";

const BUCKET_NAME = "Results";

/**
 * Upload a PDF buffer to Supabase Storage and return the file path.
 */
export async function uploadPDFToSupabase(
  pdfBuffer: Buffer,
  fileName: string
): Promise<{ path: string } | null> {
  try {
    const filePath = `reports/${fileName}`;

    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      console.error("[supabase-storage] Upload error:", error.message);
      return null;
    }

    return { path: filePath };
  } catch (err) {
    console.error("[supabase-storage] Upload exception:", err);
    return null;
  }
}

/**
 * Generate a signed URL for a PDF stored in Supabase Storage.
 * The URL is valid for the specified duration in seconds (default: 1 hour).
 */
export async function getSignedPDFUrl(
  filePath: string,
  expiresInSeconds = 3600
): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, expiresInSeconds);

    if (error) {
      console.error("[supabase-storage] Signed URL error:", error.message);
      return null;
    }

    return data.signedUrl;
  } catch (err) {
    console.error("[supabase-storage] Signed URL exception:", err);
    return null;
  }
}
