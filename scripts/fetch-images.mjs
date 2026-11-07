// Chạy: npm run images  (cần Node 18+ và có mạng)
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const recipes = JSON.parse(await readFile('src/data/recipes.json', 'utf8'));
const headers = { 'User-Agent': 'LabRecipeBook/1.0 (sinh vien bai tap web)' };
await mkdir('public/images', { recursive: true });

const sleep = (ms) => new Promise((s) => setTimeout(s, ms));

async function download(src) {
  const candidates = [960, 500, 330].map((w) => src.replace(/\/\d+px-/, `/${w}px-`));
  candidates.push(src);
  for (const url of candidates) {
    const res = await fetch(url, { headers });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await sleep(500);
  }
  throw new Error('không tải được ở mọi kích thước');
}

for (const r of recipes) {
  try {
    const api = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(r.wiki)}`;
    const res = await fetch(api, { headers });
    if (!res.ok) throw new Error(`không có trang "${r.wiki}" (${res.status})`);
    const info = await res.json();
    const src = info.thumbnail?.source;
    if (!src) throw new Error('trang không có ảnh');
    await writeFile(`public/images/${r.id}.jpg`, await download(src));
    console.log('OK  ', r.id, '<-', info.title);
  } catch (e) {
    console.log('LỖI ', r.id, e.message, `(tự tải ảnh và đặt tên public/images/${r.id}.jpg)`);
  }
  await sleep(1000);
}
