"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import {
  getDAOContract,
  getMKDAOContract,
  getMulticallContract,
} from "@/utils/constants/contracts";
import {
  getProvider,
  isSupportedChain,
  readOnlyProvider,
  wssProvider,
} from "@/utils/constants/providers";
import Abi1 from "@/utils/constants/DAO.json";
import markinattAbi from "@/utils/constants/Markkinat.json";
import { toast } from "react-toastify";

type NFTContextType = {
  nftCurrency: string;
  useVoteOnProposal: any;
  createSale: any;
  fetchMyNFTsOrCreatedNFTs: any;
  createProprosal: any;
  proposal: any;
  currentAccount: string | null;
  isLoadingNFT: boolean;
  metaNFTs: any[] | null;
  myTokenIds: number[] | null;
  fetchNFTs: any
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
  const [myTokenIds, setMyTokenIds] = useState<number[]>([]);

  const [metaNFTs, setMetaNFTs] = useState<any[] | null>(null);
  // const [contractGov2, setContractGov2] = useState<ethers.Contract | null>(null);
  const [proposal, setProposal] = useState<{ loading: boolean; data: any[] }>({
    // Typecasted data to any[]
    loading: true,
    data: [],
  });

  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isLoadingNFT, setIsLoadingNFT] = useState<boolean>(false);
  const nftCurrency = "ETH";

  // console.log("wallet1", walletProvider);

  // Connect to SmartContract
  const WRITETOSmartContract = async (contractType: any) => {
    try {
      const readWriteProvider = getProvider(walletProvider);
      const signer = readWriteProvider.getSigner();
      const contract = contractType(signer);
      return contract;
    } catch (error) {
      console.log(
        `Ran into an error while connecting to Smart Contract ${error}`
      );
    }
  };

useEffect(() => {
  const fetchData = async () => {
    await multicalls(address);
  };
  fetchData();
}, [address]);

useEffect(() => {
  if (myTokenIds && myTokenIds.length > 0) {
    fetchNFTs(myTokenIds);
  }
}, [myTokenIds]);

  
  // //////////////////////////////////////
  //////////                     //////////
  //////////  DAO + Multicalls   ///////////
  //////////                     ///////////
  ///////////////////////////////////////////

  const multicalls = async (account:any) => {
    try {
      const itf = new ethers.Interface(Abi1);
      const itf2 = new ethers.Interface(markinattAbi);

      const contractGov = getDAOContract(readOnlyProvider);
      const contractMKDAO = getMKDAOContract(readOnlyProvider);
      const multicallContract = getMulticallContract(readOnlyProvider);

      // console.log("CONTRACT ", contractGov);

      const data = await contractGov.proposalCount();
      const data2 = await contractMKDAO.tokenIds()

      const _proposalCount = Number(data);
      const tokenCounts = Number(data2)
      // console.log("PROPOSAL COUNT ", _proposalCount);      
      // console.log("tokenCounts COUNT ", tokenCounts);

      let calls = [];
      for (let i = 0; i < _proposalCount; i++) {
        calls.push({
          target: process.env.NEXT_PUBLIC_DAO_address,
          callData: itf.encodeFunctionData("proposals", [i]),
        });
      }
      if (tokenCounts > 0) {
         for (let i = 1; i < tokenCounts; i++) {
        calls.push({
          target: process.env.NEXT_PUBLIC_MarkkinatNFT_address,
          callData: itf2.encodeFunctionData("ownerOf", [i]),
        });
         }
        
      }
     
      const callResults = await multicallContract.tryAggregate.staticCall(
        false,
        calls
      );
      // const response = callResults.map((res: any) =>
      //   itf.decodeFunctionResult("proposals", res[1])
      // );

      let proposalResponse = []
      let mkdaoResponse = [];
      for (let i = 0; i < _proposalCount; i++) {
        proposalResponse.push(itf.decodeFunctionResult("proposals", callResults[i][1]))

      }
      // console.log("RESPONSE ", proposalResponse);


      let prop = [];
      for (let i = 0; i < proposalResponse.length; i++) {
        const obj = proposalResponse[i][0];
        prop.push({
          proposalId: Number(obj.proposalId),
          forProposal: Number(obj.forProposal),
          againstProposal: Number(obj.againstProposal),
          totalabstainProposalStaked: Number(obj.abstainProposal),
          deadLine: Number(obj.deadLine),
          votes: Number(obj.votes),
          executed: obj.executed,
          name: obj.name,
          description: obj.description,
          creator: obj.creator,
        });
      }
      setProposal({ loading: false, data: prop });


      if (tokenCounts > 0) {
        for (let i = _proposalCount; i < callResults.length; i++) {
        mkdaoResponse.push(itf2.decodeFunctionResult("ownerOf", callResults[i][1]))
        }
        // console.log("mkdaoResponse ", mkdaoResponse);
          

        const accounts = mkdaoResponse.map((res: any) =>res[0])    
        // console.log("ADDRESS ",account);
        const myTokens = accounts.map((x, index) => {
        if (address && x === address) {
          return index+1;
        }
        return -1; 
      }).filter(index => index !== -1); 

        console.log("accounts:", myTokens);
        setMyTokenIds(myTokens);
            
    }


    } catch (error) {
      console.error("Error in multicall:", error);
    }
  };

  // address intiator,
//         uint256 proposalId,
//         MarkkinatLibrary.VoterDecision decision,
//         uint256 _tokenId
  const useVoteOnProposal = (proposalId:any,decision:any,tokenId:any) => {
    return useCallback(async () => {
      try {
        const contractGov = getDAOContract(readOnlyProvider);
        const transaction = await contractGov.voteOnProposal(address,proposalId,decision,tokenId);
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Voted Successfully!");
        }
        toast.error("Vote Process Failed!");
      } catch (error) {
        console.log("error :", error);
      }
    }, [decision, proposalId, tokenId]);
  };

  const createProprosal = async (name: string, deadline: any, desc: string) => {
    try {
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");
      const contractGov = await WRITETOSmartContract(getDAOContract);
      const transaction = await contractGov.createProposal(
        name,
        deadline,
        desc
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
  };



  // /////////////////////////////
  //////////            //////////
  //////////  NFTssss   ///////////
  //////////           ///////////
  ////////////////////////////////

  const createSale = () => {
    // Add your create sale logic here
  };

  const fetchNFTs = async (tokenIDs:any[]) => {
    const promises = tokenIDs.map((index) =>
        fetch(`${process.env.NEXT_PUBLIC_token_base_url}/${index}`)
    );
    
    const tokensMetadataResponse = await Promise.all(promises);

    console.log("tokensMetadataResponse", tokensMetadataResponse);
    
    const tokensMetadataJson = [];

    for (let i = 0; i < tokensMetadataResponse.length; i++) {
        const json = await tokensMetadataResponse[i].json();
        tokensMetadataJson.push(json);
    }

    setMetaNFTs(tokensMetadataJson);

  };

  const fetchMyNFTsOrCreatedNFTs = () => {
    // Add your fetch my NFTs or created NFTs logic here
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        createSale,
        fetchMyNFTsOrCreatedNFTs,
        createProprosal,
        proposal,
        currentAccount,
        isLoadingNFT,
        metaNFTs,
        myTokenIds,
        fetchNFTs,
        useVoteOnProposal
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export default NFTProvider;
