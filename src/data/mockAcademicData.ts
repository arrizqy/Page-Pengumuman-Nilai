import { StudentReport, UniversitySettings } from '../types';

export const DEFAULT_UNIVERSITY_SETTINGS: UniversitySettings = {
  namaUniversitas: 'UNIVERSITAS DIPONEGORO',
  namaFakultas: 'FAKULTAS KEDOKTERAN',
  namaSistem: 'Portal Pengumuman Nilai UTS Fakultas Kedokteran',
  tahunAkademik: '2026/2027',
  semesterAktif: 'Semester Ganjil',
  kontakBantuan: '',
  emailBantuan: '',
  kkmUts: 70,
};

export const MOCK_STUDENT_REPORTS: Record<string, StudentReport> = {
  '202401001': {
    student: {
      nim: '202401001',
      nama: 'Ahmad Rizky Pratama',
      programStudi: 'S1 Pendidikan Dokter',
      fakultas: 'Fakultas Kedokteran',
      semester: 'Semester 4',
      tahunAkademik: '2024/2025 (Ganjil)',
      dosenPA: 'dr. Hendra Saputra, Sp.PD, K-GEH',
      statusAkademik: 'AKTIF',
    },
    courses: [
      { kode: 'FK201', nama: 'Anatomi Manusia & Histologi Dasar', nilaiUts: 88, statusUts: 'TUNTAS' },
      { kode: 'FK202', nama: 'Fisiologi Kardiovaskular & Respirasi', nilaiUts: 92, statusUts: 'TUNTAS' },
      { kode: 'FK203', nama: 'Biokimia Medis & Genetika Molekuler', nilaiUts: 78, statusUts: 'TUNTAS' },
      { kode: 'FK204', nama: 'Farmakologi Dasar & Terapi Klinis', nilaiUts: 86, statusUts: 'TUNTAS' },
      { kode: 'FK205', nama: 'Mikrobiologi & Imunologi Kedokteran', nilaiUts: 82, statusUts: 'TUNTAS' },
      { kode: 'FK206', nama: 'Keterampilan Klinis Dasar (Skills Lab)', nilaiUts: 90, statusUts: 'TUNTAS' },
    ],
    totalMatkul: 6,
    rataRataUts: 86.0,
    nilaiTertinggi: 92,
    nilaiTerendah: 78,
    statusKelulusanUts: 'SANGAT BAIK',
    catatanAkademik: '',
    tanggalTerbit: '11 Oktober 2024',
  },
  '202401002': {
    student: {
      nim: '202401002',
      nama: 'Siti Nur Aisyah',
      programStudi: 'S1 Pendidikan Dokter',
      fakultas: 'Fakultas Kedokteran',
      semester: 'Semester 4',
      tahunAkademik: '2024/2025 (Ganjil)',
      dosenPA: 'dr. Nurul Hidayati, Sp.A, M.Kes',
      statusAkademik: 'AKTIF',
    },
    courses: [
      { kode: 'FK201', nama: 'Patologi Anatomi & Patofisiologi', nilaiUts: 87, statusUts: 'TUNTAS' },
      { kode: 'FK202', nama: 'Fisiologi Sistem Saraf & Endokrin', nilaiUts: 79, statusUts: 'TUNTAS' },
      { kode: 'FK203', nama: 'Parasitologi & Entomologi Medis', nilaiUts: 74, statusUts: 'TUNTAS' },
      { kode: 'FK204', nama: 'Komunikasi Medis & Bioetika Kedokteran', nilaiUts: 89, statusUts: 'TUNTAS' },
      { kode: 'FK205', nama: 'Keterampilan Klinis Dasar (Skills Lab)', nilaiUts: 91, statusUts: 'TUNTAS' },
    ],
    totalMatkul: 5,
    rataRataUts: 84.0,
    nilaiTertinggi: 91,
    nilaiTerendah: 74,
    statusKelulusanUts: 'TUNTAS SELURUHNYA',
    catatanAkademik: '',
    tanggalTerbit: '11 Oktober 2024',
  },
  '202401003': {
    student: {
      nim: '202401003',
      nama: 'Budi Santoso',
      programStudi: 'S1 Pendidikan Dokter',
      fakultas: 'Fakultas Kedokteran',
      semester: 'Semester 4',
      tahunAkademik: '2024/2025 (Ganjil)',
      dosenPA: 'dr. Hendra Saputra, Sp.PD, K-GEH',
      statusAkademik: 'AKTIF',
    },
    courses: [
      { kode: 'FK201', nama: 'Anatomi Manusia & Histologi Dasar', nilaiUts: 73, statusUts: 'TUNTAS' },
      { kode: 'FK202', nama: 'Fisiologi Kardiovaskular & Respirasi', nilaiUts: 66, statusUts: 'BELUM TUNTAS' },
      { kode: 'FK203', nama: 'Biokimia Medis & Genetika Molekuler', nilaiUts: 72, statusUts: 'TUNTAS' },
      { kode: 'FK204', nama: 'Farmakologi Dasar & Terapi Klinis', nilaiUts: 62, statusUts: 'BELUM TUNTAS' },
      { kode: 'FK205', nama: 'Mikrobiologi & Imunologi Kedokteran', nilaiUts: 48, statusUts: 'BELUM TUNTAS' },
      { kode: 'FK206', nama: 'Keterampilan Klinis Dasar (Skills Lab)', nilaiUts: 71, statusUts: 'TUNTAS' },
    ],
    totalMatkul: 6,
    rataRataUts: 65.33,
    nilaiTertinggi: 73,
    nilaiTerendah: 48,
    statusKelulusanUts: 'PERLU PERBAIKAN / SUSULAN',
    catatanAkademik: '',
    tanggalTerbit: '11 Oktober 2024',
  },
  '202401004': {
    student: {
      nim: '202401004',
      nama: 'Dewi Lestari Putri',
      programStudi: 'S1 Pendidikan Dokter',
      fakultas: 'Fakultas Kedokteran',
      semester: 'Semester 4',
      tahunAkademik: '2024/2025 (Ganjil)',
      dosenPA: 'Prof. dr. Bambang Supeno, Sp.B, Sp.BA',
      statusAkademik: 'AKTIF',
    },
    courses: [
      { kode: 'FK201', nama: 'Ilmu Kesehatan Anak Dasar', nilaiUts: 91, statusUts: 'TUNTAS' },
      { kode: 'FK202', nama: 'Fisiologi Sistem Reproduksi Medis', nilaiUts: 89, statusUts: 'TUNTAS' },
      { kode: 'FK203', nama: 'Kedokteran Komunitas & Epidemiologi', nilaiUts: 94, statusUts: 'TUNTAS' },
      { kode: 'FK204', nama: 'Keterampilan Bedah Minor & Asepsis', nilaiUts: 85, statusUts: 'TUNTAS' },
    ],
    totalMatkul: 4,
    rataRataUts: 89.75,
    nilaiTertinggi: 94,
    nilaiTerendah: 85,
    statusKelulusanUts: 'SANGAT BAIK',
    catatanAkademik: '',
    tanggalTerbit: '11 Oktober 2024',
  },
  '202401005': {
    student: {
      nim: '202401005',
      nama: 'Fajar Nugraha',
      programStudi: 'S1 Pendidikan Dokter',
      fakultas: 'Fakultas Kedokteran',
      semester: 'Semester 4',
      tahunAkademik: '2024/2025 (Ganjil)',
      dosenPA: 'dr. Maya Anggraini, Sp.Rad',
      statusAkademik: 'AKTIF',
    },
    courses: [
      { kode: 'FK201', nama: 'Radiologi Dasar & Pencitraan Medis', nilaiUts: 80, statusUts: 'TUNTAS' },
      { kode: 'FK202', nama: 'Patofisiologi Sistem Imun & Alergi', nilaiUts: 88, statusUts: 'TUNTAS' },
      { kode: 'FK203', nama: 'Metodologi Penelitian Kedokteran', nilaiUts: 86, statusUts: 'TUNTAS' },
      { kode: 'FK204', nama: 'Kegawatdaruratan Medis Dasar', nilaiUts: 81, statusUts: 'TUNTAS' },
    ],
    totalMatkul: 4,
    rataRataUts: 83.75,
    nilaiTertinggi: 88,
    nilaiTerendah: 80,
    statusKelulusanUts: 'TUNTAS SELURUHNYA',
    catatanAkademik: '',
    tanggalTerbit: '11 Oktober 2024',
  },
};

