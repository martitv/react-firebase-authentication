import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { FirebaseContext } from "../Firebase";

const SignOutButton = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const signOut = event => {
    firebase.doSignOut();
    history.push(ROUTES.LANDING);
  };

  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default withRouter(SignOutButton);
