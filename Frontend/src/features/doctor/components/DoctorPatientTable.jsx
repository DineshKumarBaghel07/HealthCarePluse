import { styles } from "../doctor.styles";

export default function DoctorPatientTable({
  patients,
  getPatientStatusStyle,
}) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHead}>Patient</th>
            <th style={styles.tableHead}>Condition</th>
            <th style={styles.tableHead}>Status</th>
            <th style={styles.tableHead}>Next Visit</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={styles.tableCell}>{patient.name}</td>
              <td style={styles.tableCell}>{patient.condition}</td>
              <td style={styles.tableCell}>
                <span style={getPatientStatusStyle(patient.status)}>
                  {patient.status}
                </span>
              </td>
              <td style={styles.tableCell}>{patient.nextVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
