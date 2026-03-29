import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="about-page">
        <div className="about-container">
          <span className="eyebrow">About Us</span>
          <h1>Healthcare that feels premium, personal, and reassuring.</h1>

          <p className="about-text">
            Our hospital blends advanced medicine with thoughtful design and
            patient-first systems so every visit feels clear, supportive, and
            trustworthy.
          </p>

          <div className="about-features">
            <div className="feature">
              <span className="card-tag">Experts</span>
              <h3>Experienced Doctors</h3>
              <p>
                Our team includes highly qualified specialists across multiple
                medical departments.
              </p>
            </div>

            <div className="feature">
              <span className="card-tag">Technology</span>
              <h3>Modern Equipment</h3>
              <p>
                We use advanced medical technology for accurate diagnosis and
                world-class treatment.
              </p>
            </div>

            <div className="feature">
              <span className="card-tag">Support</span>
              <h3>24/7 Emergency</h3>
              <p>
                Our emergency department is available 24 hours for urgent
                medical care and quick response.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
