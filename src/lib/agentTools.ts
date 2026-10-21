import type { Role } from "./domain";

export interface AgentTool {
  name: string;
  description: string;
  write: boolean; // write actions require human confirmation
  roles: Role[];
  parameters: Record<string, unknown>;
}

export const agentTools: AgentTool[] = [
  {
    name: "search_assets",
    description: "Search approved assets by query and optional tags.",
    write: false,
    roles: ["legal", "brand", "agency", "sales", "campaign", "seo", "paid", "admin"],
    parameters: {
      type: "object",
      properties: { query: { type: "string" }, tags: { type: "array", items: { type: "string" } } },
      required: ["query"],
    },
  },
  {
    name: "draft_brief",
    description: "Draft a campaign brief from a goal and audience.",
    write: false,
    roles: ["campaign", "seo", "paid", "admin"],
    parameters: {
      type: "object",
      properties: { goal: { type: "string" }, audience: { type: "string" } },
      required: ["goal"],
    },
  },
  {
    name: "create_campaign",
    description: "Create a campaign workspace.",
    write: true,
    roles: ["campaign", "admin"],
    parameters: { type: "object", properties: { name: { type: "string" } }, required: ["name"] },
  },
  {
    name: "request_approval",
    description: "Submit an asset for approval review.",
    write: true,
    roles: ["campaign", "agency", "brand", "admin"],
    parameters: { type: "object", properties: { assetId: { type: "string" } }, required: ["assetId"] },
  },
];

export const canUseTool = (tool: AgentTool, role: Role) => tool.roles.includes(role);

/** Write tools must be explicitly confirmed by a human before execution. */
export const requiresConfirmation = (tool: AgentTool) => tool.write;
