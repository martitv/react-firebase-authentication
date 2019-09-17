import { useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const useAuthorization = ({condition, Component, redirect}) => {
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(authUser => {
            if (!condition(authUser)) {
              redirect();
            }
          });
    }, []);
};

export default useAuthorization;
