"use client";

import { useActionState } from "react";

import { subscribeToNewsletter, type NewsletterState } from "@/app/actions";

const initialState: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);
  const invalid = state.status === "error";

  return (
    <form action={formAction} noValidate className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="type-caption text-muted">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            aria-invalid={invalid}
            aria-describedby="newsletter-status"
            className="field-line"
          />
        </div>
        <button type="submit" className="btn btn-primary max-md:btn-block" disabled={pending}>
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p id="newsletter-status" role="status" className={`type-small ${invalid ? "text-error" : "text-success"}`}>
        {state.message}
      </p>
    </form>
  );
}
