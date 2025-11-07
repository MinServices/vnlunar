# Hướng Dẫn Xuất Hành & Phong Thủy

Hướng dẫn chi tiết về xem hướng và giờ xuất hành theo truyền thống Việt Nam.

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Ngọc Hạp Thông Thư](#ngọc-hạp-thông-thư)
3. [Hướng xuất hành theo tuổi](#hướng-xuất-hành-theo-tuổi)
4. [Tổng hợp hướng xuất hành](#tổng-hợp-hướng-xuất-hành)
5. [Giờ xuất hành Lý Thuần Phong](#giờ-xuất-hành-lý-thuần-phong)
6. [Kỵ tuổi](#kỵ-tuổi)
7. [Ví dụ thực tế](#ví-dụ-thực-tế)

---

## Giới thiệu

Trong phong thủy và tâm linh Việt Nam, việc chọn hướng và giờ xuất hành được coi là quan trọng, ảnh hưởng đến may mắn và bình an trong chuyến đi.

### Các yếu tố cần xem

1. **Hướng theo ngày** (Ngọc Hạp Thông Thư)
2. **Hướng theo tuổi** (12 con giáp)
3. **Giờ xuất hành** (Lý Thuần Phong - 6 giờ tốt/xấu)
4. **Tuổi xung khắc** (Tránh đi cùng người tuổi xung)

---

## Ngọc Hạp Thông Thư

**Ngọc Hạp Thông Thư** là sách cổ xem hướng tốt xấu theo Địa Chi của ngày.

### Nguyên lý

Mỗi Địa Chi (Tý, Sửu, Dần...) tương ứng với:
- **3 hướng tốt**
- **5 hướng xấu**

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const ngocHap = vnLunar.get_direction_info(jd);

console.log(ngocHap);
// {
//   chiNgay: "Dậu",
//   good: ["Tây", "Tây Nam", "Bắc"],
//   bad: ["Đông", "Đông Nam", "Nam", "Đông Bắc", "Tây Bắc"],
//   goodText: "Tây, Tây Nam, Bắc",
//   badText: "Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc"
// }

console.log(`Ngày ${ngocHap.chiNgay}:`);
console.log('✅ Hướng tốt:', ngocHap.goodText);
console.log('❌ Hướng xấu:', ngocHap.badText);
```

### Bảng Ngọc Hạp Thông Thư

| Địa Chi | Hướng Tốt              | Hướng Xấu                                    |
|---------|------------------------|----------------------------------------------|
| Tý      | Tây, Tây Nam, Bắc      | Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc      |
| Sửu     | Tây, Tây Bắc, Bắc      | Đông, Đông Nam, Nam, Tây Nam, Đông Bắc      |
| Dần     | Đông, Đông Nam, Nam    | Tây, Tây Bắc, Bắc, Tây Nam, Đông Bắc        |
| Mão     | Đông, Nam, Đông Bắc    | Tây, Đông Nam, Tây Bắc, Bắc, Tây Nam        |
| Thìn    | Đông, Nam, Đông Nam    | Tây, Tây Bắc, Bắc, Tây Nam, Đông Bắc        |
| Tỵ      | Đông, Đông Nam, Đông Bắc | Tây, Nam, Tây Bắc, Bắc, Tây Nam           |
| Ngọ     | Nam, Đông Nam, Đông Bắc | Tây, Tây Bắc, Bắc, Đông, Tây Nam           |
| Mùi     | Nam, Tây Nam, Đông Bắc  | Tây, Đông, Đông Nam, Tây Bắc, Bắc          |
| Thân    | Tây, Tây Nam, Tây Bắc   | Đông, Đông Nam, Nam, Bắc, Đông Bắc         |
| Dậu     | Tây, Tây Nam, Bắc      | Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc      |
| Tuất    | Tây, Tây Bắc, Bắc      | Đông, Đông Nam, Nam, Tây Nam, Đông Bắc      |
| Hợi     | Tây, Tây Nam, Đông Bắc  | Đông, Đông Nam, Nam, Tây Bắc, Bắc          |

---

## Hướng xuất hành theo tuổi

Mỗi con giáp (tuổi) có 3 hướng tốt và 5 hướng xấu riêng.

### Sử dụng

```javascript
const namSinh = 1995;
const huongTuoi = vnLunar.get_age_direction(namSinh);

console.log(huongTuoi);
// {
//   conGiap: "Hợi",
//   good: ["Tây", "Tây Nam", "Đông Bắc"],
//   bad: ["Đông", "Đông Nam", "Nam", "Tây Bắc", "Bắc"],
//   goodText: "Tây, Tây Nam, Đông Bắc",
//   badText: "Đông, Đông Nam, Nam, Tây Bắc, Bắc"
// }

console.log(`Tuổi ${huongTuoi.conGiap} (${namSinh}):`);
console.log('✅ Hướng tốt:', huongTuoi.goodText);
console.log('❌ Hướng xấu:', huongTuoi.badText);
```

### Bảng hướng theo 12 con giáp

| Con Giáp | Hướng Tốt              | Hướng Xấu                                    |
|----------|------------------------|----------------------------------------------|
| Tý       | Tây, Tây Nam, Bắc      | Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc      |
| Sửu      | Tây, Tây Bắc, Bắc      | Đông, Đông Nam, Nam, Tây Nam, Đông Bắc      |
| Dần      | Đông, Đông Nam, Nam    | Tây, Tây Bắc, Bắc, Tây Nam, Đông Bắc        |
| Mão      | Đông, Nam, Đông Bắc    | Tây, Đông Nam, Tây Bắc, Bắc, Tây Nam        |
| Thìn     | Đông, Nam, Đông Nam    | Tây, Tây Bắc, Bắc, Tây Nam, Đông Bắc        |
| Tỵ       | Đông, Đông Nam, Đông Bắc | Tây, Nam, Tây Bắc, Bắc, Tây Nam           |
| Ngọ      | Nam, Đông Nam, Đông Bắc | Tây, Tây Bắc, Bắc, Đông, Tây Nam           |
| Mùi      | Nam, Tây Nam, Đông Bắc  | Tây, Đông, Đông Nam, Tây Bắc, Bắc          |
| Thân     | Tây, Tây Nam, Tây Bắc   | Đông, Đông Nam, Nam, Bắc, Đông Bắc         |
| Dậu      | Tây, Tây Nam, Bắc      | Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc      |
| Tuất     | Tây, Tây Bắc, Bắc      | Đông, Đông Nam, Nam, Tây Nam, Đông Bắc      |
| Hợi      | Tây, Tây Nam, Đông Bắc  | Đông, Đông Nam, Nam, Tây Bắc, Bắc          |

---

## Tổng hợp hướng xuất hành

Hàm `get_travel_direction()` kết hợp cả **ngày** và **tuổi** để đưa ra hướng chung tốt nhất.

### Nguyên lý

- **Hướng chung tốt**: Tốt cho cả ngày VÀ tuổi
- **Hướng chung xấu**: Xấu cho cả ngày VÀ tuổi

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const namSinh = 1995;

const huong = vnLunar.get_travel_direction(jd, namSinh);

console.log(huong);
// {
//   ngay: { /* object từ get_direction_info */ },
//   tuoi: { /* object từ get_age_direction */ },
//   common_good: ["Tây"],
//   huongChungXau: ["Đông", "Nam"],
//   common_goodText: "Tây",
//   huongChungXauText: "Đông, Nam",
//   advice: "Nên đi hướng Tây. Tránh hướng Đông, Nam."
// }

console.log('═══════════════════════════════════════');
console.log('        HƯỚNG XUẤT HÀNH CHO BẠN       ');
console.log('═══════════════════════════════════════');
console.log('');

if (huong.common_good.length > 0) {
  console.log('✅ HƯỚNG TỐT:');
  console.log('   ' + huong.common_goodText);
} else {
  console.log('⚠️ Không có hướng chung tốt');
  console.log('   Hướng tốt theo ngày:', huong.ngay.goodText);
  console.log('   Hướng tốt theo tuổi:', huong.tuoi.goodText);
}

console.log('');

if (huong.huongChungXau.length > 0) {
  console.log('❌ HƯỚNG XẤU (tránh):');
  console.log('   ' + huong.huongChungXauText);
}

console.log('');
console.log('💡 Lời khuyên:');
console.log('   ' + huong.advice);
console.log('');
console.log('═══════════════════════════════════════');
```

### Ví dụ: Lên kế hoạch chuyến đi

```javascript
function planTrip(dd, mm, yyyy, namSinh, diemDen) {
  const jd = vnLunar.jdn(dd, mm, yyyy);
  const huong = vnLunar.get_travel_direction(jd, namSinh);
  
  // Xác định hướng của điểm đến (giả sử)
  const huongDiemDen = 'Đông'; // Ví dụ: đi về phía Đông
  
  const totKhong = huong.common_good.includes(huongDiemDen);
  const xauKhong = huong.huongChungXau.includes(huongDiemDen);
  
  console.log(`📅 Ngày đi: ${dd}/${mm}/${yyyy}`);
  console.log(`📍 Điểm đến: ${diemDen} (hướng ${huongDiemDen})`);
  console.log(`👤 Tuổi: ${huong.tuoi.conGiap}`);
  console.log('');
  
  if (totKhong) {
    console.log('✅ HẾT SỨC TỐT! Đi hướng này rất may mắn.');
  } else if (xauKhong) {
    console.log('❌ KHÔNG NÊN ĐI! Hướng này xung khắc.');
    console.log('💡 Gợi ý: Chọn ngày khác hoặc đi hướng:', huong.common_goodText);
  } else {
    console.log('⚠️ TRUNG BÌNH. Không tốt lắm nhưng không quá xấu.');
    console.log('💡 Hướng tốt hơn:', huong.common_goodText);
  }
}

planTrip(6, 11, 2025, 1995, 'Hà Nội');
```

---

## Giờ xuất hành Lý Thuần Phong

**Lý Thuần Phong** là phương pháp xem giờ truyền thống:
- Mỗi ngày có **6 giờ tốt**
- Và **6 giờ xấu**

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const gio = vnLunar.get_travel_hours(jd);

console.log(gio);
// {
//   good_hours: [
//     { chi: "Tý", gio: "23:00-01:00", chiIndex: 0 },
//     { chi: "Mùi", gio: "13:00-15:00", chiIndex: 7 },
//     // ... (6 giờ)
//   ],
//   bad_hours: [
//     { chi: "Sửu", gio: "01:00-03:00", chiIndex: 1 },
//     // ... (6 giờ)
//   ],
//   good_hoursText: "Tý (23:00-01:00), Mùi (13:00-15:00)...",
//   bad_hoursText: "Sửu (01:00-03:00)..."
// }

console.log('═══════════════════════════════════════');
console.log('      GIỜ XUẤT HÀNH LÝ THUẦN PHONG    ');
console.log('═══════════════════════════════════════');
console.log('');
console.log('✅ 6 GIỜ TỐT:');
gio.good_hours.forEach(g => {
  console.log(`   ${g.chi}: ${g.gio}`);
});
console.log('');
console.log('❌ 6 GIỜ XẤU (tránh):');
gio.bad_hours.forEach(g => {
  console.log(`   ${g.chi}: ${g.gio}`);
});
console.log('');
console.log('═══════════════════════════════════════');
```

### Kiểm tra giờ cụ thể

```javascript
const jd = vnLunar.jdn(6, 11, 2025);

// Kiểm tra 7h sáng
const ketQua = vnLunar.check_travel_hour(jd, 7);

console.log(ketQua);
// {
//   hour: 7,
//   chi: "Thìn",
//   time_frame: "07:00-09:00",
//   good: true,
//   type: "Giờ tốt"
// }

if (ketQua.good) {
  console.log(`✅ ${ketQua.hour}h (${ketQua.chi}) là giờ TỐT!`);
  console.log(`   Khung giờ: ${ketQua.time_frame}`);
} else {
  console.log(`❌ ${ketQua.hour}h (${ketQua.chi}) là giờ XẤU!`);
  console.log(`   Nên chọn giờ khác`);
}
```

### Ví dụ: Tìm giờ tốt gần nhất

```javascript
function findNextGoodHour(jd, currentHour) {
  const gio = vnLunar.get_travel_hours(jd);
  
  for (let h = currentHour; h < 24; h++) {
    const chiIndex = Math.floor(((h + 1) % 24) / 2);
    const isGood = gio.good_hours.some(g => g.chiIndex === chiIndex);
    
    if (isGood) {
      const gioObj = gio.good_hours.find(g => g.chiIndex === chiIndex);
      return {
        hour: h,
        chi: gioObj.chi,
        khungGio: gioObj.gio
      };
    }
  }
  
  // Nếu không tìm thấy, lấy giờ đầu tiên ngày hôm sau
  return {
    hour: null,
    message: 'Không còn giờ tốt trong ngày. Chọn ngày mai.'
  };
}

const nextGood = findNextGoodHour(vnLunar.jdn(6, 11, 2025), 10);
if (nextGood.hour) {
  console.log(`Giờ tốt tiếp theo: ${nextGood.hour}h (${nextGood.chi})`);
  console.log(`Khung giờ: ${nextGood.khungGio}`);
} else {
  console.log(nextGood.message);
}
```

---

## Kỵ tuổi

Trong phong thủy, các tuổi **xung nhau** không nên đi cùng nhau.

### Bảng tuổi xung

| Con Giáp | Xung với |
|----------|----------|
| Tý       | Ngọ      |
| Sửu      | Mùi      |
| Dần      | Thân     |
| Mão      | Dậu      |
| Thìn     | Tuất     |
| Tỵ       | Hợi      |
| Ngọ      | Tý       |
| Mùi      | Sửu      |
| Thân     | Dần      |
| Dậu      | Mão      |
| Tuất     | Thìn     |
| Hợi      | Tỵ       |

### Kiểm tra tuổi xung

```javascript
const tuoi1 = 1990; // Tuổi Ngọ
const tuoi2 = 1996; // Tuổi Tý

const ketQua = vnLunar.check_age_conflict(tuoi1, tuoi2);

console.log(ketQua);
// {
//   conflict: true,
//   chi1: "Ngọ",
//   chi2: "Tý",
//   description: "Ngọ xung với Tý - Không nên đi cùng nhau"
// }

if (ketQua.conflict) {
  console.log('⚠️ CẢNH BÁO:', ketQua.description);
  console.log('   Không nên đi du lịch chung');
} else {
  console.log('✅ HÒA HỢP:', ketQua.description);
  console.log('   Có thể đi cùng nhau');
}
```

### Ví dụ: Kiểm tra nhóm du lịch

```javascript
function checkTravelGroup(namSinhArray) {
  console.log('═══════════════════════════════════════');
  console.log('     KIỂM TRA NHÓM DU LỊCH            ');
  console.log('═══════════════════════════════════════');
  console.log('');
  
  const warnings = [];
  
  for (let i = 0; i < namSinhArray.length; i++) {
    for (let j = i + 1; j < namSinhArray.length; j++) {
      const kq = vnLunar.check_age_conflict(namSinhArray[i], namSinhArray[j]);
      
      if (kq.conflict) {
        warnings.push({
          tuoi1: namSinhArray[i],
          tuoi2: namSinhArray[j],
          chi1: kq.chi1,
          chi2: kq.chi2
        });
      }
    }
  }
  
  if (warnings.length === 0) {
    console.log('✅ NHÓM HÒA HỢP!');
    console.log('   Không có cặp tuổi xung trong nhóm.');
  } else {
    console.log('⚠️ CÓ TUỔI XUNG:');
    warnings.forEach(w => {
      console.log(`   ${w.tuoi1} (${w.chi1}) ⚔️ ${w.tuoi2} (${w.chi2})`);
    });
    console.log('');
    console.log('💡 Lời khuyên: Chọn ngày giờ tốt để hóa giải.');
  }
  
  console.log('');
  console.log('═══════════════════════════════════════');
}

checkTravelGroup([1990, 1995, 2000, 1996]);
```

---

## Ví dụ thực tế

### App hoàn chỉnh: Lên kế hoạch xuất hành

```javascript
function planTravelSchedule(dd, mm, yyyy, namSinh, gioXuatPhat) {
  const jd = vnLunar.jdn(dd, mm, yyyy);
  const lunar = vnLunar.get_lunar_date(dd, mm, yyyy);
  const huong = vnLunar.get_travel_direction(jd, namSinh);
  const gio = vnLunar.get_travel_hours(jd);
  const gioCheck = vnLunar.check_travel_hour(jd, gioXuatPhat);
  
  console.log('╔════════════════════════════════════════╗');
  console.log('║       KẾ HOẠCH XUẤT HÀNH               ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`📅 Ngày: ${dd}/${mm}/${yyyy}`);
  console.log(`🌙 Âm lịch: ${lunar.day}/${lunar.month}/${lunar.year}`);
  console.log(`👤 Tuổi: ${huong.tuoi.conGiap} (${namSinh})`);
  console.log(`⏰ Giờ xuất phát: ${gioXuatPhat}:00`);
  console.log('');
  console.log('─────────────────────────────────────────');
  console.log('🧭 HƯỚNG XUẤT HÀNH:');
  console.log('');
  
  if (huong.common_good.length > 0) {
    console.log('✅ Hướng tốt:');
    console.log(`   ${huong.common_goodText}`);
  } else {
    console.log('⚠️ Không có hướng chung tốt');
    console.log(`   Hướng tốt theo ngày: ${huong.ngay.goodText}`);
    console.log(`   Hướng tốt theo tuổi: ${huong.tuoi.goodText}`);
  }
  
  if (huong.should_avoid.length > 0) {
    console.log('');
    console.log('❌ Hướng xấu (tránh):');
    console.log(`   ${huong.should_avoid_text}`);
  }
  
  console.log('');
  console.log('─────────────────────────────────────────');
  console.log('⏰ GIỜ XUẤT HÀNH:');
  console.log('');
  
  if (gioCheck.good) {
    console.log(`✅ ${gioCheck.hour}:00 (${gioCheck.chi}) - GIỜ TỐT!`);
    console.log(`   Khung giờ: ${gioCheck.time_frame}`);
  } else {
    console.log(`❌ ${gioCheck.hour}:00 (${gioCheck.chi}) - GIỜ XẤU!`);
    console.log('');
    console.log('💡 Nên chọn các giờ sau:');
    gio.good_hours.slice(0, 3).forEach(g => {
      console.log(`   ${g.chi}: ${g.gio}`);
    });
  }
  
  console.log('');
  console.log('─────────────────────────────────────────');
  console.log('💡 LỜI KHUYÊN:');
  console.log(`   ${huong.advice}`);
  
  if (!gioCheck.good) {
    console.log(`   Nên đổi giờ xuất phát để tăng may mắn.`);
  }
  
  console.log('');
  console.log('╚════════════════════════════════════════╝');
}

// Sử dụng
planTravelSchedule(6, 11, 2025, 1995, 7);
```

### Output mẫu

```
╔════════════════════════════════════════╗
║       KẾ HOẠCH XUẤT HÀNH               ║
╚════════════════════════════════════════╝

📅 Ngày: 6/11/2025
🌙 Âm lịch: 8/10/2025
👤 Tuổi: Hợi (1995)
⏰ Giờ xuất phát: 7:00

─────────────────────────────────────────
🧭 HƯỚNG XUẤT HÀNH:

✅ Hướng tốt:
   Tây, Tây Nam

❌ Hướng xấu (tránh):
   Đông, Nam

─────────────────────────────────────────
⏰ GIỜ XUẤT HÀNH:

✅ 7:00 (Thìn) - GIỜ TỐT!
   Khung giờ: 07:00-09:00

─────────────────────────────────────────
💡 LỜI KHUYÊN:
   Nên đi hướng Tây, Tây Nam. Tránh hướng Đông, Nam.

╚════════════════════════════════════════╝
```

---

**Xem thêm:**
- [API Reference](API.md)
- [Hướng dẫn Xem ngày](XEMNGAY.md)
- [Hướng dẫn Can Chi](CANCHI.md)
