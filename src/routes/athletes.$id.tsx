import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Film,
  Headphones,
  MapPin,
  Pause,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ATHLETES, PODCASTS, VIDEOS, type Athlete, type VideoItem } from "@/data/mock";

type InterviewItem = {
  kind: "audio" | "video";
  id: string;
  title: string;
  subtitle: string;
  description: string;
  meta: string;
  image: string;
};

export const Route = createFileRoute("/athletes/$id")({
  loader: ({ params }) => {
    const athlete = ATHLETES.find((a) => a.id === params.id);
    if (!athlete) throw notFound();
    return athlete;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — AfriStory JOJ` },
          { name: "description", content: loaderData.bio },
          { property: "og:title", content: `${loaderData.name} — ${loaderData.country}` },
          { property: "og:description", content: loaderData.bio },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-museum py-32 text-center">
        <h1 className="font-serif text-5xl text-cream">Athlète introuvable</h1>
        <Link to="/athletes" className="mt-6 inline-block text-orange">
          ← Retour à la galerie
        </Link>
      </div>
    </PageShell>
  ),
  component: AthleteDetail,
});

function buildNarrationParagraphs(athlete: Athlete) {
  const startYear = athlete.story[0]?.year ?? "ses débuts";
  const endYear = athlete.story[athlete.story.length - 1]?.year ?? startYear;
  const chapterChain = athlete.story.map((step) => `${step.year} - ${step.title}`).join(", ");

  return [
    `${athlete.name} incarne une génération qui transforme la piste en récit. Sur ${athlete.discipline}, il ou elle porte ${athlete.country} avec une identité façonnée par la patience, la répétition et les détails.`,
    `De ${startYear} à ${endYear}, son parcours s'écrit en chapitres: ${chapterChain}. Chaque étape a construit le même langage sportif, plus sûr, plus précis, plus lisible.`,
    `Son palmarès réunit ${athlete.achievements.join(", ")} et ses archives filmées prolongent ce récit au-delà de la ligne d'arrivée.`,
  ];
}

function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function AthleteDetail() {
  const athlete = Route.useLoaderData();
  const idx = ATHLETES.findIndex((a) => a.id === athlete.id);
  const prev = ATHLETES[(idx - 1 + ATHLETES.length) % ATHLETES.length];
  const next = ATHLETES[(idx + 1) % ATHLETES.length];
  const podcast = athlete.podcastId ? PODCASTS.find((p) => p.id === athlete.podcastId) : undefined;
  const documentaryVideos = (athlete.documentaryVideoIds ?? [])
    .map((videoId) => VIDEOS.find((video) => video.id === videoId))
    .filter((video): video is VideoItem => Boolean(video));

  const narrativeParagraphs = useMemo(() => buildNarrationParagraphs(athlete), [athlete]);
  const narrationText = useMemo(() => narrativeParagraphs.join(" "), [narrativeParagraphs]);

  const interviewItems = useMemo<InterviewItem[]>(
    () => [
      ...(podcast
        ? [
            {
              kind: "audio" as const,
              id: podcast.id,
              title: podcast.title,
              subtitle: podcast.athleteName,
              description: podcast.description,
              meta: `${podcast.duration} · ${podcast.category}`,
              image: podcast.cover,
            },
          ]
        : []),
      ...documentaryVideos.map((video) => ({
        kind: "video" as const,
        id: video.id,
        title: video.title,
        subtitle: video.subtitle,
        description: video.description,
        meta: `${video.cat} · ${video.duration}`,
        image: video.image,
      })),
    ],
    [documentaryVideos, podcast],
  );

  const storyStartYear = athlete.story[0]?.year ?? "0000";
  const storyEndYear = athlete.story[athlete.story.length - 1]?.year ?? storyStartYear;

  return (
    <PageShell>
      <section className="container-museum pt-8 pb-20">
        <Link
          to="/athletes"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la galerie
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_35px_90px_-60px_rgba(13,31,18,0.45)]">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <img
                src={athlete.image}
                alt={athlete.name}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary backdrop-blur-md">
                  <span>{athlete.flag}</span> {athlete.countryCode}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-green backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5" /> {athlete.discipline}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-green" />
                  {athlete.story.length} chapitres
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="max-w-sm rounded-2xl border border-border bg-background/85 p-4 backdrop-blur-xl">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                    Portrait détaillé
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{athlete.bio}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                  Histoire
                </div>
                <div className="mt-2 font-serif text-3xl text-text">{athlete.story.length}</div>
                <div className="mt-1 text-sm text-text-secondary">chapitres chronologiques</div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                  Interviews
                </div>
                <div className="mt-2 font-serif text-3xl text-text">{interviewItems.length}</div>
                <div className="mt-1 text-sm text-text-secondary">audio et vidéos éditoriales</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_30px_90px_-65px_rgba(13,31,18,0.42)] md:p-8">
              <div className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
                <Sparkles className="h-3.5 w-3.5" /> Dossier éditorial
              </div>

              <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-text md:text-7xl">
                {athlete.name.split(" ")[0]}
                <br />
                <span className="italic text-orange">
                  {athlete.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                {athlete.bio}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Pays
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{athlete.country}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Discipline
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{athlete.discipline}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Palmarès
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">
                    {athlete.achievements.length}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Interviews
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{interviewItems.length}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {podcast && (
                  <Link
                    to="/podcast/$id"
                    params={{ id: podcast.id }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-green px-5 py-3 text-sm font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)] transition-transform hover:scale-[1.02]"
                  >
                    <Headphones className="h-4 w-4" /> Écouter l'interview
                  </Link>
                )}
                <a
                  href="#narration"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-green/40 hover:text-text"
                >
                  <Play className="h-4 w-4 text-green" /> Lire la narration
                </a>
                <a
                  href="#interviews"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-green/40 hover:text-text"
                >
                  <Film className="h-4 w-4 text-green" /> Voir les interviews
                </a>
                <Link
                  to="/histoire"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-green/40 hover:text-text"
                >
                  <BookOpen className="h-4 w-4 text-green" /> Chronologie JOJ
                </Link>
              </div>
            </div>

            <NarrationPanel athlete={athlete} narrationText={narrationText} />
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section
            id="texte"
            className="rounded-[2rem] border border-border bg-surface p-6 md:p-8 shadow-[0_30px_90px_-65px_rgba(13,31,18,0.4)]"
          >
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
              <Sparkles className="h-3.5 w-3.5" /> Description en texte
            </div>
            <h2 className="mt-3 font-serif text-3xl text-text">Récit écrit</h2>

            <div className="mt-6 space-y-4">
              {narrativeParagraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${athlete.id}-paragraph-${paragraphIndex}`}
                  className="rounded-2xl border border-border bg-background p-5 text-sm leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ol className="mt-8 space-y-4">
              {athlete.story.map((step, index) => (
                <li
                  key={`${step.year}-${step.title}`}
                  className="grid gap-4 md:grid-cols-[110px_1fr]"
                >
                  <div className="md:pt-1">
                    <div className="inline-flex items-center rounded-full border border-green/25 bg-green/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-green">
                      {step.year}
                    </div>
                    <div className="mt-2 hidden h-full w-px bg-gradient-to-b from-green/40 to-transparent md:block" />
                  </div>
                  <article className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-green/30">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl text-text">{step.title}</h3>
                      <span className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-surface p-6 md:p-7">
              <h2 className="flex items-center gap-2 font-serif text-2xl text-text">
                <Trophy className="h-5 w-5 text-green" strokeWidth={1.6} /> Palmarès
              </h2>
              <ul className="mt-5 space-y-2.5">
                {athlete.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-gold/35"
                  >
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                    <span className="text-sm text-text-secondary">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="interviews"
              className="rounded-[2rem] border border-border bg-surface p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="eyebrow mb-2">Interviews et archives</div>
                  <h2 className="font-serif text-2xl text-text">Ses différents entretiens</h2>
                </div>
                <span className="rounded-full border border-border bg-bg-tag px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary">
                  {interviewItems.length} source{interviewItems.length > 1 ? "s" : ""}
                </span>
              </div>

              {interviewItems.length ? (
                <div className="mt-5 space-y-3">
                  {interviewItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.kind === "audio" ? "/podcast/$id" : "/videos/$id"}
                      params={{ id: item.id }}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition-colors hover:border-green/30"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                          {item.kind === "audio" ? "Entretien audio" : "Entretien vidéo"} ·{" "}
                          {item.meta}
                        </div>
                        <h3 className="mt-1 truncate font-serif text-xl text-text transition-colors group-hover:text-green">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                          {item.subtitle}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg-tag text-green transition-transform group-hover:scale-105">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-border bg-background p-5 text-sm leading-relaxed text-text-secondary">
                  Aucun entretien associé pour l'instant.
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-20 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
          <Link
            to="/athletes/$id"
            params={{ id: prev.id }}
            className="group flex items-center gap-4 rounded-[1.5rem] border border-border bg-surface p-4 text-left transition-colors hover:border-green/30"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border">
              <img src={prev.image} alt={prev.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                <ArrowLeft className="mr-1 inline-block h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Précédent
              </div>
              <div className="truncate font-serif text-lg text-text group-hover:text-green">
                {prev.name}
              </div>
            </div>
          </Link>

          <Link
            to="/athletes/$id"
            params={{ id: next.id }}
            className="group flex items-center gap-4 rounded-[1.5rem] border border-border bg-surface p-4 text-right transition-colors hover:border-green/30"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                Suivant
                <ArrowRight className="ml-1 inline-block h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="truncate font-serif text-lg text-text group-hover:text-green">
                {next.name}
              </div>
            </div>
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border">
              <img src={next.image} alt={next.name} className="h-full w-full object-cover" />
            </div>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function NarrationPanel({ athlete, narrationText }: { athlete: Athlete; narrationText: string }) {
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const totalSeconds = useMemo(
    () => Math.max(42, Math.round(narrationText.split(/\s+/).length / 2.1)),
    [narrationText],
  );

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopNarration = (reset = true) => {
    clearTimer();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (reset) {
      setElapsed(0);
      setStatus("idle");
    }
  };

  const startNarration = () => {
    if (typeof window === "undefined") return;

    clearTimer();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.lang = "fr-FR";
      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.onend = () => stopNarration(true);
      utterance.onerror = () => stopNarration(true);
      window.speechSynthesis.speak(utterance);
    }

    setElapsed(0);
    setStatus("playing");
    let tick = 0;
    timerRef.current = window.setInterval(() => {
      tick += 1;
      setElapsed(tick);
      if (tick >= totalSeconds) {
        stopNarration(true);
      }
    }, 1000);
  };

  const pauseNarration = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
    clearTimer();
    setStatus("paused");
  };

  const resumeNarration = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }

    clearTimer();
    setStatus("playing");
    let tick = elapsed;
    timerRef.current = window.setInterval(() => {
      tick += 1;
      setElapsed(tick);
      if (tick >= totalSeconds) {
        stopNarration(true);
      }
    }, 1000);
  };

  useEffect(() => {
    setStatus("idle");
    setElapsed(0);
    clearTimer();

    return () => {
      clearTimer();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [athlete.id]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const progress = totalSeconds ? (elapsed / totalSeconds) * 100 : 0;

  return (
    <section
      id="narration"
      className="rounded-[2rem] border border-border bg-dark p-6 text-on-dark shadow-[0_30px_90px_-65px_rgba(13,31,18,0.52)] md:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow mb-2 text-gold">Narration vocale</div>
          <h2 className="font-serif text-2xl text-on-dark">Écoute du récit</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
          {status === "playing" ? "En lecture" : status === "paused" ? "En pause" : "Prêt"}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
        Le navigateur lit le dossier de {athlete.name}. Le récit est découpé en phrases pour
        accompagner la page sans casser le rythme.
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-green transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-on-dark-soft">
        <span>{formatClock(elapsed)}</span>
        <span>Voix FR</span>
        <span>{formatClock(totalSeconds)}</span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <button
          type="button"
          onClick={() => {
            if (status === "idle") {
              startNarration();
            } else if (status === "playing") {
              pauseNarration();
            } else {
              resumeNarration();
            }
          }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-green px-4 py-3 text-sm font-medium text-bg shadow-[0_18px_40px_-24px_rgba(29,191,96,0.65)] transition-transform hover:scale-[1.01]"
        >
          {status === "playing" ? (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          ) : status === "paused" ? (
            <>
              <Play className="h-4 w-4" /> Reprendre
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Lire
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => stopNarration(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-on-dark-muted transition-colors hover:border-gold/35 hover:text-on-dark"
        >
          <Headphones className="h-4 w-4" />
          Réinitialiser
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4">
        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
          Texte vocal
        </div>
        <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{narrationText}</p>
      </div>
    </section>
  );
}
