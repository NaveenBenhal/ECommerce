import { configureStore } from "@reduxjs/toolkit";
import LoginResReducer from "./Common/Reducer/LoginResReducer";

export const store = configureStore({
reducer:{
    // Define your reducers here
    loginRes : LoginResReducer
}
})