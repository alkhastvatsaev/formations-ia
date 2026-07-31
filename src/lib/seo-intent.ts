/**
 * Intent SEO landings — unique copy, real value, link to ateliers.
 * Creative URLs without doorway spam (public, indexed, extractible).
 */

export type IntentLink = {
  href: string;
  label: string;
};

export type IntentPage = {
  slug: string;
  /** Path segment after /pour/ or /guides/ */
  kind: "pour" | "guides";
  title: string;
  description: string;
  /** Citable 2–3 sentence opening */
  summary: string;
  h1: string;
  scene: string;
  desire: string;
  primary: IntentLink;
  secondary: IntentLink[];
  faq: { question: string; answer: string }[];
  updatedAt: string;
};

export const POUR_PAGES: IntentPage[] = [
  {
    kind: "pour",
    slug: "debutants",
    title: "Formation IA pour débutants",
    description:
      "Vous démarrez l'IA : page dédiée formation IA débutant — ChatGPT, prompts, routine. Atelier live, prix et dates clairs.",
    summary:
      "Une formation IA pour débutants vous apprend à utiliser ChatGPT et Claude au quotidien, avec des prompts qui délivrent et une routine mesurable. Aucune compétence technique requise : on part de votre métier.",
    h1: "Pour les débutants qui veulent enfin utiliser l'IA",
    scene:
      "Vous avez ouvert ChatGPT une fois. La réponse était vague. Vous savez déjà faire votre métier — il manquait une méthode, pas du talent.",
    desire:
      "Gagner du temps sur emails, synthèses et préparation — en restant maître de vos décisions.",
    primary: {
      href: "/formations/premiers-pas-ia",
      label: "Atelier Premiers pas IA (890 €)",
    },
    secondary: [
      { href: "/guides/chatgpt-au-travail", label: "Guide ChatGPT au travail" },
      { href: "/guides/prompts-qui-delivrent", label: "Prompts qui délivrent" },
      { href: "/blog/formation-prompt-engineering", label: "Article prompt engineering" },
    ],
    faq: [
      {
        question: "Par où commencer une formation IA débutant ?",
        answer:
          "Par un atelier d'une journée sur vos vrais cas : choix d'outil, prompts structurés, routine. Si vous savez utiliser un navigateur et un email, vous avez le niveau. Prix, programme et dates sont publiés sur la page de l'atelier Premiers pas IA.",
      },
      {
        question: "Faut-il savoir coder pour démarrer ?",
        answer:
          "Non. Les débutants sans code démarrent sur ChatGPT et la méthode. Si plus tard vous voulez coder avec Cursor, un second atelier existe — on clarifie le chemin en 20 minutes d'écoute si besoin.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "pour",
    slug: "ceux-qui-codent",
    title: "Formation IA pour ceux qui codent (débutants)",
    description:
      "Vous codez déjà un peu : formation Cursor et Copilot, méthode demander-relire-livrer. Atelier débutants, pas track expert.",
    summary:
      "Si vous ouvrez déjà un projet et voulez livrer plus vite avec Cursor ou Copilot, une formation « coder avec l'IA » pose la méthode : contexte, revue, mini-cas. Premier niveau d'ingénierie IA, honnête.",
    h1: "Pour ceux qui codent — et veulent l'IA comme copilote",
    scene:
      "Le code généré marche… jusqu'à la revue. Vous n'êtes pas « en retard » : il manquait une checklist. On la construit ensemble.",
    desire:
      "Livrer un mini-cas en production légère, en sachant expliquer ce que l'IA a proposé.",
    primary: {
      href: "/formations/coder-avec-ia",
      label: "Atelier Coder avec l'IA (890 €)",
    },
    secondary: [
      { href: "/guides/cursor-sans-se-perdre", label: "Guide Cursor" },
      {
        href: "/blog/formation-github-copilot-developpeurs",
        label: "Article GitHub Copilot",
      },
      {
        href: "/blog/formation-ia-pour-developpeurs-c-est-quoi",
        label: "Qu'est-ce qu'une formation IA pour développeurs ?",
      },
    ],
    faq: [
      {
        question: "Cursor ou Copilot : par où commencer ?",
        answer:
          "Apportez l'outil que vous avez. L'atelier couvre les deux approches et se concentre sur la méthode : contexte projet, itération, revue. Vous repartez avec une checklist applicable à l'outil que vous garderez.",
      },
      {
        question: "Est-ce pour des profils confirmés RAG / agents ?",
        answer:
          "Non : c'est le premier niveau (IDE assisté, livraison d'un cas). Si votre besoin est plus avancé, un appel de 20 minutes clarifie le périmètre — sans pression ni survente.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "pour",
    slug: "equipes-qui-demarrent",
    title: "Former une équipe qui démarre l'IA",
    description:
      "Former son équipe à l'IA : atelier intra débutants pour TPE/PME. Cas métier, règles données, plan 30/60/90.",
    summary:
      "Pour former une équipe qui démarre l'IA, un atelier intra d'une journée aligne débutants et curieux : cas prioritaires, prompts, règles sur les données, plan 30/60/90. Sur site ou visio.",
    h1: "Pour les équipes qui démarrent l'IA ensemble",
    scene:
      "Certains collègues expérimentent ; d'autres hésitent. Vous dirigez : vous voulez un langage commun, sans mettre personne mal à l'aise.",
    desire:
      "Trois cas prioritaires, des règles claires, un plan que l'équipe revendique.",
    primary: {
      href: "/formations/ia-equipe-intra",
      label: "Atelier intra équipe (2 400 €)",
    },
    secondary: [
      { href: "/guides/former-son-equipe", label: "Guide former son équipe" },
      { href: "/blog/former-son-equipe-a-l-ia", label: "Article détaillé" },
      { href: "/blog/cout-formation-ia-equipe", label: "Coûts typiques" },
    ],
    faq: [
      {
        question: "Combien de personnes pour un intra IA ?",
        answer:
          "En général 6 à 12 personnes, une journée (extensible). Le contenu est adapté à votre métier avant la session : questionnaire et appel de cadrage inclus, pour que le plan soit le vôtre.",
      },
      {
        question: "Faut-il que toute l'équipe soit technique ?",
        answer:
          "Non. Commercial, ops, managers et quelques profils tech cohabitent bien. Les exercices sont calibrés par rôle pour que chacun reparte respecté dans son métier.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "pour",
    slug: "freelances",
    title: "Formation IA pour freelances",
    description:
      "Freelance : gagnez du temps avec ChatGPT ou codez plus vite avec Cursor. Ateliers débutants, inscription simple.",
    summary:
      "En freelance, chaque heure compte. Une formation IA débutant (prompts) ou « coder avec l'IA » (Cursor) vous donne une méthode réutilisable sur vos missions — sans jargon inutile.",
    h1: "Pour les freelances qui veulent livrer plus sereinement",
    scene:
      "Entre deux clients, vous bricolez avec ChatGPT. Parfois ça sauve la journée ; parfois ça vous fait perdre une heure. Une méthode change le ratio.",
    desire:
      "Templates et routine pour vos livrables — emails, docs, ou code — selon votre métier.",
    primary: {
      href: "/formations/premiers-pas-ia",
      label: "Premiers pas IA (métier)",
    },
    secondary: [
      { href: "/formations/coder-avec-ia", label: "Coder avec l'IA (tech)" },
      { href: "/pour/debutants", label: "Parcours débutants" },
      { href: "/a-propos", label: "Parler 20 min" },
    ],
    faq: [
      {
        question: "Quel atelier choisir en freelance ?",
        answer:
          "Si vous livrez surtout du contenu, ops ou conseil : Premiers pas IA. Si vous livrez du code : Coder avec l'IA. Un appel de 20 minutes sert à trancher selon vos missions réelles.",
      },
      {
        question: "Facture possible ?",
        answer:
          "Oui. Les ateliers à 890 € HT sont facturables entreprise / auto-entreprise selon votre statut. Les détails pratiques sont sur chaque page formation.",
      },
    ],
    updatedAt: "2026-07-31",
  },
];

export const GUIDE_PAGES: IntentPage[] = [
  {
    kind: "guides",
    slug: "chatgpt-au-travail",
    title: "Guide : ChatGPT au travail (formation pratique)",
    description:
      "Comment utiliser ChatGPT au travail : méthode, prompts, limites, et atelier formation IA débutant associé.",
    summary:
      "Utiliser ChatGPT au travail, c'est structurer la demande (rôle, contexte, format), vérifier la réponse, et intégrer une routine. Ce guide résume la méthode ; l'atelier Premiers pas IA la pratique sur vos cas.",
    h1: "ChatGPT au travail — guide pratique",
    scene:
      "Avant : une question vague, une réponse générique. Après : un prompt clair, une sortie utilisable, une relecture humaine de 30 secondes.",
    desire:
      "Récupérer du temps chaque semaine sur des tâches que vous faites déjà bien.",
    primary: {
      href: "/formations/premiers-pas-ia",
      label: "Passer à l'atelier Premiers pas IA",
    },
    secondary: [
      { href: "/blog/formation-chatgpt-entreprise", label: "ChatGPT en entreprise" },
      { href: "/pour/debutants", label: "Parcours débutants" },
      { href: "/guides/prompts-qui-delivrent", label: "Prompts qui délivrent" },
    ],
    faq: [
      {
        question: "ChatGPT gratuit suffit-il pour démarrer ?",
        answer:
          "Oui pour apprendre la méthode. Un abonnement peut aider sur le long contexte ou la vitesse, mais ce n'est pas un prérequis de l'atelier. L'essentiel reste la structure de vos prompts et la validation humaine.",
      },
      {
        question: "Quelles tâches traiter en premier ?",
        answer:
          "Emails, synthèses de documents, préparation de réunions, reformulation. Choisissez une tâche récurrente de votre métier : le gain est mesurable dès la première semaine.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "guides",
    slug: "cursor-sans-se-perdre",
    title: "Guide : Cursor sans se perdre (formation)",
    description:
      "Formation Cursor pour débutants : méthode contexte, revue, livraison. Guide + atelier Coder avec l'IA.",
    summary:
      "Cursor accélère si vous donnez du contexte et vous relisez. Ce guide pose la méthode demander-relire-livrer ; l'atelier Coder avec l'IA la pratique sur un mini-cas.",
    h1: "Cursor sans se perdre — guide formation",
    scene:
      "Le modèle écrit 80 lignes. Vous ne savez plus ce qui est sûr. La checklist (contexte, tests, petits commits) rend ça tenable.",
    desire:
      "Livrer plus vite sans perdre le contrôle du code que vous signez.",
    primary: {
      href: "/formations/coder-avec-ia",
      label: "Atelier Coder avec l'IA",
    },
    secondary: [
      { href: "/blog/formation-cursor-debutants", label: "Article formation Cursor" },
      { href: "/pour/ceux-qui-codent", label: "Parcours ceux qui codent" },
      {
        href: "/blog/formation-github-copilot-developpeurs",
        label: "Aussi : Copilot",
      },
    ],
    faq: [
      {
        question: "Faut-il Cursor Pro pour la formation ?",
        answer:
          "Une période d'essai ou l'outil que vous avez déjà suffit pour suivre. L'atelier enseigne la méthode, pas un abonnement. Apportez un petit projet non sensible.",
      },
      {
        question: "Cursor remplace-t-il apprendre à coder ?",
        answer:
          "Non. Cursor accélère ceux qui comprennent (ou apprennent) ce qu'ils livrent. La revue et les tests restent votre responsabilité — c'est pour ça que la méthode insiste dessus.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "guides",
    slug: "prompts-qui-delivrent",
    title: "Guide : prompts qui délivrent (prompt engineering débutant)",
    description:
      "Prompt engineering débutant : rôle, contexte, format, exemples. Guide pratique + formation IA associée.",
    summary:
      "Un prompt qui délivre précise le rôle, le contexte, le format de sortie et un exemple. Ce guide résume le prompt engineering débutant ; l'atelier Premiers pas IA le pratique sur vos emails et docs.",
    h1: "Prompts qui délivrent — guide débutant",
    scene:
      "« Écris un mail » → blabla. « Tu es mon assistant ops ; destinataire = client X ; ton = clair ; 5 lignes max ; structure : contexte / demande / suite » → utilisable.",
    desire:
      "Obtenir du premier coup ce que vous auriez corrigé trois fois.",
    primary: {
      href: "/formations/premiers-pas-ia",
      label: "Pratiquer en atelier (Premiers pas IA)",
    },
    secondary: [
      { href: "/blog/formation-prompt-engineering", label: "Article prompt engineering" },
      { href: "/guides/chatgpt-au-travail", label: "ChatGPT au travail" },
      { href: "/pour/debutants", label: "Parcours débutants" },
    ],
    faq: [
      {
        question: "Quels éléments minimum dans un bon prompt ?",
        answer:
          "Rôle (qui est le modèle), contexte (votre situation), tâche claire, format de sortie, contraintes (longueur, ton), et idéalement un exemple. Puis une passe de validation humaine avant d'envoyer quoi que ce soit d'externe.",
      },
      {
        question: "Le prompt engineering sert-il aussi au code ?",
        answer:
          "Oui : mêmes principes (contexte fichiers, critères d'acceptation, format). Pour le code, l'atelier Coder avec l'IA approfondit la revue et la livraison.",
      },
    ],
    updatedAt: "2026-07-31",
  },
  {
    kind: "guides",
    slug: "former-son-equipe",
    title: "Guide : former son équipe à l'IA",
    description:
      "Comment former son équipe à l'IA : étapes, cas d'usage, garde-fous, atelier intra TPE/PME.",
    summary:
      "Former son équipe à l'IA commence par un diagnostic d'usages, 3 à 5 cas prioritaires, des règles sur les données, puis un atelier pratique. Ce guide pose le cadre ; l'intra d'une journée l'anime avec votre équipe.",
    h1: "Former son équipe à l'IA — guide",
    scene:
      "Sans cadre, chacun bricole dans son coin. Avec un atelier partagé : trois cas, un langage commun, un plan sur 90 jours.",
    desire:
      "Autonomie collective et décisions honnêtes sur l'IA — pas une mode imposée.",
    primary: {
      href: "/formations/ia-equipe-intra",
      label: "Réserver un intra équipe",
    },
    secondary: [
      { href: "/blog/former-son-equipe-a-l-ia", label: "Article complet" },
      { href: "/blog/formation-ia-tpe-pme", label: "Spécial TPE/PME" },
      { href: "/pour/equipes-qui-demarrent", label: "Parcours équipes" },
    ],
    faq: [
      {
        question: "Par quoi commencer avant l'atelier ?",
        answer:
          "Lister les outils déjà utilisés, les peurs (données, qualité), et 3 tâches répétitives. Un questionnaire court et un appel de cadrage sont inclus dans l'offre intra pour arriver prêts.",
      },
      {
        question: "Combien budgéter ?",
        answer:
          "L'atelier intra est à 2 400 € HT pour une journée jusqu'à 12 personnes (détails sur la page formation). Comparez au coût d'heures perdues ou d'usages non cadrés — l'article coûts donne des ordres de grandeur.",
      },
    ],
    updatedAt: "2026-07-31",
  },
];

export const ALL_INTENT_PAGES: IntentPage[] = [...POUR_PAGES, ...GUIDE_PAGES];

export function getIntentPage(
  kind: "pour" | "guides",
  slug: string,
): IntentPage | undefined {
  return ALL_INTENT_PAGES.find((p) => p.kind === kind && p.slug === slug);
}

export function intentPath(page: IntentPage): string {
  return `/${page.kind}/${page.slug}`;
}
