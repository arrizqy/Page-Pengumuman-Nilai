import { UniversitySettings } from '../types';

export function generateWordPressHTMLSnippet(settings: UniversitySettings, sheetId: string, gid: string = '0'): string {
  const cleanId = (sheetId || '').trim();

  return `<!-- ========================================================
  PORTAL PENGUMUMAN NILAI UTS FAKULTAS KEDOKTERAN (WORDPRESS EMBED)
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
      <p class="khs-subtitle">${settings.namaUniversitas} &bull; ${settings.namaFakultas} &bull; ${settings.semesterAktif} ${settings.tahunAkademik}</p>
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
          placeholder="Masukkan NIM Anda (contoh: 202401001)" 
          autocomplete="off"
          maxlength="25"
          onkeydown="if(event.key==='Enter'){window.khsCariNilai&&window.khsCariNilai();}"
        />
        <button 
          type="button" 
          id="khs-btn-search" 
          class="khs-btn-submit"
          onclick="window.khsCariNilai&&window.khsCariNilai();"
        >
          <span id="khs-btn-text">Lihat Nilai UTS</span>
          <span id="khs-spinner" class="khs-spinner" style="display: none;"></span>
        </button>
      </div>
      <p class="khs-hint">Ketik NIM lengkap Anda lalu tekan Enter atau klik tombol di atas.</p>
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
            <div><span class="khs-meta-lbl">Program Studi:</span> <strong id="res-prodi">S1 Pendidikan Dokter</strong></div>
            <div><span class="khs-meta-lbl">Fakultas:</span> <span id="res-fakultas">Fakultas Kedokteran</span></div>
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
              <th style="text-align: center; width: 180px; background: #eff6ff;">Nilai UTS</th>
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
          <button type="button" id="khs-btn-reset" onclick="window.khsResetCari&&window.khsResetCari();" class="khs-btn-reset">&#8635; Cari NIM Lain</button>
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
.khs-alert-info {
  background: #eff6ff !important;
  border: 1px solid #bfdbfe !important;
  color: #1d4ed8 !important;
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
  ROBUST JAVASCRIPT: Dual JSONP + Fetch dengan Fallback Aman
  Kompatibel 100% dengan WordPress Gutenberg, Elementor, dsb.
  ======================================================== -->
<script>
(function() {
  var SHEET_ID = '${cleanId}';
  var SHEET_GID = '${gid || '0'}';

  // Cadangan data offline Fakultas Kedokteran jika Google Sheet belum terhubung/dibatasi
  var FALLBACK_MED_DATA = [
    ['NIM','Nama','Program Studi','Fakultas','Semester','Nama Mata Kuliah','Nilai UTS'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Anatomi Manusia & Histologi Dasar','88'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Fisiologi Kardiovaskular & Respirasi','92'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Biokimia Medis & Genetika Molekuler','78'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Farmakologi Dasar & Terapi Klinis','86'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Mikrobiologi & Imunologi Kedokteran','82'],
    ['202401001','Ahmad Rizky Pratama','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Keterampilan Klinis Dasar (Skills Lab)','90'],
    ['202401002','Siti Nur Aisyah','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Patologi Anatomi & Patofisiologi','87'],
    ['202401002','Siti Nur Aisyah','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Fisiologi Sistem Saraf & Endokrin','79'],
    ['202401002','Siti Nur Aisyah','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Parasitologi & Entomologi Medis','74'],
    ['202401002','Siti Nur Aisyah','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Komunikasi Medis & Bioetika Kedokteran','89'],
    ['202401002','Siti Nur Aisyah','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Keterampilan Klinis Dasar (Skills Lab)','91'],
    ['202401003','Budi Santoso','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Anatomi Manusia & Histologi Dasar','73'],
    ['202401003','Budi Santoso','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Fisiologi Kardiovaskular & Respirasi','66'],
    ['202401003','Budi Santoso','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Biokimia Medis & Genetika Molekuler','72'],
    ['202401004','Dewi Lestari Putri','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Ilmu Kesehatan Anak Dasar','91'],
    ['202401004','Dewi Lestari Putri','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Fisiologi Sistem Reproduksi Medis','89'],
    ['202401005','Fajar Nugraha','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Radiologi Dasar & Pencitraan Medis','80'],
    ['202401005','Fajar Nugraha','S1 Pendidikan Dokter','Fakultas Kedokteran','Semester 4','Patofisiologi Sistem Imun & Alergi','88']
  ];

  var cachedSheetRows = null;
  var isSearching = false;

  function getEl(id) {
    return document.getElementById(id);
  }

  function showAlert(msg, isError) {
    var el = getEl('khs-alert');
    if (!el) return;
    el.style.display = 'block';
    el.className = 'khs-alert ' + (isError !== false ? 'khs-alert-error' : 'khs-alert-info');
    el.innerHTML = (isError !== false ? '&#9888; ' : '&#9432; ') + msg;
  }

  function hideAlert() {
    var el = getEl('khs-alert');
    if (el) el.style.display = 'none';
  }

  function parseCSV(text) {
    var lines = text.split(/\\r?\\n/);
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      // Regex parsing handling quotes & commas
      var row = [];
      var match;
      var re = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^,]+)|(?=,))(?:,|$)/g;
      while ((match = re.exec(line)) !== null) {
        if (match.index === re.lastIndex) re.lastIndex++;
        var val = match[1] !== undefined ? match[1].replace(/\"\"/g, '"') : (match[2] !== undefined ? match[2] : '');
        row.push(val.trim());
      }
      if (row.length > 0) result.push(row);
    }
    return result;
  }

  // Metode 1: JSONP Google Visualization (Bebas dari hambatan CORS di semua browser & WordPress)
  function fetchViaJSONP(id, gid) {
    return new Promise(function(resolve, reject) {
      var cbName = 'khsGvizCb_' + Math.floor(Math.random() * 1000000);
      var timeout = setTimeout(function() {
        clean();
        reject(new Error('Koneksi Google Sheet via JSONP timeout (10 detik).'));
      }, 10000);

      function clean() {
        clearTimeout(timeout);
        delete window[cbName];
        var s = document.getElementById(cbName);
        if (s && s.parentNode) s.parentNode.removeChild(s);
      }

      window[cbName] = function(resp) {
        clean();
        try {
          if (!resp || !resp.table || !resp.table.cols || !resp.table.rows) {
            reject(new Error('Struktur data Google Sheet tidak valid.'));
            return;
          }
          var headers = resp.table.cols.map(function(c) { return (c.label || c.id || '').trim(); });
          var dataRows = [headers];
          resp.table.rows.forEach(function(r) {
            var rowVals = [];
            (r.c || []).forEach(function(cell) {
              if (!cell) {
                rowVals.push('');
              } else if (cell.f !== undefined && cell.f !== null) {
                rowVals.push(String(cell.f));
              } else if (cell.v !== undefined && cell.v !== null) {
                rowVals.push(String(cell.v));
              } else {
                rowVals.push('');
              }
            });
            dataRows.push(rowVals);
          });
          resolve(dataRows);
        } catch (e) {
          reject(e);
        }
      };

      var script = document.createElement('script');
      script.id = cbName;
      script.src = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(id) + '/gviz/tq?tqx=responseHandler:' + cbName + '&gid=' + encodeURIComponent(gid);
      script.onerror = function() {
        clean();
        reject(new Error('Gagal memuat Google Sheet via JSONP. Pastikan link Sheet telah dibagikan untuk publik (Anyone with link can view).'));
      };
      document.head.appendChild(script);
    });
  }

  // Metode 2: Direct Fetch CSV
  function fetchViaCsv(id, gid) {
    var url = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(id) + '/gviz/tq?tqx=out:csv&gid=' + encodeURIComponent(gid);
    return fetch(url).then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    }).then(function(csvText) {
      return parseCSV(csvText);
    });
  }

  // Pengambil data berjenjang (Multi-Strategy)
  function loadSheetData() {
    if (cachedSheetRows && cachedSheetRows.length > 0) {
      return Promise.resolve(cachedSheetRows);
    }

    if (!SHEET_ID || SHEET_ID.indexOf('YOUR_GOOGLE') !== -1 || SHEET_ID.length < 10) {
      // Jika Sheet ID belum diisi, gunakan data demo kedokteran
      cachedSheetRows = FALLBACK_MED_DATA;
      return Promise.resolve(FALLBACK_MED_DATA);
    }

    // Coba via JSONP dahulu (bebas CORS)
    return fetchViaJSONP(SHEET_ID, SHEET_GID)
      .then(function(rows) {
        cachedSheetRows = rows;
        return rows;
      })
      .catch(function(err1) {
        console.warn('JSONP gagal, mencoba Fetch CSV:', err1);
        return fetchViaCsv(SHEET_ID, SHEET_GID)
          .then(function(rows2) {
            cachedSheetRows = rows2;
            return rows2;
          })
          .catch(function(err2) {
            console.warn('Fetch CSV juga gagal, beralih ke cadangan offline:', err2);
            // Tetap gunakan fallback agar mahasiswa atau dosen tidak mengalami layar macet
            cachedSheetRows = FALLBACK_MED_DATA;
            showAlert('Catatan: Menampilkan data cadangan offline. Google Sheet tidak dapat diakses (Pastikan pengaturan Share diset ke "Anyone with the link can view").', false);
            return FALLBACK_MED_DATA;
          });
      });
  }

  function renderStudentData(targetNim, rows) {
    if (!rows || rows.length < 2) {
      showAlert('Format Google Sheet belum sesuai atau belum ada baris data nilai.');
      return;
    }

    var headers = rows[0].map(function(h) {
      return String(h).toLowerCase().replace(/[^a-z0-9]/g, '');
    });

    var nimCol = headers.findIndex(function(h) { return h.indexOf('nim') !== -1 || h.indexOf('nomorinduk') !== -1; });
    var namaCol = headers.findIndex(function(h) { return h.indexOf('nama') !== -1 && h.indexOf('matakuliah') === -1 && h.indexOf('matkul') === -1; });
    var prodiCol = headers.findIndex(function(h) { return h.indexOf('prodi') !== -1 || h.indexOf('programstudi') !== -1; });
    var fakultasCol = headers.findIndex(function(h) { return h.indexOf('fakultas') !== -1; });
    var smtCol = headers.findIndex(function(h) { return h.indexOf('semester') !== -1; });
    var matkulCol = headers.findIndex(function(h) { return h.indexOf('matakuliah') !== -1 || h.indexOf('matkul') !== -1 || h.indexOf('mata') !== -1; });
    
    var utsCol = headers.findIndex(function(h) { return h.indexOf('nilaiuts') !== -1 || h.indexOf('skoruts') !== -1 || h === 'uts'; });
    if (utsCol === -1) {
      utsCol = headers.findIndex(function(h) { return h.indexOf('nilaiangka') !== -1 || h.indexOf('skor') !== -1 || h.indexOf('nilai') !== -1; });
    }

    if (nimCol === -1) {
      showAlert('Kolom "NIM" tidak ditemukan pada baris pertama Google Sheet.');
      return;
    }

    var cleanTargetNim = targetNim.replace(/\\s+/g, '');
    var matchedRows = [];

    for (var i = 1; i < rows.length; i++) {
      var rowNim = String(rows[i][nimCol] || '').replace(/\\s+/g, '');
      if (rowNim === cleanTargetNim) {
        matchedRows.push(rows[i]);
      }
    }

    var resultCard = getEl('khs-result-card');

    if (matchedRows.length === 0) {
      showAlert('Skor UTS untuk NIM "' + cleanTargetNim + '" tidak ditemukan dalam basis data semester ini.');
      if (resultCard) resultCard.style.display = 'none';
      return;
    }

    hideAlert();

    var first = matchedRows[0];
    var nama = namaCol !== -1 && first[namaCol] ? first[namaCol] : 'Mahasiswa ' + cleanTargetNim;
    var prodi = prodiCol !== -1 && first[prodiCol] ? first[prodiCol] : 'S1 Pendidikan Dokter';
    var fakultas = fakultasCol !== -1 && first[fakultasCol] ? first[fakultasCol] : 'Fakultas Kedokteran';
    var semester = smtCol !== -1 && first[smtCol] ? first[smtCol] : '${settings.semesterAktif}';

    var resNama = getEl('res-nama');
    var resNim = getEl('res-nim');
    var resProdi = getEl('res-prodi');
    var resFakultas = getEl('res-fakultas');
    var resSemester = getEl('res-semester');
    var tbody = getEl('khs-tbody');

    if (resNama) resNama.textContent = nama;
    if (resNim) resNim.textContent = cleanTargetNim;
    if (resProdi) resProdi.textContent = prodi;
    if (resFakultas) resFakultas.textContent = fakultas;
    if (resSemester) resSemester.textContent = semester;

    if (tbody) {
      tbody.innerHTML = '';
      matchedRows.forEach(function(r, idx) {
        var mkNama = matkulCol !== -1 && r[matkulCol] ? r[matkulCol] : 'Mata Kuliah ' + (idx + 1);
        var mkScoreRaw = utsCol !== -1 && r[utsCol] ? String(r[utsCol]) : '0';
        var parsedScore = parseFloat(mkScoreRaw.replace(',', '.'));
        var displayScore = !isNaN(parsedScore) ? parsedScore.toFixed(1) : mkScoreRaw;

        var tr = document.createElement('tr');
        tr.innerHTML = 
          '<td style="text-align: center; color: #94a3b8;">' + (idx + 1) + '</td>' +
          '<td><strong style="color: #0f172a;">' + mkNama + '</strong></td>' +
          '<td style="text-align: center; background: #eff6ff;"><span class="score-uts-pill">' + displayScore + '</span></td>';
        tbody.appendChild(tr);
      });
    }

    if (resultCard) {
      resultCard.style.display = 'block';
      try {
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (e) {}
    }
  }

  // Global functions exposed directly to window (100% immune to WordPress event timing issues)
  window.khsCariNilai = function() {
    var input = getEl('khs-nim-input');
    if (!input) return;

    var nim = input.value.trim();
    if (!nim) {
      showAlert('Silakan ketik Nomor Induk Mahasiswa (NIM) Anda terlebih dahulu.');
      input.focus();
      return;
    }

    if (isSearching) return;
    isSearching = true;

    var btnText = getEl('khs-btn-text');
    var spinner = getEl('khs-spinner');
    if (btnText) btnText.textContent = 'Memeriksa...';
    if (spinner) spinner.style.display = 'inline-block';
    hideAlert();

    loadSheetData().then(function(rows) {
      renderStudentData(nim, rows);
    }).catch(function(err) {
      showAlert('Terjadi kendala saat membaca data: ' + (err.message || 'Periksa koneksi internet Anda.'));
    }).finally(function() {
      isSearching = false;
      if (btnText) btnText.textContent = 'Lihat Nilai UTS';
      if (spinner) spinner.style.display = 'none';
    });
  };

  window.khsResetCari = function() {
    var input = getEl('khs-nim-input');
    var resultCard = getEl('khs-result-card');
    if (input) {
      input.value = '';
      input.focus();
    }
    if (resultCard) resultCard.style.display = 'none';
    hideAlert();
  };

  // Auto attach event listeners on any available ready state
  function setupEvents() {
    var btn = getEl('khs-btn-search');
    var inp = getEl('khs-nim-input');
    var btnReset = getEl('khs-btn-reset');

    if (btn) btn.onclick = window.khsCariNilai;
    if (inp) {
      inp.onkeydown = function(e) {
        if (e.key === 'Enter') window.khsCariNilai();
      };
    }
    if (btnReset) btnReset.onclick = window.khsResetCari;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEvents);
  } else {
    setupEvents();
  }
  window.addEventListener('load', setupEvents);
})();
</script>`;
}

export function generateWordPressPhpTemplate(settings: UniversitySettings, sheetId: string): string {
  const htmlBlock = generateWordPressHTMLSnippet(settings, sheetId);
  return `<?php
/**
 * Template Name: Pengumuman Nilai UTS Fakultas Kedokteran (Google Sheets)
 * Description: Template halaman khusus skor nilai angka Ujian Tengah Semester (UTS) Fakultas Kedokteran.
 * Version: 2.2.0
 * 
 * CARA MENGGUNAKAN DI WORDPRESS:
 * 1. Simpan file ini di folder tema aktif Anda: /wp-content/themes/[tema-aktif]/page-pengumuman-uts.php
 * 2. Masuk ke WP-Admin -> Laman -> Tambah Baru.
 * 3. Beri judul "Pengumuman Nilai UTS".
 * 4. Pada panel sebelah kanan (Template Atribut Laman), pilih "Pengumuman Nilai UTS Fakultas Kedokteran (Google Sheets)".
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
      tipe: 'SKOR_ANGKA_UTS_KEDOKTERAN',
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
