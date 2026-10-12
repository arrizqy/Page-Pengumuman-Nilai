import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  HelpCircle, 
  Link2, 
  Table, 
  Copy, 
  Share2, 
  Globe, 
  HardDrive, 
  Check, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { GoogleSheetConfig, UniversitySettings } from '../types';
import { extractGoogleSheetId, fetchGoogleSheetCsv, parseCSV, processSheetData } from '../utils/googleSheets';
import { SAMPLE_GOOGLE_SHEET_CSV } from '../data/mockAcademicData';
import { getShareablePortalUrl, saveConfigToStorage, updateUrlWithSheetId } from '../utils/persistence';

interface GoogleSheetConfigPanelProps {
  config: GoogleSheetConfig;
  setConfig: React.Dispatch<React.SetStateAction<GoogleSheetConfig>>;
  settings: UniversitySettings;
  setSettings: React.Dispatch<React.SetStateAction<UniversitySettings>>;
  onSyncSuccess: (count: number) => void;
}

export const GoogleSheetConfigPanel: React.FC<GoogleSheetConfigPanelProps> = ({
  config,
  setConfig,
  settings,
  setSettings,
  onSyncSuccess,
}) => {
  const [testUrl, setTestUrl] = useState(config.sheetId);
  const [testing, setTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{ ok: boolean; message: string; rowsCount?: number } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  // Sync testUrl when config changes from outside (e.g. storage or URL param)
  useEffect(() => {
    if (config.sheetId && !testUrl) {
      setTestUrl(config.sheetId);
    }
  }, [config.sheetId, testUrl]);

  const activeShareUrl = getShareablePortalUrl(config.sheetId || testUrl, config.gid || '0');

  const handleTestConnection = async () => {
    if (!testUrl.trim()) {
      setTestStatus({ ok: false, message: 'Masukkan Sheet ID atau Link Google Sheet terlebih dahulu.' });
      return;
    }

    setTesting(true);
    setTestStatus(null);

    const extractedId = extractGoogleSheetId(testUrl);

    try {
      const csvText = await fetchGoogleSheetCsv(extractedId, config.gid || '0');
      const parsed = parseCSV(csvText);
      const reports = processSheetData(parsed, settings.kkmUts || 70);
      const studentCount = Object.keys(reports).length;

      if (studentCount === 0) {
        setTestStatus({
          ok: false,
          message: 'Berhasil mengunduh Sheet, namun tidak ada data mahasiswa atau kolom NIM tidak ditemukan pada baris pertama.',
        });
      } else {
        const newConfig: GoogleSheetConfig = {
          ...config,
          sheetId: extractedId,
          mode: 'public_csv',
          lastFetchedAt: new Date().toLocaleTimeString('id-ID'),
        };

        // Update state
        setConfig(newConfig);

        // Save to localStorage immediately so it's never lost on reload/logout
        saveConfigToStorage(newConfig);

        // Update URL bar without reload (?sheet=...)
        updateUrlWithSheetId(extractedId, config.gid || '0');

        setTestStatus({
          ok: true,
          message: `Koneksi Berhasil! Terhubung secara real-time. Ditemukan ${studentCount} data mahasiswa. Konfigurasi telah disimpan permanen.`,
          rowsCount: studentCount,
        });

        onSyncSuccess(studentCount);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal menghubungi Google Sheet';
      setTestStatus({
        ok: false,
        message: errMsg + ' — Pastikan izin berbagi diatur ke: "Siapa saja yang memiliki link dapat melihat".',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleCopyShareUrl = () => {
    if (!activeShareUrl) return;
    navigator.clipboard.writeText(activeShareUrl);
    setCopiedShareUrl(true);
    setTimeout(() => setCopiedShareUrl(false), 2500);
  };

  const handleDownloadConfigFile = () => {
    const configData = {
      sheetId: extractGoogleSheetId(config.sheetId || testUrl),
      gid: config.gid || '0',
      namaFakultas: settings.namaFakultas,
      namaUniversitas: settings.namaUniversitas,
      semesterAktif: settings.semesterAktif,
      tahunAkademik: settings.tahunAkademik,
      diperbarui: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sheet-config.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCsvTemplate = () => {
    const blob = new Blob([SAMPLE_GOOGLE_SHEET_CSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_nilai_mahasiswa_google_sheet.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCsvTemplate = () => {
    navigator.clipboard.writeText(SAMPLE_GOOGLE_SHEET_CSV);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Konfigurasi Basis Data Google Sheets
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Hubungkan lembar kerja Google Sheets kampus Anda sebagai database real-time. Setiap kali dosen/staf akademik memperbarui nilai di spreadsheet, portal nilai mahasiswa akan langsung terupdate seketika tanpa perlu coding ulang!
            </p>
          </div>
        </div>
      </div>

      {/* Shareable Link Card for Multi-Device Access (Prominent) */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Globe className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Tautan Akses Publik untuk Mahasiswa
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
                  Multi-Device Ready
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                Gunakan tautan ini agar mahasiswa di HP, laptop, atau perangkat manapun langsung terhubung ke spreadsheet Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-200 flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              Tersimpan di Browser &amp; URL
            </span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-blue-500/30 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            readOnly
            value={activeShareUrl}
            className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-blue-200 outline-none select-all overflow-ellipsis"
          />
          <button
            type="button"
            onClick={handleCopyShareUrl}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer shrink-0"
          >
            {copiedShareUrl ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Tersalin ke Clipboard!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Salin Link Publik
              </>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-blue-200/90 pt-3 border-t border-blue-800/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mahasiswa tidak perlu login admin</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Bisa dibuka di HP Android, iPhone, Laptop</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Data tidak akan hilang saat logout admin</span>
          </div>
        </div>
      </div>

      {/* Mode Selection & Connection Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-600" />
            Pengaturan URL Google Sheet
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                ID atau Tautan URL Lengkap Google Sheet
              </label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/14mFrZADIes0DeYG3A6XapYJlF0wmaUFt/edit?usp=sharing"
                className="w-full px-4 py-3 text-sm font-mono border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
              <span className="block text-xs text-slate-500 mt-1.5">
                Bisa berupa link URL lengkap dari browser atau hanya ID Sheet (30-44 karakter acak).
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tab GID (Sheet ID)
                </label>
                <input
                  type="text"
                  value={config.gid}
                  onChange={(e) => {
                    const newGid = e.target.value;
                    setConfig(prev => ({ ...prev, gid: newGid }));
                    updateUrlWithSheetId(config.sheetId, newGid);
                  }}
                  placeholder="0 (Sheet tab pertama)"
                  className="w-full px-4 py-2.5 text-sm font-mono border border-slate-200 rounded-lg outline-none focus:border-blue-600"
                />
                <span className="block text-[11px] text-slate-500 mt-1">
                  Default adalah 0 untuk sheet/tab pertama.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Status Database Saat Ini
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-slate-50 text-xs font-semibold text-slate-800">
                  <span className={`w-2.5 h-2.5 rounded-full ${config.mode === 'public_csv' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
                  {config.mode === 'public_csv' ? 'Terhubung ke Google Sheet' : 'Menggunakan Data Demo Bawaan'}
                </div>
              </div>
            </div>

            {/* Test Status feedback */}
            {testStatus && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${
                testStatus.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                {testStatus.ok ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{testStatus.message}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:bg-slate-300"
              >
                {testing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Menguji Koneksi Real-Time...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Uji &amp; Hubungkan Sheet
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const demoConfig: GoogleSheetConfig = { ...config, mode: 'demo' };
                  setConfig(demoConfig);
                  saveConfigToStorage(demoConfig);
                  updateUrlWithSheetId(null);
                  setTestStatus({ ok: true, message: 'Kembali menggunakan data simulasi internal (8 mahasiswa demo).' });
                }}
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer"
              >
                Gunakan Data Demo Bawaan
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Step by step */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 text-xs text-slate-700">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Langkah Setting Google Sheet:
          </h4>
          <ol className="list-decimal pl-4 space-y-2 leading-relaxed text-slate-600">
            <li>
              Buka Google Sheet yang berisi nilai mahasiswa Anda.
            </li>
            <li>
              Klik tombol biru <strong>&quot;Bagikan&quot; (Share)</strong> di pojok kanan atas.
            </li>
            <li>
              Ubah akses dari <em>Dibatasi</em> menjadi <strong>&quot;Siapa saja yang memiliki link dapat melihat&quot; (Viewer)</strong>.
            </li>
            <li>
              Salin URL atau ID Google Sheet dan tempelkan pada kolom di samping.
            </li>
            <li>
              Klik <strong>&quot;Uji &amp; Hubungkan Sheet&quot;</strong>.
            </li>
          </ol>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Butuh File Template Siap Pakai?</span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDownloadCsvTemplate}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                Unduh Template CSV
              </button>
              <button
                type="button"
                onClick={handleCopyCsvTemplate}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 text-blue-600" />
                {copiedTemplate ? 'Tersalin ke Clipboard!' : 'Salin Contoh Teks CSV'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Netlify & Multi-Device Deployment Guide Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Panduan Publikasi Permanen di Netlify &amp; Akses Multi-Device
              </h3>
              <p className="text-xs text-slate-500">
                Pilih salah satu cara di bawah agar seluruh mahasiswa di berbagai device langsung terhubung:
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadConfigFile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            Unduh sheet-config.json
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              Metode Termudah (Tanpa Build Ulang): Gunakan Link URL Publik
            </div>
            <p className="text-slate-600 leading-relaxed">
              Cukup salin dan bagikan <strong>Link Publik</strong> di atas (yang memiliki parameter <code>?sheet=...</code>). Ketika mahasiswa membuka tautan tersebut dari browser HP atau komputer manapun, sistem otomatis mengenali Google Sheet dan menyimpannya di perangkat mereka.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              Metode Netlify Dashboard: Pasang Environment Variable
            </div>
            <p className="text-slate-600 leading-relaxed">
              Buka dashboard Netlify Anda &rarr; <strong>Site settings</strong> &rarr; <strong>Environment variables</strong> &rarr; Tambahkan variabel:
              <br />
              <code className="font-mono bg-white px-1.5 py-0.5 rounded text-emerald-800 border border-emerald-300 text-[11px] block mt-1">
                VITE_SHEET_ID = {extractGoogleSheetId(config.sheetId || testUrl)}
              </code>
              Lalu klik <strong>Trigger deploy</strong>. Domain utama tanpa parameter apapun akan langsung terhubung ke spreadsheet ini untuk selamanya!
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Column Structure */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600" />
          Format Kolom Google Sheets yang Didukung
        </h3>
        <p className="text-sm text-slate-600">
          Sistem memiliki fitur <em>Smart Auto-Mapping</em> yang fleksibel. Anda dapat menggunakan nama header Bahasa Indonesia maupun Inggris pada baris pertama spreadsheet:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-36">Nama Kolom Rekomendasi</th>
                <th className="p-3 w-32">Status Wajib</th>
                <th className="p-3">Contoh Nilai</th>
                <th className="p-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="bg-blue-50/40">
                <td className="p-3 font-mono font-bold text-blue-900">NIM</td>
                <td className="p-3 font-semibold text-rose-600">Wajib (Kunci)</td>
                <td className="p-3 font-mono">202401001</td>
                <td className="p-3">Kunci pencarian privat mahasiswa.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Nama</td>
                <td className="p-3 text-emerald-600 font-semibold">Dianjurkan</td>
                <td className="p-3">Ahmad Rizky Pratama</td>
                <td className="p-3">Nama lengkap mahasiswa.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Program Studi</td>
                <td className="p-3 text-slate-500">Opsional</td>
                <td className="p-3">S1 Pendidikan Dokter</td>
                <td className="p-3">Jurusan / Program Studi mahasiswa.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">Nama Mata Kuliah</td>
                <td className="p-3 text-emerald-600 font-semibold">Dianjurkan</td>
                <td className="p-3">Anatomi Manusia &amp; Histologi Dasar</td>
                <td className="p-3">Nama mata kuliah evaluasi UTS.</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="p-3 font-mono font-bold text-blue-900">Nilai UTS / Skor UTS</td>
                <td className="p-3 text-rose-600 font-bold">Wajib (Skor Angka)</td>
                <td className="p-3 font-mono font-bold text-blue-700">85, 92, 78.5</td>
                <td className="p-3 font-medium text-blue-950">Skor nilai angka ujian tengah semester (0 - 100).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
