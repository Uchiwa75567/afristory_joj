import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Globe, ChevronDown, ArrowRight, LogOut, Lock } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { AuthDialog } from "./auth/AuthDialog";
import { useAuth } from "./auth/AuthProvider";
import { LANGUAGE_LABELS, LANGUAGE_ORDER, LANGUAGE_SHORT_LABELS, useLanguage } from "./language/LanguageProvider";
import { COMMON_COPY } from "./language/siteContent";

const NAV = [
  { to: "/", key: "accueil" },
  { to: "/musee", key: "musee" },
  { to: "/athletes", key: "athletes" },
  { to: "/podcast", key: "podcast" },
  { to: "/histoire", key: "histoire" },
  { to: "/live", key: "live" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { hydrated, session, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isWolofLocked = (value: string) => value === "WO";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background shadow-[0_12px_35px_-28px_rgba(13,31,18,0.18)]">
        <div className="container-museum flex h-[76px] items-center justify-between gap-4">
          <BrandLogo size="sm" className="shrink-0" />

          <nav className="hidden items-center gap-1 rounded-full border border-border bg-bg-soft p-1.5 shadow-[0_18px_40px_-28px_rgba(13,31,18,0.14)] lg:flex">
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
                  {COMMON_COPY.nav[item.key][language]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-label={COMMON_COPY.header.chooseLanguage[language]}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs text-text-secondary transition-colors hover:border-green/50 hover:text-text"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="inline-flex items-center gap-1">
                  {LANGUAGE_SHORT_LABELS[language]}
                  {language === "WO" && <Lock className="h-3 w-3" aria-hidden="true" />}
                </span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  {LANGUAGE_ORDER.map((l) => (
                    <button
                      key={l}
                      type="button"
                      disabled={isWolofLocked(l)}
                      title={isWolofLocked(l) ? "Bientôt disponible" : undefined}
                      onClick={() => {
                        if (isWolofLocked(l)) return;
                        setLanguage(l);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                        isWolofLocked(l)
                          ? "cursor-not-allowed opacity-60"
                          : language === l
                            ? "bg-bg-tag text-green"
                            : "text-text-secondary hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      <span>{LANGUAGE_LABELS[l]}</span>
                      {isWolofLocked(l) && <Lock className="h-3.5 w-3.5" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hydrated && session ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden items-center gap-2 rounded-full border border-green/25 bg-bg-tag px-3.5 py-2 text-left transition-colors hover:border-green/45 md:inline-flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-green text-bg text-xs font-semibold">
                  {session.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                    {COMMON_COPY.header.connected[language]}
                  </span>
                  <span className="block text-sm font-medium text-text">{session.roleLabel}</span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden items-center rounded-full bg-gradient-green px-4 py-2 text-sm font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)] transition-opacity hover:opacity-95 md:inline-flex"
              >
                {COMMON_COPY.header.signIn[language]}
              </button>
            )}

            <button
              className="rounded-full border border-border bg-background p-2 text-text lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={COMMON_COPY.header.menu[language]}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-museum flex flex-col gap-2 py-4">
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                  {language === "EN" ? "Language" : "Langue"}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {LANGUAGE_ORDER.map((l) => (
                    <button
                      key={l}
                      type="button"
                      disabled={isWolofLocked(l)}
                      title={isWolofLocked(l) ? "Bientôt disponible" : undefined}
                      onClick={() => {
                        if (isWolofLocked(l)) return;
                        setLanguage(l);
                        setOpen(false);
                      }}
                      className={`rounded-xl border px-3 py-2 text-xs transition-colors ${
                        isWolofLocked(l)
                          ? "cursor-not-allowed border-border bg-background text-text-muted opacity-60"
                          : language === l
                            ? "border-green/40 bg-bg-tag text-green"
                            : "border-border bg-background text-text-secondary hover:border-green/30 hover:text-text"
                      }`}
                    >
                      <span className="inline-flex items-center justify-center gap-1">
                        {LANGUAGE_SHORT_LABELS[l]}
                        {isWolofLocked(l) && <Lock className="h-3 w-3" aria-hidden="true" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

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
                  {COMMON_COPY.nav[item.key][language]}
                  <ArrowRight className="h-4 w-4 text-green" />
                </Link>
              ))}

              {hydrated && session ? (
                <div className="mt-3 rounded-2xl border border-green/20 bg-bg-tag p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                    {language === "EN" ? "Active session" : "Session active"}
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
                      {language === "EN" ? "My space" : "Mon espace"}
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
                  {COMMON_COPY.header.signIn[language]}
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
