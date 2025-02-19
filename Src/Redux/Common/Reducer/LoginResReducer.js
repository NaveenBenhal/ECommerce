import { createSlice } from "@reduxjs/toolkit";
import { updateLogRes } from "../Actions/AuthAction";

const initialState = {
    loginRes: null,
    loading: false,
    error: null
}

const LoginResReducer = createSlice({
    name: "loginRes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateLogRes.pending, (state, action) => {
                state.loginRes = null
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLogRes.fulfilled, (state, action) => {
                state.loginRes = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(updateLogRes.rejected, (state, action) => {
                state.loginRes = null
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default LoginResReducer.reducer