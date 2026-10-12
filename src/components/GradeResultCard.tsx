import React from 'react';
import { 
  RotateCcw, 
  BookOpen, 
  UserCheck, 
  Calendar, 
  GraduationCap, 
  FileText,
  Clock
} from 'lucide-react';
import { StudentReport, UniversitySettings } from '../types';

interface GradeResultCardProps {
  report: StudentReport;
  settings: UniversitySettings;
  onReset: () => void;
  onPrint?: () => void;
}

export const GradeResultCard: React.FC<GradeResultCardProps> = ({
  report,
  onReset,
}) => {
  const { student, courses, tanggalTerbit } = report;

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden transition-all print-card">
      
      {/* Student Banner Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              Ujian Tengah Semester (UTS) &bull; Rilis: {tanggalTerbit}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {student.nama}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-mono mt-0.5">
              NIM: <span className="font-bold text-sky-300">{student.nim}</span>
            </p>
          </div>

          {/* Academic Meta Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" />
              <span><strong>Program Studi:</strong> {student.programStudi}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
              <span><strong>Fakultas:</strong> {student.fakultas}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
              <span><strong>Semester:</strong> {student.semester}</span>
            </div>
            {student.dosenPA && (
              <div className="flex items-center gap-1.5 sm:col-span-2">
                <UserCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Dosen PA:</strong> {student.dosenPA}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses Grade Table: Strictly Numerical UTS Score Only */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Daftar Skor Nilai Angka UTS
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border">
            {courses.length} Mata Kuliah
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                <th className="py-3 px-4 w-16 text-center">No</th>
                <th className="py-3 px-4">Nama Mata Kuliah</th>
                <th className="py-3 px-4 text-center w-48 bg-blue-50/70 border-l border-blue-100 text-blue-900 font-extrabold">
                  Nilai UTS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-center text-xs font-medium text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {course.nama}
                  </td>
                  
                  {/* Strict Numerical UTS Score Cell */}
                  <td className="py-3.5 px-4 text-center bg-blue-50/30 border-l border-blue-100">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg font-mono font-bold text-base bg-blue-50 text-blue-800 border border-blue-200 shadow-xs">
                      {course.nilaiUts.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Dokumen Skor UTS Digital</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Cari NIM Lain
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
