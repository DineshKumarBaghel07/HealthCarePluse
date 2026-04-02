import { styles } from "../superAdmin.styles";

export default function SummaryCard({ value, label, valueStyle }) {
  return (
    <div style={styles.summaryCard}>
      <strong style={{ ...styles.summaryValue, ...valueStyle }}>{value}</strong>
      <p style={styles.summaryLabel}>{label}</p>
    </div>
  );
}
