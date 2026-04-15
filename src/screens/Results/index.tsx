import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import ReplayIcon from '@mui/icons-material/Replay'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePicksStore } from '../../state/picks'
import { generateCsv, downloadCsv } from '../../utils/csv'
import type { GameVersion } from '../../types/pokemon'

const CHIP_COLOR: Record<GameVersion, 'primary' | 'warning'> = {
  platinum: 'primary',
  hgss: 'warning',
};

/**
 * End screen showing a summary of all picks with a CSV download and a restart option.
 */
export const ResultsScreen = () => {
  const { picks, reset } = usePicksStore();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const platCount = picks.filter((p) => p.choice === 'platinum').length;
  const hgssCount = picks.filter((p) => p.choice === 'hgss').length;

  const handleDownload = () => {
    downloadCsv(generateCsv(picks), 'sprite-picks.csv');
  };

  const handleReset = () => {
    reset();
    navigate({ to: '/pokemon/$id', params: { id: '1' } });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        p: { xs: 2, md: 5 },
        overflow: 'auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(135deg, #c8b464 0%, #c084fc 50%, #5b8ef0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2.4rem', md: '3.5rem' },
          }}
        >
          All done!
        </Typography>
        <Typography color="text.secondary">
          You rated {picks.length} Pokémon sprite{picks.length !== 1 ? 's' : ''}.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            minWidth: 160,
            background: 'linear-gradient(135deg, #0d1117, #1a1f35)',
            border: '1px solid rgba(200,180,100,0.25)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h3" sx={{ color: '#c8b464', fontWeight: 900 }}>
            {platCount}
          </Typography>
          <Typography
            sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.72rem', mt: 0.5 }}
          >
            Platinum
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            minWidth: 160,
            background: 'linear-gradient(135deg, #120808, #2a1010)',
            border: '1px solid rgba(212,144,58,0.25)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h3" sx={{ color: '#d4903a', fontWeight: 900 }}>
            {hgssCount}
          </Typography>
          <Typography
            sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.72rem', mt: 0.5 }}
          >
            HGSS
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ fontWeight: 700, px: 3 }}
        >
          Download CSV
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ReplayIcon />}
          onClick={handleReset}
          sx={{ px: 3 }}
        >
          Start Over
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxWidth: 680,
          width: '100%',
          maxHeight: 480,
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 2,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 60 }}>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Choice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {picks.map((pick) => (
              <TableRow key={pick.id} hover>
                <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                  {pick.id}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {pick.name.replace(/-/g, ' ')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={pick.choice === 'platinum' ? 'Platinum' : 'HGSS'}
                    color={CHIP_COLOR[pick.choice]}
                    size="small"
                    sx={{ fontWeight: 700, letterSpacing: 0.5, fontSize: '0.72rem' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
