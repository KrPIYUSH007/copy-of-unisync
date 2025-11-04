import React from "react";
import { Link } from "react-router-dom";

export default function Marketplace() {
  return (
    <div className="page">
      <h1>🛒 Marketplace</h1>
      <p>Buy, sell, or trade items with your college peers.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
