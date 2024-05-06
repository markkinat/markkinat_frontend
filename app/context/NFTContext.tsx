"use client"
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { getDAOContract, getMulticallContract } from '@/utils/constants/contracts';
import { getProvider, isSupportedChain, readOnlyProvider, wssProvider } from '@/utils/constants/providers';
import Abi1 from "@/utils/constants/DAO.json";
import { toast } from "react-toastify"

type NFTContextType = {
    nftCurrency: string; 
    useVoteOnProposal: any; 
    createSale: any; 
    fetchNFTs: any; 
    fetchMyNFTsOrCreatedNFTs: any; 
    useGetProposals: any; 
    currentAccount: string | null; 
    isLoadingNFT: boolean; 
    createProprosal: any;
};

// Create the context
const NFTContext = createContext<NFTContextType | undefined>(undefined);

// Custom hook to use the context
export const useNFTContext = () => {
    const context = useContext(NFTContext);
    if (!context) {
        throw new Error("useNFTContext must be used within a NFTProvider");
    }
    return context;
};

// Provider component
const NFTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { chainId, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [contractGov1, setContractGov1] = useState<ethers.Contract | null>(null); 
    const [contractGov2, setContractGov2] = useState<ethers.Contract | null>(null); 
    const [multicallContract, setMulticallContract] = useState<ethers.Contract | null>(null); 
    const [proposal, setProposal] = useState<{ loading: boolean; data: any[] }>({ // Typecasted data to any[]
        loading: true,
        data: [],
    });

    const [currentAccount, setCurrentAccount] = useState<string | null>(null); 
    const [isLoadingNFT, setIsLoadingNFT] = useState<boolean>(false); 
    const nftCurrency = 'ETH';


    useEffect(() => {
        if (walletProvider) {
            const readWriteProvider = getProvider(walletProvider);
            const signer = readWriteProvider.getSigner();
            setContractGov1(getDAOContract(signer));
            setContractGov2(getDAOContract(readOnlyProvider));
            setMulticallContract(getMulticallContract(readOnlyProvider));
        } else {
            console.error("No wallet provider or unsupported chain");
        }
    }, [walletProvider]);

    const useGetProposals =() => {
        useEffect(() => {
        (async () => {
        if (!contractGov2 || !multicallContract || !address) return;
        
        const itf = new ethers.Interface(Abi1);
        const data = await contractGov2.proposalCount();
        const _proposalCount = Number(data.toString());

        let calls = [];
        for (let i = 0; i < _proposalCount; i++) {
            calls.push({
                target: process.env.NEXT_PUBLIC_DAO_address,
                callData: itf.encodeFunctionData("proposals", [i]),
            });
        }

        const callResults = await multicallContract.tryAggregate.staticCall(false, calls);
        const response = callResults.map((res: any) => (itf.decodeFunctionResult("proposals", res[1])));
        let prop = [];
        for (let i = 0; i < response.length; i++) {
            const obj = response[i][0];
            prop.push({
                proposalId: Number(obj.proposalId.toString()),
                forProposal: Number(obj.forProposal.toString()),
                againstProposal: Number(obj.againstProposal.toString()),
                totalabstainProposalStaked: Number(obj.abstainProposal.toString()),
                deadLine: Number(obj.deadLine.toString()),
                votes: Number(obj.votes.toString()),
                executed: obj.executed,
                name: obj.name,
                description: obj.description,
                creator: obj.creator,
            });
        }
            setProposal({ loading: false, data: prop });
        })()
             }, [])
        return proposal;
        
    };


    const useVoteOnProposal = () => {
        return useCallback(async () => {
            if (!contractGov1 || !address) return;
            try {
                const transaction = await contractGov1.voteOnProposal();
                console.log("transaction: ", transaction);
                const receipt = await transaction.wait();

                console.log("receipt: ", receipt);

                if (receipt.status) {
                    return toast.success("Voted Successfully!");
                } toast.error("Vote Process Failed!");
            } catch (error) {
                console.log("error :", error);
            
            }
        },[])
    };

    const createProprosal = async(name:string, deadline:any, desc:string) => {
        if (!contractGov1 || !address) return;

       try {
                const transaction = await contractGov1.createProposal(name, deadline, desc);
                console.log("transaction: ", transaction);
                const receipt = await transaction.wait();

                console.log("receipt: ", receipt);

                if (receipt.status) {
                    return toast.success("Voted Successfully!");
                } toast.error("Vote Process Failed!");
            } catch (error) {
                console.log("error :", error);
            
            } 
        
    };

    const createSale = () => {
        // Add your create sale logic here
    };

    const fetchNFTs = () => {
        // Add your fetch NFTs logic here
    };

    const fetchMyNFTsOrCreatedNFTs = () => {
        // Add your fetch my NFTs or created NFTs logic here
    };

    return (
        <NFTContext.Provider value={{ nftCurrency,createProprosal, useVoteOnProposal, createSale, fetchNFTs, fetchMyNFTsOrCreatedNFTs, useGetProposals, currentAccount, isLoadingNFT }}>
            {children}
        </NFTContext.Provider>
    );
};

export default NFTProvider;
