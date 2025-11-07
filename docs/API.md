# API Reference - vnLunar

## Mục Lục

1. [Chuyển đổi lịch](#chuyển-đổi-lịch)
2. [Can Chi & Ngũ hành](#can-chi--ngũ-hành)
3. [12 Sao Kiến Trừ](#12-sao-kiến-trừ)
4. [28 Tú Sao](#28-tú-sao)
5. [60 Nạp Âm](#60-nạp-âm)
6. [Hoàng Đạo / Hắc Đạo](#hoàng-đạo--hắc-đạo)
7. [Giờ Hoàng Đạo](#giờ-hoàng-đạo)
8. [Ngọc Hạp Thông Thư](#ngọc-hạp-thông-thư)
9. [Hướng xuất hành](#hướng-xuất-hành)
10. [Giờ xuất hành Lý Thuần Phong](#giờ-xuất-hành-lý-thuần-phong)
11. [Kỵ tuổi](#kỵ-tuổi)
12. [Hàm tổng hợp](#hàm-tổng-hợp)

---

## Chuyển đổi lịch

### `jdn(dd, mm, yyyy)`

Tính Julian Day Number từ ngày Dương lịch.

**Parameters:**
- `dd` (Number): Ngày (1-31)
- `mm` (Number): Tháng (1-12)
- `yyyy` (Number): Năm (1800-2199)

**Returns:** (Number) Julian Day Number

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
console.log(jd); // 2460985
```

---

### `jdn2date(jd)`

Chuyển Julian Day Number về ngày Dương lịch.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Array) `[dd, mm, yyyy]`

**Example:**
```javascript
const date = vnLunar.jdn2date(2460985);
console.log(date); // [6, 11, 2025]
```

---

### `get_lunar_date(dd, mm, yyyy, timeZone = 7)`

Chuyển ngày Dương lịch sang Âm lịch.

**Parameters:**
- `dd` (Number): Ngày dương lịch
- `mm` (Number): Tháng dương lịch
- `yyyy` (Number): Năm dương lịch
- `timeZone` (Number, optional): Múi giờ (mặc định 7 cho Việt Nam)

**Returns:** (Object)
```javascript
{
  day: 8,        // Ngày âm
  month: 10,     // Tháng âm
  year: 2025,    // Năm âm
  leap: 0,       // 0 = tháng thường, 1 = tháng nhuận
  jd: 2460985    // Julian Day Number
}
```

**Example:**
```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
console.log(`${lunar.day}/${lunar.month}/${lunar.year}`); // "8/10/2025"
```

---

### `convert_solar_to_lunar(dd, mm, yyyy, timeZone = 7)`

Chuyển Dương lịch sang Âm lịch (alias của `get_lunar_date`).

**Parameters:**
- `dd` (Number): Ngày dương lịch
- `mm` (Number): Tháng dương lịch
- `yyyy` (Number): Năm dương lịch
- `timeZone` (Number, optional): Múi giờ (mặc định 7 cho Việt Nam)

**Returns:** (Object) `LunarDate`

---

### `get_month(mm, yyyy, timeZone = 7)`

Lấy tất cả ngày âm lịch trong tháng dương lịch.

**Parameters:**
- `mm` (Number): Tháng (1-12)
- `yyyy` (Number): Năm
- `timeZone` (Number): Múi giờ

**Returns:** (Array) Mảng các object ngày âm lịch

**Example:**
```javascript
const month = vnLunar.get_month(11, 2025);
console.log(`Tháng 11/2025 có ${month.length} ngày`);
```

---

## Can Chi & Ngũ hành

### `get_can_chi(lunar)`

Lấy Can Chi của ngày, tháng, năm.

**Parameters:**
- `lunar` (Object): Object từ `get_lunar_date()`

**Returns:** (Object) 
```javascript
{
  day: "Đinh Dậu",      // Can Chi ngày
  month: "Canh Tuất",   // Can Chi tháng
  year: "Ất Tỵ"         // Can Chi năm
}
```

**Example:**
```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const cc = vnLunar.get_can_chi(lunar);
console.log('Năm:', cc.year); // "Ất Tỵ"
console.log('Ngày:', cc.day); // "Đinh Dậu"
```

---

### `get_year_can_chi(year)`

Lấy Can Chi của năm.

**Parameters:**
- `year` (Number): Năm

**Returns:** (String) Can Chi năm

**Example:**
```javascript
const yearCC = vnLunar.get_year_can_chi(2025);
console.log(yearCC); // "Ất Tỵ"
```

---

### `get_hour_can(jdn)`

Lấy Can của giờ Tý (00:00) trong ngày.

**Parameters:**
- `jdn` (Number): Julian Day Number

**Returns:** (String) Can của giờ Tý

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const hourCan = vnLunar.get_hour_can(jd);
console.log(hourCan); // "Canh"
```

---

### `get_can_element(canIndex)`

Lấy Ngũ hành của Can.

**Parameters:**
- `canIndex` (Number): Index của Can (0-9)

**Returns:** (String) "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"

**Example:**
```javascript
const nh = vnLunar.get_can_element(0); // Can Giáp
console.log(nh); // "Mộc"
```

---

### `get_chi_element(chiIndex)`

Lấy Ngũ hành của Chi.

**Parameters:**
- `chiIndex` (Number): Index của Chi (0-11)

**Returns:** (String) "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"

---

### `get_year_element(year)`

Lấy Ngũ hành của năm.

**Parameters:**
- `year` (Number): Năm

**Returns:** (Object)
```javascript
{
  can: "Nhâm",
  chi: "Dần",
  animal: "Hổ",
  can_chi: "Nhâm Dần",
  name: "Nhâm Dần",
  element: "Thủy",
  can_element: "Thủy",
  chi_element: "Mộc"
}
```

---

### `get_element_relation(nguHanh1, nguHanh2)`

Xem quan hệ sinh khắc giữa 2 ngũ hành.

**Parameters:**
- `nguHanh1` (String): Ngũ hành 1
- `nguHanh2` (String): Ngũ hành 2

**Returns:** (String)
- `"sinh"`: Ngũ hành 1 sinh Ngũ hành 2
- `"khắc"`: Ngũ hành 1 khắc Ngũ hành 2
- `"bị khắc"`: Ngũ hành 1 bị Ngũ hành 2 khắc
- `"trung hòa"`: Hai ngũ hành giống nhau hoặc không có quan hệ

**Example:**
```javascript
const relation = vnLunar.get_element_relation("Thủy", "Mộc");
console.log(relation); // "sinh" (Thủy sinh Mộc)
```

---

### `get_auspicious_hours(jd)`

Lấy giờ Hoàng Đạo trong ngày.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (String) Chuỗi các giờ Hoàng Đạo

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const hours = vnLunar.get_auspicious_hours(jd);
console.log(hours); // "Tý (23-1h), Sửu (1-3h), ..."
```

---

### `get_day_of_week(jd)`

Lấy thứ trong tuần.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (String) Tên thứ trong tuần

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const dow = vnLunar.get_day_of_week(jd);
console.log(dow); // "Thứ Năm"
```

---

## 12 Sao Kiến Trừ

### `get_12_stars(lunarDay, lunarMonth)`

Lấy 12 sao Kiến Trừ của ngày.

**Parameters:**
- `lunarDay` (Number): Ngày âm lịch
- `lunarMonth` (Number): Tháng âm lịch

**Returns:** (Object)
```javascript
{
  name: "Mãn",
  status: "neutral",     // "good", "bad", "neutral"
  color: "yellow",
  description: "Mãn - Bình. Nên: gia cố, sửa chữa..."
}
```

**Example:**
```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const sao = vnLunar.get_12_stars(lunar.day, lunar.month);
console.log(sao.name + ' - ' + sao.status);
```

---

### `get_12_constructions(lunarDay, lunarMonth)`

Lấy 12 Trực (Thập Nhị Trực).

**Parameters:**
- `lunarDay` (Number): Ngày âm lịch
- `lunarMonth` (Number): Tháng âm lịch

**Returns:** (Object)
```javascript
{
  name: "Kiến",
  good_for: ["khởi công", "khai trương", "cưới hỏi"],
  bad_for: ["an táng", "nhập trạch"]
}
```

**Example:**
```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const truc = vnLunar.get_12_constructions(lunar.day, lunar.month);
console.log('12 Trực:', truc.name);
console.log('Tốt cho:', truc.good_for.join(', '));
```

---

### `get_12_gods(jd)`

Lấy 12 Thần (Hoàng Đạo / Hắc Đạo).

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  name: "Thanh Long",
  type: "auspicious",      // "auspicious" = Hoàng Đạo, "inauspicious" = Hắc Đạo
  status: "good",          // "good", "bad"
  description: "Thanh Long (Hoàng Đạo) - Tốt..."
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const than = vnLunar.get_12_gods(jd);
console.log(than.name + ' - ' + than.type);
```

---

## 28 Tú Sao

### `get_28_mansions(jd)`

Lấy 28 Tú Sao (Nhị Thập Bát Tú).

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  name: "Giác",
  animal: "Giao Long",
  element: "Mộc",
  good: true,              // true = tốt, false = xấu
  description: "Giác tú - Ngôi sao tốt..."
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const tu = vnLunar.get_28_mansions(jd);
console.log(tu.name + ' - ' + (tu.good ? 'Tốt' : 'Xấu'));
```

---

## 60 Nạp Âm

### `get_nayin(jd)`

Lấy Nạp Âm (60 âm thanh).

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  name: "Giản Hạ Thủy",
  element: "Thủy",
  can: "Bính",
  chi: "Tý"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const nayin = vnLunar.get_nayin(jd);
console.log(nayin.name); // "Giản Hạ Thủy"
```

---

## Hoàng Đạo / Hắc Đạo

### `get_day_type(lunarDay, lunarMonth)`

Xem ngày Hoàng Đạo / Hắc Đạo.

**Parameters:**
- `lunarDay` (Number): Ngày âm lịch
- `lunarMonth` (Number): Tháng âm lịch

**Returns:** (Object)
```javascript
{
  type: "Hoàng Đạo",     // "Hoàng Đạo", "Hắc Đạo"
  star: "Thành",
  good: true,            // true = tốt, false = xấu
  bad: false,
  desc: "Ngày Hoàng Đạo - Tốt, thuận lợi"
}
```

**Example:**
```javascript
const lunar = vnLunar.get_lunar_date(6, 11, 2025);
const dayType = vnLunar.get_day_type(lunar.day, lunar.month);
console.log(dayType.type); // "Hoàng Đạo" hoặc "Hắc Đạo"
```

---

## Giờ Hoàng Đạo

### `get_auspicious_hours(jd)`

Lấy giờ Hoàng Đạo trong ngày (dạng string format).

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (String) Chuỗi các giờ Hoàng Đạo

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const hours = vnLunar.get_auspicious_hours(jd);
console.log(hours); // "Tý (23-1h), Sửu (1-3h), ..."
```

---

## Ngọc Hạp Thông Thư

### `get_direction_info(jd)`

Xem hướng tốt xấu theo Ngọc Hạp Thông Thư.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  day_chi: "Dần",
  good: ["Tây", "Tây Nam", "Bắc"],
  bad: ["Đông", "Đông Nam", "Nam", "Đông Bắc", "Tây Bắc"],
  description: "Ngày Dần: Tốt hướng Tây-Tây Nam-Bắc...",
  good_text: "Tây, Tây Nam, Bắc",
  bad_text: "Đông, Đông Nam, Nam, Đông Bắc, Tây Bắc"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const ngocHap = vnLunar.get_direction_info(jd);
console.log('Hướng tốt:', ngocHap.good_text);
```

---

## Hướng xuất hành

### `get_age_direction(birth_year)`

Lấy hướng tốt xấu theo tuổi (12 con giáp).

**Parameters:**
- `birth_year` (Number): Năm sinh

**Returns:** (Object)
```javascript
{
  age_name: "Hợi (Lợn)",
  chi: "Hợi",
  birth_year: 1995,
  good_directions: ["Tây", "Tây Nam", "Đông Bắc"],
  bad_directions: ["Đông", "Đông Nam", "Nam", "Tây Bắc", "Bắc"],
  good_text: "Tây, Tây Nam, Đông Bắc",
  bad_text: "Đông, Đông Nam, Nam, Tây Bắc, Bắc"
}
```

**Example:**
```javascript
const ageDir = vnLunar.get_age_direction(1995);
console.log('Hướng tốt cho tuổi:', ageDir.good_text);
```

---

### `get_travel_direction(jd, birth_year)`

Tổng hợp hướng xuất hành (kết hợp ngày + tuổi).

**Parameters:**
- `jd` (Number): Julian Day Number
- `birth_year` (Number): Năm sinh

**Returns:** (Object)
```javascript
{
  by_day: { /* object từ get_direction_info */ },
  by_age: { /* object từ get_age_direction */ },
  common_good: ["Tây"],          // Hướng tốt cho cả ngày và tuổi
  should_avoid: ["Đông", "Nam"], // Hướng nên tránh
  common_good_text: "Tây",
  should_avoid_text: "Đông, Nam",
  advice: "Nên đi hướng: Tây"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const travel = vnLunar.get_travel_direction(jd, 1995);
console.log(travel.advice);
```

---

### `get_god_directions(jd)`

Lấy hướng Hỷ Thần, Tài Thần, Phúc Thần theo Can ngày.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  day_can: "Canh",
  joy_god: "Tây Nam",       // Hướng Hỷ Thần
  wealth_god: "Đông",       // Hướng Tài Thần
  fortune_god: "Tây Bắc",   // Hướng Phúc Thần
  description: "Hỷ Thần: Tây Nam, Tài Thần: Đông, Phúc Thần: Tây Bắc"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const gods = vnLunar.get_god_directions(jd);
console.log('Hướng Tài Thần:', gods.wealth_god);
```

---

## Giờ xuất hành Lý Thuần Phong

### `get_travel_hours(jd)`

Xem 6 giờ tốt và 6 giờ xấu theo Lý Thuần Phong.

**Parameters:**
- `jd` (Number): Julian Day Number

**Returns:** (Object)
```javascript
{
  day_chi: "Dần",
  good_hours: [
    { chi: "Tý", index: 0, period: "23h-1h", good: true },
    { chi: "Mùi", index: 7, period: "13h-15h", good: true },
    // ... (6 giờ)
  ],
  bad_hours: [
    { chi: "Sửu", index: 1, period: "1h-3h", good: false },
    // ... (6 giờ)
  ],
  good_text: "Tý (23h-1h), Mùi (13h-15h)...",
  bad_text: "Sửu (1h-3h)...",
  good_count: 6,
  bad_count: 6
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const hours = vnLunar.get_travel_hours(jd);
console.log('Giờ tốt:', hours.good_text);
```

---

### `check_travel_hour(jd, hour)`

Kiểm tra giờ cụ thể có tốt không.

**Parameters:**
- `jd` (Number): Julian Day Number
- `hour` (Number): Giờ (0-23)

**Returns:** (Object)
```javascript
{
  hour: 7,
  hour_chi: "Thìn",
  time_frame: "7h-9h",
  good: true,
  description: "Giờ Thìn (7h-9h) - TỐT để xuất hành"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const check = vnLunar.check_travel_hour(jd, 7);
console.log(check.description);
```

---

### `get_time_frame(chiIndex)`

Lấy khung giờ từ Địa Chi.

**Parameters:**
- `chiIndex` (Number): Index của Chi (0-11)

**Returns:** (String) "23h-1h"

**Example:**
```javascript
const frame = vnLunar.get_time_frame(0); // Giờ Tý
console.log(frame); // "23h-1h"
```

---

## Kỵ tuổi

### `get_conflicting_ages(jd, currentYear)`

Lấy các tuổi xung với ngày.

**Parameters:**
- `jd` (Number): Julian Day Number
- `currentYear` (Number): Năm hiện tại

**Returns:** (Object)
```javascript
{
  day_chi: "Dần",
  day_animal: "Hổ",
  conflict_chi: "Thân",
  conflict_animal: "Khỉ",
  description: "Ngày Dần (Hổ) xung với tuổi Thân (Khỉ)",
  conflicting_ages: [
    { year: 2004, can_chi: "Giáp Thân*", age: 21, chi: "Thân", animal: "Khỉ" },
    { year: 1992, can_chi: "Nhâm Thân", age: 33, chi: "Thân", animal: "Khỉ" },
    // ... (tối đa 5 tuổi)
  ],
  note: "Người tuổi Khỉ nên cẩn thận trong ngày này"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const conflicts = vnLunar.get_conflicting_ages(jd, 2025);
console.log(conflicts.description);
conflicts.conflicting_ages.forEach(age => {
  console.log(`${age.can_chi} (${age.age} tuổi)`);
});
```

---

### `check_age_conflict(year1, year2)`

Kiểm tra 2 tuổi có xung nhau không.

**Parameters:**
- `year1` (Number): Năm sinh thứ nhất
- `year2` (Number): Năm sinh thứ hai

**Returns:** (Object)
```javascript
{
  year1: 1990,
  year2: 1996,
  chi1: "Ngọ",
  animal1: "Ngựa",
  chi2: "Tý",
  animal2: "Chuột",
  xung: true,
  description: "Tuổi Ngựa và Chuột XÁ XUNG (kỵ)"
}
```

**Example:**
```javascript
const conflict = vnLunar.check_age_conflict(1990, 1996);
if (conflict.xung) {
  console.log(conflict.description);
}
```

---

## Hàm tổng hợp

### `getFullInfo(dd, mm, yyyy)`

Lấy tất cả thông tin của ngày.

**Parameters:**
- `dd` (Number): Ngày
- `mm` (Number): Tháng
- `yyyy` (Number): Năm

**Returns:** (Object) Object lớn chứa tất cả thông tin

**Example:**
```javascript
const info = vnLunar.getFullInfo(6, 11, 2025);

console.log('Dương lịch:', info.solar);
console.log('Âm lịch:', info.lunar);
console.log('Can Chi:', info.can_chi);
console.log('Ngũ hành:', info.elements);
console.log('12 Sao:', info.stars_12);
console.log('12 Trực:', info.constructions_12);
console.log('12 Thần:', info.gods_12);
console.log('28 Tú:', info.mansions_28);
console.log('Nạp Âm:', info.nayin);
console.log('Loại ngày:', info.day_type);
console.log('Kỵ tuổi:', info.conflicting_ages);
console.log('Hướng xuất hành:', info.directions);
console.log('Hướng Thần:', info.god_directions);
console.log('Giờ Hoàng Đạo:', info.auspicious_hours);
console.log('Tiết khí:', info.solar_term);
```

**Return Object Structure:**
```javascript
{
  solar: {
    day: 6,
    month: 11,
    year: 2025,
    dayOfWeek: "Thứ Năm"
  },
  lunar: {
    day: 8,
    month: 10,
    year: 2025,
    leap: 0,
    monthName: "Tháng 10"
  },
  can_chi: {
    day: "Đinh Dậu",
    month: "Canh Tuất",
    year: "Ất Tỵ"
  },
  elements: {
    day: {
      can: "Hỏa",
      chi: "Kim"
    },
    year: {
      can: "Ất",
      chi: "Tỵ",
      animal: "Rắn",
      can_chi: "Ất Tỵ",
      name: "Ất Tỵ",
      element: "Mộc",
      can_element: "Mộc",
      chi_element: "Hỏa"
    }
  },
  stars_12: { name: "...", status: "...", ... },
  constructions_12: { name: "...", good_for: [...], bad_for: [...] },
  gods_12: { name: "...", type: "...", status: "...", ... },
  mansions_28: { name: "...", animal: "...", good: true/false, ... },
  nayin: { name: "...", element: "...", ... },
  day_type: { type: "Hoàng Đạo"/"Hắc Đạo", good: true/false, ... },
  conflicting_ages: { day_chi: "...", conflicting_ages: [...], ... },
  directions: { day_chi: "...", good: [...], bad: [...], ... },
  god_directions: { joy_god: "...", wealth_god: "...", fortune_god: "...", ... },
  auspicious_hours: "Tý (23h-1h), Sửu (1h-3h), ...",
  solar_term: "Lập Đông",
  jd: 2460985
}
```

---

### `check_good_day(jd, activity)`

Xem ngày có tốt cho việc cụ thể không.

**Parameters:**
- `jd` (Number): Julian Day Number
- `activity` (String): Loại việc
  - `"cuoi"`: Cưới hỏi
  - `"xaynha"`: Xây nhà, khởi công
  - `"khaotruong"`: Khai trương, khai giảng
  - `"xuathanh"`: Di chuyển, xuất hành
  - `"chuyennha"`: Chuyển nhà
  - `"dautu"`: Đầu tư, kinh doanh

**Returns:** (Object)
```javascript
{
  star: { name: "Thành", status: "good", ... },
  activity: "cuoi",
  good: true,
  description: "Ngày Thành - TỐT cho cuoi"
}
```

**Example:**
```javascript
const jd = vnLunar.jdn(6, 11, 2025);
const check = vnLunar.check_good_day(jd, 'cuoi');
if (check.good) {
  console.log('Ngày này tốt để cưới hỏi');
}
```

---

### `find_good_days(month, year, activity)`

Tìm các ngày tốt trong tháng.

**Parameters:**
- `month` (Number): Tháng
- `year` (Number): Năm
- `activity` (String): Loại việc (giống `check_good_day`)

**Returns:** (Array) Mảng các ngày tốt

**Example:**
```javascript
const goodDays = vnLunar.find_good_days(11, 2025, 'cuoi');
console.log('Tìm thấy', goodDays.length, 'ngày tốt để cưới');

goodDays.forEach(day => {
  console.log(`${day.day}/${day.month}/${day.year} - ${day.sao.name}`);
});
```

**Return Array Item Structure:**
```javascript
{
  day: 6,
  month: 11,
  year: 2025,
  jd: 2460985,
  sao: { name: "Thành", status: "good", ... }
}
```

---

## Hằng số

### `CAN`
Mảng 10 Thiên Can:
```javascript
["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
```

### `CHI`
Mảng 12 Địa Chi:
```javascript
["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
```

### `CHI_ANIMALS`
Mảng 12 con giáp:
```javascript
["Chuột", "Trâu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"]
```

### `WEEKDAYS`
Mảng các ngày trong tuần:
```javascript
["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
```

### `SOLAR_TERMS`
Mảng 24 tiết khí:
```javascript
["Xuân phân", "Thanh minh", "Cốc vũ", ...]
```

### `ELEMENT`
Object các ngũ hành:
```javascript
{
  WATER: "Thủy",
  FIRE: "Hỏa",
  WOOD: "Mộc",
  METAL: "Kim",
  EARTH: "Thổ"
}
```

### `STARS_12`
Mảng 12 Sao Kiến Trừ với thông tin chi tiết

### `CONSTRUCTIONS_12`
Mảng 12 Trực (Thập Nhị Trực) với thông tin chi tiết

### `GODS_12`
Mảng 12 Thần (Hoàng Đạo / Hắc Đạo) với thông tin chi tiết

### `MANSIONS_28`
Mảng 28 Tú Sao với thông tin chi tiết

### `NAYIN_60`
Mảng 60 Nạp Âm với thông tin chi tiết

### `CAN_ELEMENTS`
Mảng ngũ hành của 10 Can

### `CHI_ELEMENTS`
Mảng ngũ hành của 12 Chi

### `DIRECTIONS`
Mảng 8 hướng:
```javascript
["Đông", "Tây", "Nam", "Bắc", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"]
```

### `JOY_GOD_DIR`
Mảng hướng Hỷ Thần theo 10 Can

### `WEALTH_GOD_DIR`
Mảng hướng Tài Thần theo 10 Can

### `FORTUNE_GOD_DIR`
Mảng hướng Phúc Thần theo 10 Can

---

## Lưu ý

1. **Julian Day Number (JDN)**: Tất cả các hàm nội bộ đều sử dụng JDN. Bạn có thể cache JDN để tăng hiệu năng.

2. **Timezone**: Mặc định là 7 (GMT+7) cho Việt Nam. Nếu cần timezone khác, truyền vào parameter `timeZone`.

3. **Năm hỗ trợ**: 1800-2199 (400 năm).

4. **Tháng nhuận**: Âm lịch có tháng nhuận. Kiểm tra field `leap` trong object `LunarDate`:
   - `leap = 0`: Tháng thường
   - `leap = 1`: Tháng nhuận

5. **Function names**: Tất cả function sử dụng snake_case (ví dụ: `get_lunar_date`, `check_good_day`).

6. **Property names**: 
   - Các property trong return object sử dụng snake_case (ví dụ: `day_chi`, `good_hours`, `birth_year`)
   - Một số property đặc biệt: `jd`, `day`, `month`, `year`, `good`, `bad`

7. **Performance**: 
   - Chuyển đổi: < 0.001ms
   - `getFullInfo()`: < 0.01ms

8. **TypeScript Support**: Library có đầy đủ type definitions trong `types.ts`.

---

**Xem thêm:**
- [Hướng dẫn Chuyển đổi lịch](CONVERSION.md)
- [Hướng dẫn Xem ngày](XEMNGAY.md)
- [Hướng dẫn Xuất hành](XUATHANH.md)
- [Hướng dẫn Can Chi](CANCHI.md)
