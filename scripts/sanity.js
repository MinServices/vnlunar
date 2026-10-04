// Quick sanity check of anchor dates against dist build
const L = require('../dist/index.js');
const show = (d, m, y, opts) => {
  const i = L.getFullInfo(d, m, y, opts);
  console.log(`${d}/${m}/${y}`, `AL ${i.lunar.day}/${i.lunar.month}${i.lunar.leap ? 'N' : ''}/${i.lunar.year}`,
    '|', i.can_chi.day, '/', i.can_chi.month, '/', i.can_chi.year,
    '|', i.solar.dayOfWeek, '| Trực', i.stars_12.name, '|', i.gods_12.name, i.day_type.type,
    '| Tú', i.mansions_28.full_name, '|', i.nayin.name, '|', i.solar_term,
    '| Hỷ', i.god_directions.joy_god, 'Tài', i.god_directions.wealth_god,
    '| xung', i.conflicting_ages.conflicting_ages.map(a => a.can_chi).join(', '));
};
show(6, 11, 2025);
show(8, 11, 2025);
show(15, 1, 2026);
show(10, 3, 2025);
show(29, 1, 2025);
show(17, 2, 2026);
console.log(L.get_four_pillars(8, 11, 2025, 10));
console.log(L.get_four_pillars(1, 2, 2025, 23, 30));
console.log(L.convert_lunar_to_solar(1, 1, 2026), L.convert_lunar_to_solar(1, 6, 2025, 1), L.convert_lunar_to_solar(30, 6, 2025, 1), L.convert_lunar_to_solar(1, 5, 2025, 1));
console.log(L.convert_lunar_to_solar(1, 1, 2300), L.get_lunar_date(1, 1, 2300));
