import React, { useEffect, useState } from "react";
import { SERVER } from "../../../services/Folder.service";
import Loading from "../../Loading/Loading";
import "./Photos.css"

import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import {Captions, Download, Fullscreen, Thumbnails, Zoom} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

const Photos = (props) => {
    const [folder, setFolder] = useState()
    const [index, setIndex] = useState(-1);
    const [slides, setSlides] = useState([]);
    const fetchData = async() => {
            const urlArray = window.location.pathname.split("/");
            const id = urlArray[urlArray.length-1];
            const getF = await SERVER.getF(id);
                  if(getF.data){
                    console.log(getF.data);
                    setFolder(getF.data);
                    let list = [];
                    if(getF.data && getF.data.children.length > 0){
                        getF.data.children.map((serivce) => (
                            list.push({src: serivce.data})
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
    return (<>
        {!folder && <Loading style={{margin: "0 auto"}}/>}
        {folder && folder.children.length <= 0 && <h1 style={{display: "grid",justifyContent: "center", margin: "0 auto"}}>אין תמונות להצגה</h1>}
            <div className="service-containerP">
                {folder && folder.children.length > 0 && folder.children.map((service, i) => (
                    <div key={i} className="service-cardP" onClick={()=>setIndex(i)}>
                        <img src={service.data} alt="serviceP" />
                    </div> 
                    ))}
                {folder && folder.children.length > 0 && slides.length > 0 &&<Lightbox plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]} index={index} open={index >= 0} slides={slides} close={()=> setIndex(-1)}/>}

            </div>
    </>)
}

export default Photos;
