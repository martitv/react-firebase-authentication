import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase";

const useAuthentication = () => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser);
    });
    return () => listener();
  }, [firebase.auth]);

  return authUser;
};

export default useAuthentication;
