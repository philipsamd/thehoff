import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { approvalQueue } from "@/lib/mockData";
import { Shield, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const stages = ["Draft", "Brand Review", "Legal Review", "Regulatory Review", "Final Approved", "Archived"];

export default function Approvals() {
  const byStage = stages.map((s) => ({ stage: s, items: approvalQueue.filter((i) => i.stage === s) }));

  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Approvals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Regulated healthcare approval workflow with full audit evidence.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export audit log</Button>
          <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("Submitted for review")}>Submit asset</Button>
        </div>
      </header>

      <Card className="shadow-soft border-border/70 bg-primary-soft/40 border-primary/15">
        <CardContent className="p-4 flex items-start gap-3 text-sm">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-primary">Healthcare approval rules: </span>
            No asset can be marked Final Approved without the required approval chain. Claims must map to an approved source. Expired assets are auto-removed from activation channels. Agencies upload drafts but cannot publish.
          </div>
        </CardContent>
      </Card>

      {/* Kanban */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
        {byStage.map(({ stage, items }) => (
          <div key={stage} className="rounded-xl bg-secondary/40 p-3 min-h-[200px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stage}</div>
              <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((i) => (
                <Card key={i.item} className="shadow-soft border-border/70 cursor-grab hover:shadow-elegant transition-shadow">
                  <CardContent className="p-3 space-y-2">
                    <div className="text-xs font-semibold leading-tight">{i.item}</div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{i.owner}</span>
                      <span>{i.days}d in stage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <StatusBadge status={i.risk} />
                      <span className="text-[11px] text-muted-foreground">Due {i.due}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {items.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-6">No items</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Queue table */}
      <Card className="shadow-soft border-border/70">
        <CardContent className="p-0">
          <div className="border-b px-5 py-3 text-sm font-semibold">Approval queue</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground bg-secondary/40">
                <tr>
                  <th className="text-left py-2.5 px-5">Asset</th>
                  <th className="text-left py-2.5 px-3">Stage</th>
                  <th className="text-left py-2.5 px-3">Owner</th>
                  <th className="text-left py-2.5 px-3">Days</th>
                  <th className="text-left py-2.5 px-3">Due</th>
                  <th className="text-left py-2.5 px-3">Risk</th>
                  <th className="text-right py-2.5 px-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {approvalQueue.map((i) => (
                  <tr key={i.item} className="hover:bg-secondary/30">
                    <td className="py-3 px-5 font-medium">{i.item}</td>
                    <td className="py-3 px-3 text-muted-foreground">{i.stage}</td>
                    <td className="py-3 px-3">{i.owner}</td>
                    <td className="py-3 px-3 tabular-nums">{i.days}</td>
                    <td className="py-3 px-3 tabular-nums">{i.due}</td>
                    <td className="py-3 px-3"><StatusBadge status={i.risk} /></td>
                    <td className="py-3 px-5 text-right">
                      <Button size="sm" variant="ghost" className="text-primary" onClick={() => toast.success("Approved")}>
                        Approve <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" /> Approval evidence log
            </div>
            <ol className="space-y-2 border-l-2 border-border pl-4">
              {[
                { who: "Dr. P. Chen (Regulatory)", what: "Approved Cardiac_Workstation_Claims_Library.xlsx v2.1", when: "Feb 26, 11:42" },
                { who: "T. Brooks (Legal)", what: "Requested revision on Federal_VA_SolutionBrief_v3.pdf", when: "Feb 26, 09:18" },
                { who: "K. Alvarez (Brand)", what: "Approved Cardiologs_AI_OnePager.pdf", when: "Feb 25, 16:05" },
                { who: "System", what: "Auto-archived 4 expired assets", when: "Feb 25, 03:00" },
              ].map((e, i) => (
                <li key={i} className="relative text-sm">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                  <div className="font-medium">{e.what}</div>
                  <div className="text-xs text-muted-foreground">{e.who} · {e.when}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/70">
          <CardContent className="p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[hsl(var(--warning))]" /> Comments & flags
            </div>
            <div className="space-y-3 text-sm">
              {[
                { who: "T. Brooks (Legal)", txt: "Claim on slide 7 needs to map to Claims Library v2.1 entry CL-219." },
                { who: "K. Alvarez (Brand)", txt: "Use Philips master logo, not co-branded variant, on the cover." },
                { who: "Dr. P. Chen (Regulatory)", txt: "Add evidence reference for AFib detection sensitivity claim." },
              ].map((c, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-3">
                  <div className="text-xs font-semibold text-foreground/70">{c.who}</div>
                  <div className="mt-0.5">{c.txt}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
