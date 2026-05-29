import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function Paid() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Paid Media Workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Build, validate, and govern paid campaigns across LinkedIn, Google, and Programmatic.
        </p>
      </header>

      <Tabs defaultValue="linkedin">
        <TabsList className="bg-secondary/60">
          <TabsTrigger value="linkedin">LinkedIn Ads</TabsTrigger>
          <TabsTrigger value="google">Google SEA / SEM</TabsTrigger>
          <TabsTrigger value="display">Display / Programmatic</TabsTrigger>
        </TabsList>

        <TabsContent value="linkedin" className="mt-5 grid lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 shadow-soft border-border/70">
            <CardContent className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Format">
                  <Select defaultValue="video">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="image">Single image</SelectItem>
                      <SelectItem value="doc">Document ad</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Campaign objective">
                  <Select defaultValue="leadgen">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leadgen">Lead generation</SelectItem>
                      <SelectItem value="awareness">Brand awareness</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Hook"><Input defaultValue="Stop guessing. Start diagnosing." /></Field>
              <Field label="Headline"><Input defaultValue="The MCT trusted by leading EPs to detect what Holter misses." /></Field>
              <Field label="Body"><Textarea rows={3} defaultValue="Real-time, evidence-backed mobile cardiac telemetry — built for enterprise cardiology workflows." /></Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="CTA">
                  <Select defaultValue="learn">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learn">Learn more</SelectItem>
                      <SelectItem value="demo">Request demo</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Persona targeting"><Input defaultValue="EP, Service Line Leader, IDN C-suite (US)" /></Field>
              </div>
              <Field label="UTM builder"><Input defaultValue="utm_source=linkedin&utm_medium=paid&utm_campaign=mcot_trust_2026&utm_content=video_15s" /></Field>
              <div className="flex gap-2 pt-2">
                <Button className="bg-gradient-primary" onClick={() => toast.success("Sent for Legal Review")}>Send for Legal Review</Button>
                <Button variant="outline" onClick={() => toast.success("Draft saved")}>Save draft</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="shadow-soft border-border/70">
              <CardContent className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Spec Validator</div>
                <SpecRow ok label="Dimensions 1920×1080" />
                <SpecRow ok label="File type .mp4" />
                <SpecRow ok label="File size 142 MB / 200 MB" />
                <SpecRow ok={false} label="Captions .srt missing" />
                <SpecRow ok label="Aspect ratio 16:9" />
              </CardContent>
            </Card>
            <Card className="shadow-soft border-border/70">
              <CardContent className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Approval Status</div>
                <div className="space-y-2 text-sm">
                  <Row><span>Brand</span><StatusBadge status="Final Approved" /></Row>
                  <Row><span>Legal</span><StatusBadge status="In Review" /></Row>
                  <Row><span>Regulatory</span><StatusBadge status="Draft" /></Row>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="google" className="mt-5">
          <Card className="shadow-soft border-border/70">
            <CardContent className="p-6 grid lg:grid-cols-2 gap-4">
              <Field label="Campaign name"><Input defaultValue="MCOT-Trust-2026-US-NonBrand" /></Field>
              <Field label="Ad group"><Input defaultValue="MCT vs Holter" /></Field>
              <Field label="Keywords"><Textarea rows={3} defaultValue="mobile cardiac telemetry, MCT monitor, MCT vs Holter, ambulatory ECG monitoring" /></Field>
              <Field label="Negative keywords"><Textarea rows={3} defaultValue="free, jobs, refurbished, used" /></Field>
              <Field label="Headlines (RSA)"><Textarea rows={3} defaultValue="Trusted MCT for Cardiology | Real-time AFib Detection | Evidence-backed Outcomes" /></Field>
              <Field label="Descriptions"><Textarea rows={3} defaultValue="See why leading IDNs trust Philips MCOT for enterprise cardiac monitoring." /></Field>
              <Field label="Final URL"><Input defaultValue="https://philips.com/mcot/trust" /></Field>
              <Field label="UTM"><Input defaultValue="utm_source=google&utm_medium=cpc&utm_campaign=mcot_trust_2026" /></Field>
              <Field label="Landing page"><Input defaultValue="MCOT Enterprise Trust Page (Contentful: Scheduled)" /></Field>
              <Field label="Compliance notes"><Textarea rows={2} defaultValue="All claims must map to Claims Library v2.1. No off-label statements." /></Field>
              <div className="lg:col-span-2 flex gap-2">
                <Button className="bg-gradient-primary" onClick={() => toast.success("Sent to Google Ads")}>Send to Google Ads</Button>
                <Button variant="outline" onClick={() => toast.success("Sent for Review")}>Send for Review</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Display 300×250", spec: "JPG/PNG · 150KB", status: "Final Approved" },
            { name: "Display 728×90", spec: "JPG/PNG · 150KB", status: "Final Approved" },
            { name: "Display 970×250", spec: "HTML5 · 200KB", status: "In Review" },
            { name: "Display 320×50 (Mobile)", spec: "JPG · 100KB", status: "Draft" },
            { name: "CTV 1920×1080 :15s", spec: "MP4 · 50MB", status: "Legal Approved" },
            { name: "Native — IDN targets", spec: "Headline + image", status: "Final Approved" },
          ].map((c) => (
            <Card key={c.name} className="shadow-soft border-border/70">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.spec}</div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="mt-4 text-xs text-muted-foreground space-y-1">
                  <div>Target accounts · Top 50 IDNs</div>
                  <div>Placements · Health system EHR networks</div>
                  <div>Expires · 2026-07-31</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between">{children}</div>
);

const SpecRow = ({ ok, label }: { ok?: boolean; label: string }) => (
  <div className="flex items-center gap-2 py-1 text-sm">
    {ok ? <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" /> : <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />}
    <span className={ok ? "" : "text-foreground/70"}>{label}</span>
  </div>
);
