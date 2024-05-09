import { getMarketPlaceContract } from "@/utils/constants/contracts";
import { readOnlyProvider } from "@/utils/constants/providers";
import { useEffect, useState } from "react";

export interface Listing {
  assetContract: string;
  tokenId: string;
  quantity: string;
  currency: string;
  price: string;
  startTimestamp: string;
  endTimestamp: string;
  reserved: boolean;
  tokenType: string;
}

const useGetAllListings = () => {
  const [listing, setListing] = useState<Listing[]>([]);
  useEffect(() => {
    async () => {
      try {
        const MarketPlaceContract = getMarketPlaceContract(readOnlyProvider);
        const transaction = await MarketPlaceContract.getAllListings();
        setListing(transaction);
        console.log("transaction: ", listing);
      } catch (error) {
        console.log("error :", error);
      }
    };
  });
  return listing;
};

export default useGetAllListings;