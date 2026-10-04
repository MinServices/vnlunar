/**
 * Almanac functions (Lịch vạn niên): Tiết khí, Thập Nhị Trực, 12 Thần Hoàng/Hắc Đạo, Tứ Trụ.
 *
 * Quy ước (xem docs/DECISIONS.md):
 * - Chi tháng theo âm lịch: (tháng âm + 1) % 12 (tháng Giêng = Dần).
 * - Chi tháng theo tiết khí: tháng Dần bắt đầu từ Lập Xuân, mỗi tiết (Tiết lệnh) đổi một tháng.
 * - Trực = (chi ngày - chi tháng) mod 12, 0 = Kiến.
 * - 12 Thần: Thanh Long khởi tại Tý ở tháng Dần/Thân, Dần ở tháng Mão/Dậu, ... (bước 2 chi).
 * - Mặc định trucBasis = "solar_term", godBasis = "lunar" (khớp đa số lịch vạn niên Việt Nam).
 */

import type {
  AlmanacOptions,
  MonthBasis,
  Star12Info,
  Construction12Info,
  God12Info,
  DayTypeInfo,
  SolarTermInfo,
  PillarInfo,
  FourPillarsInfo
} from './types';
import { CAN, CHI, SOLAR_TERMS, STARS_12, CONSTRUCTIONS_12, GODS_12 } from './constants';
import { jdn, jdn2date, get_lunar_date, get_sun_longitude } from './core';

export const DEFAULT_ALMANAC_OPTIONS: Required<AlmanacOptions> = {
  trucBasis: 'solar_term',
  godBasis: 'lunar',
  timeZone: 7
};

/** Chỉ số (trong GODS_12) của 6 Thần Hoàng Đạo */
const HOANG_DAO_GOD_INDEXES = [0, 1, 4, 5, 7, 10];

/**
 * Điền giá trị mặc định cho tùy chọn
 */
export function resolve_almanac_options(options?: AlmanacOptions): Required<AlmanacOptions> {
  return {
    trucBasis: options?.trucBasis ?? DEFAULT_ALMANAC_OPTIONS.trucBasis,
    godBasis: options?.godBasis ?? DEFAULT_ALMANAC_OPTIONS.godBasis,
    timeZone: options?.timeZone ?? DEFAULT_ALMANAC_OPTIONS.timeZone
  };
}

function assert_jd(jd: number, fn: string): void {
  if (typeof jd !== 'number' || !isFinite(jd) || jd < 100000) {
    throw new TypeError(
      `${fn}(jd, options?) nhận Julian Day Number (vd. jdn(8, 11, 2025)). ` +
      `Chữ ký cũ ${fn}(lunarDay, lunarMonth) của v1.x đã bị bỏ vì cho kết quả sai.`
    );
  }
}

/**
 * Chi ngày (0 = Tý)
 */
export function get_day_chi_index(jd: number): number {
  return (jd + 1) % 12;
}

/**
 * Can ngày (0 = Giáp)
 */
export function get_day_can_index(jd: number): number {
  return (jd + 9) % 10;
}

/**
 * Chỉ số tiết khí tại cuối ngày (0 = Xuân phân ... 23 = Kinh trập)
 */
export function get_solar_term_index(jd: number, timeZone: number = 7): number {
  return get_sun_longitude(jd + 1, timeZone);
}

/**
 * Chi của tháng tiết khí (2 = Dần, bắt đầu từ Lập Xuân)
 */
export function solar_term_index_to_month_chi(termIndex: number): number {
  return (Math.floor(((termIndex - 21 + 24) % 24) / 2) + 2) % 12;
}

/**
 * Tiết khí của ngày
 */
export function get_solar_term(jd: number, timeZone: number = 7): SolarTermInfo {
  const index = get_solar_term_index(jd, timeZone);
  return {
    index,
    name: SOLAR_TERMS[index],
    month_chi: solar_term_index_to_month_chi(index)
  };
}

/**
 * Chi tháng của ngày theo cách tính đã chọn
 * @param jd Julian Day Number
 * @param basis "lunar" | "solar_term"
 * @param timeZone Múi giờ cho tiết khí
 */
export function get_month_chi(jd: number, basis: MonthBasis = 'lunar', timeZone: number = 7): number {
  if (basis === 'solar_term') {
    return solar_term_index_to_month_chi(get_solar_term_index(jd, timeZone));
  }
  const [dd, mm, yy] = jdn2date(jd);
  const lunar = get_lunar_date(dd, mm, yy);
  return (lunar.month + 1) % 12;
}

/**
 * Chỉ số Trực (0 = Kiến ... 11 = Bế)
 */
export function get_construction_index(jd: number, options?: AlmanacOptions): number {
  const opts = resolve_almanac_options(options);
  const monthChi = get_month_chi(jd, opts.trucBasis, opts.timeZone);
  return (get_day_chi_index(jd) - monthChi + 12) % 12;
}

/**
 * Thập Nhị Trực của ngày (chi tiết việc nên/không nên)
 * @param jd Julian Day Number
 * @param options trucBasis mặc định "solar_term"
 */
