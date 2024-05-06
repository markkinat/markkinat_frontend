import { ethers } from "ethers";
import Abi from "./DAO.json";
import multicallAbi from "./multicall.json"

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
