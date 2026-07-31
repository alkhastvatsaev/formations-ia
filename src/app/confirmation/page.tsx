import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Confirmation",
  description: "Confirmation d'inscription à une formation IA.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string; formation?: string }>;
};

export default async function ConfirmationPage({ searchParams }: Props) {
  const { formation } = await searchParams;

  return (
    <div className="atmosphere mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        Merci — c&apos;est confirmé
      </h1>
      <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
        Vous avez fait le pas. Un email récapitulatif vous a été (ou vous sera)
        envoyé avec les détails pratiques
        {formation ? (
          <>
            {" "}
            pour{" "}
            <Link
              href={`/formations/${formation}`}
              className="text-[var(--accent)] hover:underline"
            >
              cet atelier
            </Link>
          </>
        ) : null}
        . On se retrouve pour travailler sur <em>votre</em> cas.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-[var(--accent)] px-5 text-[var(--accent-fg)]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
