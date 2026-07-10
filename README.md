# 📐 Web Trắc Nghiệm Toán THPT
> **Phiên bản:** v2.4.1 (JSON-driven + PWA + Android TWA)  
> **Cập nhật:** 21/03/2026  
> **Tác giả:** hxhung  
> **Demo:** [hxhung.github.io/web-trac-nghiem](https://hxhung.github.io/web-trac-nghiem/)  

---

## ✨ 1. TÍNH NĂNG NỔI BẬT

* **Làm bài trực tuyến**: Giao diện thân thiện, hỗ trợ đầy đủ 3 dạng câu hỏi chuẩn thi THPT của Bộ GD&ĐT (GDPT 2018).
* **Quản lý đề thi bằng JSON (v2.3)**: Tải đề động thông qua tệp [exams.json](data/exams.json) — thêm đề mới không cần can thiệp code HTML.
* **PWA & Android TWA (v2.4)**: Cài đặt trực tiếp lên màn hình điện thoại dưới dạng ứng dụng ngoại tuyến, tích hợp gói Android APK [Trac-nghiem-Toan-THPT.apk](Trac-nghiem-Toan-THPT.apk).
* **Đệm dữ liệu Offline**: Service Worker tự động cache toàn bộ tài nguyên đề thi và hình ảnh ngay trong lần đầu truy cập.
* **Biểu đồ thống kê cá nhân**: Dashboard [statistics.html](statistics.html) theo dõi điểm TB, điểm cao nhất và phổ điểm 10 bài làm gần nhất sử dụng **Chart.js**.
* **Đồng bộ chéo Domain**: Gộp kết quả ôn tập tự do và điểm thi trực tuyến có giám sát thông qua cơ chế `bridge.html` (postMessage cross-origin).
* **Công thức Toán chuẩn đẹp**: Sử dụng **MathJax 3** để dịch ký hiệu LaTeX thành công thức Toán học sắc nét trên mọi thiết bị.

---

## 📂 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
web-trac-nghiem/
│
├── index.html                        # Trang chủ ôn luyện (chuyển đổi tab 10/11/12)
├── manifest.json                     # Cấu hình PWA (icon, màu sắc, shortcuts)
├── service-worker.js                 # Service Worker quản lý offline caching
├── privacy-policy.html               # Chính sách bảo mật (bắt buộc cho Play Store)
├── Trac-nghiem-Toan-THPT.apk         # Ứng dụng Android đóng gói cài đặt trực tiếp
│
├── .well-known/
│   └── assetlinks.json               # File xác thực liên kết tên miền với Android App
│
├── _config.yml                       # Cấu hình Jekyll trên GitHub Pages
│
├── data/
│   └── exams.json                    # Nguồn dữ liệu danh mục đề thi tập trung
│
├── icons/
│   ├── web/                          # Icon PWA các kích thước
│   └── android/                      # Bộ icon cho app Android
│
├── de-01.html → de-10.html           # Đề thi Khối 12 (Series cũ)
│
├── K11/                              # Đề thi Khối 11
│   └── k11.c6.b5.1.html
│
├── K12/                              # Đề thi Khối 12 (Series mới)
│   ├── K12.C3.B2.LT_tichphan.html
│   └── k12.tn1.html
│
├── k12/                              # Đề thi ôn tập HK2
│   └── on_giua_hk2_de_1.html
│
├── statistics.html                   # Dashboard phân tích và thống kê điểm số
├── hdsd.html                         # Hướng dẫn sử dụng hệ thống
├── lienhe.html                       # Thông tin liên hệ và góp ý
├── sitemap.html & sitemap.xml        # Sơ đồ trang web phục vụ SEO
├── bridge.html                       # Cầu nối nhận lịch sử điểm từ thi-truc-tuyen
├── test-cross-origin.html            # Trang kiểm thử kết nối liên kết domain
│
└── pic/                              # Kho ảnh minh họa đồ thị môn Toán
```

---

## 📚 3. DANH SÁCH ĐỀ THI HIỆN CÓ

### 🟢 Khối 12
| Group | Đề thi | Nội dung | Số câu | Tên file đề |
| :--- | :--- | :--- | :---: | :--- |
| `grade12-chapter1` | Đề 01 | Ứng dụng đạo hàm — Khảo sát hàm số | 22 | `de-07.html` |
| `grade12-chapter2` | Đề 02 | Vectơ và toạ độ trong không gian | 22 | `de-02.html` |
| `grade12-chapter3` | Đề 03 | Mức độ phân tán số liệu | 22 | `de-03.html` |
| `grade12-chapter4` | Luyện tập | Nguyên hàm và ứng dụng | 22 | `de-10.html` |
| `grade12-chapter4` | Luyện tập | Tích phân | 40 | `K12/K12.C3.B2.LT_tichphan.html` |
| `grade12-reviewhk1` | Đề 04 → 08 | Ôn tập tổng hợp Học Kỳ 1 | 22 | `de-04.html` → `de-08.html` |
| `grade12-reviewgiuahk2` | Đề 1 | Ôn tập Giữa Học Kỳ 2 | 22 | `K12/on_giua_hk2_de_1.html` |
| `grade12-reviewgiuahk2` | Đề 2 | Ôn tập Giữa Học Kỳ 2 | 22 | `K12/on_giua_hk2_de_2.html` |
| `grade12-chapter7` | Đề thi thử 1 | Ôn tập cuối năm & Đề thi thử | 22 | `K12/k12.tn1.html` |

### 🟡 Khối 11
| Group | Đề thi | Nội dung | Số câu | Tên file đề |
| :--- | :--- | :--- | :---: | :--- |
| `grade11-chapter6` | Đề ôn chương 1 | Hàm số mũ và Lôgarit | 22 | `K11/k11.c6.b5.1.html` |

> [!WARNING]
> Khối 10 và phần lớn chương học Khối 11 đang trong quá trình cập nhật nội dung.

---

## 🆕 4. KIẾN TRÚC QUẢN LÝ ĐỀ THI ĐỘNG (JSON-Driven)

Toàn bộ danh sách đề thi được quản lý tập trung tại [data/exams.json](data/exams.json). 

```text
[Trình duyệt tải index.html]
    └── loadExamsFromJSON()
           ├── fetch('data/exams.json')
           ├── Nhóm đề thi theo khóa "group"
           └── Render thẻ card ra màn hình
                  └── updateAccordionCounts() (Cập nhật số đề)
```

### So sánh kiến trúc cũ và mới:

| Tiêu chí | Bản v2.2 (HTML tĩnh) | Bản v2.3+ (JSON động) |
| :--- | :--- | :--- |
| **Thêm đề mới** | Chèn thủ công ~15 dòng HTML vào [index.html](index.html) | Thêm 1 đối tượng JSON vào [exams.json](data/exams.json) |
| **Độ dài index.html** | ~2000 dòng | ~1420 dòng (Giảm 29% dòng code) |
| **Nguy cơ lỗi DOM** | Cao (vỡ cấu trúc thẻ `div` accordion) | Không có nguy cơ |
| **Số câu hỏi linh hoạt**| Bị cố định 22 câu | Hỗ trợ hiển thị số câu tùy chọn qua thuộc tính `questions` |

---

## ➕ 5. QUY TRÌNH THÊM ĐỀ THI MỚI

### Bước 1: Tạo tệp đề thi HTML
Sử dụng **System Prompt v8.1** để AI tự động đóng gói đề thi HTML chuẩn công thức MathJax và cấu trúc 3 phần. Lưu file vào đúng thư mục khối (VD: `K12/de-moi.html`).

### Bước 2: Thêm định nghĩa vào `data/exams.json`
Thêm bản ghi vào tệp JSON theo định dạng sau:
```json
{
  "group": "grade12-chapter1",
  "title": "ĐỀ SỐ 02",
  "subject": "Cực trị hàm số",
  "href": "K12/de-moi.html",
  "icon": "📘",
  "iconBg": "#eff6ff",
  "iconColor": "#2563eb",
  "titleColor": "text-primary",
  "date": "2026-03-12",
  "questions": 22
}
```
*   `"date"`: Nếu cấu hình mốc thời gian này trong vòng 7 ngày so với ngày hiện tại, hệ thống tự động hiển thị nhãn **NEW**.
*   `"disabled": true`: Sử dụng khi muốn khóa đề hiển thị dòng chữ "Đang cập nhật".

### Bước 3: Đẩy mã nguồn lên GitHub
```bash
git add data/exams.json K12/de-moi.html
git commit -m "feat: Thêm đề 02 cực trị hàm số Khối 12"
git push origin main
```

---

## 📱 6. PWA & ỨNG DỤNG ANDROID TWA (v2.4)

### Cấu hình ứng dụng
Dự án tích hợp đầy đủ tính năng của một **Progressive Web App** giúp người dùng cài đặt ứng dụng không cần thông qua Play Store:
*   [manifest.json](manifest.json): Khai báo tên ứng dụng, màu chủ đạo `#1e40af` và lối tắt truy cập nhanh.
*   [service-worker.js](service-worker.js): Quản lý cơ chế lưu đệm thông minh.

### Chiến lược Caching (Offline Cache)
Để tối ưu hóa hiệu năng và tốc độ khi không có mạng:

| Nhóm tài nguyên | Chiến lược Cache | Ghi chú |
| :--- | :--- | :--- |
| **Đề thi HTML & Ảnh nội bộ** | **Network First** | Ưu tiên tải bản mới trên server, nếu mất mạng sẽ lấy bản cache. |
| **CDN Thư viện (Bootstrap, MathJax)** | **Cache First** | Tải từ cache trước để rút ngắn tối đa thời gian mở trang. |
| **Google Sheets API & Counters** | **Network Only** | Không lưu cache, bắt buộc kết nối trực tuyến. |

---

## 🔴 7. LIÊN KẾT VỚI HỆ THỐNG THI TRỰC TUYẾN

Trang luyện thi tự do liên kết trực tiếp với dự án con **[thi-truc-tuyen](https://hxhung.github.io/thi-truc-tuyen/)** (quản lý có giám sát) thông qua Tab **THI TRỰC TUYẾN 🔴**:

```text
web-trac-nghiem (Trang luyện tập tự do)
  ├── de-XX.html (Ôn tập cục bộ)
  └── [Tab THI TRỰC TUYẾN]
           └──► thi-truc-tuyen (Phân hệ thi chính thức)
                   ├── index.html (Đăng nhập phòng thi)
                   ├── exam.html  (Làm bài giám sát)
                   └── result.html (Kết xuất điểm thi)
```

### Hợp nhất lịch sử điểm (Cross-Origin Bridge)
Để hiển thị kết quả tổng hợp của học sinh tại trang [statistics.html](statistics.html), hệ thống nhúng một iframe ẩn kết nối đến [bridge.html](bridge.html) của dự án con. Quá trình truyền tin dữ liệu qua hàm `postMessage` giúp gộp dữ liệu từ 2 domain khác nhau một cách an toàn mà không vi phạm chính sách bảo mật Same-Origin của trình duyệt.

---

## 🛠️ 8. CÀI ĐẶT & PHÁT TRIỂN CỤC BỘ

Để kiểm thử hệ thống dưới local máy tính:

1. Bản bản sao dự án về máy:
   ```bash
   git clone https://github.com/hxhung/web-trac-nghiem.git
   cd web-trac-nghiem
   ```
2. Khởi chạy máy chủ ảo (bắt buộc để tránh lỗi chặn CORS đối với lệnh `fetch()` dữ liệu JSON):
   ```bash
   python -m http.server 5500
   ```
3. Truy cập địa chỉ: `http://localhost:5500`.

---

## 📝 9. NHẬT KÝ CẬP NHẬT (CHANGELOG)

### v2.4.1 (21/03/2026)
* `[FIX]` Chuyển `@keyframes spinLoader` lên phần `<head>` ngăn hiện tượng giật màn hình khi tải trang.
* `[FIX]` Gộp sự kiện `DOMContentLoaded` hiển thị banner tải app Android và loader chính tránh xung đột luồng.
* `[NEW]` Đồng bộ lại toàn bộ số phiên bản hiển thị tại footer trang chủ và log console (`v2.4.1`).

### v2.4 (21/03/2026)
* `[NEW]` Đóng gói thành công file cài đặt Android [Trac-nghiem-Toan-THPT.apk](Trac-nghiem-Toan-THPT.apk).
* `[NEW]` Cấu hình `manifest.json` và `service-worker.js` biến trang web thành ứng dụng PWA hoàn chỉnh.
* `[NEW]` Thêm banner tải APK tự động hiển thị dưới chân trang khi phát hiện người dùng sử dụng thiết bị Android.

### v2.3 (12/03/2026)
* `[NEW]` Chuyển đổi kiến trúc sang render đề động qua file JSON [exams.json](data/exams.json).
* `[FIX]` Sửa lỗi vỡ cấu trúc DOM thẻ đóng `div` accordion Khối 11 gây hiển thị sai lệch trên điện thoại.

---

## 📄 10. GIẤY PHÉP & LIÊN HỆ

* **Mục đích**: Dự án phi lợi nhuận phục vụ học tập và giáo dục học sinh Trường THPT Phong Châu.
* **Tác giả**: hxhung  
* **Góp ý & Báo lỗi**: Truy cập trang [lienhe.html](lienhe.html) hoặc liên hệ qua GitHub cá nhân.