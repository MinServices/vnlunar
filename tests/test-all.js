/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    TEST TỔNG HỢP - VNLUNAR LIBRARY V2                     ║
 * ║                    Vietnamese Lunar Calendar Library                      ║
 * ║                          TypeScript Version                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * File test cho thư viện vnLunar v2.0 (TypeScript)
 * Bao gồm:
 *   1. Chuyển đổi Dương lịch <-> Âm lịch
 *   2. Can Chi (Thiên Can, Địa Chi)
 *   3. 12 Sao Kiến Trừ
 *   4. 12 Thần (Hoàng Đạo/Hắc Đạo)
 *   5. Thập Nhị Trực
 *   6. 28 Tú Sao
 *   7. 60 Nạp Âm
 *   8. Ngũ Hành
 *   9. Tuổi Xung
 *   10. Hướng xuất hành (Ngọc Hạp Thông Thư)
 *   11. Hướng Thần Tài, Hỷ Thần, Phúc Thần
 *   12. Hướng xuất hành theo tuổi
 *   13. Giờ xuất hành theo Lý Thuần Phong
 *   14. Tìm ngày tốt
 */

const vnLunar = require('../dist/index.js');

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

let testCount = 0;
let passCount = 0;

function assert(condition, message) {
    testCount++;
    if (condition) {
        passCount++;
        console.log('  ✓ ' + message);
    } else {
        console.log('  ✗ FAILED: ' + message);
    }
}

function section(title) {
    console.log('\n' + '═'.repeat(80));
    console.log('  ' + title);
    console.log('═'.repeat(80) + '\n');
}

function subsection(title) {
    console.log('\n─── ' + title + ' ' + '─'.repeat(80 - title.length - 5) + '\n');
}

// ============================================================================
// TEST DATA
// ============================================================================

const testDate = { day: 6, month: 11, year: 2025 };

console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                    TEST TỔNG HỢP - VNLUNAR LIBRARY V2                     ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝');
console.log('\n🗓️  Ngày test: ' + testDate.day + '/' + testDate.month + '/' + testDate.year);

// ============================================================================
// 1. CHUYỂN ĐỔI DƯƠNG LỊCH <-> ÂM LỊCH
// ============================================================================

section('1. CHUYỂN ĐỔI DƯƠNG LỊCH <-> ÂM LỊCH');

subsection('Julian Day Number');
const jd = vnLunar.jdn(testDate.day, testDate.month, testDate.year);
console.log('  JDN: ' + jd);
assert(jd === 2460986, 'JDN cho ngày 6/11/2025 phải là 2460986');

subsection('Chuyển Dương -> Âm');
const lunar = vnLunar.get_lunar_date(testDate.day, testDate.month, testDate.year);
console.log('  Dương lịch: ' + testDate.day + '/' + testDate.month + '/' + testDate.year);
console.log('  Âm lịch: ' + lunar.day + '/' + lunar.month + '/' + lunar.year);
console.log('  Tháng nhuận: ' + (lunar.leap === 1 ? 'Có' : 'Không'));
console.log('  JDN: ' + lunar.jd);

assert(lunar.day === 17, 'Ngày âm lịch phải là 17');
assert(lunar.month === 9, 'Tháng âm lịch phải là 9');
assert(lunar.year === 2025, 'Năm âm lịch phải là 2025');
assert(lunar.leap === 0, 'Không phải tháng nhuận');

subsection('Chuyển Âm -> Dương');
const solarArray = vnLunar.jdn2date(jd);
console.log('  Âm lịch: ' + lunar.day + '/' + lunar.month + '/' + lunar.year);
console.log('  Dương lịch: ' + solarArray[0] + '/' + solarArray[1] + '/' + solarArray[2]);

assert(solarArray[0] === testDate.day, 'Chuyển ngược lại phải trả về ngày ban đầu');
assert(solarArray[1] === testDate.month, 'Chuyển ngược lại phải trả về tháng ban đầu');
assert(solarArray[2] === testDate.year, 'Chuyển ngược lại phải trả về năm ban đầu');

// ============================================================================
// 2. CAN CHI (THIÊN CAN, ĐỊA CHI)
// ============================================================================

section('2. CAN CHI (THIÊN CAN, ĐỊA CHI)');

