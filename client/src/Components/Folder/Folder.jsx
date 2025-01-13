// Folder.jsx
import React, { useState, useCallback, useEffect, } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import UploadImage from '../UploadImages/UploadImage';
import { useNavigate } from 'react-router-dom';

import FOLDER from "../../images/folder.jpg"
import SELECT from "../../images/select.png"
import SELECTED from "../../images/selected.png"
import DOWNLOAD from "../../images/download.png"

import {SERVER} from "../../services/Folder.service"
import ButtonComponent from '../ButtonComponent';


import "./Folder.css"
const Folder = ({ data, addFile, deleteItem, moveItem , depth = 0}) => {
    const paths = ["/list", "/me", "/div"];
const isMatch = paths.some(path => window.location.pathname.includes(path));
    const [onSelect, setOnSelect] = useState(false);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    const [folder, setFolder] = useState();
    const navigate = useNavigate();
    const fetchData = async() => {
        const urlArray = window.location.pathname.split("/");
        const id = urlArray[urlArray.length-1];
        const getF = await SERVER.getF(id);
              console.log("getF", getF);
              console.log("reultttt", getF.data, getF.data.length )
              if(getF.data){
                console.log(getF.data);
                setFolder(getF.data);
                return;
              }
              else{
                setFolder(null)
              }
    }
    useEffect(()=>{
        if(!data)
        {
            
            
        }
    },[])
    
    const [pages, setPages] = useState(1);
    const [isOpen, setIsOpen] = useState(true); //open folders
    const [src, setSrc] = useState(null);
    const [dataH, setDataH] = useState(data);
    const [modalImage, setModalImage] = useState(null); // התמונה שתוצג במודל
    const openModal = (image) => {
        setModalImage({...image, parent: data});
    };
    const closeModal = () => {
        setModalImage(null);
        setImgSrc([]);
        setPages(1);
        setTitle("");
        setText("");
    };

    const [imgSrc, setImgSrc] = useState([]);
    const [thisFiles, setThisFiles] = useState(null)
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    useEffect(()=>{
        if(!data){
            fetchData();
            return;
        }
        if(data.type == 'file')
            setSrc(data.data);
    },[])
    const toggleFolder = () => setIsOpen(!isOpen);

    // Drag and Drop setup
    const [, drag] = useDrag({
        type: 'file',  // בודק אם יש ילדים כדי להבדיל בין תיקיה לקובץ
        item: {
            name: "",
            data: "",
            text: "",
            type:"file",
        }
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'file',
        drop: useCallback((item) => {
            if(!item) return;
            if (item.type === 'folder') {
                if (item.name !== data.name && item.parent !== data.name) {
                    moveItem(item, data); // העברת תיקיה
                    alert(`העברת את התיקיה "${item.name}" לתוך "${data.name}"`);
                }
            } else if (item.type === 'file') {
                if (item.parent !== data.name) {
                    moveItem(item, data); // העברת קובץ
                    alert(`העברת את הקובץ "${item.name}" לתוך "${data.name}"`);
                }
            }
        }, [data, moveItem]), // רשימה ריקורה
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });
   
    return (
        <DndProvider backend={HTML5Backend}>
        
        {window.location.pathname.includes("/list")? (
        <div ref={drop} style={{ marginRight: `${depth * 20}px`, marginBottom: '10px' }}>
            <div
                ref={drag}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px',
                    border: isOver ? '2px solid #3faffa' : '2px solid transparent'
                }}
            >
                <span onClick={toggleFolder}>
                    {data.children && '📁'} {data.children && data.name}
                </span>
                {src && <img src={src} width={70}/>}
                <div>
                    {isMatch && data.children && (
                        <>
                        <ButtonComponent id="selected" label={onSelect ? "בטל בחירה":"בחירה"} performTask={()=>{setOnSelect(!onSelect);setSelected([])}}/>
                        {onSelect && <ButtonComponent id="delete" label={"🗑️"} performTask={async()=>{
                            if(selected.length > 0){
                                setLoading(true); await deleteItem(selected,selected[0]); setLoading(false);
                            }
                            else{
                                alert("בחר תמונות למחיקה")
                            }
                        }}/>}
                        {onSelect &&<ButtonComponent id="download" label={<img src={DOWNLOAD} width="18px"/>} performTask={()=>{
                            if(selected.length > 0){
                                
                            }
                            else{
                                alert("בחר תמונות להורדה")
                            }
                        }}/>}
                        {!onSelect &&<ButtonComponent id="button1" label="📄 קובץ" performTask={()=>{
                            setLoading(true);
                            console.log("folder", dataH.name);
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
                                    await addFile(dataH, files);
                                }
                                return;
                            }
                            fileInput.oncancel = (e) => {
                                console.log(e)
                                setLoading(false)
                            }
                            fileInput.onclose = (e) => {
                                console.log(e);
                            }
                            fileInput.click();
                        }}/>}
                        </>
                    )}
                    {/* {isMatch &&<button onClick={() => {deleteItem(data, data.type == "folder"? data : data.parent); closeModal()}}>❌</button>} */}
                    {!onSelect && isMatch &&<ButtonComponent label={"❌"} performTask={async() => {setLoading(true); closeModal(); await deleteItem([data], data.type == "folder"? data : data.parent); setLoading(false);}}/>}

                </div>
            </div>
            {isOpen && data.children && (
                <div style={{ background:"#cabbb8",display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {loading && <h1>טעינה....</h1>}
                    {
                    data.children.length <= 0 && !loading ? <h1>ריק</h1> :
                    !loading && data.children.map((image, index) => (
                    <div key={index} className="card border-primary mb-3 image-card" 
                    tyle={{ 
                        width: "150px", 
                        borderStyle: "groove", 
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        transform: 'scale(1)',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {console.log(selected,selected.filter(file => file.data === image.data), selected && selected.filter(url => url === image.data))}
                        {onSelect && <img
                            src={selected.length > 0 && selected.filter(file => file.data === image.data).length > 0 ? SELECTED : SELECT}
                            alt={`uploaded-${index}`}
                            style={{
                                position: "absolute",
                                zIndex: "2",
                                width: '10%',
                                height: '10%',
                            }}
                            onClick={()=>{
                                if(selected.length > 0 && selected.filter(file => file.data === image.data).length > 0)
                                    setSelected(selected.filter(file => file.data !== image.data))
                                else setSelected([...selected, {...image, parent: data}])
                                }}
                        />}
                        <img
                            src={image.data}
                            alt={`uploaded-${index}`} 
                            className="card-img-top"
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                            onClick={() => openModal(image)}
                        />
                    </div>
                    ))}

                </div>
            )}
            
            {/* מודל תצוגה מוגדלת */}
            {modalImage && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <img 
                        src={modalImage.data} 
                        alt={modalImage.name} 
                        style={{ 
                            width: '80%', 
                            height: '80%', 
                            borderRadius: '10px' 
                        }}
                    />
                    <button 
                        onClick={()=> {closeModal()}} 
                        className="close"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            width:"100%",
                            padding: '10px 20px',
                            background: 'yellow',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {"סגור"}
                    </button>
                    {isMatch &&<button 
                        onClick={async()=> {setLoading(true); closeModal(); await deleteItem([modalImage],data.type=="folder" ? data : data.parent); setLoading(false)}} 
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            width:"100%",
                            padding: '10px 20px',
                            background: 'red',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {"מחיקה"}
                    </button>}
                    
                </div>
            )}

            {/* מודל הוספה מוגדלת */}
            {isMatch &&  imgSrc && imgSrc.length >0 && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        buttom: 0,
                        right: 0,
                        width: 'auto',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <button 
                        onClick={()=> {setLoading(false);closeModal()}} 
                        className='close'
                        style={{
                            position: 'absolute',
                            top: '10px',
                            width:"100%",
                            padding: '10px 20px',
                            background: 'yellow',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {"סגור"}
                    </button>
                </div>
            )}
        </div>): (
            <>
                {!window.location.pathname.includes("/folder") &&
                <div onClick={()=>navigate("/folder/"+data._id)} style={{cursor: "pointer",textAlign:"center", marginBottom: "30px", fontSize: "20px"}}>
                    <div>{data.children.length > 0 ? <img src={data.children[0].data} className="card-img-top" style={{ width: '30%', borderRadius: '8px',}}
                        onClick={() => openModal(data.children[0])}
                    /> : <img src={FOLDER} className="card-img-top" style={{ width: '30%', borderRadius: '8px',}}/>} </div>
                    <span style={{ fontSize: "30px"}}>{data.children && data.name}</span>
                </div>}

                {/* בתוך תיקיה */}
                {window.location.pathname.includes("/folder") &&
                <>
                    <ButtonComponent label={"חזרה"}performTask={()=>navigate("/album")} style={{position: 'absolute',
                            top: '20px',
                            right: '20px',
                            padding: '10px 20px',
                            background: '#f556ba',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'}}/>
                    <ButtonComponent id="selected" label={onSelect ? "בטל בחירה":"בחירה"} performTask={()=>{setOnSelect(!onSelect);setSelected([])}}/>
                    {onSelect &&<ButtonComponent id="download" label={<img src={DOWNLOAD} width="18px"/>} performTask={()=>{
                        if(selected.length > 0){
                            
                        }
                        else{
                            alert("בחר תמונות להורדה")
                        }
                    }}/>}
                    <h1 style={{textAlign: "center", textDecoration: "underline"}}>{folder && folder.name}</h1>
                    {folder&& console.log(folder.children.length )}
                    {folder && folder.children.length > 0 ? (folder.children.map((image, index) => (
                        <>
                        {onSelect && <img
                            src={selected.length > 0 && selected.filter(file => file.data === image.data).length > 0 ? SELECTED : SELECT}
                            alt={`uploaded-${index}`}
                            style={{
                                position: "absolute",
                                zIndex: "2",
                                height: '10%',
                            }}
                            onClick={()=>{
                                if(selected.length > 0 && selected.filter(file => file.data === image.data).length > 0)
                                    setSelected(selected.filter(file => file.data !== image.data))
                                else setSelected([...selected, {...image, parent: data}])
                                }}
                        />}

                        <img
                        src={image.data}
                        alt={`uploaded-${index}`} 
                        className="card-img-top"
                        style={{display: "block",marginLeft: "auto",marginRight: "auto",width: "50%", marginBottom: "50px"}}
                        onClick={() => openModal(image)}
                    />
                    </>
                    ))):(
                        <span style={{marginLeft: "30%", marginRight: "30%"}}>אין תמונת קיימות</span>
                    )}
                    {modalImage && (
                        <div 
                            style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <img 
                        src={modalImage.data} 
                        alt={modalImage.name} 
                        style={{ 
                            width: "90%", height: "90%", 
                        }}
                    />
                    <button 
                        onClick={()=> {closeModal()}} 
                        className='close'
                        style={{
                            position: 'absolute',
                            bottom: '5px',
                            width:"100%",
                            // padding: '10px 20px',
                            background: 'red',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {"סגור"}
                    </button>
                    </div>)}
                </>}
            </>
        )
        }
        </DndProvider>
    );
};

export default Folder;
