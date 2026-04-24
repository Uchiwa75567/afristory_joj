import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe2, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { PageShell } from "@/components/PageShell";
import { JOJ_TIMELINE, type JojMilestone } from "@/data/mock";

export const Route = createFileRoute("/histoire/$id")({
  loader: ({ params }) => {
    const milestone = JOJ_TIMELINE.find((item) => item.id === params.id);
    if (!milestone) throw notFound();
    return milestone;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.year} - ${loaderData.title} | AfriStory JOJ` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-museum py-32 text-center">
        <h1 className="font-serif text-5xl text-cream">Chapitre introuvable</h1>
        <Link to="/histoire" className="mt-6 inline-block text-orange">
          ← Retour à la chronologie
        </Link>
      </div>
    </PageShell>
  ),
  component: HistoireDetailPage,
});

function HistoireDetailPage() {
  const milestone = Route.useLoaderData();

  const ordered = useMemo(() => JOJ_TIMELINE, []);
  const index = ordered.findIndex((item) => item.id === milestone.id);
  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];

  const detailParagraphs = useMemo(
    () => [milestone.description, milestone.detail, milestone.takeaway],
    [milestone],
  );

  return (
    <PageShell>
      <section className="container-museum pt-8 pb-20">
        <Link
          to="/histoire"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la chronologie
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-dark text-on-dark shadow-[0_35px_90px_-60px_rgba(13,31,18,0.52)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,191,96,0.2),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(246,166,35,0.16),_transparent_28%),linear-gradient(160deg,rgba(13,31,18,0.96),rgba(20,43,26,0.88))]" />

            <div className="relative flex min-h-[620px] flex-col justify-between p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-green" />
                  Chapitre {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-green backdrop-blur-md">
                  <Globe2 className="h-3.5 w-3.5" />
                  {milestone.city}
                </span>
              </div>

              <div className="max-w-3xl">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
                  Chronologie JOJ
                </div>
                <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-on-dark md:text-7xl">
                  {milestone.year}
                  <br />
                  <span className="italic text-gold">{milestone.title}</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
                  {milestone.description}
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-dark-surface/88 p-5 backdrop-blur-xl">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
                  Ce chapitre change la suite
                </div>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                  {milestone.takeaway}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_30px_90px_-65px_rgba(13,31,18,0.42)] md:p-8">
              <div className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
                <Sparkles className="h-3.5 w-3.5" /> Fiche du chapitre
              </div>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-text md:text-5xl">
                {milestone.city}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
                {milestone.takeaway}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Année
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{milestone.year}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Ville
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{milestone.city}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 sm:col-span-2">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Chapitre
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{milestone.title}</div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-bg-tag/80 p-6 md:p-7">
              <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                Résumé éditorial
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Les JOJ prennent ici une forme lisible et continue, de leur naissance à leur
                première édition africaine. Chaque chapitre annonce la suivante.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-border bg-surface p-6 md:p-8 shadow-[0_30px_90px_-65px_rgba(13,31,18,0.4)]">
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
              <Sparkles className="h-3.5 w-3.5" /> Chapitre détaillé
            </div>
            <h2 className="mt-3 font-serif text-3xl text-text">Le récit de ce moment</h2>

            <div className="mt-6 space-y-5">
              {detailParagraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${milestone.id}-paragraph-${paragraphIndex}`}
                  className="rounded-2xl border border-border bg-background p-5 text-sm leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-surface p-6 md:p-7">
              <h3 className="font-serif text-2xl text-text">Repères visuels</h3>
              <ul className="mt-5 space-y-2.5">
                <li className="rounded-2xl border border-border bg-background p-4 text-sm text-text-secondary">
                  {milestone.description}
                </li>
                <li className="rounded-2xl border border-border bg-background p-4 text-sm text-text-secondary">
                  {milestone.detail}
                </li>
                <li className="rounded-2xl border border-border bg-background p-4 text-sm text-text-secondary">
                  {milestone.takeaway}
                </li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/histoire/$id"
                params={{ id: prev.id }}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-border bg-surface p-4 transition-colors hover:border-green/30 md:flex-col md:items-start"
              >
                <div className="min-w-0 flex-1 md:w-full">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                    <ArrowLeft className="mr-1 inline-block h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    Précédent
                  </div>
                  <div className="truncate font-serif text-lg text-text group-hover:text-green">
                    {prev.year} - {prev.city}
                  </div>
                </div>
              </Link>

              <Link
                to="/histoire/$id"
                params={{ id: next.id }}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-border bg-surface p-4 transition-colors hover:border-green/30 md:flex-col md:items-end md:text-right"
              >
                <div className="min-w-0 flex-1 md:w-full">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                    Suivant
                    <ArrowRight className="ml-1 inline-block h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="truncate font-serif text-lg text-text group-hover:text-green">
                    {next.year} - {next.city}
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
