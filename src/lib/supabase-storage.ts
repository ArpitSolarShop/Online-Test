import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = "Results";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_S3_REGION!,
  endpoint: process.env.SUPABASE_S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload a PDF buffer to Supabase Storage via S3 protocol and return the file path.
 */
export async function uploadPDFToSupabase(
  pdfBuffer: Buffer,
  fileName: string
): Promise<{ path: string } | null> {
  try {
    const filePath = `reports/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    });

    await s3Client.send(command);

    return { path: filePath };
  } catch (err) {
    console.error("[supabase-storage] S3 Upload exception:", err);
    return null;
  }
}

/**
 * Generate a signed URL for a PDF stored in Supabase Storage via S3 protocol.
 * The URL is valid for the specified duration in seconds (default: 1 hour).
 */
export async function getSignedPDFUrl(
  filePath: string,
  expiresInSeconds = 3600
): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });

    // Generate signed URL via S3 SDK
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    return signedUrl;
  } catch (err) {
    console.error("[supabase-storage] S3 Signed URL exception:", err);
    return null;
  }
}
