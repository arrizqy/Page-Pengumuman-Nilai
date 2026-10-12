export interface CourseGrade {
  kode: string;
  nama: string;
  sks?: number;
  nilaiUts: number; // Skor angka UTS saja (0 - 100)
  kategori?: string; // e.g. "Sangat Baik (A)", "Baik (B)", dll.
  statusUts: 'TUNTAS' | 'BELUM TUNTAS' | 'IKUT SUSULAN';
  keterangan?: string;
}

export interface StudentInfo {
  nim: string;
  nama: string;
  programStudi: string;
  fakultas: string;
  semester: string;
  tahunAkademik: string;
  dosenPA?: string;
  statusAkademik: 'AKTIF' | 'CUTI' | 'TERTUNDA';
}

export interface StudentReport {
  student: StudentInfo;
  courses: CourseGrade[];
  totalMatkul: number;
  rataRataUts: number; // Rata-rata skor angka UTS
  nilaiTertinggi: number;
  nilaiTerendah: number;
  statusKelulusanUts: 'TUNTAS SELURUHNYA' | 'PERLU PERBAIKAN / SUSULAN' | 'SANGAT BAIK';
  catatanAkademik: string;
  tanggalTerbit: string;
}

export interface GoogleSheetConfig {
  sheetId: string;
  gid: string;
  sheetName: string;
  mode: 'demo' | 'public_csv' | 'apps_script';
  appsScriptUrl?: string;
  isRealTime: boolean;
  autoRefreshInterval: number;
  lastFetchedAt?: string;
}

export interface UniversitySettings {
  namaUniversitas: string;
  namaFakultas: string;
  namaSistem: string;
  tahunAkademik: string;
  semesterAktif: string;
  kontakBantuan: string;
  emailBantuan: string;
  kkmUts: number; // Batas minimal nilai tuntas UTS, default 70
  logoUrl?: string;
}
