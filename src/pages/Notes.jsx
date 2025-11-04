import React from "react";
import { Link } from "react-router-dom";

export default function Notes() {
  return (
    <div className="page">
      <h1>📝 Notes Sharing</h1>
      <p>Share, browse, and download class notes easily.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
