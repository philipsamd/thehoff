import { Outlet, useNavigate } from "react-router-dom";
import { Bell, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles } from "@/lib/mockData";
import { CommandCenterAI } from "@/components/CommandCenterAI";
import { useAssets } from "@/lib/store";
import { toast } from "sonner";
import { Glass } from "@samasante/liquid-glass";
import { headerGlassOptics } from "@/lib/glass";

export default function AppLayout() {
  const [aiOpen, setAiOpen] = useState(false);
  const { globalSearch, setGlobalSearch } = useAssets();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 border-b border-border flex">
            <Glass className="flex-1 min-w-0" radius={0} optics={headerGlassOptics}>
              <div className="h-full w-full flex items-center gap-3 px-3 md:px-5">

            <SidebarTrigger className="text-muted-foreground" />
            <div className="hidden md:flex items-center gap-2 max-w-xl flex-1">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate("/assets");
                  }}
                  placeholder="Search all assets, campaigns, copy, keywords, specs..."
                  className="pl-9 h-9 bg-background/60 border-border"
                />
              </div>
            </div>
            <div className="flex-1 md:hidden" />
            <Select
              defaultValue="Digital Strategy Manager"
              onValueChange={(v) => toast.success(`Switched to ${v}`)}
            >
              <SelectTrigger className="h-9 w-[200px] hidden lg:flex bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 bg-primary-soft border-primary/20 text-primary hover:bg-primary-soft hover:text-primary"
              onClick={() => setAiOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Command Center AI</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => toast("3 new notifications", { description: "2 approvals pending, 1 expiring asset" })}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 ring-2 ring-primary/10">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                MR
              </AvatarFallback>
            </Avatar>
              </div>
            </Glass>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
        <CommandCenterAI open={aiOpen} onOpenChange={setAiOpen} />
      </div>
    </SidebarProvider>
  );
}
