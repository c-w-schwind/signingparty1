import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "KEY";
const GOERLI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";
const MUMBAI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [MUMBAI_PRIVATE_KEY]
        }
    }
};

export default config;

