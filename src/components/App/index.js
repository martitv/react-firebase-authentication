import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
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

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
  const authUser = useContext(AuthUserContext);
  const condition = (authUser, requiredRole) => !!authUser;
  //const condition = (authUser, requiredRole) => !!authUser && !!requiredRole && !!authUser.roles[requiredRole];

  return (
    <Route
      {...rest}
      render={props =>
        condition(authUser, requiredRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.LANDING} />
        )
      }
    />
  );
};

const App = () => {
  const authUser = useAuthentication();

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Navigation />
          <hr></hr>
          <Route exact  path={ROUTES.LANDING}         component={LandingPage}></Route>
          <Route        path={ROUTES.SIGN_UP}         component={SignUpPage}></Route>
          <Route        path={ROUTES.SIGN_IN}         component={SignInPage}></Route>
          <PrivateRoute path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}></PrivateRoute>
          <PrivateRoute path={ROUTES.HOME}            component={HomePage}></PrivateRoute>
          <PrivateRoute path={ROUTES.ACCOUNT}         component={AccountPage}></PrivateRoute>
          <PrivateRoute path={ROUTES.ADMIN}           component={AdminPage}></PrivateRoute>
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};
export default App;
