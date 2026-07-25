import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CalculatorInput, EstimateResult } from "@/lib/pricing-engine/types";

export interface SavedEstimate {
  id: string;
  savedAt: string;
  estimate: EstimateResult;
  input: CalculatorInput;
}

interface SavedEstimatesState {
  saved: SavedEstimate[];
  addEstimate: (estimate: EstimateResult, input: CalculatorInput) => void;
  removeEstimate: (id: string) => void;
  clearAll: () => void;
}

export const useSavedEstimatesStore = create<SavedEstimatesState>()(
  persist(
    (set) => ({
      saved: [],
      addEstimate: (estimate, input) =>
        set((s) => ({
          saved: [
            {
              id: crypto.randomUUID(),
              savedAt: new Date().toISOString(),
              estimate,
              input,
            },
            ...s.saved,
          ].slice(0, 8),
        })),
      removeEstimate: (id) => set((s) => ({ saved: s.saved.filter((e) => e.id !== id) })),
      clearAll: () => set({ saved: [] }),
    }),
    { name: "dic-saved-estimates-v1" }
  )
);
