import type { Recipe } from '../api';
import FavoriteButton from './FavoriteButton';
import RecipeImage from './RecipeImage';

export default function RecipeCard({ recipe, onOpen }: { recipe: Recipe; onOpen: (r: Recipe) => void }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-lg">
      <button type="button" onClick={() => onOpen(recipe)} className="block w-full text-left">
        <div className="relative overflow-hidden">
          <RecipeImage src={recipe.image} name={recipe.name} className="aspect-[4/3] w-full transition duration-300 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-900">
            {recipe.region}
          </span>
        </div>
        <div className="p-4 pr-16">
          <h3 className="font-display text-xl leading-snug">{recipe.name}</h3>
          <p className="mt-2 text-sm text-stone-600">{recipe.time} phút · {recipe.difficulty}</p>
        </div>
      </button>
      <div className="absolute bottom-3 right-3">
        <FavoriteButton id={recipe.id} name={recipe.name} />
      </div>
    </article>
  );
}
