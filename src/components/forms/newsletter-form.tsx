"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  source = "newsletter",
}: {
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: "", source }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: { code: string; message: string };
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error?.message ?? "Une erreur est survenue.");
        return;
      }
      setStatus("success");
      setMessage(
        data.message ??
          "Vérifiez votre boîte mail pour confirmer l'inscription (double opt-in).",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer la demande. Réessayez.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="newsletter-email">Email</Label>
        <Input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@entreprise.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
      </div>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        onChange={() => undefined}
      />
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi…" : "Oui, recevoir ma checklist"}
      </Button>
      {message ? (
        <p
          role="status"
          className={
            status === "error"
              ? "text-sm text-red-700"
              : "text-sm text-[var(--accent)]"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
