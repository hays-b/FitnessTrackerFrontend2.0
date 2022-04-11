import React, { useState, useEffect } from "react";
import { getAllRoutines } from "../api"

const Routines = () => {
const [routines, setRoutines] = useState([]);

    useEffect(() => {
      const displayRoutines = async () => {
        const data = await getAllRoutines();
        setRoutines(data);
      };
      displayRoutines();
    }, []);

  return (
      <div>
  <div id="routineList">
        {routines.map((routine, idx) => (
          <div key={routine.id}>
            <h3>{routine.name}</h3>
            <div>{routine.goal}</div>
            <div>{routine.creatorName}</div>
            </div>
  ))}
  </div>
  </div>
  )
};

export default Routines;

// As any user on the Routines tab, I want to:

// see a list of all public routines showing:
// The routine name, goal, and creator's username
// A list of activities for the routine, including their name, description, and duration and/or count
