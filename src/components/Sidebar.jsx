import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons from lucide-react

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/notes", label: "Notes Sharing", icon: "📝" },
    { path: "/groups", label: "Study Groups", icon: "👥" },
    { path: "/events", label: "University Events", icon: "📅" },
    { path: "/forum", label: "Q&A Forum", icon: "💬" },
    { path: "/messages", label: "Messages / Chat", icon: "💖" },
    { path: "/marketplace", label: "Marketplace", icon: "🛒" },
    { path: "/dashboard", label: "Personal Dashboard", icon: "📊" },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar Drawer */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">UniSync</h2>
        <nav>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
