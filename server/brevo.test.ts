import { describe, expect, it } from "vitest";
import { validateBrevoApiKey } from "./_core/brevo";

describe("Brevo API Integration", () => {
  it("validates Brevo API key successfully", async () => {
    const isValid = await validateBrevoApiKey();
    expect(isValid).toBe(true);
  }, 10000); // 10 second timeout for API call
});
