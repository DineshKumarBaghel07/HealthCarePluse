export const initialDoctors = [
  {
    id: 1,
    name: "Dr. Riya Sharma",
    specialty: "Cardiology",
    patients: 34,
    status: "active",
    requests: 3,
    experience: "8 years",
  },
  {
    id: 2,
    name: "Dr. Aman Verma",
    specialty: "Neurology",
    patients: 21,
    status: "pending",
    requests: 5,
    experience: "5 years",
  },
  {
    id: 3,
    name: "Dr. Neha Saini",
    specialty: "Dermatology",
    patients: 18,
    status: "blocked",
    requests: 0,
    experience: "6 years",
  },
  {
    id: 4,
    name: "Dr. Karan Singh",
    specialty: "Orthopedics",
    patients: 26,
    status: "active",
    requests: 2,
    experience: "10 years",
  },
];

export const initialPatients = [
  { id: 1, name: "Pooja Meena", assignedDoctor: "Dr. Riya Sharma", status: "active" },
  { id: 2, name: "Rohit Jain", assignedDoctor: "Dr. Aman Verma", status: "waiting" },
  { id: 3, name: "Kritika Gupta", assignedDoctor: "Dr. Karan Singh", status: "active" },
  { id: 4, name: "Manoj Kumar", assignedDoctor: "Dr. Riya Sharma", status: "discharged" },
  { id: 5, name: "Anita Joshi", assignedDoctor: "Dr. Neha Saini", status: "active" },
];

export const initialAlerts = [
  "3 doctor approvals are waiting for review",
  "1 blocked doctor account needs a follow-up decision",
  "12 patients are currently in active care",
];
