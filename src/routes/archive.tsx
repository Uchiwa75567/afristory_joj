import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Headphones, User } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import { PAGE_COPY, localizeAthlete, localizePodcast } from "@/components/language/siteContent";
import { ATHLETES, PODCASTS } from "@/data/mock";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive Permanente — AfriStory JOJ" },
      {
        name: "description",
        content: "Une mémoire vivante de l'athlétisme africain, indexée pour toujours.",
      },
      { property: "og:title", content: "Archive Permanente — AfriStory JOJ" },
      { property: "og:description", content: "Une mémoire qui restera." },
    ],
  }),
  component: ArchivePage,
});

type Result =
  | { kind: "athlete"; id: string; title: string; subtitle: string; flag: string; image: string }
  | { kind: "podcast"; id: string; title: string; subtitle: string; image: string };

function ArchivePage() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.archive;
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "athletes" | "podcasts">("all");

  const localizedAthletes = useMemo(
    () => ATHLETES.map((athlete) => localizeAthlete(athlete, language)),
    [language],
  );
  const localizedPodcasts = useMemo(
    () => PODCASTS.map((podcast) => localizePodcast(podcast, language)),
    [language],
  );

  const results: Result[] = useMemo(() => {
    const lower = q.toLowerCase();
    const a: Result[] = localizedAthletes.filter((x) =>
      !q
        ? true
        : `${x.name} ${x.country} ${x.discipline} ${x.bio} ${x.story
            .map((step) => `${step.year} ${step.title} ${step.description}`)
            .join(" ")}`
            .toLowerCase()
            .includes(lower),
    ).map((x) => ({
      kind: "athlete",
      id: x.id,
      title: x.name,
      subtitle: `${x.discipline} · ${x.country}`,
      flag: x.flag,
      image: x.image,
    }));
    const p: Result[] = localizedPodcasts.filter((x) =>
      !q ? true : `${x.title} ${x.athleteName} ${x.description}`.toLowerCase().includes(lower),
    ).map((x) => ({
      kind: "podcast",
      id: x.id,
      title: x.title,
      subtitle: `${x.athleteName} · ${x.duration}`,
      image: x.cover,
    }));
    if (type === "athletes") return a;
    if (type === "podcasts") return p;
    return [...a, ...p];
  }, [q, type, localizedAthletes, localizedPodcasts]);

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-3">{copy.kicker[language]}</div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          {copy.titleMain[language]}
          <br />
          <span className="italic text-orange">{copy.titleAccent[language]}</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {copy.intro[language]}
        </p>
      </section>

      <section className="container-museum">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.search[language]}
              className="w-full bg-surface border border-border rounded-md pl-11 pr-4 py-3.5 text-cream text-sm placeholder:text-muted-foreground/60 focus:border-orange/60 focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-surface border border-border rounded-md p-1">
            {[
              { value: "all" as const, label: copy.all[language] },
              { value: "athletes" as const, label: copy.athletes[language] },
              { value: "podcasts" as const, label: copy.podcasts[language] },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`px-4 py-2 rounded text-xs transition-colors ${
                  type === t.value
                    ? "bg-orange text-background"
                    : "text-muted-foreground hover:text-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-orange" /> {copy.athleteLabel[language]}
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-orange" /> {copy.podcastLabel[language]}
          </span>
        </div>
      </section>

      <section className="container-museum py-10">
        <div className="text-sm text-muted-foreground mb-5">
          <span className="text-cream font-medium">{results.length}</span>{" "}
          {language === "EN"
            ? results.length > 1
              ? "results"
              : "result"
            : results.length > 1
              ? "résultats"
              : "résultat"}
        </div>

        <div className="grid gap-3">
          {results.map((r) => (
            <Link
              key={`${r.kind}-${r.id}`}
              to={r.kind === "athlete" ? "/athletes/$id" : "/podcast/$id"}
              params={{ id: r.id }}
              className="group flex items-center gap-4 p-3 rounded-md bg-surface border border-border hover:border-orange/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-border">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.65rem] uppercase tracking-widest text-orange mb-0.5 flex items-center gap-1.5">
                  {r.kind === "athlete" ? (
                    <User className="w-3 h-3" />
                  ) : (
                    <Headphones className="w-3 h-3" />
                  )}
                  {r.kind === "athlete" ? copy.athleteLabel[language] : copy.podcastLabel[language]}
                </div>
                <h3 className="font-serif text-lg text-cream truncate group-hover:text-gold-2 transition-colors">
                  {r.title}
                </h3>
                <div className="text-xs text-muted-foreground truncate">
                  {r.kind === "athlete" ? `${r.flag} ${r.subtitle}` : r.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
