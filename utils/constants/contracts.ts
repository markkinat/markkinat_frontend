import { ethers } from "ethers";
import Abi from "./DAO.json";
import multicallAbi from "./multicall.json"
import markinattAbi from "./Markkinat.json"
import marketPlaceAbi from "./MarketPlace.json"

export const getDAOContract = (providerOrSigner:any) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_DAO_address || "",
        Abi,
        providerOrSigner
    );

export const getMulticallContract = (providerOrSigner:any) =>
    new ethers.Contract(
         process.env.NEXT_PUBLIC_multicall_address || "",
         multicallAbi,
        providerOrSigner
    );

export const getMKDAOContract = (providerOrSigner:any) =>
    new ethers.Contract(
         process.env.NEXT_PUBLIC_MarkkinatNFT_address || "",
         markinattAbi,
        providerOrSigner
    );

    export const getMarketPlaceContract = (providerOrSigner:any) =>
    new ethers.Contract(
         process.env.NEXT_PUBLIC_MarketPlace_address || "",
         marketPlaceAbi,
        providerOrSigner
    );