import axios from "axios";
import { baseURL } from "./BaseUrl";

export const RegisterApi = async (body) => {
    try {
        const path = baseURL + "Auth/Create";
        console.log("RegisterApi SENDING DATA:",path, JSON.stringify(body, null, 2));

        const { data } = await axios.post(path, body);
        return data;
    } catch (e) {
        console.log("RegisterApi error:", e);
        throw e;
    }
};

export const LoginApi = async (body) => {
    try {
        const path = baseURL + "Auth/login";
        console.log("LoginApi SENDING DATA:",path, JSON.stringify(body, null, 2));

        const { data } = await axios.post(path, body);
        console.log("LoginApi RESPONSE:", JSON.stringify(data, null, 2));
        return data;
    } catch (e) {
        console.log("LoginApi error:", e);
        throw e;
    }
};
