import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useLanguage } from "./language/LanguageProvider";
import { COMMON_COPY } from "./language/siteContent";

export function Footer() {
  const { language } = useLanguage();
  const copy = COMMON_COPY;

  return (
    <footer className="mt-32 border-t border-white/10 bg-dark text-on-dark">
      <div className="container-museum py-16 md:py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandLogo tone="dark" detail size="lg" className="mb-5" />
          <p className="max-w-md text-sm leading-relaxed text-on-dark-muted">
            {copy.footer.cta[language]}
          </p>
          <div className="flex gap-2 mt-6">
            {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-dark-surface text-on-dark-muted transition-colors hover:border-green/40 hover:text-green"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-on-dark">
            {language === "EN" ? "Museum" : "Le Musée"}
          </h4>
          <ul className="space-y-2.5 text-sm text-on-dark-muted">
            <li>
              <Link to="/athletes" className="transition-colors hover:text-on-dark">
                {language === "EN" ? "Athletes gallery" : "Galerie des athlètes"}
              </Link>
            </li>
            <li>
              <Link to="/podcast" className="transition-colors hover:text-on-dark">
                Podcast
              </Link>
            </li>
            <li>
              <Link to="/histoire" className="transition-colors hover:text-on-dark">
                {language === "EN" ? "History" : "Histoire"}
              </Link>
            </li>
            <li>
              <Link to="/videos" className="transition-colors hover:text-on-dark">
                {language === "EN" ? "Videos" : "Vidéos"}
              </Link>
            </li>
            <li>
              <Link to="/live" className="transition-colors hover:text-on-dark">
                {language === "EN" ? "YOG Live" : "Live JOJ"}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-on-dark">
            {language === "EN" ? "Community" : "Communauté"}
          </h4>
          <ul className="space-y-2.5 text-sm text-on-dark-muted">
            <li>
              <Link to="/musee" className="transition-colors hover:text-on-dark">
                {copy.footer.about[language]}
              </Link>
            </li>
            <li>
              <Link to="/archive" className="transition-colors hover:text-on-dark">
                {language === "EN" ? "Journalist space" : "Espace journaliste"}
              </Link>
            </li>
            <li>
              <a
                href="mailto:contact@afristory.joj"
                className="transition-colors hover:text-on-dark"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="mailto:legal@afristory.joj" className="transition-colors hover:text-on-dark">
                Mentions légales
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-museum flex flex-col justify-between gap-2 py-5 text-xs text-on-dark-muted md:flex-row">
          <span>© 2026 AfriStory JOJ · Orange Digital Center Dakar</span>
          <span className="text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
            {language === "EN"
              ? "YOG Innovation Challenge · Sonatel 2026"
              : "Hackathon JOJ Innovation Challenge · Sonatel 2026"}
          </span>
        </div>
      </div>
    </footer>
  );
}
