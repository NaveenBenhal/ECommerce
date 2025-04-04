import axios from "axios";
import { baseURL } from "../BaseUrl";

export const getProductTypesApi = async () => {
    try {
        const path = baseURL + "Product/getProductTypes"
        console.log('getProductTypes PATH' + path);

        const { data } = await axios.get(path)
        return data
    } catch (e) {
        throw e;
    }
}
export const getSubProductTypesApi = async (ProductID) => {
    try {
        const path = baseURL + `Product/getSubProductTypes?id=${ProductID}`
        console.log('getSubProductTypesApi PATH' + path);
        const { data } = await axios.get(path)
        return data
    } catch (e) {
        throw e;
    }
}

export const createProductApi = async (formData) => {
    try {
        const path = baseURL + "Product/createProduct";
        console.log("createProductApi PATH: " + path);
        
        const { data } = await axios.post(path, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        return data;
    } catch (e) {
        console.log("createProductApi ERROR:", e);
        throw e;
    }
};

export const getProductsApi = async (body) => {
    try {
        const path = baseURL + `Product/getProducts`
        console.log('getSubProductTypesApi PATH  ' + path,body);
        const { data } = await axios.post(path,body)
        return data
    } catch (e) {
        throw e;
    }
}