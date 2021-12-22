import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD9_AMRZRmuQdbtX1HQDYMHSW043_GF-PI",
    authDomain: "medicalapp-989ec.firebaseapp.com",
    projectId: "medicalapp-989ec",
    storageBucket: "medicalapp-989ec.appspot.com",
    messagingSenderId: "201410306863",
    appId: "1:201410306863:web:6cff43fb4b4bff8c7477da",
    measurementId: "G-K9G8B473TV"
}

const firebaseAPP = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseAPP)
export const firestore = getFirestore(firebaseAPP)