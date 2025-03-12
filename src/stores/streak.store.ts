import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Practice = {
  id: string; // uuidv7
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
  updatePractice: (additionalDuration: number) => void;
  resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set) => ({
      streak: { count: 0, practices: [] },
      updateStreak: (practice) =>
        set(({ streak }) => ({
          streak: {
            count: streak.count + 1,
            practices: [...streak.practices, practice],
          },
        })),
      updatePractice: (additionalDuration) =>
        set(({ streak }) => {
          const practice = streak.practices[streak.practices.length - 1];
          const practices = streak.practices.filter(
            (p) => p.id !== practice.id
          );

          const updatedPractice: Practice = {
            ...practice,
            duration: practice.duration + additionalDuration,
          };

          return {
            streak: {
              ...streak,
              practices: [...practices, updatedPractice],
            },
          };
        }),
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
