import React from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: ImageFile | null;
  title: string;
  id: string;
  children?: React.ReactNode;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image, title, id, children }) => {
  return (
    <div className="w-full aspect-square">
      <label htmlFor={id} className="cursor-pointer group h-full">
        <div className="relative h-full border-2 border-dashed border-white/10 rounded-xl text-center hover:border-emerald-500/80 transition-all duration-300 bg-black/10 backdrop-blur-sm flex flex-col justify-center items-center">
          {image ? (
            <img src={`data:${image.mimeType};base64,${image.base64}`} alt={title} className="absolute inset-0 w-full h-full object-contain rounded-xl p-1" />
          ) : (
            <div className="flex flex-col items-center p-2">
              <UploadIcon />
              <p className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors">{title}</p>
            </div>
          )}
          {children}
        </div>
      </label>
      <input id={id} type="file" className="hidden" accept="image/*" onChange={onImageUpload} />
    </div>
  );
};

export default ImageUploader;