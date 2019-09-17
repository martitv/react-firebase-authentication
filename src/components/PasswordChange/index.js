import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const PasswordChangeForm = () => {
  const firebase = useContext(FirebaseContext);

  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const { passwordOne, passwordTwo, error } = formValues;

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  const onSubmit = event => {
    const { passwordOne } = formValues;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setFormValues(INITIAL_STATE);
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
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordChangeForm;
