import type { PickEntry } from '../types/pokemon'

export const generateCsv = (picks: PickEntry[]): string => {
  const rows = picks.map((p) => `${p.id},${p.name},${p.choice}`);
  return ['id,name,choice', ...rows].join('\n');
}

export const downloadCsv = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
