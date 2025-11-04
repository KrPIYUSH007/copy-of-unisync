import React from "react";
import { Link } from "react-router-dom";

export default function Slowroads() {
  return (
    <div className="page">
      <h1>🚗 Slowroads.io</h1>
      <p>Relax, drive, and explore the endless scenic roads.</p>

      <div className="iframe-container">
        <iframe
          src="https://slowroads.io/"
          width="100%"
          height="600"
          allow="fullscreen"
          tabIndex="-1"
          className="w-full"
          style={{
            border: "none",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
          title="Slowroads Game"
        ></iframe>
      </div>

      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
