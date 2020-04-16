const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    'contact.html',
    '/css/style.css',
    '/js/main.js'
];

// call install event
self.addEventListener('install', function(event) {
    
    // console.log('Service Worker Installed');

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// call activate event
self.addEventListener('activate', function(event) {

    // console.log('Service Worker Activated');

    // remove unwanted caches
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            console.log('Service Worker clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );

});

// call fetch event
self.addEventListener('fetch', function(event) {

    // console.log('Service Worker Fetching');

    event.respondWith(
        fetch(event.request)
            .catch(function() {
                caches.match(event.request);
            })
    );

});
