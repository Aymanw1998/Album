import React, { useEffect, useState } from "react";
import { SERVER } from "../../../services/Folder.service";
import Loading from "../../Loading/Loading";
import "./Photos.css"

import ADDF from "../../../images/addFile.png"

import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import {Captions, Download, Fullscreen, Thumbnails, Zoom} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Photos = (props) => {
    const [folder, setFolder] = useState()
    const [index, setIndex] = useState(-1);
    const [slides, setSlides] = useState([]);
    const [ok, setOk] = useState(false);
    const [open, setOpen]= useState(false);
    const [selectedFile, setSelectedFile] = useState();
    useEffect(()=>{console.log(folder,slides)},[slides])
    const fetchData = async() => {
            const urlArray = window.location.pathname.split("/");
            const id = urlArray[urlArray.length-1];
            const getF = await SERVER.getF(id);
                  if(getF.data){
                    console.log(getF.data);
                    setFolder(getF.data);
                    let list = [];
                    if(getF.data && getF.data.children.length > 0){
                        getF.data.children.map((serivce, i) => (
                            list.push({id: serivce.id, src: serivce.data, index: i})
                        ))
                        setSlides(list);
                    }
                    return;
                  }
                  else{
                    setFolder(null)
                  }
        }
        useEffect(()=>{
            fetchData();
        },[])

        const addFile = async()=>{
            // setLoading(true);
            console.log("folder", folder.name);
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = "image/*";
            fileInput.style.display = 'none';
            fileInput.multiple = true; // מאפשר בחירה של מספר קבצים
            fileInput.onchange = async(e) => {
                console.log(e.target.files)
                const files = Array.from(e.target.files);
                if(files.length > 0){
                    // onlineImage(dataH,files);
                    console.log("my files", files);
                    for(const thisFile of files){
                        const formData = new FormData();
                        formData.append('file', thisFile);
                        formData.append('type', 'file');
                        try{
                            console.log(folder);
                            await SERVER.addFileToFolder(folder._id, formData)
                        }catch(err){console.error("Error uploading file:", err)}
                    }
                    fetchData();
                }
                return;
            }
            fileInput.oncancel = (e) => {
                console.log(e)
                // setLoading(false)
            }
            fileInput.onclose = (e) => {
                console.log(e);
            }
            fileInput.click();
        };
        const deleteFile = async(thisFile)=> {
            console.log(thisFile, folder);
            // return;
            try{await SERVER.removeFileFromFolder(folder._id, thisFile.id);}
            catch(err){console.error("Error delete file:", err);}
            await fetchData();
        }
    return (<>
        {!folder && <Loading style={{margin: "0 auto"}}/>}
        {folder && <h1 style={{textAlign: "center"}}><b>{folder.name}</b></h1>}
        <div className="service-cardP" onClick={addFile}>
            <img key={-1} src={ADDF} alt="serviceP" />
        </div>
        {folder && folder.children.length <= 0 && <h1 style={{display: "grid",justifyContent: "center", margin: "0 auto"}}>אין תמונות להצגה</h1>}
        <div className="service-containerP">
            {folder && folder.children.length > 0 && folder.children.map((service,i) => (
                <div className="service-cardP" onClick={()=>{setIndex(i); setSelectedFile(service);setOpen(true)}}>
                    <img key={i} src={service.data} alt="serviceP" />
                </div> 
                ))}
            {folder && folder.children.length > 0 && <Lightbox plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]} index={index} open={index >= 0 && ok} slides={slides} close={()=> {setOk(false);setIndex(-1)}}/>}
        </div>
        <Dialog
            open={open}
            onClose={()=>{setOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogActions>
                <button onClick={()=>{deleteFile(selectedFile); setOpen(false)}}>מחיקה</button>
                <button onClick={()=>{setOk(true); setOpen(false)}} autoFocus>הגדלה</button>
            </DialogActions>
        </Dialog>
    </>)
}

export default Photos;
