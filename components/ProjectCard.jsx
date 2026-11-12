import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Chip from './Chip';
import { useTheme } from '../theme/ThemeContext';

// Kartu karya: ditekan untuk membuka detail (state expanded).
export default function ProjectCard({ item }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => setOpen(!open)} accessibilityRole="button"
      accessibilityLabel={`${item.judul}. ${open ? 'Tutup' : 'Buka'} detail`} accessibilityState={{ expanded: open }}>
      <Card>
        <View style={styles.head}>
          <View style={[styles.icon, { backgroundColor: colors.accent2 }]}>
            <Ionicons name={item.ikon} size={22} color={colors.onPrimary} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.title, { color: colors.text }]}>{item.judul}</Text>
            <Text style={{ color: colors.sub, fontSize: 13 }}>{item.tahun}</Text>
          </View>
          <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.sub} />
        </View>
        <Text style={{ color: colors.text, lineHeight: 21, marginTop: 12 }}>{item.deskripsi}</Text>
        {open && (
          <View style={[styles.detail, { borderTopColor: colors.border }]}>
            <Text style={{ color: colors.accent, fontWeight: '700', marginBottom: 4 }}>Peran: {item.peran}</Text>
            <Text style={{ color: colors.sub, lineHeight: 21, marginBottom: 10 }}>{item.detail}</Text>
            <View style={styles.tags}>
              {item.teknologi.map((t) => <Chip key={t} label={t} color={colors.accent} />)}
            </View>
          </View>
        )}
        {!open && (
          <View style={[styles.tags, { marginTop: 10 }]}>
            {item.tag.map((t) => <Chip key={t} label={t} color={colors.primary} />)}
          </View>
        )}
      </Card>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontWeight: '700' },
  detail: { borderTopWidth: 1, marginTop: 14, paddingTop: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap' },
});
