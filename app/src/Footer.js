import Twitter from './Images/TwitterIcon.png';
import Instagram from './Images/InstagramIcon.png';
import TikTok from './Images/TikTok.png'
import React from 'react';
import {  Link } from 'react-router-dom';



export default function Footer() { 

    return ( 

        <footer>
        <div className = "footerBackGround">
            <div className = "footerDetails">
              <div className = "footerContactUs">
                 <h2>Childish Dreams</h2>
                 <Link className = "contactUs" to ="/contact">Contact US</Link>
                  </div>
            </div>
            <div className = "footerLinks">
                     <h2><span id ="socials_Color">Socials</span></h2>
                      <ul className = "footer_Links">
                          <img src = {Twitter}></img>
                          <img src = {TikTok}></img>
                          <img src = {Instagram}></img>
                         
                      </ul>
                      </div> 
        </div>
     </footer>


    )


}