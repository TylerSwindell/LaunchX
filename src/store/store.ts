import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Launch, Store } from '../store/types'
import { ActionTypes, SET_LAUNCHES } from "./actions";

export const launchApi = createApi({
    reducerPath: "launchApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    tagTypes: ['Launches'],
    endpoints: (builder) => ({
        // Query Definitions
        getAllLaunches: builder.query<Launch, void>({
            query: () => 'launches'}),
        getUpcomingLaunches: builder.query<Launch, void>({
            query: () => 'launches/upcoming'
        })
    }),
})


export const { useGetAllLaunchesQuery, useGetUpcomingLaunchesQuery } = launchApi