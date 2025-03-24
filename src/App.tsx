
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArtProvider } from "@/contexts/ArtContext";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";

const App = () => (
  <TooltipProvider>
    <ArtProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ArtProvider>
  </TooltipProvider>
);

export default App;
