import aminaImg from "@/assets/athletes/amina-diallo.jpg";
import kipchogeImg from "@/assets/athletes/kipchoge-rotich.jpg";
import tigistImg from "@/assets/athletes/tigist-bekele.jpg";
import chineduImg from "@/assets/athletes/chinedu-okafor.jpg";
import yasmineImg from "@/assets/athletes/yasmine-elmoutawakil.jpg";
import kouameImg from "@/assets/athletes/kouame-yao.jpg";
import naledImg from "@/assets/athletes/naledi-khumalo.jpg";
import kofiImg from "@/assets/athletes/kofi-mensah.jpg";
import manuelaImg from "@/assets/athletes/manuela-eyenga.jpg";
import anisImg from "@/assets/athletes/anis-benhassi.jpg";
import neemaImg from "@/assets/athletes/neema-mwangaza.jpg";
import josephImg from "@/assets/athletes/joseph-okello.jpg";

import pod1 from "@/assets/podcasts/cover-1.jpg";
import pod2 from "@/assets/podcasts/cover-2.jpg";
import pod3 from "@/assets/podcasts/cover-3.jpg";
import pod4 from "@/assets/podcasts/cover-4.jpg";
import pod5 from "@/assets/podcasts/cover-5.jpg";
import pod6 from "@/assets/podcasts/cover-6.jpg";

import v1 from "@/assets/videos/v1.jpg";
import v2 from "@/assets/videos/v2.jpg";
import v3 from "@/assets/videos/v3.jpg";
import v4 from "@/assets/videos/v4.jpg";
import v5 from "@/assets/videos/v5.jpg";
import v6 from "@/assets/videos/v6.jpg";
import v7 from "@/assets/videos/v7.jpg";
import v8 from "@/assets/videos/v8.jpg";

export type Athlete = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  discipline: string;
  gender: "M" | "F";
  bio: string;
  story: AthleteChapter[];
  achievements: string[];
  documentaryVideoIds?: string[];
  podcastId?: string;
  image: string;
};

export type AthleteChapter = {
  year: string;
  title: string;
  description: string;
};

export type PodcastEpisode = {
  id: string;
  number: number;
  title: string;
  athleteName: string;
  athleteId?: string;
  description: string;
  duration: string;
  category: "Interview" | "Famille" | "Entraîneur" | "Histoire";
  date: string;
  cover: string;
};

export type TimelineEvent = {
  id: string;
  year: number;
  title: string;
  description: string;
  country: string;
};

export type LiveResult = {
  id: string;
  discipline: string;
  athlete: string;
  country: string;
  flag: string;
  performance: string;
  medal: "gold" | "silver" | "bronze" | null;
};

export type VideoItem = {
  id: string;
  title: string;
  subtitle: string;
  cat: "Cérémonies" | "Documentaire" | "Coulisses" | "Moments forts";
  duration: string;
  image: string;
  description: string;
  badge?: "NOUVEAU" | "LIVE";
};

export type JojMilestone = {
  id: string;
  year: string;
  city: string;
  title: string;
  description: string;
  detail: string;
  takeaway: string;
};

