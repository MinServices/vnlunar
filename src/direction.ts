/**
 * Direction and travel functions
 */

import type {
  ConflictingAgeInfo,
  DirectionInfo,
  GodDirectionInfo,
  AgeDirectionInfo,
  TravelDirectionInfo,
  HourInfo,
  TravelHoursInfo
} from './types';
import { CHI, CHI_ANIMALS, CAN, JOY_GOD_DIR, WEALTH_GOD_DIR, FORTUNE_GOD_DIR, TRAVEL_HOURS_LY } from './constants';
import { get_nayin_by_can_chi } from './astrology';
import { get_element_relation } from './calendar';

/**
 * Direction data for Ngọc Hạp Thông Thư
 * @experimental Chưa có nguồn đối chiếu - không còn đưa vào getFullInfo.
 */
const NGOC_HAP_THONG_THU: Record<number, { good: string[]; bad: string[]; description: string }> = {
  0: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], description: "Ngày Tý: Tốt hướng Nam-Bắc, tránh Đông-Tây" },
  6: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], description: "Ngày Ngọ: Tốt hướng Nam-Bắc, tránh Đông-Tây" },
  1: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây Bắc", "Đông Nam"], description: "Ngày Sửu: Tốt hướng ĐB-TN, tránh TB-ĐN" },
  7: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây Bắc", "Đông Nam"], description: "Ngày Mùi: Tốt hướng ĐB-TN, tránh TB-ĐN" },
  2: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], description: "Ngày Dần: Tốt hướng Đông-Tây, tránh Nam-Bắc" },
  8: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], description: "Ngày Thân: Tốt hướng Đông-Tây, tránh Nam-Bắc" },
  3: { good: ["Đông Nam", "Tây Bắc"], bad: ["Đông Bắc", "Tây Nam"], description: "Ngày Mão: Tốt hướng ĐN-TB, tránh ĐB-TN" },
  9: { good: ["Đông Nam", "Tây Bắc"], bad: ["Đông Bắc", "Tây Nam"], description: "Ngày Dậu: Tốt hướng ĐN-TB, tránh ĐB-TN" },
  4: { good: ["Tây Nam", "Đông Bắc"], bad: ["Tây", "Đông"], description: "Ngày Thìn: Tốt hướng TN-ĐB, tránh Tây-Đông" },
  10: { good: ["Tây Nam", "Đông Bắc"], bad: ["Tây", "Đông"], description: "Ngày Tuất: Tốt hướng TN-ĐB, tránh Tây-Đông" },
  5: { good: ["Tây Bắc", "Đông Nam"], bad: ["Nam", "Bắc"], description: "Ngày Tỵ: Tốt hướng TB-ĐN, tránh Nam-Bắc" },
  11: { good: ["Tây Bắc", "Đông Nam"], bad: ["Nam", "Bắc"], description: "Ngày Hợi: Tốt hướng TB-ĐN, tránh Nam-Bắc" }
};

/**
 * Travel direction by age
 * @experimental Chưa có nguồn đối chiếu.
 */
const AGE_DIRECTIONS: Record<number, { good: string[]; bad: string[]; name: string }> = {
  0: { good: ["Đông", "Tây Nam"], bad: ["Nam", "Bắc"], name: "Tý (Chuột)" },
  1: { good: ["Bắc", "Nam"], bad: ["Đông", "Tây"], name: "Sửu (Trâu)" },
  2: { good: ["Đông", "Tây"], bad: ["Bắc", "Nam"], name: "Dần (Hổ)" },
  3: { good: ["Tây", "Đông"], bad: ["Nam", "Bắc"], name: "Mão (Mèo)" },
  4: { good: ["Tây Nam", "Đông Bắc"], bad: ["Đông", "Tây"], name: "Thìn (Rồng)" },
  5: { good: ["Tây Bắc", "Đông Nam"], bad: ["Bắc", "Nam"], name: "Tỵ (Rắn)" },
  6: { good: ["Bắc", "Nam"], bad: ["Đông", "Tây"], name: "Ngọ (Ngựa)" },
  7: { good: ["Đông", "Tây"], bad: ["Nam", "Bắc"], name: "Mùi (Dê)" },
  8: { good: ["Tây", "Đông"], bad: ["Bắc", "Nam"], name: "Thân (Khỉ)" },
  9: { good: ["Nam", "Bắc"], bad: ["Đông", "Tây"], name: "Dậu (Gà)" },
  10: { good: ["Đông Bắc", "Tây Nam"], bad: ["Tây", "Đông"], name: "Tuất (Chó)" },
  11: { good: ["Đông Nam", "Tây Bắc"], bad: ["Nam", "Bắc"], name: "Hợi (Lợn)" }
};

