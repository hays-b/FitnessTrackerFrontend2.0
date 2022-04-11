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

export const getAllRoutines = async () => {
  const response = await fetch(`${baseURL}/routines`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const createRoutine = async (token, name, goal, isPublic) => {
  const response = await fetch(`${baseURL}/routines`, {
    method: "POST",
    "Authorization": `Bearer ${token}`,
    body: JSON.stringify({
      name,
      goal,
      isPublic
    })
  })
  const data = await response.json();
  return data;
}

export const updateRoutine = async (routineId, token, name, goal) => {
  const response = await fetch(`${baseURL}/routines/${routineId}`, {
    method: "PATCH",
    "Authorization": `Bearer ${token}`,
    body: JSON.stringify({
      name,
      goal
    })
  })
  const data = await response.json();
  return data;
}


export const getUserRoutines = async (username, token) => {
  const response = await fetch(`${baseURL}/users/${username}/routines`, {
    method: "GET",
    "Authorization": `Bearer ${token}`
  });
  const data = await response.json();
  // console.log(data)
  return data;
};
