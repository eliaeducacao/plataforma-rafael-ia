// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZHQriFdHqg5ZeH4QJUQbTprGJbvOsxSY",
  authDomain: "plataforma-rafael-ia.firebaseapp.com",
  projectId: "plataforma-rafael-ia",
  storageBucket: "plataforma-rafael-ia.firebasestorage.app",
  messagingSenderId: "809509362117",
  appId: "1:809509362117:web:fca11617f3cb85173b13ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
