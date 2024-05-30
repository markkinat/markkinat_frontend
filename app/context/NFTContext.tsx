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
  getMarketPlaceContract,
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
  proposal: any;
  currentAccount: string | null;
  isLoadingNFT: boolean;
  metaNFTs: any[] | null;
  myTokenIds: number[] | null;
  fetchNFTs: any;
  preSale: any;
  pause: any;
  checkPause: any;
  presaleStarted: any;
  owner: any;
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

const NFTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {  address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [myTokenIds, setMyTokenIds] = useState<number[]>([]);

  const [metaNFTs, setMetaNFTs] = useState<any[] | null>(null);
  // const [contractGov2, setContractGov2] = useState<ethers.Contract | null>(null);
  const [proposal, setProposal] = useState<{ loading: boolean; data: any[] }>({
    loading: true,
    data: [],
  });

  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isLoadingNFT, setIsLoadingNFT] = useState<boolean>(false);
  const nftCurrency = "ETH";

  // Connect to SmartContract
  const WRITETOSmartContract = async (contractType: any) => {
    try {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = contractType(signer);
      console.log(contract);
      
      return contract;
    } catch (error) {
      console.log(
        `Ran into an error while connecting to Smart Contract ${error}`
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        await multicalls(address);
      }
    };
    fetchData();
  }, [address]);

  // useEffect to fetch NFTs when myTokenIds change
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

  const multicalls = async (account: any) => {
    try {
      const itf = new ethers.Interface(Abi1);
      const itf2 = new ethers.Interface(markinattAbi);

      const contractGov = getDAOContract(readOnlyProvider);
      const contractMKDAO = getMKDAOContract(readOnlyProvider);
      const multicallContract = getMulticallContract(readOnlyProvider);

      // console.log("CONTRACT ", contractGov);

      const data = await contractGov.proposalCount();
      const data2 = await contractMKDAO.tokenIds();

      const _proposalCount = Number(data);
      const tokenCounts = Number(data2);
      // console.log("PROPOSAL COUNT ", _proposalCount);
      // console.log("tokenCounts COUNT ", tokenCounts);

      let calls = [];
      for (let i = 1; i < _proposalCount+1; i++) {
        calls.push({
          target: process.env.NEXT_PUBLIC_DAO_address,
          callData: itf.encodeFunctionData("proposals", [i]),
        });
      }
      // console.log("TOKEN", tokenCounts);
      
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

      let proposalResponse = [];
      let mkdaoResponse = [];
      for (let i = 0; i < _proposalCount; i++) {
        proposalResponse.push(
          itf.decodeFunctionResult("proposals", callResults[i][1])
        );
      }
      // console.log("RESPONSE ", proposalResponse);

      let prop = [];
      for (let i = 0; i < proposalResponse.length; i++) {
        // const obj = proposalResponse[i][0];
        // console.log("OBJJJ ", obj);
        
        
        prop.push({
          proposalId: Number(proposalResponse[i][0]),
          forProposal: Number(proposalResponse[i][4]),
          againstProposal: Number(proposalResponse[i][5]),
          totalabstain: Number(proposalResponse[i][6]),
          deadLine: Number(proposalResponse[i][7]),
          votes: Number(proposalResponse[i][8]),
          executed: proposalResponse[i][9],
          name: proposalResponse[i][1],
          description: proposalResponse[i][2],
          creator: proposalResponse[i][3],
        });
      }
      setProposal({ loading: false, data: prop });
      // console.log("PROPOSALLLLL", prop);
      
      if (tokenCounts > 0) {
        for (let i = _proposalCount; i < callResults.length; i++) {
          mkdaoResponse.push(
            itf2.decodeFunctionResult("ownerOf", callResults[i][1])
          );
        }
        // console.log("mkdaoResponse ", mkdaoResponse);

        const accounts = mkdaoResponse.map((res: any) => res[0]);
        // console.log("ADDRESS ",account);
        const myTokens = accounts
          .map((x, index) => {
            if (address && x === address) {
              return index + 1;
            }
            return -1;
          })
          .filter((index) => index !== -1);

        // console.log("accounts:", myTokens);
        setMyTokenIds(myTokens);
      }
    } catch (error) {
      console.error("Error in multicall:", error);
    }
  };



  // /////////////////////////////
  //////////            //////////
  //////////  NFTssss   ///////////
  //////////           ///////////
  ////////////////////////////////


  const fetchNFTs = async (tokenIDs: number[]) => {
    const promises = tokenIDs.map((index) =>
      fetch(`${process.env.NEXT_PUBLIC_token_base_url}/${index}`)
    );

    const tokensMetadataResponse = await Promise.all(promises);
    const tokensMetadataJson = [];

    for (let i = 0; i < tokensMetadataResponse.length; i++) {
      const json = await tokensMetadataResponse[i].json();
      tokensMetadataJson.push(json);
    }
    setMetaNFTs(tokensMetadataJson);
    return tokensMetadataJson;
  };


  // ONLY OWNER

  const checkPause = async () => {
    const contract = getMKDAOContract(readOnlyProvider)

    const data = await contract._paused();
    // console.log("DATTAAAA ", data);
    
    return data;   
  };
  
  const presaleStarted = async () => {
    const contract = getMKDAOContract(readOnlyProvider)

    const data = await contract.presaleStarted();
    // console.log("DATTAAAA222 ", data);
    
    return data;   
  };

  const owner = async () => {
  const contract = getMKDAOContract(readOnlyProvider)

  const data = await contract.owner();
  console.log("OWNER ", data);
  
  return data;   
  };

  const preSale = async () => {
    const contract = await WRITETOSmartContract(getMKDAOContract)
    const data = await checkPause()
    const data2 = await presaleStarted()
    if (data && data2) {
      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.setPaused(false);
        // console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        // console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("UnPaused!!!");
        }
        toast.error("Not UnPause!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    } else {
      try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.reserveMarkkinat();
        // console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        // console.log("receipt: ", receipt);

        if (receipt.status) {
          const transaction2 = await contract.startPresale();
          // console.log("transaction22: ", transaction2);
          const receipt2 = await transaction2.wait();

          // console.log("receipt22: ", receipt2);
          return toast.success("reserveMarkkinat!!!");
        }
        toast.error("Not reserved!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }
    }
  };
 
  const pause = async () => {
    const contract = await WRITETOSmartContract(getMKDAOContract)

    try {
        if (!isSupportedChain(chainId)) return toast.error("No Wallet Connected or Wrong Network");
        const transaction = await contract.setPaused(true);
        // console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        // console.log("receipt: ", receipt);

      if (receipt.status) {
          return toast.success("Paused!!!");  
        }
        toast.error("Not Pause!");
      } catch (error) {
        console.log("error writing to contract :", error);
      }

  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        proposal,
        currentAccount,
        isLoadingNFT,
        metaNFTs,
        myTokenIds,
        fetchNFTs,
        preSale,
        pause,
        checkPause,
        presaleStarted,
        owner,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export default NFTProvider;
