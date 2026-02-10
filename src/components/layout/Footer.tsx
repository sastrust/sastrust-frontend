// File: src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Footer columns placeholder */}
          <div>
            <div className="footer-title">Brand</div>
            <p className="footer-text">
              Editorial, minimal, and focused on clarity.
            </p>
          </div>
          <div>
            <div className="footer-title">Pages</div>
            <ul className="footer-list">
              <li>Home</li>
              <li>About</li>
              <li>Products</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Contact</div>
            <ul className="footer-list">
              <li>info@example.com</li>
              <li>+90 000 000 0000</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
