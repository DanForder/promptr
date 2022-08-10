import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const docRef = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(docRef, (doc) => {
        setDisplayName(doc.data()?.displayName);
      });
    } else {
      setDisplayName(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, displayName };
};
