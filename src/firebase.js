// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCNIkDllU37bAErK8IZV0SCT7LqNgxCZwE",
  authDomain: "steypcom.firebaseapp.com",
  databaseURL: "http://steypcom.firebaseio.com",
  projectId: "steypcom",
  storageBucket: "steypcom.appspot.com",
  messagingSenderId: "1352693942",
  appId: "1:1352693942:web:ae27f7e7c8e1704c36ce17",
  measurementId: "G-575JXNLBBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const messaging = getMessaging();

export const requestForToken = async () => {
  return getToken(messaging, {
    vapidKey:
      "BF8iv2-aoYSJg0TZMdv5WiVwQR5ZQIWmBvhAAJLW6C6XB7TV53EnHXYm9XTR4bTF1sEVTi6I-YvuOxkKtnKznuQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("currentToken", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

export { auth, db, storage };
