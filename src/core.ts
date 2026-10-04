/**
 * Core functions for Vietnamese Lunar Calendar
 * Astronomical algorithms for lunar calendar conversion
 */

import type { LunarDate } from './types';
import { TK19, TK20, TK21, TK22, PI, FIRST_DAY, LAST_DAY } from './constants';

/**
 * Integer part of a number
 */
function INT(d: number): number {
  return Math.floor(d);
}

/**
 * Convert solar date to Julian Day Number
 * @param dd Day
 * @param mm Month
 * @param yy Year
 * @returns Julian Day Number
 */
export function jdn(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  const jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  return jd;
}

/**
 * Convert Julian Day Number to solar date
 * @param jd Julian Day Number
 * @returns [day, month, year]
 */
export function jdn2date(jd: number): [number, number, number] {
  let Z: number, A: number, alpha: number, B: number, C: number, D: number, E: number;
  let dd: number, mm: number, yyyy: number;
  
  Z = jd;
  if (Z < 2299161) {
    A = Z;
  } else {
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
  } else {
    mm = E - 13;
  }
  if (mm < 3) {
    yyyy = C - 4715;
  } else {
    yyyy = C - 4716;
  }
  return [dd, mm, yyyy];
}

/**
 * Calculate new moon day (Sóc)
 * Using astronomical algorithm
 * @param k Moon phase number (k=0 at 1/1/1900)
 * @param timeZone Time zone (Vietnam = 7.0)
 * @returns Julian Day Number of new moon
 */
export function get_new_moon_day(k: number, timeZone: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
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
  let deltat: number;
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  const JdNew = Jd1 + C1 - deltat;
  return INT(JdNew + 0.5 + timeZone / 24);
}

/**
 * Calculate sun longitude for solar terms
 * @param jdn Julian Day Number
 * @param timeZone Time zone (Vietnam = 7.0)
 * @returns Sector number (0-11) for 12 major solar terms
 */
export function get_sun_longitude_aa(jdn: number, timeZone: number): number {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * (INT(L / (PI * 2)));
  return INT(L / PI * 6);
}

/**
 * Find lunar month 11 (containing Winter Solstice)
 * @param yy Solar year
 * @param timeZone Time zone (Vietnam = 7.0)
 * @returns Julian Day Number of first day of lunar month 11
 */
