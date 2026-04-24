import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Play, Pause, SkipBack, SkipForward, Volume2, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import { PAGE_COPY, localizePodcast, translatePodcastCategory } from "@/components/language/siteContent";
import { PODCASTS, type PodcastEpisode } from "@/data/mock";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Studio Podcast — AfriStory JOJ" },
      {
        name: "description",
        content: "Écouter, ressentir, vivre l'athlétisme africain de l'intérieur.",
      },
      { property: "og:title", content: "Studio Podcast — AfriStory JOJ" },
      { property: "og:description", content: "Les voix derrière les médailles." },
    ],
  }),
  component: PodcastPage,
});

type PodcastFilter = "all" | "interview" | "family" | "coach" | "history";

function getPodcastFilter(category: PodcastEpisode["category"]) {
  switch (category) {
    case "Interview":
      return "interview";
    case "Famille":
      return "family";
    case "Entraîneur":
      return "coach";
    case "Histoire":
      return "history";
    default:
      return "all";
  }
}

function PodcastPage() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.podcast;
  const [cat, setCat] = useState<PodcastFilter>("all");
  const [currentId, setCurrentId] = useState<string>(PODCASTS[0].id);
  const [playing, setPlaying] = useState(false);
  const matchRoute = useMatchRoute();
  const detailMatch = matchRoute({ to: "/podcast/$id" });

  const localizedPodcasts = useMemo(
    () => PODCASTS.map((episode) => localizePodcast(episode, language)),
    [language],
  );

  const current = useMemo(
    () => localizedPodcasts.find((episode) => episode.id === currentId) ?? localizedPodcasts[0],
    [currentId, localizedPodcasts],
  );

  const filtered = useMemo(
    () =>
      cat === "all"
        ? localizedPodcasts
        : localizedPodcasts.filter((p) => getPodcastFilter(p.category) === cat),
    [cat, localizedPodcasts],
  );

  const filterLabels = [
    { value: "all" as const, label: copy.all[language] },
    { value: "interview" as const, label: language === "EN" ? "Interview" : "Interview" },
    { value: "family" as const, label: language === "EN" ? "Family" : "Famille" },
    { value: "coach" as const, label: language === "EN" ? "Coach" : "Entraîneur" },
    { value: "history" as const, label: language === "EN" ? "History" : "Histoire" },
  ];

  if (detailMatch) {
    return <Outlet />;
  }

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-3">{copy.kicker[language]}</div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          {copy.titleMain[language]}
          <br />
          <span className="italic text-orange">{copy.titleAccent[language]}</span> {language === "EN" ? "athletics." : "l'athlétisme."}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {copy.intro[language]}
        </p>
      </section>

      {/* FEATURED PLAYER */}
      <section className="container-museum">
        <div className="rounded-xl overflow-hidden border border-border bg-surface relative">
          <div className="absolute inset-0 opacity-30">
            <img
              src={current.cover}
              alt=""
              className="w-full h-full object-cover blur-3xl scale-110"
            />
          </div>
          <div className="relative grid md:grid-cols-[300px_1fr] gap-6 p-6 md:p-8">
            <div className="aspect-square rounded-lg overflow-hidden border border-border">
              <img src={current.cover} alt={current.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[0.65rem] uppercase tracking-widest text-orange flex items-center gap-1.5">
                    <span className="live-dot w-2 h-2"></span> {copy.nowListening[language]}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {translatePodcastCategory(current.category, language)}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
                  {current.title}
                </h2>
                <p className="text-orange mt-1 text-sm">{current.athleteName}</p>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div>
                <div className="h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-orange"
                    style={{ width: playing ? "42%" : "0%", transition: "width 1s linear" }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{playing ? "13:45" : "00:00"}</span>
                  <span>{current.duration}</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full border border-border text-cream hover:border-orange/50 flex items-center justify-center transition-colors">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-14 h-14 rounded-full bg-gradient-orange text-background flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {playing ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  <button className="w-10 h-10 rounded-full border border-border text-cream hover:border-orange/50 flex items-center justify-center transition-colors">
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <div className="ml-auto flex items-center gap-3 text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <button className="hover:text-cream transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="container-museum py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {filterLabels.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                cat === c.value
                  ? "bg-orange text-background border-orange"
                  : "border-border bg-surface text-muted-foreground hover:text-cream hover:border-gold/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep, i) => (
            <button
              key={ep.id}
              onClick={() => {
                setCurrentId(ep.id);
                setPlaying(true);
              }}
              className="photo-card group text-left bg-surface animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={ep.cover}
                  alt={ep.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover photo-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-background/70 backdrop-blur-md text-[0.65rem] uppercase tracking-widest text-gold border border-border">
                  EP {ep.number.toString().padStart(2, "0")}
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-cream text-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-1.5">
                  {translatePodcastCategory(ep.category, language)} · {ep.duration} · {ep.date}
                </div>
                <h3 className="font-serif text-xl text-cream leading-snug group-hover:text-gold-2 transition-colors">
                  {ep.title}
                </h3>
                <p className="mt-1 text-sm text-orange">{ep.athleteName}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{ep.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
