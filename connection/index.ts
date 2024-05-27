"use client"
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// export const SUPPORTED_CHAIN = 11155111;
export const SUPPORTED_CHAIN = 31337;


// const sepolia = {
//     chainId: SUPPORTED_CHAIN,
//     name: "Sepolia",
//     currency: "ETH",
//     explorerUrl: "https://sepolia.etherscan.io",
//     rpcUrl: process.env.NEXT_PUBLIC_rpc_url || "",
// };

const local = {
    chainId: SUPPORTED_CHAIN,
    name: "local",
    currency: "OKSTE",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: process.env.NEXT_PUBLIC_rpc_url || "",
};

const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [local],
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
        enableAnalytics: false, // Optional - defaults to your Cloud configuration
    });
