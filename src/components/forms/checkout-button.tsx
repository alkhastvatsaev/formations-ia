"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

type Status = "idle" | "loading" | "error";

export function CheckoutButton({
  formationSlug,
  priceCents,
  label = "S'inscrire",
}: {
  formationSlug: string;
  priceCents: number;
  label?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formationSlug, website: "" }),
      });
      const data = (await res.json()) as {
        url?: string;
        error?: { code: string; message: string };
      };
      if (!res.ok || !data.url) {
        setStatus("error");
        setError(data.error?.message ?? "Paiement indisponible pour le moment.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setStatus("error");
      setError("Impossible de démarrer le paiement.");
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        onClick={onClick}
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading"
          ? "Redirection…"
          : `${label} — ${formatPrice(priceCents)}`}
      </Button>
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