export const ATHLETES: Athlete[] = [
  {
    id: "amina-diallo",
    name: "Amina Diallo",
    country: "Sénégal",
    countryCode: "SN",
    flag: "🇸🇳",
    discipline: "200m",
    gender: "F",
    bio: "Sprinteuse prodige formée à Dakar, espoir des JOJ 2026 sur sa terre natale.",
    story: [
      {
        year: "2015",
        title: "Premières foulées à Yoff",
        description:
          "Sur les pistes improvisées du littoral dakarois, Amina apprend très tôt à aimer la vitesse et le départ lancé.",
      },
      {
        year: "2022",
        title: "Révélation chez les U18",
        description:
          "Ses chronos chutent et son nom circule dans les sélections nationales après une saison où chaque finale ressemble à un déclic.",
      },
      {
        year: "2026",
        title: "Visage d'un pays hôte",
        description:
          "À Dakar, elle devient l'un des symboles de la jeunesse sénégalaise qui court devant son public.",
      },
    ],
    achievements: [
      "Championne d'Afrique U18 2024",
      "Record national U20 200m",
      "Sélection JOJ Dakar 2026",
    ],
    documentaryVideoIds: ["v2"],
    podcastId: "ep-1",
    image: aminaImg,
  },
  {
    id: "kipchoge-rotich",
    name: "Kipchoge Rotich",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    discipline: "3000m steeple",
    gender: "M",
    bio: "Issu de l'Iten Valley, héritier de la dynastie kényane des coureurs de fond.",
    story: [
      {
        year: "2014",
        title: "Les pistes rouges d'Iten",
        description:
          "Dans la vallée mythique, Kipchoge s'initie aux longues sorties de groupe où le rythme se gagne autant qu'il se travaille.",
      },
      {
        year: "2021",
        title: "Entrée dans le circuit national",
        description:
          "Ses progrès sur le steeple le font monter rapidement dans les catégories d'âge et dans les radars des sélectionneurs.",
      },
      {
        year: "2026",
        title: "L'obsession du dernier obstacle",
        description:
          "À Dakar, il veut transformer son endurance en signature continentale sur un 3000m steeple très attendu.",
      },
    ],
    achievements: ["Or championnats africains juniors", "Sub 8:20 sur 3000m steeple"],
    documentaryVideoIds: ["v5"],
    podcastId: "ep-2",
    image: kipchogeImg,
  },
  {
    id: "tigist-bekele",
    name: "Tigist Bekele",
    country: "Éthiopie",
    countryCode: "ET",
    flag: "🇪🇹",
    discipline: "5000m",
    gender: "F",
    bio: "Originaire des hauts plateaux d'Addis-Abeba, médaillée mondiale juniors.",
    story: [
      {
        year: "2016",
        title: "Des côtes qui parlent",
        description:
          "Tigist grandit sur les plateaux éthiopiens, où courir devient une évidence avant même d'être un projet.",
      },
      {
        year: "2023",
        title: "La marche vers les podiums",
        description:
          "Un record U20 sur 5000m confirme une maturité rare sur les distances où l'endurance gouverne tout.",
      },
      {
        year: "2026",
        title: "L'attente d'une grande finale",
        description:
          "Elle aborde Dakar avec l'idée de transformer une saison régulière en moment de bascule.",
      },
    ],
    achievements: ["Argent Mondiaux U20", "Record d'Éthiopie U20 5000m"],
    documentaryVideoIds: ["v9"],
    image: tigistImg,
  },
  {
    id: "chinedu-okafor",
    name: "Chinedu Okafor",
    country: "Nigeria",
    countryCode: "NG",
    flag: "🇳🇬",
    discipline: "Saut en longueur",
    gender: "M",
    bio: "Étoile montante du saut en longueur, formé à Lagos.",
    story: [
      {
        year: "2017",
        title: "Le déclic à Lagos",
        description:
          "Repéré dans les compétitions scolaires, Chinedu découvre très vite une trajectoire qui ne ressemble à aucune autre.",
      },
      {
        year: "2024",
        title: "Le cap des 8 mètres",
        description:
          "Ses 8,05 m à 17 ans le projettent dans un autre monde, celui des jeunes sauteurs qui changent le standard national.",
      },
      {
        year: "2026",
        title: "Sauter pour marquer l'histoire",
        description:
          "Aux JOJ Dakar, il incarne une génération nigériane qui veut allier puissance, technique et sang-froid.",
      },
    ],
    achievements: ["8.05m à 17 ans", "Champion national U20"],
    documentaryVideoIds: ["v10"],
    image: chineduImg,
  },
  {
    id: "kouame-yao",
    name: "Kouamé Yao",
    country: "Côte d'Ivoire",
    countryCode: "CI",
    flag: "🇨🇮",
    discipline: "100m",
    gender: "M",
    bio: "Sprinteur explosif d'Abidjan, suit les traces de Marie-Josée Ta Lou.",
    story: [
      {
        year: "2017",
        title: "Les départs d'Abidjan",
        description:
          "Sur des pistes encore rugueuses, Kouamé apprend à convertir l'explosivité naturelle en vraie mécanique de sprint.",
      },
      {
        year: "2024",
        title: "L'éclair ivoirien",
        description:
          "Le chrono de 10.18 le propulse parmi les noms suivis par les observateurs de la vitesse continentale.",
      },
      {
        year: "2026",
        title: "Courir au-dessus du bruit",
        description:
          "À Dakar, il veut prouver qu'un sprinteur ivoirien peut aussi contrôler le tempo d'une finale internationale.",
      },
    ],
    achievements: ["10.18 à 18 ans", "Champion ouest-africain U20"],
    documentaryVideoIds: ["v11"],
    image: kouameImg,
  },
  {
    id: "naledi-khumalo",
    name: "Naledi Khumalo",
    country: "Afrique du Sud",
    countryCode: "ZA",
    flag: "🇿🇦",
    discipline: "Saut en hauteur",
    gender: "F",
    bio: "Athlète zoulou polyvalente, recordwoman scolaire d'Afrique du Sud.",
    story: [
      {
        year: "2018",
        title: "Découverte de la hauteur",
        description:
          "Au lycée, Naledi transforme les concours scolaires en terrain d'expérimentation et de confiance.",
      },
      {
        year: "2023",
        title: "1,92 m comme promesse",
        description:
          "Le record scolaire à 1,92 m lui donne une stature nouvelle et attire les regards de la fédération sud-africaine.",
      },
      {
        year: "2026",
        title: "S'élever à Dakar",
        description:
          "Elle arrive aux JOJ avec la volonté de rendre chaque prise d'élan plus propre, plus légère et plus haute.",
      },
    ],
    achievements: ["1.92m à 17 ans", "Médaille Commonwealth Youth"],
    documentaryVideoIds: ["v12"],
    image: naledImg,
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    country: "Ghana",
    countryCode: "GH",
    flag: "🇬🇭",
    discipline: "400m",
    gender: "M",
    bio: "Espoir ghanéen du 400m, étudiant-athlète à l'Université d'Accra.",
    story: [
      {
        year: "2016",
        title: "Vitesse et études",
        description:
          "À Accra, Kofi construit un double parcours où les cours et l'athlétisme avancent au même rythme.",
      },
      {
        year: "2024",
        title: "Le chrono de référence",
        description:
          "Son 45.30 de saison confirme qu'il peut rejoindre le groupe des demi-touristes qui comptent en Afrique de l'Ouest.",
      },
      {
        year: "2026",
        title: "Le tour de piste comme déclaration",
        description:
          "Aux JOJ, il veut faire du 400m un récit de patience, de relance et de précision.",
      },
    ],
    achievements: ["45.30 SB", "Champion WAAC junior"],
    documentaryVideoIds: ["v13"],
    image: kofiImg,
  },
  {
    id: "manuela-eyenga",
    name: "Manuela Eyenga",
    country: "Cameroun",
    countryCode: "CM",
    flag: "🇨🇲",
    discipline: "Triple saut",
    gender: "F",
    bio: "Athlète de Yaoundé, révélation africaine du triple saut.",
    story: [
      {
        year: "2017",
        title: "Les trois appuis de Yaoundé",
        description:
          "Très vite, Manuela trouve dans le triple saut une discipline qui récompense l'audace et la coordination.",
      },
      {
        year: "2024",
        title: "Le cap des 13,85 m",
        description:
          "Sa marque à 13,85 m, puis son or aux Jeux de la Francophonie, l'installent dans le paysage africain.",
      },
      {
        year: "2026",
        title: "Bondir pour aller plus loin",
        description:
          "À Dakar, elle cherche moins à forcer qu'à glisser, déplier et conclure avec une netteté de championne.",
      },
    ],
    achievements: ["13.85m à 18 ans", "Or Jeux de la Francophonie"],
    documentaryVideoIds: ["v6"],
    podcastId: "ep-4",
    image: manuelaImg,
  },
  {
    id: "anis-benhassi",
    name: "Anis Benhassi",
    country: "Algérie",
    countryCode: "DZ",
    flag: "🇩🇿",
    discipline: "1500m",
    gender: "M",
    bio: "Coureur de demi-fond formé à Alger, héritier de la tradition Morceli.",
    story: [
      {
        year: "2017",
        title: "Le rythme d'Alger",
        description:
          "Anis se construit sur des courses au tempo exigeant, là où le demi-fond algérien aime les allures tranchantes.",
      },
      {
        year: "2024",
        title: "Le seuil des 3:38",
        description:
          "Le 3:38 sur 1500m valide un vrai passage au niveau supérieur, entre maturité tactique et vitesse de finition.",
      },
      {
        year: "2026",
        title: "Rester fidèle au geste",
        description:
          "À Dakar, il veut courir juste, sans excès, pour rappeler que le demi-fond est aussi une science.",
      },
    ],
    achievements: ["3:38 sur 1500m", "Champion arabe juniors"],
    documentaryVideoIds: ["v14"],
    image: anisImg,
  },
  {
    id: "neema-mwangaza",
    name: "Neema Mwangaza",
    country: "Tanzanie",
    countryCode: "TZ",
    flag: "🇹🇿",
    discipline: "Marathon",
    gender: "F",
    bio: "Coureuse de fond du Kilimandjaro, espoir tanzanien du marathon.",
    story: [
      {
        year: "2015",
        title: "Les longues sorties",
        description:
          "Les routes de montagne autour du Kilimandjaro forgent chez Neema une patience rare sur les distances longues.",
      },
      {
        year: "2024",
        title: "La promesse du marathon",
        description:
          "Son marathon junior en 2:32 envoie le signal d'une athlète capable de tenir et de repartir jusqu'au bout.",
      },
      {
        year: "2026",
        title: "Le tempo du désert et du vent",
        description:
          "À Dakar, elle arrive pour transformer chaque kilomètre en épreuve de lucidité et de courage.",
      },
    ],
    achievements: ["2:32 marathon junior", "Top 5 Mondiaux cross"],
    documentaryVideoIds: ["v15"],
    image: neemaImg,
  },
  {
    id: "joseph-okello",
    name: "Joseph Okello",
    country: "Ouganda",
    countryCode: "UG",
    flag: "🇺🇬",
    discipline: "10000m",
    gender: "M",
    bio: "Disciple de Cheptegei, coureur ougandais des longues distances.",
    story: [
      {
        year: "2016",
        title: "Les grands fonds d'Ouganda",
        description:
          "Joseph se construit sur des sorties très longues où l'endurance est pensée comme un métier.",
      },
      {
        year: "2024",
        title: "Sous les 28 minutes",
        description:
          "Le chrono de 27:50 sur 10000m révèle un coureur capable de tenir le meilleur tempo continental.",
      },
      {
        year: "2026",
        title: "Faire parler les kilomètres",
        description:
          "À Dakar, il veut faire du 10000m une leçon de régularité, de patience et de relance finale.",
      },
    ],
    achievements: ["27:50 sur 10000m", "Médaillé africain U20"],
    documentaryVideoIds: ["v16"],
    image: josephImg,
  },
  {
    id: "yasmine-elmoutawakil",
    name: "Yasmine El Moutawakil",
    country: "Maroc",
    countryCode: "MA",
    flag: "🇲🇦",
    discipline: "400m haies",
    gender: "F",
    bio: "Petite-nièce de la légende Nawal, elle perpétue l'héritage marocain.",
    story: [
      {
        year: "2018",
        title: "Le rythme des haies",
        description:
          "Les premières séances de haies lui donnent un sens du tempo qui deviendra sa signature technique.",
      },
      {
        year: "2024",
        title: "Le nom qui revient",
        description:
          "Sa victoire aux Jeux Africains juniors relance le récit d'une famille marocaine liée à la grandeur de la piste.",
      },
      {
        year: "2026",
        title: "Tracer sa propre ligne",
        description:
          "À Dakar, Yasmine veut que le nom compte moins que la course, et que la course dise tout.",
      },
    ],
    achievements: ["Or Jeux Africains juniors", "Sub 56s sur 400m haies"],
    documentaryVideoIds: ["v17"],
    podcastId: "ep-3",
    image: yasmineImg,
  },
];

