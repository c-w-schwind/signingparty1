import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY:string | undefined = process.env.ALCHEMY_API_KEY;
const ALCHEMY_GOERLI_API_KEY:string | undefined = process.env.ALCHEMY_GOERLI_API_KEY;
const POLYGON_PRIVATE_KEY:string | undefined  = process.env.POLYGON_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY:string | undefined  = process.env.GOERLI_PRIVATE_KEY;

if(!ALCHEMY_API_KEY || !POLYGON_PRIVATE_KEY || !GOERLI_PRIVATE_KEY || !ALCHEMY_GOERLI_API_KEY) {
    throw new Error("Please set your ALCHEMY_API_KEY and POLYGON_PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        hardhat: {
            chainId: 1337
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [POLYGON_PRIVATE_KEY]
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    },
};

export default config;