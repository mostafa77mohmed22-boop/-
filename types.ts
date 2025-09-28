
export type LightingStyle = 'Natural Light' | 'Studio Light' | 'Golden Hour' | 'Blue Hour' | 'Cinematic' | 'Dramatic';
export type CameraPerspective = 'Front View' | 'Top View' | 'Side View' | '45° Angle' | 'Close-up' | 'Macro Shot';
export type OverallTheme = 'Bold & Vibrant' | 'Minimal & Clean' | 'Dark & Moody' | 'Soft & Dreamy' | 'Retro & Vintage';

export interface CustomizationOptions {
  lightingStyle: LightingStyle;
  cameraPerspective: CameraPerspective;
  overallTheme: OverallTheme;
}

export interface ImageFile {
  base64: string;
  mimeType: string;
  name: string;
}