subsection('Can Chi Ngày, Tháng, Năm');
const canChi = vnLunar.get_can_chi(lunar);
console.log('  Can Chi Ngày: ' + canChi.day);
console.log('  Can Chi Tháng: ' + canChi.month);
console.log('  Can Chi Năm: ' + canChi.year);

assert(canChi.day === 'Kỷ Mão', 'Can Chi Ngày phải là Kỷ Mão');
assert(canChi.month.length > 0, 'Can Chi Tháng phải có giá trị');
assert(canChi.year.length > 0, 'Can Chi Năm phải có giá trị');

subsection('Con giáp năm');
const yearElement = vnLunar.get_year_element(lunar.year);
console.log('  Năm: ' + yearElement.can_chi);
console.log('  Con giáp: ' + yearElement.animal);
console.log('  Ngũ hành Can: ' + yearElement.can_element);
console.log('  Ngũ hành Chi: ' + yearElement.chi_element);
assert(yearElement.animal.length > 0, 'Con giáp phải có giá trị');

// ============================================================================
// 3. 12 SAO KIẾN TRỪ
// ============================================================================

section('3. 12 SAO KIẾN TRỪ (12 Day Officers)');

const stars12 = vnLunar.get_12_stars(jd);
console.log('  Sao: ' + stars12.name);
console.log('  Trạng thái: ' + stars12.status);
console.log('  Màu: ' + stars12.color);
console.log('  Mô tả: ' + stars12.description);

assert(stars12.name.length > 0, '12 Sao phải có tên');
assert(['good', 'bad', 'neutral'].indexOf(stars12.status) >= 0, 'Trạng thái phải là good/bad/neutral');

// ============================================================================
// 4. 12 THẦN (HOÀNG ĐẠO / HẮC ĐẠO)
// ============================================================================

section('4. 12 THẦN (HOÀNG ĐẠO / HẮC ĐẠO)');

const gods12 = vnLunar.get_12_gods(jd);
console.log('  Thần: ' + gods12.name);
console.log('  Loại: ' + gods12.type);
console.log('  Trạng thái: ' + gods12.status);
console.log('  Mô tả: ' + gods12.description);

assert(gods12.name.length > 0, '12 Thần phải có tên');
assert(['auspicious', 'inauspicious'].indexOf(gods12.type) >= 0, 'Loại phải là auspicious/inauspicious');

// ============================================================================
// 5. THẬP NHỊ TRỰC (12 DAY CONSTRUCTION)
// ============================================================================

section('5. THẬP NHỊ TRỰC (12 Day Construction)');

const constructions = vnLunar.get_12_constructions(jd);
console.log('  Trực: ' + constructions.name);
console.log('  Tốt cho: ' + constructions.good_for.join(', '));
console.log('  Xấu cho: ' + constructions.bad_for.join(', '));

assert(constructions.name.length > 0, 'Thập Nhị Trực phải có tên');
assert(Array.isArray(constructions.good_for), 'good_for phải là mảng');
assert(Array.isArray(constructions.bad_for), 'bad_for phải là mảng');

// ============================================================================
// 6. 28 TÚ SAO
// ============================================================================

section('6. 28 TÚ SAO (28 Lunar Mansions)');

const mansions28 = vnLunar.get_28_mansions(jd);
console.log('  Tú: ' + mansions28.name);
console.log('  Động vật: ' + mansions28.animal);
console.log('  Ngũ hành: ' + mansions28.element);
console.log('  Tốt: ' + (mansions28.good ? 'Có' : 'Không'));
console.log('  Mô tả: ' + mansions28.description);

assert(mansions28.name.length > 0, '28 Tú Sao phải có tên');
assert(mansions28.animal.length > 0, '28 Tú Sao phải có động vật');

// ============================================================================
// 7. 60 NẠP ÂM
// ============================================================================

section('7. 60 NẠP ÂM (Nayin - 60 Elements)');

const nayin = vnLunar.get_nayin(jd);
console.log('  Nạp Âm: ' + nayin.name);
console.log('  Ngũ hành: ' + nayin.element);
console.log('  Can: ' + nayin.can);
console.log('  Chi: ' + nayin.chi);

