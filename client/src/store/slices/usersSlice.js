import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

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
      console.log(action.payload);
      state.data.push(action.payload);
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //--------------------------------------------------------------------------
    //Delete user
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //--------------------------------------------------------------------------
  },
});

export const usersReducer = UsersSlice.reducer;
