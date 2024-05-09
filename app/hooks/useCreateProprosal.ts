import { getDAOContract } from '@/utils/constants/contracts';
import { getProvider, isSupportedChain } from '@/utils/constants/providers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers } from 'ethers';
import React, { useCallback } from 'react'
import { toast } from 'react-toastify';


const useCreateProprosal = () => {
 const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();

  return useCallback(async (name: string, deadline: any, desc: string) => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
     

      const contract = getDAOContract(signer);

      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.createProposal(
          name,
          deadline,
          desc
        );
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Proposal Created!");
        }
        toast.error("Failed!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    }, [chainId, walletProvider]);
}

export default useCreateProprosal