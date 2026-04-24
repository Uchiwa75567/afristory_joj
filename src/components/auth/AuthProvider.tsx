/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AuthRole = "athlete" | "journalist" | "coach" | "admin";

export type AuthRoleOption = {
  value: AuthRole;
  label: string;
  description: string;
  recommendedPath: "/athletes" | "/archive" | "/live" | "/musee";
  accentClass: string;
};

export type AuthSession = {
  name: string;
  email: string;
  organization: string;
  role: AuthRole;
  roleLabel: string;
  roleDescription: string;
  preferredPath: AuthRoleOption["recommendedPath"];
  initials: string;
  signedInAt: string;
};

type LoginInput = {
  name: string;
  email: string;
  organization: string;
  role: AuthRole;
};

type AuthContextValue = {
  hydrated: boolean;
  session: AuthSession | null;
  login: (input: LoginInput) => void;
  logout: () => void;
};

const STORAGE_KEY = "afristory.auth.session";

export const ROLE_OPTIONS: AuthRoleOption[] = [
  {
    value: "athlete",
    label: "Athlète",
    description: "Accès au dossier personnel, aux interviews et aux contenus liés à la carrière.",
    recommendedPath: "/athletes",
    accentClass: "text-green",
  },
  {
    value: "journalist",
    label: "Journaliste",
    description: "Accès aux archives éditoriales, aux citations et aux ressources média.",
    recommendedPath: "/archive",
    accentClass: "text-gold",
  },
  {
    value: "coach",
    label: "Coach",
    description: "Accès aux profils, au suivi des performances et à la lecture live.",
    recommendedPath: "/live",
    accentClass: "text-on-dark",
  },
  {
    value: "admin",
    label: "Administrateur",
    description: "Pilotage du musée, modération et gestion des contenus stratégiques.",
    recommendedPath: "/musee",
    accentClass: "text-green",
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

function getRoleOption(role: AuthRole) {
  return ROLE_OPTIONS.find((option) => option.value === role) ?? ROLE_OPTIONS[0];
}

function buildInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function buildSession(input: LoginInput): AuthSession {
  const option = getRoleOption(input.role);

  return {
    name: input.name.trim(),
    email: input.email.trim(),
    organization: input.organization.trim(),
    role: input.role,
    roleLabel: option.label,
    roleDescription: option.description,
    preferredPath: option.recommendedPath,
    initials: buildInitials(input.name) || "AS",
    signedInAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSession(JSON.parse(stored) as AuthSession);
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
      if (session) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage failures in constrained environments.
    }
  }, [hydrated, session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      hydrated,
      session,
      login: (input) => setSession(buildSession(input)),
      logout: () => setSession(null),
    }),
    [hydrated, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function getAuthRoleOption(role: AuthRole) {
  return getRoleOption(role);
}
