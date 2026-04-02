export const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 20px",
    background:
      "linear-gradient(135deg, #fff6e9 0%, #fffef7 45%, #ffffff 100%)",
  },
  container: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "grid",
    gap: "24px",
  },
  heroPanel: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gap: "18px",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    alignItems: "center",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#ffedd5",
    color: "#9a3412",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  title: {
    marginTop: "14px",
    marginBottom: "10px",
    color: "#111827",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  description: {
    margin: 0,
    color: "#4b5563",
    lineHeight: 1.7,
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  heroMeta: {
    display: "grid",
    gap: "14px",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  },
  metaCard: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: "18px",
    padding: "18px",
    display: "grid",
    gap: "6px",
  },
  metaLabel: {
    color: "#9a3412",
    fontSize: "0.92rem",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  metaValue: {
    fontSize: "1.9rem",
    color: "#111827",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  summaryCard: {
    background: "#fffdf8",
    border: "1px solid #fde6bf",
    borderRadius: "16px",
    padding: "18px",
  },
  summaryValue: {
    fontSize: "1.8rem",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  summaryLabel: {
    marginBottom: 0,
    color: "#4b5563",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  tabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  tabButton: {
    border: "1px solid #fed7aa",
    background: "#fff7ed",
    color: "#9a3412",
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: 700,
    cursor: "pointer",
  },
  activeTabButton: {
    background: "#c2410c",
    color: "#ffffff",
    borderColor: "#c2410c",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  panel: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
  },
  fullWidthPanel: {
    gridColumn: "1 / -1",
  },
  subTitle: {
    marginTop: 0,
    color: "#111827",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  list: {
    margin: 0,
    paddingLeft: "18px",
    color: "#4b5563",
    lineHeight: 1.9,
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  actionGroup: {
    display: "grid",
    gap: "12px",
  },
  actionButton: {
    border: "none",
    borderRadius: "14px",
    padding: "14px 16px",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
  },
  alertList: {
    display: "grid",
    gap: "12px",
  },
  alertItem: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: "14px",
    padding: "14px 16px",
    color: "#7c2d12",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  panelHeader: {
    display: "grid",
    gap: "8px",
    marginBottom: "18px",
  },
  helperText: {
    color: "#6b7280",
    fontSize: "0.95rem",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  recordGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  recordCard: {
    background: "#fffaf5",
    border: "1px solid #fde6bf",
    borderRadius: "18px",
    padding: "18px",
    display: "grid",
    gap: "14px",
  },
  recordHeader: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  recordTitle: {
    margin: 0,
    color: "#111827",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  recordText: {
    margin: 0,
    color: "#6b7280",
    lineHeight: 1.6,
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  recordMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    color: "#7c2d12",
    fontSize: "0.92rem",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  statusBadge: {
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "0.84rem",
    fontWeight: 700,
    textTransform: "capitalize",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  rowActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  smallButton: {
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    textAlign: "left",
    padding: "14px",
    background: "#fff7ed",
    color: "#9a3412",
    borderBottom: "1px solid #fed7aa",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  tableCell: {
    padding: "14px",
    borderBottom: "1px solid #f3f4f6",
    color: "#374151",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  patientStatus: {
    display: "inline-block",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "0.82rem",
    fontWeight: 700,
    textTransform: "capitalize",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
  emptyState: {
    padding: "20px",
    background: "#fff7ed",
    border: "1px dashed #fdba74",
    borderRadius: "16px",
    color: "#9a3412",
    cursor: "default",
    userSelect: "none",
    caretColor: "transparent",
  },
};

export const summaryColors = {
  doctors: { color: "#b45309" },
  users: { color: "#1d4ed8" },
  pending: { color: "#d97706" },
  blocked: { color: "#dc2626" },
};

export const buttonColors = {
  doctors: { background: "#c2410c" },
  users: { background: "#1d4ed8" },
  reports: { background: "#111827" },
  block: { background: "#dc2626" },
};

export function getStatusBadgeStyle(status) {
  const palette = {
    active: { background: "#dcfce7", color: "#166534" },
    pending: { background: "#fef3c7", color: "#92400e" },
    blocked: { background: "#fee2e2", color: "#991b1b" },
  };

  return {
    ...styles.statusBadge,
    ...(palette[status] || palette.pending),
  };
}

export function getPatientStatusStyle(status) {
  const palette = {
    active: { background: "#dcfce7", color: "#166534" },
    waiting: { background: "#dbeafe", color: "#1d4ed8" },
    discharged: { background: "#f3f4f6", color: "#374151" },
  };

  return {
    ...styles.patientStatus,
    ...(palette[status] || palette.waiting),
  };
}
