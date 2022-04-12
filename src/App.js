import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Home, Register, Routines } from "./components";



function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      console.log("currentToken from localStorage", token);
    }
  }, [token]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/routines">
        <Routines />
      </Route>
      <Route path="/Login">
        <Login setToken={setToken}/>
      </Route>
      <Route path="/Register">
        <Register setToken={setToken} token={token} />
      </Route>
    </Switch>
  );
}

export default App;
