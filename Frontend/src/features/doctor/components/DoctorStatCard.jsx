import { styles } from "../doctor.styles";

export default function DoctorStatCard({ value, label, valueStyle }) {
  return (
    <div style={styles.card}>
      <strong style={{ ...styles.cardValue, ...valueStyle }}>{value}</strong>
      <p style={styles.cardText}>{label}</p>
    </div>
  );
}
