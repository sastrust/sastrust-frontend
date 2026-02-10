// File: src/components/sections/ProductGridSection.tsx
// Section: Product Grid (catalog)
// Fields (max): title, products[{ slug, title, subtitle, images, badges }]
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_LOCALE } from "../../lib/i18n";

export default function ProductGridSection({
  locale,
  eyebrow,
  title,
  filterLabel,
  sortLabel,
  filters,
  products,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  filterLabel: string;
  sortLabel: string;
  filters: { title: string; options: string[] }[];
  products: { slug: string; title: string; subtitle: string; imageUrl: string }[];
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <section className="section product-grid">
      <div className="container">
        <div className="product-grid-head">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="h1">{title}</h1>
          </div>
          <div className="product-grid-actions">
            <button type="button" className="btn btn-ghost">
              {filterLabel}
            </button>
            <button type="button" className="btn btn-ghost">
              {sortLabel}
            </button>
          </div>
        </div>

        <div className="filters">
          {filters.map((filter, index) => (
            <div className="filter-group" key={`${filter.title}-${index}`}>
              <div className="filter-title">{filter.title}</div>
              {filter.options.map((option, optionIndex) => (
                <label className="filter-item" key={`${option}-${optionIndex}`}>
                  <input type="checkbox" /> {option}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="product-cards">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`${base}/products/${product.slug}`}
              className="product-card"
            >
              <div className="media-frame product-media">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
                    className="media-img"
                  />
                ) : null}
              </div>
              <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="product-subtitle">{product.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
