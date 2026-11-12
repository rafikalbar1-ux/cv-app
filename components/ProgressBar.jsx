import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { clamp, formatPercent } from '../utils/score';

// Indikator progres reusable (animasi isi bar saat tampil).
export default function ProgressBar({ label, value, color, hideHeader }) {
  const { colors } = useTheme();
  const v = clamp(value);
  const c = color || colors.primary;
  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: v, duration: 900, useNativeDriver: false }).start();
  }, [v, w]);
  return (
    <View style={styles.wrap} accessible accessibilityRole="progressbar" accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: v }}>
      {!hideHeader && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.label, { color: c }]}>{formatPercent(v)}</Text>
        </View>
      )}
      <View style={[styles.track, { backgroundColor: colors.border }]}>
        <Animated.View style={[styles.fill, { backgroundColor: c, width: w.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '600' },
  track: { height: 10, borderRadius: 5, overflow: 'hidden' },
  fill: { height: 10, borderRadius: 5 },
});
