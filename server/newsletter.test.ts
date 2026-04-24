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

describe("Newsletter Subscription", () => {
  it("successfully subscribes a valid email to Brevo", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test+${Date.now()}@bluecafemiami.com`;

    const result = await caller.newsletter.subscribe({ email: testEmail });

    expect(result.success).toBe(true);
    expect(result.message).toBeDefined();
  }, 10000); // 10 second timeout for API call

  it("handles duplicate subscription gracefully", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = "duplicate@bluecafemiami.com";

    // Subscribe once
    await caller.newsletter.subscribe({ email: testEmail });

    // Subscribe again with same email
    const result = await caller.newsletter.subscribe({ email: testEmail });

    expect(result.success).toBe(true);
  }, 15000); // 15 second timeout for two API calls

  it("rejects invalid email format", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({ email: "invalid-email" })
    ).rejects.toThrow();
  });
});
