const CACHE_NAME = "gen-alpha-academy-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./supabase-config.js",
  "./manifest.webmanifest",
  "./assets/og-image.jpg",
  "./assets/og-image_forpreview.jpg",
  "./assets/gen-alpha-favicon-192.png",
  "./assets/gen-alpha-favicon-512.png",
  "./assets/gen-alpha-icon-192.png",
  "./assets/gen-alpha-icon-512.png",
];

/** Match GitHub Pages project URLs (e.g. /repo/script.js), not only root-hosted /script.js */
const NETWORK_FIRST_PATH_ENDINGS = [
  "/index.html",
  "/styles.css",
  "/script.js",
  "/supabase-config.js",
  "/manifest.webmanifest",
  "/sw.js",
];

const isHttpRequest = (request) => request.url.startsWith("http");

const getPathname = (request) => new URL(request.url).pathname;

/** Only cache this origin — never cache Supabase/API GETs (cache-first would serve stale rows). */
const isSameOriginRequest = (request) => {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
};

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

  if (!isSameOriginRequest(event.request)) {
    return;
  }

  const pathname = getPathname(event.request);
  const isAppShellAsset = NETWORK_FIRST_PATH_ENDINGS.some((end) => pathname.endsWith(end));
  const shouldUseNetworkFirst = event.request.mode === "navigate" || isAppShellAsset;

  event.respondWith(shouldUseNetworkFirst ? networkFirst(event.request) : cacheFirst(event.request));
});
