# 2026-07-29 — Contenu versionné MDX + Content Collections (pas de CMS)

## Contexte

V1 vitrine : formations, blog, témoignages. Besoin de typage, SSG, et revue Git.

## Décision

MDX dans `content/` + Content Collections pour générer des types et compiler le MDX au build.

## Alternatives écartées

- CMS headless (Sanity/Contentful) : overhead ops et coût pour un volume faible en V1.
- MDX « maison » sans collections : perte de typage frontmatter et DX moindre.

## Conséquences

Le contenu reste dans le repo ; les leads/commandes vont en Postgres. Pas d'auth auteur en V1.
