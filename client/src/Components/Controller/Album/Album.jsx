import React, {useState, useEffect}from "react";
import { SERVER } from "../../../services/Folder.service";
import Loading from "../../Loading/Loading"
import "./Album.css"
import FOLDER from "../../../images/folder.jpg"
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Album = () => {
    const navigate = useNavigate();
    const [folders, setFolders] = useState()
    const [isLoading,setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [selectedFolder, setSelectedFolder] = useState(null);
    const fetchData = async () => {
            console.log("fetchData ABLUM")
            setIsLoading(true);
            try {
                const getF = await SERVER.getF();
                if (getF.data.length > 0) {
                    setFolders(getF.data);
                } else {
                    setFolders([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, []);
    
        const addFolder = async () => {
            const newFolderName = prompt('הזן שם אלבוס:');
            if (newFolderName) {
                const isExists = folders.some(folder => folder.name === newFolderName);
                if (isExists) {
                    alert(`אלבום בשם ${newFolderName} כבר קיימת.`);
                    return;
                }
                const newFolder = { name: newFolderName, children: [], type: 'folder' };
                await SERVER.createF(newFolder);
                await fetchData()

            }
        };

        const deleteFolder = async (folder) => {
            console.log(folder);
            if(folder.children.length > 0){
                for(const thisFile of folder.children){
                    try{
                        await SERVER.removeFileFromFolder(folder._id, thisFile.id);
                    }catch(err){        
                        console.error("Error delete file:", err);
                    }
                }
            }
            console.log("folder._id", folder._id)
            await SERVER.deleteF(folder._id);
            await fetchData();
        }
    return (<>
        <button className='addFolder' onClick={addFolder} style={{}}>{"הוסף אלבום"}</button>
        {!folders && <Loading style={{margin: "0 auto"}}/>}
        {folders && folders.length <= 0 && <h1 style={{display: "grid",justifyContent: "center", margin: "0 auto"}}>אין מידע להצגה</h1>}

        <div className="service-container">
            <div onClick={addFolder} key={-1} className="service-card" style={{background:"greenyellow"}}>
                    <div className="service-overlay">
                        <h2 className="service-title">{"לחץ להוספת אלבום חדש"}</h2>
                    </div>
                </div>
            {folders && folders.map((service, index) => (
                <div onClick={()=>{setSelectedFolder(service);setOpen(true)}} key={index} className="service-card">
                    <img src={service.children.length > 0 ? service.children[0].data : FOLDER } alt="service" />
                    <div className="service-overlayS">
                        <h2 className="service-titleS">{service.name}</h2>
                    </div>
                </div>
                ))}
                <Dialog
                    open={open}
                    onClose={()=>{setOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogActions>
                        <button onClick={()=>{deleteFolder(selectedFolder); setOpen(false)}}>מחיקה</button>
                        <button onClick={()=>{navigate("/foldersys/"+selectedFolder._id); setOpen(false)}} autoFocus>כניסה</button>
                    </DialogActions>
                </Dialog>
        </div>
    </>);
}

export default Album;