export const PODCASTS: PodcastEpisode[] = [
  {
    id: "ep-1",
    number: 1,
    title: "Amina, sprinteuse de Dakar",
    athleteName: "Amina Diallo",
    athleteId: "amina-diallo",
    description:
      "Du sable de Yoff aux pistes mondiales : le récit intime d'une jeune sprinteuse face aux JOJ.",
    duration: "32 min",
    category: "Interview",
    date: "12 mars 2026",
    cover: pod1,
  },
  {
    id: "ep-2",
    number: 2,
    title: "Iten, l'usine à champions",
    athleteName: "Kipchoge Rotich",
    athleteId: "kipchoge-rotich",
    description: "Au cœur du village kényan qui forme les meilleurs coureurs de fond du monde.",
    duration: "41 min",
    category: "Histoire",
    date: "5 mars 2026",
    cover: pod2,
  },
  {
    id: "ep-3",
    number: 3,
    title: "Hériter de Nawal",
    athleteName: "Yasmine El Moutawakil",
    athleteId: "yasmine-elmoutawakil",
    description: "Porter un nom de légende et tracer sa propre voie sur 400m haies.",
    duration: "28 min",
    category: "Interview",
    date: "26 février 2026",
    cover: pod3,
  },
  {
    id: "ep-4",
    number: 4,
    title: "Ma fille, ma championne",
    athleteName: "Famille Eyenga",
    athleteId: "manuela-eyenga",
    description:
      "La voix d'une mère camerounaise qui a tout sacrifié pour le rêve olympique de sa fille.",
    duration: "36 min",
    category: "Famille",
    date: "19 février 2026",
    cover: pod4,
  },
  {
    id: "ep-5",
    number: 5,
    title: "Coach Mamadou : forger les talents",
    athleteName: "Mamadou Sy",
    description:
      "Trente ans d'entraînement à Dakar, par celui qui a vu naître plusieurs générations.",
    duration: "44 min",
    category: "Entraîneur",
    date: "12 février 2026",
    cover: pod5,
  },
  {
    id: "ep-6",
    number: 6,
    title: "1960, l'année Bikila",
    athleteName: "Archives",
    description:
      "Retour sur la victoire pieds nus d'Abebe Bikila à Rome, premier or olympique africain.",
    duration: "25 min",
    category: "Histoire",
    date: "5 février 2026",
    cover: pod6,
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "1960",
    year: 1960,
    title: "Abebe Bikila, pieds nus à Rome",
    description:
      "Premier athlète africain champion olympique : un marathon mythique couru sans chaussures.",
    country: "Éthiopie",
  },
  {
    id: "1968",
    year: 1968,
    title: "Kip Keino bat Jim Ryun",
    description: "Le Kenya entre dans l'histoire de la course de demi-fond aux Jeux de Mexico.",
    country: "Kenya",
  },
  {
    id: "1984",
    year: 1984,
    title: "Nawal El Moutawakil, première",
    description: "Première femme arabe et africaine championne olympique sur 400m haies.",
    country: "Maroc",
  },
  {
    id: "1991",
    year: 1991,
    title: "Naissance de la CAA moderne",
    description:
      "La Confédération Africaine d'Athlétisme structure le sport sur tout le continent.",
    country: "Afrique",
  },
  {
    id: "1995",
    year: 1995,
    title: "Haile Gebrselassie, l'empereur",
    description: "Premier record du monde sur 5000m d'une longue dynastie éthiopienne.",
    country: "Éthiopie",
  },
  {
    id: "2008",
    year: 2008,
    title: "Tirunesh Dibaba, doublé d'or",
    description: "Doublé olympique 5000m / 10000m à Pékin, performance historique.",
    country: "Éthiopie",
  },
  {
    id: "2016",
    year: 2016,
    title: "Wayde van Niekerk pulvérise le 400m",
    description: "43.03 à Rio : un record du monde qui résiste depuis près de 30 ans est balayé.",
    country: "Afrique du Sud",
  },
  {
    id: "2019",
    year: 2019,
    title: "Eliud Kipchoge sous les 2h",
    description: "Le Kényan devient le premier humain à courir un marathon en moins de 2 heures.",
    country: "Kenya",
  },
  {
    id: "2023",
    year: 2023,
    title: "Faith Kipyegon triple record",
    description: "Trois records du monde en six semaines : 1500m, mile et 5000m.",
    country: "Kenya",
  },
  {
    id: "2026",
    year: 2026,
    title: "JOJ Dakar, première en Afrique",
    description:
      "Pour la première fois, les Jeux Olympiques de la Jeunesse se tiennent sur le continent africain.",
    country: "Sénégal",
  },
];

