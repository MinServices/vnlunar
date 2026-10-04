/**
 * Astrology functions: 28 Mansions, Nayin, good-day selection.
 * (Trực / 12 Thần / Hoàng-Hắc Đạo nằm trong almanac.ts và được re-export ở đây để tương thích.)
 */

import type {
  Mansion28Info,
  NayinInfo,
  DaySelectionResult,
  AlmanacOptions,
  Star12Info
} from './types';
import { MANSIONS_28, NAYIN_60, CAN, CHI, GODS_12, STARS_12 } from './constants';
import { jdn } from './core';
import { get_construction_index, get_god_index } from './almanac';

export { get_12_stars, get_12_gods, get_12_constructions, get_day_type } from './almanac';

/** Chỉ số (trong GODS_12) của 6 Thần Hoàng Đạo */
const HOANG_DAO_GOD_INDEXES = [0, 1, 4, 5, 7, 10];

/**
 * Get 28 Lunar Mansion (Nhị Thập Bát Tú)
 * @param jd Julian Day Number
 * @returns Mansion information
 */
export function get_28_mansions(jd: number): Mansion28Info {
  const tuIndex = (jd + 11) % 28;
  return MANSIONS_28[tuIndex];
}

/**
 * Chỉ số Lục Thập Hoa Giáp (0 = Giáp Tý ... 59 = Quý Hợi) từ chỉ số Can và Chi
 */
export function get_sexagenary_index(canIndex: number, chiIndex: number): number {
  // Nghiệm duy nhất của i ≡ can (mod 10), i ≡ chi (mod 12) với can, chi cùng tính chẵn lẻ
  return (6 * canIndex - 5 * chiIndex + 60) % 60;
}

/**
 * Lấy hành từ tên Nạp Âm
 */
export function get_nayin_element(nayinName: string): string {
  if (nayinName.indexOf("Kim") !== -1) return "Kim";
  if (nayinName.indexOf("Mộc") !== -1) return "Mộc";
  if (nayinName.indexOf("Thủy") !== -1) return "Thủy";
  if (nayinName.indexOf("Hỏa") !== -1 || nayinName.indexOf("Hoả") !== -1) return "Hỏa";
  if (nayinName.indexOf("Thổ") !== -1) return "Thổ";
  return "";
}

/**
 * Nạp Âm theo chỉ số Can, Chi
 */
export function get_nayin_by_can_chi(canIndex: number, chiIndex: number): NayinInfo {
  const name = NAYIN_60[get_sexagenary_index(canIndex, chiIndex)];
  return {
    name,
    element: get_nayin_element(name),
    can: CAN[canIndex],
    chi: CHI[chiIndex]
  };
}

/**
 * Get Nayin (Nạp Âm) of the day
 * @param jd Julian Day Number
 * @returns Nayin information
 */
export function get_nayin(jd: number): NayinInfo {
  return get_nayin_by_can_chi((jd + 9) % 10, (jd + 1) % 12);
}

/**
 * Trực phù hợp cho từng loại việc
 */
export const GOOD_CONSTRUCTIONS_FOR_ACTIVITY: Record<string, string[]> = {
  wedding: ["Định", "Thành", "Khai"],
  construction: ["Định", "Thành", "Khai"],
  travel: ["Kiến", "Mãn", "Thành", "Khai"],
  opening: ["Mãn", "Định", "Thành", "Khai"],
  moving: ["Định", "Thành", "Khai"],
  investment: ["Mãn", "Thành", "Thu", "Khai"]
};

const ACTIVITY_NAMES: Record<string, string> = {
  wedding: 'Cưới hỏi',
  construction: 'Xây nhà, khởi công',
  travel: 'Di chuyển, xuất hành',
  opening: 'Khai trương, khai giảng',
  moving: 'Chuyển nhà',
  investment: 'Đầu tư, kinh doanh'
};

/**
 * Check if day is good for specific activity.
 * Ngày tốt = ngày Hoàng Đạo (12 Thần) VÀ Trực nằm trong danh sách hợp với việc.
 * @param jd Julian Day Number
 * @param activity "wedding" | "construction" | "travel" | "opening" | "moving" | "investment"
 * @param options Tùy chọn trucBasis / godBasis
 * @returns Day selection result
 */
export function check_good_day(jd: number, activity: string, options?: AlmanacOptions): DaySelectionResult {
  const star = STARS_12[get_construction_index(jd, options)];
  const godIndex = get_god_index(jd, options);
  const god = GODS_12[godIndex];
  const isHoangDao = HOANG_DAO_GOD_INDEXES.indexOf(godIndex) !== -1;

  const goodList = GOOD_CONSTRUCTIONS_FOR_ACTIVITY[activity] || [];
  const trucOk = goodList.indexOf(star.name) !== -1;
  const isGood = isHoangDao && trucOk;
  const activityName = ACTIVITY_NAMES[activity] || activity;
  const dayLabel = `Ngày Trực ${star.name}, ${god.name} (${isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'})`;

  return {
    star,
    god,
    activity,
    good: isGood,
    description: isGood
      ? `${dayLabel} - TỐT cho ${activityName}`
      : `${dayLabel} - KHÔNG TỐT cho ${activityName}`
  };
}

/**
 * Find good days in a solar month for specific activity
 * @param month Month
 * @param year Year
 * @param activity Activity type
 * @param options Tùy chọn trucBasis / godBasis
 * @returns Array of good days
 */
export function find_good_days(month: number, year: number, activity: string, options?: AlmanacOptions): Array<{
  day: number;
  month: number;
  year: number;
  jd: number;
  star: Star12Info;
  god: string;
}> {
  const goodDays: Array<{ day: number; month: number; year: number; jd: number; star: Star12Info; god: string }> = [];
  const start = jdn(1, month, year);
  const end = month === 12 ? jdn(1, 1, year + 1) : jdn(1, month + 1, year);

  for (let jd = start; jd < end; jd++) {
    const result = check_good_day(jd, activity, options);
    if (result.good) {
      goodDays.push({
        day: jd - start + 1,
        month,
        year,
        jd,
        star: result.star,
        god: result.god ? result.god.name : ''
      });
    }
  }

  return goodDays;
}
