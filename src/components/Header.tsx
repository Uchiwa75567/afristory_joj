import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Globe, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";

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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/98 shadow-[0_12px_35px_-28px_rgba(13,31,18,0.28)]">
      <div className="container-museum h-[76px] flex items-center justify-between gap-4">
        <BrandLogo size="sm" className="shrink-0" />

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-surface/85 p-1 shadow-sm">
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
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-xs text-text-secondary hover:border-green/50 hover:text-text transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
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

          <button className="hidden md:inline-flex items-center rounded-full bg-gradient-green px-4 py-2 text-sm font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)] hover:opacity-95 transition-opacity">
            Se connecter
          </button>

          <button
            className="lg:hidden rounded-full border border-border bg-surface p-2 text-text"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/98">
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
            <button className="mt-3 inline-flex items-center justify-center rounded-2xl bg-gradient-green px-4 py-3 font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)]">
              Se connecter
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
