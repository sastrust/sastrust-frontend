// File: src/components/layout/NavMenu.tsx
// Navigation: Home, About, Products, Contact
import Link from "next/link";
import { DEFAULT_LOCALE } from "../../lib/i18n";

export default function NavMenu({
  locale,
  labels,
}: {
  locale: string;
  labels: { home: string; about: string; products: string; contact: string };
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <nav aria-label="Primary" className="nav">
      <ul className="nav-list">
        <li>
          <Link href={base || "/"}>{labels.home}</Link>
        </li>
        <li>
          <Link href={base ? `${base}/about` : "/about"}>{labels.about}</Link>
        </li>
        <li>
          <Link href={base ? `${base}/products` : "/products"}>{labels.products}</Link>
        </li>
        <li>
          <Link href={base ? `${base}/contact` : "/contact"}>{labels.contact}</Link>
        </li>
      </ul>
    </nav>
  );
}
