# fava-fe
Front-end repository for FAVA.

Quản lý route bằng cấu trúc thư mục trong app/

fava/
├── .expo/                    
│
├── app/                      # Thư mục chính cho định tuyến (routing) bằng Expo Router
│   ├── (tabs)/               # Nhóm màn hình dùng cho Tab Navigation (dùng layout riêng)
│   │   ├── _layout.tsx       # Layout riêng cho nhóm tab
│   │   ├── index.tsx         # Màn hình chính của tab (home tab)
│   │   └── two.tsx           # Màn hình thứ 2 trong tab navigation
│   │
│   ├── _layout.tsx           # Layout tổng thể cho toàn app 
│   ├── +html.tsx             # Tuỳ chỉnh HTML cho Web 
│   ├── +not-found.tsx        # Trang hiển thị khi không tìm thấy route (404 page)
│   └── modal.tsx             # Màn hình dạng modal, tự hoạt động như popup/modal
│
├── assets/                   # Chứa tài nguyên tĩnh
│   ├── fonts/                # Font chữ tùy chỉnh
│   └── images/               # Hình ảnh
│
├── components/               # Các component tái sử dụng
│
└── constants/                # Các hằng số dùng trong toàn bộ dự án (màu sắc, route name, v.v)
