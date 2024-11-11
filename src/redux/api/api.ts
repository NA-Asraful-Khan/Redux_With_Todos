import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/todos",
        };
      },
      providesTags: ["todo"],
    }),
    createTodo: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/todos",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = baseApi;
