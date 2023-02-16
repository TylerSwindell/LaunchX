import { configureStore } from "@reduxjs/toolkit";
import launchApi from "./api/launchApi";
import flightListSlice from "./slices/flightListSlice";

export default configureStore({
    reducer: {
        [flightListSlice.name]: flightListSlice.reducer,
        [launchApi.reducerPath]: launchApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(launchApi.middleware)
})