export const JOJ_TIMELINE: JojMilestone[] = [
  {
    id: "2010-singapour",
    year: "2010",
    city: "Singapour",
    title: "Première édition des JOJ",
    description:
      "Le mouvement prend vie dans une ville-laboratoire où sport, culture et apprentissage avancent ensemble.",
    detail:
      "À Singapour, les Jeux olympiques de la jeunesse installent leur identité: compétition de haut niveau, formats pédagogiques et scène culturelle pensée pour les adolescents du monde entier.",
    takeaway: "Le modèle des JOJ est lancé comme un rendez-vous global pour la jeunesse.",
  },
  {
    id: "2012-innsbruck",
    year: "2012",
    city: "Innsbruck",
    title: "Les JOJ d'hiver s'installent",
    description:
      "Le format s'étend à la glace et à la montagne, avec la même ambition éducative que sur la piste.",
    detail:
      "À Innsbruck, l'univers des JOJ s'élargit: les sports d'hiver rejoignent la narration du mouvement, et la dimension d'accompagnement des jeunes athlètes devient plus visible.",
    takeaway: "Les JOJ deviennent un format d'été et d'hiver, avec une même philosophie.",
  },
  {
    id: "2014-nanjing",
    year: "2014",
    city: "Nanjing",
    title: "Le laboratoire s'amplifie",
    description:
      "Le rendez-vous gagne en ampleur et confirme que les JOJ sont aussi un espace d'éducation et de mixité.",
    detail:
      "Nanjing consolide l'idée d'un événement où la performance, la découverte culturelle et l'échange entre délégations comptent autant que les médailles.",
    takeaway: "L'événement prend une vraie dimension de festival mondial de la jeunesse.",
  },
  {
    id: "2018-buenos-aires",
    year: "2018",
    city: "Buenos Aires",
    title: "La ville devient scène",
    description:
      "Les JOJ se rapprochent du rythme des grandes métropoles et renforcent les formats mixtes et collaboratifs.",
    detail:
      "À Buenos Aires, le décor urbain et l'intensité des jeunes athlètes donnent aux JOJ une énergie plus festive, plus rapide, plus ouverte aux nouvelles formes de narration.",
    takeaway: "La jeunesse olympique trouve un langage visuel plus moderne et plus urbain.",
  },
  {
    id: "2020-lausanne",
    year: "2020",
    city: "Lausanne",
    title: "L'héritage d'hiver à Lausanne",
    description:
      "La version hivernale poursuit le récit des JOJ avec une attention plus forte au développement durable.",
    detail:
      "Lausanne rappelle que les JOJ ne sont pas qu'une compétition: ils portent aussi une manière de penser l'avenir, les infrastructures et l'accompagnement des athlètes après l'événement.",
    takeaway: "Le développement durable devient une partie centrale du récit.",
  },
  {
    id: "2022-dakar",
    year: "2022",
    city: "Dakar",
    title: "Dakar entre dans l'histoire",
    description:
      "Le CIO attribue les JOJ à Dakar, première ville africaine désignée pour accueillir l'événement.",
    detail:
      "L'attribution à Dakar est un tournant symbolique majeur: elle ouvre enfin la porte à une édition olympique de la jeunesse sur le continent africain et prépare un récit inédit pour la génération montante.",
    takeaway: "L'Afrique gagne sa place au centre de la carte olympique de la jeunesse.",
  },
  {
    id: "2026-dakar",
    year: "2026",
    city: "Dakar",
    title: "Les premiers JOJ en Afrique",
    description:
      "Le rendez-vous devient réel: Dakar accueille la jeunesse olympique pour la première fois sur le continent.",
    detail:
      "En 2026, Dakar transforme la promesse en expérience collective: une ville-hôte, des athlètes venus de tout le continent et un événement qui ancre définitivement les JOJ dans la mémoire africaine.",
    takeaway: "Le continent accueille enfin son propre moment olympique de la jeunesse.",
  },
];

