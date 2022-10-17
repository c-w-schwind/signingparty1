import {
    createClient,
    configureChains,
    chain,

} from 'wagmi';

import {publicProvider} from 'wagmi/providers/public';

import {MetaMaskConnector} from 'wagmi/connectors/metaMask';


const {chains, provider, webSocketProvider} = configureChains(
    [chain.hardhat, chain.localhost, chain.mainnet],
    [publicProvider()],
);

export const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({chains})],
    provider,
    webSocketProvider,
});