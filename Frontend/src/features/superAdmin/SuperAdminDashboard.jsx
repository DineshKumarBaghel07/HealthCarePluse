import { useState, useMemo } from "react";
import { useAuth } from "../auth/hooks/useAuth.js";

/* ─── DATA ──────────────────────────────────────────────────────────── */
const DOCTORS_DATA = [
  { id: 1, name: "Dr. Arjun Mehta", specialty: "Cardiology", hospital: "Apollo Hospital", email: "arjun.mehta@apollo.com", patients: 34, status: "active", initials: "AM", color: "#1a3a5c" },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Neurology", hospital: "Fortis Medical", email: "priya.sharma@fortis.com", patients: 21, status: "pending", initials: "PS", color: "#2d1b4e" },
  { id: 3, name: "Dr. Kiran Rao", specialty: "Orthopedics", hospital: "Max Healthcare", email: "kiran.rao@max.com", patients: 45, status: "active", initials: "KR", color: "#1a3a40" },
  { id: 4, name: "Dr. Neha Joshi", specialty: "Dermatology", hospital: "Medanta", email: "neha.joshi@medanta.com", patients: 18, status: "pending", initials: "NJ", color: "#3d2020" },
  { id: 5, name: "Dr. Vikram Das", specialty: "Psychiatry", hospital: "AIIMS Delhi", email: "vikram.das@aiims.com", patients: 27, status: "blocked", initials: "VD", color: "#2a2a2a" },
  { id: 6, name: "Dr. Anjali Singh", specialty: "Pediatrics", hospital: "Rainbow Hospital", email: "anjali.singh@rainbow.com", patients: 52, status: "active", initials: "AS", color: "#1e3a2a" },
];

const PATIENTS_DATA = [
  { id: "P-1042", name: "Ravi Mehta", doctor: "Dr. Arjun Mehta", condition: "Hypertension", status: "active", since: "Jan 2024" },
  { id: "P-1043", name: "Sita Patel", doctor: "Dr. Priya Sharma", condition: "Type 2 Diabetes", status: "monitor", since: "Mar 2024" },
  { id: "P-1044", name: "Arjun Kapoor", doctor: "Dr. Kiran Rao", condition: "Fracture Recovery", status: "active", since: "Feb 2024" },
  { id: "P-1038", name: "Priya Singh", doctor: "Dr. Arjun Mehta", condition: "Cardiac Arrhythmia", status: "critical", since: "Nov 2023" },
  { id: "P-1035", name: "Kiran Das", doctor: "Dr. Anjali Singh", condition: "Post-Surgery", status: "active", since: "Dec 2023" },
  { id: "P-1046", name: "Vikram Joshi", doctor: "Dr. Neha Joshi", condition: "Chronic Migraine", status: "monitor", since: "Apr 2024" },
  { id: "P-1047", name: "Deepa Nair", doctor: "Dr. Anjali Singh", condition: "Asthma", status: "active", since: "Jan 2024" },
];

const INITIAL_ALERTS = [
  { id: 1, type: "warn", title: "Pending Approval", body: "Dr. Priya Sharma awaiting verification", time: "10 min ago" },
  { id: 2, type: "crit", title: "Account Blocked", body: "Dr. Vikram Das — access suspended", time: "1 hr ago" },
  { id: 3, type: "info", title: "New Registration", body: "Dr. Neha Joshi submitted credentials", time: "2 hr ago" },
  { id: 4, type: "info", title: "System Check", body: "All services running normally", time: "4 hr ago" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "doctors", label: "Doctors", icon: "stethoscope" },
  { id: "patients", label: "Patients", icon: "users" },
  { id: "approvals", label: "Approvals", icon: "shield" },
];

