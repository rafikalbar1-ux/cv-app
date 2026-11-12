import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import TimelineItem from '../components/TimelineItem';
import HobbyItem from '../components/HobbyItem';
import { EmptyView } from '../components/StateView';
import useAsync from '../hooks/useAsync';
import { getProfile } from '../services/api';
import { useTheme } from '../theme/ThemeContext';

function Timeline({ list, empty }) {
  if (list.length === 0) return <EmptyView message={empty} />;
  return list.map((e, i) => <TimelineItem key={e.id} item={e} isLast={i === list.length - 1} />);
}

export default function About() {
  const state = useAsync(getProfile);
  const { colors } = useTheme();
  return (
    <ScreenContainer>
      <ScreenHeader icon="person" title="Tentang saya" subtitle="Siapa saya, apa yang saya tekuni, dan nilai yang saya pegang." />
      <AsyncBoundary state={state}>
        {(p) => (
          <>
            <Card>
              <InfoRow icon="person-circle" label="Nama lengkap" value={p.nama} />
              <InfoRow icon="card" label="NIM" value={p.nim} />
              <InfoRow icon="school" label="Program studi" value={p.jurusan} />
              <InfoRow icon="business" label="Fakultas" value={p.fakultas} />
              <InfoRow icon="calendar" label="Semester" value={p.semester} last />
            </Card>

            <SectionTitle title="Cerita singkat" />
            <Card>
              {p.tentang.map((t, i) => (
                <Text key={i} style={{ color: colors.text, lineHeight: 24, fontSize: 15, marginBottom: i < p.tentang.length - 1 ? 12 : 0 }}>{t}</Text>
              ))}
            </Card>

            <SectionTitle title="Nilai yang saya pegang" />
            {p.nilai.map((n, i) => <HobbyItem key={n.id} item={n} color={[colors.primary, colors.accent2, colors.warn][i % 3]} />)}

            <SectionTitle title="Pendidikan" />
            <Timeline list={p.pendidikan} empty="Belum ada data pendidikan." />

            <SectionTitle title="Pengalaman" />
            <Timeline list={p.pengalaman} empty="Belum ada pengalaman." />

            <SectionTitle title="Hobi" />
            {p.hobi.length === 0
              ? <EmptyView message="Belum ada hobi." />
              : p.hobi.map((h, i) => <HobbyItem key={h.id} item={h} color={[colors.accent, colors.success][i % 2]} />)}
          </>
        )}
      </AsyncBoundary>
    </ScreenContainer>
  );
}
