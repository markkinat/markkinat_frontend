import { getMKDAOContract } from '@/utils/constants/contracts';
import { getProvider, isSupportedChain } from '@/utils/constants/providers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { toast } from 'react-toastify';

const useMints = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();
  const router = useRouter()

  return useCallback(async () => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const amount = ethers.parseEther("0.01")
      console.log(amount);

      const contract = getMKDAOContract(signer);

      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.mint({
          value: amount
        });
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          toast.success("Minted Successfully!");
          return  router.push("/")
        }
        toast.error("Minting failed!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    }, [chainId, router, walletProvider]);
}

export default useMints