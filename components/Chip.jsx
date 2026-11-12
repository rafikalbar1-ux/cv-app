import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Chip: bisa statis (info) atau bisa ditekan (filter).
export default function Chip({ label, active, onPress, color }) {
  const { colors } = useTheme();
  const c = color || colors.primary;
  const body = (
    <Text style={{ color: active ? colors.onPrimary : c, fontWeight: '600', fontSize: 13 }}>{label}</Text>
  );
  const style = [styles.chip, { borderColor: c, backgroundColor: active ? c : 'transparent' }];
  if (!onPress) return <Pressable disabled style={style}>{body}</Pressable>;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!active }}
      accessibilityLabel={`Filter ${label}`} style={style}>
      {body}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8, minHeight: 36, justifyContent: 'center' },
});