/**
 * Get conflicting ages for a day (Tuổi xung ngày)
 *
 * Quy tắc (khớp các lịch vạn niên đối chiếu, xem docs/tuoi-xung.md - mới khớp một phần):
 * (A) Tuổi xung chính (*): Chi lục xung với chi ngày VÀ Nạp Âm khắc / bị khắc Nạp Âm ngày.
 * (B) Tuổi xung phụ: cùng chi ngày, Can bị Can ngày khắc (Can ngày + 4) VÀ Nạp Âm khắc / bị khắc.
 *
 * @param jd Julian Day Number
 * @param currentYear Năm dùng để tính tuổi (nên truyền năm âm lịch)
 * @returns Age conflict information
 */
export function get_conflicting_ages(jd: number, currentYear: number): ConflictingAgeInfo {
  const canNgay = (jd + 9) % 10;
  const chiNgay = (jd + 1) % 12;
  const xungChiIndex = (chiNgay + 6) % 12;
  const dayNayin = get_nayin_by_can_chi(canNgay, chiNgay);

  const isKhac = (canIndex: number, chiIndex: number): boolean => {
    const rel = get_element_relation(dayNayin.element, get_nayin_by_can_chi(canIndex, chiIndex).element);
    return rel === "khắc" || rel === "bị khắc";
  };

  const candidates: Array<{ can: number; chi: number; primary: boolean; reason: string }> = [];

  // (A) Chi xung + Nạp Âm khắc
  for (let can = xungChiIndex % 2; can < 10; can += 2) {
    if (isKhac(can, xungChiIndex)) {
      candidates.push({ can, chi: xungChiIndex, primary: true, reason: "Địa chi xung, Nạp Âm khắc" });
    }
  }

  // (B) Cùng chi, Can bị khắc + Nạp Âm khắc
  const canBiKhac = (canNgay + 4) % 10;
  if (isKhac(canBiKhac, chiNgay)) {
    candidates.push({ can: canBiKhac, chi: chiNgay, primary: false, reason: "Cùng chi, Thiên can khắc, Nạp Âm khắc" });
  }

  const conflicting_age_list: ConflictingAgeInfo['conflicting_ages'] = candidates.map((c) => {
    // Năm sinh gần nhất (trước currentYear) có Can Chi này
    let year = currentYear - 1;
    while ((year + 6) % 10 !== c.can || (year + 8) % 12 !== c.chi) {
      year--;
    }
    const canChi = CAN[c.can] + " " + CHI[c.chi];
    return {
      year,
      can_chi: canChi + (c.primary ? "*" : ""),
      age: currentYear - year,
      chi: CHI[c.chi],
      animal: CHI_ANIMALS[c.chi],
      primary: c.primary,
      reason: c.reason
    };
  });

  return {
    day_chi: CHI[chiNgay],
    day_animal: CHI_ANIMALS[chiNgay],
    conflict_chi: CHI[xungChiIndex],
    conflict_animal: CHI_ANIMALS[xungChiIndex],
    description: "Ngày " + CAN[canNgay] + " " + CHI[chiNgay] + " (" + dayNayin.name + ") xung với tuổi: " +
      conflicting_age_list.map((a) => a.can_chi.replace("*", "")).join(", "),
    conflicting_ages: conflicting_age_list,
    note: "Người tuổi " + CHI_ANIMALS[xungChiIndex] + " nên cẩn thận trong ngày này"
  };
}

