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

      postAlbums: builder.query({
        query: (album) => {
          return {
            url: `/albums`,
            params: {
              title: album.title,
              user_id: album.user_id,
            },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
