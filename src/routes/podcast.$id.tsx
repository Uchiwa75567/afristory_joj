import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Share2, Download } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PODCASTS } from "@/data/mock";

export const Route = createFileRoute("/podcast/$id")({
  loader: ({ params }) => {
    const ep = PODCASTS.find((p) => p.id === params.id);
    if (!ep) throw notFound();
    return ep;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Podcast AfriStory JOJ` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-museum py-32 text-center">
        <h1 className="font-serif text-5xl text-cream">Épisode introuvable</h1>
        <Link to="/podcast" className="mt-6 inline-block text-orange">
          ← Retour au podcast
        </Link>
      </div>
    </PageShell>
  ),
  component: EpisodePage,
});

function EpisodePage() {
  const ep = Route.useLoaderData();
  const [playing, setPlaying] = useState(false);

  return (
    <PageShell>
      <section className="container-museum pt-8 pb-20">
        <Link
          to="/podcast"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cream mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tous les épisodes
        </Link>

        <div className="grid md:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div className="aspect-square rounded-xl overflow-hidden border border-border">
            <img src={ep.cover} alt={ep.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-widest text-orange mb-3">
              Épisode {ep.number} · {ep.category} · {ep.duration}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-cream leading-[1.02] tracking-tight">
              {ep.title}
            </h1>
            <p className="text-gold-2 italic font-serif text-xl mt-3">{ep.athleteName}</p>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">{ep.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-orange text-background text-sm font-medium hover:scale-[1.02] transition-transform"
              >
                <Play className="w-4 h-4" fill="currentColor" />{" "}
                {playing ? "En écoute…" : "Lancer l'épisode"}
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface text-cream hover:border-orange/50 text-sm transition-colors">
                <Share2 className="w-4 h-4" /> Partager
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface text-cream hover:border-orange/50 text-sm transition-colors">
                <Download className="w-4 h-4" /> Télécharger
              </button>
            </div>

            <div className="mt-12 bg-surface border border-border rounded-xl p-6">
              <h2 className="font-serif text-2xl text-cream mb-3">Transcription</h2>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                « Quand j'ai commencé à courir, je n'avais pas de chaussures. Mais j'avais cette
                envie, cette voix intérieure qui me disait : continue. Aujourd'hui, je vais
                représenter mon pays aux JOJ de Dakar… »
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                La transcription complète sera disponible prochainement. En attendant, plongez dans
                l'épisode et laissez-vous porter par la voix de notre invité·e.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
