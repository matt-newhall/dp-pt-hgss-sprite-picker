import { Box, Typography } from '@mui/material'
import type { SpriteSet } from '../../types/pokemon'

type Props = {
  readonly sprites: SpriteSet;
}

const SPRITE_SIZE = 96;

const ENTRIES = [
  { key: 'front_default' as const, caption: 'Front', shiny: false },
  { key: 'front_shiny' as const, caption: 'Front', shiny: true },
  { key: 'back_default' as const, caption: 'Back', shiny: false },
  { key: 'back_shiny' as const, caption: 'Back', shiny: true },
];

/**
 * 2×2 grid showing front/back × normal/shiny sprites for one game version.
 */
export const SpriteGrid = ({ sprites }: Props) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      {ENTRIES.map(({ key, caption, shiny }) => {
        const src = sprites[key];
        return (
          <Box
            key={key}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}
          >
            {src ? (
              <Box
                component="img"
                src={src}
                alt={`${caption}${shiny ? ' shiny' : ''}`}
                sx={{
                  width: SPRITE_SIZE,
                  height: SPRITE_SIZE,
                  imageRendering: 'pixelated',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: SPRITE_SIZE,
                  height: SPRITE_SIZE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderRadius: 1,
                  border: '1px dashed rgba(255,255,255,0.12)',
                }}
              >
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>
                  N/A
                </Typography>
              </Box>
            )}
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.7rem',
                color: shiny ? '#f0c040' : 'text.secondary',
                letterSpacing: shiny ? 0.5 : 0,
              }}
            >
              {caption}
              {shiny ? ' ✦' : ''}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
