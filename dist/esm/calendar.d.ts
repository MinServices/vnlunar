import type { LunarDate, CanChiInfo, YearElementInfo } from './types';
export declare function get_year_can_chi(year: number): string;
export declare function get_hour_can(jdn: number): string;
export declare function get_can_chi(lunar: LunarDate): CanChiInfo;
export declare function get_can_element(canIndex: number): string;
export declare function get_chi_element(chiIndex: number): string;
export declare function get_year_element(year: number): YearElementInfo;
export declare function get_element_relation(nh1: string, nh2: string): string;
export declare function get_auspicious_hours(jd: number): string;
export declare function get_day_of_week(jd: number): string;
//# sourceMappingURL=calendar.d.ts.map