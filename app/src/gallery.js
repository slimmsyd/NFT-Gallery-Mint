import Nav from './Nav';
import './App.css';
import PoeticJustice from './Images/PoeticJustice.png';
import WorldTree from './Images/TreeOfLife.png';
import LovelyBones from './Images/LovelyBones.png';
import ChildishTwoWorlds from './Images/Childish_Two_Worlds.png';
import { useRef, useEffect,useState } from 'react';
import {gsap, Power4} from 'gsap';
import Footer from './Footer';
import Trophy from './Images/Trophy-Head.png';
import ScrollMagic from 'scrollmagic';
import { Controller, Scene } from "react-scrollmagic";


import { abi,abi_2,abi_3, NFT_CONTRACT_ADDRESS_WORLD_TREE, NFT_CONTRACT_ADDRESS_POETIC_JUSTICE, NFT_CONTRACT_ADDRESS_LOVELY_BONES } from "./constants";
import { Contract, providers, utils, ethers } from "ethers";



export default function Gallery() {
const [tranistionDiv, setTransitionDiv] = useState(false); 

//Create All Our Contract Instuctions 
const [loading, setLoading] = useState(false);
const [isOwner, setIsOwner] = useState(false); 
const [accountAddress, setAccountAddress] = useState('');
const [isConnected, setIsConnected] = useState(false);

//Call Multiple Indivual Functions(AS OF NOW); -> Don't feel like doing if and statement logic


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

  const connect = async() => {
    try { 
        await getProviderOrSigner();
        setIsConnected(true);
        console.log(`${isConnected} you are connected`)
    }catch(e) {
        console.error(e)
    }

  }


const lovelyBonesMint = async() => { 
    try { 
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(
            NFT_CONTRACT_ADDRESS_LOVELY_BONES,
            abi,
            signer,
        );

        //Call The Mint Function
        const tx = await contract.mint({
            value: utils.parseEther("0.01"),
        });
        setLoading(true);
        //wait for transaction to get mined
        await tx.wait();
        setLoading(false);
        window.alert("You minted This NFT!")

    }catch(err) {
        console.error(err)
    }
    
};
const worldTreeMint = async() => { 
    try { 
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(
            NFT_CONTRACT_ADDRESS_WORLD_TREE,
            abi_3,
            signer,
        );

        //Call The Mint Function
        const tx = await contract.mint({
            value: utils.parseEther("0.01"),
        });
        setLoading(true);
        //wait for transaction to get mined
        await tx.wait();
        setLoading(false);
        window.alert("You minted This NFT!")

    }catch(err) {
        console.error(err)
    }
    
};
const poeticJusticeMint = async() => { 
    try { 
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(
            NFT_CONTRACT_ADDRESS_POETIC_JUSTICE,
            abi_2,
            signer,
        );

        //Call The Mint Function
        const tx = await contract.mint({
            value: utils.parseEther("0.01"),
        });
        setLoading(true);
        //wait for transaction to get mined
        await tx.wait();
        setLoading(false);
        window.alert("You minted This NFT!")

    }catch(err) {
        console.error(err)
    }
    
};


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


useEffect(()=> {
    connect()

})


const onMouseOver = () => { 
    setTransitionDiv(true);
}
const onMouseExit = () => { 
    setTransitionDiv(false)

}



return (
    <div>
        <Nav
        accountAddress={accountAddress}
           
        />
    {/* <section className='wrapper section-One'>
        <div   className  = "childishImage">
            <img src = {Trophy} />
        </div>
    </section> */}

    <section className = "wrapper wrapper-Description">
        <h2>Join The NFT Experience.</h2>
    </section>

  

 
    <section className = "wrapper section-two">
       <div className = "mint-Wrapper">
           <div className = "mint-Image">
           <div className = "title">
                   <h1>Poetic Justice</h1>
               </div>
                <img  src = {PoeticJustice}
               />
           </div>
           <div className = "mint-Button">
                <h2>Poetic Justice</h2>
                <button 
                onClick={poeticJusticeMint}
                
                className = "mintNow bigger">Mint</button>
           </div>
       </div>
       
    </section>
 
    <section  className = "wrapper section-three fadeIn">
    <div className = "mint-Wrapper">
           <div  className = "mint-Image">
               <div className ="title">
                   <h1>LovelyBones</h1>
               </div>
                <img  
                src = {LovelyBones} />
           </div>
           <div className = "mint-Button">
                <h2>LovelyBones</h2>
                <button 
                onClick={lovelyBonesMint}
                
                className = "mintNow bigger">Mint</button>
           </div>
       </div>
       
    </section>

    <section  className = "wrapper section-three fadeIn">
    <div className = "mint-Wrapper">
           <div className = "mint-Image">
           <div className ="title">
                   <h1>Tree Of Life</h1>
               </div>
                <img 
                 src = {WorldTree} />
           </div>
           <div className = "mint-Button">
                <h2>World Tree</h2>
                <button 
                onClick={worldTreeMint}
                
                className = "mintNow bigger">Mint</button>
           </div>
       </div>
       
    </section>

    

 <Footer />
               




</div>

)


}