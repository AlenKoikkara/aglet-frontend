import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRLFvpF6tqBHcqMFK2mOBuGH-niu0K1bA",
  authDomain: "shoetop-e5612.firebaseapp.com",
  projectId: "shoetop-e5612",
  storageBucket: "shoetop-e5612.appspot.com",
  messagingSenderId: "1017120741280",
  appId: "1:1017120741280:web:3b31f66dda4989520d76c5",
  measurementId: "G-SYXCN29038"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
