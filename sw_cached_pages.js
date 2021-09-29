const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '360.html',
    '/css/intro.css',
    '/css/style.css',
    '/css/bootstrap.min.css',
    '/js/main.js',
    '/js/bootstrap.min.js',
    '/video/BG_Website_IP.mp4',
    '/video/BG_Website01.mp4',
    '/video/BG_Website01.webm',
    '/video/BG_Website02_1.mp4',
    '/video/BG_Website03.mp4',
];

//Call Install Event 
self.addEventListener('install',(e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  
  // Call Fetch Event
  self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  });
  