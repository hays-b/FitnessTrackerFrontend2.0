import React from "react";
import { useState } from "react";
import { registerUser } from "../api";
import { useHistory } from "react-router-dom";

const Register = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  const history = useHistory();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await registerUser(username, password);
          console.log(result.token);
          if (result.error) {
            console.log("error", result);
            setCustomError(result.error);
          } else {
          localStorage.setItem("token", result.token);
          setToken(result.token);

          history.push("/myroutines");
          }
        }}
      >
        {customError ? <h3>Unable to create account: {customError}</h3> : null}
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          value={password}
          type="text"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          pattern=".{8,}"
          title="8 characters minimum"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
