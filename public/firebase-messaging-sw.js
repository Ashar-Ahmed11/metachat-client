// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDTKoArQ6mBJWbg2yomcxENOg9mxKKGku4",
    authDomain: "metachatt.firebaseapp.com",
  //   databaseURL: "FROM FIREBASE CONSOLE",
    projectId: "metachatt",
    storageBucket: "metachatt.appspot.com",
    messagingSenderId: "462237663013",
    appId: "1:462237663013:web:d62161534b23372ab164cc"
  };

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  // return self.registration.showNotification(
  //   notificationTitle,
  //   notificationOptions
  // );
});