import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { campaign, categories, collections, editorial, newArrivals, services } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedCollections />
      <NewArrivals />
      <Editorial />
      <ShopByCategory />
      <Services />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [primary, secondary] = campaign.images;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-image">
      {/* One image on phones, a diptych from tablet up. Height leaves the announcement bar and header in view. */}
      <div className="grid h-[calc(100svh-var(--header-height)-2rem)] max-h-[64rem] min-h-[34rem] md:grid-cols-2">
        <div className="media-frame">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-[50%_25%]"
          />
        </div>
        <div className="media-frame max-md:hidden">
          <Image
            src={secondary.src}
            alt={secondary.alt}
            fill
            sizes="50vw"
            loading="eager"
            fetchPriority="high"
            className="object-[50%_30%]"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/25 to-transparent pt-40">
        <div className="theme-inverse container-page flex flex-col items-center bg-transparent pb-12 text-center lg:pb-16">
          <p className="type-caption">{campaign.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 type-display-m">
            {campaign.title}
          </h1>
          <p className="mt-4 max-w-md type-lead">{campaign.description}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/women" className="btn btn-primary">
              Shop Women
            </Link>
            <Link href="/men" className="btn btn-secondary">
              Shop Men
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="container-text section-y text-center">
      <p className="type-caption text-muted">The House</p>
      <p className="mt-6 type-title-l">
        Made slowly, in small numbers, by hands that have done it for decades.
      </p>
      <Link href="/about" className="link-underlined mt-8 inline-block type-cta">
        Our Story
      </Link>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section aria-labelledby="collections-title" className="container-page">
      <h2 id="collections-title" className="sr-only">
        Featured collections
      </h2>
      <div className="grid gap-x-grid gap-y-12 md:grid-cols-2">
        {collections.map((collection) => (
          <Link key={collection.slug} href={`/${collection.slug}`} className="group block">
            <div className="media-frame media-zoom aspect-product lg:aspect-portrait">
              <Image
                src={collection.image.src}
                alt={collection.image.alt}
                fill
                sizes="(min-width: 48rem) 50vw, 100vw"
              />
            </div>
            <div className="mt-5 flex flex-col items-start gap-2">
              <p className="type-caption text-muted">{collection.eyebrow}</p>
              <h3 className="type-title-l">{collection.title}</h3>
              <p className="max-w-sm type-body text-muted">{collection.description}</p>
              <span className="link-underlined mt-2 type-cta">Discover</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section aria-labelledby="new-arrivals-title" className="container-page section-y">
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="type-caption text-muted">This Week</p>
          <h2 id="new-arrivals-title" className="mt-2 type-title-m">
            New Arrivals
          </h2>
        </div>
        <Link href="/new-in" className="link-underlined type-cta">
          View All
        </Link>
      </div>

      <ul className="grid-products">
        {newArrivals.map((product, index) => (
          // Three-up on tablet: show six so the last row is full.
          <li key={product.slug} className={index >= 6 ? "md:max-lg:hidden" : undefined}>
            <ProductCard product={product} sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Editorial() {
  return (
    <section aria-labelledby="editorial-title" className="theme-inverse">
      <div className="container-page section-y grid-page items-center gap-y-10">
        <div className="col-span-4 lg:col-span-6">
          <div className="media-frame aspect-portrait">
            <Image src={editorial.image.src} alt={editorial.image.alt} fill sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 50vw, 100vw" />
          </div>
        </div>
        <div className="col-span-4 md:pl-6 lg:col-span-4 lg:col-start-8 lg:pl-0">
          <p className="type-caption text-muted">{editorial.eyebrow}</p>
          <h2 id="editorial-title" className="mt-4 type-title-xl">
            {editorial.title}
          </h2>
          <p className="mt-6 type-lead text-muted">{editorial.description}</p>
          <Link href="/journal" className="btn btn-secondary mt-10">
            Read the Story
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ShopByCategory() {
  return (
    <section aria-labelledby="categories-title" className="container-page section-y">
      <h2 id="categories-title" className="mb-8 text-center type-title-m lg:mb-10">
        Shop by Category
      </h2>
      <ul className="grid grid-cols-2 gap-x-grid gap-y-8 md:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/${category.slug}`} className="group block">
              <div className="media-frame media-zoom aspect-product">
                <Image src={category.image.src} alt={category.image.alt} fill sizes="(min-width: 48rem) 25vw, 50vw" />
              </div>
              <h3 className="mt-4 text-center type-title-xs">
                <span className="link">{category.title}</span>
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="services-title" className="border-t">
      <div className="container-page py-12 lg:py-16">
        <h2 id="services-title" className="sr-only">
          Client services
        </h2>
        <ul className="grid gap-x-grid gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.title} className="text-center md:px-4">
              <h3 className="type-title-xs">{service.title}</h3>
              <p className="mx-auto mt-3 max-w-xs type-small text-muted">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="bg-surface">
      <div className="container-text section-y">
        <h2 id="newsletter-title" className="text-center type-title-l">
          Letters from the House
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center type-body text-muted">
          New collections, private events and stories from the workshop, sent a few times each season.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
