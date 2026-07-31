import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV des formations IA d'Alkhast Vatsaev.",
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose prose-formation">
      <h1>Conditions générales de vente</h1>
      <p>Dernière mise à jour : 29 juillet 2026.</p>
      <h2>Objet</h2>
      <p>
        Les présentes CGV régissent la vente de formations (ateliers live et
        intra-entreprise) proposées par Alkhast Vatsaev.
      </p>
      <h2>Commande et paiement</h2>
      <p>
        Le paiement s&apos;effectue en ligne via Stripe Checkout. Le contrat est
        formé à la confirmation du paiement. Les prix affichés sont en euros ;
        le montant facturé est celui défini côté serveur au moment de la
        session Stripe.
      </p>
      <h2>Droit de rétractation</h2>
      <p>
        Conformément au Code de la consommation, pour les prestations de
        formation à distance, les modalités de rétractation et d&apos;annulation
        seront précisées sur la page de la formation et dans l&apos;email de
        confirmation. En cas d&apos;annulation par le formateur, le montant est
        remboursé intégralement.
      </p>
      <h2>Responsabilité</h2>
      <p>
        La formation ne garantit pas un résultat business particulier. Les
        exemples de code sont fournis à titre pédagogique.
      </p>
      <p>
        <em>
          Faire relire ces CGV par un conseil juridique avant commercialisation
          à grande échelle.
        </em>
      </p>
    </div>
  );
}
