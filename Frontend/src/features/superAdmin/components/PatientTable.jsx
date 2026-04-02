import { styles } from "../superAdmin.styles";

export default function PatientTable({ patients, getPatientStatusStyle }) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHead}>Patient</th>
            <th style={styles.tableHead}>Assigned Doctor</th>
            <th style={styles.tableHead}>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={styles.tableCell}>{patient.name}</td>
              <td style={styles.tableCell}>{patient.assignedDoctor}</td>
              <td style={styles.tableCell}>
                <span style={getPatientStatusStyle(patient.status)}>
                  {patient.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
