const V = 'fqpay-v2';
const SHELL = ['./', 'index.html', 'keypad.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Jaringan dulu (selalu versi terbaru); cache hanya cadangan saat offline. Data Apps Script tidak disentuh.
self.addEventListener('fetch', function (e) {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    const copy = res.clone();
    caches.open(V).then(function (c) { c.put(r, copy); });
    return res;
  }).catch(function () {
    return caches.match(r).then(function (m) { return m || caches.match('index.html'); });
  }));
});
