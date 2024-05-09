import { getDAOContract } from '@/utils/constants/contracts';
import { getProvider, isSupportedChain } from '@/utils/constants/providers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers } from 'ethers';
import React, { useCallback } from 'react'
import { toast } from 'react-toastify';


const useVoteOnProposal = (proposalId: any, decision: any, tokenId: any) => {
 const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();

  return useCallback(async () => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
     

      const contract = getDAOContract(signer);

      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.voteOnProposal(
          address,
          proposalId,
          decision,
          tokenId
        );
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

         if (receipt.status) {
          return toast.success("Voted Successfully!");
        }
        toast.error("Vote Process Failed!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    }, [address, chainId, decision, proposalId, tokenId, walletProvider]);
}

export default useVoteOnProposal