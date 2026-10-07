import Link from "next/link";

import { footerNav } from "@/components/site/navigation";

export function SiteFooter() {
  return (
    <footer className="theme-inverse">
      <div className="container-page pt-section pb-8">
        <div className="grid-page gap-y-10">
          {footerNav.map((group) => (
            <div key={group.title} className="col-span-2 lg:col-span-3">
              <h2 className="type-title-xs">{group.title}</h2>
              <ul className="mt-5 flex flex-col gap-3 type-small text-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <h2 className="type-title-xs">Ship To</h2>
            <p className="mt-5 type-small text-muted">United States · English · USD</p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-section border-t pt-8 text-center font-display text-[clamp(3.5rem,17vw,15rem)] uppercase leading-[0.85] tracking-[0.08em]"
        >
          Atelier
        </p>

        <p className="mt-8 type-caption text-muted">Atelier · Demonstration storefront</p>
      </div>
    </footer>
  );
}
