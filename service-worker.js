// Выберите имя кэша
const cacheName = 'cache-v1';
// Перечислите файлы для предопределенности
const precacheResources = ['/', '/index.html', '/css/style.css', '/js/main.js', '/js/app/editor.js', '/js/lib/actions.js'];

// Когда сервисный работник устанавливается, откройте кэш и добавьте ресурсы rockache к нему
self.addEventListener('install', (event) => {
     console.log('Service worker install event!');
     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
     console.log('Service worker activate event!');
});

// Когда есть запрашивающий запрос входящей извлечения, попробуйте ответить на предварительно продуманный ресурс, в противном случае отступай к сети
self.addEventListener('fetch', (event) => {
     console.log('Fetch intercepted for:', event.request.url);
     event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
               if (cachedResponse) {
                    return cachedResponse;
               }
               return fetch(event.request);
          }),
     );
});