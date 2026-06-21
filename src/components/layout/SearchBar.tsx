// File: src/components/layout/SearchBar.tsx
// Search input UI for site-wide search.
"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { SearchItem } from "../../lib/search";

export default function SearchBar({
  locale,
  placeholder,
  buttonText,
  items,
  noResultsText,
  onNavigate,
  variant = "field",
}: {
  locale: string;
  placeholder: string;
  buttonText: string;
  items: SearchItem[];
  noResultsText: string;
  onNavigate?: () => void;
  variant?: "field" | "icon";
}) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (variant === "icon" && isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, variant]);

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

  const searchForm = (
    <>
      <form role="search" aria-label={placeholder} className="search" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
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
    </>
  );

  if (variant === "icon") {
    return (
      <div className="search-box search-box-icon" ref={rootRef}>
        <button
          type="button"
          className="search-trigger"
          aria-label={placeholder}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
        </button>
        {isOpen ? <div className="search-popover">{searchForm}</div> : null}
      </div>
    );
  }

  return (
    <div className="search-box" ref={rootRef}>
      {searchForm}
    </div>
  );
}
