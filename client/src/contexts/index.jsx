import React, {
  useState, useEffect,
} from 'react';
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateprofile,
} from 'firebase/auth';
import { auth, db } from '../firebase';

const ridesCollectionReference = collection(db, 'rides');
const reviewsCollectionReference = collection(db, 'reviews');
const messagesCollectionReference = collection(db, 'messages');
const contactsCollectionReference = collection(db, 'contacts');

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function updateProfile(updatesObj) {
    return updateprofile(currentUser, updatesObj);
  }

  function updateUser(body) {
    const userDoc = doc(db, 'users', body.id);
    return updateDoc(userDoc, body);
  }

  function getUser(params) {
    const docRef = doc(db, 'users', params);
    return getDoc(docRef);
  }

  function addRide(body) {
    return addDoc(ridesCollectionReference, body);
  }

  function getRides(params) {
    return getDoc(ridesCollectionReference, params);
  }

  function addReview(body) {
    return addDoc(reviewsCollectionReference, body);
  }

  function getReviews(params) {
    return getDocs(reviewsCollectionReference, params);
  }

  function addMessage(body) {
    return addDoc(messagesCollectionReference, body);
  }

  function getMessages(params, callback) {
    console.log(params);
    const q = query(collection(db, 'messages'), where('chatid', 'array-contains', params));
    onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((docs) => {
        messages.push(docs.data());
      });
      callback(messages);
    });
  }

  function getContacts(params) {
    return getDocs(contactsCollectionReference, params);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    getUser,
    updateUser,
    addRide,
    getRides,
    addReview,
    getReviews,
    addMessage,
    getMessages,
    getContacts,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
