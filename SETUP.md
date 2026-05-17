# AA-IMEX Website — Hướng Dẫn Setup

## Tổng quan
Website này dùng:
- **Next.js 14** — framework
- **Google Sheets** — quản lý sản phẩm + lưu lead
- **Vercel** — deploy miễn phí
- **EN/VN** — 2 ngôn ngữ, tự chuyển bằng nút trên nav

---

## BƯỚC 1: Setup Google Sheets

### 1.1. Tạo Spreadsheet

1. Mở **[Google Sheets](https://sheets.google.com)** → tạo spreadsheet mới
2. Đặt tên: `AA-IMEX Website`
3. Tạo **2 tab** (sheet):

**Tab 1: đổi tên thành `products`**

Gõ các header này vào hàng 1 (mỗi header 1 ô):

| Cột | Nội dung |
|-----|----------|
| A | slug |
| B | name_en |
| C | name_vn |
| D | category_en |
| E | category_vn |
| F | desc_short_en |
| G | desc_short_vn |
| H | desc_long_en |
| I | desc_long_vn |
| J | image_url |
| K | origin |
| L | sku |
| M | packaging |
| N | capacity |
| O | spec1_label |
| P | spec1_value |
| Q | spec2_label |
| R | spec2_value |
| S | spec3_label |
| T | spec3_value |
| U | spec4_label |
| V | spec4_value |
| W | spec5_label |
| X | spec5_value |
| Y | is_active |

**Ví dụ 1 sản phẩm (điền từ hàng 2):**
```
slug:           frozen-pangasius-fillet
name_en:        Frozen Pangasius Fillet
name_vn:        Cá Tra Fillet Đông Lạnh
category_en:    Frozen Seafood
category_vn:    Hải Sản Đông Lạnh
desc_short_en:  Premium IQF frozen pangasius fillets from Mekong Delta.
desc_short_vn:  Cá tra fillet IQF cao cấp từ vùng Đồng bằng sông Cửu Long.
desc_long_en:   Our pangasius fillets are harvested using IQF technology...
desc_long_vn:   Cá tra của chúng tôi được thu hoạch bằng công nghệ IQF...
image_url:      https://link-anh-cua-ban.com/anh.jpg
origin:         Vietnam (Mekong Delta)
sku:            AA-SEA-001
packaging:      10kg carton / 25kg bags
capacity:       500 MT
spec1_label:    Grade
spec1_value:    Premium Grade A
spec2_label:    Glazing
spec2_value:    10-20%
spec3_label:    Treatment
spec3_value:    STPP Free
spec4_label:    (để trống nếu không có)
spec4_value:    (để trống)
spec5_label:    (để trống)
spec5_value:    (để trống)
is_active:      TRUE
```

> **Lưu ý:** Cột Y (`is_active`) phải điền `TRUE` thì sản phẩm mới hiện trên web.
> Muốn ẩn sản phẩm: đổi thành `FALSE`.

---

**Tab 2: đổi tên thành `leads`**

Điền header vào hàng 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| timestamp | name | company | email | phone | inquiry_type | message | status |

> Cột này website sẽ tự điền khi có khách submit form. Bạn chỉ cần xem.
> Cột H (`status`) để team sales cập nhật: `Mới`, `Đang xử lý`, `Xong`.

---

### 1.2. Lấy Spreadsheet ID

Nhìn vào URL của spreadsheet:
```
https://docs.google.com/spreadsheets/d/  1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms  /edit
                                          ↑ đây là Spreadsheet ID ↑
```

Copy và lưu lại.

---

### 1.3. Tạo Service Account (Google Cloud)

1. Vào **[Google Cloud Console](https://console.cloud.google.com)**
2. Tạo project mới (hoặc dùng project có sẵn)
3. Tìm **"APIs & Services"** → **"Enable APIs"** → tìm và bật **Google Sheets API**
4. Vào **"Credentials"** → **"Create Credentials"** → **"Service Account"**
5. Điền tên tùy ý (ví dụ: `aa-imex-sheets`) → nhấn Create
6. Bỏ qua các bước phân quyền → nhấn Done
7. Click vào service account vừa tạo → tab **"Keys"** → **"Add Key"** → **"Create new key"** → chọn **JSON**
8. File JSON sẽ tự tải về máy — **giữ cẩn thận, không share cho ai**

---

### 1.4. Chia sẻ Sheet với Service Account

1. Mở file JSON vừa tải → tìm dòng `"client_email"`:
   ```json
   "client_email": "aa-imex-sheets@your-project.iam.gserviceaccount.com"
   ```
2. Copy email đó
3. Vào Google Sheet → nhấn **Share** (Chia sẻ)
4. Paste email vào → chọn quyền **Editor** → Send

---

## BƯỚC 2: Upload Code lên GitHub

1. Mở **GitHub** → tạo repository mới, đặt tên `aa-imex-website` (private hoặc public đều được)
2. Mở Terminal/PowerShell trong thư mục `aa-imex` → chạy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/aa-imex-website.git
   git push -u origin main
   ```

---

## BƯỚC 3: Deploy lên Vercel

1. Vào **[vercel.com](https://vercel.com)** → đăng nhập bằng GitHub
2. Nhấn **"Add New Project"** → import repo `aa-imex-website`
3. Framework: chọn **Next.js** (tự detect)
4. Nhấn **"Environment Variables"** → thêm 2 biến:

**Biến 1:**
```
Name:  GOOGLE_SPREADSHEET_ID
Value: (dán Spreadsheet ID của bạn vào đây)
```

**Biến 2:**
```
Name:  GOOGLE_SERVICE_ACCOUNT_JSON
Value: (copy toàn bộ nội dung file JSON, paste thành 1 dòng)
```

> **Cách copy JSON thành 1 dòng:** Mở file JSON → Select All → Copy
> Hoặc dùng lệnh: `cat your-file.json | tr -d '\n'`

5. Nhấn **Deploy** → đợi ~2 phút

6. Vercel sẽ cho bạn URL dạng: `aa-imex-website.vercel.app` — đây là website hoạt động thật!

---

## BƯỚC 4: Thêm Domain Riêng (Sau Này)

1. Mua domain ở [Namecheap](https://namecheap.com) hoặc [GoDaddy](https://godaddy.com)
2. Vào Vercel → Project Settings → **Domains** → Add domain
3. Vercel sẽ cho bạn DNS records để điền vào nhà cung cấp domain
4. Đợi ~15-30 phút là xong

---

## Cách Vận Hành Hàng Ngày

### Thêm sản phẩm mới
1. Mở Google Sheet → tab `products`
2. Thêm hàng mới (từ hàng tiếp theo còn trống)
3. Điền thông tin, đặt `is_active` = `TRUE`
4. **Xong!** Website tự cập nhật sau tối đa 60 giây

### Ẩn sản phẩm
1. Mở Google Sheet → tab `products`
2. Tìm hàng sản phẩm cần ẩn → cột Y đổi thành `FALSE`
3. Website tự ẩn sau 60 giây

### Xem lead khách hàng
1. Mở Google Sheet → tab `leads`
2. Xem cột A (thời gian), B (tên), C (công ty), D (email), F (loại yêu cầu)
3. Cập nhật cột H (status): `Đang xử lý` / `Xong`

### Upload ảnh sản phẩm
Option 1 — Google Drive (dễ nhất):
1. Upload ảnh lên Google Drive → chuột phải → **Get link** → đổi thành **Anyone with the link**
2. Copy link dạng: `https://drive.google.com/file/d/FILE_ID/view`
3. Đổi thành: `https://drive.google.com/uc?id=FILE_ID` → dán vào cột J

Option 2 — Imgur (miễn phí, không cần tài khoản):
1. Vào [imgur.com](https://imgur.com) → upload ảnh → copy direct link
2. Dán vào cột J

---

## Cấu trúc URL Website

```
/en/           → Trang chủ (tiếng Anh)
/vn/           → Trang chủ (tiếng Việt)
/en/about      → Về chúng tôi
/en/products   → Danh sách sản phẩm
/en/products/frozen-pangasius-fillet  → Chi tiết sản phẩm (theo slug)
/en/contact    → Liên hệ
```

---

## Troubleshooting

**Q: Website báo lỗi sau khi deploy**
→ Kiểm tra Vercel Dashboard → Deployments → xem logs

**Q: Sản phẩm không hiện lên**
→ Kiểm tra cột Y (is_active) có phải `TRUE` không (viết hoa)
→ Kiểm tra Google Sheet đã share cho service account chưa

**Q: Form liên hệ không ghi vào Sheet**
→ Kiểm tra GOOGLE_SERVICE_ACCOUNT_JSON trong Vercel env vars
→ Service account phải có quyền Editor trên Sheet

**Q: Muốn đổi thông tin công ty (địa chỉ, email, phone)**
→ Sửa trong file `messages/en.json` và `messages/vn.json` → push lên GitHub → Vercel tự deploy lại
