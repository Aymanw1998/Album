import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useNavigate} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./App.css"

import Header from "./Components/Header/Header"
import Main from './Components/Main/Main';
import Folder from './Components/Folder/Folder'
import Footer from './Components/Footer/Footer'
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
          <Route path="/folder/:id" element={<Folder/>}/>
          <Route path='/list' element={<Main/>}/>
          <Route path='/album' element={<Main/>}/>
        </Routes>
        <Footer/>
      </>
    )
}

export default App;
