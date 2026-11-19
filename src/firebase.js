
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDgAfOpPq2W9JkEHXskn8_pZd2ycKniVss",
  authDomain: "alerta-cidadao-f2c36.firebaseapp.com",
  projectId: "alerta-cidadao-f2c36",
  storageBucket: "alerta-cidadao-f2c36.firebasestorage.app",
  messagingSenderId: "725992644786",
  appId: "1:725992644786:web:26410dc4c435a16a5869ab",
  measurementId: "G-B48VNB12TD"
}

const app = initializeApp(firebaseConfig)

export const firebaseConfigured = true
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
