import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Navigation from "../Navigation";

import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";



const App = () => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser);
    });
    return () => listener();
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Navigation />
          <hr></hr>
          <Route exact path={ROUTES.LANDING} component={LandingPage}></Route>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage}></Route>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}></Route>
          <Route
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          ></Route>
          <Route path={ROUTES.HOME} component={HomePage}></Route>
          <Route path={ROUTES.ACCOUNT} component={AccountPage}></Route>
          <Route path={ROUTES.ADMIN} component={AdminPage}></Route>
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};
export default App;
