import { createSlice } from "@reduxjs/toolkit";
import { FlightInformation } from "../../../types";

const initialState = <FlightInformation[]>[]

const flightListSlice = createSlice({
    name: 'flightList',
    initialState,
    reducers: {
        setFlightList: (state, action) => state = action.payload,
        sortFlightList: (state) => {
            state.sort((a, b) => (a.dateUnix > b.dateUnix) ? -1 : 1)
        },
        getFlightList: (state) => state,
        resetFlightList: (state) => state = <FlightInformation[]>[]
    }
})

export const {setFlightList, getFlightList, resetFlightList, sortFlightList} = flightListSlice.actions

export default flightListSlice