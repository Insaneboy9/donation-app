import React, { useEffect,useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export function useAuth() {
  const [user, setUser] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(true);
      } else {
        // User is signed out
        setUser(false);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user
  };
}