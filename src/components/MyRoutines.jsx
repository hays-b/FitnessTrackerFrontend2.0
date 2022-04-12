import React from "react";
import { getMyRoutines } from "../api";
import { useState, useEffect } from "react";

const MyRoutines = ({ token, user }) => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const displayRoutines = async () => {
      const data = await getMyRoutines(user.username, token);
      console.log("my routines data is gonna be ------>", data);
      setRoutines(data);
    };
    displayRoutines();
  }, [token, user.username]);

  return (
    <div id="routineList">
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

export default MyRoutines;

// As a registered user on the My Routines tab, I want to:

// be shown a form to create a new routine

// the form should have text fields for name and goal
// for each routine which is owned by me I should

// be able to update the name and goal for the routine
// be able to delete the entire routine
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
// be able to remove any activity from the routine
