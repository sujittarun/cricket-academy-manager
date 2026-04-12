const CACHE_NAME = "gen-alpha-academy-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./supabase-config.js",
  "./manifest.webmanifest",
  "./assets/gen-alpha-badge-upscaled.png",
  "./assets/gen-alpha-icon-192.png",
  "./assets/gen-alpha-icon-512.png",
];

const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/supabase-config.js",
  "/manifest.webmanifest",
]);

const isHttpRequest = (request) => request.url.startsWith("http");

const getPathname = (request) => new URL(request.url).pathname;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const networkFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    if (request.mode === "navigate") {
      return cache.match("./index.html");
    }
    throw new Error("Network unavailable");
  }
};

const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.status === 200) {
    cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !isHttpRequest(event.request)) {
    return;
  }

  const pathname = getPathname(event.request);
  const shouldUseNetworkFirst =
    event.request.mode === "navigate" || NETWORK_FIRST_PATHS.has(pathname);

  event.respondWith(shouldUseNetworkFirst ? networkFirst(event.request) : cacheFirst(event.request));
});
