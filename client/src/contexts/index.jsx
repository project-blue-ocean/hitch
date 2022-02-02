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

  function getProfile(params) {
    const profRef = doc(db, 'profile', params);
    return getDoc(profRef);
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

  async function getRides(params) {
    const rides = [];
    const q = query(ridesCollectionReference, where('start', '==', params));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((ride) => {
      rides.push(ride.data());
    });
    return rides;
  }

  function addReview(body) {
    return addDoc(reviewsCollectionReference, body);
  }

  async function getReviews(params) {
    const reviews = [];
    const reviewsSnapshot = await getDocs(reviewsCollectionReference, params);
    reviewsSnapshot.forEach((review) => {
      reviews.push(review.data());
    });
    return reviews;
  }

  function addMessage(body) {
    return addDoc(messagesCollectionReference, body);
  }

  async function getMessages(params) {
    //  get all messages id = sender id;get all messages id = reciever id;
    const messages = [];
    const q = query(collection(db, 'messages'), where('receiverId', '==', params.receiverId), where('senderId', '==', params.senderId));
    const unsubscribe = await onSnapshot(q);
    unsubscribe.forEach((docs) => {
      messages.push(docs.data());
    });
    console.log(messages)
    return messages;
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
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
