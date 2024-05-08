import { getMarketPlaceContract } from "@/utils/constants/contracts";
import { readOnlyProvider } from "@/utils/constants/providers";
import { useState } from "react";

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

const useGetListings = async (id: number) => {
  const [listing, setListing] = useState<Listing>();
  try {
    const MarketPlaceContract = getMarketPlaceContract(readOnlyProvider);
    const transaction = await MarketPlaceContract.getListing(id);
    setListing(transaction);
    console.log("transaction: ", listing);
  } catch (error) {
    console.log("error :", error);
  }
};

export default useGetListings;
