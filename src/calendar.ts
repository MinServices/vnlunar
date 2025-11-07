/**
 * Calendar functions for Can Chi, Five Elements
 */

import type { LunarDate, CanChiInfo, ElementInfo, YearElementInfo } from './types';
import { CAN, CHI, CHI_ANIMALS, CAN_ELEMENTS, CHI_ELEMENTS, ELEMENT, AUSPICIOUS_HOURS, WEEKDAYS } from './constants';

/**
 * Get year Can Chi
 * @param year Year
 * @returns Can Chi string
 */
export function get_year_can_chi(year: number): string {
  return CAN[(year + 6) % 10] + " " + CHI[(year + 8) % 12];
}

/**
 * Get Can of hour Tý (00:00) of the day
 * @param jdn Julian Day Number
 * @returns Can string
 */
export function get_hour_can(jdn: number): string {
  return CAN[(jdn - 1) * 2 % 10];
}

/**
 * Get full Can Chi of day, month, year
 * @param lunar LunarDate object
 * @returns [day Can Chi, month Can Chi, year Can Chi]
 */
export function get_can_chi(lunar: LunarDate): CanChiInfo {
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

/**
 * Get Five Element of Can
 * @param canIndex Can index (0-9)
 * @returns Five Element name
 */
export function get_can_element(canIndex: number): string {
  return CAN_ELEMENTS[canIndex % 10];
}

/**
 * Get Five Element of Chi
 * @param chiIndex Chi index (0-11)
 * @returns Five Element name
 */
export function get_chi_element(chiIndex: number): string {
  return CHI_ELEMENTS[chiIndex % 12];
}

/**
 * Get Five Element information of year
 * @param year Year
 * @returns Year Five Element info
 */
export function get_year_element(year: number): YearElementInfo {
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
    element: CAN_ELEMENTS[canIndex] as any,
    can_element: CAN_ELEMENTS[canIndex] as any,
    chi_element: CHI_ELEMENTS[chiIndex] as any
  };
}

/**
 * Get relationship between two Five Elements
 * @param nh1 First element
 * @param nh2 Second element
 * @returns Relationship: "sinh", "khắc", "bị khắc", "trung hòa"
 */
export function get_element_relation(nh1: string, nh2: string): string {
  const sinhCycle: Record<string, string> = {
    [ELEMENT.WATER]: ELEMENT.WOOD,
    [ELEMENT.WOOD]: ELEMENT.FIRE,
    [ELEMENT.FIRE]: ELEMENT.EARTH,
    [ELEMENT.EARTH]: ELEMENT.METAL,
    [ELEMENT.METAL]: ELEMENT.WATER
  };

  const khacCycle: Record<string, string> = {
    [ELEMENT.WATER]: ELEMENT.FIRE,
    [ELEMENT.FIRE]: ELEMENT.METAL,
    [ELEMENT.METAL]: ELEMENT.WOOD,
    [ELEMENT.WOOD]: ELEMENT.EARTH,
    [ELEMENT.EARTH]: ELEMENT.WATER
  };

  if (nh1 === nh2) return "trung hòa";
  if (sinhCycle[nh1] === nh2) return "sinh";
  if (khacCycle[nh1] === nh2) return "khắc";
  if (khacCycle[nh2] === nh1) return "bị khắc";
  return "trung hòa";
}

/**
 * Get auspicious hours of the day
 * @param jd Julian Day Number
 * @returns String of auspicious hours
 */
export function get_auspicious_hours(jd: number): string {
  const chiOfDay = (jd + 1) % 12;
  const gioHD_data = AUSPICIOUS_HOURS[chiOfDay];
  let ret = "";
  let count = 0;
  for (let i = 0; i < 12; i++) {
    if (gioHD_data.charAt(i) === '1') {
      ret += CHI[i];
      ret += ' (' + ((i * 2 + 23) % 24) + '-' + ((i * 2 + 1) % 24) + 'h)';
      if (count++ < 5) ret += ', ';
      if (count === 3) ret += '\n';
    }
  }
  return ret;
}

/**
 * Get day of week name
 * @param jd Julian Day Number
 * @returns Day of week name
 */
export function get_day_of_week(jd: number): string {
  return WEEKDAYS[(jd + 1) % 7];
}
