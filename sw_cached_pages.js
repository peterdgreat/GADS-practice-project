const cacheName='v2';
const cacheAssets=[

    'index.html',
    'style/style.css',
    'js/app.js'
    
    

];

//call install invent
self.addEventListener('install',e=>{
    console.log('sevice Worker: installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
            console.log('service Worker:caching Files');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
})
//call activate
self.addEventListener('activate',e=>{
    console.log('sevice Worker: activated');
    //remove Unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if (cache !==cacheName){
                        console.log('Service Worker clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//call fetch Event
self.addEventListener('fetch',e=>{
    console.log('serviceWorker:fetching');
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})