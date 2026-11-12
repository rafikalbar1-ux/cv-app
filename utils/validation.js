// Validasi formulir kontak. Mengembalikan objek error (kosong = valid).
export function validateContact({ nama, email, pesan }) {
  const errors = {};
  if (!nama || !nama.trim()) errors.nama = 'Nama tidak boleh kosong';
  if (!email || !email.trim()) errors.email = 'Email tidak boleh kosong';
  else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'Format email tidak valid';
  if (!pesan || !pesan.trim()) errors.pesan = 'Pesan tidak boleh kosong';
  else if (pesan.trim().length < 10) errors.pesan = 'Pesan minimal 10 karakter';
  return errors;
}
