import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useCallback } from 'react'
import { SpritePanel } from '../../components/SpritePanel'
import { ProgressBar } from '../../components/ProgressBar'
import { usePokemon } from '../../hooks/usePokemon.hook'
import { usePicksStore } from '../../state/picks'
import { POKEMON_SEQUENCE, TOTAL_COUNT } from '../../constants/formes'
import type { GameVersion } from '../../types/pokemon'

export const PokemonPickerScreen = () => {
  const { id } = useParams({ from: '/pokemon/$id' });
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemon(id);
  const addPick = usePicksStore((s) => s.addPick);
  const reset = usePicksStore((s) => s.reset);

  const handleReset = useCallback(() => {
    reset();
    navigate({ to: '/pokemon/$id', params: { id: '1' } });
  }, [reset, navigate]);

  const currentIndex = POKEMON_SEQUENCE.indexOf(id);
  const isLast = currentIndex === POKEMON_SEQUENCE.length - 1;

  const handleSelect = useCallback(
    (choice: GameVersion) => {
      if (!data) return;
      addPick({ id, name: data.name, choice });
      if (isLast) {
        navigate({ to: '/results' });
      } else {
        navigate({
          to: '/pokemon/$id',
          params: { id: POKEMON_SEQUENCE[currentIndex + 1] as string },
        });
      }
    },
    [data, id, currentIndex, isLast, addPick, navigate]
  );

  if (isLoading) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">Failed to load Pokémon #{id}</Typography>
      </Box>
    );
  }

  const displayName = data.name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: { xs: 2, md: 4 },
        minHeight: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <ProgressBar current={currentIndex + 1} total={TOTAL_COUNT} />
        </Box>
        <Tooltip title="Reset to start" placement="left">
          <IconButton
            size="small"
            onClick={handleReset}
            sx={{ color: 'text.disabled', flexShrink: 0, '&:hover': { color: 'error.main' } }}
          >
            <ReplayIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ textAlign: 'center', py: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.disabled', letterSpacing: 3, fontSize: '0.7rem' }}
        >
          #{String(data.id).padStart(3, '0')}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: 'text.primary', mt: 0.25, lineHeight: 1.1 }}
        >
          {displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Click a side to pick your preferred sprite
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          minHeight: 0,
        }}
      >
        <SpritePanel
          version="platinum"
          sprites={data.sprites.platinum}
          onSelect={() => handleSelect('platinum')}
          disabled={false}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            px: { xs: 0, md: 1 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 900,
              color: 'text.disabled',
              letterSpacing: 2,
            }}
          >
            VS
          </Typography>
        </Box>

        <SpritePanel
          version="hgss"
          sprites={data.sprites.hgss}
          onSelect={() => handleSelect('hgss')}
          disabled={false}
        />
      </Box>
    </Box>
  );
};
