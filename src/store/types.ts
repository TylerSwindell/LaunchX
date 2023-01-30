export interface Launch {
    rocket: string,
    name: string,
    date_local: string
    // rocketName: string,
    // launchDateUnix: number,
    // localLaunchDate: Date,
    // crew: [],
}

export interface Store {
    launches: Launch[]
}