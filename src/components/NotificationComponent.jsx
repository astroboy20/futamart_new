"use client";
import { useEffect } from 'react';

// Function to request notification permission
const requestNotificationPermission = async () => {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
        // Proceed to register service worker and subscribe user
        await registerServiceWorker();
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  } else {
    console.error('Push notifications are not supported in this browser.');
  }
};

// Register service worker and subscribe user to push notifications
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration);

      // Subscribe the user to push notifications
      await subscribeUserToPush(registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Subscribe the user for push notifications
const subscribeUserToPush = async (registration) => {
  const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY; // Get your public VAPID key

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log('User subscribed:', subscription);

    // Send the subscription to the backend to store it
    await saveSubscriptionToBackend(subscription);
  } catch (error) {
    console.error('Error subscribing user to push notifications:', error);
  }
};

// Convert base64 VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4); // Add padding if necessary
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Save the subscription object to the backend
const saveSubscriptionToBackend = async (subscription) => {
  const response = await fetch('http://localhost:5000/push-subscription', {
    method: 'POST',
    body: JSON.stringify({ subscription }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log('Subscription saved to backend');
  } else {
    console.error('Failed to save subscription to backend');
  }
};

const NotificationComponent = () => {
  useEffect(() => {
    // Request notification permission when the component mounts
    requestNotificationPermission();
  }, []);

  return (
    <div>
      <h2>Push Notification Demo</h2>
      <p>Allow notifications to receive updates.</p>
    </div>
  );
};
export default NotificationComponent;
