import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import {
  Login,
  Home,
  Register,
  Logout,
  Routines,
  MyRoutines,
  Activities,
} from "./components";

  import useAuth from './hooks/useAuth'

function App() {
  const { token, user } = useAuth()

  return (
    <div>
      <header>
        <h3>Welcome to Fitness Tracker, {user.username}</h3>
        <Link to="/">Home</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/activities">Activities</Link>
        {token ? (
          <>
        <Link to="/myroutines">MyRoutines</Link>
        <Link to="/logout">Logout</Link>
        </>
        ) : (
          <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>
        )}
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/myroutines" element={<MyRoutines />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
