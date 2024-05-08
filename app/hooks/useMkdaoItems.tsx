"use client"
import { useEffect, useState } from "react";

const useMkdaoItems = () => {
   const [data, setData] = useState<any[]>([]);


    useEffect(() => {
        (async () => {
            const tokenIDs = [...Array.from({ length: 80 })].map(
                (_, index) => index+21
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