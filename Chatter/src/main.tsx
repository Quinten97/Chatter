import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Define the showReminder function outside of any condition so it's accessible
function showReminder() {
  new Notification("Reminder to Chat!", {
    body: "It’s time to come chat!",
    icon: "/icon.png",
  });
}

// This should be triggered when the app is loaded, so place it inside your main component or App.js
if (Notification.permission === "granted") {
  // Show the notification once every 24 hours
  setInterval(() => {
    showReminder();
  }, 86400000); // 86400000 ms = 24 hours
} else {
  // Request permission if not already granted
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      showReminder();
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") // Make sure this points to your sw.js or sw.ts file after being compiled
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
