# MAINTENANT — trafic (J0)

Site live : **https://formations.alkhastvatsaev.dev**

## Indexation Bing (déjà lancé)

- [x] IndexNow → `www.bing.com/indexnow` : **41 URLs, HTTP 200**
- [x] IndexNow hub : 41 URLs, HTTP 200
- [ ] Optionnel : clé `BING_WEBMASTER_API_KEY` (Bing Webmaster → Settings → API Access) puis `pnpm bing:index` pour SubmitUrlBatch

Commande :
```bash
NEXT_PUBLIC_SITE_URL=https://formations.alkhastvatsaev.dev \
INDEXNOW_KEY=dd1cc6e2ee414e73a71d066ef0f7fc9d \
pnpm bing:index
```

## À faire par toi (10–20 min) — indexation Google

1. Ouvre [Google Search Console](https://search.google.com/search-console)
2. Ajoute propriété **préfixe URL** : `https://formations.alkhastvatsaev.dev`
3. Vérifie (DNS déjà chez Vercel / ou balise HTML)
4. Sitemaps → `https://formations.alkhastvatsaev.dev/sitemap.xml`
5. Inspection URL → demande d’indexation pour `/` et `/formation-ia`

Puis [Bing Webmaster](https://www.bing.com/webmasters) → importer depuis Google.

## Trafic humain (même jour)

1. 1 post LinkedIn avec lien vers `/guides/chatgpt-au-travail` ou `/formation-ia`
2. 5 messages à des gens qui te connaissent (« 10 sec de feedback sur la page ? »)
3. LinkedIn → Featured / site web → `https://formations.alkhastvatsaev.dev`

## Optionnel bientôt

- Plausible : créer site `formations.alkhastvatsaev.dev` + env `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Neon DB + Stripe + Resend (seulement si tu veux vendre / emails)
