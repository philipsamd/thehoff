import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send } from "lucide-react";
import { aiPrompts } from "@/lib/mockData";
import { toast } from "sonner";

export function CommandCenterAI({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
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
          <div className="rounded-lg bg-primary-soft border border-primary/15 p-4 text-sm text-primary">
            Hi Maya — I can search assets, summarize claims, draft variants, and surface compliance gaps. Try one of the prompts below.
          </div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Suggested prompts</div>
          <div className="space-y-2">
            {aiPrompts.map((p) => (
              <button
                key={p}
                onClick={() => toast.success("AI prompt queued", { description: p })}
                className="w-full text-left text-sm rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 transition-colors px-3 py-2.5"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t p-4 bg-muted/30">
          <div className="flex gap-2">
            <Input placeholder="Ask Command Center AI..." className="bg-background" />
            <Button size="icon" className="shrink-0 bg-gradient-primary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
