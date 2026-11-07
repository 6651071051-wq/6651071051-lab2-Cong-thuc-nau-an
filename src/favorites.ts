import { createContext, useContext } from 'react';

export interface FavoritesValue {
  ids: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesValue | null>(null);

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites phải nằm trong FavoritesProvider');
  return ctx;
}
