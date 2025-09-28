
import React, { useState } from 'react';
import { ImageFile } from '../types';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';

interface ImageWorkspaceProps {
  productImage: ImageFile | null;
  onProductImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generatedImage: ImageFile | null;
  isLoading: boolean;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({ productImage, onProductImageUpload, generatedImage, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-300">1. Upload Product Image</h3>
        <ImageUploader 
            id="product-uploader"
            title="Upload Product Image"
            image={productImage}
            onImageUpload={onProductImageUpload}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-300">2. Generated Result</h3>
        <ResultDisplay 
            imageFile={generatedImage}
            isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ImageWorkspace;
