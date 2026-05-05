import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDh-usir3Rs-LINs3gnVMHVkAneAJuUubI",
  authDomain: "luisowka.firebaseapp.com",
  projectId: "luisowka",
  storageBucket: "luisowka.firebasestorage.app",
  messagingSenderId: "607634472019",
  appId: "1:607634472019:web:a9d6737b99388a7be9daa6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);