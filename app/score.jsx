import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import ScoreCard from '../components/ScoreCard';
import StatTile from '../components/StatTile';
import ProgressTile from '../components/ProgressTile';
import useAsync from '../hooks/useAsync';
import { getScore } from '../services/api';
import { average, formatNumber, formatPercent, predikat } from '../utils/score';
import { useTheme } from '../theme/ThemeContext';

export default function Score() {
  const state = useAsync(getScore);
  const { colors } = useTheme();
  const tileColors = [colors.primary, colors.accent, colors.accent2, colors.success];
  return (
    <ScreenContainer>
      <ScreenHeader icon="stats-chart" title="My Score" subtitle="Ringkasan capaian belajar di mata kuliah ini (data dummy untuk UTS)." />
      <AsyncBoundary state={state}>
        {(s) => {
          const avg = average(s.progress.map((p) => p.value));
          return (
            <>
              <ScoreCard nilai={s.currentScore.nilai} grade={s.currentScore.grade} predikat={predikat(s.currentScore.nilai)} />
              <View style={{ flexDirection: 'row' }}>
                <StatTile icon="diamond" value={`${formatNumber(s.learningPoints.total)}`} label="Learning Points (LP)" color={colors.accent} />
                <View style={{ width: 10 }} />
                <StatTile icon="analytics" value={formatPercent(avg)} label="Rata-rata progres" color={colors.accent2} />
              </View>

              <SectionTitle title="Learning Progress" />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {s.progress.map((p, i) => <ProgressTile key={p.id} item={p} color={tileColors[i % tileColors.length]} />)}
              </View>

              <SectionTitle title="Identitas akademik" />
              <Card>
                <InfoRow icon="person" label="Nama" value={s.identitas.nama} />
                <InfoRow icon="card" label="NIM" value={s.identitas.nim} />
                <InfoRow icon="book" label="Mata kuliah" value={s.identitas.mk} />
                <InfoRow icon="ribbon" label="Dosen" value={s.identitas.dosen} last />
              </Card>
              <Text style={{ color: colors.sub, fontSize: 12, textAlign: 'center', marginTop: 4 }}>
                Semua angka berasal dari data/score.json
              </Text>
            </>
          );
        }}
      </AsyncBoundary>
    </ScreenContainer>
  );
}
