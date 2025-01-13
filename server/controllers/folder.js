const Folder = require('../models/folder')
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const handleUpload = async(file) => {
    let res = await cloudinary.uploader.upload(file, {resource_type: "auto", folder: "jihan"});
    res = await cloudinary.uploader.rename(res.public_id, res.public_id.split("/")[res.public_id.split("/").length - 1] );
    console.log("add file", res )
    return res;
}

const handleRemove = async(file) => {
    const id = file.id;
    const res = await cloudinary.uploader.destroy(id,{resource_type: "image"},(result)=>console.log(result));
    console.log("delete file", res )
    return;
}


const get = async (req, res) => {
    try{
        console.log("get folder");
        const folders = await Folder.find();
        res.status(200).json(folders);
    } catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
}

const getById = async(req, res)=> {
    try{
        console.log("get folder");
        const folders = await Folder.findById(req.params.id);
        res.status(200).json(folders);
    } catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
}
const create = async (req, res) => {
    try{
        console.log("fjgfhdhdjdh");
        const { name } = req.body;
        const folderIsExist = await Folder.find({name: name});
        console.log("folderIsExist", folderIsExist, name)
        if(folderIsExist && folderIsExist.length > 0) return res.status(401).json("Same name");
        const newFolder = new Folder({ name });
        const savedFolder = await newFolder.save();
        return res.status(200).json(savedFolder);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
} 

const deleteByID =  async (req, res) => {
    try{
        // delete folders
        const { id } = req.params;
        console.log(req.params);
        await Folder.findByIdAndDelete(id);
        return res.status(200).json({ message: "Folder deleted successfully" });
    } catch(err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}

const editFolder = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, children } = req.body;
        const updatedFolder = await Folder.findByIdAndUpdate(
        id,
        { name, children },
        { new: true }
        );
        return res.status(200).json(updatedFolder);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}


///
const addFileToFolder = async(req, res) => {
    try{
        const { id } = req.params;
        const { name,text, type} = req.body;
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        //console.log(req);
        
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const file = {
            id: cldRes.public_id.split("/")[cldRes.public_id.split("/").length -1], data:cldRes.url, type:type,
        }
        console.log(file);
        const updatedFolder = await Folder.findByIdAndUpdate(
        id,
        { $addToSet:{children: file} },
        { new: true }
        );
        return res.status(200).json(updatedFolder);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

const removeFileFromFolder = async(req, res) => {
    try{
        const { _id, id } = req.params;
        const folder = await Folder.findById(_id);
        if(!folder) return ;
        var children = folder.children;
        console.log("before", children);
        const file = children.filter(file=> file.id == id);
        children = children.filter(file=> file.id !== id);
        console.log("before", children);
        const updatedFolder = await Folder.findByIdAndUpdate(
        _id,
        { children},
        { new: true }
        );
        await handleRemove(file[0]);
        return res.status(200).json(updatedFolder);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

const deletAll = async(req, res) => {
    try{

        console.log("deleteAll");
        const folders = await Folder.find();
        folders.forEach(async(folder)=> {
            if(folder.children.length > 0) {
                folder.children.forEach(async(file)=> {
                    if("id" in file)
                        await handleRemove(file);
                    else console.log("no id");
                });
            }
        })
        const deleteData = await Folder.deleteMany();
        return res.status(200).json(deleteData)
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}
module.exports = {get, getById, create, deleteByID,editFolder, addFileToFolder, removeFileFromFolder,deletAll}