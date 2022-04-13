import React, { useState, useEffect } from "react";
import { updateRoutine, getAllActivities, addActivityToRoutine } from "../api";

const Update = ({ token, routine, myRoutines, setMyRoutines }) => {
  const [updateState, setUpdateState] = useState({
    id: "",
    goal: "",
    isPublic: false,
  });
  const [activityToAdd, setActivityToAdd] = useState({
      name: "Any",
      count: "",
      duration: "",
    });
  const [updateError, setUpdateError] = useState("");

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const displayActivities = async () => {
      const data = await getAllActivities();
      setActivities(data);
    };
    displayActivities();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await updateRoutine(
            routine.id,
            token,
            updateState.name,
            updateState.goal,
            updateState.isPublic
          );
          const activityResult = await addActivityToRoutine(routine.id, activityToAdd.id, activityToAdd.count, activityToAdd.duration, token)
          console.log(activityResult)

          if (result.error) {
            console.log("error", result);
            setUpdateError(result.error);
          } else {
            setUpdateError("");

            const newRoutines = [];

            myRoutines.forEach((listedRoutine) => {
              if (listedRoutine.id !== routine.id) {
                newRoutines.push(listedRoutine);
              } else {
                newRoutines.push(result);
              }
            });
            setMyRoutines(newRoutines);
            console.log("I have no idea what this returns: ", result);
          }
        }}
      >
        {updateError ? <h3>Unable to update: {updateError}</h3> : null}
        <input
          type="text"
          placeholder={routine.name}
          value={updateState.name}
          onChange={(event) =>
            setUpdateState({ ...updateState, name: event.target.value })
          }
        />
        <input
          type="text"
          placeholder={routine.goal}
          value={updateState.goal}
          onChange={(event) =>
            setUpdateState({ ...updateState, goal: event.target.value })
          }
        />
        <input
          type="checkbox"
          id="isPublic"
          value={updateState.isPublic}
          onChange={() =>
            setUpdateState({ ...updateState, isPublic: !updateState.isPublic })
          }
        />
        <label htmlFor="isPublic">Make this routine public?</label>
        <div>
          <label htmlFor="select-activity">
            Select activity to add{" "}
            {/* <span className="activity-count">({activities.length})</span> */}
          </label>
          <select
            name="activity"
            id="select-activity"
            value={activityToAdd.id}
            onChange={(e) => setActivityToAdd({ ...activityToAdd, id: e.target.value})}
            /* this should update the value of the activities */
          >
            <option value="any">Any</option>
            {activities.map((activity, index) => {
              return (
                <option key={`activitiesList: ${index}`} value={activity.id}>
                  {activity.name}
                </option>
              );
            })}
            {/* map over the activities, return an <option /> */}
          </select>
          <input
          type="text"
          placeholder="count"
          value={activityToAdd.count}
          onChange={(event) =>
            setActivityToAdd({ ...activityToAdd, count: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="duration"
          value={activityToAdd.duration}
          onChange={(event) =>
            setActivityToAdd({ ...activityToAdd, duration: event.target.value })
          }
        />
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Update;
