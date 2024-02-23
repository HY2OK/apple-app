import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'test-a42de.firebaseapp.com',
  projectId: 'test-a42de',
  storageBucket: 'test-a42de.appspot.com',
  messagingSenderId: '442952899665',
  appId: '1:442952899665:web:06833c65f1bce7dbd36c70',
  measurementId: 'G-6DNJFS8ETG',
}

const app = initializeApp(firebaseConfig)

export default app
