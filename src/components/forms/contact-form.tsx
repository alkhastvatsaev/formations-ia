"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

function subscribe() {
  return () => undefined;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  async function submitForm(form: HTMLFormElement) {
    const fd = new FormData(form);
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company") || undefined,
          message: fd.get("message"),
          website: fd.get("website") || "",
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: { code: string; message: string };
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error?.message ?? "Une erreur est survenue.");
        return;
      }
      setStatus("success");
      setMessage("Message envoyé. Réponse sous 2 jours ouvrés.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer le message. Réessayez.");
    }
  }

  return (
    <form
      className="space-y-4"
      noValidate
      data-testid="contact-form"
      data-hydrated={hydrated ? "true" : "false"}
      onSubmit={(e) => {
        e.preventDefault();
        void submitForm(e.currentTarget);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" name="name" required disabled={status === "loading"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "loading"}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Entreprise (optionnel)</Label>
        <Input id="company" name="company" disabled={status === "loading"} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={20}
          disabled={status === "loading"}
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Button type="submit" disabled={status === "loading" || !hydrated}>
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </Button>
      <p
        role="status"
        aria-live="polite"
        data-testid="contact-status"
        className={
          status === "error"
            ? "text-sm text-red-700"
            : status === "success"
              ? "text-sm text-[var(--accent)]"
              : "sr-only"
        }
      >
        {message ?? (status === "loading" ? "Envoi en cours…" : "")}
      </p>
    </form>
  );
}
