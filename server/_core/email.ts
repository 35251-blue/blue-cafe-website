import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
};

/**
 * Sends an email using the Resend API.
 * Returns true if successful, false if the service is unavailable.
 * Throws TRPCError for validation or configuration issues.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.resendApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service API key is not configured.",
    });
  }

  const { to, subject, html, from = "Blue Cafe Events <events@bluecafemiami.com>", attachments } = payload;

  if (!to || !subject || !html) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email requires 'to', 'subject', and 'html' fields.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ENV.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(attachments && attachments.length > 0 ? {
          attachments: attachments.map(att => ({
            filename: att.filename,
            content: att.content.toString('base64'),
          }))
        } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Email] Failed to send email:", response.status, errorData);
      return false;
    }

    const result = await response.json();
    console.log("[Email] Email sent successfully:", result.id);
    return true;
  } catch (error) {
    console.error("[Email] Error calling Resend API:", error);
    return false;
  }
}
