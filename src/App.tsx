import React, { useState, useEffect, useCallback } from 'react';
import { 
  StudentReport, 
  GoogleSheetConfig, 
  UniversitySettings 
} from './types';
import { 
  MOCK_STUDENT_REPORTS, 
  DEFAULT_UNIVERSITY_SETTINGS 
} from './data/mockAcademicData';
import { 
  fetchGoogleSheetCsv, 
  parseCSV, 
  processSheetData 
} from './utils/googleSheets';
import { Navbar } from './components/Navbar';
import { StudentLookup } from './components/StudentLookup';
import { GradeResultCard } from './components/GradeResultCard';
import { PrintableKHS } from './components/PrintableKHS';
import { GoogleSheetConfigPanel } from './components/GoogleSheetConfigPanel';
import { WordPressExportPanel } from './components/WordPressExportPanel';
import { WordPressMockupWrapper } from './components/WordPressMockupWrapper';
import { GuideSection } from './components/GuideSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { 
  GraduationCap, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  FileCode,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'config' | 'export' | 'guide'>('portal');
  const [wpPreviewMode, setWpPreviewMode] = useState(false);
  const [settings, setSettings] = useState<UniversitySettings>(DEFAULT_UNIVERSITY_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  const [config, setConfig] = useState<GoogleSheetConfig>({
    sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    gid: '0',
    sheetName: 'Sheet1',
    mode: 'demo',
    isRealTime: true,
    autoRefreshInterval: 60,
    lastFetchedAt: 'Data Bawaan',
  });

  const [studentReports, setStudentReports] = useState<Record<string, StudentReport>>(MOCK_STUDENT_REPORTS);
  const [activeReport, setActiveReport] = useState<StudentReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Available NIMs list for lookup
  const availableNims = Object.keys(studentReports);

  // Real-time synchronization handler
  const syncWithGoogleSheet = useCallback(async (sheetIdToUse?: string) => {
    const targetId = sheetIdToUse || config.sheetId;
    if (!targetId || config.mode === 'demo') return;

    setIsLoading(true);
    try {
      const csvText = await fetchGoogleSheetCsv(targetId, config.gid || '0');
      const parsed = parseCSV(csvText);
      const reports = processSheetData(parsed, settings.kkmUts || 70);

      if (Object.keys(reports).length > 0) {
        setStudentReports(reports);
        setConfig(prev => ({
          ...prev,
          lastFetchedAt: new Date().toLocaleTimeString('id-ID'),
        }));
        setSyncToast(`Tersinkronisasi: ${Object.keys(reports).length} mahasiswa terdeteksi.`);
        setTimeout(() => setSyncToast(null), 3000);
      }
    } catch (err: unknown) {
      console.warn('Sync failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [config.sheetId, config.gid, config.mode, settings.kkmUts]);

  // Initial load or mode change
  useEffect(() => {
    if (config.mode === 'public_csv') {
      syncWithGoogleSheet();
    } else {
      setStudentReports(MOCK_STUDENT_REPORTS);
    }
  }, [config.mode, syncWithGoogleSheet]);

  // Search by NIM handler
  const handleSearch = async (nim: string): Promise<boolean> => {
    const cleaned = nim.trim().replace(/\s+/g, '');
    setIsLoading(true);
    setSearchError(null);

    // If real-time mode, ensure we have freshest data
    if (config.mode === 'public_csv') {
      try {
        const csvText = await fetchGoogleSheetCsv(config.sheetId, config.gid || '0');
        const parsed = parseCSV(csvText);
        const liveReports = processSheetData(parsed, settings.kkmUts || 70);
        if (Object.keys(liveReports).length > 0) {
          setStudentReports(liveReports);
          if (liveReports[cleaned]) {
            setActiveReport(liveReports[cleaned]);
            setIsLoading(false);
            return true;
          }
        }
      } catch {
        // Fallback to currently cached records
      }
    }

    // Check local/cached reports
    const found = studentReports[cleaned];
    setIsLoading(false);

    if (found) {
      setActiveReport(found);
      setSearchError(null);
      return true;
    } else {
      setActiveReport(null);
      setSearchError(
        `NIM "${cleaned}" tidak ditemukan dalam basis data nilai UTS semester ${settings.semesterAktif} ${settings.tahunAkademik}. Pastikan nomor induk Anda sudah tepat tanpa spasi.`
      );
      return false;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setActiveReport(null);
    setSearchError(null);
  };

  // Student Portal Core Content
  const renderPortalContent = () => (
    <div className="space-y-8">
      {/* Top Academic Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>{settings.namaUniversitas}</span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-emerald-700 font-bold">{settings.namaFakultas}</span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-blue-600 font-bold">{settings.semesterAktif} {settings.tahunAkademik}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Pengumuman Nilai Ujian Tengah Semester (UTS)
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Publikasi khusus skor nilai angka Ujian Tengah Semester (UTS) mahasiswa Fakultas Kedokteran. Masukkan NIM resmi Anda di bawah ini untuk melihat skor angka dan mencetak lembar hasil evaluasi UTS.
        </p>
      </div>

      {/* Main Student Search Component */}
      <div className="max-w-4xl mx-auto">
        <StudentLookup
          onSearch={handleSearch}
          isLoading={isLoading}
          searchError={searchError}
          onClear={handleReset}
          currentReport={activeReport}
          availableNims={availableNims}
        />
      </div>

      {/* Result Card when a student is looked up */}
      {activeReport && (
        <div className="max-w-4xl mx-auto transition-all animate-fadeIn" id="hasil-nilai-section">
          <GradeResultCard
            report={activeReport}
            settings={settings}
            onReset={handleReset}
            onPrint={handlePrint}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Printable KHS for physical printer/PDF */}
      {activeReport && (
        <PrintableKHS report={activeReport} settings={settings} />
      )}

      {/* Header Navigation */}
      <div className="no-print">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          wpPreviewMode={wpPreviewMode}
          setWpPreviewMode={setWpPreviewMode}
          isRealTime={config.mode === 'public_csv'}
          studentFound={!!activeReport}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminLogin={() => setIsAdminModalOpen(true)}
          onAdminLogout={() => {
            setIsAdminLoggedIn(false);
            setActiveTab('portal');
            setWpPreviewMode(false);
          }}
        />
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setActiveTab('config');
          setSyncToast('Berhasil masuk sebagai Admin Pengelola.');
          setTimeout(() => setSyncToast(null), 3000);
        }}
      />

      {/* Sync Status Toast */}
      {syncToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-bounce border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        
        {/* Quick Mode Status Bar - HANYA DITAMPILKAN UNTUK ADMIN */}
        {isAdminLoggedIn && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Basis Data:
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                {config.mode === 'public_csv' ? `Google Sheet (${config.sheetId.slice(0, 10)}...)` : 'Data Kedokteran (Demo)'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Diperbarui: {config.lastFetchedAt}
              </span>
              {config.mode === 'public_csv' && (
                <button
                  onClick={() => syncWithGoogleSheet()}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                  Segarkan Data
                </button>
              )}
              <button
                onClick={() => setActiveTab('export')}
                className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md font-semibold border border-emerald-200 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                Salin Kode WordPress
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Portal Mahasiswa (Default & Satu-satunya yang terlihat oleh mahasiswa) */}
        {activeTab === 'portal' && (
          <>
            {wpPreviewMode && isAdminLoggedIn ? (
              <WordPressMockupWrapper onClose={() => setWpPreviewMode(false)}>
                {renderPortalContent()}
              </WordPressMockupWrapper>
            ) : (
              renderPortalContent()
            )}
          </>
        )}

        {/* Tab 2: Konfigurasi Basis Data Google Sheet (HANYA ADMIN) */}
        {isAdminLoggedIn && activeTab === 'config' && (
          <GoogleSheetConfigPanel
            config={config}
            setConfig={setConfig}
            settings={settings}
            setSettings={setSettings}
            onSyncSuccess={(count) => {
              setSyncToast(`Berhasil menyinkronkan ${count} data mahasiswa dari Google Sheet!`);
              setTimeout(() => setSyncToast(null), 3000);
            }}
          />
        )}

        {/* Tab 3: Ekspor Kode WordPress (HANYA ADMIN) */}
        {isAdminLoggedIn && activeTab === 'export' && (
          <WordPressExportPanel
            settings={settings}
            setSettings={setSettings}
            sheetId={config.sheetId}
            onSheetIdChange={(newId) => {
              setConfig(prev => ({ ...prev, sheetId: newId, mode: newId ? 'public_csv' : 'demo' }));
            }}
          />
        )}

        {/* Tab 4: Panduan & Bantuan (HANYA ADMIN) */}
        {isAdminLoggedIn && activeTab === 'guide' && (
          <GuideSection />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-slate-200">
              PENGUMUMAN NILAI
            </span>
            <span className="text-slate-600">&bull;</span>
            <span>{settings.namaUniversitas}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-emerald-400 font-semibold">{settings.namaFakultas}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Privasi Mahasiswa Dijamin</span>
            <span>Skor Angka UTS Murni</span>
            {!isAdminLoggedIn ? (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Akses Staf Pengelola"
              >
                <Lock className="w-3 h-3" />
                Login Admin
              </button>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sesi Admin Aktif
              </span>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
}
