import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import SkillCard from '../components/SkillCard';
import StatTile from '../components/StatTile';
import Chip from '../components/Chip';
import { EmptyView } from '../components/StateView';
import useAsync from '../hooks/useAsync';
import { getSkills } from '../services/api';
import { average } from '../utils/score';
import { useTheme } from '../theme/ThemeContext';

function SkillList({ list }) {
  const { colors } = useTheme();
  const [kategori, setKategori] = useState('Semua'); // State: filter aktif
  const kategoriList = useMemo(() => ['Semua', ...new Set(list.map((s) => s.kategori))], [list]);
  const shown = kategori === 'Semua' ? list : list.filter((s) => s.kategori === kategori);
  return (
    <>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <StatTile icon="flash" value={String(list.length)} label="Keterampilan" color={colors.accent} />
        <View style={{ width: 10 }} />
        <StatTile icon="speedometer" value={`${Math.round(average(list.map((s) => s.level)))}%`} label="Rata-rata level" color={colors.accent2} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {kategoriList.map((k) => <Chip key={k} label={k} active={k === kategori} onPress={() => setKategori(k)} color={colors.primary} />)}
      </View>
      {shown.length === 0 ? <EmptyView message="Belum ada keterampilan di kategori ini." /> : shown.map((s) => <SkillCard key={s.id} item={s} />)}
    </>
  );
}

export default function Skills() {
  const state = useAsync(getSkills);
  return (
    <ScreenContainer>
      <ScreenHeader icon="flash" title="Keterampilan" subtitle="Dari arena silat sampai kode, lengkap dengan tingkat kemampuan." />
      <AsyncBoundary state={state}>{(list) => <SkillList list={list} />}</AsyncBoundary>
    </ScreenContainer>
  );
}
