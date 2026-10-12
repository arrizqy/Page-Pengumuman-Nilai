import { StudentReport, CourseGrade, StudentInfo } from '../types';

/**
 * Standard CSV parser handling quotes, commas within cells, and newlines
 */
export function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let insideQuote = false;
  let entry = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        entry += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      row.push(entry.trim());
      entry = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(entry.trim());
      if (row.some(val => val.length > 0)) {
        result.push(row);
      }
      row = [];
      entry = '';
    } else {
      entry += char;
    }
  }

  if (entry.length > 0 || row.length > 0) {
    row.push(entry.trim());
    if (row.some(val => val.length > 0)) {
      result.push(row);
    }
  }

  return result;
}

/**
 * Helper to normalize string for fuzzy column match
 */
function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Convert parsed CSV rows into structured UTS student records map
 */
export function processSheetData(rows: string[][], kkmUts: number = 70): Record<string, StudentReport> {
  if (rows.length < 2) return {};

  const headers = rows[0].map(h => normalizeHeader(h));

  // Find column indices
  const nimIdx = headers.findIndex(h => h.includes('nim') || h.includes('nomorinduk') || h.includes('studentid'));
  const namaIdx = headers.findIndex(h => h.includes('nama') || h.includes('mahasiswa') || h.includes('studentname'));
  const prodiIdx = headers.findIndex(h => h.includes('prodi') || h.includes('programstudi') || h.includes('jurusan'));
  const fakultasIdx = headers.findIndex(h => h.includes('fakultas') || h.includes('dept'));
  const semesterIdx = headers.findIndex(h => h.includes('semester') || h.includes('smt'));
  const thnAkademikIdx = headers.findIndex(h => h.includes('tahun') || h.includes('akademik') || h.includes('thnakad'));
  const kodeMatkulIdx = headers.findIndex(h => h.includes('kodematkul') || h.includes('kode') || h.includes('kdmatkul'));
  const matkulIdx = headers.findIndex(h => h.includes('matakuliah') || h.includes('matkul') || h.includes('course') || h.includes('nama'));
  const sksIdx = headers.findIndex(h => h.includes('sks') || h.includes('kredit') || h.includes('credit'));
  
  // Specific UTS column search: prioritizing "nilaiuts", "skoruts", "uts", then generic "skor" or "nilai"
  let utsIdx = headers.findIndex(h => h.includes('nilaiuts') || h.includes('skoruts') || h === 'uts');
  if (utsIdx === -1) {
    utsIdx = headers.findIndex(h => h.includes('nilaiangka') || h.includes('skor') || h.includes('nilai') || h.includes('score'));
  }

  const catatanIdx = headers.findIndex(h => h.includes('catatan') || h.includes('keterangan') || h.includes('pesan') || h.includes('remark'));

  if (nimIdx === -1) {
    console.warn('Kolom NIM tidak ditemukan dalam Google Sheet');
    return {};
  }

  const studentGroups: Record<string, { info: StudentInfo; courses: CourseGrade[]; remarks: string[] }> = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rawNim = (row[nimIdx] || '').trim();
    if (!rawNim) continue;

    const nim = rawNim.replace(/\s+/g, '');
    const nama = namaIdx !== -1 && row[namaIdx] ? row[namaIdx].trim() : 'Mahasiswa ' + nim;
    const prodi = prodiIdx !== -1 && row[prodiIdx] ? row[prodiIdx].trim() : 'S1 Pendidikan Dokter';
    const fakultas = fakultasIdx !== -1 && row[fakultasIdx] ? row[fakultasIdx].trim() : 'Fakultas Kedokteran';
    const semester = semesterIdx !== -1 && row[semesterIdx] ? row[semesterIdx].trim() : 'Semester Aktif';
    const tahunAkademik = thnAkademikIdx !== -1 && row[thnAkademikIdx] ? row[thnAkademikIdx].trim() : '2024/2025';

    if (!studentGroups[nim]) {
      studentGroups[nim] = {
        info: {
          nim,
          nama,
          programStudi: prodi,
          fakultas,
          semester,
          tahunAkademik,
          statusAkademik: 'AKTIF',
        },
        courses: [],
        remarks: [],
      };
    } else {
      if (nama && studentGroups[nim].info.nama.startsWith('Mahasiswa')) {
        studentGroups[nim].info.nama = nama;
      }
    }

    // Extract course & UTS numerical score
    const matkul = matkulIdx !== -1 && row[matkulIdx] ? row[matkulIdx].trim() : '';
    if (matkul) {
      const kode = kodeMatkulIdx !== -1 && row[kodeMatkulIdx] ? row[kodeMatkulIdx].trim() : 'MK' + (studentGroups[nim].courses.length + 1).toString().padStart(2, '0');
      const sks = sksIdx !== -1 && !isNaN(parseFloat(row[sksIdx])) ? parseFloat(row[sksIdx]) : 3;
      
      // Parse numerical score strictly
      let scoreRaw = 0;
      if (utsIdx !== -1 && row[utsIdx]) {
        // replace comma with dot for Indonesian decimal notation e.g. "85,5" -> "85.5"
        const cleanScore = row[utsIdx].trim().replace(',', '.');
        const parsed = parseFloat(cleanScore);
        if (!isNaN(parsed)) {
          scoreRaw = parsed;
        }
      }

      const statusUts: CourseGrade['statusUts'] = scoreRaw >= kkmUts ? 'TUNTAS' : 'BELUM TUNTAS';
      const kategori = scoreRaw >= 85 ? 'Sangat Baik' : scoreRaw >= 70 ? 'Baik' : scoreRaw >= 60 ? 'Cukup' : 'Perlu Remedial';
      const catatan = catatanIdx !== -1 && row[catatanIdx] ? row[catatanIdx].trim() : '';

      if (catatan) {
        studentGroups[nim].remarks.push(catatan);
      }

      studentGroups[nim].courses.push({
        kode,
        nama: matkul,
        sks,
        nilaiUts: scoreRaw,
        kategori,
        statusUts,
        keterangan: catatan || (statusUts === 'TUNTAS' ? 'Tuntas di atas KKM' : 'Perlu Ujian Remedial / Susulan UTS'),
      });
    }
  }

  // Compile final student reports
  const result: Record<string, StudentReport> = {};

  for (const nim in studentGroups) {
    const group = studentGroups[nim];
    const courses = group.courses;

    let totalScore = 0;
    let maxScore = 0;
    let minScore = courses.length > 0 ? 100 : 0;

    courses.forEach(c => {
      totalScore += c.nilaiUts;
      if (c.nilaiUts > maxScore) maxScore = c.nilaiUts;
      if (c.nilaiUts < minScore) minScore = c.nilaiUts;
    });

    const totalMatkul = courses.length;
    const rataRataUts = totalMatkul > 0 ? parseFloat((totalScore / totalMatkul).toFixed(2)) : 0;

    let statusKelulusanUts: StudentReport['statusKelulusanUts'] = 'TUNTAS SELURUHNYA';
    if (courses.some(c => c.statusUts === 'BELUM TUNTAS')) {
      statusKelulusanUts = 'PERLU PERBAIKAN / SUSULAN';
    } else if (rataRataUts >= 85) {
      statusKelulusanUts = 'SANGAT BAIK';
    }

    const defaultNote = statusKelulusanUts === 'PERLU PERBAIKAN / SUSULAN'
      ? `Terdapat skor UTS di bawah standar ketuntasan minimal (KKM: ${kkmUts}). Segera konfirmasi kepada dosen pengampu mata kuliah terkait program perbaikan nilai UTS.`
      : rataRataUts >= 85
      ? 'Hasil Ujian Tengah Semester (UTS) sangat memuaskan. Pertahankan konsistensi belajar Anda!'
      : 'Seluruh skor UTS telah mencapai standar minimal. Tetap tingkatkan performa untuk persiapan UAS.';

    result[nim] = {
      student: group.info,
      courses,
      totalMatkul,
      rataRataUts,
      nilaiTertinggi: maxScore,
      nilaiTerendah: minScore,
      statusKelulusanUts,
      catatanAkademik: group.remarks.length > 0 ? group.remarks.join(' | ') : defaultNote,
      tanggalTerbit: new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date()),
    };
  }

  return result;
}

