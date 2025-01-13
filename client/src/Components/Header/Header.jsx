import React, {useEffect, useState} from 'react';

import "./Header.css"
import nameSystem from "../../images/logo.jpeg"
import { useNavigate } from 'react-router-dom';
const Header = () => {
	return (
        <header>
            <div className='System'>
                <img className ="nameSystem" src={nameSystem} alt="NAME SYSTEM" />
                {/* <img className="logoSystem" src={IconSystem} alt="LOGO SYSTEM" /> */}
            </div>
            {/* <nav>
                <ul className="flex relative">
                    {
                        Menus.map((menu,i)=>(
                        <li key={i} onClick={()=> {navigate(menu.url)}}>
                            <a onClick={async()=>{await setActive(i)}}>
                                <span>{<ion-icon name={menu.iconClose}></ion-icon>}</span> 
                                <span>{menu.name}</span>
                            </a>
                        </li>))
                    }
                </ul>   
            </nav> */}
        </header>
	);
}

export default Header;