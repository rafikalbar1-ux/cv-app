import { validateContact } from '../utils/validation';

describe('validateContact', () => {
  test('semua kosong menghasilkan 3 error', () => {
    expect(Object.keys(validateContact({ nama: '', email: '', pesan: '' }))).toHaveLength(3);
  });
  test('email tidak valid', () => {
    expect(validateContact({ nama: 'A', email: 'abc', pesan: 'halo semua' }).email).toBe('Format email tidak valid');
  });
  test('pesan terlalu pendek', () => {
    expect(validateContact({ nama: 'A', email: 'a@b.co', pesan: 'hi' }).pesan).toBe('Pesan minimal 10 karakter');
  });
  test('data benar tanpa error', () => {
    expect(validateContact({ nama: 'A', email: 'a@b.co', pesan: 'halo, salam kenal' })).toEqual({});
  });
});
