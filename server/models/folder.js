const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // שם התיקיה
  children: [], // רשימת שמות הקבצים בתיקיה
  type:{type:String , default: "folder"}

});

module.exports = mongoose.model("Folder", folderSchema);
