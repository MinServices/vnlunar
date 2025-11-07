# Hướng Dẫn Can Chi & Ngũ Hành

Hướng dẫn chi tiết về hệ thống Can Chi, Ngũ hành và Con giáp trong Âm lịch Việt Nam.

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [10 Thiên Can](#10-thiên-can)
3. [12 Địa Chi](#12-địa-chi)
4. [60 Can Chi](#60-can-chi)
5. [Ngũ hành](#ngũ-hành)
6. [12 Con giáp](#12-con-giáp)
7. [Ứng dụng thực tế](#ứng-dụng-thực-tế)

---

## Giới thiệu

**Can Chi** là hệ thống đếm thời gian truyền thống của Việt Nam và Trung Quốc, được dùng để đánh số:
- Năm
- Tháng
- Ngày
- Giờ

**Ngũ hành** (Kim - Mộc - Thủy - Hỏa - Thổ) là lý thuyết về 5 yếu tố cơ bản trong vũ trụ, có quan hệ **tương sinh** và **tương khắc**.

---

## 10 Thiên Can

### Danh sách

| Index | Tên    | Âm Dương | Ngũ hành |
|-------|--------|----------|----------|
| 0     | Giáp   | Dương    | Mộc      |
| 1     | Ất     | Âm       | Mộc      |
| 2     | Bính   | Dương    | Hỏa      |
| 3     | Đinh   | Âm       | Hỏa      |
| 4     | Mậu    | Dương    | Thổ      |
| 5     | Kỷ     | Âm       | Thổ      |
| 6     | Canh   | Dương    | Kim      |
| 7     | Tân    | Âm       | Kim      |
| 8     | Nhâm   | Dương    | Thủy     |
| 9     | Quý    | Âm       | Thủy     |

### Sử dụng

```javascript
// Lấy Can từ index
console.log(vnLunar.CAN[0]); // "Giáp"
console.log(vnLunar.CAN[9]); // "Quý"

// Lấy Ngũ hành của Can
const nh = vnLunar.get_can_element(0); // Giáp
console.log(nh); // "Mộc"

const nh2 = vnLunar.get_can_element(2); // Bính
console.log(nh2); // "Hỏa"
```

### Ý nghĩa

- **Dương Can** (Giáp, Bính, Mậu, Canh, Nhâm): Mạnh mẽ, chủ động
- **Âm Can** (Ất, Đinh, Kỷ, Tân, Quý): Dịu dàng, nội tâm

---

## 12 Địa Chi

### Danh sách

| Index | Tên    | Con giáp | Ngũ hành | Giờ          |
|-------|--------|----------|----------|--------------|
| 0     | Tý     | Chuột    | Thủy     | 23:00-01:00  |
| 1     | Sửu    | Trâu     | Thổ      | 01:00-03:00  |
| 2     | Dần    | Hổ       | Mộc      | 03:00-05:00  |
| 3     | Mão    | Mèo      | Mộc      | 05:00-07:00  |
| 4     | Thìn   | Rồng     | Thổ      | 07:00-09:00  |
| 5     | Tỵ     | Rắn      | Hỏa      | 09:00-11:00  |
| 6     | Ngọ    | Ngựa     | Hỏa      | 11:00-13:00  |
| 7     | Mùi    | Dê       | Thổ      | 13:00-15:00  |
| 8     | Thân   | Khỉ      | Kim      | 15:00-17:00  |
| 9     | Dậu    | Gà       | Kim      | 17:00-19:00  |
| 10    | Tuất   | Chó      | Thổ      | 19:00-21:00  |
| 11    | Hợi    | Lợn      | Thủy     | 21:00-23:00  |

### Sử dụng

```javascript
// Lấy Chi từ index
console.log(vnLunar.CHI[0]); // "Tý"
console.log(vnLunar.CHI[11]); // "Hợi"

// Lấy Ngũ hành của Chi
const nh = vnLunar.get_chi_element(0); // Tý
console.log(nh); // "Thủy"

const nh2 = vnLunar.get_chi_element(6); // Ngọ
console.log(nh2); // "Hỏa"

// Lấy khung giờ từ Chi
const gio = vnLunar.get_time_frame(0); // Tý
console.log(gio); // "23:00-01:00"
```

### Tuổi xung

Các Địa Chi **đối diện nhau** trên vòng tròn 12 Chi là **xung**:

| Chi     | Xung với |
|---------|----------|
| Tý      | Ngọ      |
| Sửu     | Mùi      |
| Dần     | Thân     |
| Mão     | Dậu      |
| Thìn    | Tuất     |
| Tỵ      | Hợi      |

```javascript
// Kiểm tra tuổi xung
const xung = vnLunar.get_conflicting_ages(0); // Tý
console.log(xung); // [6] (Ngọ ở index 6)

const xung2 = vnLunar.get_conflicting_ages(2); // Dần
console.log(xung2); // [8] (Thân ở index 8)
```

---

## 60 Can Chi

60 Can Chi là tổ hợp của **10 Can** × **12 Chi**.

### Chu kỳ 60 năm

Từ **Giáp Tý** (1984, 2044...) đến **Quý Hợi** (2043, 2103...).

### Sử dụng

```javascript
// Lấy Can Chi của năm
const cc2025 = vnLunar.get_year_can_chi(2025);
console.log(cc2025); // "Ất Tỵ"

const cc2026 = vnLunar.get_year_can_chi(2026);
console.log(cc2026); // "Bính Ngọ"

// Lấy Can Chi của ngày
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const cc = vnLunar.get_can_chi(lunar);

console.log('Năm:', vnLunar.CAN[cc[0]] + ' ' + vnLunar.CHI[cc[1]]);
console.log('Tháng:', vnLunar.CAN[cc[2]] + ' ' + vnLunar.CHI[cc[3]]);
console.log('Ngày:', vnLunar.CAN[cc[4]] + ' ' + vnLunar.CHI[cc[5]]);
```

### Ví dụ: Tìm năm theo Can Chi

```javascript
function findYearByCanChi(canChi, fromYear, toYear) {
  const years = [];
  
  for (let year = fromYear; year <= toYear; year++) {
    const cc = vnLunar.get_year_can_chi(year);
    if (cc === canChi) {
      years.push(year);
    }
  }
  
  return years;
}

const giapTy = findYearByCanChi('Giáp Tý', 1900, 2100);
console.log('Các năm Giáp Tý:', giapTy);
// [1924, 1984, 2044]
```

---

## Ngũ hành

Ngũ hành gồm 5 yếu tố: **Kim - Mộc - Thủy - Hỏa - Thổ**.

### Tương sinh (相生)

Kim → Thủy → Mộc → Hỏa → Thổ → Kim

- **Kim sinh Thủy**: Kim tan chảy thành nước
- **Thủy sinh Mộc**: Nước nuôi cây
- **Mộc sinh Hỏa**: Cây sinh ra lửa
- **Hỏa sinh Thổ**: Lửa tạo ra tro (đất)
- **Thổ sinh Kim**: Đất chứa kim loại

### Tương khắc (相克)

Kim → Mộc → Thổ → Thủy → Hỏa → Kim

- **Kim khắc Mộc**: Rìu chặt cây
- **Mộc khắc Thổ**: Rễ cây xuyên đất
- **Thổ khắc Thủy**: Đất ngăn nước
- **Thủy khắc Hỏa**: Nước dập lửa
- **Hỏa khắc Kim**: Lửa nấu chảy kim loại

### Sử dụng

```javascript
// Lấy Ngũ hành của năm
const nh = vnLunar.get_year_element(2025);
console.log(nh);
// {
//   nguHanh: "Thủy",
//   canChi: "Ất Tỵ"
// }

// Kiểm tra quan hệ sinh khắc
const rel = vnLunar.get_element_relation('Thủy', 'Mộc');
console.log(rel);
// {
//   relation: "sinh",
//   description: "Thủy sinh Mộc"
// }

const rel2 = vnLunar.get_element_relation('Thủy', 'Hỏa');
console.log(rel2);
// {
//   relation: "khac",
//   description: "Thủy khắc Hỏa"
// }
```

### Ứng dụng

**1. Xem hợp tuổi khi cưới**

```javascript
function checkMarriageCompatibility(year1, year2) {
  const nh1 = vnLunar.get_year_element(year1);
  const nh2 = vnLunar.get_year_element(year2);
  
  const relation = vnLunar.get_element_relation(nh1.element, nh2.element);
  
  console.log(`Tuổi 1: ${year1} (${nh1.canChi}) - ${nh1.element}`);
  console.log(`Tuổi 2: ${year2} (${nh2.canChi}) - ${nh2.element}`);
  console.log(`Quan hệ: ${relation.description}`);
  console.log('');
  
  if (relation.relation === 'sinh') {
    console.log('✅ HẾT SỨC TỐT! Tương sinh, hỗ trợ nhau.');
  } else if (relation.relation === 'tuongdong') {
    console.log('✅ TỐT! Cùng ngũ hành, hòa hợp.');
  } else if (relation.relation === 'khac') {
    console.log('❌ CẨN THẬN! Tương khắc, có thể xung đột.');
  } else if (relation.relation === 'bikhac') {
    console.log('⚠️ TRUNG BÌNH. Bị khắc, cần lưu ý.');
  } else {
    console.log('⚪ TRUNG LẬP. Không sinh không khắc.');
  }
}

checkMarriageCompatibility(1990, 1995);
```

**2. Chọn màu sắc theo ngũ hành**

```javascript
const MAU_SAC = {
  'Kim': ['Trắng', 'Vàng kim', 'Bạc'],
  'Mộc': ['Xanh lá', 'Xanh lục'],
  'Thủy': ['Đen', 'Xanh nước biển'],
  'Hỏa': ['Đỏ', 'Cam', 'Hồng'],
  'Thổ': ['Vàng', 'Nâu', 'Be']
};

function getColorByYear(year) {
  const nh = vnLunar.get_year_element(year);
  console.log(`Năm ${year} (${nh.canChi}) - Ngũ hành: ${nh.element}`);
  console.log(`Màu sắc hợp: ${MAU_SAC[nh.element].join(', ')}`);
}

getColorByYear(2025);
// Năm 2025 (Ất Tỵ) - Ngũ hành: Thủy
// Màu sắc hợp: Đen, Xanh nước biển
```

---

## 12 Con giáp

12 Con giáp tương ứng với 12 Địa Chi.

### Danh sách

| Index | Chi   | Con giáp | Tính cách (khái quát)        |
|-------|-------|----------|------------------------------|
| 0     | Tý    | Chuột    | Thông minh, linh hoạt        |
| 1     | Sửu   | Trâu     | Chăm chỉ, kiên nhẫn          |
| 2     | Dần   | Hổ       | Dũng cảm, quyết đoán         |
| 3     | Mão   | Mèo      | Nhẹ nhàng, tinh tế           |
| 4     | Thìn  | Rồng     | Uy quyền, may mắn            |
| 5     | Tỵ    | Rắn      | Thông thái, bí ẩn            |
| 6     | Ngọ   | Ngựa     | Năng động, tự do             |
| 7     | Mùi   | Dê       | Hiền lành, nghệ thuật        |
| 8     | Thân  | Khỉ      | Lanh lợi, sáng tạo           |
| 9     | Dậu   | Gà       | Cẩn thận, trung thực         |
| 10    | Tuất  | Chó      | Trung thành, chính trực      |
| 11    | Hợi   | Lợn      | Hào phóng, chân thành        |

### Lấy con giáp theo năm sinh

```javascript
function getConGiap(year) {
  const chiIndex = (year + 8) % 12;
  return vnLunar.CHI[chiIndex];
}

console.log('Năm 1990:', getConGiap(1990)); // Ngọ (Ngựa)
console.log('Năm 1995:', getConGiap(1995)); // Hợi (Lợn)
console.log('Năm 2000:', getConGiap(2000)); // Thìn (Rồng)
```

### Tuổi xung (Con giáp xung nhau)

| Con giáp | Xung với |
|----------|----------|
| Chuột    | Ngựa     |
| Trâu     | Dê       |
| Hổ       | Khỉ      |
| Mèo      | Gà       |
| Rồng     | Chó      |
| Rắn      | Lợn      |

```javascript
// Kiểm tra 2 con giáp xung nhau
const xung = vnLunar.check_age_conflict(1990, 1996);
console.log(xung);
// {
//   conflict: true,
//   chi1: "Ngọ",
//   chi2: "Tý",
//   description: "Ngọ (Ngựa) xung với Tý (Chuột)"
// }
```

---

## Ứng dụng thực tế

### 1. Xem tuổi tương hợp

```javascript
function xemTuoiTuongHop(year1, year2) {
  console.log('═══════════════════════════════════════');
  console.log('        XEM TUỔI TƯƠNG HỢP            ');
  console.log('═══════════════════════════════════════');
  console.log('');
  
  // Lấy thông tin
  const nh1 = vnLunar.get_year_element(year1);
  const nh2 = vnLunar.get_year_element(year2);
  const xung = vnLunar.check_age_conflict(year1, year2);
  const relation = vnLunar.get_element_relation(nh1.element, nh2.element);
  
  console.log(`👤 Tuổi 1: ${year1}`);
  console.log(`   Can Chi: ${nh1.can_chi}`);
  console.log(`   Ngũ hành: ${nh1.element}`);
  console.log('');
  
  console.log(`👤 Tuổi 2: ${year2}`);
  console.log(`   Can Chi: ${nh2.can_chi}`);
  console.log(`   Ngũ hành: ${nh2.element}`);
  console.log('');
  
  console.log('─────────────────────────────────────────');
  console.log('📊 ĐÁNH GIÁ:');
  console.log('');
  
  // Kiểm tra xung
  if (xung.conflict) {
    console.log('❌ TUỔI XUNG!');
    console.log(`   ${xung.description}`);
    console.log('   Không nên kết hôn hoặc làm ăn chung.');
  } else {
    console.log('✅ KHÔNG XUNG');
    console.log(`   ${xung.description}`);
  }
  
  console.log('');
  
  // Kiểm tra ngũ hành
  console.log('🌟 NGŨ HÀNH:');
  console.log(`   ${relation.description}`);
  
  if (relation.relation === 'sinh') {
    console.log('   ✅ Tương sinh - Hỗ trợ, giúp đỡ nhau.');
  } else if (relation.relation === 'tuongdong') {
    console.log('   ✅ Cùng ngũ hành - Đồng điệu, hòa hợp.');
  } else if (relation.relation === 'khac') {
    console.log('   ❌ Tương khắc - Có thể xung đột.');
  } else if (relation.relation === 'bikhac') {
    console.log('   ⚠️ Bị khắc - Cần lưu ý.');
  }
  
  console.log('');
  
  // Kết luận
  console.log('─────────────────────────────────────────');
  console.log('💡 KẾT LUẬN:');
  
  if (!xung.xung && (relation.relation === 'sinh' || relation.relation === 'tuongdong')) {
    console.log('   🌟 HẾT SỨC TỐT! Rất hợp nhau.');
  } else if (!xung.xung && relation.relation === 'neutral') {
    console.log('   ⚪ TRUNG BÌNH. Bình thường.');
  } else if (xung.xung || relation.relation === 'khac') {
    console.log('   ⚠️ CẦN CÂN NHẮC. Có nhiều thách thức.');
  }
  
  console.log('');
  console.log('═══════════════════════════════════════');
}

xemTuoiTuongHop(1990, 1995);
```

### 2. Tính Can Chi giờ sinh

```javascript
function get_can_chiGioSinh(dd, mm, yyyy, hour) {
  const jd = vnLunar.jdn(dd, mm, yyyy);
  const lunar = vnLunar.get_lunar_date(dd, mm, yyyy);
  const cc = vnLunar.get_can_chi(lunar);
  
  // Tính Chi giờ
  const chiGio = Math.floor(((hour + 1) % 24) / 2);
  
  // Tính Can giờ (phức tạp, dựa vào Can ngày)
  // Công thức: Can giờ = (Can ngày * 2 + Chi giờ) % 10
  const canGio = (cc[4] * 2 + chiGio) % 10;
  
  console.log(`📅 Ngày sinh: ${dd}/${mm}/${yyyy} ${hour}:00`);
  console.log(`🌙 Âm lịch: ${lunar.day}/${lunar.month}/${lunar.year}`);
  console.log('');
  console.log('🎋 CAN CHI:');
  console.log(`   Năm: ${vnLunar.CAN[cc[0]]} ${vnLunar.CHI[cc[1]]}`);
  console.log(`   Tháng: ${vnLunar.CAN[cc[2]]} ${vnLunar.CHI[cc[3]]}`);
  console.log(`   Ngày: ${vnLunar.CAN[cc[4]]} ${vnLunar.CHI[cc[5]]}`);
  console.log(`   Giờ: ${vnLunar.CAN[canGio]} ${vnLunar.CHI[chiGio]}`);
}

get_can_chiGioSinh(15, 8, 1990, 7);
```

### 3. Tìm ngày Can Chi trong tháng

```javascript
function findCanChiDays(mm, yyyy, canChi) {
  const days = vnLunar.getMonth(mm, yyyy);
  const result = [];
  
  days.forEach(d => {
    const lunar = vnLunar.get_lunar_date(d.dd, d.mm, d.yyyy);
    const cc = vnLunar.get_can_chi(lunar);
    
    const ccNgay = vnLunar.CAN[cc[4]] + ' ' + vnLunar.CHI[cc[5]];
    
    if (ccNgay === canChi) {
      result.push({
        date: `${d.dd}/${d.mm}/${d.yyyy}`,
        lunar: `${d.day}/${d.month}`,
        canChi: ccNgay
      });
    }
  });
  
  return result;
}

const giapTy = findCanChiDays(11, 2025, 'Giáp Tý');
console.log('Các ngày Giáp Tý trong tháng 11/2025:');
console.table(giapTy);
```

---

**Xem thêm:**
- [API Reference](API.md)
- [Hướng dẫn Xem ngày](XEMNGAY.md)
- [Hướng dẫn Xuất hành](XUATHANH.md)
