/**
 * Example usage of vnLunar TypeScript library
 */

const vnLunar = require('../dist/index');

console.log('=== vnLunar TypeScript Example ===\n');

// 1. Convert solar to lunar date
console.log('1. Convert solar date 25/12/2024 to lunar:');
const lunar = vnLunar.get_lunar_date(25, 12, 2024);
console.log(lunar);
console.log('');

// 2. Get Can Chi (Sexagenary cycle)
console.log('2. Can Chi of the day:');
const canChi = vnLunar.get_can_chi(lunar);
console.log(canChi);
console.log('');

// 3. Get 12 Construction Stars
console.log('3. 12 Construction Stars:');
const stars = vnLunar.get_12_stars(lunar.jd);
console.log(stars);
console.log('');

// 4. Check if day is good for activities
console.log('4. Check if good day for wedding:');
const dayCheck = vnLunar.check_good_day(lunar.jd, 'wedding');
console.log(dayCheck);
console.log('');

// 5. Conflicting ages
console.log('5. Conflicting ages for this day:');
const conflicts = vnLunar.get_conflicting_ages(lunar.jd, 2024);
console.log(`Day ${conflicts.day_chi} conflicts with ${conflicts.conflicting_animal} sign`);
console.log('');

// 6. Travel directions
console.log('6. Travel directions for person born in 1990:');
const directions = vnLunar.get_travel_direction(lunar.jd, 1990);
console.log(`Good directions: ${directions.common_good_text}`);
console.log(`Advice: ${directions.advice}`);
console.log('');

// 7. Auspicious hours
console.log('7. Auspicious travel hours:');
const hours = vnLunar.get_travel_hours(lunar.jd);
console.log(`Good hours: ${hours.good_count}`);
console.log(`Good hours text: ${hours.good_text}`);
console.log('');

// 8. Full information
console.log('8. Full information for 25/12/2024:');
const fullInfo = vnLunar.getFullInfo(25, 12, 2024);
console.log('Solar:', fullInfo.solar);
console.log('Lunar:', fullInfo.lunar);
console.log('Can Chi:', fullInfo.can_chi);
console.log('12 Stars:', fullInfo.stars_12.name, '-', fullInfo.stars_12.desc);
console.log('Day Type:', fullInfo.day_type.type, '-', fullInfo.day_type.desc);
console.log('28 Mansions:', fullInfo.mansions_28.name, '-', fullInfo.mansions_28.desc);
console.log('Nayin:', fullInfo.nayin.name, '(', fullInfo.nayin.element, ')');
console.log('Elements:', fullInfo.elements);
console.log('');

console.log('=== Test completed successfully! ===');
