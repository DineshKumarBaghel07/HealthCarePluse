import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="page contact-page">
        <span className="eyebrow">Appointments</span>
        <h1>Book care in minutes with a cleaner, guided experience.</h1>

        <p className="contact-text">
          Share a few details and our team will help schedule the right
          consultation, department, and time slot for you.
        </p>

        <div className="contact-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />

          <select>
            <option>Select Department</option>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Orthopedics</option>
            <option>Gynecology</option>
            <option>Pediatrics</option>
          </select>

          <input type="date" />
          <textarea rows="5" placeholder="Describe your problem" />
          <button className="contact-btn">Book Appointment</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
