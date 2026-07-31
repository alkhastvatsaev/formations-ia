import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Formations IA.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose prose-formation">
      <h1>Mentions légales</h1>
      <p>
        Le site {SITE.fullName} est édité par {SITE.author.name}, développeur
        indépendant.
      </p>
      <h2>Éditeur</h2>
      <ul>
        <li>Nom : {SITE.author.name}</li>
        <li>Email : {SITE.author.email}</li>
        <li>Site : {SITE.author.url}</li>
      </ul>
      <p>
        <em>
          Compléter avant mise en production : adresse, SIREN/SIRET, statut
          juridique, et le cas échéant hébergeur (Vercel ou autre).
        </em>
      </p>
      <h2>Hébergement</h2>
      <p>
        Hébergeur à renseigner (ex. Vercel Inc., 440 N Barranca Ave #4133,
        Covina, CA 91723, USA).
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les contenus du site (textes, marques, éléments graphiques) sont
        protégés. Toute reproduction non autorisée est interdite.
      </p>
    </div>
  );
}
