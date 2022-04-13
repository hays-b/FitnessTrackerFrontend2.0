import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { getMe } from "./api";
import {
  Login,
  Home,
  Register,
  Logout,
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
      <Navbar token={token} user={user} />
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
        <Route exact path="/Logout">
          <Logout setToken={setToken} setUser={setUser} />
        </Route>
        <Route exact path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route exact path="/Register">
          <Register setToken={setToken} token={token} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
