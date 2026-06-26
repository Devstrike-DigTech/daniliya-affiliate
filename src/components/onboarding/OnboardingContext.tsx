"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { assessmentQuestions } from "@/lib/data";

export type Profile = { name: string; email: string; phone: string };

const DEFAULT_PROFILE: Profile = {
  name: "Kate Esther",
  email: "kateesther@gmail.com",
  phone: "08038438473",
};
const STORAGE_KEY = "daniliya-onboarding";

type State = {
  profile: Profile;
  role: string | null;
  answers: number[];
  qIndex: number;
  score: number;
  retakes: number;
};

const blankAnswers = () => Array(assessmentQuestions.length).fill(-1);

const DEFAULT_STATE: State = {
  profile: DEFAULT_PROFILE,
  role: null, // no pre-selection — the role screen forces an intentional choice
  answers: blankAnswers(),
  qIndex: 0,
  score: 50,
  retakes: 10,
};

type Ctx = State & {
  setProfile: (p: Profile) => void;
  setRole: (r: string) => void;
  setAnswers: (a: number[]) => void;
  setQIndex: (n: number) => void;
  setScore: (n: number) => void;
  setRetakes: (n: number) => void;
  resetAssessment: () => void;
  // derived
  firstName: string;
  code: string;
  payLink: string;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(DEFAULT_STATE);

  // hydrate from sessionStorage after mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<Ctx>(() => {
    const firstName = state.profile.name.trim().split(/\s+/)[0] || "there";
    const base =
      state.profile.name.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 4) ||
      "DANI";
    const code = `${base}-4IWS`;
    return {
      ...state,
      setProfile: (profile) => setState((s) => ({ ...s, profile })),
      setRole: (role) => setState((s) => ({ ...s, role })),
      setAnswers: (answers) => setState((s) => ({ ...s, answers })),
      setQIndex: (qIndex) => setState((s) => ({ ...s, qIndex })),
      setScore: (score) => setState((s) => ({ ...s, score })),
      setRetakes: (retakes) => setState((s) => ({ ...s, retakes })),
      resetAssessment: () =>
        setState((s) => ({ ...s, answers: blankAnswers(), qIndex: 0 })),
      firstName,
      code,
      payLink: `https://daniliya.com/products/the-daniliya-method?ref=${code}`,
    };
  }, [state]);

  return (
    <OnboardingCtx.Provider value={value}>{children}</OnboardingCtx.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx);
  if (!ctx)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
