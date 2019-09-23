import React, { useContext } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut"

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { AuthUserContext } from "../Session";

const Navigation = () => {
  const authUser = useContext(AuthUserContext);
  return <div>{authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = ({ authUser }) => (
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
      { authUser.roles[ROLES.ADMIN] &&
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>}
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
