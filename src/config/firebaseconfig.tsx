import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAjad4KHLJhH8lShwKMKa-Df0cAlyXfVe8",
  authDomain: "catstore-9c0e9.firebaseapp.com",
  projectId: "catstore-9c0e9",
  storageBucket: "catstore-9c0e9.appspot.com",
  messagingSenderId: "706066947128",
  appId: "1:706066947128:web:50b15e6569f591b4a65acd",
  databaseURL: "https://catstore-9c0e9-default-rtdb.firebaseio.com/"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getDatabase(firebase);
