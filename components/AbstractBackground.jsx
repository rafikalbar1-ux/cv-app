import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Lingkaran bercahaya: beberapa lingkaran konsentris transparan.
export function Glow({ size, color, style, strength = 0.09 }) {
  return (
    <View pointerEvents="none" style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      {[1, 0.78, 0.58, 0.4].map((k, i) => (
        <View key={i} style={{ position: 'absolute', width: size * k, height: size * k, borderRadius: (size * k) / 2, backgroundColor: color, opacity: strength }} />
      ))}
    </View>
  );
}

// Latar abstrak: cahaya, ring, dan bentuk geometris. Tidak menangkap sentuhan.
export default function AbstractBackground() {
  const { colors, isDark } = useTheme();
  const k = isDark ? 1 : 0.8;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Glow size={460} color={colors.orbA} strength={0.1 * k} style={styles.a} />
      <Glow size={360} color={colors.orbB} strength={0.07 * k} style={styles.b} />
      <Glow size={400} color={colors.orbC} strength={0.07 * k} style={styles.c} />
      <View style={[styles.ring, { width: 300, height: 300, borderRadius: 150, top: -90, right: -110, borderColor: colors.border }]} />
      <View style={[styles.ring, { width: 180, height: 180, borderRadius: 90, bottom: 120, left: -70, borderColor: colors.border }]} />
      <View style={[styles.square, { top: 150, right: 26, borderColor: colors.accent }]} />
      <View style={[styles.square, { bottom: 210, right: 60, width: 22, height: 22, borderColor: colors.accent2 }]} />
      <View style={[styles.dot, { top: 110, left: 40, backgroundColor: colors.accent2 }]} />
      <View style={[styles.dot, { top: 420, right: 18, backgroundColor: colors.primary }]} />
      <View style={[styles.dot, { bottom: 80, left: 60, backgroundColor: colors.accent }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  a: { position: 'absolute', top: -170, right: -170 },
  b: { position: 'absolute', top: 330, left: -200 },
  c: { position: 'absolute', bottom: -170, right: -150 },
  ring: { position: 'absolute', borderWidth: 1 },
  square: { position: 'absolute', width: 34, height: 34, borderWidth: 1.5, borderRadius: 8, transform: [{ rotate: '24deg' }], opacity: 0.6 },
  dot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, opacity: 0.8 },
});
