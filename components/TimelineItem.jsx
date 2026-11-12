import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Satu titik pada timeline.
export default function TimelineItem({ item, isLast }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={[styles.dot, { borderColor: colors.accent, backgroundColor: colors.bg }]} />
        {!isLast && <View style={[styles.line, { backgroundColor: colors.border }]} />}
      </View>
      <View style={styles.body}>
        <Text style={{ color: colors.accent, fontWeight: '700', fontSize: 13 }}>{item.periode}</Text>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16, marginTop: 2 }}>{item.judul}</Text>
        <Text style={{ color: colors.sub, fontSize: 13 }}>{item.lokasi}</Text>
        <Text style={{ color: colors.text, marginTop: 6, lineHeight: 21 }}>{item.deskripsi}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { alignItems: 'center', width: 26 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 3, marginTop: 3 },
  line: { flex: 1, width: 2, marginTop: 3 },
  body: { flex: 1, paddingBottom: 22, paddingLeft: 10 },
});
