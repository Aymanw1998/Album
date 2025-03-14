import React, { useEffect, useState } from 'react';
import Folder from '../Folder/Folder';
import { SERVER } from '../../services/Folder.service';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent';
import './Main.css'; // נוסיף את ה-CSS

function Main() {
    const paths = ["/list", "/me", "/div"];
const isMatch = paths.some(path => window.location.pathname.includes(path));

    const navigate = useNavigate();
    const [folders, setFolders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        console.log("fetchData MAIN")
        setIsLoading(true);
        try {
            const getF = await SERVER.getF();
            if (getF.data.length > 0) {
                setFolders(getF.data);
                setFilteredData(getF.data);
            } else {
                setFolders([]);
                setFilteredData([]);
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

    // ✅ פונקציה להוספת קובץ
    const addFile = async(folder, thisFiles) => {
        
        console.log("my files", thisFiles);
        for(const thisFile of thisFiles){
            const formData = new FormData();
            formData.append('file', thisFile);
            formData.append('type', 'file');
            try{
            console.log(folders)
            console.log(folder);
            await SERVER.addFileToFolder(folder._id, formData)
            }catch(err){        
                console.error("Error uploading file:", err);
            }
        }
        // setFolders([...folders]);
        fetchData();
  };
    const addFolder = async () => {
        const newFolderName = prompt('הזן שם תיקייה:');
        if (newFolderName) {
            const isExists = folders.some(folder => folder.name === newFolderName);
            if (isExists) {
                alert(`התיקייה בשם ${newFolderName} כבר קיימת.`);
                return;
            }
            const newFolder = { name: newFolderName, children: [], type: 'folder' };
            await SERVER.createF(newFolder);
            await fetchData()
        }
    };

    const deleteItem = async (data, folder) => {
        console.log(data[0])
        console.log(folder)
        if (data[0].type == 'folder') {
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
        }else {
            for(const thisFile of data){
                console.log(thisFile.id, thisFile.parent._id);
                try{
                    await SERVER.removeFileFromFolder(thisFile.parent._id, thisFile.id);
                }catch(err){        
                    console.error("Error delete file:", err);
                }
            }
        }
        fetchData();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = folders.filter(folder =>
            folder.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="app-container">
            <h1 className="title">אלבום</h1>
            {isMatch && <div className="search-container">
                <input
                    type="text"
                    placeholder="חפש..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
            </div>}
            { isMatch && <button className='addFolder' onClick={addFolder} style={{}}>{"הוסף תיקייה"}</button>}
            {isLoading ? (
                <p className="loading-text">טעינה...</p>
            ) : filteredData.length > 0 ? (
                <div className="folders-container">
                    {filteredData.map(folder => (
                        <Folder
                            key={folder._id}
                            data={folder}
                            addFile={addFile}
                            deleteItem={deleteItem}
                        />
                    ))}
                </div>
            ) : (
                <p>לא נמצאו תוצאות.</p>
            )}
        </div>
    );
}

export default Main;
