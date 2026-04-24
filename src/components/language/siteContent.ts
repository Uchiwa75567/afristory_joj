import type { AppLanguage } from "./LanguageProvider";

type LocalizedString = {
  fr: string;
  en: string;
  wo?: string;
  FR?: string;
  EN?: string;
  WO?: string;
};

type LocalizedStep = {
  title: LocalizedString;
  description: LocalizedString;
};

type LocalizedTimeline = {
  title: LocalizedString;
  description: LocalizedString;
  takeaway: LocalizedString;
  detail?: LocalizedString;
  city?: LocalizedString;
};

type LocalizedRoom = {
  title: LocalizedString;
  desc: LocalizedString;
};

type LocalizedAthlete = {
  country: LocalizedString;
  discipline: LocalizedString;
  bio: LocalizedString;
  story: LocalizedStep[];
  achievements?: LocalizedString[];
};

type LocalizedPodcast = {
  title: LocalizedString;
  description: LocalizedString;
  subtitle: LocalizedString;
};

type LocalizedVideo = {
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
};

type LocalizedCommon = {
  nav: {
    accueil: LocalizedString;
    musee: LocalizedString;
    athletes: LocalizedString;
    podcast: LocalizedString;
    histoire: LocalizedString;
    live: LocalizedString;
    videos: LocalizedString;
    archive: LocalizedString;
  };
  header: {
    signIn: LocalizedString;
    connected: LocalizedString;
    menu: LocalizedString;
    chooseLanguage: LocalizedString;
  };
  footer: {
    about: LocalizedString;
    community: LocalizedString;
    cta: LocalizedString;
  };
  auth: {
    title: LocalizedString;
    description: LocalizedString;
    submit: LocalizedString;
    logout: LocalizedString;
    sessionActive: LocalizedString;
  };
};

type LocalizedPageCopy = {
  home: {
    heroKicker: LocalizedString;
    heroTitleMain: LocalizedString;
    heroTitleAccent: LocalizedString;
    heroIntro: LocalizedString;
    enterMuseum: LocalizedString;
    listenPodcast: LocalizedString;
    experience: LocalizedString;
    experienceTitleMain: LocalizedString;
    experienceTitleAccent: LocalizedString;
    experienceIntro: LocalizedString;
    studioKicker: LocalizedString;
    studioTitleMain: LocalizedString;
    studioTitleAccent: LocalizedString;
    studioLink: LocalizedString;
    athletesKicker: LocalizedString;
    athletesTitleMain: LocalizedString;
    athletesTitleAccent: LocalizedString;
    athletesLink: LocalizedString;
  };
  athletes: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    search: LocalizedString;
    allCountries: LocalizedString;
    found: LocalizedString;
    notFoundTitle: LocalizedString;
    notFoundText: LocalizedString;
    openDetail: LocalizedString;
    chapters: LocalizedString;
    documentaries: LocalizedString;
    detailText: LocalizedString;
  };
  athleteDetail: {
    back: LocalizedString;
    detailKicker: LocalizedString;
    detailTitle: LocalizedString;
    biography: LocalizedString;
    history: LocalizedString;
    period: LocalizedString;
    interviews: LocalizedString;
    palette: LocalizedString;
    writtenStory: LocalizedString;
    voiceKicker: LocalizedString;
    voiceTitle: LocalizedString;
    voiceStatusIdle: LocalizedString;
    voiceStatusPlaying: LocalizedString;
    voiceStatusPaused: LocalizedString;
    reset: LocalizedString;
    writtenBody: LocalizedString;
    interviewsSection: LocalizedString;
    relatedAthlete: LocalizedString;
    next: LocalizedString;
    previous: LocalizedString;
  };
  history: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    interactive: LocalizedString;
    editions: LocalizedString;
    cities: LocalizedString;
    span: LocalizedString;
    hint: LocalizedString;
    prev: LocalizedString;
    next: LocalizedString;
    drag: LocalizedString;
  };
  historyDetail: {
    back: LocalizedString;
    fiche: LocalizedString;
    editorial: LocalizedString;
    detailed: LocalizedString;
    related: LocalizedString;
    prev: LocalizedString;
    next: LocalizedString;
  };
  podcast: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    all: LocalizedString;
    transcript: LocalizedString;
    transcriptSoon: LocalizedString;
    nowListening: LocalizedString;
    share: LocalizedString;
    allEpisodes: LocalizedString;
  };
  podcastDetail: {
    back: LocalizedString;
    transcript: LocalizedString;
    badge: LocalizedString;
    note: LocalizedString;
    session: LocalizedString;
  };
  videos: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    tabs: LocalizedString[];
  };
  videoDetail: {
    back: LocalizedString;
    live: LocalizedString;
    panel: LocalizedString;
    play: LocalizedString;
    pause: LocalizedString;
    ready: LocalizedString;
    inProgress: LocalizedString;
    editingSheet: LocalizedString;
    format: LocalizedString;
    duration: LocalizedString;
    returnGallery: LocalizedString;
    relatedAthlete: LocalizedString;
    noLink: LocalizedString;
    exploreMore: LocalizedString;
    lecture: LocalizedString;
    rhythm: LocalizedString;
  };
  archive: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    search: LocalizedString;
    all: LocalizedString;
    athletes: LocalizedString;
    podcasts: LocalizedString;
    results: LocalizedString;
    foundAthlete: LocalizedString;
    foundPodcast: LocalizedString;
    noAthlete: LocalizedString;
    noPodcast: LocalizedString;
    athleteLabel: LocalizedString;
    podcastLabel: LocalizedString;
  };
  carte: {
    kicker: LocalizedString;
    live: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    countSingular: LocalizedString;
    countPlural: LocalizedString;
    disciplines: LocalizedString;
    countryLabel: LocalizedString;
  };
  live: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    results: LocalizedString;
    upcoming: LocalizedString;
    medals: LocalizedString;
    country: LocalizedString;
    gold: LocalizedString;
    silver: LocalizedString;
    bronze: LocalizedString;
    total: LocalizedString;
    scheduleIntro: LocalizedString;
  };
  musee: {
    kicker: LocalizedString;
    titleMain: LocalizedString;
    titleAccent: LocalizedString;
    intro: LocalizedString;
    enter: LocalizedString;
  };
};

function pick(language: AppLanguage, value: LocalizedString) {
  if (language === "EN") return value.en;
  if (language === "WO") return value.wo ?? value.fr;
  return value.fr;
}

export function t(value: LocalizedString, language: AppLanguage) {
  return pick(language, value);
}

export function isEnglish(language: AppLanguage) {
  return language === "EN";
}

export const COMMON_COPY: LocalizedCommon = {
  nav: {
    accueil: { fr: "Accueil", en: "Home" },
    musee: { fr: "Le Musée", en: "Museum" },
    athletes: { fr: "Athlètes", en: "Athletes" },
    podcast: { fr: "Podcast", en: "Podcast" },
    histoire: { fr: "Histoire", en: "History" },
    live: { fr: "Live JOJ", en: "YOG Live" },
    videos: { fr: "Vidéos", en: "Videos" },
    archive: { fr: "Archive", en: "Archive" },
  },
  header: {
    signIn: { fr: "Se connecter", en: "Sign in" },
    connected: { fr: "Connecté", en: "Signed in" },
    menu: { fr: "Menu", en: "Menu" },
    chooseLanguage: { fr: "Choisir la langue", en: "Choose language" },
  },
  footer: {
    about: { fr: "À propos", en: "About" },
    community: { fr: "Communauté", en: "Community" },
    cta: { fr: "Le premier musée virtuel dédié à l'athlétisme africain, conçu autour des Jeux Olympiques de la Jeunesse Dakar 2026.", en: "The first virtual museum dedicated to African athletics, built around the Dakar 2026 Youth Olympic Games." },
  },
  auth: {
    title: { fr: "Accès au musée", en: "Museum access" },
    description: { fr: "Sélectionne ton rôle pour ouvrir l'espace qui correspond à ton profil.", en: "Choose your role to open the space that matches your profile." },
    submit: { fr: "Se connecter", en: "Sign in" },
    logout: { fr: "Déconnexion", en: "Sign out" },
    sessionActive: { fr: "Session active", en: "Active session" },
  },
};

