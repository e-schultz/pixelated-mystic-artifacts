
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArtProvider } from "@/contexts/ArtContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { SequenceProvider } from "@/contexts/SequenceContext";

// Lazy-load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-black">
    <div className="text-white">Loading...</div>
  </div>
);

const App = () => (
  <TooltipProvider>
    <AnimationProvider>
      <ArtProvider>
        <SequenceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SequenceProvider>
      </ArtProvider>
    </AnimationProvider>
  </TooltipProvider>
);

export default App;