export function get_lunar_month_11(yy: number, timeZone: number): number {
  const off = jdn(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = get_new_moon_day(k, timeZone);
  const sunLong = get_sun_longitude_aa(nm, timeZone);
  if (sunLong >= 9) {
    nm = get_new_moon_day(k - 1, timeZone);
  }
  return nm;
}

/**
 * Determine leap month position after lunar month 11
 * @param a11 JDN of lunar month 11
 * @param timeZone Time zone (Vietnam = 7.0)
 * @returns Leap month position (1-12), 0 if no leap month
 */
export function get_leap_month_offset(a11: number, timeZone: number): number {
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

/**
 * Convert solar date to lunar date
 * Using astronomical algorithm according to rules.md
 * @param dd Day
 * @param mm Month
 * @param yy Year
 * @param timeZone Time zone (Vietnam = 7.0)
 * @returns LunarDate object
 */
export function convert_solar_to_lunar(dd: number, mm: number, yy: number, timeZone: number): LunarDate {
  const dayNumber = jdn(dd, mm, yy);
  // Tìm k sao cho newMoon(k+1) <= dayNumber < newMoon(k+2).
  // (v1.x chỉ thử k+1 rồi k nên có thể ra ngày âm <= 0 ở một số ngày biên.)
  let k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = get_new_moon_day(k + 1, timeZone);
  while (monthStart > dayNumber) {
    k--;
    monthStart = get_new_moon_day(k + 1, timeZone);
  }
  while (get_new_moon_day(k + 2, timeZone) <= dayNumber) {
    k++;
    monthStart = get_new_moon_day(k + 1, timeZone);
  }

  let a11 = get_lunar_month_11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = get_lunar_month_11(yy - 1, timeZone);
  } else {
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

/**
 * Get lunar date from solar date
 * Main conversion function.
 *
 * - Không truyền `timeZone` và ngày nằm trong 25/01/1800..31/12/2199: tra bảng
 *   TK19..TK22 của Hồ Ngọc Đức (đúng với lịch đã ban hành, kể cả giai đoạn
 *   trước 1968 dùng giờ UTC+8).
 * - Ngoài khoảng đó, hoặc khi truyền `timeZone` tường minh: tính thiên văn.
 * @param dd Day
 * @param mm Month
 * @param yyyy Year
 * @param timeZone (tùy chọn) ép dùng thuật toán thiên văn với múi giờ này
 * @returns LunarDate object
 */
export function get_lunar_date(dd: number, mm: number, yyyy: number, timeZone?: number): LunarDate {
  if (timeZone === undefined) {
    const fromTable = get_lunar_date_from_table(dd, mm, yyyy);
    if (fromTable) return fromTable;
    timeZone = 7.0; // Vietnam timezone
  }
  return convert_solar_to_lunar(dd, mm, yyyy, timeZone);
}

/**
 * Tra ngày âm từ bảng TK19..TK22 (1800-2199).
 * @returns LunarDate hoặc null nếu nằm ngoài phạm vi bảng
 */
export function get_lunar_date_from_table(dd: number, mm: number, yyyy: number): LunarDate | null {
  const jd = jdn(dd, mm, yyyy);
  if (jd < FIRST_DAY || jd > LAST_DAY) return null;
  let ly = get_year_info(yyyy);
  if (jd < ly[0].jd) {
    if (yyyy - 1 < 1800) return null;
    ly = get_year_info(yyyy - 1);
  }
  let i = ly.length - 1;
  while (i > 0 && jd < ly[i].jd) {
    i--;
  }
  const off = jd - ly[i].jd;
  return { day: 1 + off, month: ly[i].month, year: ly[i].year, leap: ly[i].leap, jd };
}

/**
 * Chuyển âm lịch sang dương lịch bằng thuật toán thiên văn (port từ Hồ Ngọc Đức).
 * @returns JDN của ngày dương, hoặc null nếu ngày âm không tồn tại
 */
function lunar_to_jd_astronomical(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: number, timeZone: number): number | null {
  let a11: number, b11: number;
  if (lunarMonth < 11) {
    a11 = get_lunar_month_11(lunarYear - 1, timeZone);
    b11 = get_lunar_month_11(lunarYear, timeZone);
  } else {
    a11 = get_lunar_month_11(lunarYear, timeZone);
    b11 = get_lunar_month_11(lunarYear + 1, timeZone);
  }
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = get_leap_month_offset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (lunarLeap !== 0 && lunarMonth !== leapMonth) {
      return null;
    } else if (lunarLeap !== 0 || off >= leapOff) {
      off += 1;
    }
  } else if (lunarLeap !== 0) {
    return null;
  }
  const monthStart = get_new_moon_day(k + off, timeZone);
  const nextMonthStart = get_new_moon_day(k + off + 1, timeZone);
  if (lunarDay > nextMonthStart - monthStart) return null;
  return monthStart + lunarDay - 1;
}

/**
 * Chuyển âm lịch sang dương lịch bằng bảng TK19..TK22.
 * @returns JDN, null nếu ngày âm không tồn tại, undefined nếu năm nằm ngoài bảng
 */
function lunar_to_jd_table(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: number): number | null | undefined {
  if (lunarYear < 1800 || lunarYear > 2199) return undefined;
  const ly = get_year_info(lunarYear);
  const lengths = get_year_month_lengths(lunarYear);
  for (let i = 0; i < ly.length; i++) {
    if (ly[i].month === lunarMonth && ly[i].leap === (lunarLeap ? 1 : 0)) {
      if (lunarDay > lengths[i]) return null;
      return ly[i].jd + lunarDay - 1;
    }
  }
  return null;
}

/**
 * Convert lunar date to solar date
 * @param lunarDay Lunar day (1-30)
 * @param lunarMonth Lunar month (1-12)
 * @param lunarYear Lunar year
 * @param lunarLeap 1 nếu là tháng nhuận
 * @param timeZone (tùy chọn) ép dùng thuật toán thiên văn với múi giờ này
 * @returns [day, month, year] hoặc null nếu ngày âm không tồn tại
 */
export function convert_lunar_to_solar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: number = 0,
  timeZone?: number
): [number, number, number] | null {
  if (lunarDay < 1 || lunarDay > 30 || lunarMonth < 1 || lunarMonth > 12) return null;
  let jd: number | null | undefined = undefined;
  if (timeZone === undefined) {
    jd = lunar_to_jd_table(lunarDay, lunarMonth, lunarYear, lunarLeap);
  }
  if (jd === undefined) {
    jd = lunar_to_jd_astronomical(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone ?? 7.0);
  }
  return jd === null ? null : jdn2date(jd);
}

/**
 * Get solar date from lunar date (alias thân thiện của convert_lunar_to_solar)
 * @returns { day, month, year, jd } hoặc null nếu ngày âm không tồn tại
 */
export function get_solar_date(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: number = 0
): { day: number; month: number; year: number; jd: number } | null {
  const r = convert_lunar_to_solar(lunarDay, lunarMonth, lunarYear, lunarLeap);
  if (!r) return null;
  return { day: r[0], month: r[1], year: r[2], jd: jdn(r[0], r[1], r[2]) };
}

/**
 * Calculate sun longitude for solar terms (alternative method)
 * @param jdn Julian Day Number
 * @returns Sun longitude in radians
 */
function sun_longitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * (INT(L / (PI * 2)));
  return L;
}