export const PAGE_COPY: LocalizedPageCopy = {
  home: {
    heroKicker: { fr: "Hackathon JOJ · Sonatel 2026", en: "YOG Hackathon · Sonatel 2026" },
    heroTitleMain: { fr: "AfriStory", en: "AfriStory" },
    heroTitleAccent: { fr: "JOJ", en: "YOG" },
    heroIntro: { fr: "Entrer dans le musée. Vivre l'athlétisme africain.", en: "Enter the museum. Experience African athletics." },
    enterMuseum: { fr: "Entrer dans le musée", en: "Enter the museum" },
    listenPodcast: { fr: "Écouter le podcast", en: "Listen to the podcast" },
    experience: { fr: "L'expérience", en: "The experience" },
    experienceTitleMain: { fr: "Six salles,", en: "Six rooms," },
    experienceTitleAccent: { fr: "une mémoire vivante.", en: "one living memory." },
    experienceIntro: { fr: "Parcourez le musée comme un véritable lieu. Chaque salle ouvre sur une dimension différente du sport africain.", en: "Move through the museum like a real place. Each room opens onto a different dimension of African sport." },
    studioKicker: { fr: "Studio podcast", en: "Podcast studio" },
    studioTitleMain: { fr: "Les", en: "The" },
    studioTitleAccent: { fr: "voix", en: "voices" },
    studioLink: { fr: "Tous les épisodes", en: "All episodes" },
    athletesKicker: { fr: "Galerie des athlètes", en: "Athletes gallery" },
    athletesTitleMain: { fr: "Chaque athlète,", en: "Every athlete," },
    athletesTitleAccent: { fr: "une histoire.", en: "a story." },
    athletesLink: { fr: "Explorer la galerie", en: "Explore the gallery" },
  },
  athletes: {
    kicker: { fr: "Salle 01 — Galerie", en: "Room 01 - Gallery" },
    titleMain: { fr: "Chaque athlète,", en: "Every athlete," },
    titleAccent: { fr: "une histoire.", en: "a story." },
    intro: { fr: "Portraits, parcours et voix des jeunes talents qui défendront l'Afrique aux JOJ Dakar 2026.", en: "Portraits, journeys and voices of the young talents representing Africa at the Dakar 2026 YOG." },
    search: { fr: "Rechercher un athlète, un pays, une discipline…", en: "Search an athlete, country or event…" },
    allCountries: { fr: "Tous les pays", en: "All countries" },
    found: { fr: "athlète trouvé", en: "athlete found" },
    notFoundTitle: { fr: "Aucun athlète trouvé", en: "No athlete found" },
    notFoundText: { fr: "Essayez un autre filtre ou un autre mot-clé.", en: "Try another filter or keyword." },
    openDetail: { fr: "Ouvrir le détail", en: "Open details" },
    chapters: { fr: "chapitres", en: "chapters" },
    documentaries: { fr: "documentaire", en: "documentary" },
    detailText: { fr: "Histoire détaillée", en: "Detailed story" },
  },
  athleteDetail: {
    back: { fr: "Retour à la galerie", en: "Back to gallery" },
    detailKicker: { fr: "Dossier éditorial", en: "Editorial file" },
    detailTitle: { fr: "Détail athlète", en: "Athlete detail" },
    biography: { fr: "Biographie", en: "Biography" },
    history: { fr: "Histoire", en: "Story" },
    period: { fr: "Période", en: "Period" },
    interviews: { fr: "Interviews", en: "Interviews" },
    palette: { fr: "audio et vidéos éditoriales", en: "audio and editorial videos" },
    writtenStory: { fr: "Récit écrit", en: "Written story" },
    voiceKicker: { fr: "Portrait vocal", en: "Voice portrait" },
    voiceTitle: { fr: "Écoute du récit", en: "Listen to the story" },
    voiceStatusIdle: { fr: "Prêt", en: "Ready" },
    voiceStatusPlaying: { fr: "En lecture", en: "Playing" },
    voiceStatusPaused: { fr: "En pause", en: "Paused" },
    reset: { fr: "Réinitialiser", en: "Reset" },
    writtenBody: { fr: "Le navigateur lit le dossier de l'athlète. Le texte est découpé en phrases pour accompagner la page sans casser le rythme.", en: "The browser reads the athlete profile. The text is split into sentences so the page keeps its rhythm." },
    interviewsSection: { fr: "Ses différents entretiens", en: "His / her interviews" },
    relatedAthlete: { fr: "Athlète lié", en: "Related athlete" },
    next: { fr: "Suivant", en: "Next" },
    previous: { fr: "Précédent", en: "Previous" },
  },
  history: {
    kicker: { fr: "Salle 02 - Histoire", en: "Room 02 - History" },
    titleMain: { fr: "Chronologie des", en: "Timeline of the" },
    titleAccent: { fr: "Jeux Olympiques de la Jeunesse.", en: "Youth Olympic Games." },
    intro: { fr: "Une frise horizontale et futuriste pour traverser les grandes éditions des JOJ, de leur naissance à la première édition africaine à Dakar.", en: "A horizontal, futuristic timeline crossing the major editions of the YOG, from their birth to the first African edition in Dakar." },
    interactive: { fr: "Chronologie interactive", en: "Interactive timeline" },
    editions: { fr: "Éditions", en: "Editions" },
    cities: { fr: "Villes", en: "Cities" },
    span: { fr: "Période", en: "Span" },
    hint: { fr: "Glissez horizontalement ou utilisez les flèches pour remonter les étapes majeures des JOJ, de la première édition à la promesse tenue de Dakar 2026.", en: "Scroll horizontally or use the arrows to revisit the major YOG milestones, from the first edition to the promise kept in Dakar 2026." },
    prev: { fr: "Précédent", en: "Previous" },
    next: { fr: "Suivant", en: "Next" },
    drag: { fr: "Glisser horizontalement", en: "Scroll horizontally" },
  },
  historyDetail: {
    back: { fr: "Retour à la chronologie", en: "Back to timeline" },
    fiche: { fr: "Fiche du chapitre", en: "Chapter sheet" },
    editorial: { fr: "Résumé éditorial", en: "Editorial summary" },
    detailed: { fr: "Chapitre détaillé", en: "Detailed chapter" },
    related: { fr: "Ce chapitre change la suite", en: "This chapter changes what comes next" },
    prev: { fr: "Précédent", en: "Previous" },
    next: { fr: "Suivant", en: "Next" },
  },
  podcast: {
    kicker: { fr: "Salle 04 — Studio Podcast", en: "Room 04 - Podcast Studio" },
    titleMain: { fr: "Écouter. Ressentir.", en: "Listen. Feel." },
    titleAccent: { fr: "Vivre", en: "Live" },
    intro: { fr: "Des voix qui racontent l'effort, le sacrifice et la fierté.", en: "Voices that tell the story of effort, sacrifice and pride." },
    all: { fr: "Tous", en: "All" },
    transcript: { fr: "Transcription", en: "Transcript" },
    transcriptSoon: { fr: "La transcription complète sera disponible prochainement. En attendant, plongez dans l'épisode et laissez-vous porter par la voix de notre invité·e.", en: "The full transcript will be available soon. In the meantime, dive into the episode and let our guest's voice carry you." },
    nowListening: { fr: "À l'écoute", en: "Now listening" },
    share: { fr: "Partager", en: "Share" },
    allEpisodes: { fr: "Tous les épisodes", en: "All episodes" },
  },
  podcastDetail: {
    back: { fr: "Tous les épisodes", en: "All episodes" },
    transcript: { fr: "Transcription", en: "Transcript" },
    badge: { fr: "FR", en: "EN" },
    note: { fr: "La transcription complète sera disponible prochainement. En attendant, plongez dans l'épisode et laissez-vous porter par la voix de notre invité·e.", en: "The full transcript will be available soon. In the meantime, dive into the episode and let our guest's voice carry you." },
    session: { fr: "Session active", en: "Active session" },
  },
  videos: {
    kicker: { fr: "Salle 05 — Vidéo JOJ", en: "Room 05 - YOG Video" },
    titleMain: { fr: "Les", en: "The" },
    titleAccent: { fr: "images", en: "images" },
    intro: { fr: "qui restent.", en: "that remain." },
    tabs: [
      { fr: "Tous", en: "All" },
      { fr: "Moments forts", en: "Highlights" },
      { fr: "Coulisses", en: "Behind the scenes" },
      { fr: "Documentaire", en: "Documentary" },
      { fr: "Cérémonies", en: "Ceremonies" },
    ],
  },
  videoDetail: {
    back: { fr: "Retour à la galerie vidéo", en: "Back to video gallery" },
    live: { fr: "Lecture active", en: "Active playback" },
    panel: { fr: "Panneau de lecture", en: "Playback panel" },
    play: { fr: "Lire", en: "Play" },
    pause: { fr: "Pause", en: "Pause" },
    ready: { fr: "En pause", en: "Paused" },
    inProgress: { fr: "Lecture en cours", en: "Playing" },
    editingSheet: { fr: "Fiche éditoriale", en: "Editorial sheet" },
    format: { fr: "Format", en: "Format" },
    duration: { fr: "Durée", en: "Duration" },
    returnGallery: { fr: "Retour à la galerie", en: "Back to gallery" },
    relatedAthlete: { fr: "Athlète lié", en: "Related athlete" },
    noLink: { fr: "Ce contenu n'est pas encore relié à une fiche athlète précise.", en: "This content is not yet linked to a specific athlete profile." },
    exploreMore: { fr: "Autres vidéos à explorer", en: "More videos to explore" },
    lecture: { fr: "Lecture", en: "Playback" },
    rhythm: { fr: "Rythme, image, mémoire", en: "Rhythm, image, memory" },
  },
  archive: {
    kicker: { fr: "Salle 06 — Archive", en: "Room 06 - Archive" },
    titleMain: { fr: "Une mémoire", en: "A memory" },
    titleAccent: { fr: "qui restera.", en: "that will remain." },
    intro: { fr: "Recherchez parmi les athlètes et les épisodes podcast du musée.", en: "Search across the museum's athletes and podcast episodes." },
    search: { fr: "Chercher dans toute l'archive…", en: "Search the entire archive…" },
    all: { fr: "Tous", en: "All" },
    athletes: { fr: "Athlètes", en: "Athletes" },
    podcasts: { fr: "Podcasts", en: "Podcasts" },
    results: { fr: "résultat", en: "result" },
    foundAthlete: { fr: "Athlète", en: "Athlete" },
    foundPodcast: { fr: "Podcast", en: "Podcast" },
    noAthlete: { fr: "Aucun athlète trouvé", en: "No athlete found" },
    noPodcast: { fr: "Aucun podcast trouvé", en: "No podcast found" },
    athleteLabel: { fr: "Athlète", en: "Athlete" },
    podcastLabel: { fr: "Podcast", en: "Podcast" },
  },
  carte: {
    kicker: { fr: "Salle 03 — Carte Live", en: "Room 03 - Live Map" },
    live: { fr: "EN DIRECT", en: "LIVE" },
    titleMain: { fr: "55 nations,", en: "55 nations," },
    titleAccent: { fr: "une seule vibration.", en: "one shared pulse." },
    countSingular: { fr: "athlète", en: "athlete" },
    countPlural: { fr: "athlètes", en: "athletes" },
    disciplines: { fr: "Disciplines", en: "Events" },
    countryLabel: { fr: "Pays", en: "Country" },
  },
  live: {
    kicker: { fr: "JOJ Dakar 2026 · Stade L.S. Senghor", en: "Dakar 2026 YOG · L.S. Senghor Stadium" },
    titleMain: { fr: "Le pouls des", en: "The pulse of the" },
    titleAccent: { fr: "Jeux.", en: "Games." },
    results: { fr: "Résultats du jour", en: "Today's results" },
    upcoming: { fr: "À venir", en: "Coming up" },
    medals: { fr: "Médailles · Afrique", en: "Medals · Africa" },
    country: { fr: "Pays", en: "Country" },
    gold: { fr: "Or", en: "Gold" },
    silver: { fr: "Argent", en: "Silver" },
    bronze: { fr: "Bronze", en: "Bronze" },
    total: { fr: "Tot", en: "Tot" },
    scheduleIntro: { fr: "Programme du jour", en: "Today's schedule" },
  },
  musee: {
    kicker: { fr: "Le musée", en: "The museum" },
    titleMain: { fr: "Bienvenue au musée.", en: "Welcome to the museum." },
    titleAccent: { fr: "Prenez votre temps.", en: "Take your time." },
    intro: { fr: "Six salles, six manières de découvrir l'athlétisme africain.", en: "Six rooms, six ways to discover African athletics." },
    enter: { fr: "Entrer dans la salle", en: "Enter the room" },
  },
};

