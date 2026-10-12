import React from 'react';
import { StudentReport, UniversitySettings } from '../types';
import { QrCode } from 'lucide-react';

interface PrintableKHSProps {
  report: StudentReport;
  settings: UniversitySettings;
}

export const PrintableKHS: React.FC<PrintableKHSProps> = ({ report, settings }) => {
  const { student, courses, tanggalTerbit } = report;

  return (
    <div className="hidden print:block bg-white p-8 max-w-4xl mx-auto text-black print-only">
      {/* Kop Surat Universitas */}
      <div className="border-b-4 border-double border-black pb-4 mb-6 text-center">
        <h1 className="text-xl font-extrabold uppercase tracking-wide">
          {settings.namaUniversitas}
        </h1>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-800">
          {settings.namaFakultas}
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          PANITIA PELAKSANA UJIAN TENGAH SEMESTER (UTS) &bull; Kontak: {settings.kontakBantuan} &bull; Email: {settings.emailBantuan}
        </p>
      </div>

      {/* Judul Dokumen */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold uppercase underline tracking-wider">
          LEMBAR HASIL UJIAN TENGAH SEMESTER (UTS)
        </h3>
        <p className="text-xs text-slate-600 mt-0.5">
          Tahun Akademik {settings.tahunAkademik} - {settings.semesterAktif}
        </p>
      </div>

      {/* Identitas Mahasiswa */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-6 border border-slate-300 p-4 rounded bg-slate-50/50">
        <div className="space-y-1">
          <div><span className="font-semibold w-32 inline-block">Nomor Induk (NIM):</span> <span className="font-mono font-bold">{student.nim}</span></div>
          <div><span className="font-semibold w-32 inline-block">Nama Lengkap:</span> <span className="font-bold">{student.nama}</span></div>
          <div><span className="font-semibold w-32 inline-block">Program Studi:</span> {student.programStudi}</div>
        </div>
        <div className="space-y-1">
          <div><span className="font-semibold w-32 inline-block">Fakultas:</span> {student.fakultas}</div>
          <div><span className="font-semibold w-32 inline-block">Semester:</span> {student.semester}</div>
          <div><span className="font-semibold w-32 inline-block">Dosen PA:</span> {student.dosenPA || '-'}</div>
        </div>
      </div>

      {/* Tabel Nilai Angka UTS Murni */}
      <table className="w-full text-xs border-collapse border border-slate-400 mb-6">
        <thead>
          <tr className="bg-slate-200 text-center font-bold">
            <th className="border border-slate-400 p-2 w-12">No</th>
            <th className="border border-slate-400 p-2 text-left">Nama Mata Kuliah</th>
            <th className="border border-slate-400 p-2 w-36 bg-slate-300 font-extrabold">Skor Nilai UTS</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i} className="text-center">
              <td className="border border-slate-400 p-2">{i + 1}</td>
              <td className="border border-slate-400 p-2 text-left font-medium">{c.nama}</td>
              <td className="border border-slate-400 p-2 font-mono font-bold text-sm bg-slate-50">{c.nilaiUts.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tanda Tangan & QR Code */}
      <div className="grid grid-cols-2 gap-8 text-xs pt-4 mt-8">
        <div className="border border-slate-300 p-3 rounded flex items-center gap-3">
          <div className="w-16 h-16 border-2 border-slate-800 flex items-center justify-center p-1 bg-white">
            <QrCode className="w-12 h-12 text-slate-900" />
          </div>
          <div>
            <span className="font-bold block text-[11px]">Validasi Digital Panitia UTS</span>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Dokumen ini sah memuat skor ujian tengah semester (UTS) resmi. Kode Verifikasi: UTS-{student.nim}-{new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-600">Kota Kampus, {tanggalTerbit}</p>
          <p className="font-semibold mt-1">Ketua Panitia Ujian Tengah Semester (UTS)</p>
          <div className="h-16 flex items-center justify-center text-slate-400 italic text-[11px]">
            [Ditandatangani Secara Elektronik]
          </div>
          <p className="font-bold underline text-xs">Dr. H. Mulyono, M.Pd., M.Kom.</p>
          <p className="text-[10px] text-slate-500">NIP. 19780512 200312 1 002</p>
        </div>
      </div>
    </div>
  );
};
