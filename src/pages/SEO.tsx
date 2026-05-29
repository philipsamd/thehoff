import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { seoProjects } from "@/lib/mockData";
import { Search, FileText, Link2, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const keywordClusters = [
  { product: "MCOT", terms: ["mobile cardiac telemetry", "MCT monitor", "AFib detection device", "MCT vs Holter"] },
  { product: "ePatch", terms: ["wearable ECG patch", "ePatch monitor", "PCP AFib screening", "long-term ECG patch"] },
  { product: "IntelliSpace ECG", terms: ["enterprise ECG management", "ECG marketplace", "AI-powered ECG"] },
];

const personaClusters = [
  { persona: "PCP", terms: ["AFib screening primary care", "easy ECG ordering", "patient stroke risk"] },
  { persona: "EP", terms: ["MCT diagnostic yield", "ambulatory monitoring outcomes"] },
  { persona: "VA/DoD", terms: ["VA cardiac monitoring", "MSPV ambulatory ECG"] },
];

export default function SEO() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">SEO Workspace</h1>
          <p className="text-sm text-muted-foreground mt-1">
            OneSite & Contentful readiness, keyword universe, and AI Overview opportunities.
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => toast.success("New SEO brief created")}>
          <FileText className="h-4 w-4 mr-1.5" /> New SEO Brief
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {seoProjects.map((p) => (
          <Card key={p.name} className="shadow-soft border-border/70 hover:shadow-elegant transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <Search className="h-4 w-4 text-primary mt-1" />
                <StatusBadge status={p.approval} />
              </div>
              <div className="mt-2 font-semibold text-sm leading-tight">{p.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">Owner · {p.owner}</div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Readiness</span>
                  <span className="font-semibold tabular-nums">{p.readiness}%</span>
                </div>
                <Progress value={p.readiness} className="h-1.5" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{p.clusters} clusters</span>
                <span className="rounded-md bg-secondary px-2 py-0.5">Contentful: {p.contentful}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Page-level SEO Brief — ePatch PCP Awareness
            </h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <Field label="Title tag" value="ePatch for AFib | Easy ECG Monitoring for PCPs" />
              <Field label="Meta description" value="Help your patients catch silent AFib. ePatch is the wearable ECG patch built for primary care workflows." />
              <Field label="H1" value="The wearable ECG patch built for primary care" />
              <Field label="H2s" value="What ePatch detects · How to prescribe · Patient experience · Outcomes" />
              <Field label="Internal linking" value="→ MCOT, → IntelliSpace ECG, → Patient stories, → Reimbursement" />
              <Field label="Target keywords" value="ePatch AFib · PCP AFib screening · long-term ECG patch" />
            </div>
            <div className="mt-5 rounded-xl bg-primary-soft border border-primary/15 p-4">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI Overview / GEO recommendations
              </div>
              <ul className="text-sm text-primary/90 space-y-1 list-disc list-inside marker:text-primary">
                <li>Add an FAQ block answering “What is the difference between ePatch and Holter monitor?”</li>
                <li>Include comparison schema vs Zio, BodyGuardian for AI-generated answers.</li>
                <li>Embed PCP testimonial with evidence-backed AFib detection rate.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> SEMrush Ranking Inputs
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { kw: "mobile cardiac telemetry", pos: 4, delta: "+2" },
                { kw: "ePatch AFib", pos: 6, delta: "+1" },
                { kw: "MCT vs Holter", pos: 11, delta: "-3" },
                { kw: "wearable ECG patch", pos: 8, delta: "+4" },
                { kw: "AFib screening primary care", pos: 15, delta: "+5" },
              ].map((r) => (
                <li key={r.kw} className="flex items-center justify-between rounded-lg border border-border bg-card p-2.5">
                  <span className="truncate">{r.kw}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded bg-secondary px-1.5 py-0.5 font-semibold tabular-nums">#{r.pos}</span>
                    <span className={r.delta.startsWith("+") ? "text-[hsl(var(--success))]" : "text-destructive"}>{r.delta}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Cluster title="Product Keyword Clusters" data={keywordClusters} keyName="product" />
        <Cluster title="Persona Keyword Clusters" data={personaClusters} keyName="persona" />
      </div>

      <Card className="shadow-soft border-border/70">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" /> Internal Linking Map
          </h3>
          <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
            {[
              "ePatch ↔ MCOT (continuum of care)",
              "MCOT ↔ IntelliSpace ECG (enterprise workflow)",
              "ePatch ↔ Reimbursement (PCP)",
              "IntelliSpace ECG ↔ Cardiologs (AI marketplace)",
              "MCOT ↔ Federal VA (federal solutions)",
              "Claims library ↔ all product pages",
            ].map((l) => (
              <div key={l} className="rounded-lg border border-border bg-secondary/40 px-3 py-2">{l}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-medium mt-0.5">{value}</div>
  </div>
);

const Cluster = ({ title, data, keyName }: any) => (
  <Card className="shadow-soft border-border/70">
    <CardContent className="p-6">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {data.map((c: any) => (
          <div key={c[keyName]}>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{c[keyName]}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {c.terms.map((t: string) => (
                <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
