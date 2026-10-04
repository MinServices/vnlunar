/**
 * Type definitions for vnLunar library
 */

/**
 * Lunar date information
 */
export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: number; // 0 = normal month, 1 = leap month
  jd: number; // Julian Day Number
}

/**
 * Solar date information
 */
export interface SolarDate {
  day: number;
  month: number;
  year: number;
  dayOfWeek: string;
}

/**
 * Can Chi information
 */
export interface CanChiInfo {
  day: string; // Day Can Chi
  month: string; // Month Can Chi
  year: string; // Year Can Chi
  hour?: string; // Hour Can Chi (optional)
}


/**
 * Five Elements (Ngũ Hành)
 */
export type Element = "Thủy" | "Hỏa" | "Mộc" | "Kim" | "Thổ";


/**
 * Element information for a date
 */
export interface ElementInfo {
  can: Element;
  chi: Element;
}


/**
 * Year element information
 */
export interface YearElementInfo {
  can: string;
  chi: string;
  animal: string;
  can_chi: string;
  name: string;
  element: Element;
  can_element: Element;
  chi_element: Element;
}


/**
 * Star information (12 Sao Kiến Trừ / 12 Stars)
 */
export interface Star12Info {
  name: string;
  status: "good" | "bad" | "neutral";
  color: string;
  description: string;
}


/**
 * 12 Gods (12 Thần)
 */
export interface God12Info {
  name: string;
  /** Tên gọi khác (vd. Thiên Đức = Bảo Quang) */
  alias?: string;
  type: "auspicious" | "inauspicious";
  status: "good" | "bad";
  description: string;
}


/**
 * 12 Day Construction (Thập Nhị Trực)
 */
export interface Construction12Info {
  /** Tên đầy đủ, vd. "Trực Kiến" */
  name: string;
  /** Tên ngắn, vd. "Kiến" */
  short_name: string;
  status: "good" | "bad" | "neutral";
  good_for: string[];
  bad_for: string[];
}


/**
 * 28 Lunar Mansions (28 Tú Sao)
 */
export interface Mansion28Info {
  name: string;
  /** Tên đầy đủ, vd. "Giác Mộc Giao" */
  full_name: string;
  animal: string;
  element: string;
  good: boolean;
  description: string;
}


/**
 * Cách xác định tháng khi tính Trực / 12 Thần:
 * - "lunar": theo tháng âm lịch (chi tháng = (tháng + 1) % 12)
 * - "solar_term": theo tiết khí (tháng Dần bắt đầu từ Lập Xuân)
 */
export type MonthBasis = "lunar" | "solar_term";

/**
 * Tùy chọn tính toán lịch vạn niên
 */
export interface AlmanacOptions {
  /** Cách tính tháng cho Thập Nhị Trực. Mặc định "solar_term". */
  trucBasis?: MonthBasis;
  /** Cách tính tháng cho 12 Thần Hoàng/Hắc Đạo. Mặc định "lunar". */
  godBasis?: MonthBasis;
  /** Múi giờ cho tiết khí. Mặc định 7. */
  timeZone?: number;
}

/**
 * Tiết khí
 */
export interface SolarTermInfo {
  /** 0 = Xuân phân ... 23 = Kinh trập */
  index: number;
  name: string;
  /** Chi của tháng tiết khí (2 = Dần) */
  month_chi: number;
}

/**
 * Một trụ trong Tứ Trụ (Bát Tự)
 */
export interface PillarInfo {
  can: string;
  chi: string;
  can_index: number;
  chi_index: number;
  can_chi: string;
}

/**
 * Tứ Trụ (Bát Tự): năm đổi tại Lập Xuân, tháng theo tiết khí
 */
export interface FourPillarsInfo {
  year: PillarInfo;
  month: PillarInfo;
  day: PillarInfo;
  hour: PillarInfo;
  /** JDN dùng cho trụ ngày (giờ >= 23 tính sang ngày hôm sau) */
  day_jd: number;
  solar_term: string;
}


