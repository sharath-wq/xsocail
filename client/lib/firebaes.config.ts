// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA4TM0ZSLzS0Sdg-h5fakHBjkGYxsHKaqc',
    authDomain: 'xsocial-414406.firebaseapp.com',
    projectId: 'xsocial-414406',
    storageBucket: 'xsocial-414406.appspot.com',
    messagingSenderId: '208073718655',
    appId: '1:208073718655:web:07fa0ccf87171982a9b84a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
