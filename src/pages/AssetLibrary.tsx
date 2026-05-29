import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/StatusBadge";
import { assets, type Asset } from "@/lib/mockData";
import {
  Search,
  Filter,
  Download,
  Share2,
  Send,
  History,
  FileVideo,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Presentation,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const filterGroups = {
  Product: ["MCOT", "ePatch", "IntelliSpace ECG", "ECG Reports App", "Cardiac Workstation", "Cardiologs"],
  Campaign: ["HRS 2026", "Federal VA", "PCP Awareness", "Enterprise IDN", "MCOT Trust", "ePatch Awareness"],
  Channel: ["SEO", "LinkedIn", "Google SEA", "Display", "Email", "Organic Social", "Seismic", "Event"],
  Persona: ["C-suite", "EP", "Cardiologist", "PCP", "Service Line Leader", "IT", "Procurement", "VA/DoD"],
  "Funnel Stage": ["Awareness", "Consideration", "Conversion", "Retention", "Upsell"],
  Region: ["NAM", "US", "Canada"],
  Status: ["Draft", "In Review", "Legal Approved", "Regulatory Approved", "Final Approved", "Archived"],
};

function typeIcon(type: string) {
  if (type === "Video") return FileVideo;
  if (type === "Presentation") return Presentation;
  if (type === "Spreadsheet") return FileSpreadsheet;
  if (type === "Archive") return FileArchive;
  if (type === "Image") return FileImage;
  return FileText;
}

export default function AssetLibrary() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Asset | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggle = (v: string) =>
    setSelectedFilters((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchesQ =
        !q ||
        a.name.toLowerCase().includes(q.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
        a.product.toLowerCase().includes(q.toLowerCase());
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (f) =>
            a.product.includes(f) ||
            a.campaign.includes(f) ||
            a.channel.includes(f) ||
            a.persona.includes(f) ||
            a.status === f ||
            a.region === f ||
            a.funnelStage === f,
        );
      return matchesQ && matchesFilters;
    });
  }, [q, selectedFilters]);

  return (
    <div className="max-w-[1500px] mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Asset Library</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Governed DAM across PAL, Contentful, Seismic, and SharePoint sources.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Filter sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <Card className="shadow-soft border-border/70 sticky top-20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Filter className="h-4 w-4 text-primary" /> Smart Filters
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={() => setSelectedFilters([])}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {Object.entries(filterGroups).map(([group, vals]) => (
                  <div key={group}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {group}
                    </div>
                    <div className="space-y-1.5">
                      {vals.map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                          <Checkbox
                            checked={selectedFilters.includes(v)}
                            onCheckedChange={() => toggle(v)}
                          />
                          <span className="text-foreground/80">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search assets by name, product, tag..."
              className="pl-10 h-11 bg-card shadow-soft"
            />
          </div>

          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => toggle(f)}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-soft text-primary px-2.5 py-0.5 text-xs"
                >
                  {f}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {assets.length} assets
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((a) => {
              const Icon = typeIcon(a.type);
              return (
                <Card
                  key={a.id}
                  onClick={() => setActive(a)}
                  className="group cursor-pointer overflow-hidden shadow-soft border-border/70 hover:shadow-lifted hover:border-primary/30 transition-all"
                >
                  <div className={`relative h-32 bg-gradient-to-br ${a.thumbColor} flex items-center justify-center`}>
                    <Icon className="h-10 w-10 text-white/90" strokeWidth={1.5} />
                    <div className="absolute top-2 right-2">
                      <StatusBadge status={a.status} className="bg-white/95 ring-0" />
                    </div>
                    <div className="absolute bottom-2 left-2 rounded-md bg-black/30 backdrop-blur text-white text-[10px] px-1.5 py-0.5 uppercase tracking-wider">
                      {a.type}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="font-medium text-sm leading-tight truncate" title={a.name}>
                      {a.name}
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div><span className="text-foreground/60">Product:</span> {a.product}</div>
                      <div><span className="text-foreground/60">Campaign:</span> {a.campaign}</div>
                      <div><span className="text-foreground/60">Persona:</span> {a.persona}</div>
                      <div><span className="text-foreground/60">Channel:</span> {a.channel}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/70 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Downloaded");
                        }}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Pushed to Seismic");
                        }}
                      >
                        <Send className="h-3.5 w-3.5 mr-1" /> Seismic
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs ml-auto" onClick={(e) => e.stopPropagation()}>
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <div className={`h-40 -mx-6 -mt-6 mb-2 bg-gradient-to-br ${active.thumbColor} flex items-center justify-center`}>
                  {(() => {
                    const Icon = typeIcon(active.type);
                    return <Icon className="h-14 w-14 text-white/90" strokeWidth={1.5} />;
                  })()}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <SheetTitle className="text-lg leading-tight">{active.name}</SheetTitle>
                  <StatusBadge status={active.status} />
                </div>
                <div className="text-xs text-muted-foreground">{active.id} · {active.version}</div>
              </SheetHeader>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Meta label="Asset Type" value={active.type} />
                <Meta label="Product" value={active.product} />
                <Meta label="Campaign" value={active.campaign} />
                <Meta label="Channel" value={active.channel} />
                <Meta label="Persona" value={active.persona} />
                <Meta label="Funnel Stage" value={active.funnelStage} />
                <Meta label="Region" value={active.region} />
                <Meta label="Owner" value={active.owner} />
                <Meta label="Expiration" value={active.expiration} />
                <Meta label="Usage Rights" value={active.usageRights} />
                <Meta label="Source" value={active.source} />
                <Meta label="Destination" value={active.destination} />
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">UTM / URL</div>
                <code className="block text-[11px] bg-muted rounded-md p-2 break-all">{active.utm}</code>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Approval History</div>
                <ol className="space-y-2 border-l-2 border-border pl-4">
                  {active.approvalHistory.map((h, i) => (
                    <li key={i} className="relative text-sm">
                      <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                      <div className="font-medium">{h.stage} approval</div>
                      <div className="text-xs text-muted-foreground">{h.by} · {h.date}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Performance</div>
                <div className="grid grid-cols-3 gap-2">
                  <Stat label="Impressions" value={active.performance.impressions.toLocaleString()} />
                  <Stat label="CTR" value={active.performance.ctr + "%"} />
                  <Stat label="Downloads" value={String(active.performance.downloads)} />
                </div>
              </div>

              <div className="sticky bottom-0 -mx-6 mt-6 p-4 border-t bg-background/95 backdrop-blur flex flex-wrap gap-2">
                <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("Sent for review")}>
                  Send for Review
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Marked Final Approved")}>
                  Mark Final Approved
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Pushed to Seismic")}>
                  <Send className="h-3.5 w-3.5 mr-1" /> Seismic
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Pushed to Contentful")}>
                  Contentful
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast("View history")}>
                  <History className="h-3.5 w-3.5 mr-1" /> History
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-secondary/60 p-3">
    <div className="text-[11px] text-muted-foreground">{label}</div>
    <div className="text-lg font-semibold tabular-nums">{value}</div>
  </div>
);