/**
 * Check if two ages conflict
 * @param year1 Birth year 1
 * @param year2 Birth year 2
 * @returns Conflict check result
 */
export function check_age_conflict(year1: number, year2: number): {
  year1: number;
  year2: number;
  chi1: string;
  animal1: string;
  chi2: string;
  animal2: string;
  xung: boolean;
  description: string;
} {
  const chi1 = (year1 + 8) % 12;
  const chi2 = (year2 + 8) % 12;
  const isXung = Math.abs(chi1 - chi2) === 6;

  return {
    year1: year1,
    year2: year2,
    chi1: CHI[chi1],
    animal1: CHI_ANIMALS[chi1],
    chi2: CHI[chi2],
    animal2: CHI_ANIMALS[chi2],
    xung: isXung,
    description: isXung
      ? "Tuổi " + CHI_ANIMALS[chi1] + " và " + CHI_ANIMALS[chi2] + " XUNG (lục xung, kỵ)"
      : "Tuổi " + CHI_ANIMALS[chi1] + " và " + CHI_ANIMALS[chi2] + " không xung"
  };
}

/**
 * Get Ngọc Hạp Thông Thư - Good/bad directions
 * @experimental Bảng hướng theo chi ngày chưa có nguồn đối chiếu; dùng get_god_directions cho Hỷ/Tài thần.
 * @param jd Julian Day Number
 * @returns Direction information
 */
export function get_direction_info(jd: number): DirectionInfo {
  const chiNgay = (jd + 1) % 12;
  const info = NGOC_HAP_THONG_THU[chiNgay] || NGOC_HAP_THONG_THU[0];

  return {
    day_chi: CHI[chiNgay],
    good: info.good,
    bad: info.bad,
    description: info.description,
    good_text: info.good.join(", "),
    bad_text: info.bad.join(", ")
  };
}

/**
 * Get gods directions by day Can (Hỷ Thần, Tài Thần đã đối chiếu; Phúc Thần chưa đối chiếu)
 * @param jd Julian Day Number
 * @returns Gods direction information
 */
export function get_god_directions(jd: number): GodDirectionInfo {
  const canNgay = (jd + 9) % 10;

  return {
    day_can: CAN[canNgay],
    joy_god: JOY_GOD_DIR[canNgay],
    wealth_god: WEALTH_GOD_DIR[canNgay],
    fortune_god: FORTUNE_GOD_DIR[canNgay],
    description: "Hỷ Thần: " + JOY_GOD_DIR[canNgay] + ", Tài Thần: " + WEALTH_GOD_DIR[canNgay] + ", Phúc Thần: " + FORTUNE_GOD_DIR[canNgay]
  };
}

/**
 * Get good travel directions by age
 * @experimental Chưa có nguồn đối chiếu.
 * @param birth_year Birth year
 * @returns Travel direction by age
 */
export function get_age_direction(birth_year: number): AgeDirectionInfo {
  const age_chi = (birth_year + 8) % 12;
  const info = AGE_DIRECTIONS[age_chi];

  return {
    age_name: info.name,
    chi: CHI[age_chi],
    birth_year: birth_year,
    good_directions: info.good,
    bad_directions: info.bad,
    good_text: info.good.join(", "),
    bad_text: info.bad.join(", ")
  };
}

/**
 * Get combined travel directions by day and age
 * @param jd Julian Day Number
 * @param birth_year Birth year
 * @returns Combined travel direction information
 */
