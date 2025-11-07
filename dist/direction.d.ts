import type { ConflictingAgeInfo, DirectionInfo, GodDirectionInfo, AgeDirectionInfo, TravelDirectionInfo, TravelHoursInfo } from './types';
export declare function get_conflicting_ages(jd: number, currentYear: number): ConflictingAgeInfo;
export declare function check_age_conflict(year1: number, year2: number): {
    year1: number;
    year2: number;
    chi1: string;
    animal1: string;
    chi2: string;
    animal2: string;
    xung: boolean;
    description: string;
};
export declare function get_direction_info(jd: number): DirectionInfo;
export declare function get_god_directions(jd: number): GodDirectionInfo;
export declare function get_age_direction(birth_year: number): AgeDirectionInfo;
export declare function get_travel_direction(jd: number, birth_year: number): TravelDirectionInfo;
export declare function get_time_frame(chiIndex: number): string;
export declare function get_travel_hours(jd: number): TravelHoursInfo;
export declare function check_travel_hour(jd: number, hour: number): {
    hour: number;
    hour_chi: string;
    time_frame: string;
    good: boolean;
    description: string;
};
//# sourceMappingURL=direction.d.ts.map