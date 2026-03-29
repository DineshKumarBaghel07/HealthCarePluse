export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="eyebrow">Smart Care, Human Touch</span>
        <h1>Modern healthcare designed for calmer, faster patient journeys.</h1>

        <p>
          Book appointments, connect with trusted doctors, and access
          personalized support from a platform built to feel seamless at every
          step.
        </p>

        <div className="hero-icons">
          <span>Specialist Consultations</span>
          <span>Digital Prescriptions</span>
          <span>Emergency Response</span>
          <span>Continuous Care</span>
        </div>

        <div className="hero-actions">
          <button className="hero-btn">Book Appointment</button>
          <button className="hero-btn secondary-btn">Explore Services</button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <strong>24/7</strong>
            <span>Patient assistance</span>
          </div>
          <div className="stat-card">
            <strong>120+</strong>
            <span>Qualified specialists</span>
          </div>
          <div className="stat-card">
            <strong>18k+</strong>
            <span>Appointments managed</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-shell">
          <div className="hero-badge hero-badge-top">
            <strong>98%</strong>
            <span>patient satisfaction</span>
          </div>
          <img
            src="https://i.pinimg.com/736x/69/0d/30/690d30a022897f4a4ccf7560419b5175.jpg"
            alt="Healthcare professionals"
          />
          <div className="hero-badge hero-badge-bottom">
            <strong>AI Assistant</strong>
            <span>instant guidance and support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
