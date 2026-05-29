import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const kpis = [
  { label: "Time to find approved asset", value: "-58%", target: "reduce 50–70%", positive: true },
  { label: "Duplicate asset creation", value: "-41%", target: "reduce 30–50%", positive: true },
  { label: "Reuse of existing assets", value: "+44%", target: "increase 40%", positive: true },
  { label: "Campaign launch speed", value: "+32%", target: "improve 25–40%", positive: true },
  { label: "Brand compliance score", value: "96%", target: "95%+", positive: true },
  { label: "Metadata completeness", value: "89%", target: "90%+", positive: false },
  { label: "Approval cycle time", value: "-28%", target: "reduce 30%", positive: false },
  { label: "Seismic-ready adoption", value: "+27%", target: "increase 25%", positive: true },
  { label: "Expired asset usage", value: "0.4%", target: "near zero", positive: true },
  { label: "Campaigns mapped", value: "100%", target: "all active", positive: true },
];

const channelAdoption = [
  { ch: "Seismic", v: 88 },
  { ch: "LinkedIn", v: 76 },
  { ch: "Google SEA", v: 64 },
  { ch: "OneSite", v: 71 },
  { ch: "Email", v: 58 },
  { ch: "Display", v: 42 },
];

const trend = [62, 68, 70, 74, 78, 82, 85, 89, 92, 94, 95, 96];

export default function Analytics() {
  const maxTrend = Math.max(...trend);
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Executive view of AM&D digital marketing effectiveness, governance, and adoption.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label} className="shadow-soft border-border/70">
            <CardContent className="p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <div className="text-2xl font-semibold tabular-nums">{k.value}</div>
                {k.positive ? (
                  <TrendingUp className="h-4 w-4 text-[hsl(var(--success))]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-[hsl(var(--warning))]" />
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Target · {k.target}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft border-border/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Brand compliance score · 12-month trend
              </h3>
              <span className="text-xs text-muted-foreground">Target 95%+</span>
            </div>
            <div className="flex items-end gap-2 h-40">
              {trend.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow"
                    style={{ height: `${(v / maxTrend) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">M{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Adoption by channel</h3>
            <div className="space-y-3">
              {channelAdoption.map((c) => (
                <div key={c.ch}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{c.ch}</span>
                    <span className="tabular-nums font-semibold">{c.v}%</span>
                  </div>
                  <Progress value={c.v} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Top reused assets</h3>
            <ul className="divide-y divide-border">
              {[
                { name: "Cardiac_Workstation_Claims_Library.xlsx", uses: 47 },
                { name: "MCOT_Enterprise_IDN_Deck.pptx", uses: 32 },
                { name: "ePatch_AFib_LinkedIn_15sec.mp4", uses: 24 },
                { name: "Federal_VA_MSPV_OnePager.pdf", uses: 18 },
                { name: "Cardiologs_AI_OnePager.pdf", uses: 14 },
              ].map((r) => (
                <li key={r.name} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="truncate">{r.name}</span>
                  <span className="rounded-md bg-primary-soft text-primary px-2 py-0.5 text-xs font-semibold">{r.uses} reuses</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Performance signals</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Avg CTR (LinkedIn)", v: "1.84%" },
                { l: "Avg CPL", v: "$148" },
                { l: "Pipeline influenced", v: "$52.8M" },
                { l: "Asset downloads (Seismic)", v: "2,418" },
                { l: "Page views (OneSite)", v: "184K" },
                { l: "AI Overview citations", v: "37" },
              ].map((m) => (
                <div key={m.l} className="rounded-lg bg-secondary/60 p-3">
                  <div className="text-xs text-muted-foreground">{m.l}</div>
                  <div className="text-lg font-semibold tabular-nums">{m.v}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
