import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyh-usir3Fs-LINs3gnvVWHkNAeJuUubI',
  authDomain: 'luisowka.firebaseapp.com',
  projectId: 'luisowka',
  storageBucket: 'luisowka.appspot.com',
  messagingSenderId: '607634472019',
  appId: '1:607634472019:web:a9d6737b9988a7be9daa6',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);