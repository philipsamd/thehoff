import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { assets as seedAssets, type Asset, type AssetStatus } from "./mockData";

type UploadInput = {
  name: string;
  type: string;
  product: string;
  campaign: string;
  channel: string;
  persona: string;
  status: AssetStatus;
  tags: string;
};

type Ctx = {
  assets: Asset[];
  addAsset: (i: UploadInput) => Asset;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
  uploadOpen: boolean;
  setUploadOpen: (o: boolean) => void;
};

const AssetsCtx = createContext<Ctx | null>(null);

const palette = [
  "from-sky-500 to-blue-700",
  "from-indigo-500 to-blue-700",
  "from-emerald-500 to-teal-700",
  "from-violet-500 to-indigo-700",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-red-700",
];

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>(seedAssets);
  const [globalSearch, setGlobalSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const addAsset = useCallback((i: UploadInput) => {
    const today = new Date().toISOString().slice(0, 10);
    const newAsset: Asset = {
      id: `AMD-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      name: i.name,
      type: i.type,
      product: i.product,
      campaign: i.campaign,
      channel: i.channel,
      persona: i.persona,
      funnelStage: "Awareness",
      region: "US",
      owner: "Maya Reynolds",
      status: i.status,
      version: "v0.1",
      expiration: "—",
      usageRights: "Internal",
      source: "Uploaded via Command Center",
      destination: "—",
      tags: i.tags.split(",").map((t) => t.trim()).filter(Boolean),
      utm: "—",
      approvalHistory: [{ stage: "Upload", by: "M. Reynolds", date: today }],
      related: [],
      performance: { impressions: 0, ctr: 0, downloads: 0 },
      thumbColor: palette[Math.floor(Math.random() * palette.length)],
    };
    setAssets((a) => [newAsset, ...a]);
    return newAsset;
  }, []);

  return (
    <AssetsCtx.Provider
      value={{ assets, addAsset, globalSearch, setGlobalSearch, uploadOpen, setUploadOpen }}
    >
      {children}
    </AssetsCtx.Provider>
  );
}

export function useAssets() {
  const c = useContext(AssetsCtx);
  if (!c) throw new Error("useAssets must be used within AssetsProvider");
  return c;
}
