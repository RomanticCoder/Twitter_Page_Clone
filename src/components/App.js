import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  // if the browser checked the auth state
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () => updateProfile(user, { displayName: user.displayName }),
    });
  };

  useEffect(() => {
    // adds an observer for changes to the user's sign-in state
    authService.onAuthStateChanged((user) => {
      // user: UserImpl object {email, displayName, isAnonymous, uid,...}
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          // updateProfile(user, object)
          updateProfile: () => updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // if initialized => app router
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
    </>
  );
}

export default App;
