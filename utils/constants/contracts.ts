import { ethers } from "ethers";
import Abi from "./DAO.json";

export const getDAOContract = (providerOrSigner:any) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_DAO_address || "",
        Abi,
        providerOrSigner
    );
