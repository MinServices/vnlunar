"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_12_stars = get_12_stars;
exports.get_12_gods = get_12_gods;
exports.get_12_constructions = get_12_constructions;
exports.get_28_mansions = get_28_mansions;
exports.get_nayin = get_nayin;
exports.get_day_type = get_day_type;
exports.check_good_day = check_good_day;
exports.find_good_days = find_good_days;
const constants_1 = require("./constants");
const core_1 = require("./core");
function get_12_stars(lunarDay, lunarMonth) {
    let saoIndex = (lunarMonth + lunarDay - 2) % 12;
    if (saoIndex < 0)
        saoIndex += 12;
    return constants_1.STARS_12[saoIndex];
}
function get_12_gods(jd) {
    const chiNgay = (jd + 1) % 12;
    const thanIndex = (chiNgay + 8) % 12;
    return constants_1.GODS_12[thanIndex];
}
function get_12_constructions(lunarDay, lunarMonth) {
    let index = (lunarDay + lunarMonth + 2) % 12;
    if (index < 0)
        index += 12;
    return constants_1.CONSTRUCTIONS_12[index];
}
function get_28_mansions(jd) {
    const tuIndex = (jd + 15) % 28;
    return constants_1.MANSIONS_28[tuIndex];
}
function get_nayin(jd) {
    const canIndex = (jd + 9) % 10;
    const chiIndex = (jd + 1) % 12;
    let can_chi_60_index = -1;
    for (let i = 0; i < 60; i++) {
        if (i % 10 === canIndex && i % 12 === chiIndex) {
            can_chi_60_index = i;
            break;
        }
    }
    const nayin_index = Math.floor(can_chi_60_index / 2);
    const nayin_name = constants_1.NAYIN_60[nayin_index];
    let element = "";
    if (nayin_name.indexOf("Kim") !== -1)
        element = "Kim";
    else if (nayin_name.indexOf("Mộc") !== -1)
        element = "Mộc";
    else if (nayin_name.indexOf("Thủy") !== -1)
        element = "Thủy";
    else if (nayin_name.indexOf("Hỏa") !== -1 || nayin_name.indexOf("Hoả") !== -1)
        element = "Hỏa";
    else if (nayin_name.indexOf("Thổ") !== -1)
        element = "Thổ";
    return {
        name: nayin_name,
        element: element,
        can: constants_1.CAN[canIndex],
        chi: constants_1.CHI[chiIndex]
    };
}
function get_day_type(lunarDay, lunarMonth) {
    const sao = get_12_stars(lunarDay, lunarMonth);
    const hoangDao = ["Kiến", "Mãn", "Định", "Thành", "Thu", "Khai"];
    const hacDao = ["Trừ", "Bình", "Chấp", "Phá", "Nguy", "Bế"];
    const isHoangDao = hoangDao.indexOf(sao.name) !== -1;
    const isHacDao = hacDao.indexOf(sao.name) !== -1;
    return {
        type: isHoangDao ? "Hoàng Đạo" : "Hắc Đạo",
        star: sao.name,
        good: isHoangDao,
        bad: isHacDao,
        desc: isHoangDao
            ? "Ngày Hoàng Đạo - Tốt, thuận lợi"
            : "Ngày Hắc Đạo - Xấu, nên tránh"
    };
}
function check_good_day(jd, activity) {
    const solarDate = (0, core_1.jdn2date)(jd);
    const lunar = (0, core_1.convert_solar_to_lunar)(solarDate[0], solarDate[1], solarDate[2], 7.0);
    const sao = get_12_stars(lunar.day, lunar.month);
    const good_for_activity = {
        "cuoi": ["Kiến", "Mãn", "Định", "Thành", "Khai"],
        "xaynha": ["Kiến", "Định", "Thành", "Khai"],
        "xuathanh": ["Kiến", "Mãn", "Thành", "Khai"],
        "khaotruong": ["Kiến", "Thành", "Khai", "Thu"],
        "chuyennha": ["Kiến", "Mãn", "Thành"],
        "dautu": ["Định", "Thành", "Thu", "Khai"]
    };
    const good_list = good_for_activity[activity] || [];
    const is_good = good_list.indexOf(sao.name) !== -1;
    return {
        star: sao,
        activity: activity,
        good: is_good,
        description: is_good
            ? "Ngày " + sao.name + " - TỐT cho " + activity
            : "Ngày " + sao.name + " - KHÔNG TỐT cho " + activity
    };
}
function find_good_days(month, year, activity) {
    const good_days = [];
    let daysInMonth = 31;
    if (month === 2) {
        daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }
    else if ([4, 6, 9, 11].indexOf(month) !== -1) {
        daysInMonth = 30;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const jd = (0, core_1.jdn)(day, month, year);
        const result = check_good_day(jd, activity);
        if (result.good) {
            good_days.push({
                day: day,
                month: month,
                year: year,
                jd: jd,
                sao: result.star
            });
        }
    }
    return good_days;
}
//# sourceMappingURL=astrology.js.map