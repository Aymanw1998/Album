import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import "./App.css"

import Header from "./Components/Header/Header"
import Footer from './Components/Footer/Footer'
import AlbumV from "./Components/View/Album/Album"
import PhotosV from "./Components/View/Photos/photos"
import AlbumC from "./Components/Controller/Album/Album"
import PhotosC from "./Components/Controller/Photos/photos"
function App() {
    const navigate = useNavigate();
    useEffect(()=>{
      console.log(window.location.pathname)
      if(window.location.pathname == "/" || window.location.pathname == "/index.html"){
        navigate("/album")
      }
    },[])
    document.querySelectorAll('button').forEach(element=>{
      element.onclick = function(){}
  })
    return(
      
      <>
        <Header/>
        <Routes>
          {/* View */}
          <Route path='/album' element={<AlbumV/>}/>
          <Route path="/folder/:id" element={<PhotosV/>}/>
          {/* System */}
          <Route path='/system' element={<AlbumC/>}/>
          <Route path="/foldersys/:id" element={<PhotosC/>}/>
        </Routes>
        <Footer/>
      </>
    )
}

export default App;
