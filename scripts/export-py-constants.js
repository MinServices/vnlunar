/**
 * Sinh pyvnlunar/vnlunar/constants.py từ bản build TS (dist) để hai thư viện dùng chung một nguồn dữ liệu.
 * Chạy: npm run build && node scripts/export-py-constants.js
 */
const fs = require('fs');
const path = require('path');
const L = require('../dist/index.js');

const OUT = path.resolve(__dirname, '../../pyvnlunar/vnlunar/constants.py');

function py(value, indent = '') {
  if (value === null || value === undefined) return 'None';
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v !== 'object' || v === null)) {
      return '[' + value.map((v) => py(v)).join(', ') + ']';
    }
    const inner = indent + '    ';
    return '[\n' + value.map((v) => inner + py(v, inner)).join(',\n') + '\n' + indent + ']';
  }
  const entries = Object.entries(value);
  return '{' + entries.map(([k, v]) => `${JSON.stringify(k)}: ${py(v, indent)}`).join(', ') + '}';
}

function hexTable(name, arr, comment) {
  const rows = [];
  for (let i = 0; i < arr.length; i += 10) {
    rows.push('    ' + arr.slice(i, i + 10).map((v) => '0x' + v.toString(16)).join(', '));
  }
  return `# ${comment}\n${name} = [\n${rows.join(',\n')}\n]\n`;
}

// TK tables are not exported from index; read them from constants module directly
const C = require('../dist/constants.js');

const parts = [];
parts.push(`"""
Constants for Vietnamese Lunar Calendar
Các hằng số cho Âm lịch Việt Nam

FILE ĐƯỢC SINH TỰ ĐỘNG từ vnlunar-ts (scripts/export-py-constants.js) - không sửa tay.
Xem docs/DECISIONS.md trong vnlunar-ts cho quy ước tính toán.
"""

import math

# *** Mathematical Constants ***
PI = math.pi

# Julian day offset
JULIAN_DAY_OFFSET = 2415021

# Timezone for Vietnam (UTC+7)
TIMEZONE = 7.0

# Phạm vi bảng TK19..TK22
FIRST_DAY = ${C.FIRST_DAY}  # jdn(25, 1, 1800)
LAST_DAY = ${C.LAST_DAY}  # jdn(31, 12, 2199)
`);
parts.push(hexTable('TK19', C.TK19, 'Lunar calendar data 1800-1899 (Hồ Ngọc Đức)'));
parts.push(hexTable('TK20', C.TK20, 'Lunar calendar data 1900-1999'));
parts.push(hexTable('TK21', C.TK21, 'Lunar calendar data 2000-2099'));
parts.push(hexTable('TK22', C.TK22, 'Lunar calendar data 2100-2199'));

parts.push(`# Heavenly Stems (Can - Thiên Can)
CAN = ${py(L.CAN)}

# Earthly Branches (Chi - Địa Chi)
CHI = ${py(L.CHI)}

# Chinese Zodiac Animals (Con Giáp)
CHI_ANIMALS = ${py(L.CHI_ANIMALS)}

# Days of week
WEEKDAYS = ${py(L.WEEKDAYS)}

# Solar terms (Tiết khí), 0 = Xuân phân
SOLAR_TERMS = ${py(L.SOLAR_TERMS)}


# Five Elements (Ngũ Hành)
class ELEMENT:
    """Five Elements constants"""
    WATER = "Thủy"
    FIRE = "Hỏa"
    WOOD = "Mộc"
    METAL = "Kim"
    EARTH = "Thổ"


# Five Elements by Heavenly Stems
CAN_ELEMENTS = ${py(L.CAN_ELEMENTS)}

# Five Elements by Earthly Branches
CHI_ELEMENTS = ${py(L.CHI_ELEMENTS)}

# Auspicious hours by day branch (Giờ Hoàng Đạo)
AUSPICIOUS_HOURS = ${py(L.AUSPICIOUS_HOURS)}

# Thập Nhị Trực (tóm tắt): "Kiến Mãn Bình Thu hắc, Trừ Nguy Định Chấp hoàng,
# Thành Khai giai khả dụng, Bế Phá bất tương đương"
STARS_12 = ${py(L.STARS_12)}

# 12 Thần trực nhật (Hoàng Đạo / Hắc Đạo)
GODS_12 = ${py(L.GODS_12)}

# Thập Nhị Trực (chi tiết)
CONSTRUCTIONS_12 = ${py(L.CONSTRUCTIONS_12)}

# Nhị Thập Bát Tú (14 cát tú)
MANSIONS_28 = ${py(L.MANSIONS_28)}

# 30 Nạp Âm (mỗi Nạp Âm ứng với 2 Can Chi liên tiếp)
NAYIN_30 = ${py(L.NAYIN_30)}

# 60 Nạp Âm theo chỉ số Lục Thập Hoa Giáp (0 = Giáp Tý ... 59 = Quý Hợi)
NAYIN_60 = [name for name in NAYIN_30 for _ in range(2)]

# Direction names (8 hướng)
DIRECTIONS = ${py(L.DIRECTIONS)}

# Ngọc Hạp Thông Thư (hướng theo chi ngày) - THỰC NGHIỆM, chưa có nguồn đối chiếu
DIRECTION_MAP = ${py(L.DIRECTION_MAP)}

# Hướng Hỷ Thần, Tài Thần theo Can ngày (Giáp → Quý)
JOY_GOD_DIR = ${py(L.JOY_GOD_DIR)}
WEALTH_GOD_DIR = ${py(L.WEALTH_GOD_DIR)}
# Hướng Phúc Thần - CHƯA được đối chiếu nguồn
FORTUNE_GOD_DIR = ${py(L.FORTUNE_GOD_DIR)}

# Giờ xuất hành theo Lý Thuần Phong (theo chi ngày)
TRAVEL_HOURS_LY = ${py(Object.fromEntries(Object.entries(L.TRAVEL_HOURS_LY).map(([k, v]) => [k, v]))).replace(/"(\d+)":/g, '$1:')}
`);

fs.writeFileSync(OUT, parts.join('\n'), 'utf8');
console.log('Wrote', OUT);