export function translateCountry(country: string, language: AppLanguage) {
  if (language !== "EN") return country;

  const map: Record<string, string> = {
    Sénégal: "Senegal",
    "Côte d'Ivoire": "Ivory Coast",
    Éthiopie: "Ethiopia",
    Nigeria: "Nigeria",
    Maroc: "Morocco",
    "Afrique du Sud": "South Africa",
    Ghana: "Ghana",
    Cameroun: "Cameroon",
    Algérie: "Algeria",
    Tanzanie: "Tanzania",
    Ouganda: "Uganda",
    Afrique: "Africa",
    Kenya: "Kenya",
  };

  return map[country] ?? country;
}

export function translateDiscipline(discipline: string, language: AppLanguage) {
  if (language !== "EN") return discipline;

  const map: Record<string, string> = {
    "200m": "200m",
    "3000m steeple": "3000m steeplechase",
    "5000m": "5000m",
    "Saut en longueur": "Long jump",
    "100m": "100m",
    "Saut en hauteur": "High jump",
    "400m": "400m",
    "Triple saut": "Triple jump",
    "1500m": "1500m",
    Marathon: "Marathon",
    "10000m": "10000m",
    "400m haies": "400m hurdles",
  };

  return map[discipline] ?? discipline;
}

export function translatePodcastCategory(category: string, language: AppLanguage) {
  if (language !== "EN") return category;

  const map: Record<string, string> = {
    Interview: "Interview",
    Famille: "Family",
    "Entraîneur": "Coach",
    Histoire: "History",
  };

  return map[category] ?? category;
}

export function translateVideoCategory(category: string, language: AppLanguage) {
  if (language !== "EN") return category;

  const map: Record<string, string> = {
    "Cérémonies": "Ceremonies",
    Documentaire: "Documentary",
    Coulisses: "Behind the scenes",
    "Moments forts": "Highlights",
  };

  return map[category] ?? category;
}

