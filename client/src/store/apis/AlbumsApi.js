import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//DEV ONLY!--REMOVE FOR PRODUCTION
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

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
        providesTags: (result, error, user) => [{ type: "Album", id: user }],
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
        invalidatesTags: (result, error, album) => [
          { type: "Album", id: album.userId },
        ],
        query: (album) => {
          return {
            url: `/albums`,
            body: { title: album.title, userId: album.userId },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
