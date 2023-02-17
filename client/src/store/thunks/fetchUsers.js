import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:8000/users");
  await pause(1000);
  console.log(response.data);
  return response.data;
});

const pause = function (duration) {
  console.log("Waiting");
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
