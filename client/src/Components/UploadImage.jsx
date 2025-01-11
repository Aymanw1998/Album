import React from "react";
import IMGNOTFOUNT from "./../images/img_not_found.jpg";
import "./../Components/UploadImage.css";
import ButtonComponent from "./ButtonComponent";

const UploadImage = ({ setLoading, closeModal, folder, addFile, imgSrc, thisFiles }) => {
    return (
        <>
        {console.log(imgSrc[0])}
            {imgSrc[0].length > 0 ? (
                imgSrc.map((src, index) => (
                    <>{console.log(index,imgSrc[0].length)}
                    <img
                        key={index}
                        style={{ 
                            width: '80%', 
                            height: '80%',  }}
                        className="uploadIMG"
                        src={src[0] ? src[0] : IMGNOTFOUNT}
                        alt={`uploaded-${index}`}
                    /></>
                ))
            ) : (
                <p>לא נמצאו תמונות להצגה.</p>
            )}
            
            <button 
                        onClick={async() => {closeModal(); await addFile(folder, thisFiles);setLoading(false)}} 
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            width:"100%",
                            padding: '10px 20px',
                            background: 'green',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {"שמור"}
                    </button>
        </>
    );
};

export default UploadImage;
