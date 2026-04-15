import { Box, Typography } from '@mui/material'
import { useState, useCallback } from 'react'
import type { SpriteSet, GameVersion } from '../../types/pokemon'
import { SpriteGrid } from '../SpriteGrid'

type Props = {
  readonly version: GameVersion;
  readonly sprites: SpriteSet;
  readonly onSelect: () => void;
  readonly disabled: boolean;
}

const LABEL: Record<GameVersion, string> = {
  platinum: 'Platinum',
  hgss: 'HeartGold / SoulSilver',
};

const THEME: Record<
  GameVersion,
  { gradient: string; hoverGradient: string; accent: string; glow: string }
> = {
  platinum: {
    gradient: 'linear-gradient(160deg, #0c1020 0%, #141930 50%, #0d2245 100%)',
    hoverGradient: 'linear-gradient(160deg, #111525 0%, #1a2040 50%, #112a55 100%)',
    accent: '#c8b464',
    glow: 'rgba(200, 180, 100, 0.25)',
  },
  hgss: {
    gradient: 'linear-gradient(160deg, #120808 0%, #2a1010 50%, #4a1010 100%)',
    hoverGradient: 'linear-gradient(160deg, #160a0a 0%, #321414 50%, #581414 100%)',
    accent: '#d4903a',
    glow: 'rgba(212, 144, 58, 0.25)',
  },
};

/**
 * Full-height clickable panel for one game version.
 * Flashes bright on click before calling onSelect.
 */
export const SpritePanel = ({ version, sprites, onSelect, disabled }: Props) => {
  const [flashing, setFlashing] = useState(false);
  const t = THEME[version];

  const handleClick = useCallback(() => {
    if (disabled || flashing) return;
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      onSelect();
    }, 380);
  }, [disabled, flashing, onSelect]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: { xs: 2, md: 5 },
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: t.gradient,
        border: '2px solid transparent',
        borderRadius: 3,
        transition: 'border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease',
        userSelect: 'none',
        '&:hover': !disabled
          ? {
              background: t.hoverGradient,
              borderColor: t.accent,
              transform: 'scale(1.015)',
              boxShadow: `0 0 40px ${t.glow}`,
            }
          : {},
        ...(flashing && {
          animation: 'panelSelect 0.38s ease-out forwards',
        }),
        '@keyframes panelSelect': {
          '0%': { filter: 'brightness(1) saturate(1)', transform: 'scale(1)' },
          '20%': { filter: 'brightness(3.5) saturate(2.5)', transform: 'scale(1.05)' },
          '55%': { filter: 'brightness(1.4) saturate(1.6)', transform: 'scale(1.02)' },
          '100%': { filter: 'brightness(1) saturate(1)', transform: 'scale(1)' },
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: t.accent,
          fontWeight: 800,
          letterSpacing: 3,
          textTransform: 'uppercase',
          textShadow: `0 0 28px ${t.glow}`,
          textAlign: 'center',
          fontSize: { xs: '0.95rem', md: '1.35rem' },
        }}
      >
        {LABEL[version]}
      </Typography>

      <SpriteGrid sprites={sprites} />
    </Box>
  );
};
