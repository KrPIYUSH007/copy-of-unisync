import React from "react";
import { Link } from "react-router-dom";

export default function Forum() {
  return (
    <div className="page">
      <h1>💬 Q&A Forum</h1>
      <p>Ask questions, discuss topics, and connect with peers.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
