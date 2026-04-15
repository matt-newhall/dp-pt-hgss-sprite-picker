import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPokemon } from '../services/pokeapi'
import { POKEMON_SEQUENCE } from '../constants/formes'

export const usePokemon = (idOrSlug: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['pokemon', idOrSlug],
    queryFn: () => fetchPokemon(idOrSlug),
    staleTime: Infinity,
  });

  const currentIndex = POKEMON_SEQUENCE.indexOf(idOrSlug);
  const nextSlug = POKEMON_SEQUENCE[currentIndex + 1];

  if (nextSlug !== undefined) {
    queryClient.prefetchQuery({
      queryKey: ['pokemon', nextSlug],
      queryFn: () => fetchPokemon(nextSlug),
      staleTime: Infinity,
    });
  }

  return query;
};
