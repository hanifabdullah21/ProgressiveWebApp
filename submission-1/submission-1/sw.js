const CACHE_NAME = "firstpwa-v8";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/sw.js",
  '/manifest.json',
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/bonus.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon/icon-72x72.png",
  "/icon/icon-96x96.png",
  "/icon/icon-128x128.png",
  "/icon/icon-144x144.png",
  "/icon/icon-152x152.png",
  "/icon/icon-192x192.png",
  "/icon/icon-384x384.png",
  "/icon/icon-512x512.png",
  "/image/homescreen.jpg",
  "/image/plakat.jpg",
  "/image/sandec.jpg",
  "/image/semarang.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
