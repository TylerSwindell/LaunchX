import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Launch {
    rocket: string,
    name: string
    flightNumber: number
    // rocketName: string,
    // launchDateUnix: number,
    // localLaunchDate: Date,
    // crew: [],

}

export const launchApi = createApi({
    reducerPath: "launchApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    tagTypes: ['Launches'],
    endpoints: (builder) => ({
        getAll: builder.query<Launch[], void>({
            query: () => 'launches',
            providesTags: [{type: "Launches", id: "LIST"}]
        })
    })
})