import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat.js";

const Dashboard = () => {
  const { initializeSocketConnection } = useChat();
  const user = useSelector((state) => state.auth.user);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    socketRef.current = initializeSocketConnection(user);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, initializeSocketConnection]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>
          Dashboard{" "}
          {user?.username && (
            <span style={styles.username}>👋 {user.username}</span>
          )}
        </h2>
        <p style={styles.subText}>
          Welcome to your healthcare assistant 🚀
        </p>
      </div>

      {/* Cards Section */}
      <div style={styles.cardContainer}>
        
        {/* Appointment Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📅 Upcoming Appointment</h3>
          <p><strong>Date:</strong> 5 April 2026</p>
          <p><strong>Time:</strong> 10:30 AM</p>
          <p><strong>Status:</strong> Confirmed ✅</p>
        </div>

        {/* Doctor Info */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>👨‍⚕️ Doctor Details</h3>
          <p><strong>Doctor:</strong> Dr. Sharma</p>
          <p><strong>Specialist:</strong> Cardiologist</p>
          <p><strong>Hospital:</strong> City Care Hospital</p>
        </div>

        {/* Treatment Info */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💊 Treatment</h3>
          <p><strong>Condition:</strong> Blood Pressure</p>
          <p><strong>Medication:</strong> Amlodipine</p>
          <p><strong>Next Checkup:</strong> 15 April</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;


const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "25px",
  },

  heading: {
    fontSize: "26px",
    marginBottom: "5px",
  },

  username: {
    color: "#4f46e5",
    fontWeight: "600",
  },

  subText: {
    color: "#666",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#4f46e5",
  },
};