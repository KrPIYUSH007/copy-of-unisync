import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Notes from "./pages/Notes.jsx";
import Groups from "./pages/Groups.jsx";
import Events from "./pages/Events.jsx";
import Messages from "./pages/Messages.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/events" element={<Events />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
