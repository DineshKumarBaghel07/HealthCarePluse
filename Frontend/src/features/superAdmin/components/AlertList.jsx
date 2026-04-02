import { styles } from "../superAdmin.styles";

export default function AlertList({ alerts }) {
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
