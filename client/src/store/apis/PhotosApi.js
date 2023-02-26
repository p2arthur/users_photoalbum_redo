import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/util";

const photosApi = createApi({
  reducerPath: "photos",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        query: (albumId) => {
          return {
            url: "/photos",
            params: { albumId },
            method: "GET",
          };
        },
      }),

      postPhoto: builder.mutation({
        query: (photo) => {
          return {
            url: "/photos",
            body: {
              photoUrl: photo.photoUrl,
              albumId: photo.albumId,
              photoTitle: photo.title,
            },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, usePostPhotoMutation } = photosApi;

export { photosApi };
