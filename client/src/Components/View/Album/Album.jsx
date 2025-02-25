import React, {useState, useEffect}from "react";
import { SERVER } from "../../../services/Folder.service";
import Loading from "../../Loading/Loading"
import "./Album.css"
import FOLDER from "../../../images/folder.jpg"
import { useNavigate } from "react-router-dom";

const Album = () => {
    const navigate = useNavigate();
    const [folders, setFolders] = useState()
    const [isLoading,setIsLoading] = useState(false);
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
    
    return (<>
        {!folders && <Loading style={{margin: "0 auto"}}/>}
        {folders && folders.length <= 0 && <h1 style={{display: "grid",justifyContent: "center", margin: "0 auto"}}>אין מידע להצגה</h1>}

        <div className="service-container">
            {folders && folders.map((service, index) => (
                <div onClick={()=>navigate("/folder/"+service._id)} key={index} className="service-card">
                    <img src={service.children.length > 0 ? service.children[0].data : FOLDER } alt="service" />
                    <div className="service-overlay">
                        <h2 className="service-title">{service.name}</h2>
                    </div>
                </div>
                ))}
        </div>
    </>);
}

export default Album;