import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [passwordError, setPasswordError] = useState("");

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm if the passwords matches
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // CReate the user in firebase
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // create a user document
      await createUserDocumentFromAuth(user, { displayName });

      // Reset the form fields
      setFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      }
      console.error("Error during user creation!", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });

    // Realtime password matching error messages
    if (name === "password" || name === "confirmPassword") {
      if (
        name === "password" &&
        formFields.confirmPassword &&
        value !== formFields.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      } else if (name === "confirmPassword" && value !== formFields.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(""); // Clear error message when passwords match
      }
    }
  };

  return (
    <div>
      <h1>Sign up with you email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
            pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
            title:
              "Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters",
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
            title:
              "Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters",
          }}
        />

        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
