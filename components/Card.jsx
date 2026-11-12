import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Kartu kaca: latar transparan dengan tepi tipis.
export default function Card({ children, style }) {
  const { colors } = useTheme();
  return <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>{children}</View>;
}
const styles = StyleSheet.create({ card: { padding: 16, borderRadius: 20, borderWidth: 1, marginBottom: 12 } });