assert(nayin.name.length > 0, 'Nạp Âm phải có tên');
assert(nayin.element.length > 0, 'Nạp Âm phải có ngũ hành');

subsection('Kiểm tra vòng 60 Nạp Âm');
const napAmList = [];
const seen = {};
for (let i = 0; i < 60; i++) {
    const jd2 = jd + i;
    const na = vnLunar.get_nayin(jd2);
    if (!seen[na.name]) {
        seen[na.name] = true;
        napAmList.push(na.name);
    }
}
console.log('  Tổng số Nạp Âm khác nhau trong 60 ngày: ' + napAmList.length);
assert(napAmList.length === 30, '60 ngày phải có 30 Nạp Âm khác nhau');

// ============================================================================
// 8. NGŨ HÀNH (FIVE ELEMENTS)
// ============================================================================

section('8. NGŨ HÀNH (FIVE ELEMENTS)');

subsection('Ngũ Hành Ngày');
const canNgay = (jd + 9) % 10;
const chiNgay = (jd + 1) % 12;
const canElement = vnLunar.get_can_element(canNgay);
const chiElement = vnLunar.get_chi_element(chiNgay);

console.log('  Ngũ hành Can: ' + canElement);
console.log('  Ngũ hành Chi: ' + chiElement);

assert(canElement.length > 0, 'Ngũ hành Can phải có giá trị');
assert(chiElement.length > 0, 'Ngũ hành Chi phải có giá trị');

subsection('Quan hệ Ngũ Hành');
const relation = vnLunar.get_element_relation(canElement, chiElement);
console.log('  Quan hệ ' + canElement + ' - ' + chiElement + ': ' + relation);
assert(relation.length > 0, 'Quan hệ Ngũ Hành phải có giá trị');

// ============================================================================
// 9. LOẠI NGÀY (HOÀNG ĐẠO / HẮC ĐẠO)
// ============================================================================

section('9. LOẠI NGÀY (HOÀNG ĐẠO / HẮC ĐẠO)');

const dayType = vnLunar.get_day_type(jd);
console.log('  Loại ngày: ' + dayType.type);
console.log('  Sao: ' + dayType.star);
console.log('  Tốt: ' + (dayType.good ? 'Có' : 'Không'));
console.log('  Xấu: ' + (dayType.bad ? 'Có' : 'Không'));
console.log('  Mô tả: ' + dayType.desc);

assert(['Hoàng Đạo', 'Hắc Đạo'].indexOf(dayType.type) >= 0, 'Loại ngày phải là Hoàng Đạo hoặc Hắc Đạo');

// ============================================================================
// 10. TUỔI XUNG
// ============================================================================

section('10. TUỔI XUNG (CONFLICTING AGES)');

const conflictingAges = vnLunar.get_conflicting_ages(jd, testDate.year);
console.log('  Chi ngày: ' + conflictingAges.day_chi + ' (' + conflictingAges.day_animal + ')');
console.log('  Chi xung: ' + conflictingAges.conflict_chi + ' (' + conflictingAges.conflict_animal + ')');
console.log('  Mô tả: ' + conflictingAges.description);
console.log('  Các tuổi xung:');
conflictingAges.conflicting_ages.forEach((age, index) => {
    console.log('    ' + (index + 1) + '. ' + age.can_chi + ' (' + age.year + ') - ' + age.age + ' tuổi - ' + age.animal);
});
console.log('  Lưu ý: ' + conflictingAges.note);

assert(conflictingAges.day_chi.length > 0, 'Phải có Chi ngày');
assert(conflictingAges.conflicting_ages.length > 0, 'Phải có danh sách tuổi xung');

subsection('Kiểm tra tuổi xung giữa 2 năm sinh');
const ageConflict = vnLunar.check_age_conflict(1995, 2001);
console.log('  Năm ' + ageConflict.year1 + ' (' + ageConflict.animal1 + ') và năm ' +
    ageConflict.year2 + ' (' + ageConflict.animal2 + ')');
console.log('  Xung: ' + (ageConflict.xung ? 'Có' : 'Không'));
console.log('  Mô tả: ' + ageConflict.description);

// ============================================================================
// 11. HƯỚNG XUẤT HÀNH THEO NGÀY (NGỌC HẠP THÔNG THƯ)
// ============================================================================