export const ATHLETE_COPY: Record<string, LocalizedAthlete> = {
  "amina-diallo": {
    country: { fr: "Sénégal", en: "Senegal" },
    discipline: { fr: "200m", en: "200m" },
    bio: {
      fr: "Sprinteuse prodige formée à Dakar, espoir des JOJ 2026 sur sa terre natale.",
      en: "A prodigious sprinter trained in Dakar, one of the hopes of the 2026 YOG on home soil.",
    },
    story: [
      {
        title: { fr: "Premières foulées à Yoff", en: "First strides in Yoff" },
        description: {
          fr: "Sur les pistes improvisées du littoral dakarois, Amina apprend très tôt à aimer la vitesse et le départ lancé.",
          en: "On the improvised tracks along Dakar's coast, Amina learns early to love speed and the flying start.",
        },
      },
      {
        title: { fr: "Révélation chez les U18", en: "A U18 breakthrough" },
        description: {
          fr: "Ses chronos chutent et son nom circule dans les sélections nationales après une saison où chaque finale ressemble à un déclic.",
          en: "Her times fall and her name starts circulating through national selections after a season when every final feels like a breakthrough.",
        },
      },
      {
        title: { fr: "Visage d'un pays hôte", en: "The face of a host nation" },
        description: {
          fr: "À Dakar, elle devient l'un des symboles de la jeunesse sénégalaise qui court devant son public.",
          en: "In Dakar, she becomes one of the symbols of Senegalese youth running in front of its home crowd.",
        },
      },
    ],
    achievements: [
      { fr: "Championne d'Afrique U18 2024", en: "2024 African U18 champion" },
      { fr: "Record national U20 200m", en: "National U20 200m record" },
      { fr: "Sélection JOJ Dakar 2026", en: "Dakar 2026 YOG selection" },
    ],
  },
  "kipchoge-rotich": {
    country: { fr: "Kenya", en: "Kenya" },
    discipline: { fr: "3000m steeple", en: "3000m steeple" },
    bio: {
      fr: "Issu de l'Iten Valley, héritier de la dynastie kényane des coureurs de fond.",
      en: "From Iten Valley, heir to Kenya's distance-running dynasty.",
    },
    story: [
      {
        title: { fr: "Les pistes rouges d'Iten", en: "Iten's red tracks" },
        description: {
          fr: "Dans la vallée mythique, Kipchoge s'initie aux longues sorties de groupe où le rythme se gagne autant qu'il se travaille.",
          en: "In the legendary valley, Kipchoge grows up with long group runs where pace is earned as much as it is trained.",
        },
      },
      {
        title: { fr: "Entrée dans le circuit national", en: "Entering the national circuit" },
        description: {
          fr: "Ses progrès sur le steeple le font monter rapidement dans les catégories d'âge et dans les radars des sélectionneurs.",
          en: "His progress in the steeplechase quickly lifts him through the age groups and onto selectors' radar.",
        },
      },
      {
        title: { fr: "L'obsession du dernier obstacle", en: "The obsession with the last barrier" },
        description: {
          fr: "À Dakar, il veut transformer son endurance en signature continentale sur un 3000m steeple très attendu.",
          en: "In Dakar, he wants to turn his endurance into a continental signature in a much-anticipated 3000m steeplechase.",
        },
      },
    ],
    achievements: [
      { fr: "Or championnats africains juniors", en: "African junior championships gold" },
      { fr: "Sub 8:20 sur 3000m steeple", en: "Under 8:20 in 3000m steeplechase" },
    ],
  },
  "tigist-bekele": {
    country: { fr: "Éthiopie", en: "Ethiopia" },
    discipline: { fr: "5000m", en: "5000m" },
    bio: {
      fr: "Originaire des hauts plateaux d'Addis-Abeba, médaillée mondiale juniors.",
      en: "From the highlands of Addis Ababa, a junior world medalist.",
    },
    story: [
      {
        title: { fr: "Des côtes qui parlent", en: "The highlands that speak" },
        description: {
          fr: "Tigist grandit sur les plateaux éthiopiens, où courir devient une évidence avant même d'être un projet.",
          en: "Tigist grows up on the Ethiopian highlands, where running feels natural long before it becomes a project.",
        },
      },
      {
        title: { fr: "La marche vers les podiums", en: "The march toward podiums" },
        description: {
          fr: "Un record U20 sur 5000m confirme une maturité rare sur les distances où l'endurance gouverne tout.",
          en: "A U20 5000m record confirms rare maturity in events where endurance governs everything.",
        },
      },
      {
        title: { fr: "L'attente d'une grande finale", en: "Waiting for a big final" },
        description: {
          fr: "À Dakar, elle porte l'attente d'un pays qui a toujours fait du fond un langage mondial.",
          en: "In Dakar, she carries the expectations of a nation that has always turned distance running into a global language.",
        },
      },
    ],
    achievements: [
      { fr: "Argent Mondiaux U20", en: "World U20 silver medal" },
      { fr: "Record d'Éthiopie U20 5000m", en: "Ethiopian U20 5000m record" },
    ],
  },
  "chinedu-okafor": {
    country: { fr: "Nigeria", en: "Nigeria" },
    discipline: { fr: "Saut en longueur", en: "Long jump" },
    bio: {
      fr: "Étoile montante du saut en longueur, formé à Lagos.",
      en: "An up-and-coming long jump star trained in Lagos.",
    },
    story: [
      {
        title: { fr: "Le déclic à Lagos", en: "The Lagos breakthrough" },
        description: {
          fr: "Repéré dans les compétitions scolaires, Chinedu découvre très vite une trajectoire qui ne ressemble à aucune autre.",
          en: "Spotted in school competitions, Chinedu quickly finds a path unlike any other.",
        },
      },
      {
        title: { fr: "Le cap des 8 mètres", en: "The eight-meter mark" },
        description: {
          fr: "Ses 8,05 m à 17 ans le projettent dans un autre monde, celui des jeunes sauteurs qui changent le standard national.",
          en: "His 8.05m jump at 17 sends him into another world, among the young jumpers changing the national standard.",
        },
      },
      {
        title: { fr: "Sauter pour marquer l'histoire", en: "Jumping to make history" },
        description: {
          fr: "Aux JOJ Dakar, il incarne une génération nigériane qui veut allier puissance, technique et sang-froid.",
          en: "At the Dakar YOG, he embodies a Nigerian generation that wants power, technique and composure in one package.",
        },
      },
    ],
    achievements: [
      { fr: "8.05m à 17 ans", en: "8.05m at 17" },
      { fr: "Champion national U20", en: "U20 national champion" },
    ],
  },
  "kouame-yao": {
    country: { fr: "Côte d'Ivoire", en: "Ivory Coast" },
    discipline: { fr: "100m", en: "100m" },
    bio: {
      fr: "Sprinteur explosif d'Abidjan, suit les traces de Marie-Josée Ta Lou.",
      en: "An explosive sprinter from Abidjan, following in the footsteps of Marie-Josée Ta Lou.",
    },
    story: [
      {
        title: { fr: "Les départs d'Abidjan", en: "Abidjan starts" },
        description: {
          fr: "Sur des pistes encore rugueuses, Kouamé apprend à convertir l'explosivité naturelle en vraie mécanique de sprint.",
          en: "On rough tracks, Kouamé learns to turn raw explosiveness into a real sprinting machine.",
        },
      },
      {
        title: { fr: "L'éclair ivoirien", en: "The Ivorian lightning" },
        description: {
          fr: "Le chrono de 10.18 le propulse parmi les noms suivis par les observateurs de la vitesse continentale.",
          en: "A 10.18 clocking puts him among the names watched by continental speed observers.",
        },
      },
      {
        title: { fr: "Courir au-dessus du bruit", en: "Running above the noise" },
        description: {
          fr: "À Dakar, il veut prouver qu'un sprinteur ivoirien peut aussi contrôler le tempo d'une finale internationale.",
          en: "In Dakar, he wants to prove an Ivorian sprinter can also control the tempo of an international final.",
        },
      },
    ],
    achievements: [
      { fr: "10.18 à 18 ans", en: "10.18 at 18" },
      { fr: "Champion ouest-africain U20", en: "West African U20 champion" },
    ],
  },
  "naledi-khumalo": {
    country: { fr: "Afrique du Sud", en: "South Africa" },
    discipline: { fr: "Saut en hauteur", en: "High jump" },
    bio: {
      fr: "Athlète zoulou polyvalente, recordwoman scolaire d'Afrique du Sud.",
      en: "A versatile Zulu athlete and South Africa's school record holder.",
    },
    story: [
      {
        title: { fr: "Découverte de la hauteur", en: "Discovering height" },
        description: {
          fr: "Au lycée, Naledi transforme les concours scolaires en terrain d'expérimentation et de confiance.",
          en: "At school, Naledi turns competitions into a playground for experimentation and confidence.",
        },
      },
      {
        title: { fr: "1,92 m comme promesse", en: "1.92m as a promise" },
        description: {
          fr: "Le record scolaire à 1,92 m lui donne une stature nouvelle et attire les regards de la fédération sud-africaine.",
          en: "A school record at 1.92m gives her a new stature and catches the eye of the South African federation.",
        },
      },
      {
        title: { fr: "S'élever à Dakar", en: "Rising in Dakar" },
        description: {
          fr: "Elle arrive aux JOJ avec la volonté de rendre chaque prise d'élan plus propre, plus légère et plus haute.",
          en: "She arrives at the YOG determined to make every run-up cleaner, lighter and higher.",
        },
      },
    ],
    achievements: [
      { fr: "1.92m à 17 ans", en: "1.92m at 17" },
      { fr: "Médaille Commonwealth Youth", en: "Commonwealth Youth medal" },
    ],
  },
  "kofi-mensah": {
    country: { fr: "Ghana", en: "Ghana" },
    discipline: { fr: "400m", en: "400m" },
    bio: {
      fr: "Espoir ghanéen du 400m, étudiant-athlète à l'Université d'Accra.",
      en: "Ghana's 400m hope, a student-athlete at the University of Accra.",
    },
    story: [
      {
        title: { fr: "Vitesse et études", en: "Speed and studies" },
        description: {
          fr: "À Accra, Kofi construit un double parcours où les cours et l'athlétisme avancent au même rythme.",
          en: "In Accra, Kofi builds a dual path where classes and athletics move at the same pace.",
        },
      },
      {
        title: { fr: "Le chrono de référence", en: "The benchmark time" },
        description: {
          fr: "Son 45.30 de saison confirme qu'il peut rejoindre le groupe des demi-touristes qui comptent en Afrique de l'Ouest.",
          en: "His 45.30 seasonal best confirms he can join the group of West Africa's key one-lap runners.",
        },
      },
      {
        title: { fr: "Le tour de piste comme déclaration", en: "The lap as a statement" },
        description: {
          fr: "Aux JOJ, il veut faire du 400m un récit de patience, de relance et de précision.",
          en: "At the YOG, he wants the 400m to become a story of patience, surging and precision.",
        },
      },
    ],
    achievements: [
      { fr: "45.30 SB", en: "45.30 SB" },
      { fr: "Champion WAAC junior", en: "WAAC junior champion" },
    ],
  },
  "manuela-eyenga": {
    country: { fr: "Cameroun", en: "Cameroon" },
    discipline: { fr: "Triple saut", en: "Triple jump" },
    bio: {
      fr: "Athlète de Yaoundé, révélation africaine du triple saut.",
      en: "From Yaoundé, an African triple jump revelation.",
    },
    story: [
      {
        title: { fr: "Les trois appuis de Yaoundé", en: "Yaoundé's three steps" },
        description: {
          fr: "Très vite, Manuela trouve dans le triple saut une discipline qui récompense l'audace et la coordination.",
          en: "Manuela quickly finds in the triple jump an event that rewards daring and coordination.",
        },
      },
      {
        title: { fr: "Le cap des 13,85 m", en: "The 13.85m mark" },
        description: {
          fr: "Sa marque à 13,85 m, puis son or aux Jeux de la Francophonie, l'installent dans le paysage africain.",
          en: "Her 13.85m mark, followed by Francophonie Games gold, establishes her on the African scene.",
        },
      },
      {
        title: { fr: "Bondir pour aller plus loin", en: "Jumping further" },
        description: {
          fr: "À Dakar, elle cherche moins à forcer qu'à glisser, déplier et conclure avec une netteté de championne.",
          en: "In Dakar, she aims less to force than to glide, unfold and finish with champion-like precision.",
        },
      },
    ],
    achievements: [
      { fr: "13.85m à 18 ans", en: "13.85m at 18" },
      { fr: "Or Jeux de la Francophonie", en: "Francophonie Games gold" },
    ],
  },
  "anis-benhassi": {
    country: { fr: "Algérie", en: "Algeria" },
    discipline: { fr: "1500m", en: "1500m" },
    bio: {
      fr: "Coureur de demi-fond formé à Alger, héritier de la tradition Morceli.",
      en: "A middle-distance runner trained in Algiers, heir to the Morceli tradition.",
    },
    story: [
      {
        title: { fr: "Le rythme d'Alger", en: "Algiers' rhythm" },
        description: {
          fr: "Anis se construit sur des courses au tempo exigeant, là où le demi-fond algérien aime les allures tranchantes.",
          en: "Anis is built on demanding-paced races, where Algerian middle-distance running loves sharp tempo.",
        },
      },
      {
        title: { fr: "Le seuil des 3:38", en: "The 3:38 threshold" },
        description: {
          fr: "Le 3:38 sur 1500m valide un vrai passage au niveau supérieur, entre maturité tactique et vitesse de finition.",
          en: "A 3:38 1500m confirms a true step up, between tactical maturity and finishing speed.",
        },
      },
      {
        title: { fr: "Rester fidèle au geste", en: "Staying true to the gesture" },
        description: {
          fr: "À Dakar, il veut courir juste, sans excès, pour rappeler que le demi-fond est aussi une science.",
          en: "In Dakar, he wants to run cleanly, without excess, to remind us that middle-distance is also a science.",
        },
      },
    ],
    achievements: [
      { fr: "3:38 sur 1500m", en: "3:38 in 1500m" },
      { fr: "Champion arabe juniors", en: "Arab junior champion" },
    ],
  },
  "neema-mwangaza": {
    country: { fr: "Tanzanie", en: "Tanzania" },
    discipline: { fr: "Marathon", en: "Marathon" },
    bio: {
      fr: "Coureuse de fond du Kilimandjaro, espoir tanzanien du marathon.",
      en: "A long-distance runner from Kilimanjaro, Tanzania's marathon hope.",
    },
    story: [
      {
        title: { fr: "Les longues sorties", en: "Long runs" },
        description: {
          fr: "Les routes de montagne autour du Kilimandjaro forgent chez Neema une patience rare sur les distances longues.",
          en: "The mountain roads around Kilimanjaro forge rare patience in Neema over long distances.",
        },
      },
      {
        title: { fr: "La promesse du marathon", en: "The marathon promise" },
        description: {
          fr: "Son marathon junior en 2:32 envoie le signal d'une athlète capable de tenir et de repartir jusqu'au bout.",
          en: "Her 2:32 junior marathon sends the signal of an athlete who can hold on and surge all the way through.",
        },
      },
      {
        title: { fr: "Le tempo du désert et du vent", en: "The tempo of desert and wind" },
        description: {
          fr: "À Dakar, elle arrive pour transformer chaque kilomètre en épreuve de lucidité et de courage.",
          en: "In Dakar, she arrives to turn each kilometer into a test of clarity and courage.",
        },
      },
    ],
    achievements: [
      { fr: "2:32 marathon junior", en: "2:32 junior marathon" },
      { fr: "Top 5 Mondiaux cross", en: "Top 5 at World Cross Country" },
    ],
  },
  "joseph-okello": {
    country: { fr: "Ouganda", en: "Uganda" },
    discipline: { fr: "10000m", en: "10000m" },
    bio: {
      fr: "Disciple de Cheptegei, coureur ougandais des longues distances.",
      en: "A disciple of Cheptegei, a Ugandan long-distance runner.",
    },
    story: [
      {
        title: { fr: "Les grands fonds d'Ouganda", en: "Uganda's deep end" },
        description: {
          fr: "Joseph se construit sur des sorties très longues où l'endurance est pensée comme un métier.",
          en: "Joseph is built on very long outings where endurance is treated like a profession.",
        },
      },
      {
        title: { fr: "Sous les 28 minutes", en: "Under 28 minutes" },
        description: {
          fr: "Le chrono de 27:50 sur 10000m révèle un coureur capable de tenir le meilleur tempo continental.",
          en: "A 27:50 10000m reveals a runner capable of holding the continent's best pace.",
        },
      },
      {
        title: { fr: "Faire parler les kilomètres", en: "Letting the kilometers speak" },
        description: {
          fr: "À Dakar, il veut faire du 10000m une leçon de régularité, de patience et de relance finale.",
          en: "In Dakar, he wants the 10000m to become a lesson in consistency, patience and a final surge.",
        },
      },
    ],
    achievements: [
      { fr: "27:50 sur 10000m", en: "27:50 in 10000m" },
      { fr: "Médaillé africain U20", en: "African U20 medalist" },
    ],
  },
  "yasmine-elmoutawakil": {
    country: { fr: "Maroc", en: "Morocco" },
    discipline: { fr: "400m haies", en: "400m hurdles" },
    bio: {
      fr: "Petite-nièce de la légende Nawal, elle perpétue l'héritage marocain.",
      en: "Nawal's grandniece, carrying the Moroccan legacy forward.",
    },
    story: [
      {
        title: { fr: "Le rythme des haies", en: "Hurdles rhythm" },
        description: {
          fr: "Les premières séances de haies lui donnent un sens du tempo qui deviendra sa signature technique.",
          en: "Her first hurdle sessions give her a sense of rhythm that becomes her technical signature.",
        },
      },
      {
        title: { fr: "Le nom qui revient", en: "The name returns" },
        description: {
          fr: "Sa victoire aux Jeux Africains juniors relance le récit d'une famille marocaine liée à la grandeur de la piste.",
          en: "Her African Youth Games victory rekindles the story of a Moroccan family tied to track greatness.",
        },
      },
      {
        title: { fr: "Tracer sa propre ligne", en: "Drawing her own line" },
        description: {
          fr: "À Dakar, Yasmine veut que le nom compte moins que la course, et que la course dise tout.",
          en: "In Dakar, Yasmine wants the name to matter less than the race, and the race to say everything.",
        },
      },
    ],
    achievements: [
      { fr: "Or Jeux Africains juniors", en: "African Youth Games gold" },
      { fr: "Sub 56s sur 400m haies", en: "Sub-56s in 400m hurdles" },
    ],
  },
};

