import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { campaigns } from "@/lib/mockData";
import { Megaphone, Users, Target, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Campaigns() {
  const [active, setActive] = useState(campaigns[0]);

  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campaign Workspaces</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Brief → Assets → Channel → Activation, governed end-to-end.
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => toast.success("New campaign created")}>
          <Megaphone className="h-4 w-4 mr-1.5" /> Create Campaign
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((c) => (
          <Card
            key={c.id}
            onClick={() => setActive(c)}
            className={`cursor-pointer shadow-soft border-border/70 hover:shadow-lifted hover:border-primary/30 transition-all ${
              active.id === c.id ? "ring-2 ring-primary/40" : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">{c.id}</div>
                  <div className="font-semibold text-base mt-0.5 leading-tight">{c.name}</div>
                </div>
                <StatusBadge status={c.status === "Launch Prep" ? "In Review" : c.status === "Planning" ? "Draft" : "Final Approved"} />
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.objective}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Launch readiness</span>
                  <span className="font-semibold tabular-nums">{c.readiness}%</span>
                </div>
                <Progress value={c.readiness} className="h-1.5" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-secondary/60 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">MQLs</div>
                  <div className="text-sm font-semibold tabular-nums">{c.kpis.mql}</div>
                </div>
                <div className="rounded-md bg-secondary/60 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">SQLs</div>
                  <div className="text-sm font-semibold tabular-nums">{c.kpis.sql}</div>
                </div>
                <div className="rounded-md bg-primary-soft py-2">
                  <div className="text-[10px] uppercase text-primary/80">Pipeline</div>
                  <div className="text-sm font-semibold text-primary tabular-nums">{c.kpis.pipeline}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed workspace */}
      <Card className="shadow-soft border-border/70">
        <CardContent className="p-6">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <div className="text-xs text-muted-foreground">{active.id} · {active.product}</div>
              <h2 className="text-xl font-semibold mt-0.5">{active.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{active.objective}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.success("Brief shared")}>Share Brief</Button>
              <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("Pushed to Seismic")}>
                Push to Seismic <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="brief">
            <TabsList className="bg-secondary/60">
              <TabsTrigger value="brief">Brief</TabsTrigger>
              <TabsTrigger value="messaging">Messaging</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="paid">Paid Media</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="perf">Performance</TabsTrigger>
              <TabsTrigger value="seismic">Seismic</TabsTrigger>
            </TabsList>

            <TabsContent value="brief" className="mt-5 grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-4">
                <Section title="Campaign Brief">
                  Reinforce MCOT as the most trusted, evidence-backed mobile cardiac telemetry solution
                  versus extended Holter alternatives. Activate across enterprise IDNs, EP networks, and
                  service line leaders with proof of diagnostic yield, workflow efficiency, and patient experience.
                </Section>
                <Section title="MCOT vs Extended Holter — Positioning">
                  <ul className="list-disc list-inside space-y-1 marker:text-primary">
                    <li>Real-time arrhythmia detection vs delayed retrospective analysis</li>
                    <li>FDA-cleared MCT with clinically validated diagnostic yield</li>
                    <li>Integrated workflow from prescription → report → EHR</li>
                    <li>Lower repeat-test rate and faster time-to-diagnosis</li>
                  </ul>
                </Section>
                <Section title="Content Pillars">
                  <div className="flex flex-wrap gap-2">
                    {active.pillars.map((p) => (
                      <span key={p} className="rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-medium">{p}</span>
                    ))}
                  </div>
                </Section>
              </div>
              <div className="space-y-4">
                <InfoCard title="Target Personas" icon={Users}>
                  {active.personas.join(" · ")}
                </InfoCard>
                <InfoCard title="Channel Plan" icon={Target}>
                  {active.channels.join(" · ")}
                </InfoCard>
                <Card className="shadow-soft border-border/70 bg-primary-soft/40">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Launch Checklist</div>
                    <ChecklistItem done label="Brief complete" />
                    <ChecklistItem done label="Messaging approved" />
                    <ChecklistItem done={active.readiness > 70} label="Assets approved (86%)" />
                    <ChecklistItem done={active.readiness > 80} label="Landing page ready" />
                    <ChecklistItem done={active.readiness > 75} label="Paid copy approved" />
                    <ChecklistItem done={false} label="Seismic package live" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messaging" className="mt-5 space-y-4">
              <Section title="LinkedIn Ad Copy">
                <p className="font-medium">Hook:</p><p>“Stop guessing. Start diagnosing.”</p>
                <p className="font-medium mt-3">Headline:</p><p>The MCT trusted by leading EPs to detect what Holter misses.</p>
                <p className="font-medium mt-3">CTA:</p><p>See the evidence →</p>
              </Section>
              <Section title="Google SEA Keyword Groups">
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {["mobile cardiac telemetry", "MCT vs Holter monitor", "ambulatory ECG monitoring", "AFib detection device"].map((k) => (
                    <div key={k} className="rounded-md border border-border bg-secondary/50 px-3 py-2">{k}</div>
                  ))}
                </div>
              </Section>
              <Section title="OneSite Landing Page Copy Deck">
                H1 · Trust the most-prescribed MCT. <br />
                H2 · Diagnostic yield, real-time alerts, integrated workflow. <br />
                Body · Evidence-backed positioning with claims library v2.1.
              </Section>
            </TabsContent>

            <TabsContent value="assets" className="mt-5">
              <Section title="Linked Assets">
                <ul className="divide-y divide-border">
                  {["MCOT_Enterprise_IDN_Deck.pptx", "MCOT_Trust_LinkedIn_Video_v2.mp4", "HRS_2026_Booth_QR_Assets.zip", "Cardiac_Workstation_Claims_Library.xlsx"].map((a) => (
                    <li key={a} className="flex items-center justify-between py-2.5 text-sm">
                      <span>{a}</span>
                      <StatusBadge status="Final Approved" />
                    </li>
                  ))}
                </ul>
              </Section>
            </TabsContent>

            <TabsContent value="seo" className="mt-5">
              <Section title="MCOT Enterprise Trust Page — SEO">
                Title tag · MCT That Earns Trust | Philips MCOT <br />
                Meta · Real-time, evidence-backed mobile cardiac telemetry trusted by leading enterprise IDNs and EP networks. <br />
                H1 · The most trusted MCT for enterprise cardiology. <br />
                Clusters · 9 · Status · Legal Approved · Contentful · Scheduled
              </Section>
            </TabsContent>

            <TabsContent value="paid" className="mt-5">
              <Section title="LinkedIn Campaign — MCOT Trust">
                Format · Video 16:9 · Spend · $120K · Personas · EP, Service Line Leader · Status · Live <br />
                Status · Final Approved · UTM · utm_source=linkedin&utm_campaign=mcot_trust_2026
              </Section>
            </TabsContent>

            <TabsContent value="approvals" className="mt-5">
              <Section title="Approval Status">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between"><span>Brand</span><StatusBadge status="Final Approved" /></li>
                  <li className="flex items-center justify-between"><span>Legal</span><StatusBadge status="Final Approved" /></li>
                  <li className="flex items-center justify-between"><span>Regulatory</span><StatusBadge status="In Review" /></li>
                </ul>
              </Section>
            </TabsContent>

            <TabsContent value="perf" className="mt-5">
              <div className="grid sm:grid-cols-4 gap-3">
                <Metric label="Impressions" value="1.42M" />
                <Metric label="CTR" value="1.91%" />
                <Metric label="MQLs" value={String(active.kpis.mql)} />
                <Metric label="Pipeline" value={active.kpis.pipeline} accent />
              </div>
            </TabsContent>

            <TabsContent value="seismic" className="mt-5">
              <Section title="Seismic Seller Package">
                ✓ MCOT Enterprise IDN Deck · ✓ Claims library v2.1 · ✓ ROI calculator · ⏳ One-pager (Legal review)
                <div className="mt-3">
                  <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("Seismic package published")}>
                    Publish Seismic package
                  </Button>
                </div>
              </Section>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
    <div className="text-sm text-foreground/85 space-y-1">{children}</div>
  </div>
);

const InfoCard = ({ title, icon: Icon, children }: any) => (
  <Card className="shadow-soft border-border/70">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        <Icon className="h-3.5 w-3.5 text-primary" /> {title}
      </div>
      <div className="text-sm">{children}</div>
    </CardContent>
  </Card>
);

const ChecklistItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-2 py-1 text-sm">
    {done ? (
      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
    ) : (
      <AlertCircle className="h-4 w-4 text-muted-foreground" />
    )}
    <span className={done ? "" : "text-muted-foreground"}>{label}</span>
  </div>
);

const Metric = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-xl p-4 ${accent ? "bg-gradient-primary text-primary-foreground" : "bg-secondary/60"}`}>
    <div className={`text-[11px] uppercase ${accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</div>
    <div className="text-2xl font-semibold mt-1 tabular-nums">{value}</div>
  </div>
);
