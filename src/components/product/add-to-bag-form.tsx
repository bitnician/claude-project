"use client";

import { useActionState } from "react";

import { addToBag, type AddToBagState } from "@/app/actions";
import { BagIcon } from "@/components/icons";

const initialState: AddToBagState = { status: "idle", message: "" };

export function AddToBagForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState(addToBag, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        <BagIcon width={16} height={16} />
        {pending ? "Adding…" : "Add to Bag"}
      </button>
      <p role="status" className={`type-small ${state.status === "error" ? "text-error" : "text-success"}`}>
        {state.message}
      </p>
    </form>
  );
}
