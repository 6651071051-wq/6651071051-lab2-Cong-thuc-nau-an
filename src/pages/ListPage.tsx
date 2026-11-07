import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecipes, type Recipe } from '../api';
import { useFavorites } from '../favorites';
import { debounce, truncateText } from '../utils';
import Modal from '../components/Modal';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import Skeleton from '../components/Skeleton';
import FavoriteButton from '../components/FavoriteButton';

const ALL = 'Tất cả';
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

export default function ListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(ALL);
  const { isFavorite } = useFavorites();
  const applyQuery = useMemo(() => debounce(setQuery, 300), []);

  useEffect(() => {
    let alive = true;
    fetchRecipes()
      .then((r) => alive && setRecipes(r))
      .catch((e: unknown) => alive && setError(e instanceof Error ? e.message : 'Không tải được dữ liệu'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const categories = useMemo(() => [ALL, ...new Set(recipes.map((r) => r.category))], [recipes]);
  const shown = recipes.filter(
    (r) =>
      (!onlyFavs || isFavorite(r.id)) &&
      (cat === ALL || r.category === cat) &&
      norm(r.name).includes(norm(query)),
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm ${
      active ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-300 bg-white text-stone-700'
    }`;

  return (
    <>
      <section className="bg-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:pt-14">
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">Hôm nay nấu gì?</h1>
          <p className="mt-3 max-w-xl text-emerald-50">
            {recipes.length || 20} món ngon ba miền, có nguyên liệu và từng bước làm chi tiết để bạn nấu theo.
          </p>
          <label className="mt-6 block max-w-xl">
            <span className="sr-only">Tìm món ăn</span>
            <input
              type="search"
              value={input}
              placeholder="Tìm món: phở, bún chả, cá kho..."
              onChange={(e) => { setInput(e.target.value); applyQuery(e.target.value); }}
              className="w-full rounded-full border-0 px-5 py-3 text-stone-900 placeholder:text-stone-500"
            />
          </label>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={chip(cat === c)}>
              {c}
            </button>
          ))}
          <button type="button" aria-pressed={onlyFavs} onClick={() => setOnlyFavs((v) => !v)} className={`${chip(onlyFavs)} ml-auto`}>
            ♥ Chỉ món yêu thích
          </button>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}. Hãy tải lại trang để thử lại.</p>}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} />)
            : shown.map((r) => <RecipeCard key={r.id} recipe={r} onOpen={setSelected} />)}
        </div>

        {!loading && !error && shown.length === 0 && (
          <p className="py-16 text-center text-stone-600">
            {onlyFavs && !query && cat === ALL
              ? 'Bạn chưa lưu món nào. Bấm ♡ trên một món để lưu lại.'
              : 'Không có món nào khớp. Thử từ khóa hoặc nhóm món khác.'}
          </p>
        )}
      </main>

      {selected && (
        <Modal title={selected.name} onClose={close}>
          <RecipeImage src={selected.image} name={selected.name} className="mb-4 aspect-[4/3] w-full rounded-xl" />
          <p className="mb-3 text-sm text-stone-600">
            {selected.category} · {selected.region} · {selected.time} phút · {selected.servings} người ăn · {selected.difficulty}
          </p>
          <p className="mb-4 leading-relaxed">{truncateText(selected.steps[0], 200)}</p>
          <div className="flex items-center gap-3">
            <Link to={`/item/${selected.id}`} className="rounded-full bg-emerald-800 px-5 py-2 text-white">
              Xem công thức đầy đủ
            </Link>
            <FavoriteButton id={selected.id} name={selected.name} />
          </div>
        </Modal>
      )}
    </>
  );
}
