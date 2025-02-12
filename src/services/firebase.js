import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyBpZQuKVl639wtOd0f8OlOedP1nWf8jRDU",
    authDomain: "my-app-e72d8.firebaseapp.com",
    projectId: "my-app-e72d8",
    storageBucket: "my-app-e72d8.firebasestorage.app",
    messagingSenderId: "839247500505",
    appId: "1:839247500505:web:ca549920cdb86d370c9ac8",
    measurementId: "G-0FDQ1RC40J"
};

export const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
    } catch (error) {
        // console.error('Error signing up user:', error.message);
        throw new Error(error.message);
    }
};

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
    } catch (error) {
        // console.error('Error signing in user:', error.message);
        throw new Error(error.message);
    }
};

export const signOut = (setUser, setCartItems) => {
    getAuth().signOut()
        .then(() => {
            setUser(null);
            setCartItems([]);
            useNavigate('/login');
        })
        .catch((error) => {
            console.error('Error signing out user: ', error);
        });
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage, collection, getDocs, getDoc, doc, addDoc, setDoc, ref, uploadBytes, getDownloadURL };
