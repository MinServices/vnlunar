import type { Star12Info, God12Info, Construction12Info, Mansion28Info, NayinInfo, DayTypeInfo, DaySelectionResult } from './types';
export declare function get_12_stars(lunarDay: number, lunarMonth: number): Star12Info;
export declare function get_12_gods(jd: number): God12Info;
export declare function get_12_constructions(lunarDay: number, lunarMonth: number): Construction12Info;
export declare function get_28_mansions(jd: number): Mansion28Info;
export declare function get_nayin(jd: number): NayinInfo;
export declare function get_day_type(lunarDay: number, lunarMonth: number): DayTypeInfo;
export declare function check_good_day(jd: number, activity: string): DaySelectionResult;
export declare function find_good_days(month: number, year: number, activity: string): Array<{
    day: number;
    month: number;
    year: number;
    jd: number;
    sao: Star12Info;
}>;
//# sourceMappingURL=astrology.d.ts.map