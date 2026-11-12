// Mock API: membaca JSON lokal dengan jeda untuk mensimulasikan jaringan.
import profile from '../data/profile.json';
import skills from '../data/skills.json';
import portfolio from '../data/portfolio.json';
import score from '../data/score.json';
import appInfo from '../data/app.json';
import gallery from '../data/gallery.json';

let simulateError = false;
export const setSimulateError = (v) => { simulateError = v; };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchData(data) {
  await wait(450);
  if (simulateError) throw new Error('Data gagal dimuat. Periksa koneksi lalu coba lagi.');
  return data;
}

export const getProfile = () => fetchData(profile);
export const getSkills = () => fetchData(skills);
export const getPortfolio = () => fetchData(portfolio);
export const getScore = () => fetchData(score);
export const getAppInfo = () => fetchData(appInfo);
export const getGallery = () => fetchData(gallery);
