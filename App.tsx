import React, { useState, useEffect, useCallback } from 'react';
import { CustomizationOptions, ImageFile } from './types';
import { generateImage, analyzeStyleImage } from './services/geminiService';
import CustomizationPanel from './components/CustomizationPanel';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES, OVERALL_THEMES } from './constants';

function App() {
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [styleImage, setStyleImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageFile | null>(null);
  
  const [styleDescription, setStyleDescription] = useState<string | null>(null);
  const [isAnalyzingStyle, setIsAnalyzingStyle] = useState<boolean>(false);

  const [options, setOptions] = useState<CustomizationOptions>({
    lightingStyle: LIGHTING_STYLES[0].value,
    cameraPerspective: CAMERA_PERSPECTIVES[0].value,
    overallTheme: OVERALL_THEMES[0].value,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (styleImage) {
      const getStyleDescription = async () => {
        setIsAnalyzingStyle(true);
        setError(null);
        try {
          const description = await analyzeStyleImage(styleImage);
          setStyleDescription(description);
        } catch (err) {
          console.error(err);
          setError(err instanceof Error ? err.message : "Could not analyze the style image.");
          setStyleDescription(null);
        } finally {
          setIsAnalyzingStyle(false);
        }
      };
      getStyleDescription();
    } else {
      setStyleDescription(null);
    }
  }, [styleImage]);


  useEffect(() => {
    const generateNewPrompt = () => {
      if (!productImage) {
          setGeneratedPrompt('');
          return;
      }
      
      let newPrompt = `**Task:** Generate a world-class, hyperrealistic, and commercially captivating product photograph. The final image must be indistinguishable from a high-budget professional studio shot.

**Core Subject & Fidelity:**
- The absolute primary subject is the product from the user-provided image.
- **Non-Negotiable:** Preserve its core design, shape, branding (logo, text), and specific details with 100% accuracy. Do not alter or imagine new branding.

**CRITICAL - Advanced Integration & Enhancement:**
- This is not a simple background replacement. You must **re-imagine and completely re-render the product** from scratch to exist perfectly within the new scene.
- **1. Dynamic Lighting & Volumetrics:** The product's lighting must be a masterclass. It should not just be lit *by* the scene, but *interact* with it. Use volumetric light effects where appropriate (e.g., light rays in a dusty environment). Shadows must have realistic softness, contact points, and color. Highlights must be motivated by the light sources.
- **2. Hyper-Realistic Materials & Micro-Details:**
  - Render materials with extreme fidelity. Glass should have accurate refraction and caustics. Plastic should show subtle surface imperfections. Liquids should look vibrant and real.
  - **Elevate the Appeal:** This is key. Make the product look incredibly desirable. For a beverage, this means adding subtle, realistic condensation, glistening highlights on the liquid, and making it look refreshingly cold. For a cosmetic item, make the packaging look pristine and luxurious.
- **3. Professional Color Science & Grading:**
  - The color grading must be flawless, unifying the product and the scene.
  - **Harmonize, Don't Alter:** The product must adopt the color temperature and ambient light of the scene. For example, in a warm, golden-hour scene, the product's highlights must be tinted gold, and its shadows must be cool.
  - **Preserve Brand Identity:** Crucially, while harmonizing, the product's intrinsic brand colors (logo, label, liquid color) must remain accurate and instantly recognizable. The final look should be "product seen under new lighting," not "product with changed colors."

**Artistic & Style Directives:**
- **Overall Theme:** ${options.overallTheme}. Create a powerful mood based on this.
- **Lighting Style:** ${options.lightingStyle}. Execute this with professional precision.
- **Camera Perspective:** ${options.cameraPerspective}. Use appropriate depth of field to make the product pop.`;

      if (styleImage) {
        if (isAnalyzingStyle) {
            newPrompt += `\n- **Style Reference:** Analyzing the provided style reference image to extract its aesthetic, color palette, and mood...`;
        } else if (styleDescription) {
            newPrompt += `\n- **Style Reference:** Strictly adhere to the aesthetic of the provided style reference image, which is described as: "${styleDescription}". Replicate its mood, color grading, and texture for a cohesive final image.`;
        } else {
             newPrompt += `\n- **Style Reference:** Strictly adhere to the aesthetic, color palette, texture, and overall mood of the provided style reference image. The goal is to make the product look as if it belongs in the same visual world as the style reference.`;
        }
      }
      
      newPrompt += `\n\n**Final Output Requirements:**
- An ultra-realistic, high-resolution photograph suitable for a global advertising campaign.
- The product must be the undeniable "hero" of the image. It must be sharp, in focus, and draw the viewer's eye immediately.
- The composition must be masterful, balanced, and commercially potent.`;

      setGeneratedPrompt(newPrompt);
    };
    generateNewPrompt();
  }, [options, productImage, styleImage, styleDescription, isAnalyzingStyle]);
  
  const handleGenerate = useCallback(async () => {
    if (!productImage || !generatedPrompt) {
      setError('Please upload a product image and ensure the prompt is not empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage(productImage, generatedPrompt, styleImage);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [productImage, generatedPrompt, styleImage]);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<ImageFile | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setter({
          base64: base64String.split(',')[1],
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 pb-2">
          Mostafa ai
        </h1>
        <p className="text-gray-400 mt-2">Transform your product photos with the power of Gemini.</p>
      </header>
      
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Controls */}
        <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-8">
                {/* Section 1: Upload Images */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-white">1. Upload Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ImageUploader 
                            id="product-uploader"
                            title="Product Image"
                            image={productImage}
                            onImageUpload={handleFileChange(setProductImage)}
                        />
                        <ImageUploader 
                            id="style-uploader"
                            title="Style Reference"
                            image={styleImage}
                            onImageUpload={handleFileChange(setStyleImage)}
                        >
                             {isAnalyzingStyle && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                                <p className="text-sm text-white mt-2">Analyzing...</p>
                                </div>
                            )}
                        </ImageUploader>
                    </div>
                </div>

                {/* Section 2: Customize Style */}
                <CustomizationPanel 
                    options={options}
                    setOptions={setOptions}
                />
                
                {/* Section 3: Refine Prompt & Generate */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-white">3. Refine Prompt & Generate</h2>
                    <textarea
                        value={generatedPrompt}
                        onChange={(e) => setGeneratedPrompt(e.target.value)}
                        rows={10}
                        className="w-full glass-input text-gray-300 rounded-md p-3 text-sm leading-relaxed transition-all scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                        placeholder="Your generated prompt will appear here..."
                    />
                    {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">{error}</div>}
                    <button 
                        onClick={handleGenerate}
                        disabled={isLoading || !productImage || isAnalyzingStyle}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 disabled:shadow-none transform hover:-translate-y-1 disabled:transform-none"
                    >
                        {isAnalyzingStyle ? 'Analyzing Style...' : isLoading ? 'Generating...' : 'Generate Image'}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Column 2: Result */}
        <div className="lg:col-span-7">
             <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Result</h2>
                <ResultDisplay 
                    imageFile={generatedImage}
                    isLoading={isLoading}
                />
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;