import { createSlice } from "@reduxjs/toolkit";
import { FlightInformation } from "../../../types";

const initialState = <FlightInformation[]>[]

const flightListSlice = createSlice({
    name: 'flightList',
    initialState,
    reducers: {
        setFlightList: (state, action) => state = action.payload,
        getFlightList: (state) => state,
        resetFlightList: (state) => state = <FlightInformation[]>[]
    }
})

export const {setFlightList, getFlightList, resetFlightList} = flightListSlice.actions

export default flightListSlice