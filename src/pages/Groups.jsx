import React from "react";
import { Link } from "react-router-dom";

export default function Groups() {
  return (
    <div className="page">
      <h1>👥 Study Groups</h1>
      <p>Collaborate with classmates and form new study teams.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
