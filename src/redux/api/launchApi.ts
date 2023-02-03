import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Launch } from '../types'

export const launchApi = createApi({
    reducerPath: "launchApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    tagTypes: ['Launches'],
    endpoints: (builder) => ({
        // Query Definitions
        getAllLaunches: builder.query<Launch[], void>({
            query: () => 'launches'
        }),
        getUpcomingLaunches: builder.query<Launch[], void>({
            query: () => 'launches/upcoming'
        })
    }),
})

export default launchApi
export const { useGetAllLaunchesQuery, useGetUpcomingLaunchesQuery } = launchApi