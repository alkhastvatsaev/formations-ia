import type { Metadata } from "next";
import { Source_Sans_3, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { websiteJsonLd } from "@/lib/json-ld";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import { env } from "@/lib/env";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: SITE.fullName,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: absoluteUrl("/"),
    siteName: SITE.fullName,
    title: SITE.fullName,
    description: SITE.tagline,
    images: [{ url: "/og", width: 1200, height: 630, alt: SITE.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.fullName,
    description: SITE.tagline,
    images: ["/og"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Aller au contenu
        </a>
        <JsonLd data={websiteJsonLd()} />
        {env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
