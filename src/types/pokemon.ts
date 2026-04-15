export type GameVersion = 'platinum' | 'hgss'

export type SpriteSet = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export type PokemonSprites = {
  platinum: SpriteSet;
  hgss: SpriteSet;
}

export type PokemonData = {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

export type PickEntry = {
  id: string;
  name: string;
  choice: GameVersion;
}
