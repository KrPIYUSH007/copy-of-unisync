import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import "../index.css";

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar /> {/* ✅ sidebar appears on all pages */}

      {/* Header */}
      <header className="unisync-header glass-header">
        <Link to="/" className="header-left">
          <div className="unisync-logo">U</div>
          <h1 className="unisync-brand">UniSync</h1>
        </Link>

        <div className="header-right">
          <span className="notif">🔔</span>
          <div className="profile">P</div>
        </div>
      </header>

      {/* Page Content */}
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
