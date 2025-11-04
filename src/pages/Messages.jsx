import React from "react";
import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <div className="page">
      <h1>💖 Messages / Chat</h1>
      <p>Chat privately or in groups with your friends.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
