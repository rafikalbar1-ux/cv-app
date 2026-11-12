import { clamp, formatPercent, formatNumber, average, predikat, levelLabel } from '../utils/score';

test('clamp membatasi 0-100', () => {
  expect(clamp(120)).toBe(100);
  expect(clamp(-5)).toBe(0);
});
test('formatPercent', () => expect(formatPercent(87.4)).toBe('87%'));
test('formatNumber', () => expect(formatNumber(12375)).toBe('12.375'));
test('average', () => {
  expect(average([100, 87, 95, 100])).toBeCloseTo(95.5);
  expect(average([])).toBe(0);
});
test('predikat', () => {
  expect(predikat(89)).toBe('Sangat baik');
  expect(predikat(60)).toBe('Cukup');
});
test('levelLabel', () => {
  expect(levelLabel(85)).toBe('Mahir');
  expect(levelLabel(20)).toBe('Pemula');
});
