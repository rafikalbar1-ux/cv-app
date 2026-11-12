import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import photoMap from '../assets/photoMap';
import { useTheme } from '../theme/ThemeContext';

// Strip foto horizontal (pratinjau galeri di Home).
export default function PhotoStrip({ items, onPress, onSeeAll }) {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items.slice(0, 6).map((it, i) => (
        <Pressable key={it.id} onPress={() => onPress(i)} accessibilityRole="imagebutton" accessibilityLabel={`Buka foto ${it.judul}`}>
          <Image source={photoMap[it.file]} style={[styles.img, { borderColor: colors.border }]} />
        </Pressable>
      ))}
      <Pressable onPress={onSeeAll} accessibilityRole="button" accessibilityLabel="Lihat semua foto"
        style={[styles.more, { borderColor: colors.accent, backgroundColor: colors.surface }]}>
        <Ionicons name="images" size={24} color={colors.accent} />
        <Text style={{ color: colors.accent, fontWeight: '700', marginTop: 6 }}>Semua</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  img: { width: 120, height: 150, borderRadius: 18, borderWidth: 1, marginRight: 10 },
  more: { width: 90, height: 150, borderRadius: 18, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
});
