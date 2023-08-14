const ethers = require('ethers');
const { erc20ABI,
    factoryABI,
    pairABI,
    routerABI} = require("./AbiList");

const {
    addressFactory, 
    addressRouter,
    addressFrom,
    addressTo} = require("./AddressList")

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.bnbchain.org")

// Connect to Factory 
const contractFactory = new ethers.Contract(addressFactory, factoryABI, provider);


// Get the Blockchain 
const getPrices = async(amountInHuman) =>{
    
    // Convert amount from Human readable 
    const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider)
    const decimals = await contractToken.decimals()
    console.log("Amount In", amountInHuman)
    const amountIn = ethers.parseUnits(amountInHuman, decimals)
        
    // Connet to Router
    const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

    // Get amount out 
    const amountsOut = await contractRouter.getAmountsOut(
        amountIn, [addressFrom, addressTo]
    );
    

    // convert amount out - decimals
    const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider)
    const decimals2 = await contractToken2.decimals();
    const amountOutHuman = ethers.formatUnits(amountsOut[1].toString(), decimals2)
    console.log("Amount Out", amountOutHuman)
}
const amountInHuman = "500"
getPrices(amountInHuman);

