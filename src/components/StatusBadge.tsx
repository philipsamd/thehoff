import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  "Final Approved": "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))] ring-[hsl(var(--success)/0.25)]",
  "Legal Approved": "bg-[hsl(var(--info)/0.12)] text-[hsl(var(--info))] ring-[hsl(var(--info)/0.25)]",
  "Regulatory Approved": "bg-primary-soft text-primary ring-primary/20",
  "In Review": "bg-[hsl(var(--warning)/0.15)] text-[hsl(36_80%_30%)] ring-[hsl(var(--warning)/0.3)]",
  "Draft": "bg-muted text-muted-foreground ring-border",
  "Expiring Soon": "bg-[hsl(var(--destructive)/0.12)] text-destructive ring-destructive/25",
  "Archived": "bg-muted text-muted-foreground ring-border",
  "Connected": "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))] ring-[hsl(var(--success)/0.25)]",
  "Pilot": "bg-primary-soft text-primary ring-primary/20",
  "Planned": "bg-muted text-muted-foreground ring-border",
  "Manual Export": "bg-[hsl(var(--warning)/0.15)] text-[hsl(36_80%_30%)] ring-[hsl(var(--warning)/0.3)]",
  "Needs Configuration": "bg-[hsl(var(--destructive)/0.12)] text-destructive ring-destructive/25",
  "High": "bg-[hsl(var(--destructive)/0.12)] text-destructive ring-destructive/25",
  "Medium": "bg-[hsl(var(--warning)/0.15)] text-[hsl(36_80%_30%)] ring-[hsl(var(--warning)/0.3)]",
  "Low": "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))] ring-[hsl(var(--success)/0.25)]",
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
      styles[status] || "bg-muted text-muted-foreground ring-border",
      className,
    )}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
    {status}
  </span>
);
