const CACHE_NAME = 'pravopomoshch-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/img/bbf6fce7-1ef2-4a46-a7ee-566966125646.jpg',
  '/img/30d7d1e6-d798-4fc7-b548-dfa53f5584ac.jpg'
];

// Установка Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Кэш hit - возвращаем response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Проверяем валидность response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонируем response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Обработка уведомлений
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Обработка push-уведомлений
self.addEventListener('push', function(event) {
  const options = {
    body: 'У вас новое сообщение от ПравоПомощь 24/7',
    icon: '/img/bbf6fce7-1ef2-4a46-a7ee-566966125646.jpg',
    badge: '/img/bbf6fce7-1ef2-4a46-a7ee-566966125646.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', 
        title: 'Открыть сайт',
        icon: '/img/bbf6fce7-1ef2-4a46-a7ee-566966125646.jpg'
      },
      {
        action: 'close', 
        title: 'Закрыть',
        icon: '/img/bbf6fce7-1ef2-4a46-a7ee-566966125646.jpg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ПравоПомощь 24/7', options)
  );
});