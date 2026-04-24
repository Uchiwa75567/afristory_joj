import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ROOMS } from "@/data/mock";

export const Route = createFileRoute("/musee")({
  head: () => ({
    meta: [
      { title: "Le Musée — AfriStory JOJ" },
      {
        name: "description",
        content:
          "Six salles thématiques pour vivre l'athlétisme africain : athlètes, histoire, carte live, podcast, vidéos et archive.",
      },
      { property: "og:title", content: "Le Musée — AfriStory JOJ" },
      { property: "og:description", content: "Six salles, une mémoire vivante." },
    ],
  }),
  component: MuseePage,
});

function MuseePage() {
  return (
    <PageShell>
      <section className="container-museum pt-20 md:pt-28 pb-12">
        <div className="eyebrow mb-4">Le musée</div>
        <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.02] max-w-4xl tracking-tight">
          Bienvenue au musée.
          <br />
          <span className="italic text-orange">Prenez votre temps.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Six salles, six manières de découvrir l'athlétisme africain.
        </p>
      </section>

      <section className="container-museum py-12">
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border rounded-xl overflow-hidden border border-border">
          {ROOMS.map((room, i) => {
            const Icon = room.icon;
            return (
              <Link
                key={room.num}
                to={room.path}
                className="group bg-surface p-8 md:p-10 flex flex-col min-h-[280px] hover:bg-surface-2 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Salle {room.num}
                  </span>
                  <Icon className="w-7 h-7 text-orange" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-cream group-hover:text-gold-2 transition-colors">
                  {room.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {room.desc}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm text-orange">
                  Entrer dans la salle{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