section('11. HƯỚNG XUẤT HÀNH THEO NGÀY (NGỌC HẠP THÔNG THƯ)');

const directionInfo = vnLunar.get_direction_info(jd);
console.log('  Ngày Chi: ' + directionInfo.day_chi);
console.log('  Hướng tốt: ' + directionInfo.good_text);
console.log('  Hướng xấu: ' + directionInfo.bad_text);
console.log('  Mô tả: ' + directionInfo.description);

assert(directionInfo.day_chi.length > 0, 'Phải có Chi Ngày');
assert(directionInfo.good.length > 0, 'Phải có hướng tốt');
assert(directionInfo.bad.length > 0, 'Phải có hướng xấu');

// ============================================================================
// 12. HƯỚNG THẦN TÀI, HỶ THẦN, PHÚC THẦN
// ============================================================================

section('12. HƯỚNG THẦN TÀI, HỶ THẦN, PHÚC THẦN');

const godDirections = vnLunar.get_god_directions(jd);
console.log('  Ngày Can: ' + godDirections.day_can);
console.log('  Hỷ Thần: ' + godDirections.joy_god);
console.log('  Tài Thần: ' + godDirections.wealth_god);
console.log('  Phúc Thần: ' + godDirections.fortune_god);
console.log('  Mô tả: ' + godDirections.description);

assert(godDirections.day_can.length > 0, 'Phải có Can Ngày');
assert(godDirections.joy_god.length > 0, 'Phải có hướng Hỷ Thần');
assert(godDirections.wealth_god.length > 0, 'Phải có hướng Tài Thần');
assert(godDirections.fortune_god.length > 0, 'Phải có hướng Phúc Thần');

// ============================================================================
// 13. HƯỚNG XUẤT HÀNH THEO TUỔI
// ============================================================================

section('13. HƯỚNG XUẤT HÀNH THEO TUỔI');

subsection('Hướng theo năm sinh');
const birthYears = [1980, 1985, 1990, 1995, 2000];
birthYears.forEach((birthYear) => {
    const ageDir = vnLunar.get_age_direction(birthYear);
    console.log('  Năm ' + birthYear + ' - ' + ageDir.age_name + ':');
    console.log('    Hướng tốt: ' + ageDir.good_text);
    console.log('    Hướng xấu: ' + ageDir.bad_text);
    assert(ageDir.age_name.length > 0, 'Phải có tên tuổi cho năm ' + birthYear);
});

subsection('Tổng hợp: Hướng xuất hành (Ngày + Tuổi)');
const travelDir = vnLunar.get_travel_direction(jd, 1995);
console.log('  Theo ngày (' + travelDir.by_day.day_chi + '):');
console.log('    Hướng tốt: ' + travelDir.by_day.good_text);
console.log('    Hướng xấu: ' + travelDir.by_day.bad_text);
console.log('  Theo tuổi (' + travelDir.by_age.age_name + '):');
console.log('    Hướng tốt: ' + travelDir.by_age.good_text);
console.log('    Hướng xấu: ' + travelDir.by_age.bad_text);
console.log('  Hướng chung tốt: ' + travelDir.common_good_text);
console.log('  Hướng cần tránh: ' + travelDir.should_avoid_text);
console.log('  Lời khuyên: ' + travelDir.advice);

assert(travelDir.by_day !== null, 'Phải có hướng theo ngày');
assert(travelDir.by_age !== null, 'Phải có hướng theo tuổi');

// ============================================================================
// 14. GIỜ XUẤT HÀNH THEO LÝ THUẦN PHONG
// ============================================================================

section('14. GIỜ XUẤT HÀNH THEO LÝ THUẦN PHONG');

subsection('Giờ tốt/xấu trong ngày');
const travelHours = vnLunar.get_travel_hours(jd);
console.log('  Ngày Chi: ' + travelHours.day_chi);
console.log('  Số giờ tốt: ' + travelHours.good_count);
console.log('  Số giờ xấu: ' + travelHours.bad_count);
console.log('  Giờ tốt: ' + travelHours.good_text);
console.log('  Giờ xấu: ' + travelHours.bad_text);

