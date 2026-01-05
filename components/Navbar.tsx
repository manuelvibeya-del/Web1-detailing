import React, { useState } from 'react';
import { Menu, X, Sparkles, Car } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Servicios', href: '#services' },
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Oferta', href: '#offer' },
  ];

  const handleNavClick = (href: string) => {
    onChangeView(AppView.LANDING);
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onChangeView(AppView.LANDING)}>
            <Car className="h-8 w-8 text-purple-500 mr-2" />
            <span className="font-bold text-xl tracking-tighter text-white">Latino<span className="text-purple-500">Shine</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="relative group">
                <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-lg shadow-purple-500/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Tools
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-xl py-1 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible border border-slate-800">
                   <button onClick={() => onChangeView(AppView.AI_CHAT)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 hover:text-white">Asistente Virtual</button>
                   <button onClick={() => onChangeView(AppView.AI_ANALYZE)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 hover:text-white">Analizar Vehículo</button>
                   <button onClick={() => onChangeView(AppView.AI_GENERATE)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 hover:text-white">Diseñar Estilo</button>
                   <button onClick={() => onChangeView(AppView.AI_VIDEO)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 hover:text-white">Animar Auto</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-purple-900/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-slate-800 pt-4 mt-4">
              <p className="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">Herramientas IA</p>
              <button onClick={() => {onChangeView(AppView.AI_CHAT); setIsOpen(false);}} className="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Asistente Virtual</button>
              <button onClick={() => {onChangeView(AppView.AI_ANALYZE); setIsOpen(false);}} className="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Analizar Vehículo</button>
              <button onClick={() => {onChangeView(AppView.AI_GENERATE); setIsOpen(false);}} className="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Diseñar Estilo</button>
              <button onClick={() => {onChangeView(AppView.AI_VIDEO); setIsOpen(false);}} className="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Animar Auto</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;