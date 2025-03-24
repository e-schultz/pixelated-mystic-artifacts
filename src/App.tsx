
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VisualizationProvider } from "@/contexts/VisualizationContext";

// Lazy-load pages for better performance
const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-black">
    <div className="text-white">Loading...</div>
  </div>
);

const App = () => (
  <TooltipProvider>
    <VisualizationProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </VisualizationProvider>
  </TooltipProvider>
);

export default App;
