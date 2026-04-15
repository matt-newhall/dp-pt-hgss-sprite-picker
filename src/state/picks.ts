import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PickEntry } from '../types/pokemon'

type PicksState = {
  picks: PickEntry[];
  addPick: (entry: PickEntry) => void;
  reset: () => void;
}

export const usePicksStore = create<PicksState>()(
  persist(
    (set) => ({
      picks: [],

      addPick: (entry) =>
        set((state) => {
          const idx = state.picks.findIndex((p) => p.id === entry.id);
          if (idx >= 0) {
            const next = [...state.picks];
            next[idx] = entry;
            return { picks: next };
          }
          return { picks: [...state.picks, entry] };
        }),

      reset: () => set({ picks: [] }),
    }),
    { name: 'sprite-picks' }
  )
)
