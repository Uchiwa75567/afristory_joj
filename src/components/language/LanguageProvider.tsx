/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppLanguage = "FR" | "EN" | "WO";

export const LANGUAGE_ORDER: AppLanguage[] = ["FR", "EN", "WO"];

export const LANGUAGE_LABELS: Record<AppLanguage, string> = {
  FR: "Français",
  EN: "English",
  WO: "Wolof",
};

export const LANGUAGE_SHORT_LABELS: Record<AppLanguage, string> = {
  FR: "FR",
  EN: "EN",
  WO: "WO",
};

export const LANGUAGE_HTML_LANG: Record<AppLanguage, string> = {
  FR: "fr",
  EN: "en",
  WO: "wo",
};

export const LANGUAGE_SPEECH_LANG: Record<AppLanguage, string> = {
  FR: "fr-FR",
  EN: "en-US",
  WO: "wo-SN",
};

type LanguageContextValue = {
  hydrated: boolean;
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

const STORAGE_KEY = "afristory.language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isAppLanguage(value: string): value is AppLanguage {
  return LANGUAGE_ORDER.includes(value as AppLanguage);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>("FR");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && isAppLanguage(stored)) {
        setLanguage(stored);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage failures in constrained environments.
    }

    document.documentElement.lang = LANGUAGE_HTML_LANG[language];
  }, [hydrated, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      hydrated,
      language,
      setLanguage,
    }),
    [hydrated, language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
