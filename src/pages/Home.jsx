import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Home() {
  return (
    <div className="unisync-wrapper">
      <main className="unisync-content">
        <h2>Your Synchronized University Experience</h2>
        <p>Hello, Piyush! Choose your adventure and connect with your college community.</p>

        <div className="card-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-6">
  <a
    href="/notes.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    📝 <span className="font-semibold text-lg mt-2">Notes Sharing</span>
  </a>

  <a
    href="/groups.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    👥 <span className="font-semibold text-lg mt-2">Study Groups</span>
  </a>

  <a
    href="/events.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    📅 <span className="font-semibold text-lg mt-2">University Events</span>
  </a>

  <a
    href="/forum.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    💬 <span className="font-semibold text-lg mt-2">Q&A Forum</span>
  </a>

  <a
    href="/messages.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    💖 <span className="font-semibold text-lg mt-2">Messages / Chat</span>
  </a>

  <a
    href="/marketplace.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    🛒 <span className="font-semibold text-lg mt-2">Marketplace</span>
  </a>

  <a
    href="/slowroads.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    🚗 <span className="font-semibold text-lg mt-2">Slowroads Game</span>
  </a>

  <a
    href="/dashboard.html"
    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white
               flex flex-col items-center justify-center
               rounded-2xl shadow-lg hover:bg-white/20 transition-all 
               p-6 min-h-[130px] text-center"
  >
    📊 <span className="font-semibold text-lg mt-2">Personal Dashboard</span>
  </a>
</div>

        </div>
      </main>
    </div>
  );
}
