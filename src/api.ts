import data from './data/recipes.json';

export interface Recipe {
  id: string;
  name: string;
  category: string;
  region: string;
  time: number;
  servings: number;
  difficulty: string;
  tips: string[];
  image: string;
  ingredients: string[];
  steps: string[];
}

const recipes: Recipe[] = data;
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Trì hoãn nhẹ để thấy skeleton loading khi demo
export async function fetchRecipes(): Promise<Recipe[]> {
  await sleep(700);
  return recipes;
}

export async function fetchRecipe(id: string): Promise<Recipe | null> {
  await sleep(400);
  return recipes.find((r) => r.id === id) ?? null;
}
