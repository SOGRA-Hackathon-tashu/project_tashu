// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId
    apiKey: "AIzaSyCN6gTAzniZNKaYWyTbmv__mZs0g3zo354",
    authDomain: "sogra-tashu.firebaseapp.com",
    projectId: "sogra-tashu",
    storageBucket: "sogra-tashu.appspot.com",
    messagingSenderId: "553415661931",
    appId: "1:553415661931:web:1ad30670b065fd9fcf142e",
    measurementId: "G-M0SW845VWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export const signupWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signInWithFirebase = async (email, password) => { // signInWithEmailAndPassword 함수를 signInWithFirebase로 변경
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // signInWithEmailAndPassword로 변경
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export {db};