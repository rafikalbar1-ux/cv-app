import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import Chip from '../components/Chip';
import PhotoViewer from '../components/PhotoViewer';
import { EmptyView } from '../components/StateView';
import useAsync from '../hooks/useAsync';
import { getGallery } from '../services/api';
import photoMap from '../assets/photoMap';
import { useTheme } from '../theme/ThemeContext';

function Grid({ all }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const items = useMemo(() => all.filter((i) => photoMap[i.file]), [all]); // abaikan foto yang belum terdaftar
  const [kategori, setKategori] = useState('Semua');  // State: filter aktif
  const [index, setIndex] = useState(null);           // State: foto yang dibuka
  const kategoriList = useMemo(() => ['Semua', ...new Set(items.map((i) => i.kategori))], [items]);
  const shown = kategori === 'Semua' ? items : items.filter((i) => i.kategori === kategori);
  const size = (width - 36 - 10) / 2;

  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {kategoriList.map((k) => <Chip key={k} label={k} active={k === kategori} onPress={() => setKategori(k)} color={colors.primary} />)}
      </View>
      <Text style={{ color: colors.sub, marginBottom: 12 }}>{shown.length} foto</Text>
      {shown.length === 0 ? <EmptyView icon="images" message="Belum ada foto di kategori ini." /> : (
        <View style={styles.grid}>
          {shown.map((it, i) => (
            <Pressable key={it.id} onPress={() => setIndex(i)} accessibilityRole="imagebutton"
              accessibilityLabel={`${it.judul}. Ketuk untuk memperbesar`}
              style={{ width: size, height: size * 1.15, marginBottom: 10 }}>
              <Image source={photoMap[it.file]} style={[styles.img, { borderColor: colors.border }]} />
              <View style={styles.label}>
                <Text style={styles.labelText} numberOfLines={1}>{it.judul}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
      <PhotoViewer items={shown} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </>
  );
}

export default function Gallery() {
  const state = useAsync(getGallery);
  return (
    <ScreenContainer>
      <ScreenHeader icon="images" title="Galeri" subtitle="Kumpulan foto saya. Ketuk foto untuk memperbesar." />
      <AsyncBoundary state={state}>{(all) => <Grid all={all} />}</AsyncBoundary>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  img: { width: '100%', height: '100%', borderRadius: 20, borderWidth: 1 },
  label: { position: 'absolute', left: 8, right: 8, bottom: 8, backgroundColor: 'rgba(7,11,26,0.65)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  labelText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
});
