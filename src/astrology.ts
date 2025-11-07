/**
 * Astrology functions: 12 Stars, 28 Mansions, Nayin, etc.
 */

import type { 
  Star12Info, 
  God12Info, 
  Construction12Info, 
  Mansion28Info, 
  NayinInfo, 
  DayTypeInfo,
  DaySelectionResult 
} from './types';
import { 
  STARS_12, 
  GODS_12, 
  CONSTRUCTIONS_12, 
  MANSIONS_28, 
  NAYIN_60,
  CAN,
  CHI 
} from './constants';
import { jdn2date, convert_solar_to_lunar, jdn } from './core';

/**
 * Get 12 Day Officer (12 Sao Kiến Trừ)
 * @param lunarDay Lunar day
 * @param lunarMonth Lunar month
 * @returns Star information
 */
export function get_12_stars(lunarDay: number, lunarMonth: number): Star12Info {
  let saoIndex = (lunarMonth + lunarDay - 2) % 12;
  if (saoIndex < 0) saoIndex += 12;
  return STARS_12[saoIndex];
}

/**
 * Get 12 Gods (Hoàng Đạo/Hắc Đạo)
 * @param jd Julian Day Number
 * @returns God information
 */
export function get_12_gods(jd: number): God12Info {
  const chiNgay = (jd + 1) % 12;
  const thanIndex = (chiNgay + 8) % 12;
  return GODS_12[thanIndex];
}

/**
 * Get 12 Day Construction (Thập Nhị Trực)
 * @param lunarDay Lunar day
 * @param lunarMonth Lunar month
 * @returns Construction information
 */
export function get_12_constructions(lunarDay: number, lunarMonth: number): Construction12Info {
  let index = (lunarDay + lunarMonth + 2) % 12;
  if (index < 0) index += 12;
  return CONSTRUCTIONS_12[index];
}

/**
 * Get 28 Lunar Mansion
 * @param jd Julian Day Number
 * @returns Mansion information
 */
export function get_28_mansions(jd: number): Mansion28Info {
  const tuIndex = (jd + 15) % 28;
  return MANSIONS_28[tuIndex];
}

/**
 * Get Nayin (Nạp Âm) of the day
 * @param jd Julian Day Number
 * @returns Nayin information
 */
export function get_nayin(jd: number): NayinInfo {
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

  if (nayin_name.indexOf("Kim") !== -1) element = "Kim";
  else if (nayin_name.indexOf("Mộc") !== -1) element = "Mộc";
  else if (nayin_name.indexOf("Thủy") !== -1) element = "Thủy";
  else if (nayin_name.indexOf("Hỏa") !== -1 || nayin_name.indexOf("Hoả") !== -1) element = "Hỏa";
  else if (nayin_name.indexOf("Thổ") !== -1) element = "Thổ";

  return {
    name: nayin_name,
    element: element,
    can: CAN[canIndex],
    chi: CHI[chiIndex]
  };
}

/**
 * Check if day is Hoàng Đạo or Hắc Đạo
 * @param lunarDay Lunar day
 * @param lunarMonth Lunar month
 * @returns Auspicious/Inauspicious information
 */
export function get_day_type(lunarDay: number, lunarMonth: number): DayTypeInfo {
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

/**
 * Check if day is good for specific activity
 * @param jd Julian Day Number
 * @param activity Activity type: "cuoi", "xaynha", "xuathanh", "khaotruong"
 * @returns Day selection result
 */
export function check_good_day(jd: number, activity: string): DaySelectionResult {
  const solarDate = jdn2date(jd);
  const lunar = convert_solar_to_lunar(solarDate[0], solarDate[1], solarDate[2], 7.0);
  const sao = get_12_stars(lunar.day, lunar.month);
  
  const good_for_activity: Record<string, string[]> = {
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

/**
 * Find good days in a month for specific activity
 * @param month Month
 * @param year Year
 * @param activity Activity type
 * @returns Array of good days
 */
export function find_good_days(month: number, year: number, activity: string): Array<{
  day: number;
  month: number;
  year: number;
  jd: number;
  sao: Star12Info;
}> {
  const good_days: Array<{day: number; month: number; year: number; jd: number; sao: Star12Info}> = [];
  let daysInMonth = 31;

  if (month === 2) {
    daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
  } else if ([4, 6, 9, 11].indexOf(month) !== -1) {
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
