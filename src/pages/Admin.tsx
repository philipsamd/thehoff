import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { integrations, roles } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Shield, Users, Layers, GitBranch, Clock, FileCheck } from "lucide-react";
import { toast } from "sonner";

const taxonomy = {
  Product: ["MCOT", "ePatch", "IntelliSpace ECG", "ECG Reports App", "Cardiac Workstation", "Cardiologs"],
  Channel: ["SEO", "LinkedIn", "Google SEA", "Display", "Email", "Organic Social", "Seismic", "Event"],
  Region: ["NAM", "US", "Canada"],
  "Funnel Stage": ["Awareness", "Consideration", "Conversion", "Retention", "Upsell"],
};

const auditTrail = [
  { who: "Maya Reynolds", what: "Updated ePatch persona taxonomy", when: "Today, 10:14" },
  { who: "T. Brooks (Legal)", what: "Approved 3 assets", when: "Today, 09:02" },
  { who: "System", what: "Auto-archived 4 expired assets", when: "Yesterday, 03:00" },
  { who: "K. Alvarez (Brand)", what: "Locked HRS booth template", when: "Yesterday, 16:22" },
  { who: "Admin", what: "Added Sales Viewer role to 12 users", when: "Feb 24, 11:47" },
];

export default function Admin() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Admin & Governance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Taxonomy, permissions, approval routing, expirations, and integrations.
        </p>
      </header>

      {/* Integrations */}
      <Card className="shadow-soft border-border/70">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> Integration Layer
            </h3>
            <Button size="sm" variant="outline" onClick={() => toast.success("Connector added")}>Add connector</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {integrations.map((i) => (
              <div key={i.name} className="rounded-xl border border-border bg-card p-4 hover:shadow-elegant transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm">{i.name}</div>
                  <StatusBadge status={i.status} />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{i.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Taxonomy */}
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" /> Taxonomy
            </h3>
            <div className="space-y-4">
              {Object.entries(taxonomy).map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{k}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {v.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Role-based permissions
            </h3>
            <ul className="divide-y divide-border">
              {roles.map((r) => (
                <li key={r} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{r}</span>
                  <span className="text-xs text-muted-foreground">
                    {r.includes("Reviewer") ? "Approve" : r === "Admin" ? "Full access" : r.includes("Agency") ? "Upload only" : r.includes("Viewer") ? "Read" : "Create + Manage"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Approval routing
            </h3>
            <ul className="text-sm space-y-2 text-foreground/85">
              <li>Brand → Legal → Regulatory → Final</li>
              <li>Federal assets require Federal counsel sub-stage</li>
              <li>Claims-bearing assets require Regulatory</li>
              <li>Agency uploads route to internal owner first</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Expiration rules
            </h3>
            <ul className="text-sm space-y-2 text-foreground/85">
              <li>Default asset expiration · 12 months</li>
              <li>Claims library · 24 months</li>
              <li>Event assets · auto-archive 30 days post-event</li>
              <li>Expired assets auto-removed from activation channels</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-soft border-border/70">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" /> Rights & compliance
            </h3>
            <ul className="text-sm space-y-2 text-foreground/85">
              <li>Talent releases tracked per asset</li>
              <li>Usage rights window enforced at activation</li>
              <li>Federal-only assets gated by audience</li>
              <li>HIPAA-sensitive content flagged</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft border-border/70">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4">Audit trail</h3>
          <ol className="space-y-2 border-l-2 border-border pl-4">
            {auditTrail.map((a, i) => (
              <li key={i} className="relative text-sm">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                <div className="font-medium">{a.what}</div>
                <div className="text-xs text-muted-foreground">{a.who} · {a.when}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
