import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import { PAGE_COPY, localizeVideo, translateVideoCategory } from "@/components/language/siteContent";
import { VIDEOS } from "@/data/mock";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Galerie Vidéo JOJ — AfriStory JOJ" },
      {
        name: "description",
        content: "Moments forts, coulisses et mini-documentaires des JOJ Dakar 2026.",
      },
      { property: "og:title", content: "Galerie Vidéo JOJ — AfriStory JOJ" },
      { property: "og:description", content: "Les images qui restent." },
    ],
  }),
  component: VideosPage,
});

const VIDEO_TAB_CATEGORIES = [null, "Moments forts", "Coulisses", "Documentaire", "Cérémonies"] as const;

function VideosPage() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.videos;
  const [tab, setTab] = useState(0);
  const localizedVideos = VIDEOS.map((video) => localizeVideo(video, language));
  const filtered = tab === 0 ? localizedVideos : localizedVideos.filter((v) => v.cat === VIDEO_TAB_CATEGORIES[tab]);

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-3">{copy.kicker[language]}</div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          {copy.titleMain[language]} <span className="italic text-orange">{copy.titleAccent[language]}</span>
          <br />
          {copy.intro[language]}
        </h1>
      </section>

      <section className="container-museum">
        <div className="flex flex-wrap gap-2 mb-8">
          {copy.tabs.map((t, index) => (
            <button
              key={index}
              onClick={() => setTab(index)}
              className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                tab === index
                  ? "bg-orange text-background border-orange"
                  : "border-border bg-surface text-muted-foreground hover:text-cream hover:border-gold/40"
              }`}
            >
              {t[language]}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v, i) => (
            <Link
              key={v.id}
              to="/videos/$id"
              params={{ id: v.id }}
              className="photo-card group text-left bg-surface animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.image}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover photo-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                {v.badge && (
                  <span
                    className={`absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md font-medium ${
                      v.badge === "LIVE"
                        ? "bg-destructive/90 text-cream border border-destructive flex items-center gap-1.5"
                        : "bg-orange/90 text-background border border-orange"
                    }`}
                  >
                    {v.badge === "LIVE" && <span className="live-dot"></span>}
                    {v.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 z-10 text-[11px] text-cream bg-background/70 backdrop-blur-md px-2 py-0.5 rounded border border-border">
                  {v.duration}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cream text-background flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-orange mb-1.5">{translateVideoCategory(v.cat, language)}</div>
                <h3 className="font-serif text-lg text-cream leading-snug group-hover:text-gold-2 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">{v.subtitle}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
                  {v.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
