export type Role = "legal" | "brand" | "agency" | "sales" | "campaign" | "seo" | "paid" | "admin";
export type ApprovalStatus = "draft" | "in_review" | "approved" | "rejected" | "expired";

export interface TagSet {
  product: string[];
  persona: string[];
  channel: string[];
}

export interface AssetVersion {
  id: string;
  assetId: string;
  version: number;
  storagePath: string;
  createdBy: string;
  createdAt: string;
}

export interface AssetRecord {
  id: string;
  name: string;
  status: ApprovalStatus;
  tags: TagSet;
  campaignIds: string[];
  currentVersionId: string;
}

export interface AuditEntry {
  id: string;
  actor: string; // user id or "agent"
  action: string;
  entityType: string;
  entityId: string;
  at: string;
}

/** Only approved assets may be surfaced by search/RAG. */
export const isRetrievable = (a: Pick<AssetRecord, "status">) => a.status === "approved";
