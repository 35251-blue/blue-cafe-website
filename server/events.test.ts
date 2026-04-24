import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createTestContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("events.submitInquiry", () => {
  it("should successfully submit an event inquiry", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.events.submitInquiry({
      eventType: "Birthday Party",
      date: "2026-02-15",
      guests: 25,
      details: "Need vegetarian options",
      name: "John Doe",
      email: "john@example.com",
      phone: "786-123-4567",
    });

    expect(result).toEqual({ success: true });
  });

  it("should validate email format", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.events.submitInquiry({
        eventType: "Corporate Event",
        date: "2026-03-20",
        guests: 50,
        name: "Jane Smith",
        email: "invalid-email",
        phone: "786-987-6543",
      })
    ).rejects.toThrow();
  });
});
