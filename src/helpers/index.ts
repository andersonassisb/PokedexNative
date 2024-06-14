import { Pokemon } from "../services/types";

export const isAlreadyBookmarked = (favorites: Pokemon[], id: number) => {
  return favorites.some(pokemon => pokemon.id === id);
};