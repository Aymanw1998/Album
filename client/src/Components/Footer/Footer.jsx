import React, {useEffect, useState} from 'react';

import "./Footer.css"
import { useNavigate } from 'react-router-dom';
const Footer = () => {
	return (
        <footer>
            <div className="footer-icons">
                <ul>
                    <li className='insta'><a href="https://www.instagram.com/jihan_alajo" target="_blank"><i className="fa fa-instagram fa-2x"></i></a></li>
                    <li className='tel'><a href="tel:+972547756254" target="_blank"><i className="fa fa-phone-square fa-2x"></i></a></li>
                    <li className='wa'><a href="https://wa.me/+972547756254" target="_blank"><i className="fa fa-whatsapp fa-2x"></i></a></li>                    
                </ul>
            </div>
            <div className="copyright">
                <p style={{fontSize: "24px"}}>Ayman Wahbani 2025 ©</p>
            </div>
        </footer>
	);
}

export default Footer;