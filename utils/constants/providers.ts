import { ethers } from "ethers";
import { SUPPORTED_CHAIN } from "@/connection/index"

// read only provider pointing to sepolia. It allows read only access to the sepolia blockchain
export const readOnlyProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_rpc_url
);

export const wssProvider = new ethers.WebSocketProvider(
    process.env.NEXT_PUBLIC_wss_rpc_url || ""
);

// read/write provider, that allows you to read data and also sign transaction on whatever chain it's pointing to
export const getProvider = (provider:any) => new ethers.BrowserProvider(provider);

export const isSupportedChain = (chainId:any) =>
    Number(chainId) === SUPPORTED_CHAIN;