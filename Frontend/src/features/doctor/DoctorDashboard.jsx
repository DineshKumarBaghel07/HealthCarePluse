import { useState, useMemo } from "react";
import { useAuth } from "../auth/hooks/useAuth.js";
/* ─── DATA ──────────────────────────────────────────────────────────── */
const APPOINTMENTS_DATA = [
  { id: 1, time: "9:00", period: "AM", name: "Ravi Mehta", type: "Follow-up · Hypertension", status: "confirmed", initials: "RM", color: "#1a3a5c" },
  { id: 2, time: "9:45", period: "AM", name: "Sita Patel", type: "New Patient · Diabetes", status: "waiting", initials: "SP", color: "#2d1b4e" },
  { id: 3, time: "10:30", period: "AM", name: "Arjun Kapoor", type: "Consultation · Fever", status: "confirmed", initials: "AK", color: "#1a3a40" },
  { id: 4, time: "11:15", period: "AM", name: "Priya Singh", type: "Review · Cardiac", status: "waiting", initials: "PS", color: "#3d2020" },
  { id: 5, time: "2:00", period: "PM", name: "Kiran Das", type: "Post-op · Checkup", status: "completed", initials: "KD", color: "#2a2a2a" },
  { id: 6, time: "3:30", period: "PM", name: "Vikram Joshi", type: "Consultation · Migraine", status: "waiting", initials: "VJ", color: "#1e3a2a" },
];

const PATIENTS_DATA = [
  { name: "Ravi Mehta", id: "P-1042", condition: "Hypertension", status: "active", visit: "Apr 15" },
  { name: "Sita Patel", id: "P-1043", condition: "Type 2 Diabetes", status: "monitor", visit: "Apr 10" },
  { name: "Arjun Kapoor", id: "P-1044", condition: "Viral Fever", status: "active", visit: "Apr 8" },
  { name: "Priya Singh", id: "P-1038", condition: "Cardiac Arrhythmia", status: "critical", visit: "Apr 5" },
  { name: "Kiran Das", id: "P-1035", condition: "Post-Surgery", status: "active", visit: "Apr 20" },
  { name: "Vikram Joshi", id: "P-1046", condition: "Chronic Migraine", status: "monitor", visit: "Apr 12" },
];

const ALERTS_DATA = [
  { type: "crit", title: "Critical BP Alert", body: "Priya Singh — 180/110 mmHg", time: "5 min ago" },
  { type: "warn", title: "Lab Results Ready", body: "Ravi Mehta — Lipid panel", time: "22 min ago" },
  { type: "info", title: "New Booking", body: "Vikram Joshi — 3:30 PM", time: "41 min ago" },
  { type: "warn", title: "Prescription Refill", body: "Kiran Das — Metoprolol", time: "1 hr ago" },
];

const SLOTS_DATA = [
  { id: 1, day: "Monday", time: "9–12 AM", on: true },
  { id: 2, day: "Tuesday", time: "9–12 AM", on: true },
  { id: 3, day: "Wednesday", time: "2–5 PM", on: false },
  { id: 4, day: "Thursday", time: "9–12 AM", on: true },
  { id: 5, day: "Friday", time: "2–5 PM", on: false },
];

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: "grid" },
  { id: "appointments", label: "Appointments", icon: "calendar" },
  { id: "patients", label: "Patients", icon: "users" },
  { id: "reports", label: "Reports", icon: "file" },
];

