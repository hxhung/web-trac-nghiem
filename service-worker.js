/**
 * SERVICE WORKER — Trắc nghiệm Toán THPT
 * Phiên bản: 1.0
 *
 * CHECKLIST KHI THÊM ĐỀ MỚI:
 * 1. Thêm đường dẫn HTML vào STATIC_HTML bên dưới
 * 2. Thêm đường dẫn ảnh vào STATIC_IMAGES bên dưới
 * 3. ĐỔI SỐ VERSION: CACHE_NAME = 'toan-thpt-v2' (v2, v3, ...)
 * 4. Commit & push lên GitHub
 * → User tự động nhận bản mới lần mở app tiếp theo
 */

// =====================================================
// CẤU HÌNH VERSION — ĐỔI SỐ NÀY toan-thpt-vx KHI THÊM ĐỀ MỚI
// =====================================================
const CACHE_NAME = 'toan-thpt-v5';
const BASE = '/web-trac-nghiem';

// =====================================================
// NHÓM A — PRE-CACHE: Tải sẵn khi cài app
// =====================================================

// Các trang HTML
const STATIC_HTML = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/statistics.html`,
  `${BASE}/hdsd.html`,
  `${BASE}/lienhe.html`,
  `${BASE}/sitemap.html`,
  `${BASE}/404.html`,
  `${BASE}/privacy-policy.html`,
  // --- Đề K12 gốc (đã di chuyển) ---
  `${BASE}/K12/de-01.html`,
  `${BASE}/K12/de-02.html`,
  `${BASE}/K12/de-03.html`,
  `${BASE}/K12/de-04.html`,
  `${BASE}/K12/de-05.html`,
  `${BASE}/K12/de-06.html`,
  `${BASE}/K12/de-07.html`,
  `${BASE}/K12/de-08.html`,
  `${BASE}/K12/de-10.html`,
  // --- Đề K12 subfolder ---
  `${BASE}/K12/K12.C3.B2.LT_tichphan.html`,
  `${BASE}/K12/k12.tn1.html`,
  `${BASE}/K12/on_giua_hk2_de_1.html`,
  `${BASE}/K12/on_giua_hk2_de_2.html`,
  `${BASE}/K12/k12.tn2.html`,
  // --- Đề K11 subfolder ---
  `${BASE}/K11/k11.c6.b5.1.html`,
    `${BASE}/K12/k12.tn3.html`,
  // THÊM ĐỀ MỚI TẠI ĐÂY:
  // `${BASE}/de-11.html`,
  // `${BASE}/K12/ten_de_moi.html`,
];

// File JS/CSS nội bộ
const STATIC_ASSETS = [
  `${BASE}/js/storage.js`,
  `${BASE}/manifest.json`,
  `${BASE}/data/exams.json`,  // ← THÊM DÒNG NÀY
];

// Ảnh câu hỏi — K12/pic/ cũ di chuyển (36 file)
const STATIC_IMAGES_ROOT = [
  `${BASE}/K12/pic/De-01-Cau-1.png`,
  `${BASE}/K12/pic/De-05-Cau-1.png`,
  `${BASE}/K12/pic/De-05-Cau-11.png`,
  `${BASE}/K12/pic/De-05-Cau-2.png`,
  `${BASE}/K12/pic/De-05-Cau-7.png`,
  `${BASE}/K12/pic/De-05-Cau-8.png`,
  `${BASE}/K12/pic/De-05-Cau-9.png`,
  `${BASE}/K12/pic/De-05-Cau-II.1.png`,
  `${BASE}/K12/pic/De-05-Cau-II.2.png`,
  `${BASE}/K12/pic/De-05-Cau-II.4.a.png`,
  `${BASE}/K12/pic/De-05-Cau-II.4.png`,
  `${BASE}/K12/pic/De-05-Cau-III.1.png`,
  `${BASE}/K12/pic/De-05-Cau-III.2.png`,
  `${BASE}/K12/pic/De-05-Cau-III.5.png`,
  `${BASE}/K12/pic/De-05-Cau-III.6.png`,
  `${BASE}/K12/pic/De-06-Cau-02.png`,
  `${BASE}/K12/pic/De-06-Cau-07.png`,
  `${BASE}/K12/pic/De-06-Cau-11.png`,
  `${BASE}/K12/pic/De-06-Cau-II.02.png`,
  `${BASE}/K12/pic/De-06-Cau-III.05.png`,
  `${BASE}/K12/pic/De-06-Cau-III.06.png`,
  `${BASE}/K12/pic/De-07-Cau-01.png`,
  `${BASE}/K12/pic/De-07-Cau-02.png`,
  `${BASE}/K12/pic/De-07-Cau-08.png`,
  `${BASE}/K12/pic/De-07-Cau-11.png`,
  `${BASE}/K12/pic/De-07-Cau-12.png`,
  `${BASE}/K12/pic/De-07-Cau-III.2.png`,
  `${BASE}/K12/pic/De-07-Cau-III.3.png`,
  `${BASE}/K12/pic/De-08-Cau-03.png`,
  `${BASE}/K12/pic/De-08-Cau-04.png`,
  `${BASE}/K12/pic/De-08-Cau-09.png`,
  `${BASE}/K12/pic/De-08-Cau-12.png`,
  `${BASE}/K12/pic/De-08-Cau-II.3.png`,
  `${BASE}/K12/pic/De-08-Cau-II.4.png`,
  `${BASE}/K12/pic/De-08-Cau-III.1.png`,
  `${BASE}/K12/pic/De-08-Cau-III.3.png`,
  // THÊM ẢNH MỚI TẠI ĐÂY:
  // `${BASE}/pic/De-11-Cau-1.png`,
];

// Ảnh câu hỏi — K12/pic/ (13 file)
const STATIC_IMAGES_K12 = [
  `${BASE}/K12/pic/K12.C3.B2.LT_tichphan_C21.png`,
  `${BASE}/K12/pic/K12.C3.B2.LT_tichphan_C40.png`,
  `${BASE}/K12/pic/de-12-gk2_cau_15.png`,
  `${BASE}/K12/pic/de-12-gk2_cau_20.png`,
  `${BASE}/K12/pic/de-12-gk2_cau_21.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau03.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau09.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau11.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau14.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau18.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau20.png`,
  `${BASE}/K12/pic/k12.tn1.7.9.2_cau21.png`,
  `${BASE}/K12/pic/on_giua_hk2_de_1_cau_18.png`,
  // --- Ảnh Đề 0101 (k12.tn2) ---
  `${BASE}/K12/pic/de-0101_cau_7.png`,
  `${BASE}/K12/pic/de-0101_cau_10.png`,
  `${BASE}/K12/pic/de-0101_cau_17.png`,
  `${BASE}/K12/pic/de-0101_cau_18.png`,
  `${BASE}/K12/pic/de-0101_cau_19.png`,
  `${BASE}/K12/pic/de-0101_cau_20.png`,
  `${BASE}/K12/pic/k12.tn3.cau01.png`,
  `${BASE}/K12/pic/k12.tn3.cau02.png`,
  `${BASE}/K12/pic/k12.tn3.cau11.png`,
  `${BASE}/K12/pic/k12.tn3.cau17.png`,
  `${BASE}/K12/pic/k12.tn3.cau22.png`,
];

// Ảnh K11/pic/ — chưa có, thêm sau
const STATIC_IMAGES_K11 = [
  // THÊM ẢNH K11 TẠI ĐÂY KHI CÓ:
  // `${BASE}/K11/pic/ten_anh.png`,
];

// Ảnh K10/pic/ — chưa có, thêm sau
const STATIC_IMAGES_K10 = [
  // THÊM ẢNH K10 TẠI ĐÂY KHI CÓ:
];

// Gộp tất cả vào 1 mảng để pre-cache
const ALL_STATIC = [
  ...STATIC_HTML,
  ...STATIC_ASSETS,
  ...STATIC_IMAGES_ROOT,
  ...STATIC_IMAGES_K12,
  ...STATIC_IMAGES_K11,
  ...STATIC_IMAGES_K10,
];

// =====================================================
// NHÓM C — KHÔNG CACHE (luôn cần mạng)
// =====================================================
const NETWORK_ONLY_PATTERNS = [
  'script.google.com',      // Google Apps Script API
  'sheets.googleapis.com',  // Google Sheets API
  'counterapi.dev',         // Visit counter
  'thi-truc-tuyen',         // Repo con - luôn cần mạng
];

// =====================================================
// CÀI ĐẶT: Pre-cache toàn bộ NHÓM A
// =====================================================
self.addEventListener('install', (event) => {
  console.log(`[SW] Cài đặt phiên bản: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(`[SW] Đang cache ${ALL_STATIC.length} file...`);
        // Dùng addAll với xử lý lỗi từng file
        // Tránh trường hợp 1 file lỗi làm hỏng toàn bộ
        return Promise.allSettled(
          ALL_STATIC.map(url =>
            cache.add(url).catch(err => {
              console.warn(`[SW] Không cache được: ${url}`, err);
            })
          )
        );
      })
      .then(() => {
        console.log('[SW] Pre-cache hoàn tất');
        return self.skipWaiting(); // Kích hoạt SW mới ngay lập tức
      })
  );
});

