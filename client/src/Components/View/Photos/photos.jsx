import React, { useEffect, useState } from "react";
import { SERVER } from "../../../services/Folder.service";
import Loading from "../../Loading/Loading";
import "./Photos.css"

import {Lightbox} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import {Captions, Download, Fullscreen, Thumbnails, Zoom, Video} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"


const generateThumbnail = (videoUrl) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.preload = "metadata";
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      resolve(imageUrl);
    });
  });
};

const isVideo = (url)=> [".mp4", "video", ".webm", ".ogg"].some(ext => url.toLowerCase().includes(ext));
const Photos = (props) => {
    const [folder, setFolder] = useState()
    const [index, setIndex] = useState(-1);
    const [slides, setSlides] = useState([]);
    useEffect(()=>{console.log("slides", slides)},[slides]);
    const fetchData = async() => {
            const urlArray = window.location.pathname.split("/");
            const id = urlArray[urlArray.length-1];
            const getF = await SERVER.getF(id);
            if(getF.data){
            console.log(getF.data);
            setFolder(getF.data);
            let list = [];
            if(getF.data && getF.data.children.length > 0){
                getF.data.children.map(async(serivce, i) => {
                    const thumbnail = await generateThumbnail(serivce.data);
                    list.push(isVideo(serivce.data)? {
                            id:serivce.id,
                            type: "video",
                            poster: thumbnail, // או תייצר preview thumbnail
                            width: "100%",
                            height: "100%",
                            sources: [
                                {
                                src: serivce.data,
                                type: "video/mp4", // ודא שזה הפורמט של הווידאו
                                },
                            ],
                        }: {
                        id: serivce.id, 
                        src: serivce.data, 
                        type: "image",
                    })
            })
                setSlides(list);
            }
            }
            else{
            setFolder(null)
            }
        }
        useEffect(()=>{
            fetchData();
        },[])
    return (<>
        {folder && <h1 style={{textAlign: "center"}}><b>{folder.name}</b></h1>}
        {!folder && <Loading style={{margin: "0 auto"}}/>}
        {folder && folder.children.length <= 0 && <h1 style={{display: "grid",justifyContent: "center", margin: "0 auto"}}>אין תמונות להצגה</h1>}
            <div className="service-containerP">
                {folder && folder.children.length > 0 && folder.children.map((service,i) => (
                    <div className="service-cardP" onClick={()=>setIndex(i)}>
                        {!isVideo(service.data) && <img key={i} src={service.data} alt="serviceP" />}
                        {isVideo(service.data) && <video key={i} src={service.data} controls muted />}
                    </div> 
                    ))}
                {folder && folder.children.length > 0 && <Lightbox plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails, Video]} index={index} open={index >= 0} slides={slides} close={()=> setIndex(-1)}/>}

            </div>
    </>)
}

export default Photos;
