import React from 'react';
import { CustomizationOptions } from '../types';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES, OVERALL_THEMES } from '../constants';

interface CustomizationPanelProps {
  options: CustomizationOptions;
  setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
}

const CustomSelect: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }> = ({ label, value, onChange, options }) => (
    <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full glass-input text-white rounded-md py-2 px-3 transition-all">
            {options.map(opt => <option key={opt.value} value={opt.value} className="bg-gray-800">{opt.label}</option>)}
        </select>
    </div>
);


const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions }) => {
  const handleChange = <K extends keyof CustomizationOptions,>(key: K, value: CustomizationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-white">2. Customize Style</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <CustomSelect 
            label="Lighting Style"
            value={options.lightingStyle}
            onChange={(e) => handleChange('lightingStyle', e.target.value as CustomizationOptions['lightingStyle'])}
            options={LIGHTING_STYLES}
        />

        <CustomSelect 
            label="Camera Perspective"
            value={options.cameraPerspective}
            onChange={(e) => handleChange('cameraPerspective', e.target.value as CustomizationOptions['cameraPerspective'])}
            options={CAMERA_PERSPECTIVES}
        />
      </div>
      
      <CustomSelect 
        label="Overall Theme"
        value={options.overallTheme}
        onChange={(e) => handleChange('overallTheme', e.target.value as CustomizationOptions['overallTheme'])}
        options={OVERALL_THEMES}
      />
    </div>
  );
};

export default CustomizationPanel;