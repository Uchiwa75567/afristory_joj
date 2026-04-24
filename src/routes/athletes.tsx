import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ATHLETES } from "@/data/mock";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: [
      { title: "Galerie des Athlètes — AfriStory JOJ" },
      {
        name: "description",
        content: "Découvrez les jeunes athlètes africains qualifiés pour les JOJ Dakar 2026.",
      },
      { property: "og:title", content: "Galerie des Athlètes — AfriStory JOJ" },
      { property: "og:description", content: "Chaque athlète, une histoire." },
    ],
  }),
  component: AthletesPage,
});

const FILTERS = ["Tous", "Hommes", "Femmes"] as const;

function AthletesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tous");
  const [country, setCountry] = useState<string>("Tous les pays");

  const countries = useMemo(
    () => ["Tous les pays", ...Array.from(new Set(ATHLETES.map((a) => a.country))).sort()],
    [],
  );

  const filtered = useMemo(() => {
    return ATHLETES.filter((a) => {
      if (filter === "Hommes" && a.gender !== "M") return false;
      if (filter === "Femmes" && a.gender !== "F") return false;
      if (country !== "Tous les pays" && a.country !== country) return false;
      if (
        query &&
        !`${a.name} ${a.discipline} ${a.country}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, filter, country]);

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-3">Salle 01 — Galerie</div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          Chaque athlète,
          <br />
          <span className="italic text-orange">une histoire.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Portraits, parcours et voix des jeunes talents qui défendront l'Afrique aux JOJ Dakar
          2026.
        </p>
      </section>

      <section className="container-museum">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un athlète, un pays, une discipline…"
              className="w-full bg-surface border border-border rounded-md pl-11 pr-4 py-3.5 text-cream text-sm placeholder:text-muted-foreground/60 focus:border-orange/60 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-surface border border-border rounded-md p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded text-xs transition-colors ${
                    filter === f
                      ? "bg-orange text-background"
                      : "text-muted-foreground hover:text-cream"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-surface border border-border rounded-md pl-9 pr-8 py-2.5 text-xs text-cream focus:outline-none focus:border-gold/60 appearance-none cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 text-sm text-muted-foreground flex items-center gap-2">
          <span className="text-cream font-medium">{filtered.length}</span>
          athlète{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </div>
      </section>

      <section className="container-museum py-10">
        {filtered.length === 0 ? (
          <div className="border border-border rounded-xl p-16 text-center bg-surface/50">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.4} />
            <h3 className="font-serif text-2xl text-cream">Aucun athlète trouvé</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Essayez un autre filtre ou un autre mot-clé.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((a, i) => (
              <Link
                key={a.id}
                to="/athletes/$id"
                params={{ id: a.id }}
                className="photo-card group animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover photo-card-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-background/70 backdrop-blur-md text-[0.65rem] uppercase tracking-widest text-cream border border-border flex items-center gap-1.5">
                    <span>{a.flag}</span> {a.countryCode}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl text-cream leading-tight">{a.name}</h3>
                    <div className="text-sm text-orange mt-1">{a.discipline}</div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/75">
                      {a.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-text-secondary backdrop-blur-md">
                        {a.story.length} chapitres
                      </span>
                      {a.documentaryVideoIds?.length ? (
                        <span className="rounded-full border border-green/30 bg-green/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-green backdrop-blur-md">
                          {a.documentaryVideoIds.length} documentaire
                          {a.documentaryVideoIds.length > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-text-muted backdrop-blur-md">
                          Histoire détaillée
                        </span>
                      )}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-cream/80 opacity-0 transition-opacity group-hover:opacity-100">
                      Ouvrir le dossier <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
