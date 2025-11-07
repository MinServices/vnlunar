"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_conflicting_ages = get_conflicting_ages;
exports.check_age_conflict = check_age_conflict;
exports.get_direction_info = get_direction_info;
exports.get_god_directions = get_god_directions;
exports.get_age_direction = get_age_direction;
exports.get_travel_direction = get_travel_direction;
exports.get_time_frame = get_time_frame;
exports.get_travel_hours = get_travel_hours;
exports.check_travel_hour = check_travel_hour;
const constants_1 = require("./constants");
const NGOC_HAP_THONG_THU = {
    0: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], description: "Ngày Tý: Tốt hướng Nam-Bắc, tránh Đông-Tây" },
    6: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], description: "Ngày Ngọ: Tốt hướng Nam-Bắc, tránh Đông-Tây" },
    1: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây Bắc", "Đông Nam"], description: "Ngày Sửu: Tốt hướng ĐB-TN, tránh TB-ĐN" },
    7: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây Bắc", "Đông Nam"], description: "Ngày Mùi: Tốt hướng ĐB-TN, tránh TB-ĐN" },
    2: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], description: "Ngày Dần: Tốt hướng Đông-Tây, tránh Nam-Bắc" },
    8: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], description: "Ngày Thân: Tốt hướng Đông-Tây, tránh Nam-Bắc" },
    3: { good: ["Đông Nam", "Tây Bắc"], bad: ["Đông Bắc", "Tây Nam"], description: "Ngày Mão: Tốt hướng ĐN-TB, tránh ĐB-TN" },
    9: { good: ["Đông Nam", "Tây Bắc"], bad: ["Đông Bắc", "Tây Nam"], description: "Ngày Dậu: Tốt hướng ĐN-TB, tránh ĐB-TN" },
    4: { good: ["Tây Nam", "Đông Bắc"], bad: ["Tây", "Đông"], description: "Ngày Thìn: Tốt hướng TN-ĐB, tránh Tây-Đông" },
    10: { good: ["Tây Nam", "Đông Bắc"], bad: ["Tây", "Đông"], description: "Ngày Tuất: Tốt hướng TN-ĐB, tránh Tây-Đông" },
    5: { good: ["Tây Bắc", "Đông Nam"], bad: ["Nam", "Bắc"], description: "Ngày Tỵ: Tốt hướng TB-ĐN, tránh Nam-Bắc" },
    11: { good: ["Tây Bắc", "Đông Nam"], bad: ["Nam", "Bắc"], description: "Ngày Hợi: Tốt hướng TB-ĐN, tránh Nam-Bắc" }
};
const AGE_DIRECTIONS = {
    0: { good: ["Đông", "Tây Nam"], bad: ["Nam", "Bắc"], name: "Tý (Chuột)" },
    1: { good: ["Bắc", "Nam"], bad: ["Đông", "Tây"], name: "Sửu (Trâu)" },
    2: { good: ["Đông", "Tây"], bad: ["Bắc", "Nam"], name: "Dần (Hổ)" },
    3: { good: ["Tây", "Đông"], bad: ["Nam", "Bắc"], name: "Mão (Mèo)" },
    4: { good: ["Tây Nam", "Đông Bắc"], bad: ["Đông", "Tây"], name: "Thìn (Rồng)" },
    5: { good: ["Tây Bắc", "Đông Nam"], bad: ["Bắc", "Nam"], name: "Tỵ (Rắn)" },
    6: { good: ["Bắc", "Nam"], bad: ["Đông", "Tây"], name: "Ngọ (Ngựa)" },
    7: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], name: "Mùi (Dê)" },
    8: { good: ["Tây", "Đông"], bad: ["Bắc", "Nam"], name: "Thân (Khỉ)" },
    9: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], name: "Dậu (Gà)" },
    10: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây", "Đông"], name: "Tuất (Chó)" },
    11: { good: ["Đông Nam", "Tây Bắc"], bad: ["Nam", "Bắc"], name: "Hợi (Lợn)" }
};
function get_conflicting_ages(jd, currentYear) {
    const canNgay = (jd + 9) % 10;
    const chiNgay = (jd + 1) % 12;
    const xungChiIndex = (chiNgay + 6) % 12;
    const conflicting_age_list = [];
    const tamHinh = {
        0: [8, 4],
        1: [9, 5],
        2: [6, 10],
        3: [11, 7],
        4: [0, 8],
        5: [9, 1],
        6: [2, 10],
        7: [11, 3],
        8: [0, 4],
        9: [5, 1],
        10: [6, 2],
        11: [3, 7]
    };
    const canXungChinh = (canNgay - 6 + 10) % 10;
    const canXungPhu = (canNgay - 2 + 10) % 10;
    const xungTypes = [];
    xungTypes.push({ can: canXungChinh, chi: xungChiIndex, priority: 1, hasStar: true });
    if (canXungPhu !== canXungChinh) {
        xungTypes.push({ can: canXungPhu, chi: xungChiIndex, priority: 2, hasStar: false });
    }
    if (chiNgay !== xungChiIndex) {
        xungTypes.push({ can: canXungChinh, chi: chiNgay, priority: 3, hasStar: false });
    }
    const tamHinhChis = tamHinh[chiNgay] || [];
    tamHinhChis.forEach((chi, idx) => {
        xungTypes.push({ can: canXungPhu, chi: chi, priority: 4 + idx, hasStar: false });
    });
    if (canXungPhu !== canXungChinh && chiNgay !== xungChiIndex) {
        xungTypes.push({ can: canXungPhu, chi: chiNgay, priority: 10, hasStar: false });
    }
    const seen_can_chi = new Set();
    xungTypes.forEach((type) => {
        for (let age = 1; age <= 120; age++) {
            const year = currentYear - age;
            const yearCan = (year + 6) % 10;
            const yearChi = (year + 8) % 12;
            if (yearCan === type.can && yearChi === type.chi) {
                const can_chi_str = constants_1.CAN[yearCan] + " " + constants_1.CHI[yearChi];
                const key = can_chi_str + (type.hasStar ? '*' : '');
                if (!seen_can_chi.has(can_chi_str)) {
                    seen_can_chi.add(can_chi_str);
                    conflicting_age_list.push({
                        year: year,
                        can_chi: key,
                        age: age,
                        chi: constants_1.CHI[yearChi],
                        animal: constants_1.CHI_ANIMALS[yearChi]
                    });
                }
                break;
            }
        }
    });
    return {
        day_chi: constants_1.CHI[chiNgay],
        day_animal: constants_1.CHI_ANIMALS[chiNgay],
        conflict_chi: constants_1.CHI[xungChiIndex],
        conflict_animal: constants_1.CHI_ANIMALS[xungChiIndex],
        description: "Ngày " + constants_1.CHI[chiNgay] + " (" + constants_1.CHI_ANIMALS[chiNgay] + ") xung với tuổi " + constants_1.CHI[xungChiIndex] + " (" + constants_1.CHI_ANIMALS[xungChiIndex] + ")",
        conflicting_ages: conflicting_age_list.slice(0, 5),
        note: "Người tuổi " + constants_1.CHI_ANIMALS[xungChiIndex] + " nên cẩn thận trong ngày này"
    };
}
function check_age_conflict(year1, year2) {
    const chi1 = (year1 + 8) % 12;
    const chi2 = (year2 + 8) % 12;
    const isXung = Math.abs(chi1 - chi2) === 6;
    return {
        year1: year1,
        year2: year2,
        chi1: constants_1.CHI[chi1],
        animal1: constants_1.CHI_ANIMALS[chi1],
        chi2: constants_1.CHI[chi2],
        animal2: constants_1.CHI_ANIMALS[chi2],
        xung: isXung,
        description: isXung
            ? "Tuổi " + constants_1.CHI_ANIMALS[chi1] + " và " + constants_1.CHI_ANIMALS[chi2] + " XÁ XUNG (kỵ)"
            : "Tuổi " + constants_1.CHI_ANIMALS[chi1] + " và " + constants_1.CHI_ANIMALS[chi2] + " không xung"
    };
}
function get_direction_info(jd) {
    const chiNgay = (jd + 1) % 12;
    const info = NGOC_HAP_THONG_THU[chiNgay] || NGOC_HAP_THONG_THU[0];
    return {
        day_chi: constants_1.CHI[chiNgay],
        good: info.good,
        bad: info.bad,
        description: info.description,
        good_text: info.good.join(", "),
        bad_text: info.bad.join(", ")
    };
}
function get_god_directions(jd) {
    const canNgay = (jd + 9) % 10;
    return {
        day_can: constants_1.CAN[canNgay],
        joy_god: constants_1.JOY_GOD_DIR[canNgay],
        wealth_god: constants_1.WEALTH_GOD_DIR[canNgay],
        fortune_god: constants_1.FORTUNE_GOD_DIR[canNgay],
        description: "Hỷ Thần: " + constants_1.JOY_GOD_DIR[canNgay] + ", Tài Thần: " + constants_1.WEALTH_GOD_DIR[canNgay] + ", Phúc Thần: " + constants_1.FORTUNE_GOD_DIR[canNgay]
    };
}
function get_age_direction(birth_year) {
    const age_chi = (birth_year + 8) % 12;
    const info = AGE_DIRECTIONS[age_chi];
    return {
        age_name: info.name,
        chi: constants_1.CHI[age_chi],
        birth_year: birth_year,
        good_directions: info.good,
        bad_directions: info.bad,
        good_text: info.good.join(", "),
        bad_text: info.bad.join(", ")
    };
}
function get_travel_direction(jd, birth_year) {
    const by_day = get_direction_info(jd);
    const by_age = get_age_direction(birth_year);
    const common_good = [];
    by_day.good.forEach((direction) => {
        if (by_age.good_directions.indexOf(direction) !== -1) {
            common_good.push(direction);
        }
    });
    const should_avoid = [];
    by_day.bad.forEach((direction) => {
        if (should_avoid.indexOf(direction) === -1) {
            should_avoid.push(direction);
        }
    });
    by_age.bad_directions.forEach((direction) => {
        if (should_avoid.indexOf(direction) === -1) {
            should_avoid.push(direction);
        }
    });
    return {
        by_day: by_day,
        by_age: by_age,
        common_good: common_good,
        should_avoid: should_avoid,
        common_good_text: common_good.length > 0 ? common_good.join(", ") : "Không có",
        should_avoid_text: should_avoid.join(", "),
        advice: common_good.length > 0
            ? "Nên đi hướng: " + common_good.join(", ")
            : "Ngày này không có hướng chung tốt cho tuổi " + by_age.age_name
    };
}
function get_time_frame(chiIndex) {
    const gioStart = (chiIndex * 2 + 23) % 24;
    const gioEnd = (chiIndex * 2 + 1) % 24;
    return gioStart + "h-" + gioEnd + "h";
}
function get_travel_hours(jd) {
    const chiNgay = (jd + 1) % 12;
    const good_hour_indexes = constants_1.TRAVEL_HOURS_LY[chiNgay];
    const good_hours_list = [];
    const bad_hours_list = [];
    for (let i = 0; i < 12; i++) {
        const hour_info = {
            chi: constants_1.CHI[i],
            index: i,
            period: get_time_frame(i),
            good: good_hour_indexes.indexOf(i) !== -1
        };
        if (hour_info.good) {
            good_hours_list.push(hour_info);
        }
        else {
            bad_hours_list.push(hour_info);
        }
    }
    return {
        day_chi: constants_1.CHI[chiNgay],
        good_hours: good_hours_list,
        bad_hours: bad_hours_list,
        good_text: formatGioList(good_hours_list),
        bad_text: formatGioList(bad_hours_list),
        good_count: good_hours_list.length,
        bad_count: bad_hours_list.length
    };
}
function formatGioList(gioList) {
    return gioList.map((gio) => {
        return gio.chi + " (" + gio.period + ")";
    }).join(", ");
}
function check_travel_hour(jd, hour) {
    const hour_chi_index = Math.floor((hour + 1) / 2) % 12;
    const hour_info = get_travel_hours(jd);
    let current_hour = null;
    for (let i = 0; i < hour_info.good_hours.length; i++) {
        if (hour_info.good_hours[i].index === hour_chi_index) {
            current_hour = hour_info.good_hours[i];
            break;
        }
    }
    if (!current_hour) {
        for (let i = 0; i < hour_info.bad_hours.length; i++) {
            if (hour_info.bad_hours[i].index === hour_chi_index) {
                current_hour = hour_info.bad_hours[i];
                break;
            }
        }
    }
    return {
        hour: hour,
        hour_chi: constants_1.CHI[hour_chi_index],
        time_frame: get_time_frame(hour_chi_index),
        good: current_hour ? current_hour.good : false,
        description: current_hour && current_hour.good
            ? "Giờ " + constants_1.CHI[hour_chi_index] + " (" + get_time_frame(hour_chi_index) + ") - TỐT để xuất hành"
            : "Giờ " + constants_1.CHI[hour_chi_index] + " (" + get_time_frame(hour_chi_index) + ") - KHÔNG TỐT để xuất hành"
    };
}
//# sourceMappingURL=direction.js.map