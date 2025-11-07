# Test Suite - vnLunar v2.0

File test tổng hợp cho thư viện vnLunar phiên bản 2.0 (TypeScript).

## Chạy test

```bash
npm test
```

hoặc

```bash
node tests/test-all.js
```

## Nội dung test

File `test-all.js` kiểm tra toàn bộ các chức năng của thư viện:

### 1. Chuyển đổi Dương lịch <-> Âm lịch
- Tính Julian Day Number (JDN)
- Chuyển đổi từ Dương lịch sang Âm lịch
- Chuyển đổi từ Âm lịch sang Dương lịch
- Xử lý tháng nhuận

### 2. Can Chi (Thiên Can, Địa Chi)
- Can Chi Ngày, Tháng, Năm
- Con giáp theo năm sinh
- Ngũ hành của Can và Chi

### 3. 12 Sao Kiến Trừ (12 Day Officers)
- Xác định sao trong ngày
- Trạng thái tốt/xấu/trung bình
- Mô tả chi tiết

### 4. 12 Thần (Hoàng Đạo/Hắc Đạo)
- 12 Thần theo ngày
- Phân loại Hoàng Đạo/Hắc Đạo
- Mô tả ý nghĩa

### 5. Thập Nhị Trực (12 Day Construction)
- 12 Trực trong ngày
- Việc tốt và việc kỵ
- Hướng dẫn sử dụng

### 6. 28 Tú Sao (28 Lunar Mansions)
- 28 Tú Sao theo ngày
- Động vật tương ứng
- Ngũ hành và ý nghĩa

### 7. 60 Nạp Âm (Nayin)
- 60 Nạp Âm theo Can Chi
- Ngũ hành của Nạp Âm
- Kiểm tra vòng 60 ngày

### 8. Ngũ Hành (Five Elements)
- Ngũ hành của Can và Chi
- Quan hệ Sinh - Khắc
- Phân tích tương tác

### 9. Tuổi Xung (Conflicting Ages)
- Xác định tuổi xung theo ngày
- Danh sách các tuổi cần tránh
- Kiểm tra xung giữa 2 năm sinh

### 10. Hướng xuất hành theo ngày
- Ngọc Hạp Thông Thư
- Hướng tốt và hướng xấu theo Chi ngày
- Mô tả chi tiết

### 11. Hướng Thần Tài, Hỷ Thần, Phúc Thần
- Hướng các vị thần theo Can ngày
- Hỷ Thần (Joy God)
- Tài Thần (Wealth God)
- Phúc Thần (Fortune God)

### 12. Hướng xuất hành theo tuổi
- Hướng tốt/xấu theo năm sinh
- Tổng hợp hướng theo ngày + tuổi
- Lời khuyên xuất hành

### 13. Giờ xuất hành theo Lý Thuần Phong
- 6 giờ tốt và 6 giờ xấu mỗi ngày
- Khung giờ theo Địa Chi
- Kiểm tra giờ cụ thể

### 14. Tìm ngày tốt
- Kiểm tra ngày tốt cho hoạt động cụ thể
  - Cưới hỏi
  - Xây nhà
  - Xuất hành
  - Khai trương
  - Chuyển nhà
  - Đầu tư
- Tìm danh sách ngày tốt trong tháng

### 15. Thông tin đầy đủ
- Hàm `getFullInfo()` tổng hợp tất cả thông tin
- Dương lịch, Âm lịch
- Can Chi đầy đủ
- Tất cả các sao và trực
- Hướng và thần
- Tiết khí

### 16. Performance Test
- Tốc độ chuyển đổi Dương -> Âm
- Tốc độ tính toán đầy đủ
- Đảm bảo hiệu năng cao

### 17. Edge Cases
- Ngày đầu năm, cuối năm
- Tháng nhuận
- Năm giới hạn (1800-2199)

## Kết quả mong đợi

Tất cả 56 test cases phải pass (100%).

## Cấu trúc API mới (v2.0)

API đã được cập nhật từ JavaScript sang TypeScript với các tên hàm mới:

| Chức năng | Tên hàm cũ (v1) | Tên hàm mới (v2) |
|-----------|----------------|------------------|
| Chuyển Dương -> Âm | `getLunarDate()` | `get_lunar_date()` |
| 12 Sao | `get12Sao()` | `get_12_stars()` |
| 12 Thần | - | `get_12_gods()` |
| Thập Nhị Trực | - | `get_12_constructions()` |
| 28 Tú | `get28TuSao()` | `get_28_mansions()` |
| Nạp Âm | `getNapAm()` | `get_nayin()` |
| Ngọc Hạp | `getNgocHapThongThu()` | `get_direction_info()` |
| Hướng theo tuổi | `getHuongXuatHanhTheoTuoi()` | `get_age_direction()` |
| Hướng tổng hợp | `getHuongXuatHanh()` | `get_travel_direction()` |
| Giờ xuất hành | `getGioXuatHanhLyThuanPhong()` | `get_travel_hours()` |
| Kiểm tra giờ | `kiemTraGioXuatHanh()` | `check_travel_hour()` |
| Tuổi xung | - | `get_conflicting_ages()` |
| Can Chi | `getCanChi()` | `get_can_chi()` |
| Thông tin đầy đủ | `getFullInfo()` | `getFullInfo()` |

## Lưu ý

- File test sử dụng CommonJS (`require`) để tương thích với Node.js
- Test chạy trên module đã được build (`dist/index.js`)
- Cần build lại thư viện trước khi chạy test nếu có thay đổi trong `src/`

## Build trước khi test

```bash
npm run build
```

Lệnh này sẽ:
1. Xóa thư mục `dist/` cũ
2. Build lại từ TypeScript sang JavaScript (CommonJS và ESM)
3. Tạo file declaration (.d.ts)