/* ─── ICONS ──────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const s = { width: size, height: size, fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    users: <><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M19 11v6m-3-3h6" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="12" y2="17" /></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    cross: <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeWidth={2.5} />,
    warn: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
    alert: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .09h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />,
    check: <><polyline points="20 6 9 17 4 12" /></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{icons[name]}</svg>;
};

/* ─── STYLES ─────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #080f1c;
    --navy-mid: #0d1a2e;
    --navy-card: #101e34;
    --navy-hover: #162540;
    --teal: #00d4a8;
    --teal-dim: #00b893;
    --teal-bg: rgba(0,212,168,0.1);
    --teal-border: rgba(0,212,168,0.25);
    --amber: #f59e0b;
    --amber-bg: rgba(245,158,11,0.1);
    --amber-border: rgba(245,158,11,0.25);
    --red: #f04747;
    --red-bg: rgba(240,71,71,0.1);
    --red-border: rgba(240,71,71,0.25);
    --indigo: #7c83f7;
    --indigo-bg: rgba(124,131,247,0.1);
    --border: rgba(255,255,255,0.07);
    --border-md: rgba(255,255,255,0.12);
    --text-1: #eef2f7;
    --text-2: #8fa3bb;
    --text-3: #4d657d;
    --font: 'DM Sans', sans-serif;
    --serif: 'DM Serif Display', serif;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --sidebar-w: 220px;
    --topbar-h: 60px;
    --transition: 0.2s ease;
  }

  .dash-root {
    font-family: var(--font);
    background: var(--navy);
    color: var(--text-1);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* TOPBAR */
  .topbar {
    height: var(--topbar-h);
    background: rgba(8,15,28,0.95);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(12px);
    flex-shrink: 0;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .logo-mark {
    width: 34px; height: 34px;
    background: var(--teal);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .brand { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; color: var(--text-1); }
  .brand span { color: var(--teal); }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .status-pill {
    display: flex; align-items: center; gap: 6px;
    background: var(--teal-bg);
    border: 1px solid var(--teal-border);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px; font-weight: 500; color: var(--teal);
  }
  .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 8px var(--teal); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .doc-info { text-align: right; display: flex; flex-direction: column; }
  .doc-name-top { font-size: 13px; font-weight: 500; color: var(--text-1); line-height: 1.2; }
  .doc-specialty { font-size: 11px; color: var(--text-3); }
  .avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #1a3a5c, #00d4a8);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: white;
    border: 2px solid var(--teal-border);
    flex-shrink: 0;
    cursor: pointer;
  }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 10px;
    background: transparent; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-2);
    transition: all var(--transition);
  }
  .icon-btn:hover { background: var(--navy-hover); border-color: var(--border-md); color: var(--text-1); }
  .menu-btn { display: none; }

  /* LAYOUT */
  .layout { display: flex; flex: 1; overflow: hidden; position: relative; }

  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--navy-mid);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 20px 12px;
    gap: 4px;
    flex-shrink: 0;
    overflow-y: auto;
    transition: transform var(--transition);
  }
  .sidebar-section-label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 2px;
    color: var(--text-3); padding: 8px 10px 4px; margin-top: 8px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: var(--radius-sm);
    cursor: pointer; color: var(--text-2);
    font-size: 14px; font-weight: 400;
    transition: all var(--transition);
    border: 1px solid transparent;
    user-select: none;
  }
  .nav-item:hover { background: var(--navy-hover); color: var(--text-1); }
  .nav-item.active {
    background: var(--teal-bg);
    color: var(--teal);
    border-color: var(--teal-border);
    font-weight: 500;
  }
  .nav-badge {
    margin-left: auto; font-size: 10px; font-weight: 600;
    background: var(--red-bg); color: var(--red);
    border-radius: 10px; padding: 2px 7px;
    border: 1px solid var(--red-border);
  }
  .sidebar-doctor-card {
    margin-top: auto; padding: 14px 12px;
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .sidebar-doc-row { display: flex; align-items: center; gap: 10px; }
  .sidebar-doc-name { font-size: 13px; font-weight: 500; color: var(--text-1); }
  .sidebar-doc-role { font-size: 11px; color: var(--text-3); }

  /* SIDEBAR OVERLAY (mobile) */
  .sidebar-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 90;
  }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

  /* HERO */
  .hero {
    padding: 24px 28px 20px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, rgba(0,212,168,0.04) 0%, transparent 60%);
    flex-shrink: 0;
  }
  .hero-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 16px; }
  .greeting-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: var(--teal); margin-bottom: 4px; font-weight: 500; }
  .hero-title { font-family: var(--serif); font-size: 28px; color: var(--text-1); line-height: 1.15; }
  .hero-title em { color: var(--teal); font-style: italic; }
  .hero-sub { font-size: 13px; color: var(--text-2); margin-top: 6px; }
  .hero-meta { text-align: right; flex-shrink: 0; }
  .hero-date-num { font-size: 30px; font-weight: 200; color: var(--text-1); line-height: 1; }
  .hero-date-label { font-size: 11px; color: var(--text-3); text-transform: uppercase; letter-spacing: 1px; }
  .hero-date-sub { font-size: 12px; color: var(--text-2); margin-top: 2px; }

  /* KPI GRID */
  .kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .kpi-card {
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    position: relative;
    overflow: hidden;
    transition: border-color var(--transition), transform var(--transition);
    cursor: default;
  }
  .kpi-card:hover { border-color: var(--border-md); transform: translateY(-1px); }
  .kpi-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .kpi-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); margin-bottom: 8px; }
  .kpi-value { font-size: 30px; font-weight: 200; color: var(--text-1); line-height: 1; }
  .kpi-value b { font-weight: 600; }
  .kpi-delta {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; padding: 2px 8px; border-radius: 6px; margin-top: 8px;
    font-weight: 500;
  }
  .delta-teal { background: var(--teal-bg); color: var(--teal); }
  .delta-amber { background: var(--amber-bg); color: var(--amber); }
  .delta-red { background: var(--red-bg); color: var(--red); }
  .delta-indigo { background: var(--indigo-bg); color: var(--indigo); }

  /* CONTENT */
  .content-area { display: flex; flex: 1; overflow: hidden; }
  .center-col { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  .right-col { width: 240px; border-left: 1px solid var(--border); padding: 20px 16px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; flex-shrink: 0; }

  /* SECTION BLOCK */
  .section-block {
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 18px;
  }
  .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
  .panel-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-2); }
  .panel-action {
    font-size: 11px; color: var(--teal); cursor: pointer;
    background: var(--teal-bg); border: 1px solid var(--teal-border);
    padding: 4px 12px; border-radius: 20px; font-weight: 500;
    transition: all var(--transition);
  }
  .panel-action:hover { background: rgba(0,212,168,0.18); }

  /* TABS */
  .tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .tab-btn {
    font-size: 12px; padding: 5px 14px; border-radius: var(--radius-sm);
    cursor: pointer; border: 1px solid transparent;
    color: var(--text-3); font-family: var(--font);
    background: transparent;
    transition: all var(--transition); font-weight: 400;
  }
  .tab-btn:hover { color: var(--text-2); background: var(--navy-hover); }
  .tab-btn.active { background: var(--teal-bg); color: var(--teal); border-color: var(--teal-border); font-weight: 500; }

  /* APPOINTMENT CARD */
  .appt-list { display: flex; flex-direction: column; gap: 8px; }
  .appt-card {
    background: rgba(22,37,64,0.5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 12px 14px;
    display: flex; align-items: center; gap: 12px;
    transition: all var(--transition);
    cursor: pointer;
    flex-wrap: wrap;
  }
  .appt-card:hover { background: var(--navy-hover); border-color: rgba(0,212,168,0.18); }
  .appt-time-block { text-align: center; min-width: 40px; flex-shrink: 0; }
  .appt-time { font-size: 14px; font-weight: 600; color: var(--teal); line-height: 1; }
  .appt-period { font-size: 10px; color: var(--text-3); margin-top: 2px; }
  .appt-divider { width: 1px; height: 34px; background: var(--border); flex-shrink: 0; }
  .appt-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: white; flex-shrink: 0;
  }
  .appt-info { flex: 1; min-width: 100px; }
  .appt-name { font-size: 14px; font-weight: 500; color: var(--text-1); }
  .appt-type { font-size: 12px; color: var(--text-2); margin-top: 1px; }
  .status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; flex-shrink: 0; }
  .s-confirmed { background: var(--teal-bg); color: var(--teal); border: 1px solid var(--teal-border); }
  .s-waiting { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-border); }
  .s-completed { background: rgba(100,116,139,0.1); color: var(--text-3); border: 1px solid var(--border); }
  .appt-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .appt-btn {
    font-size: 11px; padding: 5px 12px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: transparent;
    color: var(--text-2); cursor: pointer; font-family: var(--font); font-weight: 400;
    transition: all var(--transition);
  }
  .appt-btn:hover { border-color: var(--teal-border); color: var(--teal); background: var(--teal-bg); }
  .appt-btn.primary {
    background: var(--teal); color: var(--navy);
    border-color: var(--teal); font-weight: 600;
  }
  .appt-btn.primary:hover { background: var(--teal-dim); }

  /* PATIENT TABLE */
  .patient-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .patient-table th { text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); border-bottom: 1px solid var(--border); font-weight: 500; }
  .patient-table td { padding: 11px 10px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  .patient-table tr:last-child td { border-bottom: none; }
  .patient-table tr:hover td { background: rgba(0,212,168,0.03); }
  .pat-name { font-size: 13px; font-weight: 500; color: var(--text-1); }
  .pat-id { font-size: 11px; color: var(--text-3); }
  .pat-condition { font-size: 12px; color: var(--text-2); }
  .pat-badge { font-size: 10px; padding: 2px 9px; border-radius: 12px; font-weight: 500; }
  .p-active { background: var(--teal-bg); color: var(--teal); }
  .p-monitor { background: var(--amber-bg); color: var(--amber); }
  .p-critical { background: var(--red-bg); color: var(--red); }
  .pat-visit { font-size: 12px; color: var(--text-2); }

  /* ALERTS */
  .alert-list { display: flex; flex-direction: column; gap: 8px; }
  .alert-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 10px 12px; border-radius: var(--radius-md);
    background: rgba(22,37,64,0.4); border: 1px solid var(--border);
  }
  .alert-icon {
    width: 28px; height: 28px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .a-crit { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-border); }
  .a-warn { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-border); }
  .a-info { background: var(--teal-bg); color: var(--teal); border: 1px solid var(--teal-border); }
  .alert-body { flex: 1; min-width: 0; }
  .alert-title { font-size: 12px; font-weight: 500; color: var(--text-1); margin-bottom: 1px; }
  .alert-text { font-size: 11px; color: var(--text-2); }
  .alert-time { font-size: 10px; color: var(--text-3); margin-top: 2px; }

  /* AVAILABILITY */
  .avail-list { display: flex; flex-direction: column; gap: 7px; }
  .avail-slot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 11px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: rgba(22,37,64,0.4);
    cursor: pointer; transition: all var(--transition);
  }
  .avail-slot:hover { border-color: var(--border-md); }
  .avail-slot.on { border-color: var(--teal-border); background: var(--teal-bg); }
  .avail-day { font-size: 12px; font-weight: 500; color: var(--text-1); }
  .avail-time { font-size: 10px; color: var(--text-3); margin-top: 1px; }
  .toggle {
    width: 30px; height: 17px; border-radius: 9px;
    background: var(--border-md); position: relative; flex-shrink: 0;
    transition: background var(--transition);
  }
  .toggle.on { background: var(--teal); }
  .toggle-thumb {
    width: 13px; height: 13px; border-radius: 50%; background: white;
    position: absolute; top: 2px; left: 2px; transition: left var(--transition);
  }
  .toggle.on .toggle-thumb { left: 15px; }

  /* MINI STAT */
  .mini-stat {
    background: var(--navy-card); border: 1px solid var(--border);
    border-radius: var(--radius-md); padding: 14px;
  }
  .mini-stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); margin-bottom: 6px; }
  .mini-stat-val { font-size: 28px; font-weight: 200; color: var(--text-1); }
  .mini-stat-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; }

  .right-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-3); margin-bottom: 10px; }

  /* QUICK ACTIONS (overview) */
  .quick-actions { display: flex; flex-direction: column; gap: 6px; }
  .quick-action {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: rgba(22,37,64,0.4);
    cursor: pointer; color: var(--text-1); font-size: 13px; font-weight: 400;
    transition: all var(--transition);
  }
  .quick-action:hover { border-color: var(--teal-border); background: var(--teal-bg); color: var(--teal); }

  /* OVERVIEW CARDS */
  .overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .focus-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .focus-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-2); line-height: 1.5; }
  .focus-bullet { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); margin-top: 6px; flex-shrink: 0; }

  /* SCROLLBAR */
  .center-col::-webkit-scrollbar, .right-col::-webkit-scrollbar, .sidebar::-webkit-scrollbar { width: 3px; }
  .center-col::-webkit-scrollbar-track, .right-col::-webkit-scrollbar-track, .sidebar::-webkit-scrollbar-track { background: transparent; }
  .center-col::-webkit-scrollbar-thumb, .right-col::-webkit-scrollbar-thumb, .sidebar::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 2px; }

  /* ── RESPONSIVE ─────────────────────────────── */

  /* Large tablet: collapse right col */
  @media (max-width: 1100px) {
    .right-col { width: 200px; }
  }

  /* Tablet: hide right col, stack layout */
  @media (max-width: 900px) {
    :root { --sidebar-w: 200px; }
    .right-col { display: none; }
    .kpi-grid { grid-template-columns: repeat(2,1fr); }
    .hero { padding: 18px 20px 16px; }
    .center-col { padding: 16px 18px; }
  }

  /* Mobile sidebar behaviour */
  @media (max-width: 700px) {
    .sidebar {
      position: fixed;
      top: var(--topbar-h); left: 0; bottom: 0;
      z-index: 95;
      transform: translateX(-100%);
    }
    .sidebar.open { transform: translateX(0); }
    .sidebar-overlay { display: block; }
    .sidebar-overlay.hidden { display: none; }
    .menu-btn { display: flex; }
    .doc-info { display: none; }
    .status-pill { display: none; }
    .hero-title { font-size: 22px; }
    .hero-date-num { font-size: 24px; }
    .kpi-grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
    .kpi-value { font-size: 24px; }
    .hero { padding: 16px; }
    .center-col { padding: 12px 14px; }
    .appt-divider { display: none; }
    .brand { font-size: 15px; }
    .overview-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 420px) {
    .kpi-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
    .kpi-label { font-size: 9px; }
    .appt-actions { flex-wrap: wrap; }
    .topbar { padding: 0 14px; }
  }