/**
 * Nayin (Nạp Âm) information
 */
export interface NayinInfo {
  name: string;
  element: string;
  can: string;
  chi: string;
}



/**
 * Auspicious/Inauspicious day information (theo 12 Thần)
 */
export interface DayTypeInfo {
  type: "Hoàng Đạo" | "Hắc Đạo";
  /** Tên Thần trực nhật (vd. "Minh Đường") */
  star: string;
  good: boolean;
  bad: boolean;
  desc: string;
}



/**
 * Age conflict information (Tuổi Xung)
 */
export interface ConflictingAgeInfo {
  day_chi: string;
  day_animal: string;
  conflict_chi: string;
  conflict_animal: string;
  description: string;
  conflicting_ages: Array<{
    year: number;
    /** Can Chi, có dấu "*" nếu là tuổi xung chính */
    can_chi: string;
    age: number;
    chi: string;
    animal: string;
    primary?: boolean;
    reason?: string;
  }>;
  note: string;
}



/**
 * Direction information (Ngọc Hạp Thông Thư)
 */
export interface DirectionInfo {
  day_chi: string;
  good: string[];
  bad: string[];
  description: string;
  good_text: string;
  bad_text: string;
}



/**
 * Gods direction information
 */
export interface GodDirectionInfo {
  day_can: string;
  joy_god: string; // Joy God direction
  wealth_god: string; // Wealth God direction
  fortune_god: string; // Fortune God direction
  description: string;
}



/**
 * Travel direction by age
 */
export interface AgeDirectionInfo {
  age_name: string;
  chi: string;
  birth_year: number;
  good_directions: string[];
  bad_directions: string[];
  good_text: string;
  bad_text: string;
}

/**
 * Combined travel direction information
 */
export interface TravelDirectionInfo {
  by_day: DirectionInfo;
  by_age: AgeDirectionInfo;
  common_good: string[];
  should_avoid: string[];
  common_good_text: string;
  should_avoid_text: string;
  advice: string;
}

/**
 * Hour information for travel (Giờ xuất hành)
 */
export interface HourInfo {
  chi: string;
  index: number;
  period: string;
  good: boolean;
}


/**
 * Travel hours information
 */
export interface TravelHoursInfo {
  day_chi: string;
  good_hours: HourInfo[];
  bad_hours: HourInfo[];
  good_text: string;
  bad_text: string;
  good_count: number;
  bad_count: number;
}


/**
 * Day selection result
 */
export interface DaySelectionResult {
  /** Trực của ngày */
  star: Star12Info;
  /** Thần trực nhật (Hoàng/Hắc Đạo) */
  god?: God12Info;
  activity: string;
  good: boolean;
  description: string;
}


/**
 * Full date information
 */
export interface FullDateInfo {
  solar: SolarDate;
  lunar: {
    day: number;
    month: number;
    year: number;
    leap: number;
    monthName: string;
  };
  can_chi: CanChiInfo;
  elements: {
    day: ElementInfo;
    year: YearElementInfo;
  };
  stars_12: Star12Info;
  constructions_12: Construction12Info;
  gods_12: God12Info;
  mansions_28: Mansion28Info;
  nayin: NayinInfo;
  day_type: DayTypeInfo;
  conflicting_ages: ConflictingAgeInfo;
  god_directions: GodDirectionInfo;
  /**
   * Hướng xuất hành theo ngày (Ngọc Hạp Thông Thư).
   * @deprecated Khuyến nghị dùng god_directions hoặc get_travel_direction().
   */
  directions: DirectionInfo;
  solar_term: string;
  solar_term_info: SolarTermInfo;
  auspicious_hours: string;
  /** Tùy chọn đã áp dụng (sau khi điền mặc định) */
  options: Required<AlmanacOptions>;
  jd: number;
}
