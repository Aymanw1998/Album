import React, {useEffect, useState} from 'react';

import "./Footer.css"
import { useNavigate } from 'react-router-dom';
const Footer = () => {
	return (
        <footer>
            <div className="copyright">
                <p style={{fontSize: "24px"}}>Ayman Wahbani 2025 ©</p>
            </div>
        </footer>
	);
}

export default Footer;