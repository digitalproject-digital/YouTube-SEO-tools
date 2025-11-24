import React from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl filter drop-shadow-md group-hover:scale-110 transition-transform">🚀</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              YT SEO Tools
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-darker border-t border-white/5 py-10 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center space-x-6 mb-6 text-sm text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-pink-400 transition">Tools</button>
          <span>•</span>
          <button onClick={() => onNavigate('about')} className="hover:text-pink-400 transition">About</button>
          <span>•</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-pink-400 transition">Contact</button>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} YT SEO Tools. All Rights Reserved. <br/>
          <span className="text-xs opacity-50">Powered by Advanced AI Models</span>
        </p>
      </div>
    </footer>
  );
};