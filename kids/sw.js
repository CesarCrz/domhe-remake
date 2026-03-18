const CACHE_NAME = 'domhe-kids-v1';
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Fallback to network if not in cache
        return response || fetch(event.request);
      })
  );
});
