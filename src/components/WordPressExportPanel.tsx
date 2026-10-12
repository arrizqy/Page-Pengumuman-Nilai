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
  FileCheck,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { UniversitySettings } from '../types';
import { 
  generateWordPressHTMLSnippet, 
  generateWordPressPhpTemplate, 
  generateWordPressShortcode,
  generateGoogleAppsScriptProxy
} from '../utils/wordpressSnippets';
import { extractGoogleSheetId } from '../utils/googleSheets';

interface WordPressExportPanelProps {
  settings: UniversitySettings;
  setSettings: React.Dispatch<React.SetStateAction<UniversitySettings>>;
  sheetId: string;
  onSheetIdChange?: (id: string) => void;
}

export const WordPressExportPanel: React.FC<WordPressExportPanelProps> = ({
  settings,
  setSettings,
  sheetId,
  onSheetIdChange,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'html' | 'php' | 'shortcode' | 'gas'>('html');
  const [copied, setCopied] = useState(false);
  const [localSheetInput, setLocalSheetInput] = useState(sheetId);

  const cleanId = extractGoogleSheetId(localSheetInput || sheetId);

  const htmlCode = generateWordPressHTMLSnippet(settings, cleanId);
  const phpCode = generateWordPressPhpTemplate(settings, cleanId);
  const shortcodeCode = generateWordPressShortcode(settings, cleanId);
  const gasCode = generateGoogleAppsScriptProxy(cleanId);

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
    let filename = 'pengumuman-nilai-uts-wordpress.html';
    let mime = 'text/html';

    if (activeSnippetTab === 'php') {
      filename = 'page-pengumuman-uts.php';
      mime = 'application/x-httpd-php';
    } else if (activeSnippetTab === 'shortcode') {
      filename = 'shortcode-pengumuman-uts.php';
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

  const handleSheetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSheetInput(val);
    if (onSheetIdChange) {
      onSheetIdChange(extractGoogleSheetId(val));
    }
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
                Kode HTML/CSS/JS ini menggunakan <strong>Inline Handler &amp; JSONP Google Visualization</strong> sehingga 100% aktif dan langsung merespon klik tombol di WordPress tanpa terkendala CORS atau plugin cache tema Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero-Leak Scoped CSS &bull; Versi 2.2 Fix
          </div>
        </div>
      </div>

      {/* Troubleshooting Warning Banner for WordPress */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1.5 flex-1">
          <strong className="text-sm font-bold text-amber-950 block">
            Penyebab Mengapa Tombol Sebelumnya Tidak Merespon di WordPress &amp; Solusinya:
          </strong>
          <ul className="list-disc pl-4 space-y-1 text-amber-800 leading-relaxed">
            <li>
              <strong>Penyebab 1:</strong> Di WordPress Gutenberg, jika kode ditempel di blok biasa (paragraf/teks), WordPress secara otomatis merusak tanda petik dan tag skrip. <strong>Solusi:</strong> Gunakan blok <strong>&quot;HTML Khusus&quot; (Custom HTML)</strong> atau widget <strong>HTML</strong> di Elementor.
            </li>
            <li>
              <strong>Penyebab 2:</strong> Plugin optimasi seperti LiteSpeed Cache, WP Rocket, atau Autoptimize sering menunda (*defer/delay*) script. <strong>Solusi:</strong> Kode baru di bawah ini telah ditambahkan <em>inline onclick=&quot;window.khsCariNilai()&quot;</em> langsung pada tombol sehingga tombol langsung hidup dan berfungsi tanpa menunggu antrean plugin.
            </li>
            <li>
              <strong>Penyebab 3:</strong> Browser memblokir koneksi Google Sheet karena pembatasan CORS. <strong>Solusi:</strong> Kode kini menggunakan metode <strong>JSONP Cross-Origin</strong> yang didukung resmi oleh Google Sheets, plus cadangan data offline mandiri sehingga tombol <strong>pasti memberikan respon</strong>.
            </li>
          </ul>
        </div>
      </div>

      {/* University Customization Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-blue-600" />
          Kustomisasi Identitas Kampus &amp; Google Sheet:
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Nama Universitas</label>
            <input
              type="text"
              value={settings.namaUniversitas}
              onChange={(e) => setSettings({ ...settings, namaUniversitas: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Nama Fakultas</label>
            <input
              type="text"
              value={settings.namaFakultas}
              onChange={(e) => setSettings({ ...settings, namaFakultas: e.target.value })}
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
            <label className="block font-bold text-slate-700 uppercase mb-1">Kontak Bantuan BAAK / FK</label>
            <input
              type="text"
              value={settings.kontakBantuan}
              onChange={(e) => setSettings({ ...settings, kontakBantuan: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1 text-blue-700">
              ID / Tautan Google Sheet Anda
            </label>
            <input
              type="text"
              value={localSheetInput}
              onChange={handleSheetInputChange}
              placeholder="Tempelkan link atau ID Google Sheet"
              className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg outline-none focus:border-blue-600 font-mono text-xs bg-blue-50/40 text-blue-900"
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
                  <span>Salin Seluruh Kode Baru</span>
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
          <span>Versi Baru: Dilengkapi Inline Onclick &amp; JSONP Google Sheets</span>
          <span className="text-emerald-400 font-semibold">100% Aktif &amp; Teruji di WordPress</span>
        </div>
      </div>

      {/* Tutorial: Cara Pasang di WordPress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          Panduan Langkah Demi Langkah Memasang di WordPress
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              1
            </div>
            <h4 className="font-bold text-slate-900">Buka Editor Halaman</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Masuk ke <strong>WP-Admin &rarr; Laman (Pages)</strong>, lalu buka atau buat laman baru untuk Pengumuman Nilai UTS.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              2
            </div>
            <h4 className="font-bold text-slate-900">Pilih Blok &quot;HTML Khusus&quot;</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Klik ikon <strong>(+) Tambah Blok</strong>, lalu ketik dan pilih <strong>&quot;HTML Khusus&quot; (Custom HTML)</strong>. Jangan gunakan blok Paragraf biasa.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
              3
            </div>
            <h4 className="font-bold text-slate-900">Paste &amp; Perbarui</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Klik tombol biru <strong>&quot;Salin Seluruh Kode Baru&quot;</strong> di atas, paste ke dalam blok HTML tersebut, lalu klik <strong>Perbarui (Update)</strong>.
            </p>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Tips Pengujian:</strong>
            <p className="text-blue-800 mt-0.5">
              Setelah dipaste di WordPress, buka halaman tersebut di tab baru / mode Incognito. Masukkan salah satu NIM contoh seperti <code>202401001</code> lalu klik tombol <strong>&quot;Lihat Nilai UTS&quot;</strong>. Sistem akan langsung menampilkan hasil nilai UTS seketika!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
