import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";

import { withRouter } from "react-router-dom";
import { SignUpLink } from "../SignUp";
import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const SignInFormBase = ({ history }) => {

  const firebase = useContext(FirebaseContext);

  const [fromValues, setFormValues] = useState(INITIAL_STATE);
  const { email, password, error} = fromValues;

  const isInvalid = password === "" || email === "";

  const onSubmit = event => {
    const { email, password } = fromValues;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setFormValues({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setFormValues({ ...INITIAL_STATE, error });
      });
    event.preventDefault();
  };
  const onChange = event => {
    setFormValues({ ...fromValues, [event.target.name]: event.target.value });
  };
  return (
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
}

const SignInForm = withRouter(SignInFormBase);

export { SignInForm };

export default SignInPage;
