import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyDC6CFbt85RXo-QTGECjg9BWtvJN8ienrk",
  authDomain: "m-banking-development.firebaseapp.com",
  projectId: "m-banking-development",
  storageBucket: "m-banking-development.appspot.com",
  messagingSenderId: "541084951153",
  appId: "1:541084951153:web:aa413314825453da79b1d0",
  measurementId: "G-DEENREMZ8P",
});

const auth = getAuth(app);
export { auth };
export default app;

const db = getFirestore();

export { db };

const colRef = collection(db, "users");
export { colRef };

// getDocs(colRef)
//   .then((snapshot) => {
//     let arr = [];
//     snapshot.docs.forEach((doc) => {
//       arr.push({ ...doc.data() });
//     });
//     console.log(arr);
//   })
//   .catch((err) => console.log(err));
