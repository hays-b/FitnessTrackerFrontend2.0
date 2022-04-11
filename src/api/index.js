const baseURL = "http://fitnesstrac-kr.herokuapp.com/api";

export const registerUser = async (username, password) => {
  const response = await fetch(`${baseURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
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
      user: {
        username,
        password,
      },
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

export const getUserRoutines = async (username) => {
  const response = await fetch(`${baseURL}/users/${username}/routines`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
