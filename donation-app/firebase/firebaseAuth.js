import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseConfig.js";
import { getDoc, doc, onSnapshot } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(
      auth,
      async (authUser) => {
        if (authUser) {
          const snapshot = await getDoc(doc(db, "users", authUser.uid));
          setUserId(snapshot.id);
        } else {
          setUserId(null);
          setUser(false);
        }
      }
    );

    const unsubscribeFromUser = (() => {
      if (!userId) return () => {};
      const docRef = doc(db, "users", userId);
      return onSnapshot(docRef, (snapshot) => {
        const userData = snapshot.data();
        userData.userId = snapshot.id;
        setUser(userData);
      });
    })();

    return () => {
      unsubscribeFromAuthStateChanged();
      unsubscribeFromUser();
    };
  }, [userId]);

  return {
    user,
  };
}
