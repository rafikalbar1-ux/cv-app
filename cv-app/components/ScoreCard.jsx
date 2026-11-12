import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Glow } from './AbstractBackground';

// Kartu besar Current Score (props: nilai, grade, predikat).
export default function ScoreCard({ nilai, grade, predikat }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.primary }]} accessible
      accessibilityLabel={`Nilai saat ini ${nilai}, grade ${grade}, ${predikat}`}>
      <Glow size={260} color="#FFFFFF" strength={0.07} style={{ position: 'absolute', right: -80, top: -90 }} />
      <Glow size={180} color={colors.accent} strength={0.12} style={{ position: 'absolute', left: -60, bottom: -70 }} />
      <View style={[styles.ring, { right: 22, bottom: 20 }]} />
      <Text style={[styles.cap, { color: colors.onPrimary }]}>Current Score</Text>
      <View style={styles.row}>
        <Text style={[styles.score, { color: colors.onPrimary }]}>{nilai}</Text>
        <View style={styles.gradeBox}>
          <Text style={styles.grade}>{grade}</Text>
        </View>
      </View>
      <Text style={[styles.pred, { color: colors.onPrimary }]}>{predikat}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 22, borderRadius: 30, overflow: 'hidden', marginBottom: 14 },
  cap: { fontSize: 15, fontWeight: '600', opacity: 0.9 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  score: { fontSize: 84, fontWeight: '900', letterSpacing: -3 },
  gradeBox: { marginLeft: 18, width: 62, height: 62, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '8deg' }] },
  grade: { fontSize: 34, fontWeight: '900', color: '#4B2FE0' },
  pred: { fontSize: 16, fontWeight: '700' },
  ring: { position: 'absolute', width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)' },
});
