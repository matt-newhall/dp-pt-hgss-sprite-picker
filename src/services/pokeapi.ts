import type { PokemonData, SpriteSet } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

type RawSpriteBlock = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
} | null | undefined;

const toSpriteSet = (raw: RawSpriteBlock): SpriteSet => {
  return {
    front_default: raw?.front_default ?? null,
    front_shiny: raw?.front_shiny ?? null,
    back_default: raw?.back_default ?? null,
    back_shiny: raw?.back_shiny ?? null,
  }
}

export const fetchPokemon = async (idOrSlug: string): Promise<PokemonData> => {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrSlug}`)
  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${idOrSlug} (${res.status})`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await res.json()
  const genIV = data?.sprites?.versions?.['generation-iv']

  return {
    id: data.id as number,
    name: data.name as string,
    sprites: {
      platinum: toSpriteSet(genIV?.platinum),
      hgss: toSpriteSet(genIV?.['heartgold-soulsilver']),
    },
  }
}
