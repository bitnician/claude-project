"use client";

import Link from "next/link";
import { useRef } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { primaryNav } from "@/components/site/navigation";

export function MenuDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="nav-link flex items-center gap-2 py-3"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
        <span className="max-md:sr-only">Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Main menu"
        // Clicks on the ::backdrop land on the dialog element itself.
        onClick={(event) => event.target === event.currentTarget && close()}
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-full max-w-md -translate-x-full bg-background p-0 text-foreground transition-[translate,overlay,display] transition-discrete duration-500 ease-editorial backdrop:bg-backdrop backdrop:opacity-0 backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-500 open:translate-x-0 open:backdrop:opacity-100 starting:open:-translate-x-full starting:open:backdrop:opacity-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-header items-center justify-between border-b px-gutter">
            <span className="type-title-xs">Menu</span>
            <button type="button" className="btn btn-icon -mr-3" aria-label="Close menu" onClick={close}>
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-gutter py-8">
            <ul className="flex flex-col gap-5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link type-title-m" onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 border-t px-gutter py-6 type-small">
            <Link href="/account" className="link self-start" onClick={close}>
              Sign In
            </Link>
            <Link href="/appointments" className="link self-start" onClick={close}>
              Book an Appointment
            </Link>
            <Link href="/contact" className="link self-start" onClick={close}>
              Contact Us
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
