import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";

const UsersSlice = createSlice({
  name: "users",
  initialState: { data: [], isLoading: false, error: null },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(addUser.pending, (state, _) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data.push(action.payload);
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = UsersSlice.reducer;