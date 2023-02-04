import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FlightInformation } from "../../../types"

export const launchApi = createApi({
    reducerPath: "launchApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    tagTypes: ['Launches'],
    endpoints: (builder) => ({
        // Query Definitions
        getAllLaunches: builder.query<FlightInformation[], void>({
            query: () => 'launches'
        }),
        getUpcomingLaunches: builder.query<FlightInformation[], void>({
            query: () => 'launches/upcoming'
        })
    }),
})

export default launchApi
export const { useGetAllLaunchesQuery, useGetUpcomingLaunchesQuery } = launchApi