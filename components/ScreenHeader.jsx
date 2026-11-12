import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// Judul halaman: ikon di kotak miring + judul besar + subjudul.
export default function ScreenHeader({ icon, title, subtitle }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: colors.primary }]}>
        <Ionicons name={icon} size={24} color={colors.onPrimary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.sub, { color: colors.sub }]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 20 },
  icon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 14, transform: [{ rotate: '-6deg' }] },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  sub: { fontSize: 14, marginTop: 2, lineHeight: 20 },
});
