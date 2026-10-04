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
  NAYIN_30,
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
  convert_lunar_to_solar,
  get_lunar_date,
  get_lunar_date_from_table,
  get_solar_date,
  get_sun_longitude,
  get_year_info,
  get_year_month_lengths,
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

// Export almanac functions
export {
  DEFAULT_ALMANAC_OPTIONS,
  resolve_almanac_options,
  get_day_can_index,
  get_day_chi_index,
  get_solar_term,
  get_solar_term_index,
  solar_term_index_to_month_chi,
  get_month_chi,
  get_construction_index,
  get_god_index,
  get_12_stars,
  get_12_gods,
  get_12_constructions,
  get_day_type,
  get_hours_can_chi,
  get_four_pillars
} from './almanac';

// Export astrology functions
export {
  get_28_mansions,
  get_nayin,
  get_nayin_by_can_chi,
  get_nayin_element,
  get_sexagenary_index,
  check_good_day,
  find_good_days,
  GOOD_CONSTRUCTIONS_FOR_ACTIVITY
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
import type { FullDateInfo, AlmanacOptions } from './types';
import * as core from './core';
import * as calendar from './calendar';
import * as almanac from './almanac';
import * as astrology from './astrology';
import * as direction from './direction';

/**
 * Get full information about a date
 * @param dd Day
 * @param mm Month
 * @param yyyy Year
 * @param options Tùy chọn: trucBasis (mặc định "solar_term"), godBasis (mặc định "lunar"), timeZone (mặc định 7)
 * @returns Complete date information
 */
export function getFullInfo(dd: number, mm: number, yyyy: number, options?: AlmanacOptions): FullDateInfo {
  const opts = almanac.resolve_almanac_options(options);
  const lunar = core.get_lunar_date(dd, mm, yyyy);
  const jd = lunar.jd;

  const canNgay = (jd + 9) % 10;
  const chiNgay = (jd + 1) % 12;
  const term = almanac.get_solar_term(jd, opts.timeZone);
  const canChi = calendar.get_can_chi(lunar);
  canChi.hour = calendar.get_hour_can(jd) + " Tý";

  return {
    solar: {
      day: dd,
      month: mm,
      year: yyyy,
      dayOfWeek: calendar.get_day_of_week(jd)
    },
    lunar: {
      day: lunar.day,
      month: lunar.month,
      year: lunar.year,
      leap: lunar.leap,
      monthName: lunar.leap === 1 ? "Tháng " + lunar.month + " nhuận" : "Tháng " + lunar.month
    },
    can_chi: canChi,
    elements: {
      day: {
        can: calendar.get_can_element(canNgay) as any,
        chi: calendar.get_chi_element(chiNgay) as any
      },
      year: calendar.get_year_element(lunar.year)
    },
    stars_12: almanac.get_12_stars(jd, opts),
    constructions_12: almanac.get_12_constructions(jd, opts),
    gods_12: almanac.get_12_gods(jd, opts),
    mansions_28: astrology.get_28_mansions(jd),
    nayin: astrology.get_nayin(jd),
    day_type: almanac.get_day_type(jd, opts),
    conflicting_ages: direction.get_conflicting_ages(jd, lunar.year),
    god_directions: direction.get_god_directions(jd),
    directions: direction.get_direction_info(jd),
    solar_term: term.name,
    solar_term_info: term,
    auspicious_hours: calendar.get_auspicious_hours(jd),
    options: opts,
    jd: jd
  };
}

// Default export
const vnLunar = {
  // Core
  jdn: core.jdn,
  jdn2date: core.jdn2date,
  get_lunar_date: core.get_lunar_date,
  get_solar_date: core.get_solar_date,
  convert_lunar_to_solar: core.convert_lunar_to_solar,
  get_month: core.get_month,
  get_new_moon_day: core.get_new_moon_day,
  get_sun_longitude_aa: core.get_sun_longitude_aa,
  get_lunar_month_11: core.get_lunar_month_11,
  get_leap_month_offset: core.get_leap_month_offset,
  convert_solar_to_lunar: core.convert_solar_to_lunar,
  get_sun_longitude: core.get_sun_longitude,
  
  // Calendar
  get_can_chi: calendar.get_can_chi,
  get_year_can_chi: calendar.get_year_can_chi,
  get_hour_can: calendar.get_hour_can,
  get_can_element: calendar.get_can_element,
  get_chi_element: calendar.get_chi_element,
  get_year_element: calendar.get_year_element,
  get_element_relation: calendar.get_element_relation,
  get_auspicious_hours: calendar.get_auspicious_hours,

  // Almanac
  get_solar_term: almanac.get_solar_term,
  get_month_chi: almanac.get_month_chi,
  get_12_stars: almanac.get_12_stars,
  get_12_gods: almanac.get_12_gods,
  get_12_constructions: almanac.get_12_constructions,
  get_day_type: almanac.get_day_type,
  get_hours_can_chi: almanac.get_hours_can_chi,
  get_four_pillars: almanac.get_four_pillars,
  
  // Astrology
  check_good_day: astrology.check_good_day,
  find_good_days: astrology.find_good_days,
  get_nayin: astrology.get_nayin,
  get_28_mansions: astrology.get_28_mansions,
  
  // Direction
  get_conflicting_ages: direction.get_conflicting_ages,
  check_age_conflict: direction.check_age_conflict,
  get_direction_info: direction.get_direction_info,
  get_age_direction: direction.get_age_direction,
  get_travel_direction: direction.get_travel_direction,
  get_god_directions: direction.get_god_directions,
  get_travel_hours: direction.get_travel_hours,
  check_travel_hour: direction.check_travel_hour,
  get_time_frame: direction.get_time_frame,
  
  // Full info
  getFullInfo
};

export default vnLunar;
