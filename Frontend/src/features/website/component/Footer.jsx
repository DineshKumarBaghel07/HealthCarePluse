export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-about">
          <span className="eyebrow footer-eyebrow">HealthCare+</span>
          <h3>HealthCare+</h3>
          <p>
            A modern healthcare experience shaped by compassionate clinicians,
            intelligent systems, and beautifully simple patient journeys.
          </p>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Jaipur, Rajasthan, India</p>
          <p>hospital@email.com</p>
          <p>+91 8824487607</p>
        </div>

        <div className="footer-news">
          <h4>Care Promise</h4>
          <p>Fast response times across essential departments.</p>
          <p>Transparent guidance before, during, and after treatment.</p>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Subscribe for wellness insights and hospital updates.</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <p className="copyright">&copy; 2026 HealthCare+. All Rights Reserved.</p>
    </footer>
  );
}
