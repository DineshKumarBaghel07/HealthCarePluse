import { styles } from "../superAdmin.styles";

export default function TabButton({ label, isActive, onClick }) {
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
