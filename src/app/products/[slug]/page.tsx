import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PlusIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { AddToBagForm } from "@/components/product/add-to-bag-form";
import {
  categorySlug,
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
  services,
  stockState,
  type Product,
  type StockState,
} from "@/lib/catalog";

// Every product page is prerendered at build time; unknown slugs fall through to notFound().
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, alt: product.image.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <article className="container-page pt-4 lg:pt-6">
        <Breadcrumbs product={product} />
        <div className="mt-4 grid-page gap-y-8 lg:mt-6">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Gallery product={product} />
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </article>
      <RelatedProducts product={product} />
      <ProductJsonLd product={product} />
    </>
  );
}

function Breadcrumbs({ product }: { product: Product }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 type-caption text-muted">
        <li>
          <Link href="/" className="link">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          <Link href={`/${categorySlug(product.category)}`} className="link">
            {product.category}
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function Gallery({ product }: { product: Product }) {
  const [main, ...details] = [product.image, ...product.gallery];

  return (
    // Below lg: a full-bleed swipe strip where the next shot peeks in. From lg: the main shot large, details 2-up.
    <div
      role="region"
      aria-label={`${product.name} images`}
      tabIndex={0}
      className="-mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-grid overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0"
    >
      <div className="media-frame aspect-product w-[85%] shrink-0 snap-start md:w-[60%] lg:col-span-2 lg:w-auto">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          sizes="(min-width: 64rem) 55vw, (min-width: 48rem) 60vw, 85vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      {details.map((photo) => (
        <div key={photo.src} className="media-frame aspect-product w-[85%] shrink-0 snap-start md:w-[60%] lg:w-auto">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 28vw, (min-width: 48rem) 60vw, 85vw" />
        </div>
      ))}
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  const state = stockState(product);

  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-3 type-caption text-muted">
        <Link href={`/${categorySlug(product.category)}`} className="link">
          {product.category}
        </Link>
        {product.label ? <span className="bg-surface px-2 py-1 text-foreground">{product.label}</span> : null}
      </p>
      <h1 className="mt-3 type-title-l">{product.name}</h1>
      <p className="mt-2 type-lead">{formatPrice(product.price)}</p>

      <StockStatus state={state} stock={product.stock} className="mt-6" />

      <p className="mt-6 type-body text-muted">{product.description}</p>

      <div className="mt-8">
        {state === "sold-out" ? (
          <div className="flex flex-col gap-3">
            <button type="button" className="btn btn-primary btn-block" disabled>
              Sold Out
            </button>
            <Link href="/appointments" className="btn btn-secondary btn-block">
              Ask a Client Advisor
            </Link>
            <p className="type-small text-muted">
              This piece may return. An advisor can find it in store or suggest an alternative.
            </p>
          </div>
        ) : (
          <AddToBagForm slug={product.slug} />
        )}
      </div>

      <div className="mt-6 border-t">
        <Disclosure title="Details" defaultOpen>
          <ul className="flex flex-col gap-1.5">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure title="Shipping & Returns">
          <p>{services[0].description}</p>
          <p className="mt-2">{services[1].description}</p>
        </Disclosure>
        <Disclosure title="Gift Wrapping">
          <p>{services[3].description}</p>
        </Disclosure>
      </div>
    </div>
  );
}

const stockCopy: Record<StockState, { dot: string; label: (stock: number) => string }> = {
  "in-stock": { dot: "bg-success", label: () => "In stock" },
  "low-stock": { dot: "bg-warning", label: (stock) => `Only ${stock} left` },
  "sold-out": { dot: "bg-muted", label: () => "Sold out" },
};

function StockStatus({ state, stock, className }: { state: StockState; stock: number; className?: string }) {
  const { dot, label } = stockCopy[state];

  return (
    <p className={`flex items-center gap-2 type-small ${className ?? ""}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {label(stock)}
    </p>
  );
}

function Disclosure({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  return (
    <details className="group border-b" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 type-title-xs [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon width={16} height={16} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 type-body text-muted">{children}</div>
    </details>
  );
}

function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);

  return (
    <section aria-labelledby="related-title" className="container-page section-y">
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="type-caption text-muted">Continue Browsing</p>
          <h2 id="related-title" className="mt-2 type-title-m">
            You May Also Like
          </h2>
        </div>
        <Link href={`/${categorySlug(product.category)}`} className="link-underlined type-cta">
          View All {product.category}
        </Link>
      </div>

      <ul className="grid-products">
        {related.map((item, index) => (
          // Three-up on tablet: show three so the row is full.
          <li key={item.slug} className={index >= 3 ? "md:max-lg:hidden" : undefined}>
            <ProductCard product={item} sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image, ...product.gallery].map((photo) => photo.src),
    category: product.category,
    brand: { "@type": "Brand", name: "Atelier" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: `https://schema.org/${stockState(product) === "sold-out" ? "OutOfStock" : "InStock"}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so catalog copy can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
