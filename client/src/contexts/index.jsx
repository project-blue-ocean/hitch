import React, {
  useState, useEffect, useMemo,
} from 'react';

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
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
