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
        providesTags: ["Photos"],
        query: (albumId) => {
          return {
            url: "/photos",
            params: { albumId },
            method: "GET",
          };
        },
      }),

      postPhoto: builder.mutation({
        invalidatesTags: ["Photos"],
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

      removePhoto: builder.mutation({
        invalidatesTags: ["Photos"],
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            params: { photoId: photo.id },
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  usePostPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;

export { photosApi };
