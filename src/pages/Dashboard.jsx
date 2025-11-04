import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page">
      <h1>📊 Personal Dashboard</h1>
      <p>Track your activities, groups, and upcoming events in one place.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
