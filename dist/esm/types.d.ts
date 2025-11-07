export interface LunarDate {
    day: number;
    month: number;
    year: number;
    leap: number;
    jd: number;
}
export interface SolarDate {
    day: number;
    month: number;
    year: number;
    dayOfWeek: string;
}
export interface CanChiInfo {
    day: string;
    month: string;
    year: string;
    hour?: string;
}
export type Element = "Thủy" | "Hỏa" | "Mộc" | "Kim" | "Thổ";
export interface ElementInfo {
    can: Element;
    chi: Element;
}
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
export interface Star12Info {
    name: string;
    status: "good" | "bad" | "neutral";
    color: string;
    description: string;
}
export interface God12Info {
    name: string;
    type: "auspicious" | "inauspicious";
    status: "good" | "bad";
    description: string;
}
export interface Construction12Info {
    name: string;
    good_for: string[];
    bad_for: string[];
}
export interface Mansion28Info {
    name: string;
    animal: string;
    element: string;
    good: boolean;
    description: string;
}
export interface NayinInfo {
    name: string;
    element: string;
    can: string;
    chi: string;
}
export interface DayTypeInfo {
    type: "Hoàng Đạo" | "Hắc Đạo";
    star: string;
    good: boolean;
    bad: boolean;
    desc: string;
}
export interface ConflictingAgeInfo {
    day_chi: string;
    day_animal: string;
    conflict_chi: string;
    conflict_animal: string;
    description: string;
    conflicting_ages: Array<{
        year: number;
        can_chi: string;
        age: number;
        chi: string;
        animal: string;
    }>;
    note: string;
}
export interface DirectionInfo {
    day_chi: string;
    good: string[];
    bad: string[];
    description: string;
    good_text: string;
    bad_text: string;
}
export interface GodDirectionInfo {
    day_can: string;
    joy_god: string;
    wealth_god: string;
    fortune_god: string;
    description: string;
}
export interface AgeDirectionInfo {
    age_name: string;
    chi: string;
    birth_year: number;
    good_directions: string[];
    bad_directions: string[];
    good_text: string;
    bad_text: string;
}
export interface TravelDirectionInfo {
    by_day: DirectionInfo;
    by_age: AgeDirectionInfo;
    common_good: string[];
    should_avoid: string[];
    common_good_text: string;
    should_avoid_text: string;
    advice: string;
}
export interface HourInfo {
    chi: string;
    index: number;
    period: string;
    good: boolean;
}
export interface TravelHoursInfo {
    day_chi: string;
    good_hours: HourInfo[];
    bad_hours: HourInfo[];
    good_text: string;
    bad_text: string;
    good_count: number;
    bad_count: number;
}
export interface DaySelectionResult {
    star: Star12Info;
    activity: string;
    good: boolean;
    description: string;
}
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
    directions: DirectionInfo;
    god_directions: GodDirectionInfo;
    solar_term: string;
    auspicious_hours: string;
    jd: number;
}
//# sourceMappingURL=types.d.ts.map