import { Box, LinearProgress, Typography } from '@mui/material'

type Props = {
  readonly current: number;
  readonly total: number;
}

export const ProgressBar = ({ current, total }: Props) => {
  const pct = (current / total) * 100;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Progress
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {current} / {total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.07)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: 'linear-gradient(90deg, #5b8ef0 0%, #c084fc 100%)',
          },
        }}
      />
    </Box>
  );
};
