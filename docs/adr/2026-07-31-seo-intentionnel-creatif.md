# ADR — SEO intentionnel créatif (/formation-ia, /pour, /guides)

**Date :** 2026-07-31

## Contexte

Besoin de pages 1re intention Google + citation IA, sans doorways ni stuffing (interdit projet). Socle déjà solide ; manquaient des URLs créatives alignées sur les requêtes (ChatGPT, Cursor, débutants) et des correctifs techniques (OG hubs, IndexNow, lastmod).

## Décision

1. Hub `/formation-ia` + index `/pour`, `/guides`
2. Landings uniques (copie Carnegie + FAQ JSON-LD) sous `/pour/*` et `/guides/*`
3. Redirects artistiques : `/chatgpt`, `/cursor`, `/prompt-engineering`, `/apprendre/ia` → guides/hub
4. IndexNow via sitemap ; OG/canonical helpers ; breadcrumbs visibles ; article Cursor ; cross-liens

## Alternatives écartées

- Pages satellites cachées / cloaking
- 50 thin URLs synonymes

## Conséquences

Sitemap et llms.txt enrichis. Nav un peu plus dense (Formation IA + Guides). Suivi Search Console manuel inchangé.
