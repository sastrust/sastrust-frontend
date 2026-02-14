// File: src/components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_LOCALE } from "../../lib/i18n";

export default function Footer({
  locale,
  nav,
  footer,
}: {
  locale: string;
  nav: {
    home: string;
    about: string;
    products: string;
    contact: string;
  };
  footer: {
    brandTitle: string;
    brandBody: string;
    pagesTitle: string;
    contactTitle: string;
    email: string;
    phone: string;
  };
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href={base || "/"} className="footer-brand-link">
              <Image
                src="/sastrust-beige-footer.png"
                alt={footer.brandTitle}
                width={170}
                height={58}
                className="footer-brand-logo"
              />
            </Link>
            <p className="footer-text">{footer.brandBody}</p>
          </div>
          <div>
            <div className="footer-title">{footer.pagesTitle}</div>
            <ul className="footer-list">
              <li>
                <Link href={`${base}/`}>{nav.home}</Link>
              </li>
              <li>
                <Link href={`${base}/about`}>{nav.about}</Link>
              </li>
              <li>
                <Link href={`${base}/products`}>{nav.products}</Link>
              </li>
              <li>
                <Link href={`${base}/contact`}>{nav.contact}</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-title">{footer.contactTitle}</div>
            <ul className="footer-list">
              <li>{footer.email}</li>
              <li>{footer.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