export const LIVE_RESULTS: LiveResult[] = [
  {
    id: "r1",
    discipline: "100m femmes — Finale",
    athlete: "Amina Diallo",
    country: "Sénégal",
    flag: "🇸🇳",
    performance: "11.32",
    medal: "gold",
  },
  {
    id: "r2",
    discipline: "3000m steeple hommes",
    athlete: "Kipchoge Rotich",
    country: "Kenya",
    flag: "🇰🇪",
    performance: "8:21.45",
    medal: "gold",
  },
  {
    id: "r3",
    discipline: "Saut en longueur hommes",
    athlete: "Chinedu Okafor",
    country: "Nigeria",
    flag: "🇳🇬",
    performance: "8.12 m",
    medal: "silver",
  },
  {
    id: "r4",
    discipline: "400m haies femmes",
    athlete: "Yasmine El Moutawakil",
    country: "Maroc",
    flag: "🇲🇦",
    performance: "55.84",
    medal: "bronze",
  },
  {
    id: "r5",
    discipline: "5000m femmes — Séries",
    athlete: "Tigist Bekele",
    country: "Éthiopie",
    flag: "🇪🇹",
    performance: "15:12.10",
    medal: null,
  },
];

import { Users, Clock, MapPin, Mic, Film, Archive, type LucideIcon } from "lucide-react";

