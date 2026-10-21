import { describe, expect, it } from "vitest";
import { agentTools, canUseTool, requiresConfirmation } from "@/lib/agentTools";
import { isRetrievable } from "@/lib/domain";

describe("agent tools", () => {
  it("requires confirmation for write tools only", () => {
    for (const t of agentTools) expect(requiresConfirmation(t)).toBe(t.write);
    expect(agentTools.find((t) => t.name === "create_campaign")?.write).toBe(true);
  });
  it("enforces roles", () => {
    const t = agentTools.find((x) => x.name === "create_campaign")!;
    expect(canUseTool(t, "sales")).toBe(false);
    expect(canUseTool(t, "campaign")).toBe(true);
  });
  it("only retrieves approved assets", () => {
    expect(isRetrievable({ status: "approved" })).toBe(true);
    expect(isRetrievable({ status: "draft" })).toBe(false);
  });
});
