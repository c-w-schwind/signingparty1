#!/usr/bin/env node
const { ethers } = require("ethers");

const ALCHEMY_API_KEY = "bmQJ0oOqwjXsuso1IwQ_vPqMq36gC1w3";
const POLYGON_PRIVATE_KEY = ""; //TODO: Admin private key
const TOKEN_CONTRACT_ADDRESS = "0x85f2cf59acd3ae2f83c4886b9d969dd71e1d8620";
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function mintSBT(targetAddress) {
    try {
        const provider = new ethers.AlchemyProvider("matic", ALCHEMY_API_KEY);
        const signer = new ethers.Wallet(POLYGON_PRIVATE_KEY, provider);

        const signingPartyTokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, signer)

        const tx = await signingPartyTokenContract.safeMint(targetAddress, { gasLimit: 500000 });
        console.log("Transaction hash:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);

    } catch (error) {
        console.error("Error:", error);
    }
}

const targetAddress = process.argv[2];
mintSBT(targetAddress);