/* ─── ICONS ──────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const s = { width: size, height: size, fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", display: "block", flexShrink: 0 };
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    stethoscope: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.3.3 0 1 0 .2.3"/><path d="M8 15v1a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-3"/><circle cx="20" cy="10" r="2"/></>,
    users: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M19 11v6m-3-3h6"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    cross: <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeWidth={2.5}/>,
    warn: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    ban: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
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
    --indigo-border: rgba(124,131,247,0.25);
    --green: #22c55e;
    --green-bg: rgba(34,197,94,0.1);
    --green-border: rgba(34,197,94,0.25);
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
    --tr: 0.2s ease;
  }

  .sa-root { font-family: var(--font); background: var(--navy); color: var(--text-1); min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; }

  /* TOPBAR */
  .sa-topbar { height: var(--topbar-h); background: rgba(8,15,28,0.95); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px); flex-shrink: 0; }
  .sa-topbar-left { display: flex; align-items: center; gap: 12px; }
  .sa-logo { width: 34px; height: 34px; background: var(--indigo); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .sa-brand { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; color: var(--text-1); }
  .sa-brand span { color: var(--indigo); }
  .sa-topbar-right { display: flex; align-items: center; gap: 10px; }
  .sa-status-pill { display: flex; align-items: center; gap: 6px; background: var(--indigo-bg); border: 1px solid var(--indigo-border); border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 500; color: var(--indigo); }
  .sa-status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--indigo); box-shadow: 0 0 8px var(--indigo); animation: saPulse 2s infinite; }
  @keyframes saPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .sa-admin-info { text-align: right; display: flex; flex-direction: column; }
  .sa-admin-name { font-size: 13px; font-weight: 500; color: var(--text-1); line-height: 1.2; }
  .sa-admin-role { font-size: 11px; color: var(--text-3); }
  .sa-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #2d1b4e, #7c83f7); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: white; border: 2px solid var(--indigo-border); flex-shrink: 0; cursor: pointer; }
  .sa-icon-btn { width: 36px; height: 36px; border-radius: 10px; background: transparent; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-2); transition: all var(--tr); }
  .sa-icon-btn:hover { background: var(--navy-hover); border-color: var(--border-md); color: var(--text-1); }
  .sa-menu-btn { display: none; }

  /* LAYOUT */
  .sa-layout { display: flex; flex: 1; overflow: hidden; position: relative; }

  /* SIDEBAR */
  .sa-sidebar { width: var(--sidebar-w); background: var(--navy-mid); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 20px 12px; gap: 4px; flex-shrink: 0; overflow-y: auto; transition: transform var(--tr); }
  .sa-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-3); padding: 8px 10px 4px; margin-top: 8px; }
  .sa-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-2); font-size: 14px; font-weight: 400; transition: all var(--tr); border: 1px solid transparent; user-select: none; }
  .sa-nav-item:hover { background: var(--navy-hover); color: var(--text-1); }
  .sa-nav-item.active { background: var(--indigo-bg); color: var(--indigo); border-color: var(--indigo-border); font-weight: 500; }
  .sa-nav-badge { margin-left: auto; font-size: 10px; font-weight: 600; background: var(--amber-bg); color: var(--amber); border-radius: 10px; padding: 2px 7px; border: 1px solid var(--amber-border); }
  .sa-sidebar-card { margin-top: auto; padding: 14px 12px; background: var(--navy-card); border: 1px solid var(--border); border-radius: var(--radius-md); }
  .sa-sidebar-card-row { display: flex; align-items: center; gap: 10px; }
  .sa-sidebar-name { font-size: 13px; font-weight: 500; color: var(--text-1); }
  .sa-sidebar-role { font-size: 11px; color: var(--text-3); }

  .sa-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 90; }

  /* MAIN */
  .sa-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

  /* HERO */
  .sa-hero { padding: 24px 28px 20px; border-bottom: 1px solid var(--border); background: linear-gradient(135deg, rgba(124,131,247,0.05) 0%, transparent 60%); flex-shrink: 0; }
  .sa-hero-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 16px; }
  .sa-greeting-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: var(--indigo); margin-bottom: 4px; font-weight: 500; }
  .sa-hero-title { font-family: var(--serif); font-size: 28px; color: var(--text-1); line-height: 1.15; }
  .sa-hero-title em { color: var(--indigo); font-style: italic; }
  .sa-hero-sub { font-size: 13px; color: var(--text-2); margin-top: 6px; }
  .sa-hero-meta { display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap; justify-content: flex-end; }
  .sa-meta-card { background: var(--navy-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px 16px; text-align: center; min-width: 90px; }
  .sa-meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--text-3); display: block; margin-bottom: 4px; }
  .sa-meta-val { font-size: 24px; font-weight: 200; color: var(--text-1); }
  .sa-meta-val.health { color: var(--teal); }
  .sa-meta-val.pending { color: var(--amber); }

  /* KPI GRID */
  .sa-kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .sa-kpi { background: var(--navy-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; position: relative; overflow: hidden; transition: border-color var(--tr), transform var(--tr); }
  .sa-kpi:hover { border-color: var(--border-md); transform: translateY(-1px); }
  .sa-kpi-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .sa-kpi-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); margin-bottom: 8px; }
  .sa-kpi-val { font-size: 30px; font-weight: 200; color: var(--text-1); line-height: 1; }
  .sa-kpi-val b { font-weight: 600; }
  .sa-kpi-delta { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; padding: 2px 8px; border-radius: 6px; margin-top: 8px; font-weight: 500; }
  .d-teal { background: var(--teal-bg); color: var(--teal); }
  .d-amber { background: var(--amber-bg); color: var(--amber); }
  .d-red { background: var(--red-bg); color: var(--red); }
  .d-indigo { background: var(--indigo-bg); color: var(--indigo); }

  /* CONTENT */
  .sa-content { display: flex; flex: 1; overflow: hidden; }
  .sa-center { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  .sa-right { width: 240px; border-left: 1px solid var(--border); padding: 20px 16px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; flex-shrink: 0; }

  /* SECTION BLOCK */
  .sa-block { background: var(--navy-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; }
  .sa-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
  .sa-panel-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-2); }
  .sa-panel-action { font-size: 11px; color: var(--indigo); cursor: pointer; background: var(--indigo-bg); border: 1px solid var(--indigo-border); padding: 4px 12px; border-radius: 20px; font-weight: 500; transition: all var(--tr); }
  .sa-panel-action:hover { background: rgba(124,131,247,0.18); }

  /* DOCTOR CARDS GRID */
  .sa-doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
  .sa-doc-card { background: rgba(22,37,64,0.5); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; transition: all var(--tr); }
  .sa-doc-card:hover { background: var(--navy-hover); border-color: var(--border-md); }
  .sa-doc-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
  .sa-doc-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: white; flex-shrink: 0; }
  .sa-doc-info { flex: 1; min-width: 0; }
  .sa-doc-name { font-size: 14px; font-weight: 500; color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sa-doc-specialty { font-size: 12px; color: var(--text-2); margin-top: 1px; }
  .sa-doc-hospital { font-size: 11px; color: var(--text-3); margin-top: 1px; }
  .sa-status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; flex-shrink: 0; }
  .sb-active { background: var(--teal-bg); color: var(--teal); border: 1px solid var(--teal-border); }
  .sb-pending { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-border); }
  .sb-blocked { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-border); }
  .sa-doc-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .sa-doc-patients { font-size: 12px; color: var(--text-2); display: flex; align-items: center; gap: 5px; }
  .sa-doc-email { font-size: 11px; color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
  .sa-doc-divider { height: 1px; background: var(--border); margin-bottom: 12px; }
  .sa-doc-actions { display: flex; gap: 8px; }
  .sa-btn { font-size: 12px; padding: 6px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; font-family: var(--font); font-weight: 400; transition: all var(--tr); display: flex; align-items: center; gap: 6px; }
  .sa-btn:hover { border-color: var(--border-md); color: var(--text-1); }
  .sa-btn.approve { background: var(--teal-bg); color: var(--teal); border-color: var(--teal-border); font-weight: 500; }
  .sa-btn.approve:hover { background: rgba(0,212,168,0.18); }
  .sa-btn.block { background: var(--red-bg); color: var(--red); border-color: var(--red-border); }
  .sa-btn.block:hover { background: rgba(240,71,71,0.18); }
  .sa-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* PATIENT TABLE */
  .sa-table-wrap { overflow-x: auto; }
  .sa-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 500px; }
  .sa-table th { text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); border-bottom: 1px solid var(--border); font-weight: 500; }
  .sa-table td { padding: 11px 10px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  .sa-table tr:last-child td { border-bottom: none; }
  .sa-table tr:hover td { background: rgba(124,131,247,0.03); }
  .sa-pat-name { font-size: 13px; font-weight: 500; color: var(--text-1); }
  .sa-pat-id { font-size: 11px; color: var(--text-3); }
  .sa-pat-doc { font-size: 12px; color: var(--indigo); }
  .sa-pat-cond { font-size: 12px; color: var(--text-2); }
  .sa-pat-badge { font-size: 10px; padding: 2px 9px; border-radius: 12px; font-weight: 500; }
  .pb-active { background: var(--teal-bg); color: var(--teal); }
  .pb-monitor { background: var(--amber-bg); color: var(--amber); }
  .pb-critical { background: var(--red-bg); color: var(--red); }

  /* ALERT ITEMS */
  .sa-alert-list { display: flex; flex-direction: column; gap: 8px; }
  .sa-alert { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; border-radius: var(--radius-md); background: rgba(22,37,64,0.4); border: 1px solid var(--border); }
  .sa-alert-icon { width: 28px; height: 28px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ai-crit { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-border); }
  .ai-warn { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-border); }
  .ai-info { background: var(--indigo-bg); color: var(--indigo); border: 1px solid var(--indigo-border); }
  .sa-alert-body { flex: 1; min-width: 0; }
  .sa-alert-title { font-size: 12px; font-weight: 500; color: var(--text-1); margin-bottom: 1px; }
  .sa-alert-text { font-size: 11px; color: var(--text-2); }
  .sa-alert-time { font-size: 10px; color: var(--text-3); margin-top: 2px; }

  /* SYSTEM HEALTH BAR */
  .sa-health-bar-wrap { background: rgba(22,37,64,0.5); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; }
  .sa-health-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .sa-health-text { font-size: 12px; color: var(--text-2); }
  .sa-health-pct { font-size: 14px; font-weight: 600; color: var(--teal); }
  .sa-health-track { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
  .sa-health-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--teal-dim), var(--teal)); transition: width 0.6s ease; }

  /* MINI STAT */
  .sa-mini-stat { background: var(--navy-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px; }
  .sa-mini-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); margin-bottom: 6px; }
  .sa-mini-val { font-size: 28px; font-weight: 200; color: var(--text-1); }
  .sa-mini-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; }

  .sa-right-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-3); margin-bottom: 10px; }

  /* FOCUS LIST */
  .sa-focus-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .sa-focus-li { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-2); line-height: 1.5; }
  .sa-bullet { width: 6px; height: 6px; border-radius: 50%; background: var(--indigo); margin-top: 6px; flex-shrink: 0; }

  /* QUICK ACTIONS */
  .sa-quick-actions { display: flex; flex-direction: column; gap: 6px; }
  .sa-quick-action { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: rgba(22,37,64,0.4); cursor: pointer; color: var(--text-1); font-size: 13px; font-weight: 400; transition: all var(--tr); }
  .sa-quick-action:hover { border-color: var(--indigo-border); background: var(--indigo-bg); color: var(--indigo); }

  /* OVERVIEW GRID */
  .sa-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* APPROVAL CARD */
  .sa-approval-card { background: rgba(22,37,64,0.5); border: 1px solid var(--amber-border); border-radius: var(--radius-md); padding: 16px; transition: all var(--tr); }
  .sa-approval-card:hover { background: var(--navy-hover); }
  .sa-approval-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
  .sa-approval-meta { display: flex; gap: 16px; margin-bottom: 14px; flex-wrap: wrap; }
  .sa-approval-field { display: flex; flex-direction: column; gap: 2px; }
  .sa-approval-field-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-3); }
  .sa-approval-field-val { font-size: 12px; color: var(--text-2); }
  .sa-empty { text-align: center; padding: 48px 24px; color: var(--text-3); font-size: 14px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .sa-empty-icon { width: 48px; height: 48px; background: var(--teal-bg); border: 1px solid var(--teal-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  /* SCROLLBARS */
  .sa-center::-webkit-scrollbar, .sa-right::-webkit-scrollbar, .sa-sidebar::-webkit-scrollbar { width: 3px; }
  .sa-center::-webkit-scrollbar-track, .sa-right::-webkit-scrollbar-track, .sa-sidebar::-webkit-scrollbar-track { background: transparent; }
  .sa-center::-webkit-scrollbar-thumb, .sa-right::-webkit-scrollbar-thumb, .sa-sidebar::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 2px; }

  /* RESPONSIVE */
  @media (max-width: 1100px) { .sa-right { width: 200px; } }
  @media (max-width: 900px) {
    :root { --sidebar-w: 200px; }
    .sa-right { display: none; }
    .sa-kpi-grid { grid-template-columns: repeat(2,1fr); }
    .sa-hero { padding: 18px 20px 16px; }
    .sa-center { padding: 16px 18px; }
    .sa-overview-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 700px) {
    .sa-sidebar { position: fixed; top: var(--topbar-h); left: 0; bottom: 0; z-index: 95; transform: translateX(-100%); }
    .sa-sidebar.open { transform: translateX(0); }
    .sa-overlay { display: block; }
    .sa-overlay.hidden { display: none; }
    .sa-menu-btn { display: flex; }
    .sa-admin-info { display: none; }
    .sa-status-pill { display: none; }
    .sa-hero-title { font-size: 22px; }
    .sa-kpi-grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
    .sa-hero { padding: 16px; }
    .sa-center { padding: 12px 14px; }
    .sa-doc-grid { grid-template-columns: 1fr; }
    .sa-hero-meta { display: none; }
  }
  @media (max-width: 420px) {
    .sa-kpi-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
    .sa-topbar { padding: 0 14px; }
  }
`;

/* ─── SUB-COMPONENTS ──────────────────────────────────────────────── */
function KpiCard({ label, value, delta, deltaClass, barColor }) {
  return (
    <div className="sa-kpi">
      <div className="sa-kpi-bar" style={{ background: barColor }} />
      <div className="sa-kpi-label">{label}</div>
      <div className="sa-kpi-val"><b>{value}</b></div>
      <div className={`sa-kpi-delta ${deltaClass}`}>{delta}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === "active" ? "sb-active" : status === "pending" ? "sb-pending" : "sb-blocked";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`sa-status-badge ${cls}`}>{label}</span>;
}

function DoctorCard({ doctor, onApprove, onBlock }) {
  const isActive = doctor.status === "active";
  const isPending = doctor.status === "pending";
  const isBlocked = doctor.status === "blocked";
  return (
    <div className="sa-doc-card">
      <div className="sa-doc-top">
        <div className="sa-doc-avatar" style={{ background: doctor.color }}>{doctor.initials}</div>
        <div className="sa-doc-info">
          <div className="sa-doc-name">{doctor.name}</div>
          <div className="sa-doc-specialty">{doctor.specialty}</div>
          <div className="sa-doc-hospital">{doctor.hospital}</div>
        </div>
        <StatusBadge status={doctor.status} />
      </div>
      <div className="sa-doc-meta">
        <span className="sa-doc-patients"><Icon name="users" size={13} color="var(--text-3)" />{doctor.patients} patients</span>
        <span className="sa-doc-email">{doctor.email}</span>
      </div>
      <div className="sa-doc-divider" />
      <div className="sa-doc-actions">
        {!isActive && <button className="sa-btn approve" onClick={onApprove} disabled={isActive}><Icon name="check" size={13} />Approve</button>}
        {isActive && <button className="sa-btn approve" disabled><Icon name="check" size={13} />Active</button>}
        {!isBlocked
          ? <button className="sa-btn block" onClick={onBlock}><Icon name="ban" size={13} />Block</button>
          : <button className="sa-btn" style={{ color: "var(--text-3)", cursor: "default" }} disabled><Icon name="ban" size={13} />Blocked</button>
        }
      </div>
    </div>
  );
}

function ApprovalCard({ doctor, onApprove, onReject }) {
  return (
    <div className="sa-approval-card">
      <div className="sa-approval-top">
        <div className="sa-doc-avatar" style={{ background: doctor.color, width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0 }}>{doctor.initials}</div>
        <div className="sa-doc-info" style={{ flex: 1 }}>
          <div className="sa-doc-name">{doctor.name}</div>
          <div className="sa-doc-specialty">{doctor.specialty}</div>
        </div>
        <span className="sa-status-badge sb-pending">Pending</span>
      </div>
      <div className="sa-approval-meta">
        <div className="sa-approval-field">
          <span className="sa-approval-field-label">Hospital</span>
          <span className="sa-approval-field-val">{doctor.hospital}</span>
        </div>
        <div className="sa-approval-field">
          <span className="sa-approval-field-label">Email</span>
          <span className="sa-approval-field-val">{doctor.email}</span>
        </div>
        <div className="sa-approval-field">
          <span className="sa-approval-field-label">Patients</span>
          <span className="sa-approval-field-val">{doctor.patients}</span>
        </div>
      </div>
      <div className="sa-doc-actions">
        <button className="sa-btn approve" onClick={onApprove}><Icon name="check" size={13} />Approve Now</button>
        <button className="sa-btn block" onClick={onReject}><Icon name="ban" size={13} />Reject</button>
      </div>
    </div>
  );
}

function AlertItem({ alert }) {
  const cls = alert.type === "crit" ? "ai-crit" : alert.type === "warn" ? "ai-warn" : "ai-info";
  const icon = alert.type === "crit" ? "ban" : alert.type === "warn" ? "warn" : "info";
  return (
    <div className="sa-alert">
      <div className={`sa-alert-icon ${cls}`}><Icon name={icon} size={14} /></div>
      <div className="sa-alert-body">
        <div className="sa-alert-title">{alert.title}</div>
        <div className="sa-alert-text">{alert.body}</div>
        <div className="sa-alert-time">{alert.time}</div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function SuperAdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [doctors, setDoctors] = useState(DOCTORS_DATA);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const { user, handleLogout } = useAuth();
    const name = user?.username
    console.log(name)
    const profileLabel = user?.username?.[0]?.toUpperCase() || "P";
    console.log(profileLabel)

  const stats = useMemo(() => {
    const total = doctors.length;
    const active = doctors.filter(d => d.status === "active").length;
    const pending = doctors.filter(d => d.status === "pending").length;
    const blocked = doctors.filter(d => d.status === "blocked").length;
    return { total, active, pending, blocked, patients: PATIENTS_DATA.length, health: total === 0 ? 0 : Math.round((active / total) * 100) };
  }, [doctors]);

  const pendingDoctors = doctors.filter(d => d.status === "pending");

  const handleDoctorStatus = (id, nextStatus) => {
    const doc = doctors.find(d => d.id === id);
    if (!doc) return;
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: nextStatus } : d));
    const newAlert = {
      id: Date.now(),
      type: nextStatus === "active" ? "info" : "crit",
      title: nextStatus === "active" ? "Doctor Approved" : "Doctor Blocked",
      body: `${doc.name} — status updated`,
      time: "Just now",
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 6));
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <style>{css}</style>
      <div className="sa-root">
        {/* TOPBAR */}
        <header className="sa-topbar">
          <div className="sa-topbar-left">
            <button className="sa-icon-btn sa-menu-btn" onClick={() => setSidebarOpen(o => !o)}>
              <Icon name={sidebarOpen ? "x" : "menu"} size={18} />
            </button>
            <div className="sa-logo"><Icon name="shield" size={17} color="#080f1c" /></div>
            <span className="sa-brand">Medi<span>Admin</span></span>
          </div>
          <div className="sa-topbar-right">
            <div className="sa-status-pill"><div className="sa-status-dot" />Super Admin</div>
            <div className="sa-admin-info">
              <span className="sa-admin-name">{name}</span>
              <span className="sa-admin-role">Platform Administrator</span>
            </div>
            <button className="sa-icon-btn"><Icon name="bell" size={16} /></button>
            <button className="sa-icon-btn"><Icon name="settings" size={16} /></button>
            <div className="sa-avatar">{profileLabel}</div>
          </div>
        </header>

        <div className="sa-layout">
          {/* OVERLAY */}
          <div className={`sa-overlay ${sidebarOpen ? "" : "hidden"}`} onClick={closeSidebar} />

          {/* SIDEBAR */}
          <aside className={`sa-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sa-section-label">Management</div>
            {NAV_ITEMS.map(item => (
              <div key={item.id} className={`sa-nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => { setActiveNav(item.id); closeSidebar(); }}>
                <Icon name={item.icon} size={16} />
                {item.label}
                {item.id === "approvals" && stats.pending > 0 && <span className="sa-nav-badge">{stats.pending}</span>}
              </div>
            ))}
            <div className="sa-section-label">System</div>
            <div className="sa-nav-item" onClick={closeSidebar}><Icon name="activity" size={16} />Audit Logs</div>
            <div className="sa-nav-item" onClick={closeSidebar}><Icon name="settings" size={16} />Settings</div>
            <div className="sa-nav-item" onClick={closeSidebar}><Icon name="chat" size={16} />Support</div>

            <div className="sa-sidebar-card">
              <div className="sa-sidebar-card-row">
                <div className="sa-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{profileLabel}</div>
                <div>
                  <div className="sa-sidebar-name">{name}</div>
                  <div className="sa-sidebar-role">Super Admin</div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="sa-main">
            {/* HERO */}
            <div className="sa-hero">
              <div className="sa-hero-top">
                <div>
                  <div className="sa-greeting-tag">Control Center</div>
                  <h1 className="sa-hero-title">{name}</h1>
                  <p className="sa-hero-sub">Thursday, 2 April 2026 &nbsp;·&nbsp; Platform Management</p>
                </div>
                <div className="sa-hero-meta">
                  <div className="sa-meta-card">
                    <span className="sa-meta-label">System Health</span>
                    <div className={`sa-meta-val health`}>{stats.health}%</div>
                  </div>
                  <div className="sa-meta-card">
                    <span className="sa-meta-label">Pending</span>
                    <div className="sa-meta-val pending">{stats.pending}</div>
                  </div>
                </div>
              </div>
              <div className="sa-kpi-grid">
                <KpiCard label="Total Doctors" value={stats.total} delta={`${stats.active} active`} deltaClass="d-indigo" barColor="var(--indigo)" />
                <KpiCard label="Pending Approval" value={stats.pending} delta="Awaiting review" deltaClass="d-amber" barColor="var(--amber)" />
                <KpiCard label="Total Patients" value={stats.patients} delta="↑ 5 this week" deltaClass="d-teal" barColor="var(--teal)" />
                <KpiCard label="Blocked" value={stats.blocked} delta="Suspended accounts" deltaClass="d-red" barColor="var(--red)" />
              </div>
            </div>

            {/* CONTENT */}
            <div className="sa-content">
              <div className="sa-center">

                {/* OVERVIEW */}
                {activeNav === "overview" && (
                  <>
                    <div className="sa-block">
                      <div className="sa-panel-header"><span className="sa-panel-title">Admin Controls</span></div>
                      <div className="sa-overview-grid">
                        <ul className="sa-focus-list">
                          {["Approve or block doctor accounts from the Doctors tab", "Track current patient load across all practitioners", "Review pending requests from the Approvals queue", "Monitor system health with live counters above"].map(t => (
                            <li key={t} className="sa-focus-li"><div className="sa-bullet" />{t}</li>
                          ))}
                        </ul>
                        <div className="sa-quick-actions">
                          {[
                            { label: "Manage Doctors", tab: "doctors", icon: "stethoscope" },
                            { label: "Review Patients", tab: "patients", icon: "users" },
                            { label: "Open Approvals", tab: "approvals", icon: "shield" },
                            { label: "Audit Logs", tab: "overview", icon: "activity" },
                          ].map(a => (
                            <div key={a.label} className="sa-quick-action" onClick={() => setActiveNav(a.tab)}>
                              <Icon name={a.icon} size={15} />{a.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="sa-block">
                      <div className="sa-panel-header">
                        <span className="sa-panel-title">System Health</span>
                        <span className="sa-panel-action" onClick={() => setActiveNav("doctors")}>Manage →</span>
                      </div>
                      <div className="sa-health-bar-wrap">
                        <div className="sa-health-label">
                          <span className="sa-health-text">Active doctors vs total registered</span>
                          <span className="sa-health-pct">{stats.health}%</span>
                        </div>
                        <div className="sa-health-track">
                          <div className="sa-health-fill" style={{ width: `${stats.health}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="sa-block">
                      <div className="sa-panel-header">
                        <span className="sa-panel-title">Recent Alerts</span>
                      </div>
                      <div className="sa-alert-list">
                        {alerts.map(a => <AlertItem key={a.id} alert={a} />)}
                      </div>
                    </div>
                  </>
                )}

                {/* DOCTORS */}
                {activeNav === "doctors" && (
                  <div className="sa-block">
                    <div className="sa-panel-header">
                      <span className="sa-panel-title">Doctor Management</span>
                      <span className="sa-panel-action">Export →</span>
                    </div>
                    <div className="sa-doc-grid">
                      {doctors.map(d => (
                        <DoctorCard key={d.id} doctor={d}
                          onApprove={() => handleDoctorStatus(d.id, "active")}
                          onBlock={() => handleDoctorStatus(d.id, "blocked")} />
                      ))}
                    </div>
                  </div>
                )}

                {/* PATIENTS */}
                {activeNav === "patients" && (
                  <div className="sa-block">
                    <div className="sa-panel-header">
                      <span className="sa-panel-title">Patient Overview</span>
                      <span className="sa-panel-action">Export →</span>
                    </div>
                    <div className="sa-table-wrap">
                      <table className="sa-table">
                        <thead>
                          <tr>
                            <th>Patient</th>
                            <th>Assigned Doctor</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Since</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PATIENTS_DATA.map(p => {
                            const cls = p.status === "active" ? "pb-active" : p.status === "monitor" ? "pb-monitor" : "pb-critical";
                            const label = p.status.charAt(0).toUpperCase() + p.status.slice(1);
                            return (
                              <tr key={p.id}>
                                <td><div className="sa-pat-name">{p.name}</div><div className="sa-pat-id">{p.id}</div></td>
                                <td className="sa-pat-doc">{p.doctor}</td>
                                <td className="sa-pat-cond">{p.condition}</td>
                                <td><span className={`sa-pat-badge ${cls}`}>{label}</span></td>
                                <td style={{ fontSize: 12, color: "var(--text-2)" }}>{p.since}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* APPROVALS */}
                {activeNav === "approvals" && (
                  <div className="sa-block">
                    <div className="sa-panel-header">
                      <span className="sa-panel-title">Approval Queue</span>
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>{pendingDoctors.length} awaiting review</span>
                    </div>
                    {pendingDoctors.length === 0 ? (
                      <div className="sa-empty">
                        <div className="sa-empty-icon"><Icon name="check" size={22} color="var(--teal)" /></div>
                        All approvals are up to date. No pending requests.
                      </div>
                    ) : (
                      <div className="sa-doc-grid">
                        {pendingDoctors.map(d => (
                          <ApprovalCard key={d.id} doctor={d}
                            onApprove={() => handleDoctorStatus(d.id, "active")}
                            onReject={() => handleDoctorStatus(d.id, "blocked")} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN */}
              <aside className="sa-right">
                <div>
                  <div className="sa-right-label">Live Alerts</div>
                  <div className="sa-alert-list">
                    {alerts.slice(0, 4).map(a => <AlertItem key={a.id} alert={a} />)}
                  </div>
                </div>

                <div>
                  <div className="sa-right-label">System Health</div>
                  <div className="sa-health-bar-wrap">
                    <div className="sa-health-label">
                      <span className="sa-health-text">Doctor activity</span>
                      <span className="sa-health-pct">{stats.health}%</span>
                    </div>
                    <div className="sa-health-track">
                      <div className="sa-health-fill" style={{ width: `${stats.health}%` }} />
                    </div>
                  </div>
                </div>

                <div className="sa-mini-stat">
                  <div className="sa-mini-label">Active Doctors</div>
                  <div className="sa-mini-val" style={{ color: "var(--teal)" }}>{stats.active}</div>
                  <div className="sa-mini-sub">of {stats.total} registered</div>
                </div>

                <div className="sa-mini-stat">
                  <div className="sa-mini-label">Pending</div>
                  <div className="sa-mini-val" style={{ color: stats.pending > 0 ? "var(--amber)" : "var(--text-1)" }}>{stats.pending}</div>
                  <div className="sa-mini-sub">awaiting approval</div>
                </div>

                <div className="sa-mini-stat">
                  <div className="sa-mini-label">Blocked</div>
                  <div className="sa-mini-val" style={{ color: stats.blocked > 0 ? "var(--red)" : "var(--text-1)" }}>{stats.blocked}</div>
                  <div className="sa-mini-sub">suspended accounts</div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}