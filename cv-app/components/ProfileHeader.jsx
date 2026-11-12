import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Glow } from './AbstractBackground';
import Chip from './Chip';

const ring = (size) => ({ position: 'absolute', width: size, height: size, borderRadius: size / 2, borderWidth: 1.5 });

// Hero profil: foto dikelilingi ring orbit. Data diterima lewat Props.
export default function ProfileHeader({ data }) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={styles.area}>
        <Glow size={250} color={colors.primary} strength={0.12} style={{ position: 'absolute' }} />
        <View style={[ring(214), { borderColor: colors.primary, opacity: 0.35 }]} />
        <View style={[ring(176), { borderColor: colors.accent, opacity: 0.6 }]} />
        <View style={[styles.node, { top: 18, left: 52, backgroundColor: colors.accent2 }]} />
        <View style={[styles.node, { bottom: 34, right: 30, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.accent }]} />
        <View style={[styles.node, { top: 70, right: 8, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary }]} />
        <Image source={require('../assets/profile.jpg')} style={[styles.photo, { borderColor: colors.bg }]}
          accessibilityLabel={`Foto profil ${data.nama}`} />
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{data.nama}</Text>
      <View style={[styles.nim, { backgroundColor: colors.primary }]}>
        <Text style={{ color: colors.onPrimary, fontWeight: '800', letterSpacing: 1 }}>{data.nim}</Text>
      </View>
      <Text style={[styles.role, { color: colors.sub }]}>{data.profesi}</Text>
      <Text style={[styles.tag, { color: colors.accent }]}>{data.tagline}</Text>
      <View style={styles.chips}>
        <Chip label={data.jurusan} color={colors.primary} />
        <Chip label={`Semester ${data.semester}`} color={colors.accent2} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 4 },
  area: { width: 230, height: 230, alignItems: 'center', justifyContent: 'center' },
  photo: { width: 136, height: 136, borderRadius: 68, borderWidth: 4 },
  node: { position: 'absolute', width: 11, height: 11, borderRadius: 6 },
  name: { fontSize: 38, fontWeight: '900', letterSpacing: -1, marginTop: 6 },
  nim: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16, marginTop: 8 },
  role: { fontSize: 15, marginTop: 10, textAlign: 'center' },
  tag: { fontSize: 15, fontStyle: 'italic', marginTop: 6, marginBottom: 12, textAlign: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
