const baseURL = "http://fitnesstrac-kr.herokuapp.com/api";

export const registerUser = async (username, password) => {
  const response = await fetch(`${baseURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${baseURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const getMe = async (token) => {
  const response = await fetch(`{${baseURL}}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getMyRoutines = async (username, token) => {
  const response = await fetch(`${baseURL}/users/${username}/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllActivities = async () => {
  const response = await fetch(`${baseURL}/activities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createActivity = async (token, name, description) => {
  const response = await fetch(`${baseURL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateActivity = async (token, activityId, name, description) => {
  const response = await fetch(`${baseURL}/activities/${activityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await response.json();
  return data;
};

export const getPublicRoutinesByActivity = async (activityId) => {
  const response = await fetch(`${baseURL}/activities/${activityId}/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getAllRoutines = async () => {
  const response = await fetch(`${baseURL}/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createRoutine = async (token, name, goal, isPublic) => {
  const response = await fetch(`${baseURL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateRoutine = async (routineId, token, name, goal) => {
  const response = await fetch(`${baseURL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteRoutine = async (routineId, token) => {
  const response = await fetch(`${baseURL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const addActivityToRoutine = async (
  routineId,
  activityId,
  count,
  duration,
  token
) => {
  const response = await fetch(`${baseURL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      activityId,
      count,
      duration,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateRoutineActivity = async (
  rouActId,
  token,
  count,
  duration
) => {
  const response = await fetch(`${baseURL}/routine_activities/${rouActId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      count,
      duration,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteRoutineActivity = async (rouActId, token) => {
  const response = await fetch(`${baseURL}/routines/${rouActId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
