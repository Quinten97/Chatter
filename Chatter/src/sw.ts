/// <reference lib="webworker" />

self.addEventListener("install", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker installed.");
  swEvent.waitUntil(Promise.resolve()); // Example of ExtendableEvent usage
});

self.addEventListener("activate", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker activated.");
  swEvent.waitUntil(Promise.resolve());
});

self.addEventListener("fetch", (event) => {
  const fetchEvent = event as FetchEvent;
  console.log("Fetching:", fetchEvent.request.url);
});
