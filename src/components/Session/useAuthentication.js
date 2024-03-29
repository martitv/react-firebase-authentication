import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase";

const useAuthentication = () => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listener = firebase.onAuthListener(user => {
      localStorage.setItem('user', JSON.stringify(user));
      setAuthUser(user);
    });

    return () => listener();
  }, [firebase]);

  if(!authUser) {
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    if(cachedUser) {
      setAuthUser(cachedUser);
    }
  }

  return authUser;
};

export default useAuthentication;
