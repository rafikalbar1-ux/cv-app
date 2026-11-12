// Peta nama file -> gambar. React Native butuh require() statis, jadi setiap foto didaftarkan di sini.
// Menambah foto: taruh file di assets/photos/, tambahkan satu baris di bawah,
// lalu tambahkan datanya di data/gallery.json (field "file" = kunci di bawah).
const photoMap = {
  foto1: require('./photos/foto1.jpg'),
  foto2: require('./photos/foto2.jpg'),
  foto3: require('./photos/foto3.jpg'),
  foto4: require('./photos/foto4.jpg'),
  foto5: require('./photos/foto5.jpg'),
  foto6: require('./photos/foto6.jpg'),
  foto7: require('./photos/foto7.jpg'),
  foto8: require('./photos/foto8.jpg'),
  foto9: require('./photos/foto9.jpg'),
  foto10: require('./photos/foto10.jpg'),
};
export default photoMap;
