// File: src/components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_LOCALE } from "../../lib/i18n";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="footer-social-icon"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="footer-social-icon"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

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
    instagramUrl: string;
    instagramAriaLabel: string;
    facebookUrl: string;
    facebookAriaLabel: string;
    designedByPrefix: string;
    designedByName: string;
    designedByUrl: string;
    designedByAriaLabel: string;
  };
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const socialLinks = [
    {
      key: "instagram",
      href: footer.instagramUrl,
      ariaLabel: footer.instagramAriaLabel,
      icon: <InstagramIcon />,
    },
    {
      key: "facebook",
      href: footer.facebookUrl,
      ariaLabel: footer.facebookAriaLabel,
      icon: <FacebookIcon />,
    },
  ].filter((item) => item.href);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href={base || "/"} className="footer-brand-link">
              <Image
                src="/sastrust-beige-footer.png"
                alt={footer.brandTitle}
                width={874}
                height={285}
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
            {socialLinks.length > 0 ? (
              <div className="footer-social" aria-label={footer.contactTitle}>
                {socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={item.ariaLabel}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="footer-credit">
          <span>{footer.designedByPrefix}</span>
          <a
            href={footer.designedByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
            aria-label={footer.designedByAriaLabel}
          >
            <Image
              src="/coreborn-logo.webp"
              alt={footer.designedByName}
              width={512}
              height={88}
              className="footer-credit-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
