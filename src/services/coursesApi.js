import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5100/",
    baseUrl: "https://ezra-seminary-api.onrender.com/",
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "course/getall",
    }),
    getCourseById: builder.query({
      query: (id) => `course/get/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;
