// Folder.service.jsx
import axios from "axios";
const URL = process.env.SERVER_URI;
const BID = `${URL}/api/folders`;

const handleError = (error) => {
    console.error("API Error:", error);
    return { data: { _id: null }, err: true, message: error.message };
};

const getF = async(id=null)=>{
    try{
        const res = await axios.get(id? `${BID}/${id}` : `${BID}`);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }   
}

const createF = async(data) => {
    try{
        const res = await axios.post(`${BID}`, data);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}

const updateF = async(id, data) => {
    try{
        const res = await axios.put(`${BID}/${id}`, data);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}

const deleteF = async(id) => {
    try{
        console.log(id);
        const res = await axios.delete(`${BID}/${id}`);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}

const deleteAllF = async() => {
    try{
        const res = await axios.delete(`${BID}/all`);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}
const addFileToFolder = async(id, file) => {
    try{
        const res = await axios.post(`${BID}/${id}/file`, file);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}

const removeFileFromFolder = async(id,name) => {
    try{
        console.log(id,name);
        console.log(`${BID}/${id}/file/${name}`)
        const res = await axios.delete(`${BID}/${id}/file/${name}`);
        const result = {data: res.data, err: false };
        console.log("result", result);
        return result;
    }catch(err){
        return handleError(err);
    }
}
export const SERVER = {
    getF, createF, updateF, deleteF,addFileToFolder, removeFileFromFolder,deleteAllF
}