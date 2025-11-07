# Hướng Dẫn Xem Ngày

Hướng dẫn chi tiết về cách xem ngày tốt xấu theo Âm lịch Việt Nam.

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [12 Sao Kiến Trừ](#12-sao-kiến-trừ)
3. [28 Tú Sao](#28-tú-sao)
4. [60 Nạp Âm](#60-nạp-âm)
5. [Hoàng Đạo / Hắc Đạo](#hoàng-đạo--hắc-đạo)
6. [Giờ Hoàng Đạo](#giờ-hoàng-đạo)
7. [Xem ngày cho việc cụ thể](#xem-ngày-cho-việc-cụ-thể)
8. [Tìm ngày tốt](#tìm-ngày-tốt)

---

## Giới thiệu

Trong văn hóa Việt Nam, việc chọn ngày giờ tốt để làm việc quan trọng (cưới hỏi, xây nhà, khai trương...) được coi trọng. vnLunar cung cấp đầy đủ công cụ để xem ngày theo truyền thống.

### Các yếu tố xem ngày

1. **12 Sao Kiến Trừ** - 12 sao luân phiên mỗi ngày
2. **28 Tú Sao** - 28 ngôi sao (Nhị Thập Bát Tú)
3. **60 Nạp Âm** - 60 âm thanh Nayin
4. **Hoàng Đạo / Hắc Đạo** - Ngày tốt/xấu
5. **Giờ Hoàng Đạo** - Giờ tốt trong ngày

---

## 12 Sao Kiến Trừ

12 sao Kiến Trừ luân phiên mỗi ngày theo chu kỳ 12 ngày.

### Danh sách 12 sao

| Sao       | Trạng thái | Việc nên làm                          | Việc không nên |
|-----------|------------|---------------------------------------|----------------|
| **Kiến**  | Tốt        | Khởi công, khai trương, cưới hỏi      | -              |
| **Trừ**   | Xấu        | Trừ bỏ, dọn dẹp                       | Cưới, khởi công|
| **Mãn**   | Bình       | Gia cố, sửa chữa, cất của             | Đi xa, khai trương |
| **Bình**  | Tốt        | Mọi việc đều tốt                      | -              |
| **Định**  | Bình       | Cưới hỏi, giao dịch, ký kết           | Đi xa, kiện tụng |
| **Chấp**  | Xấu        | Bắt giữ, thu nợ                       | Cưới, khởi công |
| **Phá**   | Xấu        | Phá dỡ                                | Mọi việc       |
| **Nguy**  | Xấu        | -                                     | Mọi việc       |
| **Thành** | Tốt        | Khởi công, khai trương, cưới hỏi      | -              |
| **Thâu**  | Bình       | Thu hoạch, cất giữ                    | Khai trương    |
| **Khai**  | Tốt        | Khai trương, khởi công                | Tang lễ        |
| **Bế**    | Xấu        | -                                     | Mọi việc       |

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const sao = vnLunar.get_12_stars(jd);

console.log(sao);
// {
//   name: "Mãn",
//   status: "Bình",
//   description: "Mãn - Bình. Nên: gia cố, sửa chữa...",
//   tot: ["gia cố", "sửa chữa", "cất của"],
//   xau: ["đi xa", "khởi công", "khai trương"]
// }

// Hiển thị
console.log(`Sao ${sao.name} - ${sao.status}`);
if (sao.status === 'Tốt') {
  console.log('✅ Ngày tốt!');
  console.log('Nên làm:', sao.good.join(', '));
} else if (sao.status === 'Xấu') {
  console.log('❌ Ngày xấu!');
  console.log('Không nên:', sao.bad.join(', '));
} else {
  console.log('⚠️ Ngày bình thường');
}
```

### Ví dụ: Tìm ngày sao "Thành" (tốt cho cưới)

```javascript
function findThanhDays(month, year, count = 5) {
  const days = vnLunar.get_month(month, year);
  const result = [];
  
  for (let d of days) {
    const jd = vnLunar.jdn(d.dd, d.mm, d.yyyy);
    const sao = vnLunar.get_12_stars(jd);
    
    if (sao.name === 'Thành') {
      result.push({
        date: `${d.dd}/${d.mm}/${d.yyyy}`,
        lunar: `${d.day}/${d.month}`,
        sao: sao.name
      });
      
      if (result.length >= count) break;
    }
  }
  
  return result;
}

const thanhDays = findThanhDays(11, 2025);
console.table(thanhDays);
```

---

## 28 Tú Sao

28 Tú Sao (Nhị Thập Bát Tú) là 28 ngôi sao được chia thành 4 cung theo 4 hướng.

### 4 Cung

1. **Thanh Long** (Đông) - 7 Tú
2. **Chu Tước** (Nam) - 7 Tú
3. **Bạch Hổ** (Tây) - 7 Tú
4. **Huyền Vũ** (Bắc) - 7 Tú

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const tu = vnLunar.get_28_mansions(jd);

console.log(tu);
// {
//   name: "Giác",
//   tot: true,
//   huong: "Đông",
//   cung: "Thanh Long",
//   dongVat: "Giao Long",
//   thuTu: 1
// }

// Hiển thị
console.log(`Tú ${tu.name} - ${tu.cung} (${tu.huong})`);
console.log(`Động vật: ${tu.dongVat}`);
console.log(tu.good ? '✅ Tốt' : '❌ Xấu');
```

### Danh sách 28 Tú (rút gọn)

| Cung         | Tú           | Tốt/Xấu | Động vật  |
|--------------|--------------|---------|-----------|
| Thanh Long   | Giác         | Tốt     | Giao Long |
| Thanh Long   | Cang         | Xấu     | Long      |
| Thanh Long   | Đê           | Xấu     | Lễ        |
| ...          | ...          | ...     | ...       |
| Huyền Vũ     | Thất         | Tốt     | Đậu Hải   |

### Ví dụ: Tìm ngày Tú tốt trong tháng

```javascript
function findGoodTuDays(month, year) {
  const days = vnLunar.get_month(month, year);
  const goodDays = [];
  
  days.forEach(d => {
    const jd = vnLunar.jdn(d.dd, d.mm, d.yyyy);
    const tu = vnLunar.get_28_mansions(jd);
    
    if (tu.good) {
      goodDays.push({
        date: `${d.dd}/${d.mm}`,
        tu: tu.name,
        cung: tu.cung
      });
    }
  });
  
  return goodDays;
}

const goodDays = findGoodTuDays(11, 2025);
console.log(`Tìm thấy ${goodDays.length} ngày Tú tốt`);
console.table(goodDays);
```

---

## 60 Nạp Âm

60 Nạp Âm (Nayin) là 60 âm thanh tương ứng với 60 Can Chi.

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const napAm = vnLunar.get_nayin(jd);

console.log(napAm);
// {
//   name: "Sơn Hạ Hỏa",
//   nguHanh: "Hỏa"
// }

console.log(`Nạp Âm: ${napAm.name} (${napAm.element})`);
```

### Ý nghĩa

Nạp Âm được dùng để:
- Xem tương sinh tương khắc giữa các tuổi
- Xem hợp tuổi khi cưới hỏi
- Chọn ngày xây nhà theo tuổi chủ nhà

### Ví dụ: So sánh Nạp Âm 2 tuổi

```javascript
function compareNapAm(year1, year2) {
  // Lấy ngày Tết để tính
  const tet1 = vnLunar.get_solar_date(1, 1, year1);
  const tet2 = vnLunar.get_solar_date(1, 1, year2);
  
  const jd1 = vnLunar.jdn(tet1.day, tet1.month, tet1.year);
  const jd2 = vnLunar.jdn(tet2.day, tet2.month, tet2.year);
  
  const na1 = vnLunar.get_nayin(jd1);
  const na2 = vnLunar.get_nayin(jd2);
  
  // Kiểm tra quan hệ ngũ hành
  const relation = vnLunar.get_element_relation(na1.element, na2.element);
  
  return {
    year1: { year: year1, nayin: na1.name, element: na1.element },
    year2: { year: year2, nayin: na2.name, element: na2.element },
    relation: relation
  };
}

const result = compareNapAm(1990, 1995);
console.log('Tuổi 1:', result.year1.nayin);
console.log('Tuổi 2:', result.year2.nayin);
console.log('Quan hệ:', result.relation.description);
```

---

## Hoàng Đạo / Hắc Đạo

Hoàng Đạo là ngày tốt, Hắc Đạo là ngày xấu. Được tính dựa trên Địa Chi của ngày.

### 12 Sao Hoàng Hắc

| Sao           | Loại         | Tốt/Xấu |
|---------------|--------------|---------|
| Thanh Long    | Hoàng Đạo    | Tốt     |
| Minh Đường    | Hoàng Đạo    | Tốt     |
| Kim Quỹ       | Hoàng Đạo    | Tốt     |
| Bảo Quang     | Hoàng Đạo    | Tốt     |
| Ngọc Đường    | Hoàng Đạo    | Tốt     |
| Tư Mệnh       | Hoàng Đạo    | Tốt     |
| Thiên Hình    | Hắc Đạo      | Xấu     |
| Chu Tước      | Hắc Đạo      | Xấu     |
| Bạch Hổ       | Hắc Đạo      | Xấu     |
| Thiên Lao     | Hắc Đạo      | Xấu     |
| Huyền Vũ      | Hắc Đạo      | Xấu     |
| Câu Trần      | Hắc Đạo      | Xấu     |

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const hhd = vnLunar.get_day_type(jd);

console.log(hhd);
// {
//   type: "Hoàng Đạo",
//   sao: "Thanh Long",
//   description: "Thanh Long (Hoàng Đạo) - Tốt...",
//   tot: true
// }

// Hiển thị với emoji
const emoji = hhd.type === 'Hoàng Đạo' ? '✅' : '❌';
console.log(`${emoji} ${hhd.sao} - ${hhd.type}`);
```

### Ví dụ: Thống kê Hoàng/Hắc Đạo trong tháng

```javascript
function countDayTypes(month, year) {
  const days = vnLunar.get_month(month, year);
  const stats = { hoang: 0, hac: 0, trungBinh: 0 };
  
  days.forEach(d => {
    const jd = vnLunar.jdn(d.dd, d.mm, d.yyyy);
    const hhd = vnLunar.get_day_type(jd);
    
    if (hhd.type === 'Hoàng Đạo') stats.hoang++;
    else if (hhd.type === 'Hắc Đạo') stats.hac++;
    else stats.trungBinh++;
  });
  
  return stats;
}

const stats = countDayTypes(11, 2025);
console.log(`Hoàng Đạo: ${stats.hoang} ngày`);
console.log(`Hắc Đạo: ${stats.hac} ngày`);
console.log(`Trung Bình: ${stats.trungBinh} ngày`);
```

---

## Giờ Hoàng Đạo

Mỗi ngày có 12 giờ, trong đó có giờ Hoàng Đạo (tốt) và giờ Hắc Đạo (xấu).

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const gioHD = vnLunar.get_auspicious_hours(jd);

console.log(gioHD);
// {
//   gioHoangDao: [
//     { chi: "Tý", gio: "23:00-01:00", index: 0 },
//     { chi: "Sửu", gio: "01:00-03:00", index: 1 },
//     // ...
//   ],
//   gioHoangDaoText: "Tý (23:00-01:00), Sửu (01:00-03:00)..."
// }

console.log('Giờ Hoàng Đạo hôm nay:');
console.log(gioHD.gioHoangDaoText);

// Hiển thị chi tiết
gioHD.gioHoangDao.forEach(g => {
  console.log(`  ${g.chi}: ${g.gio}`);
});
```

### Ví dụ: Kiểm tra giờ cụ thể

```javascript
// Kiểm tra 7h sáng có phải giờ Hoàng Đạo không
const jd = vnLunar.jdn(6, 11, 2025);
const gioHD = vnLunar.get_auspicious_hours(jd);

function isGioHoangDao(hour, gioHoangDao) {
  const chiIndex = Math.floor(((hour + 1) % 24) / 2);
  return gioHoangDao.gioHoangDao.some(g => g.index === chiIndex);
}

if (isGioHoangDao(7, gioHD)) {
  console.log('7h sáng là giờ Hoàng Đạo ✅');
} else {
  console.log('7h sáng KHÔNG phải giờ Hoàng Đạo ❌');
}
```

---

## Xem ngày cho việc cụ thể

vnLunar cung cấp hàm `check_good_day()` để xem ngày có tốt cho việc cụ thể không.

### Các loại việc hỗ trợ

- `"cuoi"`: Cưới hỏi, thành hôn
- `"xaynha"`: Xây nhà, khởi công xây dựng
- `"khaigiang"`: Khai trương, khai giảng
- `"dichuyển"`: Di chuyển, xuất hành

### Sử dụng

```javascript
const jd = vnLunar.jdn(6, 11, 2025);

// Xem ngày cưới
const ketQua = vnLunar.check_good_day(jd, 'cuoi');

console.log(ketQua);
// {
//   good: true,
//   reasons: [
//     "12 Sao: Mãn - Bình cho cưới hỏi",
//     "28 Tú: Giác - Ngôi sao tốt",
//     "Hoàng Đạo: Thanh Long"
//   ]
// }

if (ketQua.good) {
  console.log('✅ Ngày TỐT để cưới!');
  console.log('Lý do:');
  ketQua.reasons.forEach(ld => console.log('  - ' + ld));
} else {
  console.log('❌ KHÔNG nên cưới vào ngày này');
  console.log('Lý do:');
  ketQua.reasons.forEach(ld => console.log('  - ' + ld));
}
```

### Ví dụ đầy đủ

```javascript
const jd = vnLunar.jdn(6, 11, 2025);

console.log('===== XEM NGÀY 6/11/2025 =====\n');

const viec = ['cuoi', 'xaynha', 'khaigiang', 'dichuyển'];
viec.forEach(v => {
  const ketQua = vnLunar.check_good_day(jd, v);
  const icon = ketQua.good ? '✅' : '❌';
  console.log(`${icon} ${v.toUpperCase()}: ${ketQua.good ? 'Tốt' : 'Không tốt'}`);
  console.log('   ' + ketQua.reasons.join(', '));
  console.log('');
});
```

---

## Tìm ngày tốt

Hàm `find_good_days()` giúp tìm các ngày tốt cho việc cụ thể trong tháng.

### Sử dụng

```javascript
// Tìm 5 ngày tốt để cưới trong tháng 11/2025
const ngayTot = vnLunar.find_good_days(11, 2025, 'cuoi', 5);

console.log(`Tìm thấy ${ngayTot.length} ngày tốt để cưới:`);

ngayTot.forEach(ng => {
  console.log(`\n📅 ${ng.dd}/${ng.mm}/${ng.yyyy}`);
  console.log(`   Âm lịch: ${ng.lunar.day}/${ng.lunar.month}`);
  console.log(`   Lý do:`);
  ng.reasons.forEach(ld => console.log(`   - ${ld}`));
});
```

### Output mẫu

```
Tìm thấy 5 ngày tốt để cưới:

📅 3/11/2025
   Âm lịch: 5/10
   Lý do:
   - 12 Sao: Thành - Tốt cho cưới hỏi
   - 28 Tú: Khuê - Ngôi sao tốt
   - Hoàng Đạo: Minh Đường

📅 11/11/2025
   Âm lịch: 13/10
   Lý do:
   - 12 Sao: Khai - Tốt cho mọi việc
   ...
```

### Ví dụ: Tìm ngày cưới trong quý

```javascript
function findWeddingDays(startMonth, endMonth, year, maxDays = 10) {
  const allDays = [];
  
  for (let month = startMonth; month <= endMonth; month++) {
    const days = vnLunar.find_good_days(month, year, 'cuoi', maxDays);
    allDays.push(...days);
    
    if (allDays.length >= maxDays) break;
  }
  
  return allDays.slice(0, maxDays);
}

const weddingDays = findWeddingDays(10, 12, 2025, 10);
console.log('📋 Top 10 ngày tốt để cưới trong Quý 4/2025:');
console.table(weddingDays.map(d => ({
  'Ngày': `${d.dd}/${d.mm}/${d.yyyy}`,
  'Âm lịch': `${d.lunar.day}/${d.lunar.month}`,
  'Lý do': d.reasons[0]
})));
```

---

## Ví dụ tổng hợp

### App xem ngày hoàn chỉnh

```javascript
function viewDayApp(dd, mm, yyyy) {
  const jd = vnLunar.jdn(dd, mm, yyyy);
  const lunar = vnLunar.get_lunar_date(dd, mm, yyyy);
  const stars12 = vnLunar.get_12_stars(jd);
  const mansions28 = vnLunar.get_28_mansions(jd);
  const nayin = vnLunar.get_nayin(jd);
  const dayType = vnLunar.get_day_type(jd);
  const auspiciousHours = vnLunar.get_auspicious_hours(jd);
  
  console.log('╔════════════════════════════════════════╗');
  console.log('║       XEM NGÀY ÂM LỊCH VIỆT NAM       ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`📅 Dương lịch: ${dd}/${mm}/${yyyy}`);
  console.log(`🌙 Âm lịch: ${lunar.day}/${lunar.month}/${lunar.year}`);
  console.log('');
  console.log('─────────────────────────────────────────');
  console.log('🌟 12 SAO KIẾN TRỪ');
  console.log(`   ${stars12.name} - ${stars12.status}`);
  console.log(`   ${stars12.description}`);
  console.log('');
  console.log('⭐ 28 TÚ SAO');
  console.log(`   ${mansions28.name} (${mansions28.cung}) - ${mansions28.good ? 'Tốt' : 'Xấu'}`);
  console.log('');
  console.log('🎵 NẠP ÂM');
  console.log(`   ${nayin.name} (${nayin.element})`);
  console.log('');
  console.log('☀️ HOÀNG ĐẠO / HẮC ĐẠO');
  console.log(`   ${dayType.sao} - ${dayType.type}`);
  console.log('');
  console.log('⏰ GIỜ HOÀNG ĐẠO');
  console.log(`   ${auspiciousHours.gioHoangDaoText}`);
  console.log('');
  console.log('─────────────────────────────────────────');
  
  // Xem cho các việc
  const viec = [
    { key: 'cuoi', name: 'Cưới hỏi' },
    { key: 'xaynha', name: 'Xây nhà' },
    { key: 'khaigiang', name: 'Khai trương' }
  ];
  
  console.log('📋 ĐÁNH GIÁ:');
  viec.forEach(v => {
    const kq = vnLunar.check_good_day(jd, v.key);
    const icon = kq.good ? '✅' : '❌';
    console.log(`   ${icon} ${v.name}: ${kq.good ? 'Tốt' : 'Không tốt'}`);
  });
  
  console.log('');
  console.log('╚════════════════════════════════════════╝');
}

// Sử dụng
viewDayApp(6, 11, 2025);
```

---

**Xem thêm:**
- [API Reference](API.md)
- [Hướng dẫn Xuất hành](XUATHANH.md)
- [Hướng dẫn Can Chi](CANCHI.md)
