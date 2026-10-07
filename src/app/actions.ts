"use server";

export type NewsletterState = { status: "idle" | "success" | "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(_: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: persist the subscription once a newsletter table or email provider is in place.
  return { status: "success", message: "Thank you. You're on the list for news from the house." };
}
