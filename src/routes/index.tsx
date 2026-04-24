import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Globe, Smartphone, Building2, Play, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ATHLETES, PODCASTS, ROOMS } from "@/data/mock";
import heroImg from "@/assets/hero-athlete.jpg";
import heroVideo from "@/assets/videos/video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriStory JOJ — Musée Virtuel de l'Athlétisme Africain" },
      {
        name: "description",
        content:
          "Le premier musée virtuel dédié à l'athlétisme africain, conçu autour des Jeux Olympiques de la Jeunesse Dakar 2026.",
      },
      { property: "og:title", content: "AfriStory JOJ — Musée Virtuel de l'Athlétisme Africain" },
      { property: "og:description", content: "Entrer dans le musée. Vivre l'athlétisme africain." },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "2 700", label: "Athlètes attendus" },
  { value: "55", label: "Nations africaines" },
  { value: "3", label: "Langues du musée" },
  { value: "55K+", label: "Voix de la diaspora" },
];

const PILLS = [
  { icon: Building2, label: "Musée Virtuel" },
  { icon: Headphones, label: "Podcast & Interviews" },
  { icon: Globe, label: "Accessible partout" },
  { icon: Smartphone, label: "Web + Mobile" },
];

function Index() {
  const featuredAthletes = ATHLETES.slice(0, 6);
  const featuredPodcasts = PODCASTS.slice(0, 3);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroImg}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,18,0.42)_0%,rgba(13,31,18,0.12)_38%,rgba(13,31,18,0)_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_58%,rgba(255,255,255,0.04)_100%)]" />
        </div>

        <div className="container-museum relative z-10 pt-28 pb-20 md:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full bg-surface/95 border border-border animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 text-orange" />
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream font-medium">
                Hackathon JOJ · Sonatel 2026
              </span>
            </div>

            <h1
              className="font-serif text-cream leading-[0.92] animate-fade-in-up tracking-tight"
              style={{ fontSize: "clamp(56px, 8vw, 112px)" }}
            >
              AfriStory
              <br />
              <span className="italic text-orange">JOJ</span>
            </h1>
            <p
              className="mt-6 max-w-xl text-xl md:text-2xl text-gold-2 italic font-serif animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Entrer dans le musée. Vivre l'athlétisme africain.
            </p>

            <div
              className="flex flex-wrap gap-2 mt-8 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              {PILLS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/95 border border-border text-xs text-cream"
                >
                  <p.icon className="w-3.5 h-3.5 text-orange" strokeWidth={2.2} />
                  {p.label}
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-3 mt-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                to="/musee"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-md bg-gradient-orange text-background font-medium text-sm hover:scale-[1.02] transition-transform"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                Entrer dans le musée
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-md border border-border bg-surface/95 text-cream hover:border-orange/60 transition-colors text-sm"
              >
                <Headphones className="w-4 h-4 text-orange" />
                Écouter le podcast
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-museum py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl md:text-5xl text-cream font-medium leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 ROOMS */}
      <section className="container-museum py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7">
            <div className="eyebrow mb-3">L'expérience</div>
            <h2 className="font-serif text-4xl md:text-6xl text-cream leading-[1.05]">
              Six salles, <span className="italic text-orange">une mémoire vivante.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-muted-foreground text-base leading-relaxed">
            Parcourez le musée comme un véritable lieu. Chaque salle ouvre sur une dimension
            différente du sport africain.
          </p>
        </div>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border rounded-xl overflow-hidden border border-border">
          {ROOMS.map((room, i) => {
            const Icon = room.icon;
            return (
              <Link
                key={room.num}
                to={room.path}
                className="group relative bg-surface p-8 flex flex-col min-h-[240px] hover:bg-surface-2 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Salle {room.num}
                  </span>
                  <Icon className="w-6 h-6 text-orange" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-cream group-hover:text-gold-2 transition-colors">
                  {room.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {room.desc}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  Visiter <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PODCAST */}
      <section className="container-museum pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-3">Studio podcast</div>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
              Les <span className="italic text-orange">voix</span> derrière les médailles.
            </h2>
          </div>
          <Link
            to="/podcast"
            className="group text-sm text-cream hover:text-orange inline-flex items-center gap-1 transition-colors"
          >
            Tous les épisodes{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredPodcasts.map((ep, i) => (
            <Link
              key={ep.id}
              to="/podcast/$id"
              params={{ id: ep.id }}
              className="photo-card group animate-fade-in-up bg-surface"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={ep.cover}
                  alt={ep.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover photo-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-background/85 text-[0.65rem] uppercase tracking-widest text-gold border border-border">
                  EP {ep.number.toString().padStart(2, "0")}
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-cream text-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-1.5">
                  {ep.category} · {ep.duration}
                </div>
                <h3 className="font-serif text-xl text-cream leading-snug group-hover:text-gold-2 transition-colors">
                  {ep.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{ep.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ATHLETES */}
      <section className="container-museum pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-3">Galerie des athlètes</div>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
              Chaque athlète, <span className="italic text-orange">une histoire.</span>
            </h2>
          </div>
          <Link
            to="/athletes"
            className="group text-sm text-cream hover:text-orange inline-flex items-center gap-1 transition-colors"
          >
            Explorer la galerie{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {featuredAthletes.map((a, i) => (
            <Link
              key={a.id}
              to="/athletes/$id"
              params={{ id: a.id }}
              className="photo-card group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover photo-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[0.65rem] text-cream/70 mb-1 flex items-center gap-1.5">
                    <span>{a.flag}</span> {a.country}
                  </div>
                  <h3 className="font-serif text-base text-cream leading-tight">{a.name}</h3>
                  <div className="text-xs text-orange mt-0.5">{a.discipline}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
