import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { campaigns } from "@/lib/mockData";
import {
  Search,
  Upload,
  Megaphone,
  FileText,
  Target,
  Send,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAssets } from "@/lib/store";

const quickActions: { label: string; icon: any; action: string }[] = [
  { label: "Upload Asset", icon: Upload, action: "upload" },
  { label: "Create Campaign", icon: Megaphone, action: "/campaigns" },
  { label: "New SEO Brief", icon: FileText, action: "/seo" },
  { label: "New Paid Ad", icon: Target, action: "/paid" },
  { label: "Push to Seismic", icon: Send, action: "toast:Seismic package queued" },
  { label: "Send for Review", icon: CheckCircle2, action: "toast:Sent for review" },
];

const recent = [
  { name: "ePatch copy deck v4", who: "Maya Reynolds", when: "2h ago", status: "Final Approved" },
  { name: "HRS LinkedIn ads", who: "Jordan Kim", when: "5h ago", status: "In Review" },
  { name: "ISECG SEO brief", who: "Priya Shah", when: "Yesterday", status: "In Review" },
  { name: "MCOT enterprise deck", who: "David Park", when: "Yesterday", status: "Final Approved" },
];

const compliance = [
  { label: "Expired assets still active", count: 4, tone: "destructive" },
  { label: "Draft assets downloaded externally", count: 2, tone: "warning" },
  { label: "Claims missing evidence link", count: 7, tone: "warning" },
  { label: "Assets with incomplete metadata", count: 23, tone: "warning" },
];

export default function Home() {
  const navigate = useNavigate();
  const { globalSearch, setGlobalSearch, setUploadOpen } = useAssets();
  const goSearch = () => navigate("/assets");
  return (
    <div className="space-y-6 max-w-[1500px] mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-10 text-primary-foreground shadow-lifted">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AM&D Digital Command Center
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
            Find, approve, activate, and measure every AM&D digital marketing asset.
          </h1>
          <p className="mt-2 text-primary-foreground/85 text-sm md:text-base">
            One governed workspace across DAM, campaigns, SEO, paid media, and Seismic activation.
          </p>
          <div className="mt-6 flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-lifted max-w-2xl">
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <Input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
              placeholder="Search all assets, campaigns, copy, keywords, specs..."
              className="border-0 focus-visible:ring-0 text-foreground bg-transparent h-10"
            />
            <Button onClick={goSearch} className="bg-gradient-primary text-primary-foreground shadow-glow">Search</Button>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Active Campaigns" value="5" trend="+1 this quarter" icon={Megaphone}>
          <ul className="mt-3 space-y-1.5 text-sm">
            {campaigns.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-2">
                <span className="truncate text-foreground/80">{c.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{c.status}</span>
              </li>
            ))}
          </ul>
        </KpiCard>

        <KpiCard title="Pending Approvals" value="23" trend="3 expiring soon" icon={Clock} accent="warning">
          <ul className="mt-3 space-y-1.5 text-sm">
            <ApprovalRow n={12} label="Awaiting Legal" />
            <ApprovalRow n={5} label="Awaiting Brand" />
            <ApprovalRow n={3} label="Awaiting Regulatory" />
            <ApprovalRow n={3} label="Expiring within 7 days" />
          </ul>
        </KpiCard>

        <KpiCard title="Recently Updated" value="4" trend="last 24 hours" icon={TrendingUp}>
          <ul className="mt-3 space-y-2 text-sm">
            {recent.map((r) => (
              <li key={r.name} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.who} · {r.when}</div>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </KpiCard>

        <KpiCard title="Compliance Alerts" value="36" trend="vs 48 last week" icon={AlertTriangle} accent="destructive">
          <ul className="mt-3 space-y-1.5 text-sm">
            {compliance.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-2">
                <span className="text-foreground/80">{c.label}</span>
                <span className="font-semibold text-foreground">{c.count}</span>
              </li>
            ))}
          </ul>
        </KpiCard>
      </div>

      {/* Quick actions */}
      <Card className="shadow-soft border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => {
                  if (a.action === "upload") setUploadOpen(true);
                  else if (a.action.startsWith("/")) navigate(a.action);
                  else if (a.action.startsWith("toast:")) toast.success(a.action.slice(6));
                  else toast.success(`${a.label} initiated`);
                }}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:bg-primary-soft/40 transition-all hover:shadow-soft"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-colors">
                  <a.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Launch readiness + Compliance trend */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft border-border/70">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Launch Readiness Snapshot</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Cross-campaign launch health</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link to="/campaigns">View all <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {campaigns.slice(0, 4).map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground tabular-nums">{c.readiness}%</span>
                </div>
                <Progress value={c.readiness} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Governance Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthBar label="Brand compliance" value={96} target="95%+" />
            <HealthBar label="Metadata completeness" value={89} target="90%+" />
            <HealthBar label="Approval cycle ↓" value={72} target="-30%" />
            <HealthBar label="Asset reuse ↑" value={64} target="+40%" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  trend,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  value: string;
  trend: string;
  icon: any;
  accent?: "warning" | "destructive";
  children?: React.ReactNode;
}) {
  const accentClass =
    accent === "warning"
      ? "bg-[hsl(var(--warning)/0.15)] text-[hsl(36_80%_30%)]"
      : accent === "destructive"
        ? "bg-[hsl(var(--destructive)/0.12)] text-destructive"
        : "bg-primary-soft text-primary";
  return (
    <Card className="shadow-soft border-border/70 hover:shadow-elegant transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-semibold tracking-tight">{value}</div>
              <div className="text-xs text-muted-foreground">{trend}</div>
            </div>
          </div>
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${accentClass}`}>
            <Icon className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function ApprovalRow({ n, label }: { n: number; label: string }) {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="text-foreground/80">{label}</span>
      <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">{n}</span>
    </li>
  );
}

function HealthBar({ label, value, target }: { label: string; value: number; target: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-foreground/85">{label}</span>
        <span className="text-xs text-muted-foreground">target {target}</span>
      </div>
      <div className="flex items-center gap-3">
        <Progress value={value} className="h-1.5 flex-1" />
        <span className="text-xs font-semibold tabular-nums w-9 text-right">{value}%</span>
      </div>
    </div>
  );
}
