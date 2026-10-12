import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Layers, 
  ShieldCheck, 
  Palette, 
  Sparkles,
  ExternalLink,
  Laptop,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { UniversitySettings } from '../types';
import { 
  generateWordPressHTMLSnippet, 
  generateWordPressPhpTemplate, 
  generateWordPressShortcode,
  generateGoogleAppsScriptProxy
} from '../utils/wordpressSnippets';

interface WordPressExportPanelProps {
  settings: UniversitySettings;
  setSettings: React.Dispatch<React.SetStateAction<UniversitySettings>>;
  sheetId: string;
}

export const WordPressExportPanel: React.FC<WordPressExportPanelProps> = ({
  settings,
  setSettings,
  sheetId,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'html' | 'php' | 'shortcode' | 'gas'>('html');
  const [copied, setCopied] = useState(false);

  const htmlCode = generateWordPressHTMLSnippet(settings, sheetId || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  const phpCode = generateWordPressPhpTemplate(settings, sheetId || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  const shortcodeCode = generateWordPressShortcode(settings, sheetId || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  const gasCode = generateGoogleAppsScriptProxy(sheetId || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');

  const currentSnippet = activeSnippetTab === 'html'
    ? htmlCode
    : activeSnippetTab === 'php'
    ? phpCode
    : activeSnippetTab === 'shortcode'
    ? shortcodeCode
    : gasCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    let filename = 'pengumuman-nilai-wordpress.html';
    let mime = 'text/html';

    if (activeSnippetTab === 'php') {
      filename = 'page-pengumuman-nilai.php';
      mime = 'application/x-httpd-php';
    } else if (activeSnippetTab === 'shortcode') {
      filename = 'shortcode-pengumuman-nilai.php';
      mime = 'application/x-httpd-php';
    } else if (activeSnippetTab === 'gas') {
      filename = 'GoogleAppsScript_Proxy.js';
      mime = 'application/javascript';
    }

    const blob = new Blob([currentSnippet], { type: `${mime};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Ekspor Kode Siap Pakai untuk WordPress
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Kode HTML/CSS/JS ini telah dioptimasi dengan <strong>CSS Namespacing (.khs-wp-root)</strong>, sehingga 100% aman dan tidak akan merusak warna, font, header, navigasi, atau footer dari template tema WordPress Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero-Leak Scoped CSS
          </div>
        </div>
      </div>

      {/* University Customization Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-blue-600" />
          Kustomisasi Teks Kampus pada Kode WordPress:
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Nama Universitas / Kampus</label>
            <input
              type="text"
              value={settings.namaUniversitas}
              onChange={(e) => setSettings({ ...settings, namaUniversitas: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Judul Sistem / Halaman</label>
            <input
              type="text"
              value={settings.namaSistem}
              onChange={(e) => setSettings({ ...settings, namaSistem: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Tahun Akademik &amp; Semester</label>
            <input
              type="text"
              value={settings.tahunAkademik}
              onChange={(e) => setSettings({ ...settings, tahunAkademik: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp / Telepon BAAK</label>
            <input
              type="text"
              value={settings.kontakBantuan}
              onChange={(e) => setSettings({ ...settings, kontakBantuan: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Email Bantuan Akademik</label>
            <input
              type="text"
              value={settings.emailBantuan}
              onChange={(e) => setSettings({ ...settings, emailBantuan: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">ID Google Sheet yang Disematkan</label>
            <input
              type="text"
              disabled
              value={sheetId || 'Default Demo Sheet'}
              className="w-full px-3 py-2 border rounded-lg bg-slate-50 font-mono text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Code Viewer & Action Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Code Tabs Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveSnippetTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSnippetTab === 'html'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Gutenberg / Elementor HTML (Rekomendasi)</span>
            </button>

            <button
              onClick={() => setActiveSnippetTab('php')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSnippetTab === 'php'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Page Template PHP</span>
            </button>

            <button
              onClick={() => setActiveSnippetTab('shortcode')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSnippetTab === 'shortcode'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Shortcode</span>
            </button>

            <button
              onClick={() => setActiveSnippetTab('gas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSnippetTab === 'gas'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Proxy API Google Apps Script untuk privasi maksimal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Apps Script Proxy</span>
            </button>
          </div>

          {/* Copy and Download Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh File</span>
            </button>

            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Seluruh Kode</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[500px] text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/90 selection:bg-blue-600 selection:text-white">
          <pre>{currentSnippet}</pre>
        </div>

        {/* Footer Note */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Format: Self-Contained Standalone Snippet &bull; No external jQuery required</span>
          <span className="text-emerald-400 font-semibold">Siap ditempel langsung ke WordPress</span>
        </div>
      </div>

      {/* Tutorial: Cara Pasang di WordPress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          Panduan 3 Langkah Memasang di WordPress (Tanpa Ganggu Tema)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              1
            </div>
            <h4 className="font-bold text-slate-900">Buat Laman Baru</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Masuk ke <strong>WP-Admin &rarr; Laman (Pages) &rarr; Tambah Baru (Add New)</strong>. Beri judul seperti &quot;Pengumuman Nilai Semester&quot; atau &quot;Cek KHS Mahasiswa&quot;.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              2
            </div>
            <h4 className="font-bold text-slate-900">Tambahkan Blok HTML</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jika menggunakan Gutenberg, klik ikon <strong>(+) Tambah Blok</strong> lalu pilih <strong>&quot;HTML Khusus&quot; (Custom HTML)</strong>. Jika menggunakan Elementor, gunakan widget <strong>HTML</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              3
            </div>
            <h4 className="font-bold text-slate-900">Paste &amp; Terbitkan</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Klik tombol <strong>&quot;Salin Seluruh Kode&quot;</strong> di atas, paste ke dalam blok HTML tersebut, lalu klik <strong>Terbitkan (Publish)</strong>. Halaman langsung aktif dan responsif!
            </p>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block font-bold">Mengapa Aman Bagi Template Utama WordPress Anda?</strong>
            <p className="text-emerald-800">
              Seluruh selektor CSS dibatasi secara ketat dalam cakupan ID <code>#khs-portal-container</code> dan kelas <code>.khs-wp-root</code>. Tidak ada aturan global seperti <code>body</code>, <code>h1</code>, atau <code>button</code> tanpa prefix yang bisa menimpa warna logo, font navbar, atau footer situs WordPress Anda.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
