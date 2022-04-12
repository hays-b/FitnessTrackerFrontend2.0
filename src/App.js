import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { getMe } from "./api";
import {
  Login,
  Home,
  Register,
  Routines,
  MyRoutines,
  Navbar,
} from "./components";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      console.log("currentToken from localStorage", token);
    }
  }, [token]);

  useEffect(() => {
    const getMyUserFunction = async () => {
      if (token) {
        const result = await getMe(token);
        setUser({
          id: result.id,
          username: result.username,
        });
      }
    };
    getMyUserFunction();
  }, [token]);

  return (
    <>
      <Navbar token={token} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/routines">
          <Routines />
        </Route>
        <Route exact path="/myRoutines">
          <MyRoutines token={token} user={user} />
        </Route>
        <Route path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/Register">
          <Register setToken={setToken} token={token} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
