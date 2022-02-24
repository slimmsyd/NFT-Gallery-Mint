export default function handler(req, res) { 
    //get tokenId from the query params
    const tokenId = req.query.tokenId;
    //As all the images are uploaded on github, we can extract the images from github directly.
    const image_url = "https://github.com/slimmsyd/NFT-Gallery-Mint/tree/main/app/src/Image ";
     //The api is sending back metadata for a nft 
     //To make our collectoin compatiable with Opensea, we need to follow soem metadata standars
     //when sending back the response from teh api
     
     
    res.status(200).json({
        name: "Apollo NFT" + tokenId,
        description: "Apollo is a key of Family DAO",
        image: image_url + tokenId + ".png",
    });
    

}