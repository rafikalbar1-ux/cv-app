import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// Tombol mode terang/gelap.
export default function ThemeToggle() {
  const { isDark, toggle, colors } = useTheme();
  return (
    <Pressable onPress={toggle} accessibilityRole="switch" accessibilityState={{ checked: isDark }}
      accessibilityLabel="Mode gelap"
      style={[styles.btn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name={isDark ? 'moon' : 'sunny'} size={18} color={colors.accent} />
      <Text style={{ color: colors.text, marginLeft: 8, fontWeight: '600' }}>{isDark ? 'Gelap' : 'Terang'}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', paddingHorizontal: 14, minHeight: 44, borderRadius: 22, borderWidth: 1 },
});
