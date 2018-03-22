'use strict';

const cacheName = 'v1.03';
const offlineUrl = '/index.html';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/css/party.css',
        '/js/min/jquery.min.js',
        '/js/min/howler.min.js',
        '/js/min/party.min.js',
        '/audio/party.mp3',
        '/audio/venga.mp3'
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  } else {
    return response
  }
});