# Quyết định thiết kế (v2.0.0)

Tài liệu ghi lại các quy ước tính toán và lý do chọn. Áp dụng cho cả `@min98/vnlunar` (TS) và `pyvnlunar` (Python).

## D1. Cách tính tháng: tách riêng `trucBasis` và `godBasis`

- **Thập Nhị Trực**: mặc định `trucBasis: "solar_term"`. Tháng Dần bắt đầu từ Lập Xuân, mỗi Tiết lệnh đổi tháng.
- **12 Thần Hoàng/Hắc Đạo**: mặc định `godBasis: "lunar"`. Chi tháng = (tháng âm + 1) % 12.
- Lý do: đối chiếu với lịch vạn niên phổ biến (8/11/2025, 10/3/2025, 15/1/2026).
  - 15/1/2026 (27/11 âm): Trực **Kiến** (theo tiết khí; theo tháng âm sẽ là Trừ).
  - Cùng ngày: Thần **Thiên Đức / Bảo Quang** (theo tháng âm; theo tiết khí sẽ là Chu Tước).
- Kế hoạch ban đầu chỉ có một tùy chọn `monthBasis`. Đã tách làm hai vì một giá trị chung không khớp được cả hai chỉ số.

## D2. Chuyển đổi lịch: tra bảng trước, tính thiên văn sau

- Trong 25/01/1800..31/12/2199: `get_lunar_date` và `convert_lunar_to_solar` tra bảng `TK19..TK22` của Hồ Ngọc Đức.
  - Bảng phản ánh lịch đã ban hành, kể cả giai đoạn trước 1968 dùng giờ UTC+8.
  - Đây cũng là cách trang của HND hiển thị.
- Ngoài khoảng này, hoặc khi truyền `timeZone` tường minh: dùng thuật toán thiên văn.
- Đo trên 146.073 ngày, thuật toán thiên văn UTC+7 lệch bảng như sau:
  - Trước 1968: 2.693 ngày.
  - Sau 1968: 241 ngày, toàn bộ là ngày tương lai (2054, 2062, …). Giai đoạn 1968–2053 khớp tuyệt đối.
- Đã sửa lỗi tìm ngày Sóc: v1.x chỉ thử `k+1` rồi `k`, nên có 15 kết quả ra ngày âm ≤ 0.
- Đã sửa `FIRST_DAY` / `LAST_DAY`. Giá trị cũ thực chất là 1/1/1800 và 1/10/2199.

## D3. Không tự chuyển UTC+8

Giai đoạn trước 1968 đã được bảng xử lý. Không thêm logic tự đổi múi giờ.

## D4. Phiên bản 2.0.0

- Các hàm Trực / Thần nhận `jd` thay vì `(lunarDay, lunarMonth)`. Chữ ký cũ cho kết quả sai nên sẽ ném `TypeError` kèm hướng dẫn.
- Giữ nguyên tên hàm và khóa cũ: `stars_12`, `constructions_12`, `gods_12`, `day_type`, …
- `NAYIN_60` giờ là mảng 60 phần tử thật. Mảng 30 phần tử cũ đổi tên thành `NAYIN_30`.

## D5. Bỏ các bảng chưa có nguồn khỏi `getFullInfo`

- Bỏ `directions` (bảng hướng theo chi ngày) và bảng hướng theo tuổi khỏi `getFullInfo`.
- Các hàm vẫn còn, nhưng gắn nhãn `@experimental`.

## Công thức

| Mục | Công thức |
|---|---|
| Tiết khí của ngày | `s = get_sun_longitude(jd + 1, tz)`, tức tại cuối ngày; 0 = Xuân phân |
| Chi tháng tiết khí | `(floor(((s - 21 + 24) % 24) / 2) + 2) % 12` |
| Trực | `(chi_ngày - chi_tháng + 12) % 12`, 0 = Kiến |
| 12 Thần | `start = ((chi_tháng - 2 + 12) % 6) * 2`; `thần = (chi_ngày - start + 12) % 12` |
| Hoàng Đạo | Thần ∈ {Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh} |
| Trạng thái Trực | "Kiến Mãn Bình Thu hắc, Trừ Nguy Định Chấp hoàng, Thành Khai giai khả dụng, Bế Phá bất tương đương" |
| Nạp Âm | `NAYIN_60[(6*can - 5*chi + 60) % 60]` |
| 28 Tú | `(jd + 11) % 28`, 0 = Giác. Thất Diệu khớp thứ trong tuần |
| Ngày tốt cho việc | Hoàng Đạo **và** Trực thuộc danh sách của việc đó |
| Tứ Trụ | Năm đổi tại Lập Xuân; tháng theo tiết khí (Ngũ Hổ Độn); giờ ≥ 23 tính sang ngày sau |

## Mức độ xác minh

| Mục | Trạng thái |
|---|---|
| Âm ↔ Dương 1800–2199 | ✅ Khớp bảng HND cho mọi ngày (test tự động) |
| Can Chi, Nạp Âm, 28 Tú, Tiết khí | ✅ |
| Trực, 12 Thần | ✅ Khớp 3 ngày đối chiếu |
| Hỷ Thần, Tài Thần | ✅ Khớp ngày đối chiếu |
| Tuổi xung ngày | ⚠️ Quy tắc suy ra, khớp 2/2 ngày đối chiếu. Xem `docs/tuoi-xung.md` |
| Phúc Thần | ❌ Chưa đối chiếu, giữ nguyên bảng v1.x |
| Hướng theo chi ngày / theo tuổi | ❌ Chưa có nguồn (`@experimental`) |
