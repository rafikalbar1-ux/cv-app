import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// Ubin angka ringkas: ikon, nilai, label.
export default function StatTile({ icon, value, label, color, style }) {
  const { colors } = useTheme();
  const c = color || colors.accent;
  return (
    <View style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }, style]} accessible
      accessibilityLabel={`${label}: ${value}`}>
      <Ionicons name={icon} size={20} color={c} />
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.sub }]}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  tile: { flex: 1, borderRadius: 18, borderWidth: 1, padding: 14, alignItems: 'flex-start' },
  value: { fontSize: 22, fontWeight: '800', marginTop: 8, letterSpacing: -0.5 },
  label: { fontSize: 12, marginTop: 2 },
});
