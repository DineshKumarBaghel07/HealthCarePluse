import { styles } from "../superAdmin.styles";

export default function DoctorRecordCard({
  doctor,
  statusStyle,
  allowButtonStyle,
  blockButtonStyle,
  onAllow,
  onBlock,
  compact = false,
  approveLabel = "Allow",
  rejectLabel = "Block",
}) {
  return (
    <div style={styles.recordCard}>
      {compact ? (
        <>
          <h3 style={styles.recordTitle}>{doctor.name}</h3>
          <p style={styles.recordText}>
            {doctor.specialty} - {doctor.experience}
          </p>
          <p style={styles.recordText}>
            {doctor.requests} patient requests are waiting for approval.
          </p>
        </>
      ) : (
        <>
          <div style={styles.recordHeader}>
            <div>
              <h3 style={styles.recordTitle}>{doctor.name}</h3>
              <p style={styles.recordText}>{doctor.specialty}</p>
            </div>
            <span style={statusStyle}>{doctor.status}</span>
          </div>

          <div style={styles.recordMeta}>
            <span>{doctor.experience}</span>
            <span>{doctor.patients} patients</span>
            <span>{doctor.requests} new requests</span>
          </div>
        </>
      )}

      <div style={styles.rowActions}>
        <button type="button" style={allowButtonStyle} onClick={onAllow}>
          {approveLabel}
        </button>
        <button type="button" style={blockButtonStyle} onClick={onBlock}>
          {rejectLabel}
        </button>
      </div>
    </div>
  );
}
