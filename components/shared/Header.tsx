"use client";
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeProvider";
import { useEffect, useState } from 'react';

const sliceAddress = (address: any) => {
    if (!address || address.length < 3) return address;
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

const Header = () => {
  const [account, setAccount] = useState("")
  const { theme, toggleTheme } = useTheme();
  const { open } = useWeb3Modal()
  const { address, chainId } = useWeb3ModalAccount();

  useEffect(() => {
    setAccount(sliceAddress(address))
  }, [address])
  

  return (
    <div className="mt-2 max-w-full">
      <div
        className={`fixed top-0 z-50 navbar ${
          theme === "dark" ? "bg-[#0e0c15]/80" : "bg-base-100"
        } justify-between pb-2`}
      >
        <div className="px-2 gap-2 items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 justify-end font-grotesk"
            >
              <li>
                <a>Explore</a>
                <ul className="p-2">
                  <li>
                   <Link href={"/top-collection"}>Collections</Link>
                  </li>
                  <li>
                    <Link href={"/mkndao"}>MKNDAO</Link>
                  </li>
                  <li>
                    <Link href={"/hot-bids"}>Hot Bids</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href={"/portfolio"}>Portfolio</Link>
              </li>
              <li>
               <Link href={"/DAO"}>DAO</Link>
              </li>
              <li>
               
              <a>Mint</a>
              <ul className="p-2">
                <li>
                  <Link href={"/launchpad"}>Launchpad</Link>
                </li>
                <li>
                  <Link href={"/presale"}>Presale</Link>
                </li>
              </ul>
             
              </li>
              <li>
                <a onClick={() => open()}
                  className="btn md:hidden bg-[#0e0c15] rounded-xl hover:text-white hover:bg-transparent text-sm cursor-pointer">
                  Connect
                </a>
              </li>
            </ul>
          </div>

          <div className="cursor-pointer flex items-center">
            <Image
              src={"/logo02.png"}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <Link href={"/"} className="lg:text-3xl text-2xl px-2 font-bold font-grotesk">
              Markkinat
            </Link>
          </div>
          {/* <div className={`form-control hidden md:flex`}>
            <label
              className={`${
                theme === "dark" ? "bg-[#0e0c15]/10" : "bg-base-100"
              } input input-bordered flex items-center gap-1 md:w-auto xl:w-[450px] 2xl:w-[650px] rounded-2xl`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-6 h-6
                opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow text-sm"
                placeholder="Search Item Here"
              />
            </label>
          </div> */}
        </div>
        <div className="px-2 items-center lg:w-3/4 justify-end font-code">
          <label className="cursor-pointer grid pr-2 place-items-center">
            <input
              type="checkbox"
              className="toggle bg-base-content row-start-1 col-start-1 col-span-2"
              onChange={toggleTheme}
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          <ul className="hidden lg:flex menu menu-horizontal px-6 gap-6 flex-nowrap text-base font-medium">
            <li>
              <details>
                <summary>Explore</summary>
                <ul className="p-2">
                  <li>
                    <Link href={"/top-collection"}>Collections</Link>
                  </li>
                  <li>
                    <Link href={"/mkndao"}>MKNDAO</Link>
                  </li>
                  <li>
                    <Link href={"/hot-bids"}>Hot Bids</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href={"/portfolio"}>Portfolio</Link>
            </li>
            <li>
              <Link href={"/DAO"}>DAO</Link>
            </li>
            <li>
              <details>
              <summary>Mint</summary>
              <ul className="p-2">
                <li>
                  <Link href={"/launchpad"}>Launchpad</Link>
                </li>
                <li>
                  <Link href={"/presale"}>Presale</Link>
                </li>
              </ul>
              </details>
            </li>
          </ul>
         
          {/* <div 
           
              className={`btn hidden hover:bg-transparent lg:flex rounded-2xl ${
                theme === "dark"
                  ? "bg-[#220f2c]/80 hover:text-white"
                  : "btn-neutral hover:text-black"
              } text-sm`}
            >
              Connect
            
          </div> */}



          {address ? (
            <div onClick={() => open({ view: 'Account' })}
              className={`-pr-6 hidden md:block relative before:content-[''] before:block before:w-full before:h-full before:border before:absolute before:rounded-lg ${theme === "dark" ? "before:border-white" : "before:border-black"} before:top-1.5 before:left-1.5 cursor-pointer`} >
            <div className="flex justify-center items-center rounded-lg font-code px-4 py-2 text-base font-medium z-10 relative border border-black bg-gradient-to-r from-[#C053AB] to-[#F4E077] text-black hover:brightness-125"
            >
              <span>{`sepolia :`}</span>
              <span className="text-base ml-2">{account}</span>
              </div>
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
      </div>
    </div>
  );
};

export default Header;
