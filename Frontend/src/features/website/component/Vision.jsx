export default function Vision() {
  return (
    <section className="vision">
      <div className="vision-left">
        <div className="vision-image-shell">
          <img
          src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b"
          alt="Medical Team"
        />
          <div className="vision-floating-card">
            <strong>Integrated Care</strong>
            <span>Technology, empathy, and clinical precision in one flow.</span>
          </div>
        </div>
      </div>

      <div className="vision-right">
        <span className="eyebrow">Why Patients Choose Us</span>
        <h2>We combine elegant digital care with compassionate medical attention.</h2>

        <p>
          Our vision is to make healthcare feel less stressful and more
          intuitive, blending advanced tools with warm, patient-first service.
        </p>

        <div className="vision-points">
          <div className="vision-point">
            <strong>Fast coordination</strong>
            <span>Appointments, departments, and follow-ups stay connected.</span>
          </div>
          <div className="vision-point">
            <strong>Clinical confidence</strong>
            <span>Experienced teams supported by modern diagnostics.</span>
          </div>
        </div>

        <button className="vision-btn">Learn More</button>
      </div>
    </section>
  )
}
