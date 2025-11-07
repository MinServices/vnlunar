/**
 * TypeScript Example - Demonstrates type safety
 */

import vnLunar, { 
  get_lunar_date, 
  getFullInfo, 
  type LunarDate, 
  type FullDateInfo,
  type Star12Info
} from '../dist/index';

console.log('=== vnLunar TypeScript Type Safety Example ===\n');

// Type-safe lunar date conversion
const lunar: LunarDate = get_lunar_date(25, 12, 2024);
console.log('1. Lunar Date (Type-safe):');
console.log(`Day: ${lunar.day}, Month: ${lunar.month}, Year: ${lunar.year}`);
console.log(`Leap: ${lunar.leap === 1 ? 'Yes' : 'No'}, JD: ${lunar.jd}`);
console.log('');

// Type-safe full info
const fullInfo: FullDateInfo = getFullInfo(25, 12, 2024);
console.log('2. Full Info (Type-safe):');
console.log(`Solar: ${fullInfo.solar.day}/${fullInfo.solar.month}/${fullInfo.solar.year} (${fullInfo.solar.dayOfWeek})`);
console.log(`Lunar: ${fullInfo.lunar.day}/${fullInfo.lunar.month}/${fullInfo.lunar.year}`);
console.log(`Can Chi Day: ${fullInfo.can_chi.day}`);
console.log(`Can Chi Month: ${fullInfo.can_chi.month}`);
console.log(`Can Chi Year: ${fullInfo.can_chi.year}`);
console.log('');

// Type-safe star info
const stars: Star12Info = fullInfo.stars_12;
console.log('3. 12 Stars Info (Type-safe):');
console.log(`Name: ${stars.name}`);
console.log(`Status: ${stars.status}`);
console.log(`Color: ${stars.color}`);
console.log(`Description: ${stars.description}`);
console.log('');

// Demonstrating intellisense and autocompletion
console.log('4. Five Elements (Type-safe):');
console.log(`Day Can Element: ${fullInfo.elements.day.can}`);
console.log(`Day Chi Element: ${fullInfo.elements.day.chi}`);
console.log(`Year Element: ${fullInfo.elements.year.element}`);
console.log(`Year Animal: ${fullInfo.elements.year.animal}`);
console.log('');

// Direction info
console.log('5. Direction Info (Type-safe):');
console.log(`Good directions: ${fullInfo.directions.good_text}`);
console.log(`Bad directions: ${fullInfo.directions.bad_text}`);
console.log(`Joy God: ${fullInfo.god_directions.joy_god}`);
console.log(`Wealth God: ${fullInfo.god_directions.wealth_god}`);
console.log(`Fortune God: ${fullInfo.god_directions.fortune_god}`);
console.log('');

// Age conflict
console.log('6. Age Conflict (Type-safe):');
console.log(`Day Branch: ${fullInfo.conflicting_ages.day_chi} (${fullInfo.conflicting_ages.day_animal})`);
console.log(`Conflicting Branch: ${fullInfo.conflicting_ages.conflict_chi} (${fullInfo.conflicting_ages.conflict_animal})`);
console.log(`Note: ${fullInfo.conflicting_ages.note}`);
console.log('');

console.log('=== TypeScript type safety verified! ===');
console.log('All types are properly defined and enforced at compile time.');
