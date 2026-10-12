import React, { useState } from 'react';
import { Lock, X, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();

    // Standard admin check (admin / admin or admin / admin123)
    if (u === 'admin' && (p === 'admin' || p === 'admin123' || p === '123456')) {
      setError('');
      setUsername('');
      setPassword('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Username atau kata sandi admin salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Login Akun Admin</h3>
              <p className="text-xs text-slate-400">Pengaturan Basis Data &amp; Ekspor WordPress</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Halaman ini khusus untuk staf pengelola akademik. Silakan masuk untuk mengakses konfigurasi Google Sheet dan kode ekspor website.
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username Admin
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-3.5 py-2.5 text-sm border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <span className="block text-[11px] text-slate-400 mt-1">
              Akun default: <strong>admin</strong> / <strong>admin123</strong>
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            >
              <KeyRound className="w-4 h-4" />
              Masuk sebagai Admin
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
