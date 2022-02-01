import React, {
  useState, useEffect, useMemo,
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
  sendPasswordResetEmail,
  onAuthStateChanged,
  updatePassword as updatepassword,
  updateEmail as updateemail,
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

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(newEmail) {
    return updateemail(currentUser, newEmail);
  }

  function updatePassword(newPassword) {
    return updatepassword(currentUser, newPassword);
  }
  // {displayName: 'displayName', photoURL: 'urlHere'}
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
    // const rideRef = doc(db, 'rides', params);
    // return getDoc(rideRef);
    const rides = [];
    const q = query(ridesCollectionReference, where('start', '==', params));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((ride) => {
      rides.push(ride.data());
    });
    return rides;
    // return getDocs(q);

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  }

  function addReview(body) {
    return addDoc(reviewsCollectionReference, body);
  }

  function getReviews(params) {
    return getDocs(reviewsCollectionReference, params);
  }

  function addMessage(body) {
    addDoc(messagesCollectionReference, body);
  }
  // function getMessages(params) {
  //   return getDocs(messagesCollectionReference, params);
  // }

  function getMessages(params) {
    return getDocs(messagesCollectionReference, params);
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

  const value = useMemo(() => ({
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
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
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
