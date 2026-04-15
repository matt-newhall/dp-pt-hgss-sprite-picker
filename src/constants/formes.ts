export const BASE_COUNT = 493

export const ALTERNATE_FORMES: readonly string[] = [
  'deoxys-attack',
  'deoxys-defense',
  'deoxys-speed',
  'wormadam-sandy',
  'wormadam-trash',
  'rotom-heat',
  'rotom-wash',
  'rotom-frost',
  'rotom-fan',
  'rotom-mow',
  'giratina-origin',
  'shaymin-sky',
]

export const POKEMON_SEQUENCE: readonly string[] = [
  ...Array.from({ length: BASE_COUNT }, (_, i) => String(i + 1)),
  ...ALTERNATE_FORMES,
]

export const TOTAL_COUNT = POKEMON_SEQUENCE.length
