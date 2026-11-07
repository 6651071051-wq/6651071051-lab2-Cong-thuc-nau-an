import { useFavorites } from '../favorites';

export default function FavoriteButton({ id, name }: { id: string; name: string }) {
  const { isFavorite, toggle } = useFavorites();
  const on = isFavorite(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Bỏ yêu thích ${name}` : `Thêm ${name} vào yêu thích`}
      onClick={() => toggle(id)}
      className={`grid h-10 w-10 place-items-center rounded-full border text-xl ${
        on ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300 bg-white text-emerald-800'
      }`}
    >
      <span aria-hidden="true">{on ? '♥' : '♡'}</span>
    </button>
  );
}
