import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// Satu baris info: ikon, label, nilai.
export default function InfoRow({ icon, label, value, onPress, last }) {
  const { colors } = useTheme();
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper onPress={onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={`${label}: ${value}`}
      style={[styles.row, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: colors.sub, fontSize: 12 }}>{label}</Text>
        <Text style={{ color: colors.text, fontSize: 15, fontWeight: '600' }}>{value}</Text>
      </View>
      {onPress ? <Ionicons name="open-outline" size={18} color={colors.sub} /> : null}
    </Wrapper>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, minHeight: 52 } });