export function get_travel_direction(jd: number, birth_year: number): TravelDirectionInfo {
  const by_day = get_direction_info(jd);
  const by_age = get_age_direction(birth_year);

  const common_good: string[] = [];
  by_day.good.forEach((direction: string) => {
    if (by_age.good_directions.indexOf(direction) !== -1) {
      common_good.push(direction);
    }
  });

  const should_avoid: string[] = [];
  by_day.bad.forEach((direction: string) => {
    if (should_avoid.indexOf(direction) === -1) {
      should_avoid.push(direction);
    }
  });
  by_age.bad_directions.forEach((direction: string) => {
    if (should_avoid.indexOf(direction) === -1) {
      should_avoid.push(direction);
    }
  });

  return {
    by_day: by_day,
    by_age: by_age,
    common_good: common_good,
    should_avoid: should_avoid,
    common_good_text: common_good.length > 0 ? common_good.join(", ") : "Không có",
    should_avoid_text: should_avoid.join(", "),
    advice: common_good.length > 0
      ? "Nên đi hướng: " + common_good.join(", ")
      : "Ngày này không có hướng chung tốt cho tuổi " + by_age.age_name
  };
}

/**
 * Get hour frame from Chi index
 * @param chiIndex Chi index (0-11)
 * @returns Hour frame string
 */
export function get_time_frame(chiIndex: number): string {
  const gioStart = (chiIndex * 2 + 23) % 24;
  const gioEnd = (chiIndex * 2 + 1) % 24;
  return gioStart + "h-" + gioEnd + "h";
}

/**
 * Get travel hours by Ly Thuan Phong
 * @param jd Julian Day Number
 * @returns Travel hours information
 */
export function get_travel_hours(jd: number): TravelHoursInfo {
  const chiNgay = (jd + 1) % 12;
  const good_hour_indexes = TRAVEL_HOURS_LY[chiNgay];

  const good_hours_list: HourInfo[] = [];
  const bad_hours_list: HourInfo[] = [];

  for (let i = 0; i < 12; i++) {
    const hour_info: HourInfo = {
      chi: CHI[i],
      index: i,
      period: get_time_frame(i),
      good: good_hour_indexes.indexOf(i) !== -1
    };

    if (hour_info.good) {
      good_hours_list.push(hour_info);
    } else {
      bad_hours_list.push(hour_info);
    }
  }

  return {
    day_chi: CHI[chiNgay],
    good_hours: good_hours_list,
    bad_hours: bad_hours_list,
    good_text: formatGioList(good_hours_list),
    bad_text: formatGioList(bad_hours_list),
    good_count: good_hours_list.length,
    bad_count: bad_hours_list.length
  };
}

/**
 * Format hour list to readable string
 * @param gioList Hour list
 * @returns Formatted string
 */
function formatGioList(gioList: HourInfo[]): string {
  return gioList.map((gio) => {
    return gio.chi + " (" + gio.period + ")";
  }).join(", ");
}

/**
 * Check if current hour is good for travel
 * @param jd Julian Day Number
 * @param hour Hour (0-23)
 * @returns Check result
 */
export function check_travel_hour(jd: number, hour: number): {
  hour: number;
  hour_chi: string;
  time_frame: string;
  good: boolean;
  description: string;
} {
  const hour_chi_index = Math.floor((hour + 1) / 2) % 12;
  const hour_info = get_travel_hours(jd);

  let current_hour: HourInfo | null = null;
  for (let i = 0; i < hour_info.good_hours.length; i++) {
    if (hour_info.good_hours[i].index === hour_chi_index) {
      current_hour = hour_info.good_hours[i];
      break;
    }
  }

  if (!current_hour) {
    for (let i = 0; i < hour_info.bad_hours.length; i++) {
      if (hour_info.bad_hours[i].index === hour_chi_index) {
        current_hour = hour_info.bad_hours[i];
        break;
      }
    }
  }

  return {
    hour: hour,
    hour_chi: CHI[hour_chi_index],
    time_frame: get_time_frame(hour_chi_index),
    good: current_hour ? current_hour.good : false,
    description: current_hour && current_hour.good
      ? "Giờ " + CHI[hour_chi_index] + " (" + get_time_frame(hour_chi_index) + ") - TỐT để xuất hành"
      : "Giờ " + CHI[hour_chi_index] + " (" + get_time_frame(hour_chi_index) + ") - KHÔNG TỐT để xuất hành"
  };
}