export const PODCAST_COPY: Record<string, LocalizedPodcast> = {
  "ep-1": {
    title: {
      fr: "Amina, sprinteuse de Dakar",
      en: "Amina, the sprinter from Dakar",
    },
    subtitle: { fr: "Amina Diallo", en: "Amina Diallo" },
    description: {
      fr: "Du sable de Yoff aux pistes mondiales : le récit intime d'une jeune sprinteuse face aux JOJ.",
      en: "From Yoff's sand to the world tracks: the intimate story of a young sprinter facing the YOG.",
    },
  },
  "ep-2": {
    title: { fr: "Iten, l'usine à champions", en: "Iten, the champions factory" },
    subtitle: { fr: "Kipchoge Rotich", en: "Kipchoge Rotich" },
    description: {
      fr: "Au cœur du village kényan qui forme les meilleurs coureurs de fond du monde.",
      en: "Inside the Kenyan village that shapes the world's best distance runners.",
    },
  },
  "ep-3": {
    title: { fr: "Hériter de Nawal", en: "Inheriting Nawal" },
    subtitle: { fr: "Yasmine El Moutawakil", en: "Yasmine El Moutawakil" },
    description: {
      fr: "Porter un nom de légende et tracer sa propre voie sur 400m haies.",
      en: "Carrying a legendary name while carving your own path in the 400m hurdles.",
    },
  },
  "ep-4": {
    title: { fr: "Ma fille, ma championne", en: "My daughter, my champion" },
    subtitle: { fr: "Famille Eyenga", en: "Eyenga family" },
    description: {
      fr: "La voix d'une mère camerounaise qui a tout sacrifié pour le rêve olympique de sa fille.",
      en: "The voice of a Cameroonian mother who sacrificed everything for her daughter's Olympic dream.",
    },
  },
  "ep-5": {
    title: { fr: "Coach Mamadou : forger les talents", en: "Coach Mamadou: forging talent" },
    subtitle: { fr: "Mamadou Sy", en: "Mamadou Sy" },
    description: {
      fr: "Trente ans d'entraînement à Dakar, par celui qui a vu naître plusieurs générations.",
      en: "Thirty years of coaching in Dakar, from the man who has seen several generations emerge.",
    },
  },
  "ep-6": {
    title: { fr: "1960, l'année Bikila", en: "1960, Bikila's year" },
    subtitle: { fr: "Archives", en: "Archives" },
    description: {
      fr: "Retour sur la victoire pieds nus d'Abebe Bikila à Rome, premier or olympique africain.",
      en: "A look back at Abebe Bikila's barefoot victory in Rome, Africa's first Olympic gold.",
    },
  },
};

