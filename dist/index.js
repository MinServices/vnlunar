"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_good_day = exports.get_day_type = exports.get_nayin = exports.get_28_mansions = exports.get_12_constructions = exports.get_12_gods = exports.get_12_stars = exports.get_day_of_week = exports.get_auspicious_hours = exports.get_element_relation = exports.get_year_element = exports.get_chi_element = exports.get_can_element = exports.get_can_chi = exports.get_hour_can = exports.get_year_can_chi = exports.get_month = exports.get_year_info = exports.get_sun_longitude = exports.get_lunar_date = exports.convert_solar_to_lunar = exports.get_leap_month_offset = exports.get_lunar_month_11 = exports.get_sun_longitude_aa = exports.get_new_moon_day = exports.jdn2date = exports.jdn = exports.LAST_DAY = exports.FIRST_DAY = exports.PI = exports.TRAVEL_HOURS_LY = exports.FORTUNE_GOD_DIR = exports.JOY_GOD_DIR = exports.WEALTH_GOD_DIR = exports.DIRECTION_MAP = exports.DIRECTIONS = exports.CHI_ELEMENTS = exports.CAN_ELEMENTS = exports.AUSPICIOUS_HOURS = exports.MANSIONS_28 = exports.NAYIN_60 = exports.GODS_12 = exports.CONSTRUCTIONS_12 = exports.STARS_12 = exports.ELEMENT = exports.SOLAR_TERMS = exports.WEEKDAYS = exports.CHI_ANIMALS = exports.CHI = exports.CAN = void 0;
exports.check_travel_hour = exports.get_travel_hours = exports.get_time_frame = exports.get_travel_direction = exports.get_age_direction = exports.get_god_directions = exports.get_direction_info = exports.check_age_conflict = exports.get_conflicting_ages = exports.find_good_days = void 0;
exports.getFullInfo = getFullInfo;
__exportStar(require("./types"), exports);
var constants_1 = require("./constants");
Object.defineProperty(exports, "CAN", { enumerable: true, get: function () { return constants_1.CAN; } });
Object.defineProperty(exports, "CHI", { enumerable: true, get: function () { return constants_1.CHI; } });
Object.defineProperty(exports, "CHI_ANIMALS", { enumerable: true, get: function () { return constants_1.CHI_ANIMALS; } });
Object.defineProperty(exports, "WEEKDAYS", { enumerable: true, get: function () { return constants_1.WEEKDAYS; } });
Object.defineProperty(exports, "SOLAR_TERMS", { enumerable: true, get: function () { return constants_1.SOLAR_TERMS; } });
Object.defineProperty(exports, "ELEMENT", { enumerable: true, get: function () { return constants_1.ELEMENT; } });
Object.defineProperty(exports, "STARS_12", { enumerable: true, get: function () { return constants_1.STARS_12; } });
Object.defineProperty(exports, "CONSTRUCTIONS_12", { enumerable: true, get: function () { return constants_1.CONSTRUCTIONS_12; } });
Object.defineProperty(exports, "GODS_12", { enumerable: true, get: function () { return constants_1.GODS_12; } });
Object.defineProperty(exports, "NAYIN_60", { enumerable: true, get: function () { return constants_1.NAYIN_60; } });
Object.defineProperty(exports, "MANSIONS_28", { enumerable: true, get: function () { return constants_1.MANSIONS_28; } });
Object.defineProperty(exports, "AUSPICIOUS_HOURS", { enumerable: true, get: function () { return constants_1.AUSPICIOUS_HOURS; } });
Object.defineProperty(exports, "CAN_ELEMENTS", { enumerable: true, get: function () { return constants_1.CAN_ELEMENTS; } });
Object.defineProperty(exports, "CHI_ELEMENTS", { enumerable: true, get: function () { return constants_1.CHI_ELEMENTS; } });
Object.defineProperty(exports, "DIRECTIONS", { enumerable: true, get: function () { return constants_1.DIRECTIONS; } });
Object.defineProperty(exports, "DIRECTION_MAP", { enumerable: true, get: function () { return constants_1.DIRECTION_MAP; } });
Object.defineProperty(exports, "WEALTH_GOD_DIR", { enumerable: true, get: function () { return constants_1.WEALTH_GOD_DIR; } });
Object.defineProperty(exports, "JOY_GOD_DIR", { enumerable: true, get: function () { return constants_1.JOY_GOD_DIR; } });
Object.defineProperty(exports, "FORTUNE_GOD_DIR", { enumerable: true, get: function () { return constants_1.FORTUNE_GOD_DIR; } });
Object.defineProperty(exports, "TRAVEL_HOURS_LY", { enumerable: true, get: function () { return constants_1.TRAVEL_HOURS_LY; } });
Object.defineProperty(exports, "PI", { enumerable: true, get: function () { return constants_1.PI; } });
Object.defineProperty(exports, "FIRST_DAY", { enumerable: true, get: function () { return constants_1.FIRST_DAY; } });
Object.defineProperty(exports, "LAST_DAY", { enumerable: true, get: function () { return constants_1.LAST_DAY; } });
var core_1 = require("./core");
Object.defineProperty(exports, "jdn", { enumerable: true, get: function () { return core_1.jdn; } });
Object.defineProperty(exports, "jdn2date", { enumerable: true, get: function () { return core_1.jdn2date; } });
Object.defineProperty(exports, "get_new_moon_day", { enumerable: true, get: function () { return core_1.get_new_moon_day; } });
Object.defineProperty(exports, "get_sun_longitude_aa", { enumerable: true, get: function () { return core_1.get_sun_longitude_aa; } });
Object.defineProperty(exports, "get_lunar_month_11", { enumerable: true, get: function () { return core_1.get_lunar_month_11; } });
Object.defineProperty(exports, "get_leap_month_offset", { enumerable: true, get: function () { return core_1.get_leap_month_offset; } });
Object.defineProperty(exports, "convert_solar_to_lunar", { enumerable: true, get: function () { return core_1.convert_solar_to_lunar; } });
Object.defineProperty(exports, "get_lunar_date", { enumerable: true, get: function () { return core_1.get_lunar_date; } });
Object.defineProperty(exports, "get_sun_longitude", { enumerable: true, get: function () { return core_1.get_sun_longitude; } });
Object.defineProperty(exports, "get_year_info", { enumerable: true, get: function () { return core_1.get_year_info; } });
Object.defineProperty(exports, "get_month", { enumerable: true, get: function () { return core_1.get_month; } });
var calendar_1 = require("./calendar");
Object.defineProperty(exports, "get_year_can_chi", { enumerable: true, get: function () { return calendar_1.get_year_can_chi; } });
Object.defineProperty(exports, "get_hour_can", { enumerable: true, get: function () { return calendar_1.get_hour_can; } });
Object.defineProperty(exports, "get_can_chi", { enumerable: true, get: function () { return calendar_1.get_can_chi; } });
Object.defineProperty(exports, "get_can_element", { enumerable: true, get: function () { return calendar_1.get_can_element; } });
Object.defineProperty(exports, "get_chi_element", { enumerable: true, get: function () { return calendar_1.get_chi_element; } });
Object.defineProperty(exports, "get_year_element", { enumerable: true, get: function () { return calendar_1.get_year_element; } });
Object.defineProperty(exports, "get_element_relation", { enumerable: true, get: function () { return calendar_1.get_element_relation; } });
Object.defineProperty(exports, "get_auspicious_hours", { enumerable: true, get: function () { return calendar_1.get_auspicious_hours; } });
Object.defineProperty(exports, "get_day_of_week", { enumerable: true, get: function () { return calendar_1.get_day_of_week; } });
var astrology_1 = require("./astrology");
Object.defineProperty(exports, "get_12_stars", { enumerable: true, get: function () { return astrology_1.get_12_stars; } });
Object.defineProperty(exports, "get_12_gods", { enumerable: true, get: function () { return astrology_1.get_12_gods; } });
Object.defineProperty(exports, "get_12_constructions", { enumerable: true, get: function () { return astrology_1.get_12_constructions; } });
Object.defineProperty(exports, "get_28_mansions", { enumerable: true, get: function () { return astrology_1.get_28_mansions; } });
Object.defineProperty(exports, "get_nayin", { enumerable: true, get: function () { return astrology_1.get_nayin; } });
Object.defineProperty(exports, "get_day_type", { enumerable: true, get: function () { return astrology_1.get_day_type; } });
Object.defineProperty(exports, "check_good_day", { enumerable: true, get: function () { return astrology_1.check_good_day; } });
Object.defineProperty(exports, "find_good_days", { enumerable: true, get: function () { return astrology_1.find_good_days; } });
var direction_1 = require("./direction");
Object.defineProperty(exports, "get_conflicting_ages", { enumerable: true, get: function () { return direction_1.get_conflicting_ages; } });
Object.defineProperty(exports, "check_age_conflict", { enumerable: true, get: function () { return direction_1.check_age_conflict; } });
Object.defineProperty(exports, "get_direction_info", { enumerable: true, get: function () { return direction_1.get_direction_info; } });
Object.defineProperty(exports, "get_god_directions", { enumerable: true, get: function () { return direction_1.get_god_directions; } });
Object.defineProperty(exports, "get_age_direction", { enumerable: true, get: function () { return direction_1.get_age_direction; } });
Object.defineProperty(exports, "get_travel_direction", { enumerable: true, get: function () { return direction_1.get_travel_direction; } });
Object.defineProperty(exports, "get_time_frame", { enumerable: true, get: function () { return direction_1.get_time_frame; } });
Object.defineProperty(exports, "get_travel_hours", { enumerable: true, get: function () { return direction_1.get_travel_hours; } });
Object.defineProperty(exports, "check_travel_hour", { enumerable: true, get: function () { return direction_1.check_travel_hour; } });
const core_2 = require("./core");
const calendar_2 = require("./calendar");
const astrology_2 = require("./astrology");
const direction_2 = require("./direction");
const constants_2 = require("./constants");
function getFullInfo(dd, mm, yyyy) {
    const lunar = (0, core_2.get_lunar_date)(dd, mm, yyyy);
    const jd = lunar.jd;
    const canNgay = (jd + 9) % 10;
    const chiNgay = (jd + 1) % 12;
    const canThang = (lunar.year * 12 + lunar.month + 3) % 10;
    const chiThang = (lunar.month + 1) % 12;
    const canNam = (lunar.year + 6) % 10;
    const chiNam = (lunar.year + 8) % 12;
    const dayOfWeek = (0, calendar_2.get_day_of_week)(jd);
    return {
        solar: {
            day: dd,
            month: mm,
            year: yyyy,
            dayOfWeek: dayOfWeek
        },
        lunar: {
            day: lunar.day,
            month: lunar.month,
            year: lunar.year,
            leap: lunar.leap,
            monthName: lunar.leap === 1 ? "Tháng " + lunar.month + " nhuận" : "Tháng " + lunar.month
        },
        can_chi: (0, calendar_2.get_can_chi)(lunar),
        elements: {
            day: {
                can: (0, calendar_2.get_can_element)(canNgay),
                chi: (0, calendar_2.get_chi_element)(chiNgay)
            },
            year: (0, calendar_2.get_year_element)(lunar.year)
        },
        stars_12: (0, astrology_2.get_12_stars)(lunar.day, lunar.month),
        constructions_12: (0, astrology_2.get_12_constructions)(lunar.day, lunar.month),
        gods_12: (0, astrology_2.get_12_gods)(jd),
        mansions_28: (0, astrology_2.get_28_mansions)(jd),
        nayin: (0, astrology_2.get_nayin)(jd),
        day_type: (0, astrology_2.get_day_type)(lunar.day, lunar.month),
        conflicting_ages: (0, direction_2.get_conflicting_ages)(jd, yyyy),
        directions: (0, direction_2.get_direction_info)(jd),
        god_directions: (0, direction_2.get_god_directions)(jd),
        solar_term: constants_2.SOLAR_TERMS[(0, core_2.get_sun_longitude)(jd + 1, 7.0)],
        auspicious_hours: (0, calendar_2.get_auspicious_hours)(jd),
        jd: jd
    };
}
const vnLunar = {
    jdn: core_2.jdn,
    jdn2date: core_2.jdn2date,
    get_lunar_date: core_2.get_lunar_date,
    get_month: core_2.get_month,
    get_new_moon_day: core_2.get_new_moon_day,
    get_sun_longitude_aa: core_2.get_sun_longitude_aa,
    get_lunar_month_11: core_2.get_lunar_month_11,
    get_leap_month_offset: core_2.get_leap_month_offset,
    convert_solar_to_lunar: core_2.convert_solar_to_lunar,
    get_can_chi: calendar_2.get_can_chi,
    get_year_can_chi: calendar_2.get_year_can_chi,
    get_hour_can: calendar_2.get_hour_can,
    get_can_element: calendar_2.get_can_element,
    get_chi_element: calendar_2.get_chi_element,
    get_year_element: calendar_2.get_year_element,
    get_element_relation: calendar_2.get_element_relation,
    get_auspicious_hours: calendar_2.get_auspicious_hours,
    get_12_stars: astrology_2.get_12_stars,
    get_12_gods: astrology_2.get_12_gods,
    get_12_constructions: astrology_2.get_12_constructions,
    check_good_day: astrology_2.check_good_day,
    find_good_days: astrology_2.find_good_days,
    get_nayin: astrology_2.get_nayin,
    get_28_mansions: astrology_2.get_28_mansions,
    get_day_type: astrology_2.get_day_type,
    get_sun_longitude: core_2.get_sun_longitude,
    get_conflicting_ages: direction_2.get_conflicting_ages,
    check_age_conflict: direction_2.check_age_conflict,
    get_direction_info: direction_2.get_direction_info,
    get_age_direction: direction_2.get_age_direction,
    get_travel_direction: direction_2.get_travel_direction,
    get_god_directions: direction_2.get_god_directions,
    get_travel_hours: direction_2.get_travel_hours,
    check_travel_hour: direction_2.check_travel_hour,
    get_time_frame: direction_2.get_time_frame,
    getFullInfo
};
exports.default = vnLunar;
//# sourceMappingURL=index.js.map