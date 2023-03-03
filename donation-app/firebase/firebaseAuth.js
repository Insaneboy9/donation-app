import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {db} from "../firebase/firebaseConfig.js";
import { getDoc, doc } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, async (user) => {
      if (user) {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          const userData =  snapshot.data()
          userData.userId = snapshot.id;
          setUser(userData);
      } else {
        setUser(false);
      }
    });
    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user
  };
}
