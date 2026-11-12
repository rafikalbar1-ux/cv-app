import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { EmptyView } from './StateView';
import { useTheme } from '../theme/ThemeContext';
import { validateContact } from '../utils/validation';
import { loadJSON, saveJSON } from '../utils/storage';

const empty = { nama: '', email: '', pesan: '' };
const MAX = 300;
const INBOX_KEY = 'contact-inbox';

export default function ContactForm() {
  const { colors } = useTheme();
  const [form, setForm] = useState(empty);       // State: isi input
  const [errors, setErrors] = useState({});      // State: pesan error
  const [sending, setSending] = useState(false); // State: status kirim
  const [result, setResult] = useState(null);    // State: hasil pemrosesan
  const [inbox, setInbox] = useState([]);        // State: riwayat pesan (tersimpan lokal)

  useEffect(() => { loadJSON(INBOX_KEY, []).then(setInbox); }, []);

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const onSubmit = () => {
    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length > 0) { setResult(null); return; }
    setSending(true);
    // Simulasi pengiriman (tanpa server sungguhan).
    setTimeout(() => {
      const item = { id: String(Date.now()), ...form, waktu: new Date().toLocaleString('id-ID') };
      const next = [item, ...inbox];
      setInbox(next);
      saveJSON(INBOX_KEY, next);
      setSending(false);
      setResult(item);
      setForm(empty);
    }, 800);
  };

  const clearInbox = () => { setInbox([]); saveJSON(INBOX_KEY, []); };

  const inputStyle = (key, extra) => [
    styles.input,
    { color: colors.text, backgroundColor: colors.inputBg, borderColor: errors[key] ? colors.danger : colors.border },
    extra,
  ];
  const label = (t) => <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 6 }}>{t}</Text>;
  const err = (key) => errors[key]
    ? <Text style={{ color: colors.danger, marginTop: 4, fontSize: 13 }} accessibilityLiveRegion="polite">{errors[key]}</Text>
    : null;

  return (
    <View>
      <Card>
        <View style={styles.field}>
          {label('Nama')}
          <TextInput value={form.nama} onChangeText={(t) => onChange('nama', t)} accessibilityLabel="Nama"
            placeholder="Nama kamu" placeholderTextColor={colors.sub} style={inputStyle('nama')} />
          {err('nama')}
        </View>
        <View style={styles.field}>
          {label('Email')}
          <TextInput value={form.email} onChangeText={(t) => onChange('email', t)} accessibilityLabel="Email"
            placeholder="nama@email.com" placeholderTextColor={colors.sub} keyboardType="email-address"
            autoCapitalize="none" style={inputStyle('email')} />
          {err('email')}
        </View>
        <View style={styles.field}>
          {label('Pesan')}
          <TextInput value={form.pesan} onChangeText={(t) => onChange('pesan', t)} accessibilityLabel="Pesan"
            placeholder="Tulis pesan untuk Rapi" placeholderTextColor={colors.sub} multiline maxLength={MAX}
            style={inputStyle('pesan', styles.area)} />
          <View style={styles.between}>
            <View style={{ flex: 1 }}>{err('pesan')}</View>
            <Text style={{ color: colors.sub, fontSize: 12, marginTop: 4 }}>{form.pesan.length}/{MAX}</Text>
          </View>
        </View>
        <Pressable onPress={onSubmit} disabled={sending} accessibilityRole="button" accessibilityLabel="Kirim pesan"
          style={[styles.btn, { backgroundColor: colors.primary, opacity: sending ? 0.6 : 1 }]}>
          <Ionicons name="paper-plane" size={18} color={colors.onPrimary} />
          <Text style={{ color: colors.onPrimary, fontWeight: '700', marginLeft: 8 }}>{sending ? 'Mengirim...' : 'Kirim pesan'}</Text>
        </Pressable>
      </Card>

      {result && (
        <Card style={{ borderColor: colors.success }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            <Text style={{ color: colors.success, fontWeight: '700', marginLeft: 8 }} accessibilityLiveRegion="polite">
              Pesan terkirim (simulasi)
            </Text>
          </View>
          <Text style={{ color: colors.text, lineHeight: 21 }}>Terima kasih, {result.nama}. Balasan akan dikirim ke {result.email}.</Text>
        </Card>
      )}

      <View style={styles.between}>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 17 }}>Riwayat pesan</Text>
        {inbox.length > 0 && (
          <Pressable onPress={clearInbox} accessibilityRole="button" accessibilityLabel="Hapus riwayat pesan"
            style={{ minHeight: 44, justifyContent: 'center' }}>
            <Text style={{ color: colors.danger, fontWeight: '600' }}>Hapus semua</Text>
          </Pressable>
        )}
      </View>
      {inbox.length === 0
        ? <EmptyView icon="chatbubbles" message="Belum ada pesan. Kirim pesan pertamamu lewat formulir di atas." />
        : inbox.map((m) => (
          <Card key={m.id}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{m.nama}</Text>
            <Text style={{ color: colors.sub, fontSize: 12, marginBottom: 6 }}>{m.waktu}</Text>
            <Text style={{ color: colors.text, lineHeight: 21 }}>{m.pesan}</Text>
          </Card>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  field: { marginBottom: 14 },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, minHeight: 48 },
  area: { minHeight: 110, textAlignVertical: 'top' },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, minHeight: 50 },
});
