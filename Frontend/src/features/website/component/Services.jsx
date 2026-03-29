export default function Services() {
  return (
    <section className="services">
      <span className="eyebrow">Core Services</span>

      <h2 className="section-title">Healthcare experiences built around real needs.</h2>

      <p className="center-text">
        From consultations to urgent care, every service is designed to feel
        trusted, responsive, and easy to access.
      </p>

      <div className="service-cards">
        <div className="card">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" alt="Doctor Consultation"/>
          <span className="card-tag">Consult</span>
          <h3>Doctor Consultation</h3>
          <p>Meet experienced clinicians for clear diagnosis, treatment planning, and follow-up care.</p>
        </div>

        <div className="card">
          <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b" alt="Online Pharmacy"/>
          <span className="card-tag">Pharmacy</span>
          <h3>Online Pharmacy</h3>
          <p>Manage prescriptions and order medicines with a smooth, dependable digital experience.</p>
        </div>

        <div className="card">
          <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7" alt="Emergency Care"/>
          <span className="card-tag">Emergency</span>
          <h3>Emergency Care</h3>
          <p>Get immediate support with rapid response teams and coordinated hospital care.</p>
        </div>
      </div>
    </section>
  );
}
