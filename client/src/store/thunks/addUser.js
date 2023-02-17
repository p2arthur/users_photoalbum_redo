import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async (data) => {
  const data2 = {
    username: faker.name.fullName(),
    title: faker.random.words(1),
    date: new Date(),
  };

  const response = await fetch("http://localhost:8000/users/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: faker.name.fullName(),
      title: faker.random.words(1),
      date: new Date(),
    }),
  });

  await stop(3000);

  const responseData = await response.json();
  return responseData;
});

const stop = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export { addUser };
