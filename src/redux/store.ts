import { configureStore } from "@reduxjs/toolkit";
import launchApi from "./api/launchApi";
import filterSlice from "./slices/filterSlice";

configureStore({
    reducer: {
        filterSlice: filterSlice.reducer,
        [launchApi.reducerPath]: launchApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(launchApi.middleware)
})