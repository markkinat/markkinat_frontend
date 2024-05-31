"use client"

import React, { useEffect, useState } from 'react'
import { useNFTContext } from '../context/NFTContext';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const Home = () => {
    const { preSale, pause, checkPause, presaleStarted, owner } = useNFTContext();
    const { address, chainId } = useWeb3ModalAccount();

    // Initialize state variables
    const [boool, setBoool] = useState(false);
    const [css, setCss] = useState<any>(null);
    const [boool2, setBoool2] = useState(false);
    const [account, setAccount] = useState(null);

    const handlePause = async () => {
        await pause();
        setCss("swap-off");
    }

    const handlePresale = async () => {
        await preSale();
        setCss("swap-on");
    }

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            const acct = await owner();
            setAccount(acct);
            const bol2 = await presaleStarted();
            const bol = await checkPause();
            setBoool2(bol2);
            setBoool(bol);
        };
        fetchData();
    }, [checkPause, owner, presaleStarted, address, chainId]);

    // Update state based on css changes
    useEffect(() => {
        if (css) {
            const fetchData = async () => {
                const bol2 = await presaleStarted();
                const bol = await checkPause();
                setBoool2(bol2);
                setBoool(bol);
            };
            fetchData();
        }
    }, [checkPause, css, presaleStarted]);

    return (
        <div className='min-h-screen flexCenter'>
            <label className="swap swap-flip text-9xl">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {!boool && boool2 ? (
                    <div className={`${css} cursor-pointer text-center`}  onClick={account === address ? handlePause : () => {}}>
                        <button className='mb-2'>😇</button>
                        {account !== address ? (
                            <div className='text-4xl'>PreSale Ended</div>
                        ) : (
                            <div className='text-4xl'>Pause Contract</div>
                        )}
                    </div>
                ) : (
                    <div className="cursor-pointer text-center" onClick={account === address ? handlePresale : () => {}}>
                        <button className='mb-2'>😈</button>
                        {account !== address ? (
                            <div className='text-4xl'>Come back LATER</div>
                        ) : (
                            <div className='text-4xl'>Set Presale or UnPause</div>
                        )}
                    </div>
                )}
            </label>
        </div>
    );
}

export default Home;