`;

/* ─── COMPONENTS ─────────────────────────────────────────────────────── */

function KpiCard({ label, value, delta, deltaClass, barColor }) {
  return (
    <div className="kpi-card">
      <div className="kpi-bar" style={{ background: barColor }} />
      <div className="kpi-label">{label}</div>
      <div className="kpi-value"><b>{value}</b></div>
      <div className={`kpi-delta ${deltaClass}`}>{delta}</div>
    </div>
  );
}

function AppointmentCard({ appt, onConfirm, onComplete }) {
  const sc = appt.status === "confirmed" ? "s-confirmed" : appt.status === "waiting" ? "s-waiting" : "s-completed";
  const label = appt.status.charAt(0).toUpperCase() + appt.status.slice(1);
  return (
    <div className="appt-card">
      <div className="appt-time-block">
        <div className="appt-time">{appt.time}</div>
        <div className="appt-period">{appt.period}</div>
      </div>
      <div className="appt-divider" />
      <div className="appt-avatar" style={{ background: appt.color }}>{appt.initials}</div>
      <div className="appt-info">
        <div className="appt-name">{appt.name}</div>
        <div className="appt-type">{appt.type}</div>
      </div>
      <span className={`status-badge ${sc}`}>{label}</span>
      <div className="appt-actions">
        {appt.status === "waiting" && <><button className="appt-btn primary" onClick={onConfirm}>Confirm</button><button className="appt-btn" onClick={onComplete}>Done</button></>}
        {appt.status === "confirmed" && <button className="appt-btn" onClick={onComplete}>Mark Done</button>}
        {appt.status === "completed" && <button className="appt-btn">View Notes</button>}
      </div>
    </div>
  );
}

function AlertItem({ alert }) {
  const cls = alert.type === "crit" ? "a-crit" : alert.type === "warn" ? "a-warn" : "a-info";
  const icon = alert.type === "crit" ? "alert" : alert.type === "warn" ? "warn" : "phone";
  return (
    <div className="alert-item">
      <div className={`alert-icon ${cls}`}><Icon name={icon} size={14} /></div>
      <div className="alert-body">
        <div className="alert-title">{alert.title}</div>
        <div className="alert-text">{alert.body}</div>
        <div className="alert-time">{alert.time}</div>
      </div>
    </div>
  );
}

function AvailSlot({ slot, onToggle }) {
  return (
    <div className={`avail-slot ${slot.on ? "on" : ""}`} onClick={onToggle}>
      <div>
        <div className="avail-day">{slot.day}</div>
        <div className="avail-time">{slot.time}</div>
      </div>
      <div className={`toggle ${slot.on ? "on" : ""}`}>
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─────────────────────────────────────────────────── */
export default function DoctorDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [apptFilter, setApptFilter] = useState("all");
  const [appointments, setAppointments] = useState(APPOINTMENTS_DATA);
  const [slots, setSlots] = useState(SLOTS_DATA);
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const { user, handleLogout } = useAuth();
  const name = user?.username
  console.log(name)
  const profileLabel = user?.username?.[0]?.toUpperCase() || "P";
  console.log(profileLabel)

  const stats = useMemo(() => ({
    total: appointments.length,
    waiting: appointments.filter(a => a.status === "waiting").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    openSlots: slots.filter(s => s.on).length,
  }), [appointments, slots]);

  const filteredAppts = useMemo(() =>
    apptFilter === "all" ? appointments : appointments.filter(a => a.status === apptFilter),
    [appointments, apptFilter]
  );

  const confirmAppt = (id) => setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "confirmed" } : a));
  const completeAppt = (id) => setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "completed" } : a));
  const toggleSlot = (id) => setSlots(prev => prev.map(s => s.id === id ? { ...s, on: !s.on } : s));

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <style>{css}</style>
      <div className="dash-root">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn menu-btn" onClick={() => setSidebarOpen(o => !o)}>
              <Icon name={sidebarOpen ? "x" : "menu"} size={18} />
            </button>
            <div className="logo-mark">
              <Icon name="cross" size={18} color="#080f1c" />
            </div>
            <span className="brand">HealthCare+</span>
          </div>
          <div className="topbar-right">
            <div className="status-pill"><div className="status-dot" />On Duty</div>
            <div className="doc-info">
              <span className="doc-name-top">{name}</span>
              <span className="doc-specialty">Internal Medicine</span>
            </div>
            <button className="icon-btn"><Icon name="bell" size={16} /></button>
            <div className="avatar">{profileLabel}</div>
          </div>
        </header>

        <div className="layout">
          {/* SIDEBAR OVERLAY */}
          <div className={`sidebar-overlay ${sidebarOpen ? "" : "hidden"}`} onClick={closeSidebar} />

          {/* SIDEBAR */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-section-label">Main</div>
            {NAV_ITEMS.map(item => (
              <div key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => { setActiveNav(item.id); closeSidebar(); }}>
                <Icon name={item.icon} size={16} />
                {item.label}
                {item.id === "appointments" && stats.waiting > 0 && <span className="nav-badge">{stats.waiting}</span>}
              </div>
            ))}
            <div className="sidebar-section-label">Tools</div>
            <div className="nav-item" onClick={closeSidebar}><Icon name="chat" size={16} />Messages</div>
            <div className="nav-item" onClick={closeSidebar}><Icon name="bell" size={16} />Notifications</div>

            <div className="sidebar-doctor-card">
              <div className="sidebar-doc-row">
                <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>AS</div>
                <div>
                  <div className="sidebar-doc-name">Dr. A. Sharma</div>
                  <div className="sidebar-doc-role">Internal Medicine</div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN PANEL */}
          <main className="main">
            {/* HERO */}
            <div className="hero">
              <div className="hero-top">
                <div>
                  <div className="greeting-tag">Good morning</div>
                  <h1 className="hero-title">{name}<em>Clinic</em></h1>
                  <p className="hero-sub">Thursday, 2 April 2026 &nbsp;·&nbsp; Internal Medicine</p>
                </div>
                <div className="hero-meta">
                  <div className="hero-date-label">Today's Load</div>
                  <div className="hero-date-num">{stats.total}</div>
                  <div className="hero-date-sub">appointments</div>
                </div>
              </div>
              <div className="kpi-grid">
                <KpiCard label="Total Appointments" value={stats.total} delta="↑ 3 from yesterday" deltaClass="delta-teal" barColor="var(--teal)" />
                <KpiCard label="Waiting" value={stats.waiting} delta="Pending review" deltaClass="delta-amber" barColor="var(--amber)" />
                <KpiCard label="Patients" value={PATIENTS_DATA.length} delta="↑ 2 new this week" deltaClass="delta-indigo" barColor="var(--indigo)" />
                <KpiCard label="Open Slots" value={stats.openSlots} delta={`${5 - stats.openSlots} blocked`} deltaClass="delta-red" barColor="var(--red)" />
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="content-area">
              <div className="center-col">

                {/* ── OVERVIEW ── */}
                {activeNav === "overview" && (
                  <>
                    <div className="section-block">
                      <div className="panel-header">
                        <span className="panel-title">Daily Focus</span>
                      </div>
                      <div className="overview-grid">
                        <ul className="focus-list">
                          {["Review waiting appointments before consultation hours", "Check active patient updates from the patient table", "Keep your availability accurate for new bookings", "Track alerts and pending follow-ups from one place"].map(t => (
                            <li key={t}><div className="focus-bullet" />{t}</li>
                          ))}
                        </ul>
                        <div className="quick-actions">
                          {[
                            { label: "Go to Appointments", tab: "appointments", icon: "calendar" },
                            { label: "View Patients", tab: "patients", icon: "users" },
                            { label: "Manage Availability", tab: "availability", icon: "check" },
                            { label: "Open Reports", tab: "reports", icon: "file" },
                          ].map(a => (
                            <div key={a.label} className="quick-action" onClick={() => setActiveNav(a.tab)}>
                              <Icon name={a.icon} size={15} />{a.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="section-block">
                      <div className="panel-header">
                        <span className="panel-title">Upcoming Appointments</span>
                        <span className="panel-action" onClick={() => setActiveNav("appointments")}>View All →</span>
                      </div>
                      <div className="appt-list">
                        {appointments.slice(0, 3).map(a => (
                          <AppointmentCard key={a.id} appt={a} onConfirm={() => confirmAppt(a.id)} onComplete={() => completeAppt(a.id)} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ── APPOINTMENTS ── */}
                {activeNav === "appointments" && (
                  <div className="section-block">
                    <div className="panel-header">
                      <span className="panel-title">Appointment Queue</span>
                      <div className="tabs">
                        {["all", "waiting", "confirmed", "completed"].map(f => (
                          <button key={f} className={`tab-btn ${apptFilter === f ? "active" : ""}`} onClick={() => setApptFilter(f)}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="appt-list">
                      {filteredAppts.length === 0
                        ? <div style={{ textAlign: "center", padding: "24px", color: "var(--text-3)", fontSize: 13 }}>No appointments found.</div>
                        : filteredAppts.map(a => <AppointmentCard key={a.id} appt={a} onConfirm={() => confirmAppt(a.id)} onComplete={() => completeAppt(a.id)} />)
                      }
                    </div>
                  </div>
                )}

                {/* ── PATIENTS ── */}
                {activeNav === "patients" && (
                  <div className="section-block">
                    <div className="panel-header">
                      <span className="panel-title">Patient Records</span>
                      <span className="panel-action">Export →</span>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table className="patient-table">
                        <thead>
                          <tr>
                            <th>Patient</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Next Visit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PATIENTS_DATA.map(p => {
                            const cls = p.status === "active" ? "p-active" : p.status === "monitor" ? "p-monitor" : "p-critical";
                            const label = p.status.charAt(0).toUpperCase() + p.status.slice(1);
                            return (
                              <tr key={p.id}>
                                <td><div className="pat-name">{p.name}</div><div className="pat-id">{p.id}</div></td>
                                <td className="pat-condition">{p.condition}</td>
                                <td><span className={`pat-badge ${cls}`}>{label}</span></td>
                                <td className="pat-visit">{p.visit}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── AVAILABILITY ── */}
                {activeNav === "availability" && (
                  <div className="section-block">
                    <div className="panel-header">
                      <span className="panel-title">Availability Manager</span>
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>Toggle consultation slots on or off</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
                      {slots.map(s => <AvailSlot key={s.id} slot={s} onToggle={() => toggleSlot(s.id)} />)}
                    </div>
                  </div>
                )}

                {/* ── REPORTS ── */}
                {activeNav === "reports" && (
                  <div className="section-block">
                    <div className="panel-header">
                      <span className="panel-title">Reports</span>
                    </div>
                    <div style={{ padding: "32px 0", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>
                      <Icon name="file" size={32} color="var(--text-3)" />
                      <p style={{ marginTop: 12 }}>No pending reports. All records are up to date.</p>
                    </div>
                  </div>
                )}

              </div>

              {/* RIGHT COL */}
              <aside className="right-col">
                <div>
                  <div className="right-section-label">Alerts</div>
                  <div className="alert-list">
                    {ALERTS_DATA.map((a, i) => <AlertItem key={i} alert={a} />)}
                  </div>
                </div>

                <div>
                  <div className="right-section-label">Availability</div>
                  <div className="avail-list">
                    {slots.map(s => <AvailSlot key={s.id} slot={s} onToggle={() => toggleSlot(s.id)} />)}
                  </div>
                </div>

                <div className="mini-stat">
                  <div className="mini-stat-label">Confirmed Today</div>
                  <div className="mini-stat-val">{stats.confirmed}</div>
                  <div className="mini-stat-sub">of {stats.total} appointments</div>
                </div>

                <div className="mini-stat">
                  <div className="mini-stat-label">Waiting</div>
                  <div className="mini-stat-val" style={{ color: stats.waiting > 0 ? "var(--amber)" : "var(--text-1)" }}>{stats.waiting}</div>
                  <div className="mini-stat-sub">patients pending</div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}