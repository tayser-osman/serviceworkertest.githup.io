// if(navigator.serviceWorker) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker
//             .register('../sw_cached_pages.js')
//             .then(reg => console.log('Service Worker: Registered'))
//             .catch(err => console.log(`Service Worker Error: ${err}`));
//     });
// }

if(navigator.serviceWorker) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker Error: ${err}`));
    });
}
