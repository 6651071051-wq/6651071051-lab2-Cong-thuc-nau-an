import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchRecipe, type Recipe } from '../api';
import FavoriteButton from '../components/FavoriteButton';
import RecipeImage from '../components/RecipeImage';

export default function DetailPage() {
  const { id = '' } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setDone([]);
    fetchRecipe(id)
      .then((r) => alive && setRecipe(r))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  const toggle = (item: string) => setDone((d) => (d.includes(item) ? d.filter((x) => x !== item) : [...d, item]));

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/" className="text-emerald-800 underline">← Quay lại danh sách</Link>
      {loading && <div className="mt-6 h-72 animate-pulse rounded-3xl bg-stone-200" role="status" aria-label="Đang tải" />}
      {!loading && !recipe && <p className="mt-6">Không tìm thấy món này.</p>}
      {recipe && (
        <article className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl">{recipe.name}</h1>
              <p className="mt-2 text-stone-600">
                {recipe.category} · {recipe.region} · {recipe.time} phút · {recipe.servings} người ăn · Độ khó: {recipe.difficulty}
              </p>
            </div>
            <FavoriteButton id={recipe.id} name={recipe.name} />
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
              <RecipeImage src={recipe.image} name={recipe.name} className="aspect-[4/3] w-full rounded-3xl" />
              <section className="rounded-3xl bg-white p-5 ring-1 ring-stone-200">
                <h2 className="font-display text-xl">Nguyên liệu</h2>
                <p className="text-sm text-stone-600">Tick vào nguyên liệu khi đã chuẩn bị xong.</p>
                <ul className="mt-3 space-y-2">
                  {recipe.ingredients.map((i) => (
                    <li key={i}>
                      <label className="flex cursor-pointer items-start gap-3">
                        <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-1 h-4 w-4 accent-emerald-700" />
                        <span className={done.includes(i) ? 'text-stone-500 line-through' : ''}>{i}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div>
              <h2 className="font-display text-2xl">Cách làm</h2>
              <ol className="mt-4 space-y-5">
                {recipe.steps.map((s, idx) => (
                  <li key={s} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-800 font-display text-white">{idx + 1}</span>
                    <p className="pt-1 leading-relaxed">{s}</p>
                  </li>
                ))}
              </ol>
              <section className="mt-8 rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
                <h2 className="font-display text-xl text-emerald-900">Mẹo nhỏ</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-emerald-950">
                  {recipe.tips.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </section>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}
