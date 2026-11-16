self.addEventListener('push', (e) => {
  let m = {};
  try { m = e.data.json(); } catch (x) {}
  e.waitUntil(self.registration.showNotification(m.title || 'Pilothouse', { body: m.body || 'An agent needs you', tag: m.tag, renotify: true, icon: 'icon.png', badge: 'icon.png' }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if (c.url.includes('/app/') && 'focus' in c) return c.focus();
    return clients.openWindow('./');
  }));
});
