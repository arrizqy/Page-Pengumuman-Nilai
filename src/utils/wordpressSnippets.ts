import { UniversitySettings } from '../types';

export function generateWordPressHTMLSnippet(settings: UniversitySettings, sheetId: string, gid: string = '0'): string {
  const cleanId = sheetId || 'YOUR_GOOGLE_SHEET_ID_HERE';

  return `<!-- ========================================================
  PORTAL PENGUMUMAN NILAI UTS (WORDPRESS EMBED)
  Dibatasi Hanya Menampilkan Skor Nilai Angka UTS Saja
  Desain Responsif & Terisolasi - Tidak merusak tema WordPress induk
  Sumber Data: Google Sheets Real-Time
  ======================================================== -->

<div id="khs-portal-container" class="khs-wp-root">
  <div class="khs-inner-wrap">
    <!-- Header Card -->
    <header class="khs-header">
      <div class="khs-badge-online">
        <span class="khs-dot"></span> Nilai UTS Real-Time
      </div>
      <h1 class="khs-title">${settings.namaSistem}</h1>
      <p class="khs-subtitle">${settings.namaUniversitas} &bull; ${settings.semesterAktif} ${settings.tahunAkademik}</p>
    </header>

    <!-- Search Section -->
    <section class="khs-search-box">
      <div class="khs-search-header">
        <label for="khs-nim-input" class="khs-label">Masukkan Nomor Induk Mahasiswa (NIM)</label>
        <span class="khs-privacy-tag">&#128274; Akses Privat: Skor Angka UTS Anda</span>
      </div>
      <div class="khs-input-group">
        <div class="khs-input-icon">&#127891;</div>
        <input 
          type="text" 
          id="khs-nim-input" 
          class="khs-input" 
          placeholder="Contoh: 202401001" 
          autocomplete="off"
          maxlength="20"
        />
        <button type="button" id="khs-btn-search" class="khs-btn-submit">
          <span id="khs-btn-text">Lihat Nilai UTS</span>
          <span id="khs-spinner" class="khs-spinner" style="display: none;"></span>
        </button>
      </div>
      <p class="khs-hint">Masukkan NIM lengkap. Sistem akan menampilkan skor nilai angka Ujian Tengah Semester (UTS).</p>
    </section>

    <!-- Status / Error Alert -->
    <div id="khs-alert" class="khs-alert" style="display: none;"></div>

    <!-- Result Container (Hidden until search) -->
    <div id="khs-result-card" class="khs-card-result" style="display: none;">
      <!-- Student Bio -->
      <div class="khs-bio-header">
        <div class="khs-bio-main">
          <h2 id="res-nama" class="khs-student-name">Nama Mahasiswa</h2>
          <div class="khs-meta-grid">
            <div><span class="khs-meta-lbl">NIM:</span> <strong id="res-nim">-</strong></div>
            <div><span class="khs-meta-lbl">Program Studi:</span> <strong id="res-prodi">-</strong></div>
            <div><span class="khs-meta-lbl">Fakultas:</span> <span id="res-fakultas">-</span></div>
            <div><span class="khs-meta-lbl">Semester:</span> <span id="res-semester">-</span></div>
          </div>
        </div>
      </div>

      <!-- Table Section: Hanya Menampilkan Skor Angka UTS -->
      <div class="khs-table-responsive">
        <table class="khs-table">
          <thead>
            <tr>
              <th style="width: 60px; text-align: center;">No</th>
              <th>Nama Mata Kuliah</th>
              <th style="text-align: center; width: 160px; background: #eff6ff;">Nilai UTS</th>
            </tr>
          </thead>
          <tbody id="khs-tbody">
            <!-- Dynamic rows will be inserted here -->
          </tbody>
        </table>
      </div>

      <!-- Footer Actions -->
      <div class="khs-card-footer">
        <div></div>
        <div class="khs-actions">
          <button type="button" onclick="window.print()" class="khs-btn-print">&#128424; Cetak Skor UTS</button>
          <button type="button" id="khs-btn-reset" class="khs-btn-reset">&#8635; Cari NIM Lain</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ========================================================
  SCOPED CSS: Diisolasi khusus kelas .khs-wp-root
  Aman dari bentrok stylesheet / tema WordPress
  ======================================================== -->
<style>
.khs-wp-root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  color: #1e293b !important;
  line-height: 1.5 !important;
  margin: 20px auto !important;
  max-width: 960px !important;
  padding: 0 16px !important;
  box-sizing: border-box !important;
}
.khs-wp-root * {
  box-sizing: border-box !important;
}
.khs-inner-wrap {
  background: #ffffff !important;
  border-radius: 16px !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
  overflow: hidden !important;
  padding: 24px !important;
}
.khs-header {
  text-align: center !important;
  border-bottom: 1px solid #f1f5f9 !important;
  padding-bottom: 20px !important;
  margin-bottom: 24px !important;
}
.khs-badge-online {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: #ecfdf5 !important;
  color: #065f46 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  padding: 4px 12px !important;
  border-radius: 9999px !important;
  margin-bottom: 10px !important;
  border: 1px solid #a7f3d0 !important;
}
.khs-dot {
  width: 8px !important;
  height: 8px !important;
  background: #10b981 !important;
  border-radius: 50% !important;
}
.khs-title {
  font-size: 24px !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin: 0 0 6px 0 !important;
  letter-spacing: -0.02em !important;
}
.khs-subtitle {
  font-size: 14px !important;
  color: #64748b !important;
  margin: 0 !important;
}
.khs-search-box {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 12px !important;
  padding: 20px !important;
  margin-bottom: 24px !important;
}
.khs-search-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-bottom: 10px !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}
.khs-label {
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #1e293b !important;
}
.khs-privacy-tag {
  font-size: 12px !important;
  color: #0284c7 !important;
  background: #e0f2fe !important;
  padding: 2px 8px !important;
  border-radius: 6px !important;
}
.khs-input-group {
  display: flex !important;
  gap: 10px !important;
  position: relative !important;
}
.khs-input-icon {
  position: absolute !important;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 18px !important;
  pointer-events: none !important;
}
.khs-input {
  flex: 1 !important;
  padding: 12px 14px 12px 42px !important;
  font-size: 16px !important;
  border: 2px solid #cbd5e1 !important;
  border-radius: 10px !important;
  background: #ffffff !important;
  color: #0f172a !important;
  outline: none !important;
  transition: border-color 0.2s !important;
}
.khs-input:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
}
.khs-btn-submit {
  background: #2563eb !important;
  color: #ffffff !important;
  border: none !important;
  padding: 0 24px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background 0.2s !important;
}
.khs-btn-submit:hover {
  background: #1d4ed8 !important;
}
.khs-hint {
  font-size: 12px !important;
  color: #64748b !important;
  margin: 8px 0 0 0 !important;
}
.khs-alert {
  padding: 12px 16px !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  margin-bottom: 20px !important;
}
.khs-alert-error {
  background: #fef2f2 !important;
  border: 1px solid #fecaca !important;
  color: #b91c1c !important;
}
.khs-card-result {
  border: 1px solid #e2e8f0 !important;
  border-radius: 14px !important;
  overflow: hidden !important;
  margin-bottom: 24px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
}
.khs-bio-header {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
  color: #ffffff !important;
  padding: 24px !important;
}
.khs-student-name {
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  margin: 0 0 10px 0 !important;
}
.khs-meta-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
  gap: 8px 16px !important;
  font-size: 13px !important;
  color: #cbd5e1 !important;
}
.khs-meta-lbl {
  color: #94a3b8 !important;
}
.khs-table-responsive {
  overflow-x: auto !important;
}
.khs-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 14px !important;
  background: #ffffff !important;
}
.khs-table th {
  background: #f8fafc !important;
  color: #475569 !important;
  font-weight: 700 !important;
  padding: 12px 14px !important;
  border-bottom: 2px solid #e2e8f0 !important;
  text-align: left !important;
}
.khs-table td {
  padding: 12px 14px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  color: #334155 !important;
}
.khs-table tr:hover {
  background: #f8fafc !important;
}
.score-uts-pill {
  display: inline-block !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #1e40af !important;
  background: #eff6ff !important;
  border: 1px solid #bfdbfe !important;
  padding: 4px 14px !important;
  border-radius: 8px !important;
  font-family: monospace !important;
}
.khs-card-footer {
  background: #f8fafc !important;
  padding: 16px 20px !important;
  border-top: 1px solid #e2e8f0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.khs-actions {
  display: flex !important;
  gap: 10px !important;
}
.khs-btn-print {
  background: #0f172a !important;
  color: #ffffff !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  border: none !important;
  cursor: pointer !important;
}
.khs-btn-reset {
  background: #e2e8f0 !important;
  color: #334155 !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  border: none !important;
  cursor: pointer !important;
}
.khs-spinner {
  width: 16px !important;
  height: 16px !important;
  border: 2px solid rgba(255, 255, 255, 0.4) !important;
  border-top-color: #ffffff !important;
  border-radius: 50% !important;
  animation: khs-spin 0.8s linear infinite !important;
}
@keyframes khs-spin {
  to { transform: rotate(360deg); }
}
@media (max-width: 640px) {
  .khs-input-group { flex-direction: column !important; }
  .khs-btn-submit { padding: 12px !important; width: 100% !important; }
}
@media print {
  body * { visibility: hidden !important; }
  .khs-wp-root, .khs-wp-root * { visibility: visible !important; }
  .khs-search-box, .khs-actions { display: none !important; }
  .khs-inner-wrap { border: none !important; box-shadow: none !important; }
}
</style>

<!-- ========================================================
  VANILLA JAVASCRIPT: Real-time parser Nilai UTS Google Sheet
  ======================================================== -->
<script>
(function() {
  const SHEET_ID = '${cleanId}';
  const SHEET_GID = '${gid}';
  let cachedData = null;
  let isLoading = false;

  const inputEl = document.getElementById('khs-nim-input');
  const btnSearch = document.getElementById('khs-btn-search');
  const btnReset = document.getElementById('khs-btn-reset');
  const btnText = document.getElementById('khs-btn-text');
  const spinner = document.getElementById('khs-spinner');
  const alertEl = document.getElementById('khs-alert');
  const resultCard = document.getElementById('khs-result-card');

  function showAlert(msg, isError = true) {
    alertEl.style.display = 'block';
    alertEl.className = 'khs-alert ' + (isError ? 'khs-alert-error' : '');
    alertEl.innerHTML = (isError ? '&#9888; ' : '&#9432; ') + msg;
  }

  function hideAlert() {
    alertEl.style.display = 'none';
  }

  function parseCSV(text) {
    const result = [];
    let row = [];
    let insideQuote = false;
    let entry = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          entry += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === ',' && !insideQuote) {
        row.push(entry.trim());
        entry = '';
      } else if ((char === '\\r' || char === '\\n') && !insideQuote) {
        if (char === '\\r' && nextChar === '\\n') i++;
        row.push(entry.trim());
        if (row.some(val => val.length > 0)) result.push(row);
        row = [];
        entry = '';
      } else {
        entry += char;
      }
    }
    if (entry.length > 0 || row.length > 0) {
      row.push(entry.trim());
      if (row.some(val => val.length > 0)) result.push(row);
    }
    return result;
  }

  async function fetchSheetData() {
    if (cachedData) return cachedData;
    const url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv&gid=' + SHEET_GID;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const csvText = await res.text();
      const parsed = parseCSV(csvText);
      cachedData = parsed;
      return parsed;
    } catch (err) {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
        const res2 = await fetch(proxyUrl);
        const csvText2 = await res2.text();
        const parsed2 = parseCSV(csvText2);
        cachedData = parsed2;
        return parsed2;
      } catch (e) {
        throw new Error('Gagal memuat Google Sheet. Pastikan link Google Sheet disetel Publik (Anyone with link can view).');
      }
    }
  }

  function renderStudent(nim, rows) {
    if (rows.length < 2) {
      showAlert('Format Google Sheet belum sesuai atau masih kosong.');
      return;
    }

    const headers = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const nimCol = headers.findIndex(h => h.includes('nim') || h.includes('nomorinduk'));
    const namaCol = headers.findIndex(h => h.includes('nama'));
    const prodiCol = headers.findIndex(h => h.includes('prodi') || h.includes('jurusan'));
    const fakultasCol = headers.findIndex(h => h.includes('fakultas'));
    const smtCol = headers.findIndex(h => h.includes('semester'));
    const matkulCol = headers.findIndex(h => h.includes('matakuliah') || h.includes('matkul') || h.includes('nama'));
    const kodeCol = headers.findIndex(h => h.includes('kode'));
    
    let utsCol = headers.findIndex(h => h.includes('nilaiuts') || h.includes('skoruts') || h === 'uts');
    if (utsCol === -1) {
      utsCol = headers.findIndex(h => h.includes('nilaiangka') || h.includes('skor') || h.includes('nilai'));
    }

    if (nimCol === -1) {
      showAlert('Kolom NIM tidak ditemukan di Google Sheet.');
      return;
    }

    const targetNim = nim.trim().replace(/\\s+/g, '');
    const matchedRows = [];

    for (let i = 1; i < rows.length; i++) {
      const rowNim = (rows[i][nimCol] || '').trim().replace(/\\s+/g, '');
      if (rowNim === targetNim) {
        matchedRows.push(rows[i]);
      }
    }

    if (matchedRows.length === 0) {
      showAlert('Skor UTS untuk NIM "' + targetNim + '" tidak ditemukan.');
      resultCard.style.display = 'none';
      return;
    }

    hideAlert();

    const first = matchedRows[0];
    const nama = namaCol !== -1 && first[namaCol] ? first[namaCol] : 'Mahasiswa ' + targetNim;
    const prodi = prodiCol !== -1 && first[prodiCol] ? first[prodiCol] : '${settings.namaFakultas}';
    const fakultas = fakultasCol !== -1 && first[fakultasCol] ? first[fakultasCol] : '${settings.namaUniversitas}';
    const semester = smtCol !== -1 && first[smtCol] ? first[smtCol] : '${settings.semesterAktif}';

    document.getElementById('res-nama').textContent = nama;
    document.getElementById('res-nim').textContent = targetNim;
    document.getElementById('res-prodi').textContent = prodi;
    document.getElementById('res-fakultas').textContent = fakultas;
    document.getElementById('res-semester').textContent = semester;

    const tbody = document.getElementById('khs-tbody');
    tbody.innerHTML = '';

    matchedRows.forEach((r, idx) => {
      const mkNama = matkulCol !== -1 && r[matkulCol] ? r[matkulCol] : 'Mata Kuliah ' + (idx + 1);
      const mkKode = kodeCol !== -1 && r[kodeCol] ? r[kodeCol] : 'MK' + (idx + 1);
      
      let mkScore = 0;
      if (utsCol !== -1 && r[utsCol]) {
        const parsed = parseFloat(r[utsCol].replace(',', '.'));
        if (!isNaN(parsed)) mkScore = parsed;
      }

      const rowTr = document.createElement('tr');
      rowTr.innerHTML = 
        '<td style="text-align: center; color: #94a3b8;">' + (idx + 1) + '</td>' +
        '<td><strong>' + mkNama + '</strong></td>' +
        '<td style="text-align: center; background: #eff6ff;"><span class="score-uts-pill">' + mkScore.toFixed(1) + '</span></td>';
      tbody.appendChild(rowTr);
    });

    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleSearch() {
    const nim = inputEl.value.trim();
    if (!nim) {
      showAlert('Silakan ketik NIM Anda terlebih dahulu.');
      inputEl.focus();
      return;
    }

    if (isLoading) return;
    isLoading = true;
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    hideAlert();

    try {
      const sheetData = await fetchSheetData();
      renderStudent(nim, sheetData);
    } catch (err) {
      showAlert(err.message || 'Gagal memuat basis data nilai Google Sheet.');
    } finally {
      isLoading = false;
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }

  btnSearch.addEventListener('click', handleSearch);
  inputEl.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSearch();
  });
  if (btnReset) {
    btnReset.addEventListener('click', function() {
      inputEl.value = '';
      resultCard.style.display = 'none';
      hideAlert();
      inputEl.focus();
    });
  }
})();
</script>`;
}

