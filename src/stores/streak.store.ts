import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Practice = {
  date: Date; // when was the practice
  duration: number; // how many hours
};

// Streak is something done over a period of time without a break
export type Streak = {
  count: number;
  practices: Practice[];
};

interface StreakState {
  streak: Streak;
  updateStreak: (practice: Practice) => void;
  resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set) => ({
      streak: { count: 0, practices: [] },
      updateStreak: (practice) =>
        set((state) => ({
          streak: {
            count: state.streak.count + 1,
            practices: [...state.streak.practices, practice],
          },
        })),
      resetStreak: () =>
        set((state) => ({
          streak: { ...state.streak, count: 0 },
        })),
    }),
    {
      name: "streak-storage",
    }
  )
);
