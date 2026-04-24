import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Share2, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import {
  LANGUAGE_LABELS,
  type AppLanguage,
  useLanguage,
} from "@/components/language/LanguageProvider";
import { PAGE_COPY, localizePodcast, translatePodcastCategory } from "@/components/language/siteContent";
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
  notFoundComponent: PodcastNotFound,
  component: EpisodePage,
});

function PodcastNotFound() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.podcastDetail;

  return (
    <PageShell>
      <div className="container-museum py-32 text-center">
        <h1 className="font-serif text-5xl text-cream">
          {language === "EN" ? "Episode not found" : "Épisode introuvable"}
        </h1>
        <Link to="/podcast" className="mt-6 inline-block text-orange">
          ← {copy.back[language]}
        </Link>
      </div>
    </PageShell>
  );
}

type TranscriptCopy = {
  title: string;
  highlight: string;
  note: string;
  badge: string;
};

function buildTranscriptCopy(language: AppLanguage): TranscriptCopy {
  if (language === "EN") {
    return {
      title: "Transcript",
      highlight:
        '"When I started running, I did not have shoes. But I had that inner voice telling me: keep going. Today, I will represent my country at the Dakar YOG..."',
      note: "The full transcript will be available soon. In the meantime, dive into the episode and let our guest's voice carry you.",
      badge: "EN",
    };
  }

  if (language === "WO") {
    return {
      title: "Transcription",
      highlight: "Version wolof en préparation.",
      note: "La transcription complète n'est pas encore disponible dans cette langue. Passe en FR ou EN pour la lire maintenant.",
      badge: "WO",
    };
  }

  return {
    title: "Transcription",
    highlight:
      "« Quand j'ai commencé à courir, je n'avais pas de chaussures. Mais j'avais cette envie, cette voix intérieure qui me disait : continue. Aujourd'hui, je vais représenter mon pays aux JOJ de Dakar… »",
    note: "La transcription complète sera disponible prochainement. En attendant, plongez dans l'épisode et laissez-vous porter par la voix de notre invité·e.",
    badge: "FR",
  };
}

function EpisodePage() {
  const ep = Route.useLoaderData();
  const { language } = useLanguage();
  const copy = PAGE_COPY.podcastDetail;
  const localizedEpisode = useMemo(() => localizePodcast(ep, language), [ep, language]);
  const [playing, setPlaying] = useState(false);
  const transcript = buildTranscriptCopy(language);

  return (
    <PageShell>
      <section className="container-museum pt-8 pb-20">
        <Link
          to="/podcast"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cream mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {copy.back[language]}
        </Link>

        <div className="grid md:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <div className="aspect-square rounded-xl overflow-hidden border border-border">
            <img src={ep.cover} alt={localizedEpisode.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-widest text-orange mb-3">
              {language === "EN" ? "Episode" : "Épisode"} {ep.number} ·{" "}
              {translatePodcastCategory(ep.category, language)} · {ep.duration}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-cream leading-[1.02] tracking-tight">
              {localizedEpisode.title}
            </h1>
            <p className="text-gold-2 italic font-serif text-xl mt-3">{localizedEpisode.athleteName}</p>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              {localizedEpisode.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-orange text-background text-sm font-medium hover:scale-[1.02] transition-transform"
              >
                <Play className="w-4 h-4" fill="currentColor" />{" "}
                {playing
                  ? language === "EN"
                    ? "Listening..."
                    : "En écoute…"
                  : language === "EN"
                    ? "Play episode"
                    : "Lancer l'épisode"}
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface text-cream hover:border-orange/50 text-sm transition-colors">
                <Share2 className="w-4 h-4" /> {language === "EN" ? "Share" : "Partager"}
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface text-cream hover:border-orange/50 text-sm transition-colors">
                <Download className="w-4 h-4" /> {language === "EN" ? "Download" : "Télécharger"}
              </button>
            </div>

            <div className="mt-12 bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl text-cream">{transcript.title}</h2>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary">
                  {LANGUAGE_LABELS[language]} · {transcript.badge}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {transcript.highlight}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                {copy.note[language]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
