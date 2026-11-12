// Fungsi bantu untuk data nilai dan level.
export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));
export const formatPercent = (n) => `${clamp(Math.round(n))}%`;
export const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const average = (list) => (list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0);

export function predikat(nilai) {
  if (nilai >= 85) return 'Sangat baik';
  if (nilai >= 70) return 'Baik';
  if (nilai >= 55) return 'Cukup';
  return 'Perlu ditingkatkan';
}
export function levelLabel(level) {
  if (level >= 80) return 'Mahir';
  if (level >= 60) return 'Menengah';
  if (level >= 40) return 'Dasar';
  return 'Pemula';
}
