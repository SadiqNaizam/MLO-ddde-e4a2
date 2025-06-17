import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AnalyticsPage from "./pages/AnalyticsPage";
import BakingSchedulesPage from "./pages/BakingSchedulesPage";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import InventoryTrackingPage from "./pages/InventoryTrackingPage";
import OrderFulfillmentPage from "./pages/OrderFulfillmentPage";
import RecipeManagementPage from "./pages/RecipeManagementPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardOverviewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/baking-schedules" element={<BakingSchedulesPage />} />
          <Route path="/inventory-tracking" element={<InventoryTrackingPage />} />
          <Route path="/order-fulfillment" element={<OrderFulfillmentPage />} />
          <Route path="/recipe-management" element={<RecipeManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
