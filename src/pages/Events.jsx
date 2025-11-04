import React from "react";
import { Link } from "react-router-dom";

export default function Events() {
  return (
    <div className="relative z-10 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">🎓 University Events</h1>
      <p className="text-lg max-w-2xl text-center mb-8">
        Stay updated on all your university’s upcoming events, seminars, and workshops.
      </p>

      <div className="flex gap-6">
        <Link
          to="/"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg"
        >
          ← Back to Home
        </Link>
        <button
          onClick={() => alert("Add Event feature coming soon!")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg"
        >
          ➕ Add New Event
        </button>
      </div>
    </div>
  );
}
