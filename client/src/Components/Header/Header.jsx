import React, {useEffect, useState} from 'react';

import "./Header.css"

import nameSystem from "../../images/logo.jpeg"
import instagramIcon from "../../images/instagram-icon.png"
import whatsappIcon from "../../images/whatsapp-icon.png"
import telIcon from "../../images/tel-icon.png"
import { useNavigate } from 'react-router-dom';
const Header = () => {
	return (
        <header>
            <div className='System'>
                <img className ="nameSystem" src={nameSystem} alt="NAME SYSTEM" />
            </div>
            <div className="footer-icons">
                <ul>
                <li className='insta'><a href="https://www.instagram.com/jihan_alajo" target="_blank"><img src={instagramIcon} style={{width: `4vw`, maxWidth: "50px", minWidth: "20px", height: "auto"}}/></a></li>
                    <li className='tel'><a href="tel:+972547756254" target="_blank"><img src={telIcon} style={{width: `4vw`, maxWidth: "50px", minWidth: "20px", height: "auto"}}/></a></li>
                    <li className='wa'><a href="https://wa.me/+972547756254" target="_blank"><img src={whatsappIcon} style={{width: `4vw`, maxWidth: "50px", minWidth: "20px", height: "auto"}}/></a></li>                    
                </ul>
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