/**
 * Generate golden fixtures from independent sources.
 *
 *   node scripts/gen-fixtures.js
 *
 * - conversion.json : lunar month starts 1800-2199 decoded from Ho Ngoc Duc's
 *   original pre-computed tables (amlichjs/lib/amlich-hnd.js), NOT from our code.
 * - nayin.json      : 60 Jiazi -> Nayin (standard table).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HND_FILE = path.resolve(ROOT, '..', 'amlichjs', 'lib', 'amlich-hnd.js');
const OUT = path.join(ROOT, 'tests', 'fixtures');
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// 1. conversion.json from HND tables
// ---------------------------------------------------------------------------
const sandbox = { Date, Math, Array, document: { write() {} }, window: {}, location: { search: '' }, alert() {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(HND_FILE, 'utf8'), sandbox, { filename: 'amlich-hnd.js' });

const months = [];
for (let y = 1800; y <= 2199; y++) {
  for (const m of sandbox.getYearInfo(y)) {
    months.push([m.year, m.month, m.leap, m.jd]);
  }
}
// The month after the last entry of 2199 is needed to know the length of
// the last month; HND covers until jdn(31,12,2199).
const conversion = {
  source: 'Ho Ngoc Duc, amlich-hnd.js pre-computed tables TK19-TK22 (UTC+7)',
  range: { first_jd: sandbox.FIRST_DAY, last_jd: sandbox.LAST_DAY },
  columns: ['lunar_year', 'lunar_month', 'leap', 'jd_of_day_1'],
  months,
};
fs.writeFileSync(path.join(OUT, 'conversion.json'), JSON.stringify(conversion));
console.log(`conversion.json: ${months.length} lunar months`);

// ---------------------------------------------------------------------------
// 2. nayin.json - standard 60 Jiazi table (index 0 = Giáp Tý)
// ---------------------------------------------------------------------------
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const NAYIN_30 = [
  'Hải Trung Kim', 'Lư Trung Hỏa', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim',
  'Sơn Đầu Hỏa', 'Giản Hạ Thủy', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc',
  'Tuyền Trung Thủy', 'Ốc Thượng Thổ', 'Tích Lịch Hỏa', 'Tòng Bách Mộc', 'Trường Lưu Thủy',
  'Sa Trung Kim', 'Sơn Hạ Hỏa', 'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạc Kim',
  'Phúc Đăng Hỏa', 'Thiên Hà Thủy', 'Đại Trạch Thổ', 'Thoa Xuyến Kim', 'Tang Đố Mộc',
  'Đại Khê Thủy', 'Sa Trung Thổ', 'Thiên Thượng Hỏa', 'Thạch Lựu Mộc', 'Đại Hải Thủy',
];
const nayin = [];
for (let i = 0; i < 60; i++) {
  const name = NAYIN_30[Math.floor(i / 2)];
  nayin.push({ index: i, can_chi: `${CAN[i % 10]} ${CHI[i % 12]}`, name, element: name.split(' ').pop() });
}
fs.writeFileSync(path.join(OUT, 'nayin.json'), JSON.stringify({ source: 'Lục thập hoa giáp nạp âm (standard)', items: nayin }, null, 1));
console.log('nayin.json: 60 items');

// ---------------------------------------------------------------------------
// 3. Đồng bộ toàn bộ fixtures (kể cả anchors.json, solar_terms.json viết tay) sang pyvnlunar
// ---------------------------------------------------------------------------
const PY_OUT = path.resolve(ROOT, '..', 'pyvnlunar', 'tests', 'fixtures');
if (fs.existsSync(path.resolve(ROOT, '..', 'pyvnlunar'))) {
  fs.mkdirSync(PY_OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT).filter((n) => n.endsWith('.json'))) {
    fs.copyFileSync(path.join(OUT, f), path.join(PY_OUT, f));
  }
  console.log('synced fixtures ->', PY_OUT);
}
