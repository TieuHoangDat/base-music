## Cài đặt

1. yarn
2. Copy file .env.example vào .env.development.local Có thể điều chỉnh nếu cần
3. yarn dev

## Biến môi trường (env)

- Biến bắt buộc phải có tiền tố: `VITE`. Ví dụ: VITE_API_BASE_URL
- Khi thêm biến môi trường mới, cần phải thêm vào file `.env.example` và thêm kiểu của biến vào file `src/vite-env.d.ts`
- Để truy cập biến môi trường, sử dụng `import.meta.env`
# base-music

## Màn hình máy tính
![Trang chủ](public/image/Screenshot/home.png "Trang chủ")
![Trang chủ](public/image/Screenshot/home2.png "Trang chủ")
![Tìm kiếm](public/image/Screenshot/search.png "Tìm kiếm")

---

## Màn mobile
<div align="center">
  <img src="public/image/Screenshot/home3.png" alt="Trang chủ" width="30%" style="display: inline-block; margin: 0 5px;">
  <img src="public/image/Screenshot/sidebar.png" alt="sidebar" width="30%" style="display: inline-block; margin: 0 5px;">
  <img src="public/image/Screenshot/search2.png" alt="Tìm kiếm" width="30%" style="display: inline-block; margin: 0 5px;">
</div>