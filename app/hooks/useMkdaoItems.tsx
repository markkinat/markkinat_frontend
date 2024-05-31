"use client"
import { useEffect, useState } from "react";
import { readOnlyProvider } from "@/utils/constants/providers";
import { getMKDAOContract } from "@/utils/constants/contracts";

const useMkdaoItems = () => {
   const [data, setData] = useState<any[]>([]);


    useEffect(() => {
        (async () => {
            const contract = getMKDAOContract(readOnlyProvider);
            const minted = await contract.tokenIds()
            const mintedNo = Number(minted)
            // console.log("mintedNo", mintedNo+1);
            const lgth = 100 - mintedNo 
            const tokenIDs = [...Array.from({ length: lgth })].map(
                (_, index) => index + mintedNo + 1
            );

            const promises = tokenIDs.map((index) =>
                fetch(`${process.env.NEXT_PUBLIC_token_base_url}/${index}`)
            );
            
            const tokensMetadataResponse = await Promise.all(promises);


            const tokensMetadataJson = [];

            for (let i = 0; i < tokensMetadataResponse.length; i++) {
                const json = await tokensMetadataResponse[i].json();
                tokensMetadataJson.push(json);
            }

            setData(tokensMetadataJson);
        })();
    }, []);

    return data;
}

export default useMkdaoItems