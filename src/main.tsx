
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ArtProvider } from '@/contexts/ArtContext'
import { AnimationProvider } from '@/contexts/AnimationContext'

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

// Wrap App in both providers to ensure they're available
root.render(
  <ArtProvider>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </ArtProvider>
);
