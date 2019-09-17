import React from "react";
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
import { AuthUserContext } from "../Session";
import useAuthentication from "../Session/useAuthentication";



const App = () => {
  const authUser = useAuthentication();

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
