import React, { useState, useEffect } from 'react';
import { ToolDef, InputType } from '../types';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ToolRunnerProps {
  tool: ToolDef;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [customComponent, setCustomComponent] = useState<React.ReactNode | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied_md' | 'copied_text'>('idle');

  // Reset state when tool changes
  useEffect(() => {
    setInputs({});
    setResult(null);
    setCustomComponent(null);
    setLoading(false);
    setCopyStatus('idle');
  }, [tool.id]);

  useEffect(() => {
    if (copyStatus !== 'idle') {
      const timer = setTimeout(() => setCopyStatus('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setCustomComponent(null);
    setCopyStatus('idle');

    try {
      if (tool.utilityFunction) {
        // Run custom utility function (e.g., thumbnail downloader)
        const output = await tool.utilityFunction(inputs);
        if (typeof output === 'string') {
          setResult(output);
        } else {
          setCustomComponent(output);
        }
      } else if (tool.systemPrompt) {
        // Run AI generation
        const text = await generateContent(tool.systemPrompt, inputs);
        setResult(text);
      }
    } catch (error) {
      setResult("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyMarkdown = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopyStatus('copied_md');
    }
  };

  const copyPlainText = () => {
    if (result) {
      // Basic strip markdown regex
      const plainText = result
        .replace(/[#*`_]/g, '') // Remove basic symbols
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text, remove url
        .replace(/^\s*-\s/gm, '') // Remove list bullets
        .replace(/^\d+\.\s/gm, '') // Remove list numbers
        .trim();
        
      navigator.clipboard.writeText(plainText);
      setCopyStatus('copied_text');
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-10 mt-6 animate-fade-in shadow-2xl shadow-purple-900/10 border border-white/5 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-start md:items-center gap-4 mb-8 relative z-10">
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-inner">
          <span className="text-4xl">{tool.icon}</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">{tool.name}</h2>
          <p className="text-slate-400 text-lg">{tool.description}</p>
        </div>
      </div>

      <div className="grid gap-6 mb-8 relative z-10">
        {tool.inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
              {input.label}
            </label>
            {input.type === InputType.TEXTAREA ? (
              <textarea
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition shadow-inner resize-y"
                rows={4}
                placeholder={input.placeholder}
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
            ) : input.type === InputType.DROPDOWN ? (
              <div className="relative">
                <select
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white appearance-none focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
                  value={inputs[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {input.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            ) : (
              <input
                type={input.type}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition shadow-inner"
                placeholder={input.placeholder}
                value={inputs[input.id] || input.defaultValue || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                disabled={!!input.defaultValue}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0
          ${loading 
            ? 'bg-slate-700 cursor-not-allowed opacity-80' 
            : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 animate-gradient hover:shadow-purple-500/30'
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Magic...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Generate Result ✨
          </span>
        )}
      </button>

      {(result || customComponent) && (
        <div className="mt-10 pt-8 border-t border-slate-700/50 animate-slide-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-purple-400">⚡</span> Result
            </h3>
            
            {result && (
              <div className="flex gap-2 w-full md:w-auto">
                 {/* Standard Markdown Copy */}
                <button 
                  onClick={copyMarkdown}
                  className={`flex-1 md:flex-none text-sm px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2
                    ${copyStatus === 'copied_md' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                >
                  {copyStatus === 'copied_md' ? 'Copied! ✓' : 'Copy Formatted 📋'}
                </button>

                {/* Plain Text Copy */}
                <button 
                  onClick={copyPlainText}
                  className={`flex-1 md:flex-none text-sm px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2
                    ${copyStatus === 'copied_text' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  title="Copy as plain text without special formatting"
                >
                  {copyStatus === 'copied_text' ? 'Copied! ✓' : 'Copy Plain Text 📄'}
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-[#0b1120] rounded-2xl p-6 md:p-8 border border-slate-800/80 shadow-inner overflow-x-auto min-h-[100px]">
            {customComponent ? (
              customComponent
            ) : (
              <div className="prose prose-invert prose-purple max-w-none prose-headings:text-purple-300 prose-a:text-pink-400 hover:prose-a:text-pink-300 prose-strong:text-white">
                <ReactMarkdown>{result || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};