import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateLogRes = createAsyncThunk("loginRes",async (formData) => {
    try {
        return formData
    } catch (e) {
        console.log('updateLogRes ERR', e);
        throw e
    }
})