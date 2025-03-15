import { ENV } from "@/config/env";
import { IUser } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getUserApi = createApi({
  reducerPath: "getUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `profile/get-profile`,
      keepUnusedDataFor: 60,
      transformResponse: (data: { data: { user: IUser } }) => {
        if (!data.data) return null;
        return data.data.user;
      },
    }),
  }),
});
