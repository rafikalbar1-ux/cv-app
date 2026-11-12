import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import photoMap from '../assets/photoMap';

// Penampil foto layar penuh dengan tombol sebelumnya/berikutnya.
export default function PhotoViewer({ items, index, onClose, onChange }) {
  const { width, height } = useWindowDimensions();
  if (index === null || index === undefined || !items[index]) return null;
  const item = items[index];
  const prev = () => onChange((index - 1 + items.length) % items.length);
  const next = () => onChange((index + 1) % items.length);
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.bg}>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Tutup foto" style={styles.close}>
          <Ionicons name="close" size={26} color="#FFFFFF" />
        </Pressable>
        <Image source={photoMap[item.file]} style={{ width, height: height * 0.62 }} resizeMode="contain"
          accessibilityLabel={item.judul} />
        <View style={styles.caption}>
          <Text style={styles.title}>{item.judul}</Text>
          <Text style={styles.sub}>{item.keterangan}</Text>
          <Text style={styles.count}>{index + 1} dari {items.length}</Text>
        </View>
        <Pressable onPress={prev} accessibilityRole="button" accessibilityLabel="Foto sebelumnya" style={[styles.nav, { left: 10 }]}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={next} accessibilityRole="button" accessibilityLabel="Foto berikutnya" style={[styles.nav, { right: 10 }]}>
          <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
        </Pressable>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: 'rgba(5,8,20,0.96)', alignItems: 'center', justifyContent: 'center' },
  close: { position: 'absolute', top: 48, right: 18, width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  nav: { position: 'absolute', top: '45%', width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  caption: { alignItems: 'center', paddingHorizontal: 24, marginTop: 12 },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  sub: { color: '#B6BEDF', marginTop: 4, textAlign: 'center' },
  count: { color: '#8B93B8', marginTop: 8, fontSize: 12 },
});
