import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export function ConfirmNewsletterEmail({
  confirmUrl,
}: {
  confirmUrl: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Confirmez pour recevoir votre checklist — premiers pas IA
      </Preview>
      <Body style={{ fontFamily: "sans-serif", background: "#f3f6f4" }}>
        <Container style={{ padding: "24px", background: "#fff" }}>
          <Heading as="h1">Une dernière étape — à vous</Heading>
          <Text>
            Merci. Vous avez demandé la checklist « Premiers pas IA ». Vous
            savez déjà ce que vous voulez gagner (temps, clarté, méthode) :
            confirmez votre email (double opt-in) pour la recevoir — outils,
            prompts, routine — et avancer sur <em>votre</em> premier cas.
          </Text>
          <Button
            href={confirmUrl}
            style={{
              background: "#0a6b5c",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "6px",
            }}
          >
            Oui, envoyer ma checklist
          </Button>
          <Text style={{ color: "#667", fontSize: "12px" }}>
            Si vous n&apos;êtes pas à l&apos;origine de cette demande, ignorez
            cet email — rien ne sera enregistré sans confirmation.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function OrderReceiptEmail({
  formationTitle,
  amountLabel,
}: {
  formationTitle: string;
  amountLabel: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenue — {formationTitle}</Preview>
      <Body style={{ fontFamily: "sans-serif", background: "#f3f6f4" }}>
        <Container style={{ padding: "24px", background: "#fff" }}>
          <Heading as="h1">Votre place est réservée — merci</Heading>
          <Text>
            Vous avez choisi d&apos;avancer sur <strong>{formationTitle}</strong>{" "}
            ({amountLabel}). Le paiement est bien reçu. Avant la date, vous
            recevrez les détails pratiques (lien de session, supports) — pour
            arriver serein·e et prêt·e à travailler sur <em>votre</em> cas.
          </Text>
          <Text>
            Si une question se pose d&apos;ici là, répondez à cet email : on
            écoute.
          </Text>
          <Text style={{ color: "#667", fontSize: "12px" }}>
            Alkhast Vatsaev — Formations IA
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
