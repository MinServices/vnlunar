/**
 * vnLunar - Vietnamese Lunar Calendar Library
 * Thư viện Âm lịch Việt Nam
 * 
 * @author Min
 * @license Free for personal and non-commercial use
 */

// Export types
export * from './types';

// Export constants
export {
  CAN,
  CHI,
  CHI_ANIMALS,
  WEEKDAYS,
  SOLAR_TERMS,
  ELEMENT,
  STARS_12,
  CONSTRUCTIONS_12,
  GODS_12,
  NAYIN_60,
  MANSIONS_28,
  AUSPICIOUS_HOURS,
  CAN_ELEMENTS,
  CHI_ELEMENTS,
  DIRECTIONS,
  DIRECTION_MAP,
  WEALTH_GOD_DIR,
  JOY_GOD_DIR,
  FORTUNE_GOD_DIR,
  TRAVEL_HOURS_LY,
  PI,
  FIRST_DAY,
  LAST_DAY
} from './constants';

// Export core functions
export {
  jdn,
  jdn2date,
  get_new_moon_day,
  get_sun_longitude_aa,
  get_lunar_month_11,
  get_leap_month_offset,
  convert_solar_to_lunar,
  get_lunar_date,
  get_sun_longitude,
  get_year_info,
  get_month
} from './core';

// Export calendar functions
export {
  get_year_can_chi,
  get_hour_can,
  get_can_chi,
  get_can_element,
  get_chi_element,
  get_year_element,
  get_element_relation,
  get_auspicious_hours,
  get_day_of_week
} from './calendar';

// Export astrology functions
export {
  get_12_stars,
  get_12_gods,
  get_12_constructions,
  get_28_mansions,
  get_nayin,
  get_day_type,
  check_good_day,
  find_good_days
} from './astrology';

// Export direction functions
export {
  get_conflicting_ages,
  check_age_conflict,
  get_direction_info,
  get_god_directions,
  get_age_direction,
  get_travel_direction,
  get_time_frame,
  get_travel_hours,
  check_travel_hour
} from './direction';

// Import for comprehensive info function
import type { FullDateInfo } from './types';
import { 
  get_lunar_date, 
  get_sun_longitude, 
  jdn as jdnCore, 
  jdn2date as jdn2dateCore,
  get_month as get_monthCore,
  get_new_moon_day as get_new_moon_dayCore,
  get_sun_longitude_aa as get_sun_longitude_aaCore,
  get_lunar_month_11 as get_lunar_month_11Core,
  get_leap_month_offset as get_leap_month_offsetCore,
  convert_solar_to_lunar as convert_solar_to_lunarCore
} from './core';
import { 
  get_can_chi, 
  get_year_element, 
  get_can_element, 
  get_chi_element, 
  get_auspicious_hours, 
  get_day_of_week,
  get_year_can_chi as get_year_can_chiCalendar,
  get_hour_can as get_hour_canCalendar,
  get_element_relation as get_element_relationCalendar
} from './calendar';
import { 
  get_12_stars, 
  get_12_gods, 
  get_12_constructions, 
  get_28_mansions, 
  get_nayin, 
  get_day_type,
  check_good_day as check_good_dayAstrology,
  find_good_days as find_good_daysAstrology
} from './astrology';
import { 
  get_conflicting_ages, 
  get_direction_info, 
  get_god_directions,
  check_age_conflict as check_age_conflictDirection,
  get_age_direction as get_age_directionDirection,
  get_travel_direction as get_travel_directionDirection,
  get_travel_hours as get_travel_hoursDirection,
  check_travel_hour as check_travel_hourDirection,
  get_time_frame as get_time_frameDirection
} from './direction';
import { SOLAR_TERMS } from './constants';

/**
 * Get full information about a date
 * @param dd Day
 * @param mm Month
 * @param yyyy Year
 * @returns Complete date information
 */
export function getFullInfo(dd: number, mm: number, yyyy: number): FullDateInfo {
  const lunar = get_lunar_date(dd, mm, yyyy);
  const jd = lunar.jd;

  const canNgay = (jd + 9) % 10;
  const chiNgay = (jd + 1) % 12;
  const canThang = (lunar.year * 12 + lunar.month + 3) % 10;
  const chiThang = (lunar.month + 1) % 12;
  const canNam = (lunar.year + 6) % 10;
  const chiNam = (lunar.year + 8) % 12;

  const dayOfWeek = get_day_of_week(jd);

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
    can_chi: get_can_chi(lunar),
    elements: {
      day: {
        can: get_can_element(canNgay) as any,
        chi: get_chi_element(chiNgay) as any
      },
      year: get_year_element(lunar.year)
    },
    stars_12: get_12_stars(lunar.day, lunar.month),
    constructions_12: get_12_constructions(lunar.day, lunar.month),
    gods_12: get_12_gods(jd),
    mansions_28: get_28_mansions(jd),
    nayin: get_nayin(jd),
    day_type: get_day_type(lunar.day, lunar.month),
    conflicting_ages: get_conflicting_ages(jd, yyyy),
    directions: get_direction_info(jd),
    god_directions: get_god_directions(jd),
    solar_term: SOLAR_TERMS[get_sun_longitude(jd + 1, 7.0)],
    auspicious_hours: get_auspicious_hours(jd),
    jd: jd
  };
}

// Default export
const vnLunar = {
  // Core
  jdn: jdnCore,
  jdn2date: jdn2dateCore,
  get_lunar_date,
  get_month: get_monthCore,
  get_new_moon_day: get_new_moon_dayCore,
  get_sun_longitude_aa: get_sun_longitude_aaCore,
  get_lunar_month_11: get_lunar_month_11Core,
  get_leap_month_offset: get_leap_month_offsetCore,
  convert_solar_to_lunar: convert_solar_to_lunarCore,
  
  // Calendar
  get_can_chi,
  get_year_can_chi: get_year_can_chiCalendar,
  get_hour_can: get_hour_canCalendar,
  get_can_element,
  get_chi_element,
  get_year_element,
  get_element_relation: get_element_relationCalendar,
  get_auspicious_hours,
  
  // Astrology
  get_12_stars,
  get_12_gods,
  get_12_constructions,
  check_good_day: check_good_dayAstrology,
  find_good_days: find_good_daysAstrology,
  get_nayin,
  get_28_mansions,
  get_day_type,
  get_sun_longitude,
  
  // Direction
  get_conflicting_ages,
  check_age_conflict: check_age_conflictDirection,
  get_direction_info,
  get_age_direction: get_age_directionDirection,
  get_travel_direction: get_travel_directionDirection,
  get_god_directions,
  get_travel_hours: get_travel_hoursDirection,
  check_travel_hour: check_travel_hourDirection,
  get_time_frame: get_time_frameDirection,
  
  // Full info
  getFullInfo
};

export default vnLunar;
