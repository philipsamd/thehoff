import { useState, useRef, DragEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssets } from "@/lib/store";
import { UploadCloud, FileCheck2 } from "lucide-react";
import { toast } from "sonner";
import type { AssetStatus } from "@/lib/mockData";

const products = ["MCOT", "ePatch", "IntelliSpace ECG", "Cardiac Workstation", "Cardiologs"];
const channels = ["LinkedIn", "Google SEA", "Seismic", "OneSite", "Email", "Event", "SEO"];
const personas = ["PCP", "EP", "Cardiologist", "C-suite", "VA/DoD", "Service Line Leader"];
const types = ["Video", "Presentation", "PDF", "Document", "Image", "Spreadsheet", "Archive"];
const statuses: AssetStatus[] = ["Draft", "In Review", "Legal Approved", "Final Approved"];

export function UploadAssetDialog() {
  const { uploadOpen, setUploadOpen, addAsset } = useAssets();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Document",
    product: "MCOT",
    campaign: "",
    channel: "LinkedIn",
    persona: "PCP",
    status: "Draft" as AssetStatus,
    tags: "",
  });

  const reset = () => {
    setFile(null);
    setForm({
      name: "",
      type: "Document",
      product: "MCOT",
      campaign: "",
      channel: "LinkedIn",
      persona: "PCP",
      status: "Draft",
      tags: "",
    });
  };

  const pick = (f: File) => {
    setFile(f);
    setForm((s) => ({ ...s, name: s.name || f.name }));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) pick(f);
  };

  const submit = () => {
    if (!form.name) {
      toast.error("Asset name required");
      return;
    }
    const a = addAsset(form);
    toast.success("Asset uploaded", { description: `${a.name} added to library (${a.id})` });
    reset();
    setUploadOpen(false);
  };

  return (
    <Dialog
      open={uploadOpen}
      onOpenChange={(o) => {
        setUploadOpen(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload Asset</DialogTitle>
          <DialogDescription>
            Add a new governed asset. Metadata is required for downstream routing.
          </DialogDescription>
        </DialogHeader>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragOver ? "border-primary bg-primary-soft" : "border-border bg-muted/30 hover:bg-muted/60"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
          />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-sm">
              <FileCheck2 className="h-5 w-5 text-primary" />
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground">({Math.round(file.size / 1024)} KB)</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
              <UploadCloud className="h-7 w-7 text-primary mb-1" />
              <span className="font-medium text-foreground">Drop file or click to browse</span>
              <span className="text-xs">PDF, PPTX, MP4, PSD, ZIP, XLSX…</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Asset Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. MCOT_Trust_LinkedIn_v3.mp4"
            />
          </Field>
          <Field label="Type">
            <Picker v={form.type} on={(v) => setForm({ ...form, type: v })} opts={types} />
          </Field>
          <Field label="Product">
            <Picker v={form.product} on={(v) => setForm({ ...form, product: v })} opts={products} />
          </Field>
          <Field label="Campaign">
            <Input
              value={form.campaign}
              onChange={(e) => setForm({ ...form, campaign: e.target.value })}
              placeholder="e.g. HRS 2026"
            />
          </Field>
          <Field label="Channel">
            <Picker v={form.channel} on={(v) => setForm({ ...form, channel: v })} opts={channels} />
          </Field>
          <Field label="Persona">
            <Picker v={form.persona} on={(v) => setForm({ ...form, persona: v })} opts={personas} />
          </Field>
          <Field label="Status">
            <Picker
              v={form.status}
              on={(v) => setForm({ ...form, status: v as AssetStatus })}
              opts={statuses}
            />
          </Field>
          <Field label="Tags (comma sep.)">
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="MCOT, AFib, PCP"
            />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setUploadOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-gradient-primary" onClick={submit}>
            Upload to Library
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    {children}
  </div>
);

const Picker = ({ v, on, opts }: { v: string; on: (v: string) => void; opts: string[] }) => (
  <Select value={v} onValueChange={on}>
    <SelectTrigger className="h-9">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {opts.map((o) => (
        <SelectItem key={o} value={o}>
          {o}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
