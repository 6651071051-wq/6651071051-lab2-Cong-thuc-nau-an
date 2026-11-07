import { Link } from 'react-router-dom';
import { useFavorites } from '../favorites';

export default function Header() {
  const { ids } = useFavorites();
  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-xl sm:text-2xl">Sổ tay công thức</Link>
        <span className="rounded-full bg-emerald-900 px-3 py-1 text-sm" aria-live="polite">
          ♥ {ids.length} món đã lưu
        </span>
      </div>
    </header>
  );
}
