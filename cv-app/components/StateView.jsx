import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// Kondisi memuat, error, dan kosong.
export function Loading() {
  const { colors } = useTheme();
  return (
    <View style={styles.box} accessibilityLabel="Memuat data">
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={{ color: colors.sub, marginTop: 10 }}>Memuat data...</Text>
    </View>
  );
}
export function ErrorView({ message, onRetry }) {
  const { colors } = useTheme();
  return (
    <View style={styles.box}>
      <Ionicons name="cloud-offline" size={40} color={colors.danger} />
      <Text style={{ color: colors.text, fontWeight: '700', fontSize: 17, marginTop: 10 }}>Gagal memuat</Text>
      <Text style={{ color: colors.sub, textAlign: 'center', marginVertical: 8 }}>{message}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Coba lagi" onPress={onRetry}
        style={[styles.btn, { backgroundColor: colors.primary }]}>
        <Text style={{ color: colors.onPrimary, fontWeight: '700' }}>Coba lagi</Text>
      </Pressable>
    </View>
  );
}
export function EmptyView({ message, icon = 'file-tray' }) {
  const { colors } = useTheme();
  return (
    <View style={styles.box}>
      <Ionicons name={icon} size={36} color={colors.sub} />
      <Text style={{ color: colors.sub, marginTop: 8, textAlign: 'center' }}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center', padding: 32 },
  btn: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14, minHeight: 46, justifyContent: 'center', marginTop: 4 },
});
