/// <reference lib="webworker" />

// Safely casting `self` to `ServiceWorkerGlobalScope`
const globalSelf = self as unknown as ServiceWorkerGlobalScope;

globalSelf.addEventListener("install", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker installed.");
  swEvent.waitUntil(Promise.resolve());
});

globalSelf.addEventListener("activate", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker activated.");
  swEvent.waitUntil(Promise.resolve());
});

globalSelf.addEventListener("fetch", (event) => {
  const fetchEvent = event as FetchEvent;
  console.log("Fetching:", fetchEvent.request.url);
});

// Service Worker event listener for push notifications (though we will not use a backend to send them)
globalSelf.addEventListener("push", (event) => {
  const pushEvent = event as PushEvent;
  const options = {
    body: pushEvent.data ? pushEvent.data.text() : "Time to come chat!",
    icon: "/icon.png",
    badge: "/badge.png",
  };

  event.waitUntil(
    globalSelf.registration.showNotification("Reminder to Chat!", options)
  );
});

globalSelf.addEventListener("notificationclick", (event) => {
  const notificationEvent = event as NotificationEvent;
  notificationEvent.notification.close();

  event.waitUntil(globalSelf.clients.openWindow("/chat"));
});
