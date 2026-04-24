import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import { PAGE_COPY, localizeAthlete, translateCountry } from "@/components/language/siteContent";
import { ATHLETES } from "@/data/mock";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: [
      { title: "Galerie des Athlètes — AfriStory JOJ" },
      {
        name: "description",
        content: "Découvrez les jeunes athlètes africains qualifiés pour les JOJ Dakar 2026.",
      },
      { property: "og:title", content: "Galerie des Athlètes — AfriStory JOJ" },
      { property: "og:description", content: "Chaque athlète, une histoire." },
    ],
  }),
  component: AthletesPage,
});

type GenderFilter = "all" | "male" | "female";

function AthletesPage() {
  const matchRoute = useMatchRoute();
  const detailMatch = matchRoute({ to: "/athletes/$id" });
  const { language } = useLanguage();
  const copy = PAGE_COPY.athletes;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<GenderFilter>("all");
  const [country, setCountry] = useState<string>("");

  const countries = useMemo(
    () => ["", ...Array.from(new Set(ATHLETES.map((athlete) => athlete.country))).sort()],
    [],
  );

  const filtered = useMemo(() => {
    return ATHLETES.filter((athlete) => {
      if (filter === "male" && athlete.gender !== "M") return false;
      if (filter === "female" && athlete.gender !== "F") return false;
      if (country && athlete.country !== country) return false;

      const localized = localizeAthlete(athlete, language);
      if (
        query &&
        !`${localized.name} ${localized.discipline} ${localized.country} ${localized.bio} ${localized.story
          .map((step) => `${step.title} ${step.description}`)
          .join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    }).map((athlete) => localizeAthlete(athlete, language));
  }, [query, filter, country, language]);

  const genderFilters: Array<{ value: GenderFilter; label: string }> = [
    { value: "all", label: language === "EN" ? "All" : "Tous" },
    { value: "male", label: language === "EN" ? "Men" : "Hommes" },
    { value: "female", label: language === "EN" ? "Women" : "Femmes" },
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
          <span className="italic text-orange">{copy.titleAccent[language]}</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {copy.intro[language]}
        </p>
      </section>

      <section className="container-museum">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.search[language]}
              className="w-full bg-surface border border-border rounded-md pl-11 pr-4 py-3.5 text-cream text-sm placeholder:text-muted-foreground/60 focus:border-orange/60 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-surface border border-border rounded-md p-1">
              {genderFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded text-xs transition-colors ${
                    filter === f.value
                      ? "bg-orange text-background"
                      : "text-muted-foreground hover:text-cream"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-surface border border-border rounded-md pl-9 pr-8 py-2.5 text-xs text-cream focus:outline-none focus:border-gold/60 appearance-none cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c || "all"} value={c}>
                    {c ? translateCountry(c, language) : copy.allCountries[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 text-sm text-muted-foreground flex items-center gap-2">
          <span className="text-cream font-medium">{filtered.length}</span>
          {language === "EN"
            ? filtered.length > 1
              ? "athletes found"
              : "athlete found"
            : filtered.length > 1
              ? "athlètes trouvés"
              : "athlète trouvé"}
        </div>
      </section>

      <section className="container-museum py-10">
        {filtered.length === 0 ? (
          <div className="border border-border rounded-xl p-16 text-center bg-surface/50">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.4} />
            <h3 className="font-serif text-2xl text-cream">{copy.notFoundTitle[language]}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {copy.notFoundText[language]}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((a, i) => (
              <Link
                key={a.id}
                to="/athletes/$id"
                params={{ id: a.id }}
                className="photo-card group block h-full cursor-pointer animate-fade-in-up"
                title={`${copy.openDetail[language]} ${a.name}`}
                style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover photo-card-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-background/70 backdrop-blur-md text-[0.65rem] uppercase tracking-widest text-cream border border-border flex items-center gap-1.5">
                    <span>{a.flag}</span> {a.countryCode}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl text-cream leading-tight">{a.name}</h3>
                    <div className="text-sm text-orange mt-1">{a.discipline}</div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/75">
                      {a.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-text-secondary backdrop-blur-md">
                          {a.story.length} {copy.chapters[language]}
                        </span>
                      {a.documentaryVideoIds?.length ? (
                        <span className="rounded-full border border-green/30 bg-green/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-green backdrop-blur-md">
                          {a.documentaryVideoIds.length}{" "}
                          {language === "EN"
                            ? a.documentaryVideoIds.length > 1
                              ? "documentaries"
                              : "documentary"
                            : a.documentaryVideoIds.length > 1
                              ? "documentaires"
                              : "documentaire"}
                        </span>
                      ) : (
                        <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-text-muted backdrop-blur-md">
                          {copy.detailText[language]}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-cream/80 opacity-0 transition-opacity group-hover:opacity-100">
                      {copy.openDetail[language]} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