assert(travelHours.good_count === 6, 'Mỗi ngày phải có 6 giờ tốt');
assert(travelHours.bad_count === 6, 'Mỗi ngày phải có 6 giờ xấu');

subsection('Kiểm tra giờ cụ thể');
const testHours = [5, 7, 9, 13, 17, 20];
testHours.forEach((hour) => {
    const hourCheck = vnLunar.check_travel_hour(jd, hour);
    console.log('  ' + hour + 'h - Giờ ' + hourCheck.hour_chi + ' (' + hourCheck.time_frame + '): ' +
        (hourCheck.good ? '✓ TỐT' : '✗ XẤU'));
});

// ============================================================================
// 15. TÌM NGÀY TỐT
// ============================================================================

section('15. TÌM NGÀY TỐT');

subsection('Kiểm tra ngày tốt cho hoạt động cụ thể');
const activities = [
    'wedding',
    'construction',
    'travel',
    'opening',
    'moving',
    'investment'
];
activities.forEach((activity) => {
    const result = vnLunar.check_good_day(jd, activity);
    console.log('  ' + activity + ': ' + (result.good ? '✓ TỐT' : '✗ KHÔNG TỐT'));
    console.log('    Mô tả: ' + result.description);
});

subsection('Tìm ngày tốt trong tháng');
const goodDays = vnLunar.find_good_days(11, 2025, 'wedding');
console.log('  Tháng 11/2025 - Ngày tốt cho cưới hỏi:');
console.log('  Tìm thấy ' + goodDays.length + ' ngày tốt');
if (goodDays.length > 0) {
    goodDays.slice(0, 5).forEach((day, index) => {
        console.log('    ' + (index + 1) + '. Ngày ' + day.day + '/' + day.month + ' - Sao ' + day.star.name);
    });
}
assert(goodDays.length > 0, 'Phải tìm thấy ít nhất 1 ngày tốt');

// ============================================================================
// 16. THÔNG TIN ĐẦY ĐỦ
// ============================================================================

section('16. THÔNG TIN ĐẦY ĐỦ');

const fullInfo = vnLunar.getFullInfo(testDate.day, testDate.month, testDate.year);
console.log('  === DƯƠNG LỊCH ===');
console.log('  Ngày: ' + fullInfo.solar.day + '/' + fullInfo.solar.month + '/' + fullInfo.solar.year);
console.log('  Thứ: ' + fullInfo.solar.dayOfWeek);

console.log('\n  === ÂM LỊCH ===');
console.log('  Ngày: ' + fullInfo.lunar.day + '/' + fullInfo.lunar.month + '/' + fullInfo.lunar.year);
console.log('  Tháng: ' + fullInfo.lunar.monthName);

console.log('\n  === CAN CHI ===');
console.log('  Ngày: ' + fullInfo.can_chi.day);
console.log('  Tháng: ' + fullInfo.can_chi.month);
console.log('  Năm: ' + fullInfo.can_chi.year);

console.log('\n  === NGŨ HÀNH ===');
console.log('  Ngày - Can: ' + fullInfo.elements.day.can);
console.log('  Ngày - Chi: ' + fullInfo.elements.day.chi);
console.log('  Năm: ' + fullInfo.elements.year.can_chi + ' (' + fullInfo.elements.year.animal + ')');

console.log('\n  === SAO VÀ TRỰC ===');
console.log('  12 Sao: ' + fullInfo.stars_12.name + ' (' + fullInfo.stars_12.status + ')');
console.log('  12 Thần: ' + fullInfo.gods_12.name + ' (' + fullInfo.gods_12.type + ')');
console.log('  Thập Nhị Trực: ' + fullInfo.constructions_12.name);
console.log('  28 Tú: ' + fullInfo.mansions_28.name);
console.log('  Nạp Âm: ' + fullInfo.nayin.name);

console.log('\n  === LOẠI NGÀY ===');
console.log('  ' + fullInfo.day_type.type + ' - ' + fullInfo.day_type.desc);

console.log('\n  === TUỔI XUNG ===');
console.log('  ' + fullInfo.conflicting_ages.description);

console.log('\n  === THẦN ===');
console.log('  ' + fullInfo.god_directions.description);

