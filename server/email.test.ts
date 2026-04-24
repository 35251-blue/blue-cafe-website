import { describe, expect, it } from "vitest";
import { sendEmail } from "./_core/email";

describe("email.sendEmail", () => {
  it("should validate Resend API key by sending a test email", async () => {
    const result = await sendEmail({
      to: "info@bluecafemiami.com",
      subject: "Test Email from Blue Cafe Website",
      html: "<p>This is a test email to validate the Resend API key with verified domain.</p>",
    });

    // If the API key is valid, the function should return true
    // If invalid, it will return false or throw an error
    expect(result).toBe(true);
  }, 15000); // 15 second timeout for API call
});
