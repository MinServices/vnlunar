/**
 * Accuracy test suite (node --test) - so khớp với golden fixtures.
 * Chạy: npm run build && node --test tests/
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const L = require('../dist/index.js');

const fx = (name) => require(path.join(__dirname, 'fixtures', name));
const conversion = fx('conversion.json');
const nayin = fx('nayin.json');
const anchors = fx('anchors.json');
const solarTerms = fx('solar_terms.json');

test('FIRST_DAY / LAST_DAY đúng là 25/1/1800 và 31/12/2199', () => {
  assert.equal(L.FIRST_DAY, L.jdn(25, 1, 1800));
  assert.equal(L.LAST_DAY, L.jdn(31, 12, 2199));
  assert.equal(L.LAST_DAY, conversion.range.last_jd);
});

test('solar -> lunar khớp bảng HND cho mọi ngày 1800-2199', () => {
  const months = conversion.months;
  let checked = 0;
  for (let i = 0; i < months.length - 1; i++) {
    const [y, m, leap, start] = months[i];
    const end = months[i + 1][3];
    for (let jd = start; jd < end && jd <= L.LAST_DAY; jd++) {
      const [dd, mm, yy] = L.jdn2date(jd);
      const r = L.get_lunar_date(dd, mm, yy);
      if (r.year !== y || r.month !== m || r.leap !== leap || r.day !== jd - start + 1 || r.jd !== jd) {
        assert.fail(`${dd}/${mm}/${yy}: got ${r.day}/${r.month}${r.leap ? 'N' : ''}/${r.year}, ` +
          `expected ${jd - start + 1}/${m}${leap ? 'N' : ''}/${y}`);
      }
      checked++;
    }
  }
  assert.ok(checked > 140000, `checked ${checked} days`);
});

test('lunar -> solar round-trip cho mọi tháng trong bảng', () => {
  const months = conversion.months;
  for (let i = 0; i < months.length - 1; i++) {
    const [y, m, leap, start] = months[i];
    const len = months[i + 1][3] - start;
    for (const d of [1, len]) {
      const s = L.convert_lunar_to_solar(d, m, y, leap);
      assert.ok(s, `null for ${d}/${m}${leap ? 'N' : ''}/${y}`);
      assert.equal(L.jdn(s[0], s[1], s[2]), start + d - 1, `${d}/${m}${leap ? 'N' : ''}/${y}`);
    }
    if (len === 29) {
      assert.equal(L.convert_lunar_to_solar(30, m, y, leap), null, `30/${m}${leap ? 'N' : ''}/${y} không tồn tại`);
    }
  }
});

test('lunar -> solar trả null cho tháng nhuận không tồn tại', () => {
  assert.equal(L.convert_lunar_to_solar(1, 5, 2025, 1), null);
  assert.equal(L.convert_lunar_to_solar(1, 1, 2026, 1), null);
  assert.equal(L.convert_lunar_to_solar(0, 1, 2026), null);
  assert.equal(L.convert_lunar_to_solar(1, 13, 2026), null);
});

test('thuật toán thiên văn: ngày âm luôn trong 1..30 và khớp bảng 1968-2053 (UTC+7)', () => {
  const months = conversion.months;
  for (let i = 0; i < months.length - 1; i++) {
    const [y, m, leap, start] = months[i];
    const end = months[i + 1][3];
    for (let jd = start; jd < end; jd++) {
      const [dd, mm, yy] = L.jdn2date(jd);
      const r = L.convert_solar_to_lunar(dd, mm, yy, 7);
      assert.ok(r.day >= 1 && r.day <= 30, `${dd}/${mm}/${yy}: day=${r.day}`);
      if (yy >= 1968 && yy <= 2053) {
        assert.deepEqual([r.day, r.month, r.year, r.leap], [jd - start + 1, m, y, leap], `${dd}/${mm}/${yy}`);
      }
    }
  }
});

test('ngoài phạm vi bảng: dùng thuật toán thiên văn, không lỗi', () => {
  const r = L.get_lunar_date(1, 1, 2300);
  assert.ok(r.day >= 1 && r.day <= 30);
  const s = L.convert_lunar_to_solar(r.day, r.month, r.year, r.leap);
  assert.deepEqual(s, [1, 1, 2300]);
});

test('Nạp Âm đúng cho cả 60 Hoa Giáp', () => {
  assert.equal(L.NAYIN_60.length, 60);
  assert.equal(L.NAYIN_30.length, 30);
  for (const item of nayin.items) {
    const can = item.index % 10;
    const chi = item.index % 12;
    assert.equal(L.get_sexagenary_index(can, chi), item.index);
    const n = L.get_nayin_by_can_chi(can, chi);
    assert.equal(n.name, item.name, item.can_chi);
    assert.equal(n.element, item.element, item.can_chi);
    assert.equal(L.NAYIN_60[item.index], item.name);
  }
});

test('Nhị Thập Bát Tú: 14 cát tú, và Thất Diệu của Tú khớp thứ trong tuần', () => {
  const good = L.MANSIONS_28.filter((m) => m.good).map((m) => m.name);
  assert.deepEqual(good, ['Giác', 'Phòng', 'Vĩ', 'Cơ', 'Đẩu', 'Thất', 'Bích', 'Lâu', 'Vị', 'Tất', 'Sâm', 'Tỉnh', 'Trương', 'Chẩn']);
  // Thất Diệu của 28 Tú lặp theo tuần: Thứ Năm = Mộc (Giác, Đẩu, Khuê, Tỉnh)
  for (let jd = L.jdn(1, 1, 2025); jd < L.jdn(1, 1, 2026); jd++) {
    const m = L.get_28_mansions(jd);
    const wd = L.get_day_of_week(jd);
    const map = { 'Thứ năm': 'Mộc', 'Thứ sáu': 'Kim', 'Thứ bảy': 'Thổ', 'Chủ nhật': 'Nhật', 'Thứ hai': 'Nguyệt', 'Thứ ba': 'Hỏa', 'Thứ tư': 'Thủy' };
    assert.equal(m.element, map[wd], `jd ${jd} ${wd} ${m.name}`);
  }
});

test('anchor dates (lịch vạn niên đối chiếu)', () => {
  for (const a of anchors.anchors) {
    const [d, m, y] = a.solar;
    const tag = `${d}/${m}/${y}`;
    const info = L.getFullInfo(d, m, y);
    if (a.lunar) assert.deepEqual([info.lunar.day, info.lunar.month, info.lunar.year, info.lunar.leap], a.lunar, tag);
    if (a.day_can_chi) assert.equal(info.can_chi.day, a.day_can_chi, tag);
    if (a.month_can_chi) assert.equal(info.can_chi.month, a.month_can_chi, tag);
    if (a.year_can_chi) assert.equal(info.can_chi.year, a.year_can_chi, tag);
    if (a.weekday) assert.equal(info.solar.dayOfWeek.toLowerCase(), a.weekday.toLowerCase(), tag);
    if (a.truc) {
      assert.equal(info.stars_12.name, a.truc, tag);
      assert.equal(info.constructions_12.short_name, a.truc, tag);
    }
    if (a.god) assert.equal(info.gods_12.name, a.god, tag);
    if (a.day_type) assert.equal(info.day_type.type, a.day_type, tag);
    if (a.mansion) assert.equal(info.mansions_28.name, a.mansion, tag);
    if (a.nayin) assert.equal(info.nayin.name, a.nayin, tag);
    if (a.joy_god) assert.equal(info.god_directions.joy_god, a.joy_god, tag);
    if (a.wealth_god) assert.equal(info.god_directions.wealth_god, a.wealth_god, tag);
    const ages = info.conflicting_ages.conflicting_ages.map((x) => x.can_chi.replace('*', ''));
    if (a.conflicting_ages) assert.deepEqual(ages, a.conflicting_ages, tag);
    if (a.conflicting_ages_include) {
      for (const c of a.conflicting_ages_include) assert.ok(ages.includes(c), `${tag}: thiếu ${c} trong ${ages}`);
    }
  }
});

test('tùy chọn monthBasis đổi kết quả đúng hướng (15/1/2026)', () => {
  const jd = L.jdn(15, 1, 2026);
  assert.equal(L.get_12_stars(jd).name, 'Kiến');
  assert.equal(L.get_12_stars(jd, { trucBasis: 'lunar' }).name, 'Trừ');
  assert.equal(L.get_12_gods(jd).name, 'Thiên Đức');
  assert.equal(L.get_12_gods(jd, { godBasis: 'solar_term' }).name, 'Chu Tước');
});

test('chữ ký cũ get_12_stars(lunarDay, lunarMonth) báo lỗi rõ ràng', () => {
  assert.throws(() => L.get_12_stars(19, 9), TypeError);
});

test('ngày bắt đầu tiết khí', () => {
  for (const t of solarTerms.terms) {
    const [d, m, y] = t.solar;
    const jd = L.jdn(d, m, y);
    assert.equal(L.get_solar_term(jd).name, t.name, `${d}/${m}/${y}`);
    assert.notEqual(L.get_solar_term(jd - 1).name, t.name, `${d}/${m}/${y} phải là ngày đầu tiết`);
  }
});

test('Tứ Trụ: năm đổi tại Lập Xuân, giờ >= 23 sang ngày mới', () => {
  const p1 = L.get_four_pillars(8, 11, 2025, 10);
  assert.deepEqual([p1.year.can_chi, p1.month.can_chi, p1.day.can_chi, p1.hour.can_chi], ['Ất Tỵ', 'Đinh Hợi', 'Tân Tỵ', 'Quý Tỵ']);
  const p2 = L.get_four_pillars(2, 2, 2025, 12);
  assert.equal(p2.year.can_chi, 'Giáp Thìn');
  assert.equal(p2.month.can_chi, 'Đinh Sửu');
  const p3 = L.get_four_pillars(4, 2, 2025, 12);
  assert.equal(p3.year.can_chi, 'Ất Tỵ');
  assert.equal(p3.month.can_chi, 'Mậu Dần');
  const p4 = L.get_four_pillars(1, 2, 2025, 23, 30);
  assert.equal(p4.day_jd, L.jdn(2, 2, 2025));
  assert.equal(p4.hour.chi, 'Tý');
});

test('check_good_day yêu cầu Hoàng Đạo + Trực phù hợp', () => {
  for (let jd = L.jdn(1, 1, 2025); jd < L.jdn(1, 1, 2026); jd++) {
    const r = L.check_good_day(jd, 'wedding');
    if (r.good) {
      assert.equal(r.god.status, 'good');
      assert.ok(['Định', 'Thành', 'Khai'].includes(r.star.name));
    }
  }
  const days = L.find_good_days(11, 2025, 'opening');
  assert.ok(Array.isArray(days));
});
