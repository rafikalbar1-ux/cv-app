import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ProgressBar from './ProgressBar';
import { useTheme } from '../theme/ThemeContext';
import { levelLabel } from '../utils/score';

const KAT = { Olahraga: 'accent2', Teknologi: 'accent', 'Soft Skill': 'success' };

export default function SkillCard({ item }) {
  const { colors } = useTheme();
  const c = colors[KAT[item.kategori]] || colors.primary;
  return (
    <Card>
      <View style={styles.head}>
        <View style={[styles.icon, { borderColor: c }]}>
          <Ionicons name={item.ikon} size={22} color={c} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.name, { color: colors.text }]}>{item.nama}</Text>
          <Text style={{ color: c, fontSize: 13, fontWeight: '600' }}>{item.kategori}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: c }]}>
          <Text style={{ color: colors.onPrimary, fontWeight: '700', fontSize: 12 }}>{levelLabel(item.level)}</Text>
        </View>
      </View>
      <Text style={{ color: colors.sub, lineHeight: 20, marginVertical: 12 }}>{item.deskripsi}</Text>
      <ProgressBar label={item.nama} value={item.level} color={c} />
    </Card>
  );
}
const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 46, height: 46, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '700' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
});
