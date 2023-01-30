import { Launch } from "./types"

export const SET_LAUNCHES = "SET_LAUNCHES"

export type ActionTypes = 
    | { type: typeof SET_LAUNCHES, payload: Launch[] }

export const setLaunches = (launches: Launch[]): ActionTypes => ({
    type: SET_LAUNCHES, 
    payload: launches 
})