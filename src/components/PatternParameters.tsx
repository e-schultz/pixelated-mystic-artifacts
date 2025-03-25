
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { useArt } from '@/contexts/art';
import { PatternParameters as PatternParametersType } from '@/contexts/art/types';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PatternParameters: React.FC = () => {
  const { 
    parameters, 
    setPatternParameters, 
    resetPatternParameters 
  } = useArt();
  
  const handleParameterChange = (parameter: keyof PatternParametersType, value: number) => {
    setPatternParameters({ [parameter]: value });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 border-t border-white/10 pt-6 mt-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white/90 text-sm font-light tracking-wider">
          Pattern Parameters
        </h3>
        <button
          onClick={resetPatternParameters}
          className="text-white/50 text-xs hover:text-white/80 transition-colors"
        >
          Reset
        </button>
      </div>
      
      {/* Complexity */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-white/70 text-xs">Complexity</Label>
          <span className="text-white/50 text-xs">{Math.round(parameters.complexity * 100)}%</span>
        </div>
        <Slider
          value={[parameters.complexity]}
          min={0.1}
          max={1}
          step={0.05}
          onValueChange={([value]) => handleParameterChange('complexity', value)}
          className="flex-1"
        />
      </div>
      
      {/* Rotation Speed */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-white/70 text-xs">Rotation Speed</Label>
          <span className="text-white/50 text-xs">{parameters.rotationSpeed.toFixed(1)}x</span>
        </div>
        <Slider
          value={[parameters.rotationSpeed]}
          min={0.1}
          max={2.0}
          step={0.1}
          onValueChange={([value]) => handleParameterChange('rotationSpeed', value)}
          className="flex-1"
        />
      </div>
      
      {/* Color Intensity */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-white/70 text-xs">Color Intensity</Label>
          <span className="text-white/50 text-xs">{Math.round(parameters.colorIntensity * 100)}%</span>
        </div>
        <Slider
          value={[parameters.colorIntensity]}
          min={0.1}
          max={1.0}
          step={0.05}
          onValueChange={([value]) => handleParameterChange('colorIntensity', value)}
          className="flex-1"
        />
      </div>
      
      {/* Line Thickness */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-white/70 text-xs">Line Thickness</Label>
          <span className="text-white/50 text-xs">{Math.round(parameters.lineThickness * 100)}%</span>
        </div>
        <Slider
          value={[parameters.lineThickness]}
          min={0.1}
          max={1.0}
          step={0.05}
          onValueChange={([value]) => handleParameterChange('lineThickness', value)}
          className="flex-1"
        />
      </div>
      
      {/* Trail Persistence */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-white/70 text-xs">Trail Persistence</Label>
          <span className="text-white/50 text-xs">{Math.round(parameters.trailPersistence * 100)}%</span>
        </div>
        <Slider
          value={[parameters.trailPersistence]}
          min={0.1}
          max={1.0}
          step={0.05}
          onValueChange={([value]) => handleParameterChange('trailPersistence', value)}
          className="flex-1"
        />
      </div>
    </motion.div>
  );
};

export default PatternParameters;
