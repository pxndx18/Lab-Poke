import { fetchFromApi } from './api';

export interface PokemonAbility {
  ability: { name: string };
}

export interface PokemonType {
  type: { name: string };
}

export interface PokemonSprites {
  [key: string]: string | null;
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  types: PokemonType[];
  weight: number;
}

export function fetchPokemon(nameOrId: string | number) {
  return fetchFromApi<PokemonResponse>('pokemon', nameOrId);
}