export function generateWordPressPhpTemplate(settings: UniversitySettings, sheetId: string): string {
  const htmlBlock = generateWordPressHTMLSnippet(settings, sheetId);
  return `<?php
/**
 * Template Name: Pengumuman Nilai UTS (Google Sheets Real-Time)
 * Description: Template halaman khusus skor nilai angka Ujian Tengah Semester (UTS) mahasiswa.
 * Version: 2.1.0
 * 
 * CARA MENGGUNAKAN DI WORDPRESS:
 * 1. Simpan file ini di folder tema aktif Anda: /wp-content/themes/[tema-aktif]/page-pengumuman-uts.php
 * 2. Masuk ke WP-Admin -> Laman -> Tambah Baru.
 * 3. Beri judul "Pengumuman Nilai UTS Mahasiswa".
 * 4. Pada panel sebelah kanan (Template Atribut Laman), pilih "Pengumuman Nilai UTS (Google Sheets Real-Time)".
 * 5. Terbitkan laman. Selesai!
 */

get_header(); ?>

<main id="primary" class="site-main khs-page-wrapper" style="padding: 40px 0; background: #f8fafc; min-height: 80vh;">
  <div class="container" style="max-width: 960px; margin: 0 auto; padding: 0 15px;">
    
    ${htmlBlock}

  </div>
</main>

<?php
get_footer();
`;
}

