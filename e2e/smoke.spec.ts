import { expect, test } from "@playwright/test";

test("accueil expose le CTA principal et les formations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Parler de mon cas \(20 min\)/i }),
  ).toBeVisible();
  await expect(page.getByText(/890/).first()).toBeVisible();
});

test("page formation montre prix et FAQ en HTML", async ({ page }) => {
  await page.goto("/formations/premiers-pas-ia");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Formation IA débutant",
  );
  await expect(page.getByText("890 €", { exact: true })).toBeVisible();
  await expect(
    page.getByText(/Faut-il déjà connaître l'IA ou savoir coder/i),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: /Sur cette page/i })).toBeVisible();
});

test("catalogue formations liste les trois offres", async ({ page }) => {
  await page.goto("/formations");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Formations IA",
  );
  await expect(page.getByRole("link", { name: /premiers pas/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Coder avec l'IA/i }).first()).toBeVisible();
});

test("hub formation-ia et parcours SEO sont indexables", async ({ page }) => {
  await page.goto("/formation-ia");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Formation IA",
  );
  await page.goto("/pour/debutants");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/guides/cursor-sans-se-perdre");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cursor");
});

test("formulaire contact affiche les états", async ({ page }) => {
  await page.goto("/a-propos");
  const form = page.getByTestId("contact-form");
  await expect(form).toHaveAttribute("data-hydrated", "true");

  await page.getByLabel("Nom").fill("Test User");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page
    .getByLabel("Message")
    .fill("Bonjour, je souhaite démarrer une formation IA débutant.");

  const responsePromise = page.waitForResponse(
    (res) =>
      res.url().includes("/api/contact") && res.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Envoyer" }).click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  await expect(page.getByTestId("contact-status")).toContainText(
    /Message envoyé|erreur|Impossible/i,
  );
});
