import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const queries = [
  {
    prompt: "Best mobile cardiac telemetry solution for post-stroke AFib detection",
    visibility: 55,
    competitors: ["iRhythm", "Preventice", "VitalConnect", "AliveCor"],
    summary:
      "AI Overview cites iRhythm Zio and Preventice as the top solutions, with brief mention of Philips MCOT as an enterprise option for IDNs.",
    fix:
      "Add a dedicated post-stroke AFib detection FAQ block, evidence-backed MCOT differentiators, comparison schema, and enterprise monitoring workflow content.",
  },
  {
    prompt: "Wearable ECG patch for primary care AFib screening",
    visibility: 38,
    competitors: ["Zio XT", "BodyGuardian", "Apple Watch ECG"],
    summary: "AI tools recommend Zio XT and consumer wearables. ePatch is not surfaced as a primary care option.",
    fix: "Publish PCP-targeted ePatch landing page with structured FAQ schema, prescribing workflow, and reimbursement guidance.",
  },
  {
    prompt: "Enterprise ECG management AI platform",
    visibility: 67,
    competitors: ["GE Muse", "Epiq", "Cardiologs"],
    summary: "Cardiologs (now Philips) is surfaced; IntelliSpace ECG mentions are inconsistent.",
    fix: "Unify Cardiologs + IntelliSpace ECG narrative, publish AI marketplace page, embed comparison schema vs GE Muse.",
  },
];

export default function GEO() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> GEO / AI Search Workspace
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor Philips visibility across AI search engines and prioritize generative-search optimization.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Monitored AI prompts" value="184" sub="across ChatGPT, Perplexity, Gemini" />
        <KpiCard label="Avg. Philips visibility" value="52%" sub="+8 pts QoQ" trend />
        <KpiCard label="High-priority gaps" value="9" sub="needing content updates" warn />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {queries.map((q) => (
          <Card key={q.prompt} className="shadow-soft border-border/70 overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">AI search prompt</div>
                <div className="font-semibold mt-1">"{q.prompt}"</div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Philips visibility</span>
                  <span className="font-semibold tabular-nums">{q.visibility}%</span>
                </div>
                <Progress value={q.visibility} className="h-2" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">AI-generated summary</div>
                <p className="text-sm text-foreground/85">{q.summary}</p>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Competitor mentions</div>
                <div className="flex flex-wrap gap-1.5">
                  {q.competitors.map((c) => (
                    <span key={c} className="rounded-md bg-secondary px-2 py-0.5 text-xs">{c}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-primary-soft border border-primary/15 p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5" /> Recommended fix
                </div>
                <p className="text-sm text-primary/90">{q.fix}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("SEO brief drafted")}>
                  Generate SEO brief
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("FAQ schema added")}>
                  Add FAQ schema
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const KpiCard = ({ label, value, sub, trend, warn }: any) => (
  <Card className="shadow-soft border-border/70">
    <CardContent className="p-5 flex items-start justify-between">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-3xl font-semibold mt-1">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      </div>
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
        warn ? "bg-[hsl(var(--warning)/0.15)] text-[hsl(36_80%_30%)]" : "bg-primary-soft text-primary"
      }`}>
        {warn ? <AlertCircle className="h-4 w-4" /> : trend ? <TrendingUp className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>
    </CardContent>
  </Card>
);
