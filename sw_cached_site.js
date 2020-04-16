const cacheName = 'v1';

// call install event
self.addEventListener('install', function(event) {
    // event.waitUntil(
    //     caches
    //         .open(cacheName)
    //         .then(cache => {
    //             cache.addAll(cacheAssets);
    //         })
    //         .then(() => self.skipWaiting())
    // );
});

// call activate event - clear any old cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// call fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .then(res => {
                // make copy/clone of response we get from the server
                const resClone = res.clone();
                // open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(event.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(event.request).then(res => res))
    );
});
