import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FlightInformation } from "../../../types"

export const launchApi = createApi({
    reducerPath: "launchApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    tagTypes: ['Launches'],
    endpoints: (builder) => ({
        // Query Definitions
        getAllLaunches: builder.query<Array<object>, void>({
            query: () => 'launches'
        }),
        getUpcomingLaunches: builder.query<Array<object>, void>({
            query: () => 'launches/upcoming'
        })
    }),
})

export default launchApi
export const { useGetAllLaunchesQuery, useGetUpcomingLaunchesQuery } = launchApi