export const SAMPLE_GOOGLE_SHEET_CSV = `NIM,Nama,Program Studi,Fakultas,Semester,Tahun Akademik,Nama Mata Kuliah,Nilai UTS
202401001,Ahmad Rizky Pratama,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Anatomi Manusia & Histologi Dasar,88
202401001,Ahmad Rizky Pratama,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Fisiologi Kardiovaskular & Respirasi,92
202401001,Ahmad Rizky Pratama,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Biokimia Medis & Genetika Molekuler,78
202401001,Ahmad Rizky Pratama,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Farmakologi Dasar & Terapi Klinis,86
202401002,Siti Nur Aisyah,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Patologi Anatomi & Patofisiologi,87
202401002,Siti Nur Aisyah,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Fisiologi Sistem Saraf & Endokrin,79
202401002,Siti Nur Aisyah,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Parasitologi & Entomologi Medis,74
202401003,Budi Santoso,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Anatomi Manusia & Histologi Dasar,73
202401003,Budi Santoso,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Fisiologi Kardiovaskular & Respirasi,66
202401003,Budi Santoso,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Biokimia Medis & Genetika Molekuler,72
202401004,Dewi Lestari Putri,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Ilmu Kesehatan Anak Dasar,91
202401004,Dewi Lestari Putri,S1 Pendidikan Dokter,Fakultas Kedokteran,Semester 4,2024/2025 (Ganjil),Fisiologi Sistem Reproduksi Medis,89`;

export const FAQ_ITEMS = [];
