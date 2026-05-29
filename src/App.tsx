import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Home from "./pages/Home";
import AssetLibrary from "./pages/AssetLibrary";
import Campaigns from "./pages/Campaigns";
import SEO from "./pages/SEO";
import Paid from "./pages/Paid";
import GEO from "./pages/GEO";
import Brand from "./pages/Brand";
import Approvals from "./pages/Approvals";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/assets" element={<AssetLibrary />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/paid" element={<Paid />} />
            <Route path="/geo" element={<GEO />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
