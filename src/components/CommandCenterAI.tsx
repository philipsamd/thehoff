import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, User } from "lucide-react";
import { aiPrompts } from "@/lib/mockData";
import { useAssets } from "@/lib/store";

type Msg = { role: "user" | "ai"; text: string; meta?: string };

function generateReply(prompt: string, assetsCount: number): Msg {
  const p = prompt.toLowerCase();
  if (p.includes("mcot") && p.includes("idn"))
    return {
      role: "ai",
      text: "Found 4 Final-Approved MCOT assets tagged for Enterprise IDN: MCOT_Enterprise_IDN_Deck.pptx (v4.0), MCOT_Trust_LinkedIn_Video_v2.mp4, ROI_Calculator_IDN.xlsx, and Claims Library v2.1. Want me to package them in Seismic?",
      meta: "4 assets · Final Approved",
    };
  if (p.includes("expired"))
    return { role: "ai", text: "2 expired assets still active: ePatch_PCP_Hero_Carousel.psd (expired 2026-01-30) and HRS2025_Backwall.ai. Both have 47 downloads since expiration. Recommend archive + replace.", meta: "Compliance risk: Medium" };
  if (p.includes("claim") && p.includes("isecg"))
    return { role: "ai", text: "IntelliSpace ECG approved claims (Regulatory v2.1): (1) FDA-cleared 12-lead ECG analysis, (2) AI-assisted measurement with cardiologist oversight, (3) Integrated with Philips IntelliSpace Cardiovascular. Evidence linked in Claims Library xlsx.", meta: "Source: Claims Library v2.1" };
  if (p.includes("linkedin") && (p.includes("variant") || p.includes("variants")))
    return { role: "ai", text: "Drafted 3 LinkedIn variants from ePatch approved messaging:\n1) “Catch AFib before it catches them.”\n2) “14 days. One patch. Clear answers.”\n3) “The patch primary care prescribes most.”\nAll routed to Brand review.", meta: "Sent to Brand queue" };
  if (p.includes("best") && p.includes("linkedin"))
    return { role: "ai", text: "Top 3 LinkedIn ads for AFib (last 90d): ePatch_AFib_LinkedIn_15sec.mp4 — 412K impressions, 1.84% CTR; MCOT_Trust_v2 — 287K / 1.62%; PCP_Carousel — 198K / 1.41%.", meta: "GA4 + LinkedIn CM" };
  return {
    role: "ai",
    text: `Searched ${assetsCount} governed assets and surfaced the most relevant matches. Open the Asset Library to refine by product, persona, or approval stage.`,
    meta: "Governed search complete",
  };
}

export function CommandCenterAI({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { assets } = useAssets();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { role: "user", text: t };
    const aiMsg = generateReply(t, assets.length);
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <SheetTitle className="text-base">Command Center AI</SheetTitle>
              <SheetDescription className="text-xs">Governed AI over your AM&D content</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="rounded-lg bg-primary-soft border border-primary/15 p-4 text-sm text-primary">
              Hi Maya — I can search assets, summarize claims, draft variants, and surface compliance gaps. Try one of the prompts below.
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex items-start gap-2 justify-end">
                <div className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm max-w-[85%]">{m.text}</div>
                <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5" />
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="rounded-lg bg-card border border-border px-3 py-2 text-sm max-w-[85%] whitespace-pre-line">
                  {m.text}
                  {m.meta && <div className="mt-1.5 text-[11px] text-muted-foreground">{m.meta}</div>}
                </div>
              </div>
            ),
          )}

          {messages.length === 0 && (
            <>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Suggested prompts</div>
              <div className="space-y-2">
                {aiPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="w-full text-left text-sm rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 transition-colors px-3 py-2.5"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="border-t p-4 bg-muted/30">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Command Center AI..."
              className="bg-background"
            />
            <Button type="submit" size="icon" className="shrink-0 bg-gradient-primary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
