import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import { PAGE_COPY, translateCountry, translateDiscipline } from "@/components/language/siteContent";
import { ATHLETES } from "@/data/mock";
import africaMap from "@/assets/africa-map.jpg";

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
    const map = new Map<
      string,
      { country: string; flag: string; count: number; disciplines: Set<string> }
    >();
    for (const a of ATHLETES) {
      const cur = map.get(a.country) ?? {
        country: a.country,
        flag: a.flag,
        count: 0,
        disciplines: new Set<string>(),
      };
      cur.count++;
      cur.disciplines.add(a.discipline);
      map.set(a.country, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, []);

  const [selected, setSelected] = useState<string | null>(countries[0]?.country ?? null);
  const sel = countries.find((c) => c.country === selected);

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="eyebrow">{copy.kicker[language]}</div>
          <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-cream px-2.5 py-1 rounded-full bg-destructive/15 border border-destructive/40">
            <span className="live-dot"></span> {copy.live[language]}
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          {copy.titleMain[language]}
          <br />
          <span className="italic text-orange">{copy.titleAccent[language]}</span>
        </h1>
      </section>

      <section className="container-museum pb-16 grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="bg-surface border border-border rounded-xl min-h-[520px] relative overflow-hidden flex items-center justify-center p-6">
          <img
            src={africaMap}
            alt={language === "EN" ? "Map of Africa" : "Carte de l'Afrique"}
            className="absolute inset-0 w-full h-full object-contain opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {sel && (
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-3">{sel.flag}</div>
              <div className="font-serif text-3xl text-cream">
                {translateCountry(sel.country, language)}
              </div>
              <div className="text-orange text-sm mt-2">
                {sel.count}{" "}
                {sel.count > 1 ? copy.countPlural[language] : copy.countSingular[language]} ·{" "}
                {sel.disciplines.size} {copy.disciplines[language]}
              </div>
              <div className="mt-4 text-xs text-muted-foreground max-w-xs">
                {language === "EN" ? "Events" : "Disciplines"} :{" "}
                {Array.from(sel.disciplines)
                  .map((discipline) => translateDiscipline(discipline, language))
                  .join(" · ")}
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-2 max-h-[520px] overflow-y-auto">
          <ul>
            {countries.map((c) => (
              <li key={c.country}>
                <button
                  onClick={() => setSelected(c.country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                    selected === c.country
                      ? "bg-orange/10 text-cream"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-cream"
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="flex-1 font-medium">{translateCountry(c.country, language)}</span>
                  <span className="text-xs text-orange flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {c.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
