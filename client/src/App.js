import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import "./App.css"

import Header from "./Components/Header/Header"
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer'
import Album from "./Components/View/Album/Album"
import Photos from "./Components/View/Photos/photos"
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
          <Route path="/folder/:id" element={<Photos/>}/>
          <Route path='/list' element={<Main/>}/>
          <Route path='/album' element={<Album/>}/>
        </Routes>
        <Footer/>
      </>
    )
}

export default App;
