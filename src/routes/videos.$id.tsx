import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Film,
  MapPin,
  Pause,
  Play,
  Send,
  Share2,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { ATHLETES, VIDEOS, type VideoItem } from "@/data/mock";

export const Route = createFileRoute("/videos/$id")({
  loader: ({ params }) => {
    const video = VIDEOS.find((item) => item.id === params.id);
    if (!video) throw notFound();
    return video;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AfriStory JOJ` },
          {
            name: "description",
            content: loaderData.description,
          },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-museum py-32 text-center">
        <h1 className="font-serif text-5xl text-cream">Vidéo introuvable</h1>
        <Link to="/videos" className="mt-6 inline-block text-orange">
          ← Retour à la galerie vidéo
        </Link>
      </div>
    </PageShell>
  ),
  component: VideoDetailPage,
});

function parseDuration(duration: string) {
  const [minutes, seconds] = duration.split(":").map((part) => Number(part));
  return minutes * 60 + (seconds || 0);
}

function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getShareUrl(videoId: string) {
  if (typeof window === "undefined") return `/videos/${videoId}`;
  return window.location.href;
}

function VideoDetailPage() {
  const video: VideoItem = Route.useLoaderData();
  const relatedAthlete = ATHLETES.find((athlete) =>
    athlete.documentaryVideoIds?.includes(video.id),
  );
  const currentIndex = VIDEOS.findIndex((item) => item.id === video.id);
  const nextVideo = VIDEOS[(currentIndex + 1) % VIDEOS.length];
  const prevVideo = VIDEOS[(currentIndex - 1 + VIDEOS.length) % VIDEOS.length];
  const durationSeconds = useMemo(() => parseDuration(video.duration), [video.duration]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(78);
  const [shareOpen, setShareOpen] = useState(true);

  useEffect(() => {
    setIsPlaying(false);
    setElapsed(0);
    setVolume(78);
    setShareOpen(true);
  }, [video.id]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = Math.min(current + 1, durationSeconds);
        if (next >= durationSeconds) {
          window.clearInterval(timer);
          setIsPlaying(false);
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [durationSeconds, isPlaying]);

  const currentTimeLabel = formatClock(elapsed);
  const remainingLabel = formatClock(durationSeconds - elapsed);
  const progress = durationSeconds ? (elapsed / durationSeconds) * 100 : 0;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl(video.id));
      toast.success("Lien copié");
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const handleNativeShare = async () => {
    if (typeof window === "undefined") return;

    if (!navigator.share) {
      await handleCopyLink();
      setShareOpen(true);
      return;
    }

    try {
      await navigator.share({
        title: `${video.title} — AfriStory JOJ`,
        text: video.description,
        url: window.location.href,
      });
      toast.success("Contenu partagé");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        toast.error("Partage indisponible");
      }
    }
  };

  const openShareTarget = (target: "whatsapp" | "x" | "mail") => {
    if (typeof window === "undefined") return;

    const shareUrl = getShareUrl(video.id);
    const message = `${video.title} — ${video.description} ${shareUrl}`;

    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      mail: `mailto:?subject=${encodeURIComponent(`${video.title} — AfriStory JOJ`)}&body=${encodeURIComponent(
        `${video.description}\n\n${shareUrl}`,
      )}`,
    } as const;

    window.open(urls[target], "_blank", "noopener,noreferrer");
    toast.success("Fenêtre de partage ouverte");
  };

  const togglePlayback = () => setIsPlaying((current) => !current);

  return (
    <PageShell>
      <section className="container-museum pt-8 pb-20">
        <Link
          to="/videos"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la galerie vidéo
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-dark text-on-dark shadow-[0_35px_90px_-60px_rgba(13,31,18,0.5)]">
            <img src={video.image} alt={video.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/15 via-dark/40 to-dark/85" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,191,96,0.2),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(246,166,35,0.16),_transparent_28%)]" />

            <div className="relative flex min-h-[700px] flex-col justify-between p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft backdrop-blur-md">
                  <Film className="w-3.5 h-3.5 text-green" />
                  {video.cat}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-green backdrop-blur-md">
                  {video.duration}
                </span>
                {video.badge && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] backdrop-blur-md ${
                      video.badge === "LIVE"
                        ? "border-destructive/40 bg-destructive/15 text-destructive"
                        : "border-gold/30 bg-gold/15 text-gold"
                    }`}
                  >
                    {video.badge}
                  </span>
                )}
              </div>

              <div className="max-w-3xl">
                <div className="eyebrow mb-3 text-gold">Lecture active</div>
                <h1 className="font-serif text-5xl leading-[0.95] text-on-dark md:text-7xl">
                  {video.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
                  {video.description}
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-dark-surface/88 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
                      Panneau de lecture
                    </div>
                    <div className="mt-1 font-serif text-2xl text-on-dark">
                      {isPlaying ? "Lecture en cours" : "En pause"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8 text-green shadow-[0_18px_40px_-24px_rgba(29,191,96,0.55)] transition-transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" fill="currentColor" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                    )}
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-green transition-[width] duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={durationSeconds}
                    value={elapsed}
                    onChange={(event) => setElapsed(Number(event.target.value))}
                    className="w-full cursor-pointer accent-green"
                    aria-label="Progression de la lecture"
                  />

                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-on-dark-soft">
                    <span>{currentTimeLabel}</span>
                    <span>{video.duration}</span>
                    <span>-{remainingLabel}</span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-4">
                    <button
                      type="button"
                      onClick={() => setElapsed((current) => Math.max(current - 10, 0))}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-on-dark-muted transition-colors hover:border-green/35 hover:text-on-dark"
                    >
                      <SkipBack className="h-4 w-4" />
                      -10s
                    </button>
                    <button
                      type="button"
                      onClick={togglePlayback}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-green px-4 py-3 text-sm font-medium text-bg shadow-[0_18px_40px_-24px_rgba(29,191,96,0.65)] transition-transform hover:scale-[1.01]"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Lire
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setElapsed((current) => Math.min(current + 10, durationSeconds))
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-on-dark-muted transition-colors hover:border-green/35 hover:text-on-dark"
                    >
                      +10s
                      <SkipForward className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShareOpen((current) => !current)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-on-dark-muted transition-colors hover:border-gold/35 hover:text-on-dark"
                    >
                      <Share2 className="h-4 w-4" />
                      Partage
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4 shrink-0 text-on-dark-soft" />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(event) => setVolume(Number(event.target.value))}
                      className="w-full cursor-pointer accent-green"
                      aria-label="Volume"
                    />
                    <span className="w-12 text-right text-xs uppercase tracking-[0.22em] text-on-dark-soft">
                      {volume}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <section className="rounded-[2rem] border border-border bg-surface p-6 md:p-8 shadow-[0_30px_90px_-65px_rgba(13,31,18,0.42)]">
              <div className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
                <Sparkles className="w-3.5 h-3.5" /> Fiche éditoriale
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-text md:text-5xl">
                {video.subtitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                {video.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Format
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{video.cat}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                    Durée
                  </div>
                  <div className="mt-2 font-serif text-2xl text-text">{video.duration}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/videos"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-green px-5 py-3 text-sm font-medium text-bg shadow-[0_18px_40px_-22px_rgba(29,191,96,0.55)] transition-transform hover:scale-[1.02]"
                >
                  <Film className="w-4 h-4" /> Retour à la galerie
                </Link>
                <a
                  href="#athlete-lie"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-green/40 hover:text-text"
                >
                  <MapPin className="w-4 h-4 text-green" /> Voir l'athlète lié
                </a>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-surface p-6 md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="eyebrow mb-2">Partage</div>
                  <h2 className="font-serif text-2xl text-text">Panneau de diffusion</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShareOpen((current) => !current)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-text-secondary transition-colors hover:border-green/35 hover:text-text"
                >
                  {shareOpen ? "Réduire" : "Ouvrir"}
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-secondary transition-colors hover:border-green/35 hover:text-text"
                >
                  <Copy className="h-4 w-4 text-green" /> Copier le lien
                </button>
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-green px-4 py-3 text-sm font-medium text-bg shadow-[0_18px_40px_-24px_rgba(29,191,96,0.55)]"
                >
                  <Send className="h-4 w-4" /> Partage natif
                </button>
              </div>

              {shareOpen && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openShareTarget("whatsapp")}
                    className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-secondary transition-colors hover:border-green/35 hover:text-text"
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => openShareTarget("x")}
                    className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-secondary transition-colors hover:border-green/35 hover:text-text"
                  >
                    X / Twitter
                  </button>
                  <button
                    type="button"
                    onClick={() => openShareTarget("mail")}
                    className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-secondary transition-colors hover:border-green/35 hover:text-text sm:col-span-2"
                  >
                    E-mail éditorial
                  </button>
                </div>
              )}
            </section>

            {relatedAthlete ? (
              <Link
                to="/athletes/$id"
                params={{ id: relatedAthlete.id }}
                className="group flex items-center gap-4 rounded-[2rem] border border-border bg-surface p-5 transition-colors hover:border-green/30"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                  <img
                    src={relatedAthlete.image}
                    alt={relatedAthlete.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                    Athlète lié
                  </div>
                  <h3 className="mt-1 truncate font-serif text-2xl text-text group-hover:text-green">
                    {relatedAthlete.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{relatedAthlete.discipline}</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg-tag text-green transition-transform group-hover:scale-105">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-border bg-surface p-6 text-sm leading-relaxed text-text-secondary">
                Ce contenu n'est pas encore relié à une fiche athlète précise.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[2rem] border border-border bg-surface p-6 md:p-8">
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
              <Sparkles className="w-3.5 h-3.5" /> Dans la continuité
            </div>
            <h2 className="mt-3 font-serif text-3xl text-text">Autres vidéos à explorer</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[prevVideo, nextVideo].map((item) => (
                <Link
                  key={item.id}
                  to="/videos/$id"
                  params={{ id: item.id }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition-colors hover:border-green/30"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                      {item.cat}
                    </div>
                    <h3 className="mt-1 truncate font-serif text-xl text-text group-hover:text-green">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">{item.duration}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg-tag text-green transition-transform group-hover:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-surface p-6 md:p-8">
            <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">Lecture</div>
            <h2 className="mt-3 font-serif text-3xl text-text">Rythme, image, mémoire</h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Le panneau de lecture réagit au tempo du film, tandis que les actions de partage
              ouvrent une diffusion rapide vers les applications du navigateur ou du téléphone.
            </p>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
