# Personal CV dan Academic Score App

Proyek UTS Pemrograman Mobile 2 (React Native + Expo). **Level target: 9 dan 10.**

- Nama: Rapi
- NIM: 242505034
- Program studi: Sistem Informasi (Fakultas Komputer)
- Dosen: Iin, M.Kom

## Cara menjalankan
```bash
npm install --legacy-peer-deps
npx expo install --fix
npx expo start -c      # scan QR dengan Expo Go
npm test               # menjalankan unit test
```
Kalau QR tidak tersambung, pakai `npx expo start --tunnel`.

## Fitur
1. Navigasi 6 halaman (Expo Router, tab bawah): Home, Tentang, Skills, Karya, My Score, Kontak.
2. Seluruh konten berasal dari file JSON di `data/` (profil, skills, karya, nilai, info aplikasi).
3. Mock API (`services/api.js`) dengan jeda dan simulasi error.
4. Status memuat, error (tombol Coba lagi), dan kosong di setiap halaman.
5. Skills: filter kategori, rata-rata level, label Dasar/Menengah/Mahir.
6. Karya: pencarian, filter tag, kartu yang bisa dibuka untuk detail.
7. My Score: nilai 89 (A), 12.375 LP, progres Attendance/Practice/Quest/Challenge, rata-rata progres.
8. Formulir kontak: validasi nama, email, pesan; respons setelah kirim; riwayat pesan tersimpan lokal.
9. Mode terang/gelap, preferensi disimpan di AsyncStorage.
10. Aksesibilitas dasar: accessibilityLabel/role/state, target sentuh minimal 44 px.
11. Galeri foto: grid, filter kategori, penampil layar penuh (geser sebelumnya/berikutnya), pratinjau di Home.
12. Unit test (Jest) untuk validasi formulir dan fungsi nilai.

## Mengganti dan menambah foto
- Foto profil: ganti `assets/profile.jpg`.
- Galeri: timpa `assets/photos/foto1.jpg` sampai `foto10.jpg` dengan fotomu (nama file sama), lalu ubah judul dan keterangan di `data/gallery.json`.
- Menambah foto: taruh file di `assets/photos/`, tambah satu baris di `assets/photoMap.js`, dan satu objek di `data/gallery.json`.

## Arsitektur
```
app/         halaman (routing Expo Router)
components/  komponen UI reusable, menerima data lewat Props
data/        file JSON (terpisah dari UI)
services/    mock API: membaca JSON dengan simulasi delay dan error
hooks/       useAsync (loading, error, data)
theme/       ThemeContext (palet warna + preferensi tema)
utils/       fungsi murni (validasi, format, penyimpanan)
__tests__/   unit test
```
Alur data: `data/*.json` -> `services/api.js` -> `useAsync` -> halaman -> komponen lewat Props.

## Keputusan teknis
- Data dipisah dari UI agar konten bisa diubah tanpa menyentuh komponen.
- Logika murni (validasi, format) ada di `utils/` supaya mudah diuji.
- Latar abstrak dibuat dari View biasa (lingkaran, ring, kotak), tanpa paket tambahan.
- Animasi dipakai hemat: masuk pada hero Home dan isi progress bar.

## Pengujian
- Otomatis: `npm test`.
- Manual: tombol "Uji tampilan error" di Home menampilkan state error; tombol Coba lagi memulihkannya.
- Manual: kirim formulir kosong untuk melihat validasi, lalu isi benar untuk melihat respons dan riwayat.

## Pengembangan lanjutan
- Ganti mock API dengan API Academic War LMS saat tersedia (cukup ubah `services/api.js`).