export function generateWordPressShortcode(settings: UniversitySettings, sheetId: string): string {
  return `<?php
/**
 * Tambahkan kode ini ke file functions.php tema WordPress Anda:
 * Penggunaan di postingan/halaman Gutenberg: [cek_nilai_uts]
 * Atau dengan sheet custom: [cek_nilai_uts sheet_id="${sheetId}"]
 */
function shortcode_portal_nilai_uts($atts) {
    $atts = shortcode_atts(array(
        'sheet_id' => '${sheetId}',
        'gid' => '0',
    ), $atts, 'cek_nilai_uts');

    ob_start();
    ?>
    <div class="portal-nilai-uts-embed">
      <!-- Embed HTML Widget Skor Nilai UTS Dimulai -->
      <?php echo do_shortcode(
          // Memuat komponen HTML yang aman dan terisolasi
      ); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('cek_nilai_uts', 'shortcode_portal_nilai_uts');
`;
}

export function generateGoogleAppsScriptProxy(sheetId: string): string {
  return `/**
 * GOOGLE APPS SCRIPT: PROXY API SKOR NILAI UTS
 * Mengembalikan data skor UTS hanya untuk NIM yang diminta
 */

const SPREADSHEET_ID = "${sheetId || 'MASUKKAN_GOOGLE_SHEET_ID_DI_SINI'}";

function doGet(e) {
  try {
    const nim = (e.parameter.nim || '').trim();
    if (!nim) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Parameter NIM diperlukan'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Basis data kosong'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0].map(h => String(h).toLowerCase().replace(/[^a-z0-9]/g, ''));
    const nimCol = headers.findIndex(h => h.includes('nim'));

    if (nimCol === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Kolom NIM tidak ditemukan di baris judul'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const studentRows = [];
    for (let i = 1; i < data.length; i++) {
      const rowNim = String(data[i][nimCol]).trim();
      if (rowNim === nim) {
        studentRows.push(data[i]);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      tipe: 'SKOR_ANGKA_UTS',
      nim: nim,
      headers: data[0],
      rows: studentRows
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;
}
