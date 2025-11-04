import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Dither from "./Dither";
import "./Dither.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Background effect */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Dither
          waveColor={[0.3, 0.3, 0.8]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.4}
          colorNum={4}
          waveAmplitude={0.25}
          waveFrequency={2.5}
          waveSpeed={0.04}
        />
        {/* Main app content above the Dither background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            overflowY: "auto",
          }}
        >
          <App />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
