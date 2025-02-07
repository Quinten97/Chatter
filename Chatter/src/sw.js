/// <reference lib="webworker" />

self.addEventListener("install", (event) => {
  console.log("Service Worker installed.");
  event.waitUntil(Promise.resolve());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(Promise.resolve());
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
});

// Service Worker event listener for push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Time to come chat!",
    icon: "/icon.png",
    badge: "/badge.png",
  };

  event.waitUntil(
    self.registration.showNotification("Reminder to Chat!", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/chat"));
});
