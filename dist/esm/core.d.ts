import type { LunarDate } from './types';
export declare function jdn(dd: number, mm: number, yy: number): number;
export declare function jdn2date(jd: number): [number, number, number];
export declare function get_new_moon_day(k: number, timeZone: number): number;
export declare function get_sun_longitude_aa(jdn: number, timeZone: number): number;
export declare function get_lunar_month_11(yy: number, timeZone: number): number;
export declare function get_leap_month_offset(a11: number, timeZone: number): number;
export declare function convert_solar_to_lunar(dd: number, mm: number, yy: number, timeZone: number): LunarDate;
export declare function get_lunar_date(dd: number, mm: number, yyyy: number): LunarDate;
export declare function get_sun_longitude(dayNumber: number, timeZone: number): number;
export declare function get_year_info(yyyy: number): LunarDate[];
export declare function get_month(mm: number, yy: number): LunarDate[];
//# sourceMappingURL=core.d.ts.map