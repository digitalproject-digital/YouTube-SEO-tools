import React, { useState } from 'react';
import { Navbar, Footer } from './components/Layout';
import { ToolRunner } from './components/ToolRunner';
import { TOOLS } from './constants';
import { ToolCategory } from './types';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeToolId, setActiveToolId] = useState<string>(TOOLS[0].id);

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  const handleToolClick = (id: string) => {
    setActiveToolId(id);
    const element = document.getElementById('tool-panel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto animate-fade-in py-12 px-4">
             <div className="glass-panel rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl shadow-purple-900/20">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">About YT SEO Tools</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Welcome to the world's most advanced <strong>Free YouTube SEO Toolkit</strong>. 
                  Our mission is to democratize channel growth for creators everywhere.
                </p>
                <p>
                  Whether you are a beginner looking for your first 1,000 subscribers or a seasoned pro optimizing 
                  for millions of views, our suite of 25+ AI-powered tools is designed to give you an unfair advantage.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                  <li>🚀 Generate viral-worthy titles in seconds.</li>
                  <li>🕵️‍♂️ Spy on competitors with deep analytics.</li>
                  <li>📝 Write full scripts and descriptions instantly.</li>
                  <li>🎨 Download and analyze high-res thumbnails.</li>
                </ul>
                <p>
                  Built with the latest in Generative AI technology, we ensure your content is perfectly optimized 
                  for the YouTube algorithm.
                </p>
              </div>
             </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-3xl mx-auto animate-fade-in py-12 px-4">
            <div className="glass-panel rounded-3xl p-8 md:p-12 border border-pink-500/20 shadow-2xl shadow-pink-900/20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-8 shadow-lg shadow-purple-500/30">
                <span className="text-4xl">✉️</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Have questions, suggestions, or need support? We'd love to hear from you. 
                Reach out to us directly via email.
              </p>
              
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 inline-block w-full max-w-md">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Email Us At</p>
                <a 
                  href="mailto:vishalku875906@gmail.com" 
                  className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:to-white transition-all break-all"
                >
                  vishalku875906@gmail.com
                </a>
              </div>

              <div className="mt-8 text-slate-500 text-sm">
                We typically reply within 24-48 hours.
              </div>
            </div>
          </div>
        );

      case 'home':
      default:
        return (
          <>
            {/* Tools Selector */}
            <div id="tools" className="glass-panel rounded-2xl p-6 md:p-8 mb-8 border border-white/5">
              <div className="flex flex-col gap-10">
                {/* Category Groups */}
                {Object.values(ToolCategory).map((category) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px bg-slate-700 flex-1"></div>
                      <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest px-2">{category}</h3>
                      <div className="h-px bg-slate-700 flex-1"></div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      {TOOLS.filter(t => t.category === category).map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          className={`
                            flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border
                            ${activeToolId === tool.id 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-lg shadow-purple-500/30 transform scale-105' 
                              : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:shadow-md hover:shadow-purple-900/20'
                            }
                          `}
                        >
                          <span className="text-lg">{tool.icon}</span>
                          {tool.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tool Panel */}
            <div id="tool-panel">
               <ToolRunner tool={activeTool} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-darker text-slate-200 font-sans selection:bg-pink-500/30">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Hero Section (Only visible on Home) */}
      {currentView === 'home' && (
        <section className="pt-32 pb-12 px-4 text-center relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            AI-Powered <br className="md:hidden" />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent neon-text">
              YouTube SEO Toolkit
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explode your channel growth with our suite of <span className="text-purple-300 font-semibold">25+ Professional Tools</span>. 
            Rank #1 on YouTube with AI-generated titles, keywords, tags, and deep channel analysis.
          </p>
        </section>
      )}

      {/* Spacer for other pages */}
      {currentView !== 'home' && <div className="h-24"></div>}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}

export default App;