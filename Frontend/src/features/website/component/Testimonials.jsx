export default function Testimonials(){
  return(
    <section className="testimonials">
      <span className="eyebrow">Real Stories</span>
      <h2 className="section-title">Patients remember how confidently and kindly they were treated.</h2>

      <p className="testimonial-text">
        Thoughtful support, modern facilities, and clear communication define
        every interaction across the hospital journey.
      </p>

      <div className="testimonial-cards">
        <div className="testimonial-card">
          <p>
            "The experience felt calm from the first appointment to discharge.
            Every doctor explained the next step clearly."
          </p>
          <h4>Ahmed Khan</h4>
          <span>Cardiac patient</span>
        </div>

        <div className="testimonial-card">
          <p>
            "The staff was warm, the hospital looked beautiful, and the online
            process saved so much time for my family."
          </p>
          <h4>Priya Sharma</h4>
          <span>Outpatient visitor</span>
        </div>

        <div className="testimonial-card">
          <p>
            "Emergency care was fast and coordinated. We felt supported at
            every moment, even during a stressful situation."
          </p>
          <h4>Rahul Mehta</h4>
          <span>Emergency case family</span>
        </div>
      </div>
    </section>
  )
}
