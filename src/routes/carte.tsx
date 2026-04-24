import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ThreeStageBackdrop } from "@/components/ThreeStageBackdrop";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  PAGE_COPY,
  localizeAthlete,
  translateCountry,
  translateDiscipline,
} from "@/components/language/siteContent";
import { ATHLETES, type Athlete } from "@/data/mock";
import africaMap from "@/assets/africa-map.jpg";

type CountrySpot = {
  country: string;
  top: number;
  left: number;
};

const COUNTRY_SPOTS: CountrySpot[] = [
  { country: "Maroc", top: 15, left: 27 },
  { country: "Algérie", top: 21, left: 37 },
  { country: "Sénégal", top: 42, left: 18 },
  { country: "Côte d'Ivoire", top: 58, left: 24 },
  { country: "Ghana", top: 61, left: 29 },
  { country: "Nigeria", top: 58, left: 37 },
  { country: "Cameroun", top: 61, left: 44 },
  { country: "Éthiopie", top: 44, left: 57 },
  { country: "Ouganda", top: 56, left: 55 },
  { country: "Kenya", top: 58, left: 61 },
  { country: "Tanzanie", top: 69, left: 60 },
  { country: "Afrique du Sud", top: 86, left: 57 },
];

const COUNTRY_SPOT_INDEX = new Map(COUNTRY_SPOTS.map((spot, index) => [spot.country, index]));
const TOTAL_ATHLETES = ATHLETES.length;
const TOTAL_DISCIPLINES = new Set(ATHLETES.map((athlete) => athlete.discipline)).size;

type CountrySummary = {
  country: string;
  countryCode: string;
  flag: string;
  count: number;
  disciplines: Set<string>;
  athletes: Athlete[];
  top: number;
  left: number;
};

export const Route = createFileRoute("/carte")({
  head: () => ({
    meta: [
      { title: "Carte Afrique Live — AfriStory JOJ" },
      {
        name: "description",
        content: "Suivez en temps réel les nations africaines participant aux JOJ Dakar 2026.",
      },
      { property: "og:title", content: "Carte Afrique Live — AfriStory JOJ" },
      { property: "og:description", content: "55 nations, une seule vibration." },
    ],
  }),
  component: CartePage,
});

