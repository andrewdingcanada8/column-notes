// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBclx2pwCCx18pfRECuFDkel8k6ctU0wQc",
  authDomain: "column-notes.firebaseapp.com",
  projectId: "column-notes",
  storageBucket: "column-notes.appspot.com",
  messagingSenderId: "529506446614",
  appId: "1:529506446614:web:6c120166d5777d86227437",
  measurementId: "G-WFP5W0E7H0"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(firebaseApp)