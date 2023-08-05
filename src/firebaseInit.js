import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTKoArQ6mBJWbg2yomcxENOg9mxKKGku4",
  authDomain: "metachatt.firebaseapp.com",
//   databaseURL: "FROM FIREBASE CONSOLE",
  projectId: "metachatt ",
  storageBucket: "metachatt.appspot.com",
  messagingSenderId: "462237663013",
  appId: "1:462237663013:web:d62161534b23372ab164cc"
};




firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const  REACT_APP_VAPID_KEY  = 'BOF6HSPwaRby6fIEG6jjA5gMFE6BTV5bxqwTenvatKPJZEGkYYGVHS893QiAw6VlPFtJaiuIM_5Ka7MMRTY0efM'
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });