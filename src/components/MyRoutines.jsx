import React, { useState, useEffect } from "react";
import { createRoutine, getMyRoutines } from "../api";

const MyRoutines = ({ token, user }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    // check for a username before making an ajax call (avoids unnecessary call)
    if (user.username) {
      const displayMyRoutines = async () => {
        const data = await getMyRoutines(user.username, token);
        setMyRoutines(data);
      };
      displayMyRoutines();
    }
  }, [user, token]);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await createRoutine(
            token,
            formState.name,
            formState.goal,
            formState.isPublic
          );
          if (result.error) {
            console.log("error", result);
            setCustomError(result.error);
          } else {
            setCustomError("");
          setMyRoutines([...myRoutines, result]);
          console.log("I have no idea what this returns: ", result);
          }
        }}
      >
        {customError ? <h3>Unable to post: {customError}</h3> : null}
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="goal"
          value={formState.goal}
          onChange={(event) =>
            setFormState({ ...formState, goal: event.target.value })
          }
          required
        />
        <input
          type="checkbox"
          id="isPublic"
          value={formState.isPublic}
          onChange={() =>
            setFormState({ ...formState, isPublic: !formState.isPublic })
          }
        />
        <label htmlFor="isPublic">Is this a public post?</label>
        <button type="submit">Post</button>
      </form>
      {/* if there are myRoutines to map through, display them */}
      {myRoutines.length ? (
        <div id="routineList">
          <h1>Your Routines</h1>
          {myRoutines.map((routine, idx) => (
            <div key={"myRoutines" + routine.id}>
              <h1>Routine: {routine.name}</h1>
              <h2>Goal: {routine.goal}</h2>
              <h3>Activities:</h3>
              {/* if the routine has activities, map and display them too */}
              {routine.activities ? (
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
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default MyRoutines;

// be shown a form to create a new routine
// the form should have text fields for name and goal

// for each routine which is owned by me I should
// be able to update the name and goal for the routine
// be able to delete the entire routine
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
// be able to remove any activity from the routine

// {
//   /* <button>Update Routine</button>
// <button>Delete Routine</button> */
// }
