import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, FileText, Layers, Lock } from "lucide-react";
import { toast } from "sonner";

const sections = [
  {
    title: "OneSite Copy Deck Templates",
    icon: FileText,
    items: ["Product page master", "Solution page", "Resource hub", "Federal/VA page", "Event landing page"],
  },
  {
    title: "Campaign Brief Templates",
    icon: Layers,
    items: ["Awareness campaign", "Demand gen campaign", "ABM campaign", "Event campaign", "Sales enablement campaign"],
  },
  {
    title: "LinkedIn Ad Templates",
    icon: Palette,
    items: ["Single image ad", "Video 15s", "Carousel 4-card", "Document ad", "Thought leader ad"],
  },
  {
    title: "Google SEA Templates",
    icon: FileText,
    items: ["RSA — Brand", "RSA — Non-brand product", "RSA — Competitor conquest", "PMax — IDN"],
  },
  {
    title: "PowerPoint Master Decks",
    icon: Layers,
    items: ["AM&D corporate overview", "MCOT clinical evidence", "Cardiologs AI", "Enterprise IDN pitch"],
  },
  {
    title: "Approved Messaging Frameworks",
    icon: Lock,
    items: ["MCOT positioning v3.2", "ePatch PCP positioning v2.0", "Cardiologs AI v1.4", "Federal VA framework v1.1"],
  },
];

export default function Brand() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Brand & Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Locked layouts, approved messaging, and Philips HealthSuite brand guardrails.
        </p>
      </header>

      <Card className="shadow-soft border-border/70 bg-gradient-hero text-primary-foreground overflow-hidden">
        <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider opacity-80">Philips HealthSuite naming</div>
            <h3 className="text-2xl font-semibold mt-1">Use “Philips” first. Always lead with the master brand.</h3>
            <p className="text-sm opacity-90 mt-2 max-w-xl">
              All AM&D product identifiers must follow Philips HealthSuite naming guidance. Sub-brands (MCOT, ePatch,
              IntelliSpace ECG, Cardiologs) appear secondary in all customer-facing assets.
            </p>
            <Button variant="secondary" size="sm" className="mt-4 bg-white text-primary hover:bg-white/90" onClick={() => toast("Naming guide opened")}>
              Open naming guide
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Social", "Brochure", "Presentation", "Website"].map((t) => (
              <div key={t} className="rounded-lg bg-white/10 backdrop-blur px-3 py-3 text-sm font-medium">{t}</div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.title} className="shadow-soft border-border/70">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <div className="h-8 w-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <s.icon className="h-4 w-4" />
                </div>
                {s.title}
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded-md hover:bg-secondary/60 px-2 py-1.5 -mx-2 cursor-pointer">
                    <span>{i}</span>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => toast.success("Template opened")}>Use</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
