export interface Launch {
    id: string,
    flight_number: number,
    rocket: string,
    name: string,
    date_local: string
    date_unix: number
    // launchDateUnix: number,
    // localLaunchDate: Date,
    // crew: [],
}

export interface Store {
    launches: Launch[]
}