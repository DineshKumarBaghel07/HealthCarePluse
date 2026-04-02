export const doctorStats = (stats) => [
  {
    value: stats.appointments,
    label: "Today Appointments",
    colorKey: "appointments",
  },
  { value: stats.patients, label: "Active Patients", colorKey: "patients" },
  { value: stats.reports, label: "Pending Reports", colorKey: "reports" },
];

export const doctorQuickActions = [
  {
    label: "Open Appointments",
    colorKey: "appointments",
    tab: "appointments",
  },
  {
    label: "Review Patients",
    colorKey: "records",
    tab: "patients",
  },
  {
    label: "Manage Availability",
    colorKey: "availability",
    tab: "availability",
  },
];

export const doctorAlerts = [
  "Two follow-up appointments need confirmation today.",
  "One patient report is still waiting for review.",
  "Your afternoon video consultation slot is open.",
];

export const doctorAppointments = [
  {
    id: 1,
    patient: "Pooja Meena",
    time: "09:30 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Rohit Jain",
    time: "11:00 AM",
    type: "Diabetes Review",
    status: "waiting",
  },
  {
    id: 3,
    patient: "Kritika Gupta",
    time: "02:30 PM",
    type: "Video Consultation",
    status: "confirmed",
  },
  {
    id: 4,
    patient: "Manoj Kumar",
    time: "05:00 PM",
    type: "Emergency Review",
    status: "waiting",
  },
];

export const doctorPatients = [
  {
    id: 1,
    name: "Pooja Meena",
    condition: "Hypertension",
    status: "stable",
    nextVisit: "April 03",
  },
  {
    id: 2,
    name: "Rohit Jain",
    condition: "Diabetes",
    status: "attention",
    nextVisit: "April 01",
  },
  {
    id: 3,
    name: "Kritika Gupta",
    condition: "Joint Pain",
    status: "stable",
    nextVisit: "April 04",
  },
  {
    id: 4,
    name: "Manoj Kumar",
    condition: "Chest Follow-up",
    status: "critical",
    nextVisit: "Today",
  },
];

export const doctorAvailabilitySlots = [
  { id: 1, day: "Monday", time: "09:00 AM - 12:00 PM", available: true },
  { id: 2, day: "Monday", time: "02:00 PM - 05:00 PM", available: false },
  { id: 3, day: "Tuesday", time: "10:00 AM - 01:00 PM", available: true },
  { id: 4, day: "Wednesday", time: "03:00 PM - 06:00 PM", available: true },
];
