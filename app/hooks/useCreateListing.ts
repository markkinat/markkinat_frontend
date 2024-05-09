import { getMarketPlaceContract, getNFTContract } from '@/utils/constants/contracts';
import { getProvider, isSupportedChain } from '@/utils/constants/providers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { JsonRpcSigner } from 'ethers';
import React, { useCallback } from 'react'
import { toast } from 'react-toastify';


const useCreateListing = () => {
 const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();

  return useCallback(async (
    assetContract: string, 
    tokenId: string,
    quantity: number, 
    currency: string, 
    price: number, 
    startTimestamp: number,
    endTimestamp: number, 
    reserved: boolean,
    tokenType: number,
  ) => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const listingParameters ={
        assetContract, 
          tokenId,
          quantity, 
          currency, 
          price, 
          startTimestamp,
          endTimestamp, 
          reserved,
          tokenType
      }
     

      const contract = getMarketPlaceContract(signer);

      const NFTAssetAddress = getNFTContract(assetContract, signer);

      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        console.log("transaction in progress");
        await NFTAssetAddress.approve(process.env.NEXT_PUBLIC_MarketPlace_address, tokenId);
        const transaction = await contract.createListing(listingParameters);
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Listing Created!");
        }
        toast.error("Failed!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    }, [chainId, walletProvider]);
}

export default useCreateListing
