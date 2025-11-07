"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_year_can_chi = get_year_can_chi;
exports.get_hour_can = get_hour_can;
exports.get_can_chi = get_can_chi;
exports.get_can_element = get_can_element;
exports.get_chi_element = get_chi_element;
exports.get_year_element = get_year_element;
exports.get_element_relation = get_element_relation;
exports.get_auspicious_hours = get_auspicious_hours;
exports.get_day_of_week = get_day_of_week;
const constants_1 = require("./constants");
function get_year_can_chi(year) {
    return constants_1.CAN[(year + 6) % 10] + " " + constants_1.CHI[(year + 8) % 12];
}
function get_hour_can(jdn) {
    return constants_1.CAN[(jdn - 1) * 2 % 10];
}
function get_can_chi(lunar) {
    const dayName = constants_1.CAN[(lunar.jd + 9) % 10] + " " + constants_1.CHI[(lunar.jd + 1) % 12];
    let monthName = constants_1.CAN[(lunar.year * 12 + lunar.month + 3) % 10] + " " + constants_1.CHI[(lunar.month + 1) % 12];
    if (lunar.leap === 1) {
        monthName += " (nhuận)";
    }
    const yearName = get_year_can_chi(lunar.year);
    return {
        day: dayName,
        month: monthName,
        year: yearName
    };
}
function get_can_element(canIndex) {
    return constants_1.CAN_ELEMENTS[canIndex % 10];
}
function get_chi_element(chiIndex) {
    return constants_1.CHI_ELEMENTS[chiIndex % 12];
}
function get_year_element(year) {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    const can = constants_1.CAN[canIndex];
    const chi = constants_1.CHI[chiIndex];
    return {
        can,
        chi,
        animal: constants_1.CHI_ANIMALS[chiIndex],
        can_chi: `${can} ${chi}`,
        name: `${can} ${chi}`,
        element: constants_1.CAN_ELEMENTS[canIndex],
        can_element: constants_1.CAN_ELEMENTS[canIndex],
        chi_element: constants_1.CHI_ELEMENTS[chiIndex]
    };
}
function get_element_relation(nh1, nh2) {
    const sinhCycle = {
        [constants_1.ELEMENT.WATER]: constants_1.ELEMENT.WOOD,
        [constants_1.ELEMENT.WOOD]: constants_1.ELEMENT.FIRE,
        [constants_1.ELEMENT.FIRE]: constants_1.ELEMENT.EARTH,
        [constants_1.ELEMENT.EARTH]: constants_1.ELEMENT.METAL,
        [constants_1.ELEMENT.METAL]: constants_1.ELEMENT.WATER
    };
    const khacCycle = {
        [constants_1.ELEMENT.WATER]: constants_1.ELEMENT.FIRE,
        [constants_1.ELEMENT.FIRE]: constants_1.ELEMENT.METAL,
        [constants_1.ELEMENT.METAL]: constants_1.ELEMENT.WOOD,
        [constants_1.ELEMENT.WOOD]: constants_1.ELEMENT.EARTH,
        [constants_1.ELEMENT.EARTH]: constants_1.ELEMENT.WATER
    };
    if (nh1 === nh2)
        return "trung hòa";
    if (sinhCycle[nh1] === nh2)
        return "sinh";
    if (khacCycle[nh1] === nh2)
        return "khắc";
    if (khacCycle[nh2] === nh1)
        return "bị khắc";
    return "trung hòa";
}
function get_auspicious_hours(jd) {
    const chiOfDay = (jd + 1) % 12;
    const gioHD_data = constants_1.AUSPICIOUS_HOURS[chiOfDay];
    let ret = "";
    let count = 0;
    for (let i = 0; i < 12; i++) {
        if (gioHD_data.charAt(i) === '1') {
            ret += constants_1.CHI[i];
            ret += ' (' + ((i * 2 + 23) % 24) + '-' + ((i * 2 + 1) % 24) + 'h)';
            if (count++ < 5)
                ret += ', ';
            if (count === 3)
                ret += '\n';
        }
    }
    return ret;
}
function get_day_of_week(jd) {
    return constants_1.WEEKDAYS[(jd + 1) % 7];
}
//# sourceMappingURL=calendar.js.map