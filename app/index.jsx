import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import AsyncBoundary from '../components/AsyncBoundary';
import ProfileHeader from '../components/ProfileHeader';
import ThemeToggle from '../components/ThemeToggle';
import SectionTitle from '../components/SectionTitle';
import StatTile from '../components/StatTile';
import Card from '../components/Card';
import Chip from '../components/Chip';
import FadeIn from '../components/FadeIn';
import PhotoStrip from '../components/PhotoStrip';
import photoMap from '../assets/photoMap';
import useAsync from '../hooks/useAsync';
import { getProfile, getAppInfo, getGallery, setSimulateError } from '../services/api';
import { useTheme } from '../theme/ThemeContext';

export default function Home() {
  const state = useAsync(getProfile);
  const appState = useAsync(getAppInfo);
  const galState = useAsync(getGallery);
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <ThemeToggle />
      <AsyncBoundary state={state}>
        {(p) => (
          <>
            {/* Satu-satunya animasi masuk: hero profil */}
            <FadeIn><ProfileHeader data={p} /></FadeIn>

            <View style={styles.stats}>
              <StatTile icon="school" value={`Smt ${p.semester}`} label="Semester" color={colors.primary} />
              <View style={{ width: 10 }} />
              <StatTile icon="ribbon" value={String(p.pengalaman.length)} label="Pengalaman" color={colors.accent2} />
              <View style={{ width: 10 }} />
              <StatTile icon="heart" value={String(p.hobi.length)} label="Hobi" color={colors.accent} />
            </View>

            <SectionTitle title="Profil singkat" />
            <Card><Text style={{ color: colors.text, lineHeight: 23, fontSize: 15 }}>{p.deskripsi}</Text></Card>

            <SectionTitle title="Minat" />
            <View style={styles.wrap}>{p.minat.map((m) => <Chip key={m} label={m} color={colors.accent} />)}</View>
          </>
        )}
      </AsyncBoundary>

      <AsyncBoundary state={galState}>
        {(g) => {
          const list = g.filter((i) => photoMap[i.file]);
          if (list.length === 0) return null;
          return (
            <>
              <SectionTitle title="Galeri foto" note={`${list.length} foto`} />
              <PhotoStrip items={list} onPress={() => router.push('/gallery')} onSeeAll={() => router.push('/gallery')} />
            </>
          );
        }}
      </AsyncBoundary>

      <AsyncBoundary state={appState}>
        {(a) => (
          <>
            <SectionTitle title="Jelajahi" note="Ketuk untuk membuka" />
            <View style={styles.menu}>
              {a.menu.map((m) => (
                <Pressable key={m.id} onPress={() => router.push(m.rute)} accessibilityRole="button"
                  accessibilityLabel={`Buka ${m.label}`}
                  style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={[styles.menuIcon, { backgroundColor: colors[m.warna] }]}>
                    <Ionicons name={m.ikon} size={20} color={colors.onPrimary} />
                  </View>
                  <Text style={{ color: colors.text, fontWeight: '700', marginTop: 8 }}>{m.label}</Text>
                </Pressable>
              ))}
            </View>

            <SectionTitle title="Tentang aplikasi" />
            <Card>
              <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>{a.nama}</Text>
              <Text style={{ color: colors.sub, marginTop: 2 }}>
                Versi {a.versi}. Target {a.level} untuk mata kuliah {a.mataKuliah}.
              </Text>
              <View style={[styles.wrap, { marginTop: 12 }]}>
                {a.teknologi.map((t) => <Chip key={t} label={t} color={colors.primary} />)}
              </View>
            </Card>

            <SectionTitle title="Fitur lengkap" note={`${a.fitur.length} fitur`} />
            <Card>
              {a.fitur.map((f, i) => (
                <View key={f} style={[styles.feat, i < a.fitur.length - 1 && { marginBottom: 12 }]}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={{ color: colors.text, flex: 1, marginLeft: 10, lineHeight: 21 }}>{f}</Text>
                </View>
              ))}
            </Card>
          </>
        )}
      </AsyncBoundary>

      {/* Untuk demo Level 10: memunculkan tampilan error */}
      <Pressable accessibilityRole="button" accessibilityLabel="Uji tampilan error"
        onPress={() => { setSimulateError(true); state.reload(); appState.reload(); galState.reload(); }}
        style={styles.demo}>
        <Text style={{ color: colors.sub, fontSize: 13 }}>Uji tampilan error (untuk demo)</Text>
      </Pressable>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  stats: { flexDirection: 'row', marginTop: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  menu: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menuItem: { width: '31.5%', borderRadius: 20, borderWidth: 1, padding: 14, marginBottom: 10, minHeight: 92 },
  menuIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  feat: { flexDirection: 'row', alignItems: 'flex-start' },
  demo: { alignItems: 'center', minHeight: 44, justifyContent: 'center', marginTop: 20 },
});
