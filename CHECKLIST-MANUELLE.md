# Checklist manuelle — mise en production & SEO omni

Cases à cocher après déploiement du site Formations IA.

## Google Search Console

- [ ] Propriété créée pour le domaine de production
- [ ] Sitemap soumis (`/sitemap.xml`)
- [ ] Inspection des pages clés : `/`, `/formation-ia`, `/formations`, `/pour/debutants`, `/guides/cursor-sans-se-perdre`, `/formations/premiers-pas-ia`, `/formations/coder-avec-ia`, `/formations/ia-equipe-intra`, `/a-propos`

## Bing Webmaster Tools

- [ ] Import en un clic depuis Search Console (couvre aussi la recherche ChatGPT)
- [ ] Sitemap soumis
- [ ] Vérification du statut IndexNow (clé dans `public/<INDEXNOW_KEY>.txt` + ping post-deploy `node scripts/ping-indexnow.mjs`)

## CDN / Cloudflare

- [ ] Vérifier que le **blocage par défaut des crawlers IA est DÉSACTIVÉ** pour ce domaine
- [ ] Confirmer que GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended ne sont pas bloqués (headers / WAF / Bot Fight Mode)

## Backlinks & entité

- [ ] Lien depuis [alkhastvatsaev.dev](https://alkhastvatsaev.dev) (nav ou footer, page projet dédiée)
- [ ] Lien depuis [heynota.app](https://heynota.app)
- [ ] Profil GitHub à jour (lien site formations)
- [ ] LinkedIn : lien / featured vers le site formations
- [ ] Même entité Person (`@id` stable) cohérente avec sameAs

## Présentiel

- [ ] Google Business Profile si formations en présentiel

## Tests citation IA

- [ ] **J+30** : demander à ChatGPT, Perplexity et Claude une formation IA pour développeurs en France ; noter si le site est cité, et sur quelles pages
- [ ] **J+90** : même protocole ; comparer avec J+30

## Secrets & services (ops)

- [ ] `DATABASE_URL` + `pnpm db:generate && pnpm db:migrate`
- [ ] Stripe (clés + webhook `/api/webhooks/stripe`)
- [ ] Resend (domaine email vérifié)
- [ ] Cal.com (`NEXT_PUBLIC_CAL_LINK`)
- [ ] Plausible (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- [ ] Sentry (`SENTRY_DSN`)
- [ ] Mentions légales : SIREN / adresse / hébergeur complétés
- [ ] CGV relues par un conseil si besoin
