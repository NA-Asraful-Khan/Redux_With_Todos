import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        method: "GET",
        url: "/todos",
      }),
      transformResponse: (data) => data,
    }),
  }),
});

export const { useGetTodosQuery } = baseApi;
