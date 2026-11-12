import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { useTheme } from '../theme/ThemeContext';

// Dipakai untuk hobi dan nilai diri (bentuk data sama: ikon, nama, deskripsi).
export default function HobbyItem({ item, color }) {
  const { colors } = useTheme();
  const c = color || colors.primary;
  return (
    <Card style={styles.row}>
      <View style={[styles.icon, { backgroundColor: c }]}>
        <Ionicons name={item.ikon} size={22} color={colors.onPrimary} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>{item.nama}</Text>
        <Text style={{ color: colors.sub, lineHeight: 20, marginTop: 2 }}>{item.deskripsi}</Text>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-6deg' }] },
});
