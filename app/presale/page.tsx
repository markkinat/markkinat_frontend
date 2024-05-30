"use client"

import React, { useEffect, useState } from 'react'
import { useNFTContext } from '../context/NFTContext';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const Home = () => {
    const { preSale, pause, checkPause, presaleStarted, owner } = useNFTContext();
    const { address, chainId } = useWeb3ModalAccount();

    const [boool, setBoool] = useState();
    const [css, setCss] = useState<any | null>();
    const [boool2, setBoool2] = useState();
    const [account, setAccount] = useState<any | null>();



    const handlePause = async () => {
        await pause();
        setCss("swap-off");
    }

    const handlePresale = async () => {
        await preSale();
        setCss("swap-on");
    }

    useEffect(() => {
        (async () => {
            const acct = await owner()
            setAccount(acct)
            const bol2 = await presaleStarted();
            const bol = await checkPause();
            setBoool2(bol2)
            setBoool(bol);
        })();
    }, [checkPause, owner, presaleStarted, address, chainId]);

   
    
    useEffect(() => {
        if (css === "swap-off") {
            (async () => {
                const bol2 = await presaleStarted();
                const bol = await checkPause();
                setBoool2(bol2)
                setBoool(bol);
            })();
        }
         
    }, [checkPause, css, presaleStarted]);

    useEffect(() => {
        if (css === "swap-on") {
            (async () => {
                const bol2 = await presaleStarted();
                const bol = await checkPause();
                setBoool2(bol2)
                setBoool(bol);
            })();
        }
    }, [checkPause, css, presaleStarted]);


    return (
        <div className='min-h-screen flexCenter'>
            <label className="swap swap-flip text-9xl">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {!boool && boool2 ? (
                    <div className={`${css} cursor-pointer text-center`}  onClick={account === address ? handlePause : ()=>{}}>
                <button>
                    😇
                </button>
                {account !== address ? <div className='text-4xl'>PreSale Ended</div> : <div className='text-4xl'>Pause Contract</div>}
                </div>
                ) : (
                    <div className="cursor-pointer text-center"  onClick={account === address ? handlePresale : ()=>{}}>
                        <button>
                              😈 
                        </button>
                        {account !== address ? <div className='text-4xl'>Come back lATER</div>: <div className='text-4xl'>Set Presale or UnPause</div>}
                    </div>
                )}
            </label>
        </div>
    );
}

export default Home;
