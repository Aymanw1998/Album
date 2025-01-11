const express = require("express");
const multer = require("multer")
const {get, getById, create, deleteByID,editFolder, addFileToFolder, removeFileFromFolder, deletAll } = require('./../controllers/folder');
const router = express.Router();

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

router.post("/:id/file",upload.single('file'), addFileToFolder)
router.delete("/:_id/file/:id", removeFileFromFolder);
router.delete('/all', deletAll)

// קבלת כל התיקיות
router.get("/", get);
router.get("/:id", getById)
// יצירת תיקיה חדשה
router.post("/", create);

// מחיקת תיקיה
router.delete("/:id", deleteByID);

// עדכון תיקיה
router.put("/:id", editFolder);
module.exports = router;
