import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/AlbumsApi";
import { photosApi } from "./apis/PhotosApi";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      albumsApi.middleware,
      photosApi.middleware
    );
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/AlbumsApi";

export { useFetchPhotosQuery } from "./apis/PhotosApi";