// =====================================================
// KÍCH HOẠT: Xóa cache cũ
// =====================================================
self.addEventListener('activate', (event) => {
  console.log(`[SW] Kích hoạt: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log(`[SW] Xóa cache cũ: ${name}`);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim()) // Kiểm soát tab ngay lập tức
  );
});

// =====================================================
// XỬ LÝ REQUEST
// =====================================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NHÓM C: Không intercept — để browser tự xử lý
  const isNetworkOnly = NETWORK_ONLY_PATTERNS.some(
    pattern => url.href.includes(pattern)
  );
  if (isNetworkOnly) return;

  // Chỉ xử lý GET request
  if (event.request.method !== 'GET') return;

  // CDN (Bootstrap, FontAwesome, MathJax):
  // Cache khi truy cập lần đầu (NHÓM B)
  const isCDN = !url.hostname.includes('github.io');

  if (isCDN) {
    // Chiến lược: Cache First cho CDN
    // → Lần đầu: tải về và cache
    // → Lần sau: dùng cache, nhanh hơn
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          if (cached) return cached;
          return fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, clone));
              }
              return response;
            })
            .catch(() => {
              console.warn('[SW] CDN không truy cập được (offline):', url.href);
            });
        })
    );
    return;
  }

  // Nội dung nội bộ GitHub Pages (NHÓM A):
  // Chiến lược: Network First
  // → Ưu tiên mạng để có nội dung mới nhất
  // → Fallback cache khi mất mạng
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Mất mạng: lấy từ cache
        return caches.match(event.request)
          .then(cached => {
            if (cached) return cached;
            // Fallback: về trang chủ nếu không tìm thấy
            if (event.request.mode === 'navigate') {
              return caches.match(`${BASE}/index.html`);
            }
          });
      })
  );
});