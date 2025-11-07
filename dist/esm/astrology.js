import { STARS_12, GODS_12, CONSTRUCTIONS_12, MANSIONS_28, NAYIN_60, CAN, CHI } from './constants';
import { jdn2date, convert_solar_to_lunar, jdn } from './core';
export function get_12_stars(lunarDay, lunarMonth) {
    let saoIndex = (lunarMonth + lunarDay - 2) % 12;
    if (saoIndex < 0)
        saoIndex += 12;
    return STARS_12[saoIndex];
}
export function get_12_gods(jd) {
    const chiNgay = (jd + 1) % 12;
    const thanIndex = (chiNgay + 8) % 12;
    return GODS_12[thanIndex];
}
export function get_12_constructions(lunarDay, lunarMonth) {
    let index = (lunarDay + lunarMonth + 2) % 12;
    if (index < 0)
        index += 12;
    return CONSTRUCTIONS_12[index];
}
export function get_28_mansions(jd) {
    const tuIndex = (jd + 15) % 28;
    return MANSIONS_28[tuIndex];
}
export function get_nayin(jd) {
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
    const nayin_name = NAYIN_60[nayin_index];
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
        can: CAN[canIndex],
        chi: CHI[chiIndex]
    };
}
export function get_day_type(lunarDay, lunarMonth) {
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
export function check_good_day(jd, activity) {
    const solarDate = jdn2date(jd);
    const lunar = convert_solar_to_lunar(solarDate[0], solarDate[1], solarDate[2], 7.0);
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
export function find_good_days(month, year, activity) {
    const good_days = [];
    let daysInMonth = 31;
    if (month === 2) {
        daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }
    else if ([4, 6, 9, 11].indexOf(month) !== -1) {
        daysInMonth = 30;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const jd = jdn(day, month, year);
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