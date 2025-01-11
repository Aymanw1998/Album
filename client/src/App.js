import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useNavigate} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./App.css"

import Main from './Components/Main/Main';
import Folder from './Components/Folder/Folder'

import { SpinnerProvider } from './Components/ButtonComponent';

function App() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(window.location.pathname != "/"){
        navigate("/album")
      } else if(window.location.pathname == "/list"){
        navigate("/list")
      }
    },[])
    document.querySelectorAll('button').forEach(element=>{
      element.onclick = function(){}
  })
    return(
      
      <>
          <Routes>
            <Route path="/folder/:id" element={<Folder/>}/>
            <Route path='/album/*' element={<Main/>}/>
            <Route path='/list' element={<Main/>}/>
          </Routes>
      </>
    )
}

export default App;
