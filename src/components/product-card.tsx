import Image from "next/image";
import Link from "next/link";

import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media-frame media-zoom aspect-product">
        <Image src={product.image.src} alt={product.image.alt} fill sizes={sizes} />
        {product.label ? (
          <span className="absolute top-3 left-3 bg-background px-2 py-1 type-caption">{product.label}</span>
        ) : null}
      </div>
      <div className="mt-3 flex flex-col gap-1 lg:mt-4">
        <h3 className="type-small font-medium">
          <span className="link">{product.name}</span>
        </h3>
        <p className="type-small text-muted">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
