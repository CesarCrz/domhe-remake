const CACHE_NAME = 'domhe-kids-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './draw.html',
  './memory.html',
  './puzzle.html',
  './assets/css/kids.css',
  './assets/js/utils.js',
  './assets/js/draw.js',
  './assets/js/memory.js',
  './assets/js/puzzle.js',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Quicksand:wght@500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753327639/WhatsApp_Image_2025-07-23_at_19.59.09_yd4dtt.png',
  'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753336163/domhe_favicon_to08gb.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function getNavigationFallback(requestUrl) {
  const url = new URL(requestUrl);
  const path = url.pathname;

  if (path.endsWith('/kids') || path.endsWith('/kids/')) {
    return './index.html';
  }

  if (path.endsWith('/kids/draw') || path.endsWith('/kids/draw/')) {
    return './draw.html';
  }

  if (path.endsWith('/kids/memory') || path.endsWith('/kids/memory/')) {
    return './memory.html';
  }

  if (path.endsWith('/kids/puzzle') || path.endsWith('/kids/puzzle/')) {
    return './puzzle.html';
  }

  return null;
}

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    const fallbackPath = getNavigationFallback(event.request.url);

    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => {
          if (fallbackPath) {
            return caches.match(fallbackPath);
          }
          return caches.match('./index.html');
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Fallback to network if not in cache
        return response || fetch(event.request);
      })
  );
});
