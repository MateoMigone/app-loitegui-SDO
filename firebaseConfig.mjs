import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-ltLtIEc_3S-sxp_lPZLFlJ1WRCkxVY8",
  authDomain: "app-loitegui.firebaseapp.com",
  projectId: "app-loitegui",
  storageBucket: "app-loitegui.firebasestorage.app",
  messagingSenderId: "878605950849",
  appId: "1:878605950849:web:2089b902b51992b92e1280",
  measurementId: "G-G22HXS2P9Y",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
