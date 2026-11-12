import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import ProgressBar from './ProgressBar';
import { formatPercent } from '../utils/score';

// Kartu progres belajar: ikon, persen besar, keterangan, dan bar.
export default function ProgressTile({ item, color }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.top}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          <Ionicons name={item.ikon} size={16} color={colors.onPrimary} />
        </View>
        <Text style={{ color: colors.sub, fontSize: 12, flex: 1, marginLeft: 8 }}>{item.keterangan}</Text>
      </View>
      <Text style={[styles.pct, { color: colors.text }]}>{formatPercent(item.value)}</Text>
      <Text style={{ color: color, fontWeight: '700', marginBottom: 8 }}>{item.label}</Text>
      <ProgressBar label={item.label} value={item.value} color={color} hideHeader />
    </View>
  );
}
const styles = StyleSheet.create({
  tile: { width: '48.5%', borderRadius: 22, borderWidth: 1, padding: 14, marginBottom: 12 },
  top: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  pct: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginTop: 10 },
});
