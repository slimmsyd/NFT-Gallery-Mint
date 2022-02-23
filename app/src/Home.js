import React, {useState, useEffect} from 'react';
import {ethers, Contract, utils} from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import LandingPageImage from   './Images/LandingPageImage.png'
import ChildishArt from './Images/Childish_Two_Worlds.png'
import WorldTree from './Images/TreeOfLife.png'
import Trophy from './Images/TrophyHead.jpg';
import Arrow from './Images/Arrow.png';
import Twitter from './Images/TwitterIcon.png';
import Instagram from './Images/InstagramIcon.png';
import TikTok from './Images/TikTok.png'
import {  Link, Router } from 'react-router-dom';
import ScrollMagic from 'scrollmagic';
import { Controller, Scene } from "react-scrollmagic";


//web3 IMPORTS
import { abi, NFT_CONTRACT_ADDRESS_LOVELY_BONES, abi_2, abi_3} from "./constants";
import Nav from './Nav';
import Footer from './Footer';


export default function Home() { 
    const [isConnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [accountAddress, setAccountAddress] = useState('')
    const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
    const [loading, setLoading] = useState(false); 
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          setHasMetamask(true);
          connect();
        }
      });

      async function getProviderOrSigner(needSigner = false) { 
        await window.ethereum.request({method: "eth_requestAccounts"});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const address = await signer.getAddress(); 

        console.log(address);

        
        //Probably make this a function? 
        let result_1 = address.substring(0,5)
        let result_End = address.substring(38, 42)
        //Just concat these two strings together
        let subStringAddress = result_1 + "..." + result_End;
        console.log(subStringAddress)
        setAccountAddress(subStringAddress)

        //If user not connected to rinkeyby network, let them know

        const {chainId} = await provider.getNetwork();
        if(chainId !== 4) { 
            window.alert("Change Network To Rinkeby"); 
            throw new Error("Change Network To Rinkeby");
        }


        if(needSigner) { 
            const signer = provider.getSigner();
            return signer
        }

      }


      async function connect() { 
        try {
            //Ger provider from ethers
            await getProviderOrSigner();
            setIsConnected(true);
            console.log(isConnected)

        }catch(err){
            console.error(err)
        }

      }

    //Now we Call The Smart Contract Functions To Get The Party Started 

  const publicMint = async() => { 

    try  { 
      //We Need a Signer here since this is a 'write' transaction
    const signer = await getProviderOrSigner(true);
    //create a new Instance of the contract, which allows update methods
    const whitelistContract = new Contract(
      NFT_CONTRACT_ADDRESS_LOVELY_BONES,
      abi ,
      signer
    );

    //call the mint from the contract to mint
    const tx = await whitelistContract.mint({
      //value signifies the cost of one crypto dev which is "0.01" eth.
      //we are parsing the "0.01" string to ether using the utilis library from ethers.js
      value: utils.parseEther("0.01"), 
    });
    setLoading(true);
    //wait for transaction to get mined
    await tx.wait(); 
    setLoading(false);
    window.alert("You successfully minted A Childish NFT! WOOH "); 


    }catch(err) { 
      console.error(err)
    }
    

  }
   //getTokenIdsMinted: gets the number of tokenIds that have been minted
   const getTokenIdsMinted = async() => { 
    try { 
      //Get the provider from web3modal
      //No need for signer, just reading from contract
      const provider = await getProviderOrSigner();
      //We connect to the contract usign a Provider
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS_LOVELY_BONES, abi, provider);
      //call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a "Big Number". We Need to conver the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
      console.log(tokenIdsMinted)
    }catch(err) { 
      console.error(err)
    }
  }
    //getOwner: calls the contract to retrieve the owner
  const getOwner = async() =>{ 

    try { 
      //Get the provider from web3modal, which in our case is MetaMask
      //No need for the signer here, as we are only reading state 
      const provider = await getProviderOrSigner();
      //We connect to the contract using a provider, so we will only
      //have read-only access to the contract
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS_LOVELY_BONES, abi, provider);
      //call the owner function from the contract 
      const _owner = await nftContract.owner();
      //Get signer now to extract teh address of the current connected metamask account
      const signer = await getProviderOrSigner(true);
      //Get the address associate to the signer which is connected To Metamask
      const address = await signer.getAddress();
      if(address.toLowerCase() === _owner.toLowerCase()) { 
        setIsOwner(true)
      }

    }catch(err) { 
      console.error(err)
    }


    
  
  

  }

  const soldOut = () => { 
    return ( 
      <button className = "mintNow" 
      onClick={getTokenIdsMinted}
      onMouseLeave = {buttonOnExit}
      onMouseEnter = {buttonOnHover}>SOLD OUT!!</button>
    )
  
  
  }
let buttonOnHover = () => { 
    //When Hovering Over Button Give Motion to Arrow
    const arrow = document.querySelector(".Arrow")
    //On hover Translate Arrow Left
      arrow.style.transform = "translateX(-50px)" 
  }
  let buttonOnExit = () => { 
    //I hate to duplicate a constant but It was working for me
    const arrow = document.querySelector(".Arrow")
    //Once exited the element place it back 
    arrow.style.transform = "translateX(50px)"
  
  
  }

        return(

      <div>

          <Nav
          accountAddress = {accountAddress}
          
          />
      
      
      <Controller>  
        <section className = "main">
      
      <br />
      <Scene
        duration={1200}
        pin = {{pushFollowers: false}}
        triggerHook={0.5}
        offset={700}


      >

      <div className = "mainLandingPage">
        <div className = "landingPageImage">
        <img src = {LandingPageImage}></img>
        </div>

        <div className ="landingPageContents">
              <h1  >Mint Childish <span>NFT</span></h1>
              <p>Mint new exclusive 1/1 NFTs stored in ethereum network. Mint it today and gain your own digital asset. </p>
              <div className = "mint">
              { tokenIdsMinted === "1"? soldOut() : (
                        <button className = "mintNow" 
                        onClick={publicMint}
                        onMouseLeave = {buttonOnExit}
                        onMouseEnter = {buttonOnHover}>Mint Now!</button>
                      )}
                
                  <span className = "arrow">
                    <img className = "Arrow" src =  {Arrow} ></img>
                    </span>
              </div>
          </div>
      </div>
      </Scene>

      </section>
    
     

      <section className = "colorBridge">
          <div className = "sectionSeperateColorOne"></div>
          <div className = "sectionSeperateColorTwo"></div>
      </section>


      <section className = "section_Two">
    
          
        <div className = "section_Two_Div">
          <img src = {ChildishArt}></img>
        </div>

      </section>

      <section className = "section_Three">
        <Scene
         duration={1200}
         pin = {{pushFollowers: true}}
         triggerHook={1}
         offset={1000}
        
        >
        <div className = "whoIs_Div">
          <div className = "whoIs_Contents">
            <img src = {Trophy} />
              <h1>Who Is Childish </h1>
              <h1>He's A Dreamer</h1>
              <div className = "whoIs_links">
              <button className = "mintNow" href ="#"> <a href = "#">About Artist</a> </button>
              <button className = "mintNow" href ="#"> <a href = "#">Art Gallery</a> </button>
              </div>
            
          </div>

        </div>
        </Scene>
      </section>
      </Controller>
    
 


    <section className = "sectionFour">
        <div className = "worldTree">
            <img src = {WorldTree}></img>
        </div>
    </section>

<Footer />

</div>

        )



      }



