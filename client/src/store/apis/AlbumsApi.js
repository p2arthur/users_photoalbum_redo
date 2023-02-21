import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        //Adding a tag to make the request be reexecuted once we make a mutation to the database
        providesTags: ["Album"],
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
        invalidatesTags: ["Album"],
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