export const VIDEO_COPY: Record<string, LocalizedVideo> = {
  v1: {
    title: { fr: "Cérémonie d'ouverture", en: "Opening ceremony" },
    subtitle: { fr: "Stade Léopold-Sédar-Senghor", en: "Léopold Sédar Senghor Stadium" },
    description: {
      fr: "Une ouverture lumineuse qui installe tout de suite la promesse d'un rendez-vous historique pour la jeunesse africaine.",
      en: "A luminous opening that immediately sets the promise of a historic gathering for African youth.",
    },
  },
  v2: {
    title: { fr: "Amina Diallo : la course d'une vie", en: "Amina Diallo: the race of a lifetime" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Amina raconte le travail invisible derrière ses départs explosifs, ses séances de vitesse et le poids d'un public attendu à Dakar.",
      en: "Amina tells the invisible work behind her explosive starts, speed sessions and the weight of a crowd waiting in Dakar.",
    },
  },
  v3: {
    title: { fr: "Coulisses du village olympique", en: "Inside the Olympic village" },
    subtitle: { fr: "Reportage", en: "Report" },
    description: {
      fr: "Des chambres aux espaces de récupération, un regard intime sur la vie collective des athlètes entre deux compétitions.",
      en: "From rooms to recovery spaces, an intimate look at athletes' shared life between competitions.",
    },
  },
  v4: {
    title: { fr: "Top 10 moments forts — Jour 1", en: "Top 10 highlights - Day 1" },
    subtitle: { fr: "Highlights", en: "Highlights" },
    description: {
      fr: "Le condensé des premiers exploits, des départs nerveux aux premières célébrations sous les tribunes.",
      en: "A digest of the first feats, from nervous starts to early celebrations in the stands.",
    },
  },
  v5: {
    title: { fr: "Iten, fabrique des champions", en: "Iten, a champions factory" },
    subtitle: { fr: "Au cœur du Kenya", en: "In the heart of Kenya" },
    description: {
      fr: "Un portrait du village de l'endurance où Kipchoge Rotich et tant d'autres apprennent à courir longtemps et juste.",
      en: "A portrait of the endurance village where Kipchoge Rotich and many others learn to run long and run right.",
    },
  },
  v6: {
    title: { fr: "Triple saut féminin — Finale", en: "Women's triple jump - Final" },
    subtitle: { fr: "Action complète", en: "Full action" },
    description: {
      fr: "La finale filmée au plus près, avec l'énergie du stade et la précision des enchaînements en phase d'appel.",
      en: "The final filmed up close, with stadium energy and the precision of the approach phase.",
    },
  },
  v7: {
    title: { fr: "Dans le sac d'un sprinteur", en: "Inside a sprinter's bag" },
    subtitle: { fr: "Coulisses", en: "Behind the scenes" },
    description: {
      fr: "Les petits objets, les rituels et les habitudes qui suivent un sprinteur jusqu'à la ligne de départ.",
      en: "The little objects, rituals and habits that follow a sprinter to the starting line.",
    },
  },
  v8: {
    title: { fr: "L'hymne sénégalais sur le podium", en: "The Senegalese anthem on the podium" },
    subtitle: { fr: "Cérémonie", en: "Ceremony" },
    description: {
      fr: "Un moment suspendu où la salle retient son souffle avant que le drapeau et l'hymne prennent toute la place.",
      en: "A suspended moment when the stadium holds its breath before the flag and anthem take over.",
    },
  },
  v9: {
    title: { fr: "Tigist Bekele : le souffle des plateaux", en: "Tigist Bekele: breath of the highlands" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Tigist raconte la discipline silencieuse, les kilomètres du matin et la promesse d'une grande finale éthiopienne.",
      en: "Tigist speaks about silent discipline, early morning kilometers and the promise of a great Ethiopian final.",
    },
  },
  v10: {
    title: { fr: "Chinedu Okafor : l'appel du sable", en: "Chinedu Okafor: the call of the sand" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "De Lagos à Dakar, un récit de puissance, de précision et de confiance dans l'instant de l'appel.",
      en: "From Lagos to Dakar, a story of power, precision and trust in the moment of takeoff.",
    },
  },
  v11: {
    title: { fr: "Kouamé Yao : l'éclair d'Abidjan", en: "Kouamé Yao: Abidjan lightning" },
    subtitle: { fr: "Portrait documentaire", en: "Documentary portrait" },
    description: {
      fr: "La vitesse ivoirienne racontée à hauteur d'épaules, entre départs nerveux et relances qui claquent.",
      en: "Ivorian speed told at shoulder height, between nervous starts and explosive accelerations.",
    },
  },
  v12: {
    title: { fr: "Naledi Khumalo : s'élever plus haut", en: "Naledi Khumalo: rising higher" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Un film sur l'art de trouver la bonne impulsion, de la piste scolaire aux grands concours internationaux.",
      en: "A film about finding the right takeoff, from school tracks to major international meets.",
    },
  },
  v13: {
    title: { fr: "Kofi Mensah : le tour parfait", en: "Kofi Mensah: the perfect lap" },
    subtitle: { fr: "Portrait documentaire", en: "Documentary portrait" },
    description: {
      fr: "Kofi explique comment il fait dialoguer études, entraînement et maîtrise du 400m dans la même journée.",
      en: "Kofi explains how he balances studies, training and 400m mastery in the same day.",
    },
  },
  v14: {
    title: { fr: "Anis Benhassi : le tempo du 1500m", en: "Anis Benhassi: the 1500m tempo" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Un portrait sur l'intelligence de course, la gestion de l'effort et le sens du dernier virage.",
      en: "A portrait of racing intelligence, energy management and the meaning of the final bend.",
    },
  },
  v15: {
    title: { fr: "Neema Mwangaza : 42 kilomètres de patience", en: "Neema Mwangaza: 42 kilometers of patience" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Des routes du Kilimandjaro aux grands marathons, Neema raconte le calme, le souffle et la persévérance.",
      en: "From Kilimanjaro roads to major marathons, Neema speaks about calm, breath and perseverance.",
    },
  },
  v16: {
    title: { fr: "Joseph Okello : mémoire du fond", en: "Joseph Okello: memory of the distance" },
    subtitle: { fr: "Portrait documentaire", en: "Documentary portrait" },
    description: {
      fr: "Joseph parle des longues sorties, du tempo en groupe et de la patience qui construit les grands 10 000m.",
      en: "Joseph talks about long runs, group tempo and the patience that builds great 10,000m races.",
    },
  },
  v17: {
    title: { fr: "Yasmine El Moutawakil : héritage et ligne droite", en: "Yasmine El Moutawakil: heritage and straight line" },
    subtitle: { fr: "Mini-documentaire", en: "Mini documentary" },
    description: {
      fr: "Yasmine révèle le poids d'un nom, la liberté d'en faire sa propre histoire et la précision des haies.",
      en: "Yasmine reveals the weight of a name, the freedom to make it her own story and the precision of the hurdles.",
    },
  },
};

