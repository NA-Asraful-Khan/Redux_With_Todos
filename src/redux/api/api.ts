import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          method: "GET",
          url: `/todos`,
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    getSingleTodo: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/todos/${id}`,
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
    updateTodo: builder.mutation({
      query: (options) => {
        return {
          method: "PUT",
          url: `/todos/${options.id}`,
          body: options.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/todos/${id}`,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useGetSingleTodoQuery,
  useDeleteTodoMutation,
} = baseApi;