export function get_12_constructions(jd: number, options?: AlmanacOptions): Construction12Info {
  assert_jd(jd, 'get_12_constructions');
  return CONSTRUCTIONS_12[get_construction_index(jd, options)];
}

/**
 * Thập Nhị Trực của ngày (dạng tóm tắt có trạng thái tốt/xấu)
 * @param jd Julian Day Number
 * @param options trucBasis mặc định "solar_term"
 */
export function get_12_stars(jd: number, options?: AlmanacOptions): Star12Info {
  assert_jd(jd, 'get_12_stars');
  return STARS_12[get_construction_index(jd, options)];
}

/**
 * Chỉ số Thần trực nhật (0 = Thanh Long ... 11 = Câu Trần)
 */
export function get_god_index(jd: number, options?: AlmanacOptions): number {
  const opts = resolve_almanac_options(options);
  const monthChi = get_month_chi(jd, opts.godBasis, opts.timeZone);
  const start = ((monthChi - 2 + 12) % 6) * 2; // chi nơi Thanh Long khởi
  return (get_day_chi_index(jd) - start + 12) % 12;
}

/**
 * 12 Thần trực nhật (Hoàng Đạo / Hắc Đạo)
 * @param jd Julian Day Number
 * @param options godBasis mặc định "lunar"
 */
export function get_12_gods(jd: number, options?: AlmanacOptions): God12Info {
  assert_jd(jd, 'get_12_gods');
  return GODS_12[get_god_index(jd, options)];
}

/**
 * Ngày Hoàng Đạo / Hắc Đạo (theo 12 Thần trực nhật)
 * @param jd Julian Day Number
 * @param options godBasis mặc định "lunar"
 */
export function get_day_type(jd: number, options?: AlmanacOptions): DayTypeInfo {
  assert_jd(jd, 'get_day_type');
  const index = get_god_index(jd, options);
  const god = GODS_12[index];
  const isHoangDao = HOANG_DAO_GOD_INDEXES.indexOf(index) !== -1;
  const label = god.alias ? `${god.name} (${god.alias})` : god.name;
  return {
    type: isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo',
    star: god.name,
    good: isHoangDao,
    bad: !isHoangDao,
    desc: isHoangDao
      ? `Ngày Hoàng Đạo (${label}) - Tốt, thuận lợi`
      : `Ngày Hắc Đạo (${label}) - Xấu, nên tránh việc lớn`
  };
}

function make_pillar(canIndex: number, chiIndex: number): PillarInfo {
  return {
    can: CAN[canIndex],
    chi: CHI[chiIndex],
    can_index: canIndex,
    chi_index: chiIndex,
    can_chi: `${CAN[canIndex]} ${CHI[chiIndex]}`
  };
}

/**
 * Can Chi của 12 giờ trong ngày
 * @param jd Julian Day Number
 */
export function get_hours_can_chi(jd: number): Array<PillarInfo & { period: string }> {
  const dayCan = get_day_can_index(jd);
  const result: Array<PillarInfo & { period: string }> = [];
  for (let chi = 0; chi < 12; chi++) {
    const can = (dayCan * 2 + chi) % 10;
    const start = (chi * 2 + 23) % 24;
    const end = (chi * 2 + 1) % 24;
    result.push({ ...make_pillar(can, chi), period: `${start}h-${end}h` });
  }
  return result;
}

/**
 * Tứ Trụ (Bát Tự) theo dương lịch.
 * - Năm đổi tại Lập Xuân (không phải Tết âm lịch).
 * - Tháng theo tiết khí, Can tháng theo Ngũ Hổ Độn.
 * - Giờ >= 23 được tính sang ngày hôm sau (giờ Tý đầu ngày mới).
 * Độ phân giải theo ngày: ngày giao tiết được tính theo tiết khí tại cuối ngày.
 */
export function get_four_pillars(
  dd: number,
  mm: number,
  yyyy: number,
  hour: number = 0,
  minute: number = 0,
  timeZone: number = 7
): FourPillarsInfo {
  void minute;
  const baseJd = jdn(dd, mm, yyyy);
  const dayJd = hour >= 23 ? baseJd + 1 : baseJd;
  const [, sMonth, sYear] = jdn2date(dayJd);

  const term = get_solar_term(dayJd, timeZone);
  const monthChi = term.month_chi;

  let pillarYear = sYear;
  if (sMonth <= 2 && (monthChi === 0 || monthChi === 1)) {
    pillarYear = sYear - 1;
  }
  const yearCan = (pillarYear + 6) % 10;
  const yearChi = (pillarYear + 8) % 12;

  const canDan = ((yearCan % 5) * 2 + 2) % 10;
  const monthCan = (canDan + (monthChi - 2 + 12) % 12) % 10;

  const dayCan = get_day_can_index(dayJd);
  const dayChi = get_day_chi_index(dayJd);

  const hourChi = Math.floor((hour + 1) / 2) % 12;
  const hourCan = (dayCan * 2 + hourChi) % 10;

  return {
    year: make_pillar(yearCan, yearChi),
    month: make_pillar(monthCan, monthChi),
    day: make_pillar(dayCan, dayChi),
    hour: make_pillar(hourCan, hourChi),
    day_jd: dayJd,
    solar_term: term.name
  };
}
