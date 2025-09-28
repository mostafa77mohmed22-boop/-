import React from 'react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
       <h2 className="text-xl font-bold text-white">3. Refine Prompt (Optional)</h2>
       <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={8}
        className="w-full glass-input text-gray-200 rounded-md p-3 text-sm leading-relaxed transition-all"
        placeholder="Your generated prompt will appear here..."
      />
    </div>
  );
};

export default PromptEditor;