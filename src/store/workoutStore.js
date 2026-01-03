import { create } from "zustand";

const STORAGE_KEY = "fitness_workouts";

export const useWorkoutStore = create((set, get) => ({
  workouts: [],
  
  init: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      set({ workouts: data });
    } catch {
      set({ workouts: [] });
    }
  },

  addWorkout: (workout) => {
    const next = [...get().workouts, workout];
    set({ workouts: next });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  setWorkouts: (list) => {
    set({ workouts: list });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },
 
  clearWorkouts: () => {
    set({ workouts: [] });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },
}));
