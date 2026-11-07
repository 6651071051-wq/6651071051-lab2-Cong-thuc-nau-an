import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { FavoritesContext } from '../favorites';

const KEY = 'recipe-favorites';

function load(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export default function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* localStorage đầy hoặc bị chặn: bỏ qua */
    }
  }, [ids]);

  const toggle = useCallback(
    (id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    [],
  );
  const value = useMemo(() => ({ ids, toggle, isFavorite: (id: string) => ids.includes(id) }), [ids, toggle]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