console.log('\n  === TIẾT KHÍ ===');
console.log('  ' + fullInfo.solar_term);

console.log('\n  === GIỜ TỐT ===');
console.log('  ' + fullInfo.auspicious_hours);

assert(fullInfo.solar !== null, 'Phải có thông tin dương lịch');
assert(fullInfo.lunar !== null, 'Phải có thông tin âm lịch');

// ============================================================================
// 17. PERFORMANCE TEST
// ============================================================================

section('17. KIỂM TRA HIỆU NĂNG');

subsection('Tốc độ chuyển đổi');
let startTime = Date.now();
let iterations = 10000;
for (let i = 0; i < iterations; i++) {
    vnLunar.get_lunar_date(6, 11, 2025);
}
let endTime = Date.now();
let avgTime = (endTime - startTime) / iterations;
console.log('  Chuyển Dương -> Âm: ' + avgTime.toFixed(4) + 'ms/lần (' + iterations + ' lần)');
assert(avgTime < 1, 'Thời gian trung bình phải < 1ms/lần');

subsection('Tốc độ tính toán đầy đủ');
startTime = Date.now();
iterations = 1000;
for (let i = 0; i < iterations; i++) {
    vnLunar.getFullInfo(6, 11, 2025);
}
endTime = Date.now();
avgTime = (endTime - startTime) / iterations;
console.log('  Tính toán đầy đủ: ' + avgTime.toFixed(4) + 'ms/lần (' + iterations + ' lần)');
assert(avgTime < 10, 'Thời gian trung bình phải < 10ms/lần');

// ============================================================================
// 18. EDGE CASES
// ============================================================================

section('18. KIỂM TRA TRƯỜNG HỢP ĐẶC BIỆT');

subsection('Ngày đầu năm');
const jan1 = vnLunar.get_lunar_date(1, 1, 2025);
console.log('  1/1/2025 = Âm lịch ' + jan1.day + '/' + jan1.month + '/' + jan1.year);
assert(jan1.day > 0 && jan1.month > 0, 'Ngày đầu năm phải hợp lệ');

subsection('Ngày cuối năm');
const dec31 = vnLunar.get_lunar_date(31, 12, 2025);
console.log('  31/12/2025 = Âm lịch ' + dec31.day + '/' + dec31.month + '/' + dec31.year);
assert(dec31.day > 0 && dec31.month > 0, 'Ngày cuối năm phải hợp lệ');

subsection('Tháng nhuận');
const leapMonth = vnLunar.get_lunar_date(18, 6, 2023);
console.log('  18/6/2023 = Âm lịch ' + leapMonth.day + '/' + leapMonth.month + '/' + leapMonth.year);
console.log('  Tháng nhuận: ' + (leapMonth.leap === 1 ? 'Có' : 'Không'));
assert(leapMonth.day > 0 && leapMonth.month > 0, 'Tháng nhuận phải hợp lệ');

subsection('Năm giới hạn');
const year1800 = vnLunar.get_lunar_date(25, 1, 1800);
console.log('  25/1/1800 = Âm lịch ' + year1800.day + '/' + year1800.month + '/' + year1800.year);
assert(year1800.day > 0, 'Năm 1800 phải được hỗ trợ');

const year2199 = vnLunar.get_lunar_date(31, 12, 2199);
console.log('  31/12/2199 = Âm lịch ' + year2199.day + '/' + year2199.month + '/' + year2199.year);
assert(year2199.day > 0, 'Năm 2199 phải được hỗ trợ');

// ============================================================================
// KẾT QUẢ TỔNG HỢP
// ============================================================================

section('KẾT QUẢ TEST');

console.log('  Tổng số test: ' + testCount);
console.log('  Số test passed: ' + passCount);
console.log('  Số test failed: ' + (testCount - passCount));
console.log('  Tỷ lệ thành công: ' + ((passCount / testCount) * 100).toFixed(2) + '%');

if (passCount === testCount) {
    console.log('\n  ✅ TẤT CẢ TEST ĐỀU PASS!');
    process.exit(0);
} else {
    console.log('\n  ❌ CÓ ' + (testCount - passCount) + ' TEST FAILED!');
    process.exit(1);
}

console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                         ✅ HOÀN THÀNH TEST!                               ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');
