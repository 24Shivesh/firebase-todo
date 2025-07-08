import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgF7Ragam9FkfPJCYF_k8PkdZllPwU_Cw",
  authDomain: "todo-app-c3357.firebaseapp.com",
  projectId: "todo-app-c3357",
  storageBucket: "todo-app-c3357.firebasestorage.app",
  messagingSenderId: "321369835062",
  appId: "1:321369835062:web:3fbb4852b5fed3173cba97",
  measurementId: "G-03EFNYVBQ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);