/**
 * Service Worker for Hero Section Performance Optimization
 * Implements caching strategies for critical resources
 */

const CACHE_NAME = "hero-section-v1";
const CRITICAL_RESOURCES = [
  // Critical images
  "/images/profile-photo.webp",
  "/images/profile-photo.jpg",
  "/images/placeholder.svg",

  // Platform logos
  "/images/platforms/leetcode-logo.svg",
  "/images/platforms/hackerrank-logo.svg",

  // Critical CSS and JS
  "/_next/static/css/",
  "/_next/static/chunks/",

  // Fonts
  "https://fonts.googleapis.com/css2",
  "https://fonts.gstatic.com/s/inter/",
];

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching critical resources");
        // Cache critical resources, but don't fail if some are missing
        return Promise.allSettled(
          CRITICAL_RESOURCES.map((resource) => {
            return cache.add(resource).catch((err) => {
              console.warn(`Failed to cache ${resource}:`, err);
            });
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Critical resources cached");
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Strategy for different resource types
  if (isCriticalImage(request.url)) {
    // Critical images: Cache first, then network
    event.respondWith(cacheFirst(request));
  } else if (isStaticAsset(request.url)) {
    // Static assets: Cache first with long TTL
    event.respondWith(cacheFirst(request));
  } else if (isFont(request.url)) {
    // Fonts: Cache first with very long TTL
    event.respondWith(cacheFirst(request));
  } else if (isAPI(request.url)) {
    // API calls: Network first, cache as fallback
    event.respondWith(networkFirst(request));
  } else {
    // Default: Network first for HTML and other resources
    event.respondWith(networkFirst(request));
  }
});

// Helper functions
function isCriticalImage(url) {
  return (
    url.includes("/images/") &&
    (url.includes("profile-photo") ||
      url.includes("placeholder") ||
      url.includes("platforms/"))
  );
}

function isStaticAsset(url) {
  return (
    url.includes("/_next/static/") || url.match(/\.(js|css|woff2?|ttf|eot)$/)
  );
}

function isFont(url) {
  return url.includes("fonts.gstatic.com") || url.match(/\.(woff2?|ttf|eot)$/);
}

function isAPI(url) {
  return (
    url.includes("/api/") ||
    url.includes("github.com/api/") ||
    url.includes("leetcode.com/api/")
  );
}

// Cache first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    // Return a fallback response for critical images
    if (isCriticalImage(request.url)) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#9ca3af">Image</text></svg>',
        { headers: { "Content-Type": "image/svg+xml" } }
      );
    }
    throw error;
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn("Network request failed, trying cache:", error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Background sync for non-critical resources
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(cacheNonCriticalResources());
  }
});

async function cacheNonCriticalResources() {
  const nonCriticalResources = [
    "/images/badges/leetcode-100.svg",
    "/images/badges/hackerrank-100.svg",
    "/images/about-photo.jpg",
  ];

  const cache = await caches.open(CACHE_NAME);

  for (const resource of nonCriticalResources) {
    try {
      await cache.add(resource);
      console.log(`Background cached: ${resource}`);
    } catch (error) {
      console.warn(`Failed to background cache ${resource}:`, error);
    }
  }
}

// Performance monitoring
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PERFORMANCE_MEASURE") {
    const { name, startTime, endTime } = event.data;
    console.log(`SW Performance: ${name} took ${endTime - startTime}ms`);
  }
});
