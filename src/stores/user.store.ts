import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Frequency = "daily" | "weekly" | "monthly";

export type User = {
  name?: string;
  habit: string;
  frequency: Frequency;
  createdAt: Date;
};

interface UserState {
  user: User;
  createUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: { name: "", habit: "", frequency: "daily", createdAt: new Date() },
      createUser: (user) => set(() => ({ user })),
      removeUser: () =>
        set(() => ({
          user: {
            name: "",
            habit: "",
            frequency: "daily",
            createdAt: new Date(),
          },
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
