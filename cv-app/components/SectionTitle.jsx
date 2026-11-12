import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function SectionTitle({ title, note }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.bar, { backgroundColor: colors.accent }]} />
      <Text accessibilityRole="header" style={[styles.t, { color: colors.text }]}>{title}</Text>
      {note ? <Text style={[styles.note, { color: colors.sub }]}>{note}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 26, marginBottom: 12 },
  bar: { width: 4, height: 20, borderRadius: 2, marginRight: 10 },
  t: { fontSize: 19, fontWeight: '700', flex: 1, letterSpacing: -0.2 },
  note: { fontSize: 13 },
});
