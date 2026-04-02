import { styles } from "../doctor.styles";

export default function DoctorAppointmentCard({
  appointment,
  statusStyle,
  approveButtonStyle,
  secondaryButtonStyle,
  onConfirm,
  onComplete,
}) {
  return (
    <div style={styles.recordCard}>
      <div style={styles.recordHeader}>
        <div>
          <h3 style={styles.recordTitle}>{appointment.patient}</h3>
          <p style={styles.recordText}>{appointment.type}</p>
        </div>
        <span style={statusStyle}>{appointment.status}</span>
      </div>

      <div style={styles.recordMeta}>
        <span>{appointment.time}</span>
      </div>

      <div style={styles.rowActions}>
        <button type="button" style={approveButtonStyle} onClick={onConfirm}>
          Confirm
        </button>
        <button type="button" style={secondaryButtonStyle} onClick={onComplete}>
          Complete
        </button>
      </div>
    </div>
  );
}
