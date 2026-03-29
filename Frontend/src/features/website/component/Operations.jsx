export default function Operations() {
  return(
    <section className="operations">
      <span className="eyebrow">Clinical Excellence</span>
      <h2 className="section-title">Advanced departments with a premium care environment.</h2>

      <p className="operation-text">
        Every specialty is backed by coordinated teams, modern infrastructure,
        and patient-centered communication.
      </p>

      <div className="operation-grid">
        <div className="operation-card">
          <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c" alt="Internal Medicine"/>
          <h4>Internal Medicine</h4>
          <p>Preventive care and specialist guidance for long-term wellness.</p>
        </div>

        <div className="operation-card">
          <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67" alt="Surgery"/>
          <h4>General Surgery</h4>
          <p>Precision-led procedures supported by attentive recovery planning.</p>
        </div>

        <div className="operation-card">
          <img src="https://images.unsplash.com/photo-1581595219315-a187dd40c322" alt="Anesthesia"/>
          <h4>Anesthesia Care</h4>
          <p>Safe perioperative care with experienced anesthesiology teams.</p>
        </div>

        <div className="operation-card">
          <img src="https://images.unsplash.com/photo-1516549655669-df88006bdb03" alt="Gynecology"/>
          <h4>Gynecology Department</h4>
          <p>Dedicated women’s health services delivered with privacy and care.</p>
        </div>
      </div>
    </section>
  )
}
