import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useNavigate} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./App.css"

import Main from './Components/Main/Main';
import Folder from './Components/Folder/Folder'

function App() {
    const navigate = useNavigate();
    useEffect(()=>{
      console.log(window.location.pathname)
      if(window.location.pathname == "/"){
        navigate("/album")
      }
    },[window.location])
    document.querySelectorAll('button').forEach(element=>{
      element.onclick = function(){}
  })
    return(
      
      <>
          <Routes>
            <Route path="/folder/:id" element={<Folder/>}/>
            <Route path='/album' element={<Main/>}/>
            <Route path='/list' element={<Main/>}/>
          </Routes>
      </>
    )
}

export default App;
