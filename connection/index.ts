"use client"
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 4202;
// export const SUPPORTED_CHAIN = 31337;


const LiskSepolia = {
    chainId: SUPPORTED_CHAIN,
    name: "Lisk Sepolia Testnet",
    currency: "ETH",
    explorerUrl: "https://sepolia-blockscout.lisk.com",
    rpcUrl: process.env.NEXT_PUBLIC_rpc_url || "",
};

// const local = {
//     chainId: SUPPORTED_CHAIN,
//     name: "local",
//     currency: "OKSTE",
//     explorerUrl: "https://sepolia.etherscan.io",
//     rpcUrl: process.env.NEXT_PUBLIC_rpc_url || "",
// };

const metadata = {
    name: "Markkinat",
    description: "A decentralized application that combines an NFT marketplace with on-chain voting capabilities, empowering community-driven governance and economic activity through blockchain technology",
    url: "https://markkinat-frontend.vercel.app", 
    icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [LiskSepolia],
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
        enableAnalytics: false, 
    });
