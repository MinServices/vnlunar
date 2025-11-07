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

/**
 * Direction data for Ngọc Hạp Thông Thư
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
 * Get conflicting ages for a day
 * @param jd Julian Day Number
 * @param currentYear Current year
 * @returns Age conflict information
 */
export function get_conflicting_ages(jd: number, currentYear: number): ConflictingAgeInfo {
  const canNgay = (jd + 9) % 10;
  const chiNgay = (jd + 1) % 12;
  const xungChiIndex = (chiNgay + 6) % 12;

  const conflicting_age_list: Array<{
    year: number;
    can_chi: string;
    age: number;
    chi: string;
    animal: string;
  }> = [];

  // Quy tắc tuổi xung:
  // 1. Tuổi xung chính (*): Can cách -6 + Chi xung
  // 2. Tuổi xung phụ: Can cách -2 + Chi xung
  // 3. Tuổi tự xung: Can cách -6 + Chi cùng ngày
  // 4. Tam Hình: Các Chi trong nhóm tam hợp

  // Tam Hình (Tam Hợp) - 4 nhóm
  const tamHinh: Record<number, number[]> = {
    0: [8, 4],   // Tý -> Thân, Thìn (Tam Hợp Thủy)
    1: [9, 5],   // Sửu -> Dậu, Tỵ (Tam Hợp Kim)
    2: [6, 10],  // Dần -> Ngọ, Tuất (Tam Hợp Hỏa)
    3: [11, 7],  // Mão -> Hợi, Mùi (Tam Hợp Mộc)
    4: [0, 8],   // Thìn -> Tý, Thân (Tam Hợp Thủy)
    5: [9, 1],   // Tỵ -> Dậu, Sửu (Tam Hợp Kim)
    6: [2, 10],  // Ngọ -> Dần, Tuất (Tam Hợp Hỏa)
    7: [11, 3],  // Mùi -> Hợi, Mão (Tam Hợp Mộc)
    8: [0, 4],   // Thân -> Tý, Thìn (Tam Hợp Thủy)
    9: [5, 1],   // Dậu -> Tỵ, Sửu (Tam Hợp Kim)
    10: [6, 2],  // Tuất -> Ngọ, Dần (Tam Hợp Hỏa)
    11: [3, 7]   // Hợi -> Mão, Mùi (Tam Hợp Mộc)
  };

  // Can chính và phụ
  const canXungChinh = (canNgay - 6 + 10) % 10;
  const canXungPhu = (canNgay - 2 + 10) % 10;

  // Danh sách các tuổi xung cần tìm
  const xungTypes: Array<{can: number, chi: number, priority: number, hasStar: boolean}> = [];

  // 1. Tuổi xung chính với Chi xung (*) - ưu tiên cao nhất
  xungTypes.push({can: canXungChinh, chi: xungChiIndex, priority: 1, hasStar: true});

  // 2. Tuổi xung phụ với Chi xung
  if (canXungPhu !== canXungChinh) {
    xungTypes.push({can: canXungPhu, chi: xungChiIndex, priority: 2, hasStar: false});
  }

  // 3. Tuổi tự xung (Can xung chính + Chi cùng ngày)
  if (chiNgay !== xungChiIndex) {
    xungTypes.push({can: canXungChinh, chi: chiNgay, priority: 3, hasStar: false});
  }

  // 4. Tam Hình - Các Chi trong nhóm tam hợp với ngày
  const tamHinhChis = tamHinh[chiNgay] || [];
  tamHinhChis.forEach((chi, idx) => {
    // Sử dụng Can xung phụ cho Tam Hình
    xungTypes.push({can: canXungPhu, chi: chi, priority: 4 + idx, hasStar: false});
  });

  // 5. Thêm tuổi xung phụ với Chi cùng ngày nếu khác với tuổi tự xung
  if (canXungPhu !== canXungChinh && chiNgay !== xungChiIndex) {
    xungTypes.push({can: canXungPhu, chi: chiNgay, priority: 10, hasStar: false});
  }

  // Tìm năm sinh cho mỗi loại xung
  const seen_can_chi = new Set<string>();
  
  xungTypes.forEach((type) => {
    for (let age = 1; age <= 120; age++) {
      const year = currentYear - age;
      const yearCan = (year + 6) % 10;
      const yearChi = (year + 8) % 12;

      if (yearCan === type.can && yearChi === type.chi) {
        const can_chi_str = CAN[yearCan] + " " + CHI[yearChi];
        const key = can_chi_str + (type.hasStar ? '*' : '');
        
        if (!seen_can_chi.has(can_chi_str)) {
          seen_can_chi.add(can_chi_str);
          conflicting_age_list.push({
            year: year,
            can_chi: key,
            age: age,
            chi: CHI[yearChi],
            animal: CHI_ANIMALS[yearChi]
          });
        }
        break;
      }
    }
  });

  return {
    day_chi: CHI[chiNgay],
    day_animal: CHI_ANIMALS[chiNgay],
    conflict_chi: CHI[xungChiIndex],
    conflict_animal: CHI_ANIMALS[xungChiIndex],
    description: "Ngày " + CHI[chiNgay] + " (" + CHI_ANIMALS[chiNgay] + ") xung với tuổi " + CHI[xungChiIndex] + " (" + CHI_ANIMALS[xungChiIndex] + ")",
    conflicting_ages: conflicting_age_list.slice(0, 5),
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
      ? "Tuổi " + CHI_ANIMALS[chi1] + " và " + CHI_ANIMALS[chi2] + " XÁ XUNG (kỵ)"
      : "Tuổi " + CHI_ANIMALS[chi1] + " và " + CHI_ANIMALS[chi2] + " không xung"
  };
}

/**
 * Get Ngọc Hạp Thông Thư - Good/bad directions
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
 * Get gods directions by day Can
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
