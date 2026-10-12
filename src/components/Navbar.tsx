import React from 'react';
import { 
  GraduationCap, 
  Database, 
  Code, 
  BookOpen, 
  Sparkles, 
  Lock, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'portal' | 'config' | 'export' | 'guide';
  setActiveTab: (tab: 'portal' | 'config' | 'export' | 'guide') => void;
  wpPreviewMode: boolean;
  setWpPreviewMode: (val: boolean) => void;
  isRealTime: boolean;
  studentFound: boolean;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wpPreviewMode,
  setWpPreviewMode,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onAdminLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding - GANTI JUDUL MENJADI "PENGUMUMAN NILAI" */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  PENGUMUMAN NILAI
                </span>
                {isAdminLoggedIn && (
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Mode Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Fakultas Kedokteran &bull; Evaluasi Ujian Tengah Semester (UTS)
              </p>
            </div>
          </div>

          {/* Navigation Tabs - HANYA MUNCUL KETIKA ADMIN SUDAH LOGIN */}
          {isAdminLoggedIn ? (
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
          ) : null}

          {/* Right Action: Login / Logout Admin */}
          <div className="flex items-center gap-2.5">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => setWpPreviewMode(!wpPreviewMode)}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    wpPreviewMode
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Pratinjau tampilan terisolasi di dalam tema WordPress"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {wpPreviewMode ? 'Mode WP Aktif' : 'Simulasi WP'}
                </button>

                <button
                  onClick={onAdminLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800 hover:bg-rose-900 transition-all cursor-pointer"
                  title="Keluar dari sesi Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Admin</span>
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                title="Login staf akademik untuk mengubah database dan kode"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Login Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
