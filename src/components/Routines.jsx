import React, { useState, useEffect } from "react";
import { getPublicRoutines } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const displayRoutines = async () => {
      const data = await getPublicRoutines();
      setRoutines(data);
    };
    displayRoutines();
  }, []);

  return (
    <div id="routineList">
      <h1>Public Routines</h1>
      {routines.map((routine, idx) => (
        <div key={routine.id}>
          <h1>Routine: {routine.name}</h1>
          <h4>Creator: {routine.creatorName}</h4>
          <h2>Goal: {routine.goal}</h2>
          <h3>Activities:</h3>
          <div id="activityList">
            {routine.activities.map((activity, idx) => (
              <div key={activity.id}>
                <h4>
                  Step {idx + 1}: {activity.name}{" "}
                </h4>
                <p>Description: {activity.description}</p>
                <p>Count: {activity.count}</p>
                <p>Duration: {activity.duration}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Routines;

// As any user on the Routines tab, I want to:

// see a list of all public routines showing:
// The routine name, goal, and creator's username
// A list of activities for the routine, including their name, description, and duration and/or count
