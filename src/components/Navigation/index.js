import React, { useContext } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut"

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton></SignOutButton>
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
