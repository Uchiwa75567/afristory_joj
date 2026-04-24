import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe2, Sparkles } from "lucide-react";
import { useMemo, useRef } from "react";
import { PageShell } from "@/components/PageShell";
import { JOJ_TIMELINE } from "@/data/mock";

export const Route = createFileRoute("/histoire")({
  head: () => ({
    meta: [
      { title: "Chronologie des JOJ — AfriStory JOJ" },
      {
        name: "description",
        content:
          "De Singapour à Dakar 2026 : l'histoire des Jeux Olympiques de la Jeunesse en version horizontale et immersive.",
      },
      { property: "og:title", content: "Chronologie des JOJ" },
      {
        property: "og:description",
        content: "Une frise futuriste pour traverser les grandes éditions des JOJ.",
      },
    ],
  }),
  component: HistoirePage,
});

function parseYear(year: string | undefined) {
  const parsed = Number.parseInt(year ?? "0", 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function HistoirePage() {
  const railRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const firstYear = parseYear(JOJ_TIMELINE[0]?.year);
    const lastYear = parseYear(JOJ_TIMELINE[JOJ_TIMELINE.length - 1]?.year);
    const cityCount = new Set(JOJ_TIMELINE.map((item) => item.city)).size;

    return {
      firstYear,
      lastYear,
      cityCount,
      span: lastYear - firstYear,
    };
  }, []);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.82, 360),
      behavior: "smooth",
    });
  };

  return (
    <PageShell>
      <section className="container-museum pt-16 pb-10 md:pt-24">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="eyebrow mb-3">Salle 02 - Histoire</div>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-cream md:text-7xl">
              Chronologie des
              <br />
              <span className="italic text-orange">Jeux Olympiques de la Jeunesse.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Une frise horizontale et futuriste pour traverser les grandes éditions des JOJ, de
              leur naissance à la première édition africaine à Dakar.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs uppercase tracking-[0.22em] text-text-secondary">
                <Globe2 className="h-3.5 w-3.5 text-green" />
                {JOJ_TIMELINE.length} chapitres
              </span>
              <span className="rounded-full border border-border bg-surface px-3.5 py-2 text-xs uppercase tracking-[0.22em] text-text-secondary">
                {stats.firstYear} → {stats.lastYear}
              </span>
              <span className="rounded-full border border-border bg-surface px-3.5 py-2 text-xs uppercase tracking-[0.22em] text-text-secondary">
                Dakar 2026
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-[0_25px_70px_-50px_rgba(13,31,18,0.35)]">
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
              <Sparkles className="h-3.5 w-3.5" />
              Chronologie interactive
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                  Éditions
                </div>
                <div className="mt-2 font-serif text-3xl text-text">{JOJ_TIMELINE.length}</div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                  Villes
                </div>
                <div className="mt-2 font-serif text-3xl text-text">{stats.cityCount}</div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                  Période
                </div>
                <div className="mt-2 font-serif text-3xl text-text">{stats.span} ans</div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              Glissez horizontalement ou utilisez les flèches pour remonter les étapes majeures des
              JOJ, de la première édition à la promesse tenue de Dakar 2026.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-green/50 hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-green/50 hover:text-text"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-border bg-bg-tag px-3.5 py-2 text-xs uppercase tracking-[0.22em] text-text-secondary">
            <Sparkles className="h-3.5 w-3.5 text-green" />
            Glisser horizontalement
          </div>
        </div>
      </section>

      <section className="container-museum pb-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/60 p-4 shadow-[0_30px_90px_-60px_rgba(13,31,18,0.45)] md:p-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

          <div
            ref={railRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 pt-2 md:gap-6"
          >
            {JOJ_TIMELINE.map((event, index) => (
              <Link
                key={event.id}
                to="/histoire/$id"
                params={{ id: event.id }}
                className="group relative w-[min(84vw,440px)] shrink-0 snap-center rounded-[1.75rem] border border-border bg-background p-6 shadow-[0_25px_65px_-40px_rgba(13,31,18,0.28)] transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green/30 to-transparent" />

                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-[0.28em] text-green">
                    Chapitre {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-bg-tag px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary">
                    {event.city}
                  </span>
                </div>

                <div className="flex items-end gap-4">
                  <div className="font-serif text-6xl leading-none text-text md:text-7xl">
                    {event.year}
                  </div>
                  <div className="mb-2 h-2.5 w-2.5 rounded-full bg-green shadow-[0_0_0_8px_rgba(29,191,96,0.12)]" />
                </div>

                <h3 className="mt-8 font-serif text-2xl leading-tight text-text md:text-3xl">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {event.description}
                </p>

                <div className="mt-5 rounded-2xl border border-border bg-bg-tag/70 p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                    Ce que ça change
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {event.takeaway}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                    Ouvrir le chapitre
                  </span>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-tag text-green transition-transform group-hover:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-museum pb-24">
        <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
          <p className="font-serif text-2xl italic leading-snug text-text md:text-3xl">
            "Les JOJ racontent la jeunesse avant les médailles."
          </p>
          <footer className="mt-4 text-sm text-text-secondary">
            - Esprit fondateur du mouvement olympique de la jeunesse
          </footer>
        </div>
      </section>
    </PageShell>
  );
}