export const TIMELINE_COPY: Record<string, LocalizedTimeline> = {
  "1960": {
    title: { fr: "Abebe Bikila, pieds nus à Rome", en: "Abebe Bikila, barefoot in Rome" },
    description: { fr: "Premier athlète africain champion olympique : un marathon mythique couru sans chaussures.", en: "The first African Olympic champion: a mythical marathon run without shoes." },
    takeaway: { fr: "Le succès montre au monde qu'un athlète africain peut viser l'or olympique.", en: "The victory shows the world that an African athlete can aim for Olympic gold." },
  },
  "1968": {
    title: { fr: "Kip Keino bat Jim Ryun", en: "Kip Keino beats Jim Ryun" },
    description: { fr: "Le Kenya entre dans l'histoire de la course de demi-fond aux Jeux de Mexico.", en: "Kenya enters middle-distance history at the Mexico Games." },
    takeaway: { fr: "La vitesse africaine devient une force mondiale reconnue.", en: "African speed becomes a globally recognized force." },
  },
  "1984": {
    title: { fr: "Nawal El Moutawakil, première", en: "Nawal El Moutawakel, the first" },
    description: { fr: "Première femme arabe et africaine championne olympique sur 400m haies.", en: "The first Arab and African woman Olympic champion in the 400m hurdles." },
    takeaway: { fr: "Une porte s'ouvre pour des générations de sportives africaines.", en: "A door opens for generations of African sportswomen." },
  },
  "1991": {
    title: { fr: "Naissance de la CAA moderne", en: "The modern CAA is born" },
    description: { fr: "La Confédération Africaine d'Athlétisme structure le sport sur tout le continent.", en: "The African Athletics Confederation structures the sport across the continent." },
    takeaway: { fr: "La gouvernance continentale se professionnalise.", en: "Continental governance becomes more professional." },
  },
  "1995": {
    title: { fr: "Haile Gebrselassie, l'empereur", en: "Haile Gebrselassie, the emperor" },
    description: { fr: "Premier record du monde sur 5000m d'une longue dynastie éthiopienne.", en: "First world record over 5000m in a long Ethiopian dynasty." },
    takeaway: { fr: "L'Éthiopie confirme sa mainmise sur le fond.", en: "Ethiopia confirms its grip on distance running." },
  },
  "2008": {
    title: { fr: "Tirunesh Dibaba, doublé d'or", en: "Tirunesh Dibaba, golden double" },
    description: { fr: "Doublé olympique 5000m / 10000m à Pékin, performance historique.", en: "Olympic 5000m / 10000m double in Beijing, a historic performance." },
    takeaway: { fr: "La légende féminine du fond se renforce encore.", en: "The women's distance-running legend grows stronger." },
  },
  "2016": {
    title: { fr: "Wayde van Niekerk pulvérise le 400m", en: "Wayde van Niekerk shatters the 400m" },
    description: { fr: "43.03 à Rio : un record du monde qui résiste depuis près de 30 ans est balayé.", en: "43.03 in Rio: a world record that had stood for nearly 30 years is swept away." },
    takeaway: { fr: "Le tour de piste entre dans une nouvelle ère.", en: "The one-lap race enters a new era." },
  },
  "2019": {
    title: { fr: "Eliud Kipchoge sous les 2h", en: "Eliud Kipchoge under 2 hours" },
    description: { fr: "Le Kényan devient le premier humain à courir un marathon en moins de 2 heures.", en: "The Kenyan becomes the first human to run a marathon in under two hours." },
    takeaway: { fr: "L'endurance humaine franchit une frontière symbolique.", en: "Human endurance crosses a symbolic frontier." },
  },
  "2023": {
    title: { fr: "Faith Kipyegon triple record", en: "Faith Kipyegon triple record" },
    description: { fr: "Trois records du monde en six semaines : 1500m, mile et 5000m.", en: "Three world records in six weeks: 1500m, mile and 5000m." },
    takeaway: { fr: "La demi-fond africaine touche une forme de perfection.", en: "African middle-distance running reaches a kind of perfection." },
  },
  "2026": {
    title: { fr: "JOJ Dakar, première en Afrique", en: "Dakar YOG, first in Africa" },
    description: { fr: "Pour la première fois, les Jeux Olympiques de la Jeunesse se tiennent sur le continent africain.", en: "For the first time, the Youth Olympic Games are held on African soil." },
    takeaway: { fr: "Le continent accueille enfin les JOJ sur son sol.", en: "The continent finally hosts the YOG on its own soil." },
  },
};

export const JOJ_COPY: Record<string, LocalizedTimeline> = {
  "2010-singapour": {
    city: { fr: "Singapour", en: "Singapore" },
    title: { fr: "Première édition des JOJ", en: "First YOG edition" },
    description: { fr: "Le mouvement prend vie dans une ville-laboratoire où sport, culture et apprentissage avancent ensemble.", en: "The movement comes alive in a laboratory city where sport, culture and learning move together." },
    detail: { fr: "À Singapour, les Jeux olympiques de la jeunesse installent leur identité: compétition de haut niveau, formats pédagogiques et scène culturelle pensée pour les adolescents du monde entier.", en: "In Singapore, the Youth Olympic Games establish their identity: high-level competition, educational formats and a cultural stage designed for teenagers worldwide." },
    takeaway: { fr: "Le modèle des JOJ est lancé comme un rendez-vous global pour la jeunesse.", en: "The YOG model is launched as a global gathering for youth." },
  },
  "2012-innsbruck": {
    city: { fr: "Innsbruck", en: "Innsbruck" },
    title: { fr: "Les JOJ d'hiver s'installent", en: "Winter YOG settle in" },
    description: { fr: "Le format s'étend à la glace et à la montagne, avec la même ambition éducative que sur la piste.", en: "The format expands to ice and mountains, with the same educational ambition as on the track." },
    detail: { fr: "À Innsbruck, l'univers des JOJ s'élargit: les sports d'hiver rejoignent la narration du mouvement, et la dimension d'accompagnement des jeunes athlètes devient plus visible.", en: "In Innsbruck, the YOG universe widens: winter sports join the movement's story, and support for young athletes becomes more visible." },
    takeaway: { fr: "Les JOJ deviennent un format d'été et d'hiver, avec une même philosophie.", en: "The YOG become a summer and winter format with the same philosophy." },
  },
  "2014-nanjing": {
    city: { fr: "Nankin", en: "Nanjing" },
    title: { fr: "Le laboratoire s'amplifie", en: "The laboratory grows" },
    description: { fr: "Le rendez-vous gagne en ampleur et confirme que les JOJ sont aussi un espace d'éducation et de mixité.", en: "The event grows in scale and confirms the YOG as a space for education and diversity." },
    detail: { fr: "Nanjing consolide l'idée d'un événement où la performance, la découverte culturelle et l'échange entre délégations comptent autant que les médailles.", en: "Nanjing reinforces the idea of an event where performance, cultural discovery and exchange between delegations matter as much as medals." },
    takeaway: { fr: "L'événement prend une vraie dimension de festival mondial de la jeunesse.", en: "The event takes on the feel of a true global youth festival." },
  },
  "2018-buenos-aires": {
    city: { fr: "Buenos Aires", en: "Buenos Aires" },
    title: { fr: "La ville devient scène", en: "The city becomes a stage" },
    description: { fr: "Les JOJ se rapprochent du rythme des grandes métropoles et renforcent les formats mixtes et collaboratifs.", en: "The YOG move closer to the rhythm of major cities and strengthen mixed, collaborative formats." },
    detail: { fr: "À Buenos Aires, le décor urbain et l'intensité des jeunes athlètes donnent aux JOJ une énergie plus festive, plus rapide, plus ouverte aux nouvelles formes de narration.", en: "In Buenos Aires, the urban setting and intensity of young athletes give the YOG a more festive, faster energy, open to new storytelling forms." },
    takeaway: { fr: "La jeunesse olympique trouve un langage visuel plus moderne et plus urbain.", en: "Olympic youth finds a more modern, urban visual language." },
  },
  "2020-lausanne": {
    city: { fr: "Lausanne", en: "Lausanne" },
    title: { fr: "L'héritage d'hiver à Lausanne", en: "Winter legacy in Lausanne" },
    description: { fr: "La version hivernale poursuit le récit des JOJ avec une attention plus forte au développement durable.", en: "The winter edition continues the YOG story with a stronger focus on sustainability." },
    detail: { fr: "Lausanne rappelle que les JOJ ne sont pas qu'une compétition: ils portent aussi une manière de penser l'avenir, les infrastructures et l'accompagnement des athlètes après l'événement.", en: "Lausanne reminds us that the YOG are not just competition: they also carry a way of thinking about the future, infrastructure and athlete support beyond the event." },
    takeaway: { fr: "Le développement durable devient une partie centrale du récit.", en: "Sustainability becomes a central part of the story." },
  },
  "2022-dakar": {
    city: { fr: "Dakar", en: "Dakar" },
    title: { fr: "Dakar entre dans l'histoire", en: "Dakar enters history" },
    description: { fr: "Le CIO attribue les JOJ à Dakar, première ville africaine désignée pour accueillir l'événement.", en: "The IOC awards the YOG to Dakar, the first African city chosen to host the event." },
    detail: { fr: "L'attribution à Dakar est un tournant symbolique majeur: elle ouvre enfin la porte à une édition olympique de la jeunesse sur le continent africain et prépare un récit inédit pour la génération montante.", en: "Awarding the YOG to Dakar is a major symbolic turning point: it finally opens the door to a Youth Olympic edition on African soil and prepares a new story for the rising generation." },
    takeaway: { fr: "L'Afrique gagne sa place au centre de la carte olympique de la jeunesse.", en: "Africa takes its place at the center of the Youth Olympic map." },
  },
  "2026-dakar": {
    city: { fr: "Dakar", en: "Dakar" },
    title: { fr: "Les premiers JOJ en Afrique", en: "The first YOG in Africa" },
    description: { fr: "Le rendez-vous devient réel: Dakar accueille la jeunesse olympique pour la première fois sur le continent.", en: "The event becomes real: Dakar welcomes the Olympic youth for the first time on the continent." },
    detail: { fr: "En 2026, Dakar transforme la promesse en expérience collective: une ville-hôte, des athlètes venus de tout le continent et un événement qui ancre définitivement les JOJ dans la mémoire africaine.", en: "In 2026, Dakar turns promise into a collective experience: a host city, athletes from across the continent and an event that firmly anchors the YOG in African memory." },
    takeaway: { fr: "Le continent accueille enfin son propre moment olympique de la jeunesse.", en: "The continent finally hosts its own Olympic youth moment." },
  },
};

