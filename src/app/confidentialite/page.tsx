import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et RGPD — Formations IA.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose prose-formation">
      <h1>Politique de confidentialité</h1>
      <p>Dernière mise à jour : 29 juillet 2026.</p>
      <h2>Responsable de traitement</h2>
      <p>
        {SITE.author.name} — {SITE.author.email}
      </p>
      <h2>Données collectées</h2>
      <ul>
        <li>Email (newsletter, double opt-in)</li>
        <li>Nom, email, message (formulaire de contact)</li>
        <li>Email et données de paiement traitées par Stripe (commande)</li>
      </ul>
      <h2>Finalités</h2>
      <p>
        Gestion des inscriptions newsletter, réponses aux demandes de contact,
        exécution des commandes de formation, obligations légales.
      </p>
      <h2>Base légale</h2>
      <p>
        Consentement (newsletter), exécution du contrat (commande), intérêt
        légitime (sécurité anti-spam).
      </p>
      <h2>Cookies et analytics</h2>
      <p>
        Pas de cookies tiers de tracking. Analytics via Plausible (sans cookies)
        lorsque configuré.
      </p>
      <h2>Vos droits</h2>
      <p>
        Accès, rectification, suppression, opposition : écrivez à{" "}
        {SITE.author.email}. Suppression des données sur demande.
      </p>
      <h2>Durée de conservation</h2>
      <p>
        Leads newsletter : jusqu&apos;à désinscription + délais légaux.
        Commandes : durée comptable applicable.
      </p>
    </div>
  );
}
