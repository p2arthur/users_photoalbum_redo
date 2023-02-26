import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/util";
const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",

    //DEV ONLY!--REMOVE FOR PRODUCTION
    fetchFn: async (...args) => {
      await pause(3000);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        //Adding a tag to make the request be reexecuted once we make a mutation to the database
        providesTags: (result, errror, user) => {
          console.log(user);
          return [{ type: "Albums", id: user }];
        },
        query: (userId) => {
          return {
            url: `/albums`,
            params: {
              userId,
            },
            method: "GET",
          };
        },
      }),

      addAlbum: builder.mutation({
        //Whenever we run this mutation, we are going to look at all the queries that uses this tag and invalidate it to refetch the data
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: "Albums", id: album.userId }];
        },
        query: (album) => {
          return {
            url: `/albums`,
            body: { title: album.title, user_id: album.userId },
            method: "POST",
          };
        },
      }),

      removeAlbum: builder.mutation({
        invalidatesTags: (response, error, album) => [
          { type: "Albums", id: album.userId },
        ],
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            params: { albumId: album.id },
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
