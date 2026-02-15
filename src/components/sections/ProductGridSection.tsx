// File: src/components/sections/ProductGridSection.tsx
// Section: Product Grid (catalog)
// Fields (max): title, products[{ slug, title, subtitle, images, badges }]
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
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
  products: {
    slug: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    parameters?: Record<string, string | string[]>;
  }[];
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortMode, setSortMode] = useState<"default" | "title-asc" | "title-desc">("default");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const derivedFilters = useMemo(() => {
    const groups = new Map<string, Set<string>>();

    products.forEach((product) => {
      const params = product.parameters ?? {};
      Object.entries(params).forEach(([groupName, rawValue]) => {
        const values = Array.isArray(rawValue) ? rawValue : [rawValue];
        if (!groups.has(groupName)) {
          groups.set(groupName, new Set<string>());
        }
        values.forEach((value) => {
          if (typeof value === "string" && value.trim()) {
            groups.get(groupName)?.add(value);
          }
        });
      });
    });

    if (groups.size > 0) {
      return [...groups.entries()].map(([groupName, values]) => ({
        title: groupName,
        options: [...values],
      }));
    }

    return filters;
  }, [products, filters]);

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const params = product.parameters ?? {};

      return derivedFilters.every((group) => {
        const selected = selectedFilters[group.title] ?? [];
        if (selected.length === 0) {
          return true;
        }

        const rawValue = params[group.title];
        const productValues = Array.isArray(rawValue)
          ? rawValue
          : rawValue
            ? [rawValue]
            : [];

        return selected.some((value) => productValues.includes(value));
      });
    });

    if (sortMode === "title-asc") {
      return [...next].sort((a, b) => a.title.localeCompare(b.title, locale));
    }

    if (sortMode === "title-desc") {
      return [...next].sort((a, b) => b.title.localeCompare(a.title, locale));
    }

    return next;
  }, [products, selectedFilters, derivedFilters, sortMode, locale]);

  const selectedCount = Object.values(selectedFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  const sortDefault = locale === "tr" ? "Önerilen" : "Recommended";
  const sortAsc = locale === "tr" ? "İsim (A-Z)" : "Name (A-Z)";
  const sortDesc = locale === "tr" ? "İsim (Z-A)" : "Name (Z-A)";
  const clearFiltersText = locale === "tr" ? "Filtreleri temizle" : "Clear filters";
  const resultsText = locale === "tr" ? "ürün" : "products";

  const handleFilterToggle = (groupTitle: string, option: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const current = prev[groupTitle] ?? [];
      const nextValues = checked
        ? [...current, option]
        : current.filter((value) => value !== option);

      const next = { ...prev };
      if (nextValues.length > 0) {
        next[groupTitle] = nextValues;
      } else {
        delete next[groupTitle];
      }
      return next;
    });
  };

  return (
    <section className="section product-grid">
      <div className="container">
        <div className="product-grid-head">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="h1">{title}</h1>
          </div>
          <div className="product-grid-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              {filterLabel}
              {selectedCount > 0 ? ` (${selectedCount})` : ""}
            </button>
            <label className="sort-control">
              <span>{sortLabel}</span>
              <select
                value={sortMode}
                onChange={(event) =>
                  setSortMode(event.target.value as "default" | "title-asc" | "title-desc")
                }
              >
                <option value="default">{sortDefault}</option>
                <option value="title-asc">{sortAsc}</option>
                <option value="title-desc">{sortDesc}</option>
              </select>
            </label>
          </div>
        </div>

        {isFilterOpen ? (
          <div className="filters">
            {derivedFilters.map((filter, index) => (
              <div className="filter-group" key={`${filter.title}-${index}`}>
                <div className="filter-title">{filter.title}</div>
                {filter.options.map((option, optionIndex) => {
                  const checked = (selectedFilters[filter.title] ?? []).includes(option);
                  const inputId = `filter-${filter.title}-${option}-${optionIndex}`
                    .toLocaleLowerCase(locale)
                    .replace(/\s+/g, "-");

                  return (
                    <label className="filter-item" key={`${option}-${optionIndex}`} htmlFor={inputId}>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={(event) =>
                          handleFilterToggle(filter.title, option, event.target.checked)
                        }
                      />{" "}
                      {option}
                    </label>
                  );
                })}
              </div>
            ))}
            <div className="filters-clear">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSelectedFilters({})}
              >
                {clearFiltersText}
              </button>
            </div>
          </div>
        ) : null}

        <div className="product-result-count">
          {filteredProducts.length} {resultsText}
        </div>

        <div className="product-cards">
          {filteredProducts.map((product) => (
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
