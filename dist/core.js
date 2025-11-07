"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jdn = jdn;
exports.jdn2date = jdn2date;
exports.get_new_moon_day = get_new_moon_day;
exports.get_sun_longitude_aa = get_sun_longitude_aa;
exports.get_lunar_month_11 = get_lunar_month_11;
exports.get_leap_month_offset = get_leap_month_offset;
exports.convert_solar_to_lunar = convert_solar_to_lunar;
exports.get_lunar_date = get_lunar_date;
exports.get_sun_longitude = get_sun_longitude;
exports.get_year_info = get_year_info;
exports.get_month = get_month;
const constants_1 = require("./constants");
function INT(d) {
    return Math.floor(d);
}
function jdn(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    const jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    return jd;
}
function jdn2date(jd) {
    let Z, A, alpha, B, C, D, E;
    let dd, mm, yyyy;
    Z = jd;
    if (Z < 2299161) {
        A = Z;
    }
    else {
        alpha = INT((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - INT(alpha / 4);
    }
    B = A + 1524;
    C = INT((B - 122.1) / 365.25);
    D = INT(365.25 * C);
    E = INT((B - D) / 30.6001);
    dd = INT(B - D - INT(30.6001 * E));
    if (E < 14) {
        mm = E - 1;
    }
    else {
        mm = E - 13;
    }
    if (mm < 3) {
        yyyy = C - 4715;
    }
    else {
        yyyy = C - 4716;
    }
    return [dd, mm, yyyy];
}
function get_new_moon_day(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = constants_1.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
        deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    }
    else {
        deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone / 24);
}
function get_sun_longitude_aa(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = constants_1.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - constants_1.PI * 2 * (INT(L / (constants_1.PI * 2)));
    return INT(L / constants_1.PI * 6);
}
function get_lunar_month_11(yy, timeZone) {
    const off = jdn(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = get_new_moon_day(k, timeZone);
    const sunLong = get_sun_longitude_aa(nm, timeZone);
    if (sunLong >= 9) {
        nm = get_new_moon_day(k - 1, timeZone);
    }
    return nm;
}
function get_leap_month_offset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = get_sun_longitude_aa(get_new_moon_day(k + i, timeZone), timeZone);
    do {
        last = arc;
        i++;
        arc = get_sun_longitude_aa(get_new_moon_day(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
}
function convert_solar_to_lunar(dd, mm, yy, timeZone) {
    const dayNumber = jdn(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = get_new_moon_day(k + 1, timeZone);
    if (monthStart > dayNumber) {
        monthStart = get_new_moon_day(k, timeZone);
    }
    let a11 = get_lunar_month_11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
        lunarYear = yy;
        a11 = get_lunar_month_11(yy - 1, timeZone);
    }
    else {
        lunarYear = yy + 1;
        b11 = get_lunar_month_11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
        const leapMonthDiff = get_leap_month_offset(a11, timeZone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff === leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }
    if (lunarMonth > 12) {
        lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }
    return {
        day: lunarDay,
        month: lunarMonth,
        year: lunarYear,
        leap: lunarLeap,
        jd: dayNumber
    };
}
function get_lunar_date(dd, mm, yyyy) {
    const timeZone = 7.0;
    return convert_solar_to_lunar(dd, mm, yyyy, timeZone);
}
function sun_longitude(jdn) {
    const T = (jdn - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = constants_1.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - constants_1.PI * 2 * (INT(L / (constants_1.PI * 2)));
    return L;
}
function get_sun_longitude(dayNumber, timeZone) {
    return INT(sun_longitude(dayNumber - 0.5 - timeZone / 24.0) / constants_1.PI * 12);
}
function decode_lunar_year(yy, k) {
    const monthLengths = [29, 30];
    const regularMonths = [];
    const offsetOfTet = k >> 17;
    const leapMonth = k & 0xf;
    const leapMonthLength = monthLengths[k >> 16 & 0x1];
    const solarNY = jdn(1, 1, yy);
    let currentJD = solarNY + offsetOfTet;
    let j = k >> 4;
    for (let i = 0; i < 12; i++) {
        regularMonths[12 - i - 1] = monthLengths[j & 0x1];
        j >>= 1;
    }
    const ly = [];
    if (leapMonth === 0) {
        for (let mm = 1; mm <= 12; mm++) {
            ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD });
            currentJD += regularMonths[mm - 1];
        }
    }
    else {
        for (let mm = 1; mm <= leapMonth; mm++) {
            ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD });
            currentJD += regularMonths[mm - 1];
        }
        ly.push({ day: 1, month: leapMonth, year: yy, leap: 1, jd: currentJD });
        currentJD += leapMonthLength;
        for (let mm = leapMonth + 1; mm <= 12; mm++) {
            ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD });
            currentJD += regularMonths[mm - 1];
        }
    }
    return ly;
}
function get_year_info(yyyy) {
    let yearCode;
    if (yyyy < 1900) {
        yearCode = constants_1.TK19[yyyy - 1800];
    }
    else if (yyyy < 2000) {
        yearCode = constants_1.TK20[yyyy - 1900];
    }
    else if (yyyy < 2100) {
        yearCode = constants_1.TK21[yyyy - 2000];
    }
    else {
        yearCode = constants_1.TK22[yyyy - 2100];
    }
    return decode_lunar_year(yyyy, yearCode);
}
function get_month(mm, yy) {
    const mm1 = mm < 12 ? mm + 1 : 1;
    const yy1 = mm < 12 ? yy : yy + 1;
    const jd1 = jdn(1, mm, yy);
    const jd2 = jdn(1, mm1, yy1);
    const result = [];
    for (let i = jd1; i < jd2; i++) {
        const solarDate = jdn2date(i);
        const lunar = get_lunar_date(solarDate[0], solarDate[1], solarDate[2]);
        result.push(lunar);
    }
    return result;
}
//# sourceMappingURL=core.js.map