/**
 * Get sun longitude sector
 * @param dayNumber Julian Day Number
 * @param timeZone Time zone
 * @returns Sector number (0-23) for 24 solar terms
 */
export function get_sun_longitude(dayNumber: number, timeZone: number): number {
  return INT(sun_longitude(dayNumber - 0.5 - timeZone / 24.0) / PI * 12);
}

/**
 * Decode lunar year data (fallback method)
 * @param yy Year
 * @param k Year code
 * @returns Array of LunarDate for first day of each month
 */
function decode_lunar_year(yy: number, k: number): LunarDate[] {
  const monthLengths = [29, 30];
  const regularMonths: number[] = [];
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

  const ly: LunarDate[] = [];
  if (leapMonth === 0) {
    for (let mm = 1; mm <= 12; mm++) {
      ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD });
      currentJD += regularMonths[mm - 1];
    }
  } else {
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

/**
 * Get year information (fallback method)
 * @param yyyy Year
 * @returns Array of LunarDate
 */
export function get_year_info(yyyy: number): LunarDate[] {
  return decode_lunar_year(yyyy, get_year_code(yyyy));
}

/**
 * Mã năm trong bảng TK19..TK22
 */
function get_year_code(yyyy: number): number {
  if (yyyy < 1800 || yyyy > 2199) {
    throw new RangeError(`Year ${yyyy} is outside the lunar table range 1800-2199`);
  }
  if (yyyy < 1900) return TK19[yyyy - 1800];
  if (yyyy < 2000) return TK20[yyyy - 1900];
  if (yyyy < 2100) return TK21[yyyy - 2000];
  return TK22[yyyy - 2100];
}

/**
 * Độ dài (29/30 ngày) của từng tháng trong năm âm, cùng thứ tự với get_year_info
 */
export function get_year_month_lengths(yyyy: number): number[] {
  const k = get_year_code(yyyy);
  const monthLengths = [29, 30];
  const regular: number[] = [];
  let j = k >> 4;
  for (let i = 0; i < 12; i++) {
    regular[12 - i - 1] = monthLengths[j & 0x1];
    j >>= 1;
  }
  const leapMonth = k & 0xf;
  if (leapMonth === 0) return regular;
  const leapLength = monthLengths[(k >> 16) & 0x1];
  return [...regular.slice(0, leapMonth), leapLength, ...regular.slice(leapMonth)];
}

/**
 * Get lunar month information
 * @param mm Solar month
 * @param yy Solar year
 * @returns Array of LunarDate for all days in the month
 */
export function get_month(mm: number, yy: number): LunarDate[] {
  const mm1 = mm < 12 ? mm + 1 : 1;
  const yy1 = mm < 12 ? yy : yy + 1;
  const jd1 = jdn(1, mm, yy);
  const jd2 = jdn(1, mm1, yy1);
  const result: LunarDate[] = [];

  for (let i = jd1; i < jd2; i++) {
    const solarDate = jdn2date(i);
    const lunar = get_lunar_date(solarDate[0], solarDate[1], solarDate[2]);
    result.push(lunar);
  }
  return result;
}
