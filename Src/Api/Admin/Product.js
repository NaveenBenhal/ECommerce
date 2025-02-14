import axios from "axios";
import { baseURL } from "../BaseUrl";

export const getProductTypesApi =async ()=>{
    try{
        const path = baseURL + "Product/getProductTypes"
        console.log('getProductTypes PATH'+ path);
        
        const {data} = await axios.get(path)
        return data
    }catch(e){
        throw e;
    }
}
export const getSubProductTypesApi =async (ProductID)=>{
    try{
        const path = baseURL + `Product/getSubProductTypes?id=${ProductID}`
        console.log('getSubProductTypesApi PATH'+ path);
        const {data} = await axios.get(path)
        return data
    }catch(e){
        throw e;
    }
}