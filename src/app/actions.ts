"use server";

import { getProduct, stockState } from "@/lib/catalog";

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

export type AddToBagState = { status: "idle" | "success" | "error"; message: string };

export async function addToBag(_: AddToBagState, formData: FormData): Promise<AddToBagState> {
  const product = getProduct(String(formData.get("slug") ?? ""));

  if (!product) {
    return { status: "error", message: "This piece is no longer available." };
  }

  if (stockState(product) === "sold-out") {
    return { status: "error", message: `The ${product.name} is sold out.` };
  }

  // TODO: write to the shopping bag once a cart table and session are in place.
  return { status: "success", message: `The ${product.name} has been added to your bag.` };
}
