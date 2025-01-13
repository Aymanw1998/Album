import React, {useEffect, useState} from 'react';

import "./Footer.css"
import { useNavigate } from 'react-router-dom';
const Footer = () => {
	return (
        <footer>
            <div className="footer-icons">
                <ul>
                    <li><a href="https://www.linkedin.com/in/nltkaczyk/" target="_blank"><i className="fa fa-linkedin fa-2x"></i></a></li>
                    <li><a href="https://www.instagram.com/n.l.tkaczyk/" target="_blank"><i className="fa fa-instagram fa-2x"></i></a></li>
                    <li><a href="https://www.youtube.com/@n.l.tkaczyk/" target="_blank"><i className="fa fa-youtube fa-2x"></i></a></li>
                </ul>
            </div>
            <div class="copyright">
                <p style={{fontSize: "24px"}}>Ayman Wahbani 2025 ©</p>
            </div>
        </footer>
	);
}

export default Footer;