export const ROOM_COPY: Record<string, LocalizedRoom> = {
  "01": {
    title: { fr: "Galerie des Athlètes", en: "Athletes Gallery" },
    desc: { fr: "Portraits intimes de la jeunesse africaine qui marche vers Dakar 2026.", en: "Intimate portraits of African youth heading toward Dakar 2026." },
  },
  "02": {
    title: { fr: "Histoire de l'Athlétisme", en: "Athletics History" },
    desc: { fr: "De Bikila à Kipchoge : six décennies de gloire africaine.", en: "From Bikila to Kipchoge: six decades of African greatness." },
  },
  "03": {
    title: { fr: "Carte Afrique Live", en: "Live Africa Map" },
    desc: { fr: "Suivez en temps réel les performances des 55 nations du continent.", en: "Follow the performances of the continent's 55 nations in real time." },
  },
  "04": {
    title: { fr: "Studio Podcast", en: "Podcast Studio" },
    desc: { fr: "Entrez dans la voix des athlètes, des familles et des entraîneurs.", en: "Enter the voices of athletes, families and coaches." },
  },
  "05": {
    title: { fr: "Galerie Vidéo JOJ", en: "YOG Video Gallery" },
    desc: { fr: "Moments forts, coulisses et mini-documentaires des JOJ Dakar.", en: "Highlights, behind the scenes and mini documentaries from Dakar YOG." },
  },
  "06": {
    title: { fr: "Archive Permanente", en: "Permanent Archive" },
    desc: { fr: "Une mémoire vivante qui restera bien après les Jeux.", en: "A living memory that will remain long after the Games." },
  },
};

export function localizeAthlete(athlete: {
  id: string;
  country: string;
  discipline: string;
  bio: string;
  story: { year: string; title: string; description: string }[];
  achievements?: string[];
}, language: AppLanguage) {
  const copy = ATHLETE_COPY[athlete.id];
  if (language !== "EN" || !copy) {
    return {
      ...athlete,
      country: athlete.country,
      discipline: athlete.discipline,
      bio: athlete.bio,
      story: athlete.story,
      achievements: athlete.achievements ?? [],
    };
  }

  return {
    ...athlete,
    country: pick(language, copy.country),
    discipline: pick(language, copy.discipline),
    bio: pick(language, copy.bio),
    story: athlete.story.map((step, index) => ({
      ...step,
      title: pick(language, copy.story[index]?.title ?? { fr: step.title, en: step.title }),
      description: pick(language, copy.story[index]?.description ?? { fr: step.description, en: step.description }),
    })),
    achievements: copy.achievements
      ? copy.achievements.map((achievement) => pick(language, achievement))
      : athlete.achievements ?? [],
  };
}

export function localizePodcast(podcast: {
  id: string;
  title: string;
  athleteName: string;
  description: string;
}, language: AppLanguage) {
  const copy = PODCAST_COPY[podcast.id];
  if (language !== "EN" || !copy) {
    return podcast;
  }

  return {
    ...podcast,
    title: pick(language, copy.title),
    description: pick(language, copy.description),
    athleteName: pick(language, copy.subtitle),
  };
}

export function localizeVideo(video: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cat: string;
  duration: string;
  image: string;
  badge?: string;
}, language: AppLanguage) {
  const copy = VIDEO_COPY[video.id];
  if (language !== "EN" || !copy) {
    return video;
  }

  return {
    ...video,
    title: pick(language, copy.title),
    subtitle: pick(language, copy.subtitle),
    description: pick(language, copy.description),
  };
}

export function localizeTimelineEvent(event: {
  id: string;
  year: number;
  title: string;
  description: string;
  country: string;
}, language: AppLanguage) {
  const copy = TIMELINE_COPY[event.id];
  if (language !== "EN" || !copy) {
    return event;
  }

  return {
    ...event,
    title: pick(language, copy.title),
    description: pick(language, copy.description),
  };
}

export function localizeJojMilestone(event: {
  id: string;
  year: string;
  city: string;
  title: string;
  description: string;
  detail: string;
  takeaway: string;
}, language: AppLanguage) {
  const copy = JOJ_COPY[event.id];
  if (language !== "EN" || !copy) {
    return event;
  }

  return {
    ...event,
    title: pick(language, copy.title),
    description: pick(language, copy.description),
    detail: copy.detail ? pick(language, copy.detail) : event.detail,
    city: copy.city ? pick(language, copy.city) : event.city,
    takeaway: pick(language, copy.takeaway),
  };
}

export function localizeRoom(room: {
  num: string;
  path: string;
  title: string;
  desc: string;
}, language: AppLanguage) {
  const copy = ROOM_COPY[room.num];
  if (language !== "EN" || !copy) {
    return room;
  }

  return {
    ...room,
    title: pick(language, copy.title),
    desc: pick(language, copy.desc),
  };
}

export function getLocalizedTab(label: string, index: number, language: AppLanguage) {
  const localized = PAGE_COPY.videos.tabs[index];
  if (language === "EN" && localized) return localized.en;
  return label;
}

function applyWolofFallback(value: unknown): void {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) {
      applyWolofFallback(item);
    }
    return;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.fr === "string" && typeof record.en === "string" && record.wo === undefined) {
    record.wo = record.fr;
  }

  if (typeof record.fr === "string" && typeof record.en === "string") {
    record.FR = record.fr;
    record.EN = record.en;
    record.WO = typeof record.wo === "string" ? record.wo : record.fr;
  }

  for (const child of Object.values(record)) {
    applyWolofFallback(child);
  }
}

applyWolofFallback(COMMON_COPY);
applyWolofFallback(PAGE_COPY);
applyWolofFallback(ATHLETE_COPY);
applyWolofFallback(PODCAST_COPY);
applyWolofFallback(VIDEO_COPY);
applyWolofFallback(TIMELINE_COPY);
applyWolofFallback(JOJ_COPY);
applyWolofFallback(ROOM_COPY);
