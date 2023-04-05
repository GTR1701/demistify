import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr6nfXDuIj5467zchVtZ1dYZW-mRBnWmk",
  authDomain: "codetastic-4a686.firebaseapp.com",
  projectId: "codetastic-4a686",
  storageBucket: "codetastic-4a686.appspot.com",
  messagingSenderId: "833741969388",
  appId: "1:833741969388:web:4bd71fc8c5281323f112c9",
  measurementId: "G-72YFDZ7LJ6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

// const analytics = getAnalytics(app);
// analytics.app.automaticDataCollectionEnabled = true;
