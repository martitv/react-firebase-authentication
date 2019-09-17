import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

const PasswordForgetForm = () => {
  const firebase = useContext(FirebaseContext);

  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const { email, error } = formValues;

  const isInvalid = email === "";

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setFormValues({ ...INITIAL_STATE });
      })
      .catch(error => {
        setFormValues({ ...formValues, error });
      });
    event.preventDefault();
  };
  const onChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
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
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
