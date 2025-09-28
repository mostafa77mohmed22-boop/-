import { LightingStyle, CameraPerspective, OverallTheme } from './types';

export const LIGHTING_STYLES: { value: LightingStyle; label: string }[] = [
  { value: 'Natural Light', label: 'Natural Light' },
  { value: 'Studio Light', label: 'Studio Light' },
  { value: 'Golden Hour', label: 'Golden Hour' },
  { value: 'Blue Hour', label: 'Blue Hour' },
  { value: 'Cinematic', label: 'Cinematic' },
  { value: 'Dramatic', label: 'Dramatic' },
];

export const CAMERA_PERSPECTIVES: { value: CameraPerspective; label: string }[] = [
  { value: 'Front View', label: 'Front View' },
  { value: 'Top View', label: 'Top View' },
  { value: 'Side View', label: 'Side View' },
  { value: '45° Angle', label: '45° Angle' },
  { value: 'Close-up', label: 'Close-up' },
  { value: 'Macro Shot', label: 'Macro Shot' },
];

export const OVERALL_THEMES: { value: OverallTheme; label: string }[] = [
  { value: 'Bold & Vibrant', label: 'Bold & Vibrant' },
  { value: 'Minimal & Clean', label: 'Minimal & Clean' },
  { value: 'Dark & Moody', label: 'Dark & Moody' },
  { value: 'Soft & Dreamy', label: 'Soft & Dreamy' },
  { value: 'Retro & Vintage', label: 'Retro & Vintage' },
];