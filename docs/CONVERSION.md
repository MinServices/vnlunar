# Hướng Dẫn Chuyển Đổi Lịch

Hướng dẫn chi tiết về chuyển đổi giữa Dương lịch và Âm lịch.

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Julian Day Number](#julian-day-number)
3. [Dương lịch → Âm lịch](#dương-lịch--âm-lịch)
4. [Âm lịch → Dương lịch](#âm-lịch--dương-lịch)
5. [Tháng nhuận](#tháng-nhuận)
6. [Xử lý tháng](#xử-lý-tháng)
7. [Timezone](#timezone)
8. [Ví dụ nâng cao](#ví-dụ-nâng-cao)

---

## Giới thiệu

vnLunar sử dụng thuật toán của **Hồ Ngọc Đức (2004)** để chuyển đổi chính xác giữa Dương lịch và Âm lịch Việt Nam.

### Phạm vi hỗ trợ
- **Năm**: 1800 - 2199 (400 năm)
- **Timezone**: Mặc định GMT+7 (Việt Nam)
- **Độ chính xác**: 100% với bảng tra của Viện Khí tượng Việt Nam

---

## Julian Day Number

Julian Day Number (JDN) là số ngày tính từ ngày 1/1/4713 BC. vnLunar sử dụng JDN làm giá trị trung gian.

### Tính JDN từ ngày Dương lịch

```javascript
const jd = vnLunar.jdn(6, 11, 2025);
console.log(jd); // 2460985
```

### Chuyển JDN về ngày Dương lịch

```javascript
const date = vnLunar.jdn2date(2460985);
console.log(date); // [6, 11, 2025]

// Hoặc destructure
const [dd, mm, yyyy] = vnLunar.jdn2date(2460985);
console.log(`${dd}/${mm}/${yyyy}`); // "6/11/2025"
```

### Tại sao dùng JDN?

1. **Hiệu quả**: Tính toán số học đơn giản
2. **Độc lập timezone**: Dễ chuyển đổi múi giờ
3. **Chuẩn quốc tế**: Được sử dụng rộng rãi trong thiên văn học

---

## Dương lịch → Âm lịch

### Cách 1: Sử dụng `get_lunar_date()`

```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);

console.log(lunar);
// {
//   day: 8,
//   month: 10,
//   year: 2025,
//   leap: false,
//   jd: 2460985
// }

console.log(`Âm lịch: ${lunar.day}/${lunar.month}/${lunar.year}`);
// "Âm lịch: 8/10/2025"
```

### Cách 2: Qua JDN (hiệu quả hơn khi cần tính nhiều thứ)

```javascript
// Bước 1: Tính JDN
const jd = vnLunar.jdn(6, 11, 2025);

// Bước 2: Chuyển JDN → Âm lịch (hàm nội bộ)
// Lưu ý: Cần dùng get_lunar_date() cho đơn giản
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
```

### Ví dụ chuyển đổi nhiều ngày

```javascript
// Chuyển tất cả ngày trong tuần
const week = [];
for (let i = 0; i < 7; i++) {
  const date = new Date(2025, 10, 6 + i); // Tháng 11 (index 10)
  const lunar = vnLunar.get_lunar_date(
    date.getDate(),
    date.get_month() + 1,
    date.getFullYear()
  );
  
  week.push({
    solar: `${date.getDate()}/${date.get_month() + 1}`,
    lunar: `${lunar.day}/${lunar.month}`
  });
}

console.table(week);
// ┌─────────┬──────────┬──────────┐
// │ (index) │  solar   │  lunar   │
// ├─────────┼──────────┼──────────┤
// │    0    │ '6/11'   │ '8/10'   │
// │    1    │ '7/11'   │ '9/10'   │
// │    2    │ '8/11'   │ '10/10'  │
// │   ...   │   ...    │   ...    │
// └─────────┴──────────┴──────────┘
```

---

## Âm lịch → Dương lịch

### Chuyển đổi cơ bản

```javascript
const solar = vnLunar.get_solar_date(8, 10, 2025);

console.log(solar);
// {
//   day: 6,
//   month: 11,
//   year: 2025,
//   jd: 2460985
// }

console.log(`Dương lịch: ${solar.day}/${solar.month}/${solar.year}`);
// "Dương lịch: 6/11/2025"
```

### Xử lý tháng nhuận

```javascript
// Tháng nhuận 4 năm 2023
const solar = vnLunar.get_solar_date(
  1,        // Ngày 1
  4,        // Tháng 4
  2023,     // Năm 2023
  true      // Tháng nhuận
);

console.log(`${solar.day}/${solar.month}/${solar.year}`);
// Kết quả: Ngày dương lịch tương ứng với mùng 1 tháng 4 nhuận
```

### Kiểm tra tháng nhuận

```javascript
// Kiểm tra xem tháng có phải nhuận không
const lunar = vnLunar.get_lunar_date(20, 5, 2023);

if (lunar.leap) {
  console.log('Tháng nhuận!');
} else {
  console.log('Tháng thường');
}
```

---

## Tháng nhuận

### Tháng nhuận là gì?

Âm lịch có 354-355 ngày/năm, ngắn hơn năm dương lịch (365-366 ngày). Để đồng bộ, mỗi 2-3 năm sẽ có 1 **tháng nhuận** (tháng thứ 13).

### Năm có tháng nhuận

```javascript
function getLeapMonth(year) {
  for (let month = 1; month <= 12; month++) {
    const lunar = vnLunar.get_solar_date(1, month, year, false);
    const lunarLeap = vnLunar.get_solar_date(1, month, year, true);
    
    // Nếu tháng nhuận khác tháng thường
    if (lunar.jd !== lunarLeap.jd) {
      return month;
    }
  }
  return null;
}

console.log('Năm 2023 có tháng nhuận:', getLeapMonth(2023)); // Tháng 2
console.log('Năm 2025 có tháng nhuận:', getLeapMonth(2025)); // null
```

### Danh sách năm nhuận gần đây

| Năm  | Tháng nhuận |
|------|-------------|
| 2020 | 4           |
| 2023 | 2           |
| 2025 | -           |
| 2028 | 5           |
| 2031 | 3           |

---

## Xử lý tháng

### Lấy tất cả ngày trong tháng

```javascript
const month = vnLunar.get_month(11, 2025);

console.log(`Tháng 11/2025 có ${month.length} ngày`);

// In ngày đầu và cuối
console.log('Ngày đầu:', month[0]);
console.log('Ngày cuối:', month[month.length - 1]);

// Đếm ngày mùng 1
let count = 0;
month.forEach(day => {
  if (day.day === 1) count++;
});
console.log(`Có ${count} ngày mùng 1 trong tháng`);
```

### Tìm ngày Rằm (15) và 30

```javascript
const month = vnLunar.get_month(11, 2025);

const ngayRam = month.filter(d => d.day === 15);
const ngay30 = month.filter(d => d.day === 30);

console.log('Các ngày Rằm:');
ngayRam.forEach(d => {
  console.log(`  ${d.dd}/${d.mm} - ${d.day}/${d.month}/${d.year}`);
});

console.log('Các ngày 30:');
ngay30.forEach(d => {
  console.log(`  ${d.dd}/${d.mm} - ${d.day}/${d.month}/${d.year}`);
});
```

### Tìm Tết Nguyên Đán

```javascript
function getTetDate(year) {
  const solar = vnLunar.get_solar_date(1, 1, year);
  return `${solar.day}/${solar.month}/${solar.year}`;
}

console.log('Tết 2025:', getTetDate(2025)); // "29/1/2025"
console.log('Tết 2026:', getTetDate(2026)); // "17/2/2026"
console.log('Tết 2027:', getTetDate(2027)); // "6/2/2027"
```

---

## Timezone

### Timezone mặc định

vnLunar mặc định sử dụng **GMT+7** (Việt Nam, Lào, Thái Lan).

```javascript
// Mặc định GMT+7
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
```

### Sử dụng timezone khác

```javascript
// GMT+8 (Trung Quốc, Singapore)
const lunar = vnLunar.get_lunar_date(6, 11, 2025, 8);

// GMT (UTC)
const lunar = vnLunar.get_lunar_date(6, 11, 2025, 0);
```

### Lưu ý về timezone

- Timezone khác nhau có thể cho **kết quả âm lịch khác nhau**
- Ví dụ: 23h ở GMT+7 có thể là ngày hôm sau ở GMT+8
- Luôn sử dụng **cùng 1 timezone** trong toàn bộ ứng dụng

```javascript
// Ví dụ: Cùng 1 thời điểm nhưng khác timezone
const date = new Date('2025-11-06T23:30:00+07:00');

const lunar7 = vnLunar.get_lunar_date(6, 11, 2025, 7);  // 23:30 GMT+7
const lunar8 = vnLunar.get_lunar_date(7, 11, 2025, 8);  // 00:30 GMT+8 (ngày hôm sau)

console.log('GMT+7:', lunar7.day + '/' + lunar7.month);
console.log('GMT+8:', lunar8.day + '/' + lunar8.month);
```

---

## Ví dụ nâng cao

### Tạo lịch âm 1 tháng

```javascript
function createLunarCalendar(month, year) {
  const days = vnLunar.get_month(month, year);
  
  // Group by week
  const weeks = [];
  let week = [];
  
  days.forEach(d => {
    const dayOfWeek = new Date(d.yyyy, d.mm - 1, d.dd).getDay();
    
    if (dayOfWeek === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    
    week.push({
      solar: `${d.dd}/${d.mm}`,
      lunar: `${d.day}/${d.month}`,
      dayOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][dayOfWeek]
    });
  });
  
  if (week.length > 0) weeks.push(week);
  
  return weeks;
}

const calendar = createLunarCalendar(11, 2025);
console.log('Lịch tháng 11/2025:');
calendar.forEach((week, i) => {
  console.log(`Tuần ${i + 1}:`);
  console.table(week);
});
```

### Tìm sinh nhật âm lịch hàng năm

```javascript
function findLunarBirthday(lunarDay, lunarMonth, year) {
  const solar = vnLunar.get_solar_date(lunarDay, lunarMonth, year);
  return `${solar.day}/${solar.month}/${solar.year}`;
}

// Ví dụ: Sinh nhật âm lịch 15/8
console.log('Sinh nhật âm lịch 15/8:');
for (let year = 2025; year <= 2030; year++) {
  const birthday = findLunarBirthday(15, 8, year);
  console.log(`  Năm ${year}: ${birthday}`);
}
```

### So sánh 2 ngày âm lịch

```javascript
function compareLunarDates(dd1, mm1, yyyy1, dd2, mm2, yyyy2) {
  const jd1 = vnLunar.get_lunar_date(dd1, mm1, yyyy1).jd;
  const jd2 = vnLunar.get_lunar_date(dd2, mm2, yyyy2).jd;
  
  const diff = jd2 - jd1;
  
  return {
    diff: diff,
    message: diff === 0 ? 'Cùng ngày' : 
             diff > 0 ? `Ngày 2 sau ngày 1 ${diff} ngày` :
                        `Ngày 2 trước ngày 1 ${-diff} ngày`
  };
}

const result = compareLunarDates(1, 1, 2025, 15, 1, 2025);
console.log(result.message); // "Ngày 2 sau ngày 1 14 ngày"
```

### Tính tuổi theo âm lịch

```javascript
function getLunarAge(birthDD, birthMM, birthYYYY, currentDD, currentMM, currentYYYY) {
  const birthLunar = vnLunar.get_lunar_date(birthDD, birthMM, birthYYYY);
  const currentLunar = vnLunar.get_lunar_date(currentDD, currentMM, currentYYYY);
  
  let age = currentLunar.year - birthLunar.year;
  
  // Chưa qua sinh nhật âm lịch trong năm
  if (currentLunar.month < birthLunar.month ||
      (currentLunar.month === birthLunar.month && currentLunar.day < birthLunar.day)) {
    age--;
  }
  
  return age;
}

const age = getLunarAge(15, 8, 1990, 6, 11, 2025);
console.log('Tuổi theo âm lịch:', age);
```

---

## Performance Tips

### 1. Cache JDN nếu cần tính nhiều thứ

```javascript
// ❌ Tính JDN nhiều lần (chậm)
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const sao = vnLunar.get_12_stars(vnLunar.jdn(6, 11, 2025));
const tu = vnLunar.get_28_mansions(vnLunar.jdn(6, 11, 2025));

// ✅ Cache JDN (nhanh)
const jd = vnLunar.jdn(6, 11, 2025);
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const sao = vnLunar.get_12_stars(jd);
const tu = vnLunar.get_28_mansions(jd);
```

### 2. Sử dụng getFullInfo() cho nhiều thông tin

```javascript
// ❌ Gọi nhiều lần (chậm)
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const jd = vnLunar.jdn(6, 11, 2025);
const sao = vnLunar.get_12_stars(jd);
const tu = vnLunar.get_28_mansions(jd);

// ✅ Gọi 1 lần (nhanh)
const info = vnLunar.getFullInfo(6, 11, 2025);
// info.lunar, info.stars_12, info.mansions_28, ...
```

---

**Xem thêm:**
- [API Reference](API.md)
- [Hướng dẫn Xem ngày](XEMNGAY.md)
- [Hướng dẫn Can Chi](CANCHI.md)
