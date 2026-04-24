import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Careers Application", () => {
  it("successfully submits a job application with resume", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // Create a simple PDF-like base64 string (mock resume)
    const mockPdfContent = Buffer.from("Mock PDF Resume Content").toString("base64");
    const base64Resume = `data:application/pdf;base64,${mockPdfContent}`;

    const testApplication = {
      fullName: "John Doe",
      email: `test+${Date.now()}@bluecafemiami.com`,
      phone: "(305) 123-4567",
      previousJob1: "Cashier at Starbucks (2022-2024)",
      previousJob2: "Server at Local Restaurant (2020-2022)",
      experience: "I have 4 years of customer service experience in fast-paced environments. I'm comfortable handling cash, processing payments, and providing excellent service with a smile.",
      availability: "Monday-Friday 9am-5pm, flexible on weekends",
      resumeData: base64Resume,
      resumeFileName: "john_doe_resume.pdf",
      resumeFileType: "application/pdf",
    };

    const result = await caller.careers.submitApplication(testApplication);

    expect(result.success).toBe(true);
  }, 15000); // 15 second timeout for email API call

  it("rejects application without required fields", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.careers.submitApplication({
        fullName: "",
        email: "invalid",
        phone: "",
        previousJob1: "",
        experience: "",
        availability: "",
        resumeData: "",
        resumeFileName: "",
        resumeFileType: "",
      })
    ).rejects.toThrow();
  });

  it("rejects application with invalid email format", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const mockPdfContent = Buffer.from("Mock PDF Resume Content").toString("base64");
    const base64Resume = `data:application/pdf;base64,${mockPdfContent}`;

    await expect(
      caller.careers.submitApplication({
        fullName: "John Doe",
        email: "not-an-email",
        phone: "(305) 123-4567",
        previousJob1: "Previous Job",
        experience: "Experience",
        availability: "Flexible",
        resumeData: base64Resume,
        resumeFileName: "resume.pdf",
        resumeFileType: "application/pdf",
      })
    ).rejects.toThrow();
  });
});
