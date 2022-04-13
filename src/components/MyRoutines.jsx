import React, { useState } from "react";
import { createRoutine, deleteRoutine, deleteRoutineActivity } from "../api";
import Update from "./Update";
import useAuth from "../hooks/useAuth";

const MyRoutines = () => {
  const { token, myRoutines, setMyRoutines, routines, setRoutines } = useAuth();
  
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const [createError, setCreateError] = useState("");
  
  // After deleting the routine, this function filters it out of the useStates
  const handleRoutineDelete = async (routineToDelete) => {
    await deleteRoutine(routineToDelete.id, token);

    setMyRoutines(
      myRoutines.filter((routine) => routine.id !== routineToDelete.id)
    );
    if (routineToDelete.isPublic) {
      setRoutines(
        routines.filter((routine) => routine.id !== routineToDelete.id)
      );
    }
  };

  // After removing the activity from the routine, this function filters the selected routine out of the useStates, mutates the activities list, and inserts it back in.
  const handleActivityRemoval = async (selectedRoutine, activityToDelete) => {
    await deleteRoutineActivity(activityToDelete.routineActivityId, token);

    setMyRoutines(
      myRoutines.filter((routine) => routine.id !== selectedRoutine.id)
    );
    if (selectedRoutine.isPublic) {
    setRoutines(
      routines.filter((routine) => routine.id !== selectedRoutine.id)
    );
  }

    selectedRoutine.activities.filter(
      (activity) =>
        activity.routineActivityId !== activityToDelete.routineActivityId
    );

    setMyRoutines([ ...myRoutines, selectedRoutine ]);
    if (selectedRoutine.isPublic) {
      setRoutines([ ...routines, selectedRoutine ]);
    }
  };

  return (
    <>
      <h3>Create your own routine here!</h3>
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
            setCreateError(result.error);
          } else {
            setCreateError("");
            setMyRoutines([...myRoutines, result]);
            console.log("I have no idea what this returns: ", result);
          }
        }}
      >
        {createError ? <h3>Unable to post: {createError}</h3> : null}
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
        <label htmlFor="isPublic">Is this a public routine?</label>
        <button type="submit">Post</button>
      </form>
      {/* if there are myRoutines to map through, display them */}
      {myRoutines.length ? (
        <div id="routineList">
          <h1>Your Routines</h1>
          {myRoutines.map((routine, idx) => (
            <div key={"myRoutines" + routine.id}>
              <h1>Routine: {routine.name}</h1>
              <h4>{routine.isPublic ? "Public" : "Private"}</h4>
              <h2>Goal: {routine.goal}</h2>
              <h3>Activities:</h3>
              {/* if the routine has activities, map and display them too */}
              {routine.activities ? (
                <>
                  <div id="activityList">
                    {routine.activities.map((activity, idx) => (
                      <div key={activity.id}>
                        <h4>
                          Step {idx + 1}: {activity.name}{" "}
                        </h4>
                        <p>Description: {activity.description}</p>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                        <button
                          onClick={() =>
                            handleActivityRemoval(routine, activity)
                          }
                        >
                          Remove Activity
                        </button>
                      </div>
                    ))}
                  </div>
                  <Update routine={routine} />
                  <button onClick={() => handleRoutineDelete(routine)}>
                    Delete Routine
                  </button>
                </>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default MyRoutines;

// for each routine which is owned by me I should
// be able to update the name and goal for the routine
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
