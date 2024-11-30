import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, LoginPayload, LoginResponse } from "type";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<LoginResponse>, LoginPayload>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export default authApi;
export const { useLoginMutation } = authApi;
