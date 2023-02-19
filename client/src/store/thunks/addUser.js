import { createAsyncThunk } from "@reduxjs/toolkit";

const addUser = createAsyncThunk("users/add", async (data) => {
  const response = await fetch("http://localhost:8000/users/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  await stop(3000);

  const responseData = await response.json();
  return responseData;
});

const stop = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export { addUser };
