// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz_LYo1Oh4CAn_LFT98vQfJd54tfWLN44",
  authDomain: "watch-store-wesite.firebaseapp.com",
  projectId: "watch-store-wesite",
  storageBucket: "watch-store-wesite.appspot.com",
  messagingSenderId: "184330062906",
  appId: "1:184330062906:web:d48add6ff1ca370082f903",
  measurementId: "G-K3QND3L8Z8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
