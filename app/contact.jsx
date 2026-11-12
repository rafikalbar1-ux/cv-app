import React from 'react';
import { KeyboardAvoidingView, Linking, Platform } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AsyncBoundary from '../components/AsyncBoundary';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import ContactForm from '../components/ContactForm';
import useAsync from '../hooks/useAsync';
import { getProfile } from '../services/api';

const open = (url) => { Linking.openURL(url).catch(() => {}); };

export default function Contact() {
  const state = useAsync(getProfile);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenContainer>
        <ScreenHeader icon="mail" title="Hubungi saya" subtitle="Kirim pesan lewat formulir atau pakai kontak di bawah." />
        <AsyncBoundary state={state}>
          {(p) => (
            <Card>
              {p.kontak.map((k, i) => (
                <InfoRow key={k.id} icon={k.ikon} label={k.label} value={k.nilai}
                  onPress={k.aksi ? () => open(k.aksi) : undefined} last={i === p.kontak.length - 1} />
              ))}
            </Card>
          )}
        </AsyncBoundary>
        <SectionTitle title="Kirim pesan" />
        <ContactForm />
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
