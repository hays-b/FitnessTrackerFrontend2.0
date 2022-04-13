import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, user }) => {
  return (
    <div className="navBar">
      <div className="title">
        Fitness Tracker
        {token ? <> Logged in as {user.username}</> : <> Not Logged in</>}
      </div>
      <Link to={"/"} className="nav_item">
        Home
      </Link>
      <Link to={"/routines"} className="nav_item">
        Routines
      </Link>
      <Link to={"/activities"} className="nav_item">
        Activities
      </Link>
      {token ? (
        <>
          <Link to={"/myroutines"} className="nav_item">
            My Routines
          </Link>
          <Link to={"/logout"} className="nav_item">
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"} className="nav_item">
            Log In
          </Link>
          <Link to={"/signup"} className="nav_item">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
