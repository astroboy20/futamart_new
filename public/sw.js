// public/service-worker.js

self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {};
  
    const title = data.title || 'New Notification';
    const options = {
      body: data.body || 'You have a new message!',
      icon: '/icon.png', // Custom icon for the notification
    };
  
    // Show notification
    event.waitUntil(self.registration.showNotification(title, options));
  });
  