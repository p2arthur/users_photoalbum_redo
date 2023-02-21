import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
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
