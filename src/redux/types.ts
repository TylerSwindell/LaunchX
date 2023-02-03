export interface Launch {
    id: string,
    flight_number: number,
    rocket: string,
    name: string,
    date_local: string,
    date_unix: number
    crew: [],
    // launchDateUnix: number,
    // localLaunchDate: Date,
}

export interface Store {
    launches: Launch[]
}