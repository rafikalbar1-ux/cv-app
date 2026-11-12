import React, { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import ProjectCard from '../components/ProjectCard';
import Chip from '../components/Chip';
import { EmptyView } from '../components/StateView';
import useAsync from '../hooks/useAsync';
import { getPortfolio } from '../services/api';
import { useTheme } from '../theme/ThemeContext';

function List({ items }) {
  const { colors } = useTheme();
  const [q, setQ] = useState('');            // State: kata kunci
  const [tag, setTag] = useState('Semua');   // State: tag aktif
  const tags = useMemo(() => ['Semua', ...new Set(items.flatMap((i) => i.tag))], [items]);
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    return items.filter((i) =>
      (tag === 'Semua' || i.tag.includes(tag)) &&
      (i.judul.toLowerCase().includes(k) || i.deskripsi.toLowerCase().includes(k)));
  }, [q, tag, items]);
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.inputBg, borderRadius: 16, paddingHorizontal: 14, marginBottom: 12 }}>
        <Ionicons name="search" size={18} color={colors.sub} />
        <TextInput value={q} onChangeText={setQ} placeholder="Cari karya..." placeholderTextColor={colors.sub}
          accessibilityLabel="Cari karya" style={{ flex: 1, color: colors.text, minHeight: 48, marginLeft: 10 }} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {tags.map((t) => <Chip key={t} label={t} active={t === tag} onPress={() => setTag(t)} color={colors.accent2} />)}
      </View>
      {filtered.length === 0
        ? <EmptyView icon="search" message="Tidak ada karya yang cocok. Coba kata kunci atau tag lain." />
        : filtered.map((p) => <ProjectCard key={p.id} item={p} />)}
    </>
  );
}

export default function Portfolio() {
  const state = useAsync(getPortfolio);
  return (
    <ScreenContainer>
      <ScreenHeader icon="briefcase" title="Karya" subtitle="Proyek dan pengalaman. Ketuk kartu untuk melihat detail." />
      <AsyncBoundary state={state}>{(items) => <List items={items} />}</AsyncBoundary>
    </ScreenContainer>
  );
}
