import React from 'react';
import { GraduationCap, Database, Code, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'portal' | 'config' | 'export' | 'guide';
  setActiveTab: (tab: 'portal' | 'config' | 'export' | 'guide') => void;
  wpPreviewMode: boolean;
  setWpPreviewMode: (val: boolean) => void;
  isRealTime: boolean;
  studentFound: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wpPreviewMode,
  setWpPreviewMode,
  isRealTime,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  SIAKAD KHS
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isRealTime ? 'Google Sheets Live' : 'Demo Active'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pengumuman Nilai UTS Mahasiswa &bull; WordPress Ready
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('portal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'portal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden md:inline">Portal Mahasiswa</span>
              <span className="md:hidden">Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'config'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Database className="w-4 h-4" />
              <span className="hidden md:inline">Basis Data Sheet</span>
              <span className="md:hidden">Database</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'export'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Code className="w-4 h-4" />
              <span className="hidden md:inline">Ekspor WordPress</span>
              <span className="md:hidden">Kode WP</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Panduan</span>
            </button>
          </nav>

          {/* Right Action: Preview Mode Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setWpPreviewMode(!wpPreviewMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                wpPreviewMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Pratinjau tampilan terisolasi di dalam mockup tema WordPress"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {wpPreviewMode ? 'Mode WP Aktif' : 'Simulasi WP Theme'}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
