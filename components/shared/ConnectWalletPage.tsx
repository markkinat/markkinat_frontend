"use client"
import { useTheme } from '@/app/context/ThemeProvider';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import React from 'react'

const ConnectWalletPage = () => {
    const { address, chainId } = useWeb3ModalAccount();
    const { open } = useWeb3Modal()
     const { theme } = useTheme();
  return (
    <div className='m-auto'>
        <div className='flexCenter mt-20'>
            <div>
                {address ? (
                    <div className={`-pr-6 hidden md:block relative before:content-[''] before:block before:w-full before:h-full before:border before:absolute before:rounded-lg ${theme === "dark" ? "before:border-white" : "before:border-black"} before:top-1.5 before:left-1.5 cursor-pointer`}>
                        
                    <div className="flex justify-center items-center rounded-lg font-code px-4 py-2 text-base font-medium z-10 relative border border-black bg-gradient-to-r from-[#C053AB] to-[#F4E077] text-black hover:brightness-125"></div>
                </div>
                ) : (
                <div onClick={() => open()}
                className={`-pr-6 hidden md:block relative before:content-[''] before:block before:w-full before:h-full before:border before:absolute before:rounded-lg ${theme === "dark" ? "before:border-white" : "before:border-black"} before:top-1.5 before:left-1.5 cursor-pointer`}>
                    <div className="flex justify-center items-center rounded-lg font-code px-4 py-2 text-base font-medium z-10 relative border border-black bg-gradient-to-r from-[#C053AB] to-[#F4E077] text-black hover:brightness-125">
                        Connect Wallet
                    </div>
                </div>
                )}
              </div>
              <p>Connect Wallet to Continue</p>
        </div>
    </div>
  )
}

export default ConnectWalletPage