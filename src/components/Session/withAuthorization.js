import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  const WithAuthorization = ({ history }) => {
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
      return () => listener();
    });

    return <Component {...this.props} />;
  };
};
export default withRouter(withAuthorization);
