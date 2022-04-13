import React from "react";
// import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { setToken, setUser } = useAuth();

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser({ id: "", username: "" });
  };

  // const history = useHistory();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        handleLogOut();
        // history.push("/");
      }}
    >
      <button type="submit">Log Out</button>
    </form>
  );
};

export default Logout;
