import { CAN, CHI, CHI_ANIMALS, CAN_ELEMENTS, CHI_ELEMENTS, ELEMENT, AUSPICIOUS_HOURS, WEEKDAYS } from './constants';
export function get_year_can_chi(year) {
    return CAN[(year + 6) % 10] + " " + CHI[(year + 8) % 12];
}
export function get_hour_can(jdn) {
    return CAN[(jdn - 1) * 2 % 10];
}
export function get_can_chi(lunar) {
    const dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd + 1) % 12];
    let monthName = CAN[(lunar.year * 12 + lunar.month + 3) % 10] + " " + CHI[(lunar.month + 1) % 12];
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
export function get_can_element(canIndex) {
    return CAN_ELEMENTS[canIndex % 10];
}
export function get_chi_element(chiIndex) {
    return CHI_ELEMENTS[chiIndex % 12];
}
export function get_year_element(year) {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    const can = CAN[canIndex];
    const chi = CHI[chiIndex];
    return {
        can,
        chi,
        animal: CHI_ANIMALS[chiIndex],
        can_chi: `${can} ${chi}`,
        name: `${can} ${chi}`,
        element: CAN_ELEMENTS[canIndex],
        can_element: CAN_ELEMENTS[canIndex],
        chi_element: CHI_ELEMENTS[chiIndex]
    };
}
export function get_element_relation(nh1, nh2) {
    const sinhCycle = {
        [ELEMENT.WATER]: ELEMENT.WOOD,
        [ELEMENT.WOOD]: ELEMENT.FIRE,
        [ELEMENT.FIRE]: ELEMENT.EARTH,
        [ELEMENT.EARTH]: ELEMENT.METAL,
        [ELEMENT.METAL]: ELEMENT.WATER
    };
    const khacCycle = {
        [ELEMENT.WATER]: ELEMENT.FIRE,
        [ELEMENT.FIRE]: ELEMENT.METAL,
        [ELEMENT.METAL]: ELEMENT.WOOD,
        [ELEMENT.WOOD]: ELEMENT.EARTH,
        [ELEMENT.EARTH]: ELEMENT.WATER
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
export function get_auspicious_hours(jd) {
    const chiOfDay = (jd + 1) % 12;
    const gioHD_data = AUSPICIOUS_HOURS[chiOfDay];
    let ret = "";
    let count = 0;
    for (let i = 0; i < 12; i++) {
        if (gioHD_data.charAt(i) === '1') {
            ret += CHI[i];
            ret += ' (' + ((i * 2 + 23) % 24) + '-' + ((i * 2 + 1) % 24) + 'h)';
            if (count++ < 5)
                ret += ', ';
            if (count === 3)
                ret += '\n';
        }
    }
    return ret;
}
export function get_day_of_week(jd) {
    return WEEKDAYS[(jd + 1) % 7];
}
//# sourceMappingURL=calendar.js.map