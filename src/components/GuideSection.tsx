import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  Lightbulb,
  Lock,
  Workflow
} from 'lucide-react';

export const GuideSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Panduan Lengkap &amp; Tutorial Integrasi
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Semua yang perlu Anda ketahui untuk menghubungkan Google Sheets, memasang ke website WordPress, dan menjaga kerahasiaan nilai mahasiswa.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Workflow Steps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-600" />
          Alur Kerja Sistem (Workflow Arsitektur)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base">Dosen / Admin Mengisi Google Sheet</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Staf akademik menginput nilai mahasiswa ke spreadsheet Google Sheets biasa. Kolom kunci utamanya adalah <strong>NIM</strong> dan <strong>Nilai Huruf</strong>.
            </p>
            <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
              &bull; Update nilai kapan saja tanpa ubah website
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">Portal Mengambil Data Real-Time</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Ketika mahasiswa mengetik NIM pada halaman WordPress, skrip secara otomatis meminta data terbaru langsung dari Google Sheets via GViz CSV atau Apps Script.
            </p>
            <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block">
              &bull; Tanpa server database SQL terpisah
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Penyaringan Privat &amp; Tampilan KHS</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Hanya baris mata kuliah yang cocok dengan NIM mahasiswa yang dikomputasi (IPK, SKS, Predikat) dan ditampilkan. Mahasiswa lain tidak bisa melihat data rekannya.
            </p>
            <div className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 inline-block">
              &bull; Cetak KHS digital dalam 1 klik
            </div>
          </div>

        </div>
      </div>

      {/* Security & Privacy Guide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          Tingkat Keamanan &amp; Perlindungan Privasi Mahasiswa
        </h3>
        
        <p className="text-sm text-slate-600">
          Sesuai ketentuan UU Perlindungan Data Pribadi (PDP) dan kode etik akademik, privasi hasil evaluasi mahasiswa sangat diutamakan:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Metode 1: Google Sheets CSV Publik
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Kelebihan:</strong> Paling mudah dipasang (100% tanpa setup server atau API key). Cocok untuk pengumuman nilai kelas, ujian masuk, kelulusan, atau seminar.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>Catatan:</strong> Meskipun UI hanya menampilkan nilai pemilik NIM, file CSV dapat diakses jika seseorang memeriksa network inspection browser.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Metode 2: Google Apps Script Proxy (Keamanan Tertinggi)
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Kelebihan:</strong> Tingkat privasi maksimal. Google Sheet tetap berstatus <em>Privat</em> (hanya admin yang punya akses).
            </p>
            <p className="text-slate-600 leading-relaxed">
              Skrip Apps Script berfungsi sebagai penyaring server-side: hanya mengembalikan data spesifik NIM yang diminta, sehingga data mahasiswa lain mustahil diintip di tab network!
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting Q&A */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          Penyelesaian Masalah Umum (Troubleshooting)
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">
              1. Mengapa muncul pesan &quot;Gagal menghubungkan ke Google Sheet&quot;?
            </h5>
            <p className="text-slate-600 mt-1 text-xs leading-relaxed">
              Periksa kembali pengaturan izin berbagi (Share) pada Google Sheets Anda. Pastikan telah diubah menjadi <strong>&quot;Siapa saja yang memiliki link dapat melihat&quot; (Anyone with the link can view)</strong>. Jika dibatasi (Restricted), browser mahasiswa tidak diizinkan membaca file.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">
              2. Mengapa nilai mahasiswa tidak muncul padahal NIM sudah dimasukkan?
            </h5>
            <p className="text-slate-600 mt-1 text-xs leading-relaxed">
              Pastikan baris pertama spreadsheet memiliki kolom dengan judul <strong>NIM</strong>. Periksa juga apakah ada spasi tersembunyi pada sel spreadsheet atau pada input mahasiswa. Sistem telah otomatis membersihkan spasi awal dan akhir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">
              3. Apakah tampilan ini responsif di HP (smartphone)?
            </h5>
            <p className="text-slate-600 mt-1 text-xs leading-relaxed">
              Ya, 100% responsif mobile-friendly. Tabel dilengkapi fitur <em>horizontal scroll container</em> yang halus sehingga tidak akan merusak layout layar smartphone mahasiswa berukuran kecil.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
