import { styles } from "../doctor.styles";

export default function DoctorAlertList({ alerts }) {
  return (
    <div style={styles.alertList}>
      {alerts.map((alert) => (
        <div key={alert} style={styles.alertItem}>
          {alert}
        </div>
      ))}
    </div>
  );
}
