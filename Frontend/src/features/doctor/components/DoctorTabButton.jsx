import { styles } from "../doctor.styles";

export default function DoctorTabButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles.tabButton,
        ...(isActive ? styles.activeTabButton : {}),
      }}
    >
      {label}
    </button>
  );
}
