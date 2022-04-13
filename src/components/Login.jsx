import React, { useState } from "react";
import { loginUser } from "../api";
// import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  // const history = useHistory();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await loginUser(username, password);
          if (result.error) {
            console.log("error", result);
            setCustomError(result.error);
          } else {
            localStorage.setItem("token", result.token);
            setToken(result.token);

            // history.push("/myroutines");
          }
        }}
      >
        {customError ? <h3>Unable to create account: {customError}</h3> : null}
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          value={password}
          type="text"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
          pattern=".{8,}"
          title="8 characters minimum"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
