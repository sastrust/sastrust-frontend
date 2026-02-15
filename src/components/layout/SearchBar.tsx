// File: src/components/layout/SearchBar.tsx
// Search input UI for site-wide search.
"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "../../lib/search";

export default function SearchBar({
  locale,
  placeholder,
  buttonText,
  items,
  noResultsText,
  onNavigate,
}: {
  locale: string;
  placeholder: string;
  buttonText: string;
  items: SearchItem[];
  noResultsText: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return items
      .filter((item) => {
        const haystack = [item.label, item.description ?? "", item.keywords ?? ""]
          .join(" ")
          .toLocaleLowerCase(locale);
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [items, locale, normalizedQuery]);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, []);

  const showDropdown = isOpen && normalizedQuery.length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]?.href) {
      setIsOpen(false);
      setQuery("");
      onNavigate?.();
      router.push(results[0].href);
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    onNavigate?.();
  };

  return (
    <div className="search-box" ref={rootRef}>
      <form role="search" aria-label={placeholder} className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          name="q"
          value={query}
          aria-label={placeholder}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!isOpen) setIsOpen(true);
          }}
        />
        <button type="submit">{buttonText}</button>
      </form>

      {showDropdown ? (
        <div className="search-dropdown">
          {results.length > 0 ? (
            <ul className="search-results">
              {results.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} onClick={handleResultClick}>
                    <span className="search-result-title">{item.label}</span>
                    {item.description ? (
                      <span className="search-result-desc">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-empty">{noResultsText}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
