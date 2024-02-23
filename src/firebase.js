// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// import { firebaseKey } from './api/key'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'test-a42de.firebaseapp.com',
  projectId: 'test-a42de',
  storageBucket: 'test-a42de.appspot.com',
  messagingSenderId: '442952899665',
  appId: '1:442952899665:web:06833c65f1bce7dbd36c70',
  measurementId: 'G-6DNJFS8ETG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export default app
