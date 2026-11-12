import AsyncStorage from '@react-native-async-storage/async-storage';

// Baca/tulis JSON ke penyimpanan lokal, aman dari error.
export async function loadJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
export async function saveJSON(key, value) {
  try { await AsyncStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}
