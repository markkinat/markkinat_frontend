"use client"
import Banner from '@/components/shared/Banner'
import Loader from '@/components/shared/Loader';
import NFTCard from '@/components/shared/NFTCard';
import SearchBar from '@/components/shared/SearchBar';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [nfts, setNfts] = useState<number[] | any>([]);
  const [nftsCopy, setNftsCopy] = useState<number[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  useEffect(() => {
   ([1, 2, 3, 4, 5,7,8,9,10])
      .map((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

    console.log(nfts);
    
  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a:any, b:any) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a:any, b:any) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a:any, b:any) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect, nfts]);

  const onHandleSearch = (value:any) => {
    const filteredNfts = nfts.filter(({ name }:any) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen mt-24">
        <Loader />
      </div>
    );
  }
  return (
    <div className='w-11/12 m-auto'>
          <div className='py-16'>
        <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center rounded-3xl"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full relative">
            <Image src={"/creator2.png"} alt='creator' fill className="rounded-full object-cover absolute" objectFit="cover" />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{"0xbbd....5cd"}</p>
        </div>
      </div>

      {(!isLoading && nfts.length === 0) ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">No NFTs owned</h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch} />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft:any) => <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />)}
          </div>
        </div>
      )}
    </div>
      </div>
    </div>
  )
}

export default Home