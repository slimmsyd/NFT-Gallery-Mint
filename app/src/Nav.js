import './App.css';
import {  Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { providers} from 'ethers';
import Web3Modal from 'web3modal';


export default function Nav({accountAddress} ) { 
//setState for ScrollDown 



  


    return (

        <nav className = "nav">
            <ul className = "navUl">
                <li>
                <Link className = "link" to = "/">Home</Link>
                </li>
                {/* <li>
                <Link className = "link" to = "/about">About Artist</Link>
                </li> */}
                <li>
                <Link  className = "link" to = "/gallery">Art Gallery</Link>
                </li>
                <li>
                <a 
              
                >Contact</a>
                </li>
                <li>
                </li>
            </ul>
            <div className = "btnAddress ">
             {accountAddress}
        </div>
        </nav>


    )




}