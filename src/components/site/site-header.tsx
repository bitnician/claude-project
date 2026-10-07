import Link from "next/link";

import { AccountIcon, BagIcon, SearchIcon } from "@/components/icons";
import { MenuDrawer } from "@/components/site/menu-drawer";
import { primaryNav } from "@/components/site/navigation";

export function SiteHeader() {
  return (
    <>
      <p className="bg-surface px-gutter py-2.5 text-center type-caption">
        Complimentary <span className="max-md:hidden">express </span>shipping and returns
        <span className="max-md:hidden"> on every order</span>
      </p>

      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-page header-bar">
          <div className="flex items-center gap-6">
            <MenuDrawer />
            <nav aria-label="Featured" className="hidden xl:block">
              <ul className="flex gap-6">
                {primaryNav.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link
            href="/"
            className="font-display text-[1.375rem] uppercase leading-none tracking-[0.25em] lg:text-[1.75rem]"
          >
            Atelier
          </Link>

          <div className="-mr-3 flex items-center">
            <Link href="/search" className="btn btn-icon" aria-label="Search">
              <SearchIcon />
            </Link>
            <Link href="/account" className="btn btn-icon max-md:hidden" aria-label="Account">
              <AccountIcon />
            </Link>
            <Link href="/cart" className="btn btn-icon" aria-label="Shopping bag, 0 items">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
