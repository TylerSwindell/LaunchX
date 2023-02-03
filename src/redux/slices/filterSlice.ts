import { createSlice } from "@reduxjs/toolkit";
import { Launch } from "../types";

const filterSlice = createSlice({
    name: 'launchApiSlice',
    initialState: (<Launch[]>[]),
    reducers: {
        setFilter: (state, action) => state = action.payload,
        resetFilter: (state, action) => state = <Launch[]>[]
    }
})

export const {setFilter, resetFilter} = filterSlice.actions

export default filterSlice