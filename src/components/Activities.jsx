import React, { useState, useEffect } from "react";
import { getAllActivities } from "../api";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const displayActivities = async () => {
      const data = await getAllActivities();
      setActivities(data);
    };
    displayActivities();
  }, []);

  return (
    <div id="activityList">
      <h1>Public Activities</h1>
      {activities.map((activity, idx) => (
        <div key={"activity" + activity.id}>
          <h1>Activity: {activity.name}</h1>
          <h4>Description: {activity.description}</h4>
          <h2>Count: {activity.count}</h2>
          <h3>Duration: {activity.duration}</h3>
        </div>
      ))}
    </div>
  );
};

export default Activities;

// As an unregistered visitor on the Activities tab, I want to:
// see a list of all activities which have been created

// As a registered user on the Activities tab, I want to:
// be shown a form to create a new activity (by name and description)
// be shown an error if the activity already exists
