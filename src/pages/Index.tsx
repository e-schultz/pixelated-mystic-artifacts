
import React, { useState } from 'react';
import SacredGeometryCanvas from '@/components/SacredGeometryCanvas';
import AnimationInfo from '@/components/AnimationInfo';
import ControlPanel from '@/components/ControlPanel';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import NavigationControls from '@/components/NavigationControls';
import UtilityActions from '@/components/UtilityActions';
import AsciiOverlay from '@/components/AsciiOverlay';
import { useAnimation } from '@/context/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const [showControlPanel, setShowControlPanel] = useState(false);
  const { state } = useAnimation();
  const { isLoading, currentAnimation, animationSpeed, showAsciiOverlay } = state;
  const isMobile = useIsMobile();

  const toggleControlPanel = () => {
    setShowControlPanel(prev => !prev);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden perspective-1000 touch-none">
      {isLoading && <LoadingScreen />}

      <SacredGeometryCanvas 
        currentAnimation={currentAnimation}
        animationSpeed={animationSpeed}
        showAsciiOverlay={showAsciiOverlay && !isMobile}
      />
      
      <Header />
      <AnimationInfo />
      <NavigationControls />
      <UtilityActions onOpenSettings={toggleControlPanel} />
      
      {showControlPanel && (
        <ControlPanel onClose={toggleControlPanel} />
      )}
      
      {showAsciiOverlay && !isMobile && <AsciiOverlay />}
    </div>
  );
};

export default Index;
