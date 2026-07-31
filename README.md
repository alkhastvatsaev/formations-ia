# Formations IA — Alkhast Vatsaev

Site vitrine haute conversion pour formations IA pratiques (ateliers live, intra-entreprise).

## Stack

Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Content Collections (MDX) · Stripe · Cal.com · Resend · Postgres/Drizzle · Plausible · IndexNow · Vitest · Playwright

## Commandes

```bash
pnpm install
cp .env.example .env.local
pnpm dev
pnpm check          # typecheck + lint + tests unitaires
pnpm build
pnpm test:e2e
pnpm db:generate && pnpm db:migrate
pnpm indexnow:ping  # post-deploy
```

## Contenu

MDX dans `content/formations`, `content/articles`, `content/testimonials`.

## Checklist prod

Voir [CHECKLIST-MANUELLE.md](./CHECKLIST-MANUELLE.md).