function CartePage() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.carte;
  const countries = useMemo(() => {
    const map = new Map<string, CountrySummary>();
    for (const a of ATHLETES) {
      const cur = map.get(a.country) ?? {
        country: a.country,
        countryCode: a.countryCode,
        flag: a.flag,
        count: 0,
        disciplines: new Set<string>(),
        athletes: [],
        top: COUNTRY_SPOTS.find((spot) => spot.country === a.country)?.top ?? 50,
        left: COUNTRY_SPOTS.find((spot) => spot.country === a.country)?.left ?? 50,
      };
      cur.count++;
      cur.disciplines.add(a.discipline);
      cur.athletes.push(a);
      map.set(a.country, cur);
    }
    return Array.from(map.values()).sort((a, b) => {
      const orderA = COUNTRY_SPOT_INDEX.get(a.country) ?? 999;
      const orderB = COUNTRY_SPOT_INDEX.get(b.country) ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return translateCountry(a.country, language).localeCompare(
        translateCountry(b.country, language),
        language === "EN" ? "en" : "fr",
      );
    });
  }, [language]);

  const [selected, setSelected] = useState<string | null>(() => {
    return countries.find((c) => c.country === "Sénégal")?.country ?? countries[0]?.country ?? null;
  });

  useEffect(() => {
    if (!countries.length) return;
    if (selected && countries.some((country) => country.country === selected)) return;

    setSelected(
      countries.find((c) => c.country === "Sénégal")?.country ?? countries[0]?.country ?? null,
    );
  }, [countries, selected]);

  const sel = countries.find((c) => c.country === selected) ?? null;
  const selectedAthletes = useMemo(
    () => (sel ? sel.athletes.map((athlete) => localizeAthlete(athlete, language)) : []),
    [sel, language],
  );

  return (
    <PageShell>
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(29,191,96,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(246,166,35,0.08),transparent_28%),linear-gradient(180deg,#07110c_0%,#0b1711_100%)] text-on-dark">
        <section className="container-museum pt-16 md:pt-24 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="eyebrow text-green/80">{copy.kicker[language]}</div>
            <span className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-destructive">
              <span className="live-dot"></span> {copy.live[language]}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-green/20 bg-green/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-green">
              <Sparkles className="h-3.5 w-3.5" />
              {language === "EN" ? "3D stage" : "Scène 3D"}
            </span>
          </div>
          <h1 className="max-w-4xl font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-on-dark">
            {copy.titleMain[language]}
            <br />
            <span className="italic text-gold">{copy.titleAccent[language]}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
            {language === "EN"
              ? "Pick a country on the map and open the athletes from that nation in a single glance."
              : "Choisis un pays sur la carte et ouvre les athlètes de cette nation en un seul regard."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-on-dark-soft">
              {countries.length} {language === "EN" ? "countries" : "pays"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-on-dark-soft">
              {TOTAL_ATHLETES} {language === "EN" ? "athletes" : "athlètes"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-on-dark-soft">
              {TOTAL_DISCIPLINES} {language === "EN" ? "disciplines" : "disciplines"}
            </span>
          </div>
        </section>

        <section className="container-museum pb-16 grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="relative min-h-[600px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#08120c] shadow-[0_35px_120px_-70px_rgba(0,0,0,0.85)] lg:min-h-[760px]">
            <ThreeStageBackdrop />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,17,12,0.48)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-3 md:p-5">
              <img
                src={africaMap}
                alt={language === "EN" ? "Map of Africa" : "Carte de l'Afrique"}
                className="h-full w-full object-contain opacity-95"
                style={{ filter: "drop-shadow(0 0 20px rgba(246,166,35,0.12))" }}
              />
            </div>

            <div className="absolute left-4 top-4 z-20 max-w-xs rounded-2xl border border-white/10 bg-[#0a1510]/92 px-4 py-3 backdrop-blur-2xl shadow-[0_18px_45px_-24px_rgba(0,0,0,0.65)]">
              <div className="text-[0.62rem] uppercase tracking-[0.28em] text-green/80">
                {copy.clickMap[language]}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">
                {copy.mapHint[language]}
              </p>
            </div>

            {countries.map((country) => {
              const active = sel?.country === country.country;
              const label = translateCountry(country.country, language);

              return (
                <button
                  key={country.country}
                  type="button"
                  onClick={() => setSelected(country.country)}
                  aria-pressed={active}
                  aria-label={`${label} - ${country.count} ${
                    country.count > 1 ? copy.countPlural[language] : copy.countSingular[language]
                  }`}
                  title={label}
                  style={{ top: `${country.top}%`, left: `${country.left}%` }}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <span
                    className={`absolute inset-0 rounded-full bg-green/20 blur-2xl transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                    }`}
                  />
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-200 ${
                      active
                        ? "scale-110 border-green bg-[#0b1711]/95 text-on-dark shadow-[0_0_0_1px_rgba(29,191,96,0.28),0_20px_45px_-24px_rgba(29,191,96,0.45)]"
                        : "border-white/10 bg-[#0b1711]/90 text-on-dark-muted group-hover:scale-105 group-hover:border-green/40 group-hover:text-on-dark"
                    }`}
                  >
                    <span className="text-lg">{country.flag}</span>
                  </span>
                  <span
                    className={`absolute -bottom-1.5 right-0 rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] shadow-md ${
                      active
                        ? "bg-green text-[#07110c]"
                        : "border border-green/25 bg-[#0b1711]/95 text-green"
                    }`}
                  >
                    {country.count}
                  </span>
                  {active && (
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full border border-green/25 bg-[#0b1711]/95 px-2.5 py-1 text-[0.65rem] text-green shadow-lg">
                      {label}
                    </span>
                  )}
                </button>
              );
            })}

            {sel && (
              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[1.5rem] border border-white/10 bg-[#0a1510]/94 p-4 backdrop-blur-2xl shadow-[0_18px_50px_-28px_rgba(0,0,0,0.7)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[0.62rem] uppercase tracking-[0.26em] text-green/80">
                      {copy.selectedCountry[language]}
                    </div>
                    <div className="mt-2 flex items-start gap-3">
                      <div className="text-4xl">{sel.flag}</div>
                      <div className="min-w-0">
                        <h2 className="font-serif text-3xl text-on-dark">
                          {translateCountry(sel.country, language)}
                        </h2>
                        <p className="mt-1 text-sm text-on-dark-muted">
                          {sel.count}{" "}
                          {sel.count > 1
                            ? copy.countPlural[language]
                            : copy.countSingular[language]}{" "}
                          · {sel.disciplines.size} {copy.disciplines[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-green/20 bg-green/10 px-3 py-2 text-right">
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-green">
                      {copy.countryLabel[language]}
                    </div>
                    <div className="mt-1 text-sm font-medium text-on-dark">{sel.countryCode}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from(sel.disciplines).map((discipline) => (
                    <span
                      key={discipline}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-on-dark-muted"
                    >
                      {translateDiscipline(discipline, language)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a1510]/94 p-5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.65)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[0.62rem] uppercase tracking-[0.28em] text-green/80">
                    {copy.athletes[language]}
                  </div>
                  <h2 className="mt-2 font-serif text-3xl text-on-dark">
                    {sel ? translateCountry(sel.country, language) : copy.countryLabel[language]}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-on-dark-muted">
                    {language === "EN"
                      ? "Every selected country opens the full list of its athletes and disciplines."
                      : "Chaque pays sélectionné ouvre la liste complète de ses athlètes et disciplines."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-on-dark-soft">
                    {copy.countryLabel[language]}
                  </div>
                  <div className="mt-1 text-sm font-medium text-on-dark">{countries.length}</div>
                </div>
              </div>

              <div className="mt-5 space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {selectedAthletes.map((athlete) => (
                  <Link
                    key={athlete.id}
                    to="/athletes/$id"
                    params={{ id: athlete.id }}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:border-green/35 hover:bg-green/10"
                    title={`${copy.openProfile[language]} ${athlete.name}`}
                  >
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      loading="lazy"
                      className="h-16 w-16 rounded-xl border border-white/10 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-on-dark-soft">
                        <span>{athlete.flag}</span>
                        <span>{athlete.countryCode}</span>
                      </div>
                      <div className="mt-1 font-serif text-xl text-on-dark truncate">
                        {athlete.name}
                      </div>
                      <div className="text-sm text-green">
                        {translateDiscipline(athlete.discipline, language)}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-on-dark-muted">
                        {athlete.bio}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-green transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0a1510]/94 p-5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.65)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-2xl text-on-dark">
                  {language === "EN" ? "All countries" : "Tous les pays"}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-on-dark-soft">
                  {countries.length}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {countries.map((country) => {
                  const active = selected === country.country;
                  const label = translateCountry(country.country, language);

                  return (
                    <button
                      key={country.country}
                      type="button"
                      onClick={() => setSelected(country.country)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors ${
                        active
                          ? "border-green/40 bg-green/10 text-green"
                          : "border-white/10 bg-white/5 text-on-dark-muted hover:border-green/30 hover:text-on-dark"
                      }`}
                      title={label}
                    >
                      <span>{country.flag}</span>
                      <span className="truncate">{label}</span>
                      <span className="rounded-full bg-[#08120c]/70 px-1.5 py-0.5 text-[0.6rem] text-on-dark-soft">
                        {country.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
