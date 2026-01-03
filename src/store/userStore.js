
import { create } from "zustand";

export const useUserStore = create((set) => ({
  name: "",
  tagline: "",
  goals: [{ text: "", progress: 0, target: 1 }],
  setName: (name) => set({ name }),
  setTagline: (tagline) => set({ tagline }),
  setGoals: (goals) => set({ goals }),
  setUser: (user) => set(user),
}));
