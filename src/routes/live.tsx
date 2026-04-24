import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Medal } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  PAGE_COPY,
  translateCountry,
  translateDiscipline,
} from "@/components/language/siteContent";
import { LIVE_RESULTS } from "@/data/mock";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live JOJ Dakar 2026 — AfriStory JOJ" },
      {
        name: "description",
        content: "Résultats en direct, calendrier et tableau des médailles des JOJ Dakar 2026.",
      },
      { property: "og:title", content: "Live JOJ Dakar 2026" },
      { property: "og:description", content: "Tous les résultats africains en temps réel." },
    ],
  }),
  component: LivePage,
});

const MEDAL_COLORS = {
  gold: "var(--gold-2)",
  silver: "#D7D3CB",
  bronze: "#C77A4F",
} as const;

const MEDALS = [
  { country: "Kenya", flag: "🇰🇪", g: 4, s: 2, b: 3 },
  { country: "Éthiopie", flag: "🇪🇹", g: 3, s: 4, b: 2 },
  { country: "Sénégal", flag: "🇸🇳", g: 2, s: 1, b: 4 },
  { country: "Maroc", flag: "🇲🇦", g: 2, s: 2, b: 1 },
  { country: "Nigeria", flag: "🇳🇬", g: 1, s: 3, b: 2 },
  { country: "Afrique du Sud", flag: "🇿🇦", g: 1, s: 2, b: 3 },
];

function LivePage() {
  const { language } = useLanguage();
  const copy = PAGE_COPY.live;
  const schedule =
    language === "EN"
      ? [
          {
            date: "Oct. 26",
            events: [
              "Women's 100m final",
              "Women's high jump heats",
              "Men's 5000m final",
            ],
          },
          {
            date: "Oct. 27",
            events: [
              "Women's 400m hurdles final",
              "Men's triple jump final",
              "Women's 1500m semi",
            ],
          },
          {
            date: "Oct. 28",
            events: [
              "Women's junior marathon",
              "Men's javelin throw",
              "4x100m relay",
            ],
          },
        ]
      : [
          {
            date: "26 oct.",
            events: ["100m femmes finale", "Saut en hauteur F séries", "5000m H finale"],
          },
          {
            date: "27 oct.",
            events: ["400m haies F finale", "Triple saut H finale", "1500m F demi"],
          },
          {
            date: "28 oct.",
            events: ["Marathon junior F", "Lancer du javelot H", "Relais 4x100m"],
          },
        ];

  return (
    <PageShell>
      <section className="container-museum pt-16 md:pt-24 pb-10">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-cream px-2.5 py-1 rounded-full bg-destructive/15 border border-destructive/40 font-medium">
            <span className="live-dot"></span> {language === "EN" ? "LIVE" : "EN DIRECT"}
          </span>
          <div className="eyebrow">{copy.kicker[language]}</div>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          {copy.titleMain[language]}
          <br />
          <span className="italic text-orange">{copy.titleAccent[language]}</span>
        </h1>
      </section>

      <section className="container-museum grid lg:grid-cols-[1.5fr_1fr] gap-6 pb-16">
        <div>
          <h2 className="font-serif text-2xl text-cream mb-4">{copy.results[language]}</h2>
          <div className="bg-surface border border-border rounded-xl divide-y divide-border overflow-hidden">
            {LIVE_RESULTS.map((r) => (
              <div
                key={r.id}
                className="p-4 md:p-5 flex items-center gap-4 hover:bg-surface-2 transition-colors"
              >
                <div className="text-2xl">{r.flag}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.65rem] uppercase tracking-widest text-orange">
                    {translateDiscipline(r.discipline, language)}
                  </div>
                  <div className="font-serif text-lg text-cream truncate">{r.athlete}</div>
                  <div className="text-xs text-muted-foreground">
                    {translateCountry(r.country, language)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-xl text-cream">{r.performance}</div>
                  {r.medal && (
                    <div
                      className="flex items-center gap-1 justify-end text-xs mt-1"
                      style={{ color: MEDAL_COLORS[r.medal] }}
                    >
                      <Medal className="w-3.5 h-3.5" />{" "}
                      {r.medal === "gold"
                        ? copy.gold[language]
                        : r.medal === "silver"
                          ? copy.silver[language]
                          : copy.bronze[language]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-cream mb-4 mt-10 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange" strokeWidth={1.6} /> {copy.upcoming[language]}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {schedule.map((d) => (
              <div
                key={d.date}
                className="bg-surface border border-border rounded-xl p-5 hover:border-gold/40 transition-colors"
              >
                <div className="text-[0.65rem] uppercase tracking-widest text-orange mb-3">
                  {d.date}
                </div>
                <ul className="space-y-2 text-sm text-cream">
                  {d.events.map((e) => (
                    <li key={e} className="flex gap-2">
                      <span className="text-orange">·</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-cream mb-4">{copy.medals[language]}</h2>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_40px_40px_40px_50px] px-4 py-2.5 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border bg-surface-2/50">
              <span>{copy.country[language]}</span>
              <span className="text-center">{copy.gold[language]}</span>
              <span className="text-center">{copy.silver[language]}</span>
              <span className="text-center">{copy.bronze[language]}</span>
              <span className="text-center text-orange">{copy.total[language]}</span>
            </div>
            {MEDALS.map((m) => (
              <div
                key={m.country}
                className="grid grid-cols-[1fr_40px_40px_40px_50px] px-4 py-3 items-center text-sm border-b border-border/40 last:border-0 hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center gap-2 text-cream">
                  <span>{m.flag}</span>
                  <span className="truncate">{translateCountry(m.country, language)}</span>
                </div>
                <span className="text-center text-cream">{m.g}</span>
                <span className="text-center text-muted-foreground">{m.s}</span>
                <span className="text-center text-muted-foreground">{m.b}</span>
                <span className="text-center text-orange font-medium">{m.g + m.s + m.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
