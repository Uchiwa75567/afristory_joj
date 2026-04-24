import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Globe, ChevronDown, ArrowRight, LogOut } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { AuthDialog } from "./auth/AuthDialog";
import { useAuth } from "./auth/AuthProvider";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/musee", label: "Le Musée" },
  { to: "/athletes", label: "Athlètes" },
  { to: "/podcast", label: "Podcast" },
  { to: "/histoire", label: "Histoire" },
  { to: "/live", label: "Live JOJ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN" | "WO">("FR");
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { hydrated, session, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/30 bg-background/70 shadow-[0_12px_35px_-28px_rgba(13,31,18,0.28)] backdrop-blur-2xl">
        <div className="container-museum h-[76px] flex items-center justify-between gap-4">
          <BrandLogo size="sm" className="shrink-0" />

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/35 bg-background/55 p-1.5 shadow-[0_18px_40px_-28px_rgba(13,31,18,0.18)] backdrop-blur-xl">
            {NAV.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-background text-text shadow-sm"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-full border border-white/35 bg-background/60 px-3.5 py-2 text-xs text-text-secondary backdrop-blur-xl hover:border-green/50 hover:text-text transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-white/30 bg-background/95 shadow-lg backdrop-blur-xl">
                  {(["FR", "EN", "WO"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        lang === l
                          ? "bg-bg-tag text-green"
                          : "text-text-secondary hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      {l === "FR" ? "Français" : l === "EN" ? "English" : "Wolof"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hydrated && session ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-green/25 bg-bg-tag/95 px-3.5 py-2 text-left transition-colors hover:border-green/45"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-green text-bg text-xs font-semibold">
                  {session.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                    Connecté
                  </span>
                  <span className="block text-sm font-medium text-text">{session.roleLabel}</span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden md:inline-flex items-center rounded-full bg-gradient-green px-4 py-2 text-sm font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)] hover:opacity-95 transition-opacity"
              >
                Se connecter
              </button>
            )}

            <button
              className="lg:hidden rounded-full border border-white/35 bg-background/60 p-2 text-text backdrop-blur-xl"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/25 bg-background/90 backdrop-blur-2xl">
            <div className="container-museum py-4 flex flex-col gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-base transition-colors ${
                    location.pathname === item.to ||
                    (item.to !== "/" && location.pathname.startsWith(item.to))
                      ? "border-green/40 bg-bg-tag text-text"
                      : "border-border bg-surface text-text-secondary hover:border-green/30 hover:text-text"
                  }`}
                >
                  {item.label}
                  <ArrowRight className="w-4 h-4 text-green" />
                </Link>
              ))}
              {hydrated && session ? (
                <div className="mt-3 rounded-2xl border border-green/20 bg-bg-tag p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                    Session active
                  </div>
                  <div className="mt-1 font-serif text-xl text-text">{session.name}</div>
                  <p className="mt-1 text-sm text-text-secondary">{session.roleLabel}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setOpen(false);
                        setAuthOpen(true);
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-green px-4 py-3 font-medium text-bg"
                    >
                      Mon espace
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-4 py-3 text-text-secondary"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    setAuthOpen(true);
                  }}
                  className="mt-3 inline-flex items-center justify-center rounded-2xl bg-gradient-green px-4 py-3 font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)]"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