export type Room = {
  num: string;
  path: "/athletes" | "/histoire" | "/carte" | "/podcast" | "/videos" | "/archive";
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const ROOMS: Room[] = [
  {
    num: "01",
    path: "/athletes",
    icon: Users,
    title: "Galerie des Athlètes",
    desc: "Portraits intimes de la jeunesse africaine qui marche vers Dakar 2026.",
  },
  {
    num: "02",
    path: "/histoire",
    icon: Clock,
    title: "Histoire de l'Athlétisme",
    desc: "De Bikila à Kipchoge : six décennies de gloire africaine.",
  },
  {
    num: "03",
    path: "/carte",
    icon: MapPin,
    title: "Carte Afrique Live",
    desc: "Suivez en temps réel les performances des 55 nations du continent.",
  },
  {
    num: "04",
    path: "/podcast",
    icon: Mic,
    title: "Studio Podcast",
    desc: "Entrez dans la voix des athlètes, des familles et des entraîneurs.",
  },
  {
    num: "05",
    path: "/videos",
    icon: Film,
    title: "Galerie Vidéo JOJ",
    desc: "Moments forts, coulisses et mini-documentaires des JOJ Dakar.",
  },
  {
    num: "06",
    path: "/archive",
    icon: Archive,
    title: "Archive Permanente",
    desc: "Une mémoire vivante qui restera bien après les Jeux.",
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Cérémonie d'ouverture",
    subtitle: "Stade Léopold-Sédar-Senghor",
    cat: "Cérémonies",
    duration: "3:42",
    description:
      "Une ouverture lumineuse qui installe tout de suite la promesse d'un rendez-vous historique pour la jeunesse africaine.",
    image: v1,
    badge: "NOUVEAU" as const,
  },
  {
    id: "v2",
    title: "Amina Diallo : la course d'une vie",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "12:08",
    description:
      "Amina raconte le travail invisible derrière ses départs explosifs, ses séances de vitesse et le poids d'un public attendu à Dakar.",
    image: v2,
  },
  {
    id: "v3",
    title: "Coulisses du village olympique",
    subtitle: "Reportage",
    cat: "Coulisses",
    duration: "5:21",
    description:
      "Des chambres aux espaces de récupération, un regard intime sur la vie collective des athlètes entre deux compétitions.",
    image: v3,
  },
  {
    id: "v4",
    title: "Top 10 moments forts — Jour 1",
    subtitle: "Highlights",
    cat: "Moments forts",
    duration: "4:15",
    description:
      "Le condensé des premiers exploits, des départs nerveux aux premières célébrations sous les tribunes.",
    image: v4,
    badge: "LIVE" as const,
  },
  {
    id: "v5",
    title: "Iten, fabrique des champions",
    subtitle: "Au cœur du Kenya",
    cat: "Documentaire",
    duration: "18:33",
    description:
      "Un portrait du village de l'endurance où Kipchoge Rotich et tant d'autres apprennent à courir longtemps et juste.",
    image: v5,
  },
  {
    id: "v6",
    title: "Triple saut féminin — Finale",
    subtitle: "Action complète",
    cat: "Moments forts",
    duration: "6:50",
    description:
      "La finale filmée au plus près, avec l'énergie du stade et la précision des enchaînements en phase d'appel.",
    image: v6,
  },
  {
    id: "v7",
    title: "Dans le sac d'un sprinteur",
    subtitle: "Coulisses",
    cat: "Coulisses",
    duration: "2:58",
    description:
      "Les petits objets, les rituels et les habitudes qui suivent un sprinteur jusqu'à la ligne de départ.",
    image: v7,
  },
  {
    id: "v8",
    title: "L'hymne sénégalais sur le podium",
    subtitle: "Cérémonie",
    cat: "Cérémonies",
    duration: "3:10",
    description:
      "Un moment suspendu où la salle retient son souffle avant que le drapeau et l'hymne prennent toute la place.",
    image: v8,
  },
  {
    id: "v9",
    title: "Tigist Bekele : le souffle des plateaux",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "11:26",
    description:
      "Tigist raconte la discipline silencieuse, les kilomètres du matin et la promesse d'une grande finale éthiopienne.",
    image: tigistImg,
    badge: "NOUVEAU" as const,
  },
  {
    id: "v10",
    title: "Chinedu Okafor : l'appel du sable",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "10:44",
    description:
      "De Lagos à Dakar, un récit de puissance, de précision et de confiance dans l'instant de l'appel.",
    image: chineduImg,
  },
  {
    id: "v11",
    title: "Kouamé Yao : l'éclair d'Abidjan",
    subtitle: "Portrait documentaire",
    cat: "Documentaire",
    duration: "9:58",
    description:
      "La vitesse ivoirienne racontée à hauteur d'épaules, entre départs nerveux et relances qui claquent.",
    image: kouameImg,
  },
  {
    id: "v12",
    title: "Naledi Khumalo : s'élever plus haut",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "10:21",
    description:
      "Un film sur l'art de trouver la bonne impulsion, de la piste scolaire aux grands concours internationaux.",
    image: naledImg,
  },
  {
    id: "v13",
    title: "Kofi Mensah : le tour parfait",
    subtitle: "Portrait documentaire",
    cat: "Documentaire",
    duration: "12:02",
    description:
      "Kofi explique comment il fait dialoguer études, entraînement et maîtrise du 400m dans la même journée.",
    image: kofiImg,
  },
  {
    id: "v14",
    title: "Anis Benhassi : le tempo du 1500m",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "8:47",
    description:
      "Un portrait sur l'intelligence de course, la gestion de l'effort et le sens du dernier virage.",
    image: anisImg,
  },
  {
    id: "v15",
    title: "Neema Mwangaza : 42 kilomètres de patience",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "13:15",
    description:
      "Des routes du Kilimandjaro aux grands marathons, Neema raconte le calme, le souffle et la persévérance.",
    image: neemaImg,
  },
  {
    id: "v16",
    title: "Joseph Okello : mémoire du fond",
    subtitle: "Portrait documentaire",
    cat: "Documentaire",
    duration: "11:39",
    description:
      "Joseph parle des longues sorties, du tempo en groupe et de la patience qui construit les grands 10 000m.",
    image: josephImg,
  },
  {
    id: "v17",
    title: "Yasmine El Moutawakil : héritage et ligne droite",
    subtitle: "Mini-documentaire",
    cat: "Documentaire",
    duration: "9:34",
    description:
      "Yasmine révèle le poids d'un nom, la liberté d'en faire sa propre histoire et la précision des haies.",
    image: yasmineImg,
  },
];
