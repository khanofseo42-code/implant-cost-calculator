import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CalculatorInput,
  EstimateResult,
  ExtraProceduresInput,
  FinanceInput,
  ImplantDetailsInput,
  InsuranceInput,
  LocationInput,
  PatientInput,
  TreatmentInput,
} from "@/lib/pricing-engine/types";
import { calculateEstimate } from "@/lib/pricing-engine/engine";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

export const TOTAL_STEPS = 7;

export interface CalculatorState {
  currentStep: number;
  location: Partial<LocationInput>;
  patient: Partial<PatientInput>;
  treatment: Partial<TreatmentInput>;
  implant: Partial<ImplantDetailsInput>;
  extras: ExtraProceduresInput;
  insurance: InsuranceInput;
  finance: FinanceInput;
  completedSteps: number[];
  estimate: EstimateResult | null;
  lastSavedAt: string | null;
  history: Partial<CalculatorState>[];

  setLocation: (v: Partial<LocationInput>) => void;
  setPatient: (v: Partial<PatientInput>) => void;
  setTreatment: (v: Partial<TreatmentInput>) => void;
  setImplant: (v: Partial<ImplantDetailsInput>) => void;
  setExtras: (v: ExtraProceduresInput) => void;
  setInsurance: (v: Partial<InsuranceInput>) => void;
  setFinance: (v: Partial<FinanceInput>) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: number) => void;
  runCalculation: () => EstimateResult;
  undo: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  location: {} as Partial<LocationInput>,
  patient: {
    smoking: false,
    diabetes: "none",
    boneCondition: "healthy",
    missingTeethUpper: 0,
    missingTeethLower: 0,
  } as Partial<PatientInput>,
  treatment: {} as Partial<TreatmentInput>,
  implant: {} as Partial<ImplantDetailsInput>,
  extras: { procedureIds: [] } as ExtraProceduresInput,
  insurance: { hasInsurance: false } as InsuranceInput,
  finance: { paymentMethod: "cash" } as FinanceInput,
  completedSteps: [] as number[],
  estimate: null as EstimateResult | null,
  lastSavedAt: null as string | null,
  history: [] as Partial<CalculatorState>[],
};

function snapshot(state: CalculatorState): Partial<CalculatorState> {
  return {
    location: state.location,
    patient: state.patient,
    treatment: state.treatment,
    implant: state.implant,
    extras: state.extras,
    insurance: state.insurance,
    finance: state.finance,
  };
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLocation: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          location: { ...s.location, ...v },
          lastSavedAt: new Date().toISOString(),
        })),
      setPatient: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          patient: { ...s.patient, ...v },
          lastSavedAt: new Date().toISOString(),
        })),
      setTreatment: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          treatment: { ...s.treatment, ...v },
          lastSavedAt: new Date().toISOString(),
        })),
      setImplant: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          implant: { ...s.implant, ...v },
          lastSavedAt: new Date().toISOString(),
        })),
      setExtras: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          extras: v,
          lastSavedAt: new Date().toISOString(),
        })),
      setInsurance: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          insurance: { ...s.insurance, ...v },
          lastSavedAt: new Date().toISOString(),
        })),
      setFinance: (v) =>
        set((s) => ({
          history: [...s.history.slice(-19), snapshot(s)],
          finance: { ...s.finance, ...v },
          lastSavedAt: new Date().toISOString(),
        })),

      goToStep: (step) => set({ currentStep: Math.max(0, Math.min(TOTAL_STEPS - 1, step)) }),
      nextStep: () =>
        set((s) => ({ currentStep: Math.min(TOTAL_STEPS - 1, s.currentStep + 1) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
      markStepComplete: (step) =>
        set((s) => ({
          completedSteps: s.completedSteps.includes(step)
            ? s.completedSteps
            : [...s.completedSteps, step],
        })),

      runCalculation: () => {
        const s = get();
        const config = loadPricingConfig();
        const input: CalculatorInput = {
          location: s.location as LocationInput,
          patient: s.patient as PatientInput,
          treatment: s.treatment as TreatmentInput,
          implant: s.implant as ImplantDetailsInput,
          extras: s.extras,
          insurance: s.insurance,
          finance: s.finance,
        };
        const result = calculateEstimate(input, config);
        set({ estimate: result });
        return result;
      },

      undo: () => {
        const s = get();
        const prev = s.history[s.history.length - 1];
        if (!prev) return;
        set({ ...prev, history: s.history.slice(0, -1) });
      },

      reset: () => set({ ...initialState, history: [] }),
    }),
    {
      name: "dic-calculator-v1",
      partialize: (s) => ({
        currentStep: s.currentStep,
        location: s.location,
        patient: s.patient,
        treatment: s.treatment,
        implant: s.implant,
        extras: s.extras,
        insurance: s.insurance,
        finance: s.finance,
        completedSteps: s.completedSteps,
        estimate: s.estimate,
        lastSavedAt: s.lastSavedAt,
      }),
    }
  )
);
