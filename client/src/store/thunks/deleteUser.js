import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteUser = createAsyncThunk("users/remove", async (user) => {
  console.log(user);
  const response = await fetch(`http://localhost:8000/users/${user.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id }),
  });

  return user;
});

export { deleteUser };