/**
 * Builds Google Sheets CSV URL from Sheet ID or full link
 */
export function extractGoogleSheetId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed.includes('/') && trimmed.length > 15) {
    return trimmed;
  }
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

export function buildPublicCsvUrl(sheetId: string, gid: string = '0'): string {
  const cleanId = extractGoogleSheetId(sheetId);
  return `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&gid=${gid}`;
}

/**
 * Real-time fetcher with fallback proxies
 */
export async function fetchGoogleSheetCsv(sheetId: string, gid: string = '0'): Promise<string> {
  const cleanId = extractGoogleSheetId(sheetId);
  const primaryUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&gid=${gid}`;
  
  // Direct fetch
  try {
    const res = await fetch(primaryUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch {
    // Continue to fallbacks
  }

  // Fallback 1: Google Visualization API (GViz)
  const gvizUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv&gid=${gid}`;
  try {
    const res = await fetch(gvizUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch {
    // Continue to proxy
  }

  // Fallback 2: AllOrigins proxy
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(primaryUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch {
    throw new Error('Gagal mengambil data dari Google Sheet. Pastikan Sheet diatur ke "Siapa saja yang memiliki link dapat melihat".');
  }

  throw new Error('Tidak dapat terhubung ke Google Sheet. Periksa kembali Google Sheet ID Anda.');
}
